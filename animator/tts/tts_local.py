#!/usr/bin/env python3
"""Default offline TTS for handdrawn-animator (original code for ai-video-prompt-hub/animator).

Open-source, free, CPU-only: Kokoro-82M v1.1-zh (Apache-2.0) via sherpa-onnx; MeloTTS (MIT) and
VITS AISHELL-3 as alternatives. Models are auto-downloaded and sha256-verified by fetch_models.py.

Timing strategy (no cloud word boundaries available, so we build our own):
  1. every script line is split into phrases at punctuation; each phrase is synthesised separately,
     silence-trimmed and concatenated with a fixed pause, so phrase boundaries are exact by construction;
  2. inside a phrase, characters are aligned with faster-whisper word timestamps (matched by pinyin, which
     tolerates traditional/simplified and homophone mistakes); unmatched characters are interpolated;
     without faster-whisper they are spread by character weight over the voiced span.

Input JSON on stdin:
  {"lines":[{"text":"…","voice":"kokoro:zm_052","speed":1.0}], "out":"/abs/prefix", "lead":0.5, "gap":0.35,
   "align":"auto|whisper|even", "models":"<dir or null>", "threads":4}
Writes <out>.wav, <out>.srt, <out>.words.json ([{cue, words:[{text,start,end}]}]) and prints a JSON summary.
"""
import json, os, re, sys, time, wave
import numpy as np

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from fetch_models import ensure, MANIFEST  # noqa: E402

HERE = os.path.dirname(os.path.abspath(__file__))
SR = 24000
PUNCT = "，。！？、；：,.!?;:…—「」『』“”\"'（）()《》·~～ \t"
BREAK = re.compile(r"([，。！？、；：,.!?;:…]+|——+|—)")
PAUSE = {"，": 0.16, "、": 0.12, "；": 0.22, "：": 0.18, ",": 0.16, "—": 0.22}  # else (。！？…) 0.30
TOKEN = re.compile(r"[A-Za-z0-9][A-Za-z0-9.+#_-]*|[\u3400-\u9fff\uf900-\ufaff]")

_engines = {}


def engine(kind, models, threads):
    import sherpa_onnx as so
    key = kind
    if key in _engines:
        return _engines[key]
    d = ensure(kind, models)
    j = lambda *p: os.path.join(d, *p)
    if kind == "kokoro":
        mc = so.OfflineTtsModelConfig(kokoro=so.OfflineTtsKokoroModelConfig(
            model=j("model.onnx"), voices=j("voices.bin"), tokens=j("tokens.txt"),
            lexicon=f"{j('lexicon-us-en.txt')},{j('lexicon-zh.txt')}", data_dir=j("espeak-ng-data"), dict_dir=j("dict")),
            num_threads=threads, provider="cpu")
        fst = ",".join(j(x) for x in ("phone-zh.fst", "date-zh.fst", "number-zh.fst"))
    elif kind == "melo":
        mc = so.OfflineTtsModelConfig(vits=so.OfflineTtsVitsModelConfig(model=j("model.onnx"), lexicon=j("lexicon.txt"), tokens=j("tokens.txt"), dict_dir=j("dict")), num_threads=threads, provider="cpu")
        fst = ",".join(j(x) for x in ("phone.fst", "date.fst", "number.fst", "new_heteronym.fst"))
    elif kind == "aishell3":
        mc = so.OfflineTtsModelConfig(vits=so.OfflineTtsVitsModelConfig(model=j("vits-aishell3.onnx"), lexicon=j("lexicon.txt"), tokens=j("tokens.txt")), num_threads=threads, provider="cpu")
        fst = ",".join(j(x) for x in ("phone.fst", "date.fst", "number.fst", "new_heteronym.fst"))
    else:
        raise SystemExit(f"未知引擎 {kind}（可选 kokoro / melo / aishell3）")
    tts = so.OfflineTts(so.OfflineTtsConfig(model=mc, rule_fsts=fst, max_num_sentences=1))
    _engines[key] = tts
    return tts


KOKORO_NAMES = json.load(open(os.path.join(HERE, "kokoro_v1_1_speakers.json")))


def parse_voice(v):
    """'kokoro:zm_052' | 'kokoro:59' | 'melo' | 'aishell3:66' -> (engine, sid)."""
    v = (v or "kokoro:zm_052").strip()
    kind, _, spk = v.partition(":")
    if kind not in ("kokoro", "melo", "aishell3"):
        raise SystemExit(f"无法识别的本地音色 {v!r}；写法如 kokoro:zm_052、kokoro:zf_001、melo、aishell3:66")
    if not spk:
        return kind, 0
    if spk.isdigit():
        return kind, int(spk)
    if kind == "kokoro" and spk in KOKORO_NAMES:
        return kind, KOKORO_NAMES.index(spk)
    raise SystemExit(f"音色 {spk!r} 不存在；Kokoro 可选 zf_001…zf_099（女）、zm_009…zm_100（男），见 tts/kokoro_v1_1_speakers.json")


def speakable(s):
    s = s.replace("——", "，").replace("…", "。").replace("~", "").replace("～", "")
    s = re.sub(r"[「」『』“”\"《》（）()]", "", s)
    return s.strip(" ，")


def phrases(text):
    """Split a line into [(display_text, pause_after)] at punctuation; punctuation stays with the phrase."""
    parts = BREAK.split(text)
    out = []
    for i in range(0, len(parts), 2):
        body = parts[i]
        p = parts[i + 1] if i + 1 < len(parts) else ""
        if not body.strip(PUNCT):
            if out:
                out[-1][0] += body + p
            continue
        out.append([body + p, PAUSE.get(p[:1], 0.30) if p else 0.30])
    return out


def trim(x, thr=0.012, pad=0.03):
    a = np.abs(x)
    idx = np.where(a > thr * max(1e-6, a.max()) * 4)[0]
    if not len(idx):
        return x
    s, e = max(0, idx[0] - int(pad * SR)), min(len(x), idx[-1] + int(pad * SR))
    return x[s:e]


def synth(kind, sid, text, speed, models, threads):
    tts = engine(kind, models, threads)
    a = tts.generate(text, sid=sid, speed=speed)
    x = np.asarray(a.samples, dtype=np.float32)
    if a.sample_rate != SR:  # simple linear resample (melo/aishell3 are 44.1k/8k-ish)
        n = int(len(x) * SR / a.sample_rate)
        x = np.interp(np.linspace(0, len(x) - 1, n), np.arange(len(x)), x).astype(np.float32)
    return trim(x)


# ---------- alignment ----------
_pinyin = None


def key(tok):
    global _pinyin
    if tok[0].isascii():
        return tok.lower()
    if _pinyin is None:
        try:
            from pypinyin import lazy_pinyin
            _pinyin = lambda c: lazy_pinyin(c)[0]
        except ImportError:
            _pinyin = lambda c: c
    return _pinyin(tok)


_whisper = None


def whisper_model(models, threads):
    global _whisper
    if _whisper is None:
        from faster_whisper import WhisperModel
        _whisper = WhisperModel(ensure("whisper-small", models), device="cpu", compute_type="int8", cpu_threads=threads)
    return _whisper


def whisper_tokens(x, text, models, threads, prompt=True, beam=5):
    # faster-whisper assumes 16 kHz when given a numpy array
    x16 = np.interp(np.linspace(0, len(x) - 1, int(len(x) * 16000 / SR)), np.arange(len(x)), x).astype(np.float32)
    segs, _ = whisper_model(models, threads).transcribe(x16, language="zh", word_timestamps=True, initial_prompt=text if prompt else None, beam_size=beam, temperature=0.0, no_speech_threshold=None, vad_filter=False, condition_on_previous_text=False)
    out = []
    segs = list(segs)
    if os.environ.get("HDA_ALIGN_DEBUG"):
        print("    whisper:", "".join(s.text for s in segs), file=sys.stderr)
    for s in segs:
        for w in s.words or []:
            toks = TOKEN.findall(w.word)
            for k, t in enumerate(toks):
                d = (w.end - w.start) / len(toks)
                out.append((t, w.start + k * d, w.start + (k + 1) * d))
    return out


def align_line(text, spans, x, mode, models, threads):
    """spans: [(phrase_text, t0, t1)] relative to line start. Returns [{text,start,end}], match ratio."""
    toks = []  # (token, phrase_idx)
    for pi, (ph, _, _) in enumerate(spans):
        toks += [(t, pi) for t in TOKEN.findall(ph)]
    starts = [None] * len(toks)
    ratio = None
    if mode != "even":
        import difflib
        best = (-1, None)
        for use_prompt, beam in ((True, 5), (False, 5), (True, 1)):  # the text prompt usually helps; retry if whisper drifted
            try:
                wt = whisper_tokens(x, text, models, threads, use_prompt, beam)
            except ImportError:
                if mode == "whisper":
                    raise SystemExit("align=whisper 需要 pip install faster-whisper")
                break
            cand = [None] * len(toks)
            hit = 0
            if wt:
                a, b = [key(t) for t, _ in toks], [key(t) for t, _, _ in wt]
                sm = difflib.SequenceMatcher(None, a, b, autojunk=False)
                for blk in sm.get_matching_blocks():
                    for k in range(blk.size):
                        i, j = blk.a + k, blk.b + k
                        _, t0, t1 = spans[toks[i][1]]
                        if t0 - 0.12 <= wt[j][1] <= t1:  # must fall in its own (exactly known) phrase
                            cand[i] = max(t0, wt[j][1]); hit += 1
            if hit > best[0]:
                best = (hit, cand)
            if hit >= 0.8 * len(toks):
                break
        if best[1] is not None:
            starts = best[1]
            ratio = best[0] / max(1, len(toks))
    # fill: phrase start for the first token, interpolate unknowns by weight, keep monotone inside phrase
    words = []
    for pi, (ph, t0, t1) in enumerate(spans):
        ids = [i for i, (_, p) in enumerate(toks) if p == pi]
        if not ids:
            continue
        w = [max(1.0, len(toks[i][0]) * 0.45) if toks[i][0].isascii() else 1.0 for i in ids]
        cum = np.concatenate([[0], np.cumsum(w)]) / sum(w)
        est = [t0 + c * (t1 - t0) for c in cum[:-1]]
        known = [(k, starts[i]) for k, i in enumerate(ids) if starts[i] is not None]
        if not known or known[0][0] != 0:
            known = [(0, t0)] + known
        known.append((len(ids), t1))
        final = []
        for k in range(len(ids)):
            prev = max(q for q in known if q[0] <= k)
            nxt = min(q for q in known if q[0] > k)
            if prev[0] == k:
                final.append(prev[1]); continue
            e0, e1 = (est[prev[0]] if prev[0] < len(ids) else t1), (est[nxt[0]] if nxt[0] < len(ids) else t1)
            f = (est[k] - e0) / max(1e-6, e1 - e0)
            final.append(prev[1] + f * (nxt[1] - prev[1]))
        for k in range(1, len(final)):
            final[k] = max(final[k], final[k - 1] + 0.03)
        for k, i in enumerate(ids):
            end = final[k + 1] if k + 1 < len(ids) else t1
            words.append({"text": toks[i][0], "start": final[k], "end": max(end, final[k] + 0.03)})
    return words, ratio


def write_wav(path, y):
    with wave.open(path, "wb") as f:
        f.setnchannels(1); f.setsampwidth(2); f.setframerate(SR)
        f.writeframes((np.clip(y, -1, 1) * 32767).astype("<i2").tobytes())


def fmt(t):
    ms = int(round(t * 1000))
    return f"{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d},{ms % 1000:03d}"


def main():
    cfg = json.load(sys.stdin)
    lead, gap, out = cfg.get("lead", 0.5), cfg.get("gap", 0.35), cfg["out"]
    models, threads, mode = cfg.get("models"), int(cfg.get("threads") or min(8, os.cpu_count() or 4)), cfg.get("align", "auto")
    audio = [np.zeros(int(lead * SR), np.float32)]
    t, cues, words_all, stats = lead, [], [], []
    t_start = time.time()
    for li, line in enumerate(cfg["lines"]):
        kind, sid = parse_voice(line.get("voice"))
        speed = float(line.get("speed") or cfg.get("speed") or 1.0)
        chunks, spans, lt = [], [], 0.0
        for ph, pause in phrases(line["text"]):
            say = speakable(ph)
            if not say.strip(PUNCT):
                continue
            x = synth(kind, sid, say, speed, models, threads)
            spans.append((ph, lt, lt + len(x) / SR))
            chunks += [x, np.zeros(int(pause * SR), np.float32)]
            lt += len(x) / SR + pause
        if chunks:
            chunks.pop()  # no pause after the last phrase
        lx = np.concatenate(chunks) if chunks else np.zeros(int(0.3 * SR), np.float32)
        d = len(lx) / SR
        w, ratio = align_line(line["text"], spans, lx, mode, models, threads)
        cues.append({"start": t, "end": t + d, "text": line["text"]})
        words_all.append({"cue": li + 1, "words": [{"text": q["text"], "start": round(t + q["start"], 3), "end": round(t + q["end"], 3)} for q in w]})
        stats.append({"cue": li + 1, "voice": f"{kind}:{sid}", "dur": round(d, 2), "whisper_match": None if ratio is None else round(ratio, 2)})
        print(f"  c{li + 1} {t:6.2f}-{t + d:6.2f}s  {kind}:{sid}  对齐命中 {'—' if ratio is None else f'{ratio:.0%}'}  {line['text']}", file=sys.stderr)
        if cfg.get("lines_dir"):  # per-line files for callers that place lines themselves (videogen assemble)
            os.makedirs(cfg["lines_dir"], exist_ok=True)
            write_wav(os.path.join(cfg["lines_dir"], f"c{li + 1:03d}.wav"), lx / max(1e-6, float(np.abs(lx).max())) * 0.89)
        audio += [lx, np.zeros(int(gap * SR), np.float32)]
        t += d + gap
    y = np.concatenate(audio)
    peak = float(np.abs(y).max() or 1)
    y = np.clip(y / peak * 0.89, -1, 1)
    write_wav(out + ".wav", y)
    with open(out + ".srt", "w", encoding="utf-8") as f:
        for i, c in enumerate(cues):
            f.write(f"{i + 1}\n{fmt(c['start'])} --> {fmt(c['end'])}\n{c['text']}\n\n")
    with open(out + ".words.json", "w", encoding="utf-8") as f:
        json.dump(words_all, f, ensure_ascii=False, indent=1)
    wall = time.time() - t_start
    print(json.dumps({"audio": out + ".wav", "srt": out + ".srt", "words": out + ".words.json", "seconds": round(len(y) / SR, 2), "wall": round(wall, 1), "rtf": round(wall / (len(y) / SR), 3), "lines": stats}, ensure_ascii=False))


if __name__ == "__main__":
    main()
