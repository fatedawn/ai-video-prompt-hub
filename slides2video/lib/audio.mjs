// Narration for slides2video: reuse the animator's local Kokoro TTS (via videogen's per-line synthesiser with
// cache) and lay the line WAVs on our own clock. Original work, Apache-2.0, © 2026 天机.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { estimateLine } from './timeline.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');

export function pythonFor() {
  if (process.env.HDA_PYTHON) return process.env.HDA_PYTHON;
  for (const p of [path.join(ROOT, 'animator', '.venv', 'bin', 'python'), path.join(ROOT, 'animator', '.venv', 'Scripts', 'python.exe')]) if (fs.existsSync(p)) return p;
  return process.platform === 'win32' ? 'python' : 'python3';
}
export function ttsReady() { return spawnSync(pythonFor(), ['-c', 'import sherpa_onnx'], { encoding: 'utf8' }).status === 0; }

/** All `> say:` lines of the deck with voice/speed. */
export function sayLines(deck) {
  const voice = deck.meta.voice || (deck.meta.theme === 'tianji' ? 'kokoro:zm_052' : 'kokoro:zf_001');
  return deck.pages.flatMap((p) => p.say.map((s) => ({ text: s.text, voice: s.voice || p.meta.voice || voice, speed: +(s.speed || p.meta.speed || deck.meta.speed || 1) })));
}

/** TTS (or estimate) → [{dur, words, file}]. */
export async function narrate(deck, { work, cache, noVoice = false, log = () => {} }) {
  const lines = sayLines(deck);
  if (!lines.length) return { lines: [], engine: 'none' };
  if (noVoice || !ttsReady()) {
    if (!noVoice) log('  ⚠ 本地 TTS 未安装（cd animator && npm run setup:tts）：按字数估计时长，静音出片');
    return { lines: lines.map((l) => ({ dur: estimateLine(l.text, l.speed), words: null, file: null })), engine: 'estimate' };
  }
  process.env.HDA_PYTHON ||= pythonFor();
  const { synthesizeLines } = await import(path.join(ROOT, 'videogen', 'lib', 'assemble.mjs'));
  const { words, lineDur } = synthesizeLines(lines, work, { cache });
  return { lines: lines.map((l, i) => ({ dur: lineDur[i], words: words[i], file: path.join(work, 'lines', `c${String(i + 1).padStart(3, '0')}.wav`) })), engine: 'kokoro' };
}

function readWav(file) {
  const b = fs.readFileSync(file);
  if (b.toString('ascii', 0, 4) !== 'RIFF') throw new Error('不是 WAV：' + file);
  let off = 12, fmt = null, data = null;
  while (off + 8 <= b.length) {
    const id = b.toString('ascii', off, off + 4), size = b.readUInt32LE(off + 4);
    if (id === 'fmt ') fmt = { ch: b.readUInt16LE(off + 10), rate: b.readUInt32LE(off + 12), bits: b.readUInt16LE(off + 22) };
    if (id === 'data') data = b.subarray(off + 8, off + 8 + size);
    off += 8 + size + (size % 2);
  }
  if (!fmt || !data || fmt.bits !== 16) throw new Error('只支持 16-bit PCM WAV：' + file);
  return { ...fmt, data };
}

/** Place line WAVs at absolute offsets → one mono 16-bit WAV of `duration` seconds. */
export function layVoice(voice, duration, out) {
  const withFile = voice.filter((v) => v.file && fs.existsSync(v.file));
  if (!withFile.length) return null;
  const first = readWav(withFile[0].file);
  const rate = first.rate;
  const total = Math.ceil(duration * rate);
  const pcm = new Int16Array(total);
  for (const v of withFile) {
    const w = readWav(v.file);
    if (w.rate !== rate || w.ch !== 1) throw new Error('配音采样率/声道不一致：' + v.file);
    const src = new Int16Array(w.data.buffer, w.data.byteOffset, w.data.length / 2);
    const at = Math.round(v.at * rate);
    for (let i = 0; i < src.length && at + i < total; i++) pcm[at + i] = Math.max(-32768, Math.min(32767, pcm[at + i] + src[i]));
  }
  const hdr = Buffer.alloc(44);
  hdr.write('RIFF', 0); hdr.writeUInt32LE(36 + pcm.length * 2, 4); hdr.write('WAVE', 8); hdr.write('fmt ', 12); hdr.writeUInt32LE(16, 16);
  hdr.writeUInt16LE(1, 20); hdr.writeUInt16LE(1, 22); hdr.writeUInt32LE(rate, 24); hdr.writeUInt32LE(rate * 2, 28); hdr.writeUInt16LE(2, 32); hdr.writeUInt16LE(16, 34);
  hdr.write('data', 36); hdr.writeUInt32LE(pcm.length * 2, 40);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, Buffer.concat([hdr, Buffer.from(pcm.buffer)]));
  return out;
}

const ts = (t) => { const ms = Math.round(t * 1000); return `${String(Math.floor(ms / 3600000)).padStart(2, '0')}:${String(Math.floor(ms / 60000) % 60).padStart(2, '0')}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')},${String(ms % 1000).padStart(3, '0')}`; };
export function toSRT(cues) { return cues.map((c, i) => `${i + 1}\n${ts(c.start)} --> ${ts(c.end)}\n${c.text}\n`).join('\n'); }
