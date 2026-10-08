// SRT read/write. Original code for ai-video-prompt-hub/animator.

const TS = /(\d{1,2}):(\d{2}):(\d{2})[,.](\d{1,3})/;
const toSec = (m) => (+m[1]) * 3600 + (+m[2]) * 60 + (+m[3]) + (+m[4].padEnd(3, '0')) / 1000;

/** Parse SRT text into [{index, start, end, text}] (1-based index in file order). */
export function parseSrt(text) {
  const blocks = text.replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n').split(/\n\s*\n/);
  const cues = [];
  for (const b of blocks) {
    const lines = b.split('\n').filter((l) => l.trim() !== '');
    if (!lines.length) continue;
    const ti = lines.findIndex((l) => l.includes('-->'));
    if (ti < 0) continue;
    const [a, z] = lines[ti].split('-->');
    const ma = a.match(TS), mz = z.match(TS);
    if (!ma || !mz) throw new Error(`SRT 时间码无法解析: ${lines[ti]}`);
    cues.push({ index: cues.length + 1, start: toSec(ma), end: toSec(mz), text: lines.slice(ti + 1).join('\n').trim() });
  }
  return cues;
}

const pad = (n, w = 2) => String(n).padStart(w, '0');
export function fmtTs(sec) {
  const ms = Math.round(sec * 1000);
  const h = Math.floor(ms / 3600000), m = Math.floor((ms % 3600000) / 60000), s = Math.floor((ms % 60000) / 1000);
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms % 1000, 3)}`;
}

export function writeSrt(cues) {
  return cues.map((c, i) => `${i + 1}\n${fmtTs(c.start)} --> ${fmtTs(c.end)}\n${c.text}\n`).join('\n');
}
