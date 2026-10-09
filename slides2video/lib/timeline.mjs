// Timeline: narration → cue times → element build/mark/spot times (original work, Apache-2.0, © 2026 天机).
// Time references reuse the animator's word-cue idea (`c3:词`, `.end`, `#2`, `+0.2`; idea credit
// geeklee/srt-whiteboard-animation, MIT) but are PAGE-LOCAL here: c1 is the page's first `> say:` line.
// Extra forms: a bare word ("散射" — searched from the previous build onwards), "after+0.4", "with",
// "page+1", "page.end-0.5", and plain seconds from the page start.
// Elements without `at` are auto-bound to the first narration word they share (≥2 chars), else follow the
// previous build by 0.6 s — so reveals land on speech even when the author writes no attributes.
import { plainText } from './parse.mjs';

const PUNCT = /[\s，。！？、；：“”‘’「」『』（）《》…—,.!?;:'"()\-]/;
export const T = { lead: 0.6, lineGap: 0.25, tail: 0.45, lastTail: 1.6, silentPage: 2.6, transDefault: 0.6, cps: 4.6 };

/** Estimated duration of a line (no TTS): ~4.6 spoken chars/s plus short pauses at punctuation. Pure. */
export function estimateLine(text, speed = 1) {
  const s = [...text];
  const spoken = s.filter((c) => !PUNCT.test(c)).length;
  const pauses = s.filter((c) => /[，、；：,;:]/.test(c)).length * 0.15 + s.filter((c) => /[。！？!?…]/.test(c)).length * 0.25;
  return Math.max(0.9, spoken / T.cps / speed + pauses);
}

/** Even per-char word list for a line (used when there is no TTS). Pure. */
export function evenWords(text, dur) {
  const chars = [...text];
  const w = chars.map((c) => (PUNCT.test(c) ? 0 : 1));
  const tot = w.reduce((a, b) => a + b, 0) || 1;
  let acc = 0;
  const out = [];
  chars.forEach((c, i) => { if (w[i]) { out.push({ text: c, start: (acc / tot) * dur, end: ((acc + 1) / tot) * dur }); acc++; } });
  return out;
}

/** Per-char absolute times for a cue from (relative) word timings — monotone, gaps interpolated. Pure. */
export function charTimes(text, words, start, end) {
  const chars = [...text];
  const times = new Array(chars.length).fill(null);
  let pos = 0;
  for (const w of words || []) {
    const idx = text.indexOf(w.text, pos);
    if (idx < 0) continue;
    const n = [...w.text].length, ci = [...text.slice(0, idx)].length;
    for (let k = 0; k < n; k++) times[ci + k] = start + w.start + ((w.end - w.start) * k) / n;
    pos = idx + w.text.length;
  }
  let last = start;
  for (let i = 0; i < times.length; i++) {
    if (times[i] == null) {
      let j = i; while (j < times.length && times[j] == null) j++;
      const nxt = j < times.length ? times[j] : end;
      for (let k = i; k < j; k++) times[k] = last + ((nxt - last) * (k - i + 1)) / (j - i + 1);
      i = j - 1;
    } else last = times[i] = Math.max(times[i], last);
  }
  return times;
}

class PageClock {
  constructor(page) { this.p = page; this.cursor = { cue: 0, char: 0 }; this.prev = page.start; }
  cue(n) { const c = this.p.cues[n - 1]; if (!c) throw new Error(`第 ${this.p.index} 页没有 c${n}（这一页只有 ${this.p.cues.length} 句 say）`); return c; }
  wordAt(ci, word, nth = 1, edge = 'start', from = 0) {
    const c = this.p.cues[ci];
    let idx = -1, f = from;
    for (let k = 0; k < nth; k++) { idx = c.text.indexOf(word, f); if (idx < 0) break; f = idx + word.length; }
    if (idx < 0) return null;
    const a = [...c.text.slice(0, idx)].length, n = [...word].length;
    const t = edge === 'end' ? (c.charTimes[a + n] ?? c.end) : c.charTimes[a];
    return { t, cue: ci, char: idx + word.length };
  }
  /** Search a bare word from the cursor forwards, then from the page start. */
  find(word, nth = 1, edge = 'start') {
    const cs = this.p.cues;
    for (let ci = this.cursor.cue; ci < cs.length; ci++) {
      const r = this.wordAt(ci, word, nth, edge, ci === this.cursor.cue ? this.cursor.char : 0);
      if (r) return r;
    }
    for (let ci = 0; ci < cs.length; ci++) { const r = this.wordAt(ci, word, nth, edge); if (r) return r; }
    return null;
  }
  /** Resolve a reference → absolute seconds (throws with a readable message). */
  at(ref, { advance = true } = {}) {
    if (ref == null || ref === '') return null;
    if (typeof ref === 'number') return this.p.start + ref;
    const s = String(ref).trim();
    if (/^[+-]?\d*\.?\d+$/.test(s)) return this.p.start + parseFloat(s);
    const m = s.match(/^(.*?)([+-]\d*\.?\d+)?$/);
    const body = m[1].trim(), off = m[2] ? parseFloat(m[2]) : 0;
    let mm;
    if (body === 'after') return this.prev + (m[2] ? off : 0.4);
    if (body === 'with') return this.prev + off;
    if ((mm = body.match(/^page(\.end|\.start)?$/))) return (mm[1] === '.end' ? this.p.end : this.p.start) + off;
    if ((mm = body.match(/^c(\d+)(?::(.+?))?(\.end|\.start)?$/))) {
      const n = +mm[1]; const c = this.cue(n);
      if (!mm[2]) return (mm[3] === '.end' ? c.end : c.start) + off;
      const w = mm[2].match(/^(.*?)(?:#(\d+))?$/);
      const r = this.wordAt(n - 1, w[1], w[2] ? +w[2] : 1, mm[3] === '.end' ? 'end' : 'start');
      if (!r) throw new Error(`第 ${this.p.index} 页 c${n}「${c.text}」里找不到「${w[1]}」`);
      if (advance) this.cursor = { cue: r.cue, char: r.char };
      return r.t + off;
    }
    const w = body.match(/^(.*?)(?:#(\d+))?(\.end)?$/);
    const r = this.find(w[1], w[2] ? +w[2] : 1, w[3] ? 'end' : 'start');
    if (!r) throw new Error(`第 ${this.p.index} 页的旁白里找不到「${w[1]}」（at 可写：秒数、"词"、"c2:词"、"after+0.5"、"page+1"）`);
    if (advance) this.cursor = { cue: r.cue, char: r.char };
    return r.t + off;
  }
}

/** Longest substring (≥2 chars, no punctuation) of `text` that occurs in the page narration after the cursor. */
function autoWord(clock, text) {
  const t = plainText(text).replace(/\{[^}]*\}/g, '');
  const chars = [...t];
  for (let len = Math.min(8, chars.length); len >= 2; len--) {
    for (let i = 0; i + len <= chars.length; i++) {
      const w = chars.slice(i, i + len).join('');
      if ([...w].some((c) => PUNCT.test(c))) continue;
      const r = clock.find(w);
      if (r && (r.cue > clock.cursor.cue || (r.cue === clock.cursor.cue && r.char >= clock.cursor.char))) return w;
    }
  }
  return null;
}

/**
 * Lay pages on the clock and resolve every element time. `lines[i]` = { dur, words(relative) } for the i-th say line
 * of the whole deck (TTS result or estimate). Pure apart from thrown errors. Returns { pages, cues, duration, voice }.
 */
export function buildTimeline(deck, lines) {
  const { meta } = deck;
  let t = 0, li = 0;
  const cues = [], voice = [];
  const pages = deck.pages.map((p, pi) => {
    const tr = transitionOf(pi === 0 ? 'none' : (p.meta.transition ?? meta.transition));
    const start = t;
    let speak = start + (pi === 0 ? T.lead : Math.max(0.35, (tr?.dur || 0) * 0.6));
    const pcues = p.say.map((s) => {
      const L = (lines || [])[li++] || { dur: estimateLine(s.text), words: null };
      const c = { page: p.index, index: cues.length + 1, local: 0, text: s.text, start: speak, end: speak + L.dur };
      c.charTimes = charTimes(s.text, L.words || evenWords(s.text, L.dur), c.start, c.end);
      voice.push({ at: c.start, dur: L.dur, file: L.file || null });
      speak = c.end + T.lineGap;
      cues.push(c);
      return c;
    });
    pcues.forEach((c, k) => (c.local = k + 1));
    const minDur = +(p.meta.duration || 0);
    const speechEnd = pcues.length ? pcues.at(-1).end : start + T.silentPage;
    const end = Math.max(start + minDur, speechEnd + (pi === deck.pages.length - 1 ? T.lastTail : T.tail));
    t = end;
    return { index: p.index, layout: p.layout, meta: p.meta, start, end, transition: tr, cues: pcues, elements: p.elements.map((e) => ({ ...e })) };
  });
  // previous page ids → morph pairs
  pages.forEach((p, pi) => {
    const prevIds = new Set(pi ? pages[pi - 1].elements.filter((e) => e.id).map((e) => String(e.id)) : []);
    const morph = p.transition?.type === 'morph';
    const clock = new PageClock(p);
    for (const e of p.elements) {
      const isHead = ['title', 'heading'].includes(e.kind) && !e.at;
      const carried = morph && e.id && prevIds.has(String(e.id));
      if (carried) e.morphFrom = String(e.id);
      let tin;
      if (carried || (isHead && !e.at)) tin = p.start;
      else if (e.at != null) tin = clock.at(e.at);
      else if (p.layout === 'cover' || p.layout === 'image-full' || p.layout === 'section') tin = clock.prev + (e === p.elements[0] ? 0 : 0.35);
      else {
        const w = e.text ? autoWord(clock, e.text) : null;
        tin = w ? clock.at(w) : clock.prev + (clock.prev === p.start ? 0.3 : 0.6);
        if (w) e.autoAt = w;
      }
      tin = Math.max(p.start, Math.min(tin, p.end - 0.3));
      e.t = +tin.toFixed(3);
      e.build = e.build || defaultBuild(e, p);
      e.dur = e.build === 'type' ? Math.min(2.4, 0.06 * [...plainText(e.text || '')].length + 0.2) : e.build === 'draw' ? 1.6 : e.build === 'none' ? 0 : 0.55;
      if (carried) e.dur = 0;
      clock.prev = tin;
      e.marks = [].concat(e.mark || []).map((mk) => {
        const [type, word] = String(mk).split(':');
        let mt = e.markAt != null ? clock.at(e.markAt, { advance: false }) : null;
        if (mt == null && word) { const r = clock.find(word); mt = r ? r.t : null; }
        if (mt == null) mt = tin + Math.min(e.dur, 0.5) + 0.15;
        mt = Math.min(mt, p.end - 0.95);
        return { type, word: word || null, t: +Math.max(tin, mt).toFixed(3), dur: 0.7 };
      });
      if (e.text && e.text.includes('==')) e.hl = [...e.text.matchAll(/==(.+?)==/g)].map((m) => { const r = clock.find(plainText(m[1])); return { word: m[1], t: +Math.max(tin, r ? r.t : tin + 0.4).toFixed(3) }; });
      if (e.spot != null) {
        const s0 = clock.at(e.spot === true ? 'with' : e.spot, { advance: false });
        const cue = p.cues.find((c) => c.start <= s0 + 1e-6 && s0 <= c.end + T.lineGap) || p.cues.at(-1);
        e.spotT = [+s0.toFixed(3), +Math.min(p.end - 0.2, (e.spotEnd != null ? clock.at(e.spotEnd, { advance: false }) : (cue ? cue.end + 0.2 : s0 + 2.4))).toFixed(3)];
      }
      if (e.out != null) e.tOut = +clock.at(e.out, { advance: false }).toFixed(3);
      if (e.kind === 'formula' && e.terms) e.termT = [].concat(e.terms).map((r) => +clock.at(r, { advance: false }).toFixed(3));
      if (e.kind === 'chart') {
        const items = chartItems(e.chart);
        e.chart = { ...e.chart, items: items.map((it, k) => ({ ...it, t: +(it.at != null ? clock.at(it.at, { advance: false }) : tin + 0.25 * k).toFixed(3) })) };
        e.dur = Math.max(e.dur, 0.9);
      }
      if (e.kind === 'diagram') e.dur = Math.max(e.dur, e.drawDur ? +e.drawDur : 2.2);
    }
  });
  const duration = pages.length ? pages.at(-1).end : 0;
  return { meta: deck.meta, pages, cues, duration: +duration.toFixed(3), voice };
}

export function chartItems(ch = {}) {
  if (Array.isArray(ch.bars)) return ch.bars.map((b) => (typeof b === 'object' ? b : { value: +b }));
  if (Array.isArray(ch.points)) return ch.points.map((b) => (typeof b === 'object' ? b : { value: +b }));
  if (Array.isArray(ch.labels) && Array.isArray(ch.values)) return ch.labels.map((l, i) => ({ label: l, value: +ch.values[i] }));
  return [];
}

function defaultBuild(e, p) {
  if (e.kind === 'diagram') return 'draw';
  if (e.kind === 'title') return p.layout === 'cover' ? 'zoom' : 'fade';
  if (e.kind === 'image') return 'zoom';
  if (e.kind === 'bullet') return 'up';
  if (e.kind === 'formula') return 'wipe';
  if (e.kind === 'chart') return 'fade';
  return 'up';
}

/** 'morph' | 'fade' | 'slide' | 'zoom' | 'none' | 'huashu:<name>' | {type,dur} → {type, dur} | null. Pure. */
export function transitionOf(v) {
  if (!v || v === 'none' || v === 'cut') return null;
  const o = typeof v === 'string' ? { type: v } : { ...v };
  const [type, durS] = String(o.type).split('@');
  o.type = type;
  o.dur = +(o.dur ?? durS ?? (type.startsWith('huashu:') ? 0.7 : type === 'morph' ? 0.8 : T.transDefault));
  return o;
}

/** Visual events (builds, marks, transitions, spots) for the static-gap QA. Pure. */
export function visualEvents(tl) {
  const ev = [];
  for (const p of tl.pages) {
    ev.push(p.start);
    for (const e of p.elements) { ev.push(e.t); for (const m of e.marks || []) ev.push(m.t); if (e.spotT) ev.push(e.spotT[0]); for (const x of e.termT || []) ev.push(x); for (const it of e.chart?.items || []) ev.push(it.t); }
  }
  return ev.sort((a, b) => a - b);
}

/** Longest stretch without any new visual event (images keep a slow push-in, but that is not counted). Pure. */
export function longestStatic(tl) {
  const ev = [...visualEvents(tl), tl.duration];
  let best = { gap: 0, at: 0 };
  for (let i = 1; i < ev.length; i++) if (ev[i] - ev[i - 1] > best.gap) best = { gap: +(ev[i] - ev[i - 1]).toFixed(2), at: +ev[i - 1].toFixed(2) };
  return best;
}
