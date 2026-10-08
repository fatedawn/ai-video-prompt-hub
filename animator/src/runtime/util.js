// Small deterministic helpers shared by the runtime. Original code for ai-video-prompt-hub/animator.

/** 32-bit string hash (FNV-1a). */
export function hash(str) {
  let h = 0x811c9dc5;
  const s = String(str);
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Seeded PRNG (mulberry32). Returns a function producing floats in [0,1). */
export function rng(seed) {
  let a = (typeof seed === 'number' ? seed : hash(seed)) >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 1D smooth value noise in [-1,1], deterministic per seed. */
export function noise1(seed, x) {
  const i = Math.floor(x), f = x - i;
  const a = (hash(seed + ':' + i) / 4294967296) * 2 - 1;
  const b = (hash(seed + ':' + (i + 1)) / 4294967296) * 2 - 1;
  const u = f * f * (3 - 2 * f);
  return a + (b - a) * u;
}

export const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp01 = (v) => clamp(v, 0, 1);

export const ease = {
  linear: (t) => t,
  in: (t) => t * t * t,
  out: (t) => 1 - Math.pow(1 - t, 3),
  inOut: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  outBack: (t) => { const c1 = 1.70158, c3 = c1 + 1; return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2); },
  outBounce: (t) => {
    const n1 = 7.5625, d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  },
};
export const getEase = (name) => ease[name] || ease.inOut;

/** progress of t inside [start, start+dur], clamped to [0,1]. */
export const prog = (t, start, dur) => (dur <= 0 ? (t >= start ? 1 : 0) : clamp01((t - start) / dur));

/** Envelope: 0 before start, ramps up over `inDur`, holds, ramps down over `outDur` before end. */
export function envelope(t, start, end, inDur = 0.25, outDur = 0.25) {
  if (t <= start || t >= end) return 0;
  const a = inDur > 0 ? clamp01((t - start) / inDur) : 1;
  const b = outDur > 0 ? clamp01((end - t) / outDur) : 1;
  return ease.inOut(Math.min(a, b));
}

export function makeCanvas(w, h) {
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.ceil(w));
  c.height = Math.max(1, Math.ceil(h));
  return c;
}

export function hexToRgb(hex) {
  let h = String(hex || '#000').trim();
  if (h.startsWith('rgb')) {
    const m = h.match(/[\d.]+/g).map(Number);
    return { r: m[0], g: m[1], b: m[2] };
  }
  h = h.replace('#', '');
  if (h.length === 3) h = h.split('').map((c) => c + c).join('');
  const n = parseInt(h.slice(0, 6), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

export function rgba(hex, a = 1) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
}

/** Shift lightness of a hex color by `amt` (-1..1). */
export function shade(hex, amt) {
  const { r, g, b } = hexToRgb(hex);
  const f = (c) => Math.round(amt >= 0 ? c + (255 - c) * amt : c * (1 + amt));
  return `rgb(${f(r)},${f(g)},${f(b)})`;
}
