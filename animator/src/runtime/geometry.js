// SVG -> stroke "drawing" conversion. Original code for ai-video-prompt-hub/animator.
// Every SVG outline becomes a sampled polyline that can be drawn progressively (stroke-by-stroke),
// every filled shape gets colouring marks generated inside it (scribble / hatching / wash mask).
import { rng, noise1, shade, hexToRgb } from './util.js';

let host = null;
function getHost() {
  if (!host) {
    host = document.createElement('div');
    host.style.cssText = 'position:absolute;left:-20000px;top:0;opacity:0;pointer-events:none;';
    document.body.appendChild(host);
  }
  return host;
}

/** Parse SVG markup and attach it (hidden) so geometry APIs and computed styles work. */
export function mountSvg(markup) {
  const doc = new DOMParser().parseFromString(markup, 'image/svg+xml');
  const err = doc.querySelector('parsererror');
  if (err) throw new Error('SVG 解析失败: ' + err.textContent.slice(0, 200));
  const svg = document.importNode(doc.documentElement, true);
  const vb = svg.viewBox && svg.viewBox.baseVal && svg.viewBox.baseVal.width ? svg.viewBox.baseVal : null;
  const w = vb ? vb.width : parseFloat(svg.getAttribute('width')) || 200;
  const h = vb ? vb.height : parseFloat(svg.getAttribute('height')) || 200;
  svg.setAttribute('width', w);
  svg.setAttribute('height', h);
  getHost().appendChild(svg);
  return { svg, viewBox: vb ? { x: vb.x, y: vb.y, w: vb.width, h: vb.height } : { x: 0, y: 0, w, h } };
}

const GEOM = 'path,circle,ellipse,rect,line,polyline,polygon';

function parseColor(c) {
  if (!c || c === 'none' || c === 'transparent' || c.startsWith('url(')) return c && c.startsWith('url(') ? '#9a9a9a' : null;
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (m) {
    const p = m[1].split(',').map((s) => parseFloat(s));
    if (p.length === 4 && p[3] === 0) return null;
    return '#' + p.slice(0, 3).map((v) => Math.round(v).toString(16).padStart(2, '0')).join('');
  }
  return c;
}

function cumulative(pts) {
  const cum = [0];
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  return cum;
}

/** Sample a geometry element into polylines in root user space. */
function sampleElement(el, rootInv, step) {
  const L = el.getTotalLength ? el.getTotalLength() : 0;
  if (!(L > 0)) return { polys: [], scale: 1 };
  const M = rootInv.multiply(el.getScreenCTM());
  const scale = Math.sqrt(Math.abs(M.a * M.d - M.b * M.c)) || 1;
  const n = Math.max(6, Math.ceil(L / step));
  const polys = [];
  let cur = [];
  let prev = null;
  const jump = step * 2.6;
  for (let i = 0; i <= n; i++) {
    const p = el.getPointAtLength((L * i) / n);
    const q = new DOMPoint(p.x, p.y).matrixTransform(M);
    const pt = [q.x, q.y];
    if (prev && Math.hypot(p.x - prev.x, p.y - prev.y) > jump) {
      if (cur.length > 1) polys.push(cur);
      cur = [];
    }
    cur.push(pt);
    prev = p;
  }
  if (cur.length > 1) polys.push(cur);
  return { polys, scale };
}

function bboxOf(polys) {
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const P of polys) for (const [x, y] of P) { if (x < x0) x0 = x; if (y < y0) y0 = y; if (x > x1) x1 = x; if (y > y1) y1 = y; }
  return { x0, y0, x1, y1 };
}

/** Scanline intervals of polygons along direction `angle` (degrees). Even-odd rule. */
function hatchIntervals(polys, angle, spacing) {
  const a = (angle * Math.PI) / 180, ca = Math.cos(a), sa = Math.sin(a);
  // rotate into hatch space (u along hatch, v across)
  const rp = polys.map((P) => P.map(([x, y]) => [x * ca + y * sa, -x * sa + y * ca]));
  const b = bboxOf(rp);
  const rows = [];
  for (let v = b.y0 + spacing * 0.5; v < b.y1; v += spacing) {
    const xs = [];
    for (const P of rp) {
      for (let i = 0; i < P.length; i++) {
        const p = P[i], q = P[(i + 1) % P.length];
        if ((p[1] <= v && q[1] > v) || (q[1] <= v && p[1] > v)) xs.push(p[0] + ((v - p[1]) / (q[1] - p[1])) * (q[0] - p[0]));
      }
    }
    xs.sort((m, n) => m - n);
    const iv = [];
    for (let i = 0; i + 1 < xs.length; i += 2) if (xs[i + 1] - xs[i] > 0.5) iv.push([xs[i], xs[i + 1]]);
    rows.push({ v, iv });
  }
  const back = (u, v) => [u * ca - v * sa, u * sa + v * ca];
  return { rows, back };
}

/** Generate colouring marks inside polygons. Returns array of polylines. */
function makeFillMarks(polys, fill, seed, layer, u = 1) {
  const r = rng(seed);
  const angle = fill.angle + layer * 63 + (r() - 0.5) * 10;
  const spacing = fill.spacing * (layer ? 1.25 : 1);
  const { rows, back } = hatchIntervals(polys, angle, spacing);
  const ext = fill.width * 0.6;
  const marks = [];
  const sub = (u0, u1, v, out) => {
    const n = Math.max(1, Math.ceil(Math.abs(u1 - u0) / (14 * u)));
    for (let k = 0; k <= n; k++) {
      const uu = u0 + ((u1 - u0) * k) / n;
      const wob = noise1(seed + 'w' + Math.round(v / u), uu / (30 * u)) * spacing * 0.2;
      out.push(back(uu, v + wob));
    }
  };
  if (fill.zigzag) {
    // continuous back-and-forth chains, one chain per interval column
    const chains = [];
    rows.forEach((row, ri) => {
      row.iv.forEach(([u0, u1], j) => {
        let ch = chains[j];
        if (!ch || ch.last !== ri - 1) { ch = { pts: [], last: ri - 1, dir: ri % 2 }; chains[j] = ch; marks.push(ch.pts); }
        const o0 = (r() - 0.3) * ext, o1 = (r() - 0.3) * ext;
        if (ch.dir) sub(u1 + o1, u0 - o0, row.v, ch.pts); else sub(u0 - o0, u1 + o1, row.v, ch.pts);
        ch.dir = 1 - ch.dir;
        ch.last = ri;
      });
    });
  } else {
    // one-direction hatching: separate short marks, gently grouped
    rows.forEach((row) => row.iv.forEach(([u0, u1]) => {
      const pts = [];
      sub(u0 - r() * ext, u1 + r() * ext, row.v, pts);
      marks.push(pts);
    }));
  }
  return marks.filter((m) => m.length > 1);
}

/** Polygon path for clipping/washing. */
function polyPath(polys) {
  const p = new Path2D();
  for (const P of polys) { p.moveTo(P[0][0], P[0][1]); for (let i = 1; i < P.length; i++) p.lineTo(P[i][0], P[i][1]); p.closePath(); }
  return p;
}

function desat(hex, amt) {
  if (!amt) return hex;
  const { r, g, b } = hexToRgb(hex);
  const l = 0.3 * r + 0.59 * g + 0.11 * b;
  const f = (c) => Math.round(c + (l - c) * amt);
  return `rgb(${f(r)},${f(g)},${f(b)})`;
}

/**
 * Build a drawing from geometry elements under `root` (an SVGElement mounted via mountSvg).
 * opts: {media, seed, exclude:Set<Element>, step}
 * Returns {strokes, groups, bbox, total, weightTotal}
 */
export function buildDrawing(root, svg, opts) {
  const media = opts.media;
  // Marks keep a constant size in world pixels no matter how much the element is scaled:
  // a crayon is as wide on a big tree as on a small apple. `u` converts world px -> local units.
  const sc = opts.scale || 1, u = 1 / sc;
  const step = (opts.step || 3) * u;
  const fillW = { ...media.fill, width: media.fill.width * u, spacing: media.fill.spacing * u };
  const rootInv = svg.getScreenCTM().inverse();
  const lines = [], fills = [], groups = [];
  const els = [];
  if (root.matches && root.matches(GEOM)) els.push(root);
  root.querySelectorAll(GEOM).forEach((el) => els.push(el));
  let idx = 0;
  for (const el of els) {
    if (opts.exclude && [...opts.exclude].some((ex) => ex !== root && root.contains(ex) && ex.contains(el))) continue;
    const cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.visibility === 'hidden') continue;
    const op = parseFloat(cs.opacity || '1') * parseFloat(cs.fillOpacity || '1');
    const fillC = parseColor(cs.fill);
    const strokeC = parseColor(cs.stroke);
    const sw = parseFloat(cs.strokeWidth) || 0;
    const { polys, scale } = sampleElement(el, rootInv, step);
    if (!polys.length) continue;
    const seed = (opts.seed || 's') + ':' + idx++;
    const instant = el.closest('[data-draw="instant"]') != null;
    if (fillC && op > 0.02) {
      const color = desat(fillC, media.fill.desaturate);
      const g = { path: polyPath(polys), color, rule: cs.fillRule === 'evenodd' ? 'evenodd' : 'nonzero', mode: media.fill.mode, instant };
      groups.push(g);
      const gi = groups.length - 1;
      for (let layer = 0; layer < (media.fill.mode === 'wash' ? 1 : media.fill.layers); layer++) {
        const marks = makeFillMarks(polys, fillW, seed + 'f' + layer, layer, u);
        marks.forEach((pts, k) => {
          const cum = cumulative(pts);
          fills.push({ kind: 'fill', group: gi, pts, cum, len: cum[cum.length - 1], color: layer ? shade(color, -0.08) : color,
            width: fillW.width, alpha: media.fill.alpha * (layer ? 0.7 : 1) * (0.9 + 0.2 * rng(seed + k)()),
            seed: seed + 'm' + layer + '-' + k, instant });
        });
      }
    }
    if (strokeC && sw > 0) {
      let color = media.line.mono || strokeC;
      if (media.line.tint) color = shade(strokeC, media.line.tint) ;
      for (const [pi, P] of polys.entries()) {
        // base wobble (fixed per drawing): the hand is never perfectly steady
        const cum0 = cumulative(P);
        const wob = media.line.wobble * u;
        const pts = P.map(([x, y], i) => [x + noise1(seed + 'bx' + pi, cum0[i] * sc / 45) * wob, y + noise1(seed + 'by' + pi, cum0[i] * sc / 45) * wob]);
        const cum = cumulative(pts);
        lines.push({ kind: 'line', pts, cum, len: cum[cum.length - 1], color, alpha: media.line.alpha * Math.min(1, op + 0.2),
          width: Math.max(media.line.minWidth, sw * scale * media.line.widthMul * Math.sqrt(sc)) * u, seed: seed + 'l' + pi, instant });
      }
    }
  }
  const strokes = [...lines, ...fills];
  let all = [];
  strokes.forEach((s) => all.push(s.pts));
  const b = all.length ? bboxOf(all) : { x0: 0, y0: 0, x1: 1, y1: 1 };
  const pad = 24 * u;
  const bbox = { x: b.x0 - pad, y: b.y0 - pad, w: b.x1 - b.x0 + pad * 2, h: b.y1 - b.y0 + pad * 2 };
  // weighted timeline: fills are coloured faster than outlines are drawn
  let wt = 0;
  for (const s of strokes) {
    const w = s.instant ? 0 : s.len * sc * (s.kind === 'fill' ? media.fill.speed : 1) + 6; // +6: pen-lift pause (world px)
    s.w0 = wt; wt += w; s.w1 = wt;
  }
  return { strokes, groups, bbox, weightTotal: wt, media, unit: u, pad };
}

/** Convert a simple text into a drawing? Not supported: text elements are rendered as text. */
export { cumulative };
