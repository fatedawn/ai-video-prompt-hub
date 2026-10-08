// Hand-drawn media presets and stroke rendering. Original code for ai-video-prompt-hub/animator.
// Idea credit: "every medium has its own mark-making and drawing order" (alexgreensh/anidoodle, Apache-2.0)
// and "ink first, then colour" (geeklee/srt-whiteboard-animation, MIT). No code copied.
import { rng, noise1, makeCanvas, rgba, clamp } from './util.js';

/**
 * Media presets. Units are design pixels (1080-wide canvas).
 *  line.*  : outline marks      fill.* : colouring marks
 *  fill.mode = 'scribble' (marks are the colour) | 'wash' (marks reveal a soft flat wash)
 */
export const MEDIA = {
  crayon: {
    label: '蜡笔',
    line: { widthMul: 1.5, minWidth: 5, passes: 2, alpha: 0.92, jitter: 1.6, wobble: 2.2, grain: 0.5, taper: false },
    fill: { mode: 'scribble', width: 15, spacing: 9.5, angle: 32, alpha: 0.74, zigzag: true, layers: 1, grain: 0.62, speed: 0.33 },
    boil: 1.3,
  },
  'colored-pencil': {
    label: '彩铅',
    line: { widthMul: 0.7, minWidth: 2.4, passes: 2, alpha: 0.88, jitter: 1.0, wobble: 1.5, grain: 0.38, taper: false },
    fill: { mode: 'scribble', width: 3.6, spacing: 4.6, angle: 52, alpha: 0.7, zigzag: false, layers: 2, grain: 0.42, speed: 0.4 },
    boil: 0.9,
  },
  pencil: {
    label: '铅笔素描',
    line: { widthMul: 0.6, minWidth: 2, passes: 3, alpha: 0.7, jitter: 1.2, wobble: 1.4, grain: 0.35, taper: false, mono: '#4a4a4a' },
    fill: { mode: 'scribble', width: 2.6, spacing: 5, angle: 45, alpha: 0.45, zigzag: false, layers: 2, grain: 0.4, speed: 0.45, desaturate: 0.6 },
    boil: 0.8,
  },
  ink: {
    label: '钢笔淡彩 / 水墨',
    line: { widthMul: 1.0, minWidth: 2.5, passes: 1, alpha: 0.95, jitter: 0.5, wobble: 1.0, grain: 0.05, taper: true, mono: '#1d1d1f' },
    fill: { mode: 'wash', width: 30, spacing: 18, angle: 20, alpha: 0.5, zigzag: true, layers: 1, grain: 0.1, speed: 0.25, desaturate: 0.3 },
    boil: 0.6,
  },
  'picture-book': {
    label: '绘本（铅笔 + 水彩）',
    line: { widthMul: 0.75, minWidth: 2.2, passes: 2, alpha: 0.85, jitter: 0.9, wobble: 1.6, grain: 0.3, taper: false, tint: -0.55 },
    fill: { mode: 'wash', width: 34, spacing: 20, angle: 28, alpha: 0.62, zigzag: true, layers: 1, grain: 0.2, speed: 0.25 },
    boil: 0.8,
  },
  marker: {
    label: '马克笔',
    line: { widthMul: 1.15, minWidth: 4, passes: 1, alpha: 0.95, jitter: 0.6, wobble: 1.2, grain: 0.0, taper: false },
    fill: { mode: 'scribble', width: 20, spacing: 15, angle: 15, alpha: 0.6, zigzag: true, layers: 1, grain: 0.0, speed: 0.3 },
    boil: 0.7,
  },
};

export function getMedia(name, overrides) {
  const base = MEDIA[name] || MEDIA.crayon;
  if (!overrides) return base;
  return {
    ...base,
    line: { ...base.line, ...(overrides.line || {}) },
    fill: { ...base.fill, ...(overrides.fill || {}) },
    boil: overrides.boil ?? base.boil,
  };
}

// ---------- textures ----------
const grainCache = new Map();
/** Mottled grain texture used with destination-out to make wax/graphite skip the paper tooth. */
export function grainTexture(kind = 'crayon') {
  if (grainCache.has(kind)) return grainCache.get(kind);
  const S = 256;
  const c = makeCanvas(S, S);
  const g = c.getContext('2d');
  const img = g.createImageData(S, S);
  const r = rng('grain-' + kind);
  // value-noise lattice (tileable) for paper tooth
  const L = kind === 'crayon' ? 32 : 64;
  const lat = new Float32Array(L * L).map(() => r());
  const v = (x, y) => {
    const fx = (x / S) * L, fy = (y / S) * L;
    const x0 = Math.floor(fx), y0 = Math.floor(fy), tx = fx - x0, ty = fy - y0;
    const a = lat[(y0 % L) * L + (x0 % L)], b = lat[(y0 % L) * L + ((x0 + 1) % L)];
    const c2 = lat[((y0 + 1) % L) * L + (x0 % L)], d = lat[((y0 + 1) % L) * L + ((x0 + 1) % L)];
    const sx = tx * tx * (3 - 2 * tx), sy = ty * ty * (3 - 2 * ty);
    return (a + (b - a) * sx) * (1 - sy) + (c2 + (d - c2) * sx) * sy;
  };
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const n = 0.82 * v(x, y) + 0.18 * r();
    const a = clamp((n - (kind === 'crayon' ? 0.5 : 0.58)) * 4, 0, 1);
    const i = (y * S + x) * 4;
    img.data[i] = img.data[i + 1] = img.data[i + 2] = 0;
    img.data[i + 3] = Math.round(a * 255);
  }
  g.putImageData(img, 0, 0);
  grainCache.set(kind, c);
  return c;
}

const paperCache = new Map();
/** Warm paper tile with fibres and tooth. */
export function paperTexture(color = '#f8f2e4') {
  if (paperCache.has(color)) return paperCache.get(color);
  const S = 512;
  const c = makeCanvas(S, S);
  const g = c.getContext('2d');
  g.fillStyle = color;
  g.fillRect(0, 0, S, S);
  const r = rng('paper-' + color);
  for (let i = 0; i < 9000; i++) {
    const x = r() * S, y = r() * S, a = r() * 0.05;
    g.fillStyle = r() < 0.5 ? `rgba(120,100,70,${a})` : `rgba(255,255,255,${a * 1.4})`;
    g.fillRect(x, y, 1 + r() * 1.5, 1 + r() * 1.5);
  }
  g.lineWidth = 0.6;
  for (let i = 0; i < 140; i++) {
    const x = r() * S, y = r() * S, l = 6 + r() * 18, ang = r() * Math.PI;
    g.strokeStyle = `rgba(140,120,90,${0.04 + r() * 0.05})`;
    g.beginPath(); g.moveTo(x, y); g.quadraticCurveTo(x + Math.cos(ang) * l * 0.5 + r() * 3, y + Math.sin(ang) * l * 0.5, x + Math.cos(ang) * l, y + Math.sin(ang) * l); g.stroke();
  }
  paperCache.set(color, c);
  return c;
}

export function applyGrain(ctx, w, h, amount, kind, res) {
  if (!amount) return;
  const tex = grainTexture(kind);
  const pat = ctx.createPattern(tex, 'repeat');
  pat.setTransform(new DOMMatrix().scale(Math.max(0.35, res * 0.8)));
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.globalCompositeOperation = 'destination-out';
  ctx.globalAlpha = clamp(amount, 0, 1);
  ctx.fillStyle = pat;
  ctx.fillRect(0, 0, w, h);
  ctx.restore();
}

// ---------- stroke rendering ----------
/** Apply boil (re-traced line wobble) to a point at arc length s. */
function boilOffset(seed, phase, s, amp, u = 1) {
  if (!amp) return [0, 0];
  const k = seed + '|' + phase;
  return [noise1(k + 'x', s / (38 * u)) * amp * u, noise1(k + 'y', s / (38 * u)) * amp * u];
}

/**
 * Draw a polyline stroke up to arc length `upto`.
 * stroke = {pts:[[x,y]..], cum:[..], len, width, color, alpha, seed}
 * Returns the pen head position (local coords) or null.
 */
export function drawStroke(ctx, stroke, upto, media, phase, kind, u = 1) {
  const P = stroke.pts, C = stroke.cum;
  if (!P.length || upto <= 0) return null;
  const lim = Math.min(upto, stroke.len);
  const m = kind === 'line' ? media.line : media.fill;
  const passes = kind === 'line' ? m.passes : 1;
  const boilAmp = (media.boil || 0) * (kind === 'line' ? 1 : 0.6);
  let head = null;
  for (let k = 0; k < passes; k++) {
    const r = rng(stroke.seed + k * 7919);
    const jit = (m.jitter ?? 0.8) * u;
    const jx = (r() - 0.5) * jit * (k ? 1.6 : 0.6), jy = (r() - 0.5) * jit * (k ? 1.6 : 0.6);
    const w = stroke.width * (k ? 0.72 : 1);
    ctx.globalAlpha = clamp(stroke.alpha * (k ? 0.55 : 1), 0, 1);
    ctx.strokeStyle = stroke.color;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    if (m.taper && kind === 'line') {
      // variable pressure: draw in short chunks with width following a pressure curve
      let prev = null;
      for (let i = 0; i < P.length; i++) {
        let s = C[i];
        let x = P[i][0], y = P[i][1];
        if (s > lim) {
          const s0 = C[i - 1] ?? 0, f = (lim - s0) / Math.max(1e-6, s - s0);
          x = P[i - 1][0] + (x - P[i - 1][0]) * f; y = P[i - 1][1] + (y - P[i - 1][1]) * f; s = lim;
        }
        const [bx, by] = boilOffset(stroke.seed, phase, s, boilAmp, u);
        const pt = [x + bx + jx, y + by + jy];
        if (prev) {
          const u = s / Math.max(1, stroke.len);
          const press = 0.35 + 0.65 * Math.sin(Math.PI * Math.min(1, Math.max(0, u * 1.05)));
          ctx.lineWidth = Math.max(0.6 * u, w * press * (0.85 + 0.3 * noise1(stroke.seed, s / (25 * u))));
          ctx.beginPath(); ctx.moveTo(prev[0], prev[1]); ctx.lineTo(pt[0], pt[1]); ctx.stroke();
        }
        prev = pt;
        if (s >= lim) break;
      }
      head = prev;
    } else {
      ctx.lineWidth = w;
      ctx.beginPath();
      for (let i = 0; i < P.length; i++) {
        let s = C[i];
        let x = P[i][0], y = P[i][1];
        if (s > lim) {
          const s0 = C[i - 1] ?? 0, f = (lim - s0) / Math.max(1e-6, s - s0);
          x = P[i - 1][0] + (x - P[i - 1][0]) * f; y = P[i - 1][1] + (y - P[i - 1][1]) * f; s = lim;
        }
        const [bx, by] = boilOffset(stroke.seed, phase, s, boilAmp, u);
        if (i === 0) ctx.moveTo(x + bx + jx, y + by + jy); else ctx.lineTo(x + bx + jx, y + by + jy);
        head = [x + bx + jx, y + by + jy];
        if (s >= lim) break;
      }
      if (P.length === 1) ctx.lineTo(P[0][0] + 0.1, P[0][1]);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;
  return head;
}

/** Wash fill: soft flat colour with darker edge (watercolour-ish). Drawn in full; caller masks it. */
export function drawWash(ctx, group, media) {
  ctx.save();
  ctx.globalAlpha = media.fill.alpha;
  ctx.fillStyle = group.color;
  ctx.fill(group.path, group.rule || 'nonzero');
  ctx.globalAlpha = media.fill.alpha * 0.5;
  ctx.strokeStyle = group.color;
  ctx.lineWidth = 3;
  ctx.filter = 'blur(1.5px)';
  ctx.stroke(group.path);
  ctx.restore();
}

export { rgba };
