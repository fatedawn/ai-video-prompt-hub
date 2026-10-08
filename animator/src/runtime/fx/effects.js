// Cinematic effect layers, camera moves and transitions. Original code for ai-video-prompt-hub/animator
// (Apache-2.0, © 2026 天机). Every function is a pure function of time t (seconds) → deterministic, seekable,
// parallel-render safe. Coordinates are design pixels (e.g. 1080×1920); the caller passes the output scale k.
import { clamp01, ease, lerp, rng, makeCanvas, noise1 } from '../util.js';

const TAU = Math.PI * 2;
const hash = (i, j = 0) => { let h = (i * 374761393 + j * 668265263) | 0; h = (h ^ (h >>> 13)) * 1274126177; return ((h ^ (h >>> 16)) >>> 0) / 4294967296; };
const seedOf = (s) => { let h = 2166136261; for (const ch of String(s)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619); return h >>> 0; };
const win = (t, f) => { const fi = f.fadeIn ?? 0.35, fo = f.fadeOut ?? 0.45; return Math.min(clamp01((t - f.start) / fi), f.end == null ? 1 : clamp01((f.end - t) / fo)); };
const expoOut = (u) => (u >= 1 ? 1 : 1 - Math.pow(2, -10 * u));

// ------------------------------------------------------------------ particles
export const PARTICLES = ['stars', 'petals', 'swordqi', 'lightning', 'embers', 'snow', 'sparks', 'bokeh', 'inksplash'];

function star4(g, x, y, r, rot = 0) {
  g.save(); g.translate(x, y); g.rotate(rot); g.beginPath();
  for (let i = 0; i < 8; i++) { const a = (i / 8) * TAU, rr = i % 2 ? r * 0.18 : r; g.lineTo(Math.cos(a) * rr, Math.sin(a) * rr); }
  g.closePath(); g.fill(); g.restore();
}

function petalPath(g, s) {
  g.beginPath(); g.moveTo(0, -s);
  g.bezierCurveTo(s * 0.9, -s * 0.7, s * 0.75, s * 0.55, 0, s);
  g.bezierCurveTo(-s * 0.75, s * 0.55, -s * 0.9, -s * 0.7, -s * 0.12, -s * 0.92);
  g.lineTo(0, -s * 0.72); g.closePath();
}

// midpoint-displacement bolt
function bolt(r, x0, y0, x1, y1, rough, depth, out) {
  if (depth === 0) { out.push([x1, y1]); return; }
  const mx = (x0 + x1) / 2 + (r() - 0.5) * rough, my = (y0 + y1) / 2 + (r() - 0.5) * rough * 0.35;
  bolt(r, x0, y0, mx, my, rough / 2, depth - 1, out); bolt(r, mx, my, x1, y1, rough / 2, depth - 1, out);
}
function strokePts(g, pts) { g.beginPath(); pts.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]))); g.stroke(); }

/** Draw one particle layer f = {kind, start, end, count, color, area:[x0,y0,x1,y1], seed, speed, size, times:[...]} */
export function drawParticles(g, f, t, W, H, k) {
  if (t < f.start || (f.end != null && t > f.end + 1.2)) return;
  const A = win(t, f); if (A <= 0 && f.kind !== 'lightning' && f.kind !== 'swordqi' && f.kind !== 'sparks') return;
  const [x0, y0, x1, y1] = f.area || [0, 0, W, H];
  const aw = x1 - x0, ah = y1 - y0, sd = seedOf(f.seed ?? f.kind), n = f.count, sz = f.size ?? 1, sp = f.speed ?? 1, lt = t - f.start;
  g.save(); g.setTransform(k, 0, 0, k, 0, 0);
  switch (f.kind) {
    case 'stars': {
      g.globalCompositeOperation = 'lighter';
      for (let i = 0; i < (n ?? 40); i++) {
        const x = x0 + hash(sd, i) * aw + Math.sin(lt * 0.3 + i) * 6, y = y0 + hash(sd + 1, i) * ah + lt * 4 * sp * (hash(sd + 5, i) - 0.3);
        const ph = hash(sd + 2, i) * TAU, per = 0.7 + hash(sd + 3, i) * 1.4, tw = 0.5 + 0.5 * Math.sin((lt / per) * TAU + ph);
        const big = hash(sd + 4, i) < 0.18, r = (big ? 26 : 9 + hash(sd + 6, i) * 8) * sz * (0.55 + 0.6 * tw);
        const a = A * (0.35 + 0.65 * tw) * clamp01((lt - hash(sd + 7, i) * 0.6) / 0.3);
        if (a <= 0) continue;
        const col = f.color || (hash(sd + 8, i) < 0.5 ? '255,236,170' : '190,225,255');
        const gr = g.createRadialGradient(x, y, 0, x, y, r * 1.3); gr.addColorStop(0, `rgba(${col},${0.4 * a})`); gr.addColorStop(1, `rgba(${col},0)`);
        g.fillStyle = gr; g.beginPath(); g.arc(x, y, r * 1.3, 0, TAU); g.fill();
        g.fillStyle = `rgba(255,255,250,${a})`; star4(g, x, y, r, big ? lt * 0.4 : 0);
      }
      break;
    }
    case 'petals': {
      for (let i = 0; i < (n ?? 26); i++) {
        const fall = (90 + hash(sd, i) * 90) * sp, span = ah + 240;
        const y = y0 - 120 + ((hash(sd + 1, i) * span + lt * fall) % span);
        const x = x0 + hash(sd + 2, i) * aw + Math.sin(lt * (0.9 + hash(sd + 3, i)) + i) * 60 - lt * 25 * sp;
        const xx = ((x - x0) % aw + aw) % aw + x0;
        const s = (14 + hash(sd + 4, i) * 12) * sz, rot = lt * (1 + hash(sd + 5, i) * 2) + i, flip = Math.cos(lt * (2 + hash(sd + 6, i) * 2) + i);
        g.save(); g.translate(xx, y); g.rotate(rot); g.scale(Math.max(0.15, Math.abs(flip)), 1);
        g.globalAlpha = A * 0.92;
        const gr = g.createLinearGradient(0, -s, 0, s); gr.addColorStop(0, f.color || '#ffd6e2'); gr.addColorStop(1, flip > 0 ? '#f59ab8' : '#ffb7cb');
        g.fillStyle = gr; petalPath(g, s); g.fill();
        g.strokeStyle = 'rgba(214,92,130,.35)'; g.lineWidth = 1.2; g.stroke();
        g.restore();
      }
      break;
    }
    case 'snow': {
      for (let i = 0; i < (n ?? 80); i++) {
        const fall = (60 + hash(sd, i) * 80) * sp, span = ah + 40;
        const y = y0 - 20 + ((hash(sd + 1, i) * span + lt * fall) % span), x = x0 + hash(sd + 2, i) * aw + Math.sin(lt + i) * 18;
        const r = (2 + hash(sd + 3, i) * 4) * sz; g.fillStyle = `rgba(255,255,255,${A * (0.5 + hash(sd + 4, i) * 0.5)})`;
        g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill();
      }
      break;
    }
    case 'embers': {
      g.globalCompositeOperation = 'lighter';
      for (let i = 0; i < (n ?? 50); i++) {
        const rise = (70 + hash(sd, i) * 120) * sp, span = ah + 60;
        const y = y1 + 30 - ((hash(sd + 1, i) * span + lt * rise) % span), x = x0 + hash(sd + 2, i) * aw + Math.sin(lt * 1.7 + i * 2) * 26;
        const fl = 0.6 + 0.4 * Math.sin(lt * 9 + i * 3), r = (2.5 + hash(sd + 3, i) * 4) * sz;
        const top = clamp01((y - y0) / (ah * 0.35));
        const gr = g.createRadialGradient(x, y, 0, x, y, r * 4); const col = f.color || '255,150,60';
        gr.addColorStop(0, `rgba(255,240,200,${A * fl * top})`); gr.addColorStop(0.25, `rgba(${col},${0.8 * A * fl * top})`); gr.addColorStop(1, `rgba(${col},0)`);
        g.fillStyle = gr; g.beginPath(); g.arc(x, y, r * 4, 0, TAU); g.fill();
      }
      break;
    }
    case 'bokeh': {
      g.globalCompositeOperation = 'screen';
      for (let i = 0; i < (n ?? 14); i++) {
        const x = x0 + hash(sd, i) * aw + Math.sin(lt * 0.25 + i) * 40, y = y0 + hash(sd + 1, i) * ah + Math.cos(lt * 0.2 + i) * 30;
        const r = (40 + hash(sd + 2, i) * 90) * sz, col = f.color || ['255,210,140', '160,200,255', '255,160,200'][i % 3];
        const gr = g.createRadialGradient(x, y, r * 0.6, x, y, r); gr.addColorStop(0, `rgba(${col},${0.16 * A})`); gr.addColorStop(0.9, `rgba(${col},${0.22 * A})`); gr.addColorStop(1, `rgba(${col},0)`);
        g.fillStyle = gr; g.beginPath(); g.arc(x, y, r, 0, TAU); g.fill();
      }
      break;
    }
    case 'swordqi': {
      // crescent slashes of light (剑气): each event = a fast arc sweep + glow + shed sparks
      const times = f.times || Array.from({ length: Math.max(1, Math.floor(((f.end ?? f.start + 2) - f.start) / (f.every || 0.6))) }, (_, i) => f.start + i * (f.every || 0.6));
      g.globalCompositeOperation = 'lighter';
      times.forEach((t0, e) => {
        const u = (t - t0) / (f.life || 0.5); if (u < 0 || u > 1) return;
        const r = rng(sd + e * 97);
        const cx = x0 + (0.25 + r() * 0.5) * aw, cy = y0 + (0.25 + r() * 0.5) * ah, R = (260 + r() * 260) * sz;
        const a0 = r() * TAU, span = (1.2 + r() * 0.9) * (r() < 0.5 ? 1 : -1);
        const head = expoOut(clamp01(u / 0.45)), tail = ease.inOut(clamp01((u - 0.12) / 0.75));
        const fade = 1 - clamp01((u - 0.6) / 0.4);
        const col = f.color || '150,235,255';
        const N = 40;
        for (const [w, a, c] of [[34, 0.18, col], [16, 0.45, col], [5, 0.95, '255,255,255']]) {
          g.lineCap = 'round';
          for (let j = 0; j < N; j++) {
            const q0 = lerp(tail, head, j / N), q1 = lerp(tail, head, (j + 1) / N);
            const taper = Math.sin(Math.PI * (j + 0.5) / N);
            g.strokeStyle = `rgba(${c},${a * fade * taper})`; g.lineWidth = w * sz * (0.3 + taper);
            g.beginPath(); g.arc(cx, cy, R, a0 + span * q0, a0 + span * q1, span < 0); g.stroke();
          }
        }
        for (let j = 0; j < 14; j++) { // sparks shed from the blade
          const q = lerp(tail, head, r()), ang = a0 + span * q, d = R + (r() - 0.3) * 40 + u * 120 * r();
          g.fillStyle = `rgba(${col},${0.8 * fade})`; g.beginPath(); g.arc(cx + Math.cos(ang) * d, cy + Math.sin(ang) * d, 2 + r() * 3, 0, TAU); g.fill();
        }
      });
      break;
    }
    case 'lightning': {
      const times = f.times || [f.start];
      times.forEach((t0, e) => {
        const u = (t - t0) / (f.life || 0.45); if (u < 0 || u > 1) return;
        const step = Math.floor((t - t0) * 24);                    // re-strike flicker at 24 fps
        const vis = [1, 0.35, 1, 0.8, 0.2, 0.7, 0.4, 0.25, 0.15, 0.1, 0.05][Math.min(10, step)] ?? 0;
        const r = rng(sd + e * 131 + (step >> 1) * 7);
        const sx = x0 + (0.2 + r() * 0.6) * aw, ex = sx + (r() - 0.5) * aw * 0.6;
        const pts = [[sx, y0]]; bolt(r, sx, y0, ex, y1, aw * 0.35, 7, pts);
        // full-frame flash
        g.globalCompositeOperation = 'screen'; g.fillStyle = `rgba(200,220,255,${0.35 * vis * (f.flash ?? 1)})`; g.fillRect(0, 0, W, H);
        g.globalCompositeOperation = 'lighter'; g.lineJoin = 'round'; g.lineCap = 'round';
        const col = f.color || '140,170,255';
        for (const [w, a, c] of [[26, 0.16, col], [10, 0.4, col], [3.2, 1, '255,255,255']]) { g.strokeStyle = `rgba(${c},${a * vis})`; g.lineWidth = w * sz; strokePts(g, pts); }
        for (let b = 0; b < 3; b++) { // branches
          const i0 = 8 + Math.floor(r() * (pts.length - 30)), p = pts[i0], bp = [p];
          bolt(r, p[0], p[1], p[0] + (r() - 0.5) * aw * 0.5, p[1] + ah * (0.15 + r() * 0.2), aw * 0.12, 5, bp);
          for (const [w, a, c] of [[12, 0.15, col], [2, 0.8, '235,240,255']]) { g.strokeStyle = `rgba(${c},${a * vis})`; g.lineWidth = w * sz; strokePts(g, bp); }
        }
      });
      break;
    }
    case 'sparks': {
      const times = f.times || [f.start], [px, py] = f.from || [W / 2, H / 2];
      g.globalCompositeOperation = 'lighter';
      times.forEach((t0, e) => {
        const tt = t - t0; if (tt < 0 || tt > (f.life || 1.1)) return;
        const r = rng(sd + e * 17);
        for (let i = 0; i < (n ?? 60); i++) {
          const ang = r() * TAU, v = (300 + r() * 900) * sp, life = (0.5 + r() * 0.6) * (f.life || 1.1); const q = tt / life; if (q > 1) continue;
          const x = px + Math.cos(ang) * v * tt * (1 - 0.35 * q), y = py + Math.sin(ang) * v * tt * (1 - 0.35 * q) + 500 * tt * tt;
          const vx = Math.cos(ang) * v * 0.03, vy = Math.sin(ang) * v * 0.03 + 30 * tt;
          g.strokeStyle = `rgba(${f.color || '255,214,120'},${1 - q})`; g.lineWidth = (2 + r() * 2.5) * sz;
          g.beginPath(); g.moveTo(x, y); g.lineTo(x - vx, y - vy); g.stroke();
        }
      });
      break;
    }
    case 'inksplash': {
      const times = f.times || [f.start];
      times.forEach((t0, e) => {
        const tt = t - t0; if (tt < 0) return; const r = rng(sd + e * 29);
        const [px, py] = f.from || [x0 + r() * aw, y0 + r() * ah];
        const grow = expoOut(clamp01(tt / 0.35)); g.fillStyle = `rgba(${f.color || '24,20,18'},${0.9 * A})`;
        for (let i = 0; i < 26; i++) { const ang = r() * TAU, d = (40 + r() * 260) * sz * grow, rr = (3 + r() * 16) * sz * (1 - d / (320 * sz)); if (rr <= 0) continue; g.beginPath(); g.arc(px + Math.cos(ang) * d, py + Math.sin(ang) * d, rr, 0, TAU); g.fill(); }
        g.beginPath(); for (let j = 0; j <= 40; j++) { const a = (j / 40) * TAU, rr = (70 + 26 * noise1(e * 7 + j % 40, 0.3) + 18 * Math.sin(a * 7 + e)) * sz * grow; j ? g.lineTo(px + Math.cos(a) * rr, py + Math.sin(a) * rr) : g.moveTo(px + Math.cos(a) * rr, py + Math.sin(a) * rr); } g.fill();
      });
      break;
    }
    default: throw new Error(`未知粒子 ${f.kind}（可选：${PARTICLES.join(' ')}）`);
  }
  g.restore();
}

// ------------------------------------------------------------------ overlay effects
export const OVERLAYS = ['flash', 'speedlines', 'shockwave', 'godrays', 'letterbox', 'grade', 'lightsweep', 'glow'];

export function drawOverlay(g, f, t, W, H, k) {
  g.save(); g.setTransform(k, 0, 0, k, 0, 0);
  const lt = t - f.start;
  switch (f.type) {
    case 'flash': {
      const d = f.dur || 0.35; if (lt < 0 || lt > d) break;
      const a = (f.amount ?? 0.85) * Math.pow(1 - lt / d, 2);
      g.fillStyle = f.color ? f.color.replace(/\)$/, `,${a})`).replace('rgb(', 'rgba(') : `rgba(255,252,240,${a})`; g.fillRect(0, 0, W, H); break;
    }
    case 'speedlines': {
      if (t < f.start || t > f.end) break; const A = win(t, { ...f, fadeIn: 0.12, fadeOut: 0.2 });
      const [cx, cy] = f.center || [W / 2, H * 0.45], r = rng(seedOf(f.seed || 'sl') + Math.floor(t * 12));
      g.fillStyle = f.color || 'rgba(255,255,255,0.9)'; g.globalAlpha = A * (f.amount ?? 0.7);
      const R0 = (f.inner ?? 0.36) * W, R1 = Math.hypot(W, H);
      for (let i = 0; i < (f.count || 90); i++) {
        const a = r() * TAU, w = 0.004 + r() * 0.012, r0 = R0 * (0.8 + r() * 0.6);
        g.beginPath(); g.moveTo(cx + Math.cos(a - w) * R1, cy + Math.sin(a - w) * R1); g.lineTo(cx + Math.cos(a) * r0, cy + Math.sin(a) * r0); g.lineTo(cx + Math.cos(a + w) * R1, cy + Math.sin(a + w) * R1); g.fill();
      }
      break;
    }
    case 'shockwave': {
      const d = f.dur || 0.6; if (lt < 0 || lt > d) break; const u = lt / d, [cx, cy] = f.center || [W / 2, H / 2];
      const R = expoOut(u) * (f.radius || 900);
      g.globalCompositeOperation = 'lighter';
      for (const [w, a] of [[60, 0.12], [22, 0.3], [6, 0.9]]) { g.strokeStyle = `rgba(${f.color || '255,240,200'},${a * (1 - u)})`; g.lineWidth = w * (1 - u * 0.6); g.beginPath(); g.arc(cx, cy, R, 0, TAU); g.stroke(); }
      break;
    }
    case 'godrays': {
      if (t < f.start || (f.end != null && t > f.end)) break; const A = win(t, f), [cx, cy] = f.center || [W * 0.5, -60];
      g.globalCompositeOperation = 'screen';
      const n = f.count || 9, R = Math.hypot(W, H) * 1.2;
      for (let i = 0; i < n; i++) {
        const base = (f.spread ?? 1.2) * ((i / (n - 1)) - 0.5) + Math.PI / 2 + Math.sin(t * 0.35 + i * 1.7) * 0.05, w = 0.025 + 0.03 * hash(i, 3);
        const gr = g.createRadialGradient(cx, cy, 0, cx, cy, R); const col = f.color || '255,236,190';
        gr.addColorStop(0, `rgba(${col},${0.3 * A * (f.amount ?? 1)})`); gr.addColorStop(1, `rgba(${col},0)`);
        g.fillStyle = gr; g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(base - w) * R, cy + Math.sin(base - w) * R); g.lineTo(cx + Math.cos(base + w) * R, cy + Math.sin(base + w) * R); g.fill();
      }
      break;
    }
    case 'letterbox': {
      if (t < f.start || (f.end != null && t > f.end + 0.5)) break; const A = win(t, { ...f, fadeIn: 0.5, fadeOut: 0.5 });
      const h = (f.size ?? 0.09) * H * ease.inOut(A); g.fillStyle = f.color || '#0b0a0a'; g.fillRect(0, 0, W, h); g.fillRect(0, H - h, W, h); break;
    }
    case 'grade': {
      if (t < f.start || (f.end != null && t > f.end + 0.5)) break; const A = win(t, f) * (f.amount ?? 1);
      const looks = { 'teal-orange': [['multiply', 'rgba(40,110,130,X)', 0.35], ['soft-light', 'rgba(255,150,60,X)', 0.4]], warm: [['soft-light', 'rgba(255,170,80,X)', 0.45]], cold: [['soft-light', 'rgba(60,120,255,X)', 0.45]], noir: [['saturation', 'rgba(0,0,0,X)', 1], ['multiply', 'rgba(60,60,70,X)', 0.3]], dream: [['screen', 'rgba(255,200,230,X)', 0.18]] };
      for (const [op, col, a] of looks[f.look || 'teal-orange'] || []) { g.globalCompositeOperation = op; g.fillStyle = col.replace('X', String(a * A)); g.fillRect(0, 0, W, H); }
      break;
    }
    case 'lightsweep': {
      const d = f.dur || 0.9; if (lt < 0 || lt > d) break; const u = ease.inOut(lt / d), x = lerp(-W * 0.6, W * 1.6, u);
      g.globalCompositeOperation = 'screen'; g.translate(x, H / 2); g.rotate(f.angle ?? 0.35);
      const w = f.width || 220, gr = g.createLinearGradient(-w, 0, w, 0); gr.addColorStop(0, 'rgba(255,255,255,0)'); gr.addColorStop(0.5, `rgba(255,250,230,${f.amount ?? 0.55})`); gr.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = gr; g.fillRect(-w, -H * 1.5, w * 2, H * 3); break;
    }
    case 'glow': { // soft radial glow behind a point (e.g. a character "aura")
      if (t < f.start || (f.end != null && t > f.end + 0.5)) break; const A = win(t, f), [cx, cy] = f.center || [W / 2, H / 2], R = f.radius || 420;
      const pulse = 1 + 0.06 * Math.sin(t * 3.2);
      g.globalCompositeOperation = 'screen'; const gr = g.createRadialGradient(cx, cy, 0, cx, cy, R * pulse);
      gr.addColorStop(0, `rgba(${f.color || '255,220,150'},${0.55 * A})`); gr.addColorStop(1, `rgba(${f.color || '255,220,150'},0)`); g.fillStyle = gr; g.fillRect(0, 0, W, H); break;
    }
    default: throw new Error(`未知特效 ${f.type}`);
  }
  g.restore();
}

// ------------------------------------------------------------------ reveals (need the rendered scene layer)
/** Pencil sketch of a colour layer: grayscale, colour-dodge with its blurred inverse, multiplied on paper. */
export function sketchOf(src, out, k, paper = '#f6f0e2') {
  const g = out.getContext('2d'), w = out.width, h = out.height;
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-over'; g.globalAlpha = 1;
  g.filter = 'grayscale(1) contrast(1.15)'; g.drawImage(src, 0, 0); g.filter = 'none';
  g.globalCompositeOperation = 'color-dodge'; g.filter = `grayscale(1) invert(1) blur(${Math.max(1, 3.5 * k)}px)`; g.drawImage(src, 0, 0); g.filter = 'none';
  g.globalCompositeOperation = 'multiply'; g.filter = 'contrast(1.6) brightness(1.05)'; g.drawImage(out, 0, 0); g.filter = 'none';
  g.globalCompositeOperation = 'multiply'; g.fillStyle = paper; g.fillRect(0, 0, w, h);
  g.globalCompositeOperation = 'source-over';
  return out;
}

function blobPath(g, cx, cy, R, seed, wob = 0.22) {
  g.beginPath();
  for (let j = 0; j <= 72; j++) { const a = (j / 72) * TAU, n = noise1(seed + (j % 72) * 0.37, 0.5) * 0.6 + Math.sin(a * 5 + seed) * 0.25 + Math.sin(a * 11 + seed * 2) * 0.15;
    const rr = R * (1 + wob * n); j ? g.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr) : g.moveTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr); }
  g.closePath();
}

/** Mask (white = revealed) for sketch→colour: soft brush strokes zig-zagging across the frame, or a bloom from a point. */
export function revealMask(m, u, W, H, k, mode = 'brush', seed = 1, center) {
  const g = m.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, m.width, m.height);
  g.setTransform(k, 0, 0, k, 0, 0); g.fillStyle = '#fff'; g.strokeStyle = '#fff';
  if (u >= 1) { g.fillRect(0, 0, W, H); return m; }
  if (mode === 'bloom') {
    const [cx, cy] = center || [W / 2, H * 0.5], R = ease.inOut(u) * Math.hypot(W, H) * 0.62;
    g.filter = `blur(${18 * k}px)`; blobPath(g, cx, cy, R, seed); g.fill(); g.filter = 'none'; return m;
  }
  const rows = 6, bw = H / rows * 1.55, r = rng(seed), pts = [];
  for (let i = 0; i <= rows; i++) { const y = (i / rows) * H + (r() - 0.5) * 50; pts.push(i % 2 ? [W * 1.15, y] : [-W * 0.15, y]); }
  const cum = [0]; for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  const lim = ease.inOut(u) * cum[cum.length - 1];
  g.lineWidth = bw; g.lineCap = 'round'; g.lineJoin = 'round'; g.filter = `blur(${10 * k}px)`; g.beginPath();
  for (let i = 0; i < pts.length; i++) {
    let [x, y] = pts[i];
    if (cum[i] > lim) { const q = (lim - cum[i - 1]) / (cum[i] - cum[i - 1]); x = lerp(pts[i - 1][0], x, q); y = lerp(pts[i - 1][1], y, q); }
    i ? g.lineTo(x, y) : g.moveTo(x, y); if (cum[i] > lim) break;
  }
  g.stroke(); g.filter = 'none';
  return m;
}

/** Ink-bloom intro mask: ink drops land one after another and spread with noisy edges. Returns {mask, rim}. */
export function inkMask(m, rim, u, W, H, k, seed = 7, drops) {
  const g = m.getContext('2d'), gr = rim.getContext('2d');
  for (const x of [g, gr]) { x.setTransform(1, 0, 0, 1, 0, 0); x.clearRect(0, 0, m.width, m.height); x.setTransform(k, 0, 0, k, 0, 0); }
  const r = rng(seed);
  const D = drops || [[W * 0.5, H * 0.5, 0.04, 0.9], ...Array.from({ length: 5 }, (_, i) => [W * (0.15 + r() * 0.7), H * (0.12 + r() * 0.76), 0.16 + i * 0.1 + r() * 0.05, 0.45 + r() * 0.3])];
  g.fillStyle = '#fff'; g.filter = `blur(${6 * k}px)`;
  const st = D.map(([x, y, t0, s], i) => { const q = ease.inOut(clamp01((u - t0) / 0.7)); return [x, y, q, q * Math.hypot(W, H) * 0.62 * s, i]; });
  for (const [x, y, q, R, i] of st) if (q > 0) { blobPath(g, x, y, R, seed + i * 13, 0.28); g.fill(); }
  g.filter = 'none';
  gr.filter = `blur(${5 * k}px)`; gr.lineWidth = 26;
  for (const [x, y, q, R, i] of st) { if (q <= 0 || q >= 1) continue; gr.strokeStyle = `rgba(20,16,14,${0.75 * Math.pow(1 - q, 1.4)})`; blobPath(gr, x, y, R, seed + i * 13, 0.28); gr.stroke(); }
  gr.filter = 'none';
  return { mask: m, rim };
}

// ------------------------------------------------------------------ camera moves
export const CAMERA_MOVES = ['crashZoom', 'dollyZoom', 'whip', 'dutch', 'orbit', 'crane', 'punch', 'pushIn', 'pullOut', 'drift'];

/** Additive camera offsets {x, y, zoomMul, rot, bgZoom, blur:[dx,dy]} from the scene's move list at time t. */
export function cameraMoves(moves, t) {
  const o = { x: 0, y: 0, zoomMul: 1, rot: 0, bgZoom: 1, blurX: 0, blurY: 0 };
  for (const m of moves || []) {
    const u = (t - m.at) / (m.dur || 0.5);
    if (m.type === 'punch') { for (const at of [].concat(m.times || m.at)) { const q = (t - at) * 60; if (q >= 0 && q < 18) o.zoomMul *= 1 + (m.amt ?? 0.045) * Math.pow(1 - q / 18, 1.6); } continue; }
    if (u < 0) continue;
    const uu = clamp01(u);
    switch (m.type) {
      case 'crashZoom': { const back = m.release ? ease.inOut(clamp01((t - m.release) / (m.releaseDur || 0.5))) : 0; o.zoomMul *= 1 + (m.amt ?? 0.3) * expoOut(uu) * (1 - back);
        if (u < 1) { o.x += Math.sin(t * 61) * 5 * (1 - uu); o.y += Math.cos(t * 53) * 5 * (1 - uu); } break; }
      case 'pushIn': o.zoomMul *= 1 + (m.amt ?? 0.15) * ease.inOut(uu); break;
      case 'pullOut': o.zoomMul *= 1 / (1 + (m.amt ?? 0.15) * ease.inOut(uu)); break;
      case 'dollyZoom': o.bgZoom *= 1 + (m.amt ?? 0.35) * ease.inOut(uu); o.zoomMul *= 1 - (m.amt ?? 0.35) * 0.08 * ease.inOut(uu); break;
      case 'whip': { // fast pan with motion blur, lands back on target
        const s = Math.sin(Math.PI * uu), dir = m.dir === 'up' ? [0, 1] : m.dir === 'down' ? [0, -1] : m.dir === 'right' ? [-1, 0] : [1, 0];
        const d = (m.dist ?? 380) * (u < 1 ? Math.sin(Math.PI * ease.inOut(uu)) : 0);
        o.x += dir[0] * d; o.y += dir[1] * d; o.blurX += Math.abs(dir[0]) * s * (m.blur ?? 40); o.blurY += Math.abs(dir[1]) * s * (m.blur ?? 40); break;
      }
      case 'dutch': o.rot += (m.deg ?? 8) * ease.inOut(uu) * (m.back ? 1 - ease.inOut(clamp01((t - m.back) / 0.5)) : 1); break;
      case 'orbit': o.rot += (m.deg ?? 6) * Math.sin(uu * Math.PI * 2 * (m.turns || 0.5)); o.x += (m.dist ?? 40) * Math.sin(uu * Math.PI * 2 * (m.turns || 0.5)); break;
      case 'crane': o.y += (m.dy ?? -160) * ease.inOut(uu); break;
      case 'drift': o.x += (m.dx ?? 40) * Math.sin((t - m.at) * 0.6); o.y += (m.dy ?? 20) * Math.cos((t - m.at) * 0.5); break;
      default: break;
    }
  }
  return o;
}

// ------------------------------------------------------------------ own transitions
export const OWN_TRANSITIONS = ['flash', 'whipPan', 'zoomBlur', 'inkWipe', 'lightLeak', 'glitch', 'spinZoom', 'sketchWipe'];

const tscratch = {};
function ts(key, w, h) { let c = tscratch[key]; if (!c || c.width !== w || c.height !== h) c = tscratch[key] = makeCanvas(w, h); return c; }

export function ownTransition(type, ctx, A, B, p, o) {
  const w = ctx.canvas.width, h = ctx.canvas.height, k = o.k || 1;
  ctx.save();
  switch (type) {
    case 'flash': {
      ctx.drawImage(p < 0.5 ? A : B, 0, 0);
      const a = 1 - Math.abs(p - 0.5) * 2; ctx.fillStyle = `rgba(${o.color || '255,252,240'},${Math.pow(a, 0.7)})`; ctx.fillRect(0, 0, w, h); break;
    }
    case 'whipPan': {
      const dir = o.dir === 'up' ? [0, -1] : o.dir === 'down' ? [0, 1] : o.dir === 'right' ? [1, 0] : [-1, 0];
      const e = ease.inOut(p), sx = dir[0] * w, sy = dir[1] * h, n = 9, blur = Math.sin(Math.PI * p) * 0.12;
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < n; i++) { const q = e + (i / (n - 1) - 0.5) * blur; ctx.globalAlpha = 1 / n * 1.6;
        ctx.drawImage(A, sx * q, sy * q); ctx.drawImage(B, sx * (q - 1), sy * (q - 1)); }
      ctx.globalAlpha = 1; break;
    }
    case 'zoomBlur': {
      const e = ease.inOut(p), src = p < 0.5 ? A : B, z = p < 0.5 ? 1 + e * 1.4 : 1 + (1 - e) * 1.4, n = 8;
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, w, h);
      for (let i = 0; i < n; i++) { const zz = z * (1 + i * 0.035 * Math.sin(Math.PI * p)); ctx.globalAlpha = i ? 0.22 : 1; ctx.setTransform(zz, 0, 0, zz, w / 2 * (1 - zz), h / 2 * (1 - zz)); ctx.drawImage(src, 0, 0); }
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = Math.max(0, 1 - Math.abs(p - 0.5) * 6) * 0.6; ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, w, h); break;
    }
    case 'inkWipe': case 'sketchWipe': {
      ctx.drawImage(A, 0, 0);
      const m = ts('m', w, h), rim = ts('rim', w, h), lay = ts('lay', w, h), W = w / k, H = h / k;
      if (type === 'inkWipe') inkMask(m, rim, p, W, H, k, o.seed || 11, o.drops); else revealMask(m, p, W, H, k, 'brush', o.seed || 5);
      const g = lay.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.globalCompositeOperation = 'source-over'; g.clearRect(0, 0, w, h); g.drawImage(B, 0, 0);
      g.globalCompositeOperation = 'destination-in'; g.drawImage(m, 0, 0); g.globalCompositeOperation = 'source-over';
      ctx.drawImage(lay, 0, 0);
      if (type === 'inkWipe') { ctx.globalCompositeOperation = 'multiply'; ctx.drawImage(rim, 0, 0); ctx.globalCompositeOperation = 'source-over'; }
      break;
    }
    case 'lightLeak': {
      ctx.drawImage(A, 0, 0); ctx.globalAlpha = ease.inOut(clamp01((p - 0.3) / 0.4)); ctx.drawImage(B, 0, 0); ctx.globalAlpha = 1;
      const a = Math.sin(Math.PI * p); ctx.globalCompositeOperation = 'screen';
      for (const [cx, cy, r, col] of [[0.1, 0.2, 0.9, '255,140,60'], [0.9, 0.55, 0.8, '255,60,110'], [0.4, 0.95, 0.7, '255,220,120']]) {
        const x = (cx + (p - 0.5) * 0.4) * w, y = cy * h, R = r * h; const gr = ctx.createRadialGradient(x, y, 0, x, y, R);
        gr.addColorStop(0, `rgba(${col},${0.85 * a})`); gr.addColorStop(1, `rgba(${col},0)`); ctx.fillStyle = gr; ctx.fillRect(0, 0, w, h); }
      ctx.globalCompositeOperation = 'source-over'; break;
    }
    case 'glitch': {
      const src = p < 0.5 ? A : B, amp = Math.sin(Math.PI * p), r = rng(Math.floor(p * 20) * 13 + 5);
      ctx.drawImage(src, 0, 0);
      let y = 0; while (y < h) { const hh = (8 + r() * 70) * k; if (r() < 0.5 * amp + 0.1) ctx.drawImage(r() < p ? B : A, 0, y, w, hh, (r() - 0.5) * 160 * k * amp, y, w, hh); y += hh; }
      ctx.globalCompositeOperation = 'screen'; ctx.globalAlpha = 0.5 * amp;
      const tmp = ts('gl', w, h), tg = tmp.getContext('2d');
      for (const [col, dx] of [['#ff0040', 12], ['#00e5ff', -12]]) { tg.globalCompositeOperation = 'source-over'; tg.clearRect(0, 0, w, h); tg.drawImage(src, 0, 0); tg.globalCompositeOperation = 'multiply'; tg.fillStyle = col; tg.fillRect(0, 0, w, h); tg.globalCompositeOperation = 'destination-in'; tg.drawImage(src, 0, 0); ctx.drawImage(tmp, dx * k * amp, 0); }
      ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; break;
    }
    case 'spinZoom': {
      const e = ease.inOut(p), src = p < 0.5 ? A : B, s = p < 0.5 ? 1 + e * 2 : 1 + (1 - e) * 2, rot = (p < 0.5 ? e : e - 1) * Math.PI * 0.5;
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, w, h); ctx.translate(w / 2, h / 2); ctx.rotate(rot); ctx.scale(s, s); ctx.globalAlpha = 1 - Math.max(0, 1 - Math.abs(p - 0.5) * 4) * 0.5; ctx.drawImage(src, -w / 2, -h / 2); break;
    }
    default: throw new Error(`未知转场 ${type}`);
  }
  ctx.restore();
}
