#!/usr/bin/env python3
"""Optional TTS helper for handdrawn-animator (original code for ai-video-prompt-hub/animator).

Synthesises each script line with edge-tts (online Microsoft Edge "Read aloud" voices; needs network,
`pip install edge-tts`), collects WordBoundary timestamps, concatenates the lines with short pauses and writes:
  <out>.mp3          narration audio
  <out>.srt          one cue per script line, timed to the real audio
  <out>.words.json   word-level timestamps [{cue, words:[{text,start,end}]}]

Input: JSON on stdin {"lines":[{"text":..., "voice":...}], "gap":0.35, "lead":0.4, "rate":"+0%", "out": "/abs/path/voice"}
"""
import asyncio, json, os, subprocess, sys, tempfile

try:
    import edge_tts
except ImportError:
    sys.exit("未安装 edge-tts：pip install edge-tts（或改用自己的配音 + SRT）")


def fmt(t):
    ms = int(round(t * 1000))
    return f"{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d},{ms % 1000:03d}"


def duration(path):
    out = subprocess.check_output(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path])
    return float(out.strip())


async def synth(text, voice, rate, path):
    words = []
    com = edge_tts.Communicate(text, voice, rate=rate, boundary="WordBoundary")
    with open(path, "wb") as f:
        async for ch in com.stream():
            if ch["type"] == "audio":
                f.write(ch["data"])
            elif ch["type"] == "WordBoundary":
                s = ch["offset"] / 1e7
                words.append({"text": ch["text"], "start": s, "end": s + ch["duration"] / 1e7})
    return words


async def main():
    cfg = json.load(sys.stdin)
    gap, lead, rate = cfg.get("gap", 0.35), cfg.get("lead", 0.4), cfg.get("rate", "+0%")
    out = cfg["out"]
    tmp = tempfile.mkdtemp(prefix="hda-tts-")
    t = lead
    cues, words_all, parts = [], [], []
    silence = os.path.join(tmp, "gap.wav")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", str(gap), silence], check=True)
    lead_f = os.path.join(tmp, "lead.wav")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", "anullsrc=r=24000:cl=mono", "-t", str(lead), lead_f], check=True)
    parts.append(lead_f)
    for i, line in enumerate(cfg["lines"]):
        p = os.path.join(tmp, f"line{i:03d}.mp3")
        w = await synth(line["text"], line.get("voice") or cfg.get("voice", "zh-CN-XiaoxiaoNeural"), rate, p)
        wav = p[:-4] + ".wav"
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", p, "-ar", "24000", "-ac", "1", wav], check=True)
        d = duration(wav)
        start = t
        end = t + (w[-1]["end"] if w else d)
        cues.append({"start": start, "end": min(t + d, end + 0.15), "text": line["text"]})
        words_all.append({"cue": i + 1, "words": [{"text": x["text"], "start": round(t + x["start"], 3), "end": round(t + x["end"], 3)} for x in w]})
        parts += [wav, silence]
        t += d + gap
        print(f"  c{i + 1} {start:.2f}-{start + d:.2f}s {line['text']}", file=sys.stderr)
    lst = os.path.join(tmp, "list.txt")
    with open(lst, "w") as f:
        f.writelines(f"file '{x}'\n" for x in parts)
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "concat", "-safe", "0", "-i", lst, "-c:a", "libmp3lame", "-q:a", "3", out + ".mp3"], check=True)
    with open(out + ".srt", "w", encoding="utf-8") as f:
        for i, c in enumerate(cues):
            f.write(f"{i + 1}\n{fmt(c['start'])} --> {fmt(c['end'])}\n{c['text']}\n\n")
    with open(out + ".words.json", "w", encoding="utf-8") as f:
        json.dump(words_all, f, ensure_ascii=False, indent=1)
    print(json.dumps({"audio": out + ".mp3", "srt": out + ".srt", "words": out + ".words.json"}))


asyncio.run(main())
