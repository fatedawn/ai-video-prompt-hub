// Render a stroke drawing (see geometry.js) into an offscreen sprite at a given progress.
// Original code for ai-video-prompt-hub/animator.
import { makeCanvas } from './util.js';
import { drawStroke, drawWash, applyGrain } from './media.js';

/**
 * @param drawing  from buildDrawing
 * @param p        progress 0..1 (fraction of weighted stroke length)
 * @param phase    boil phase (integer)
 * @param res      pixels per local unit
 * @returns {canvas, x, y, scale, head} where (x,y) is the local coordinate of the canvas origin
 */
export function renderDrawing(drawing, p, phase, res) {
  const { bbox, strokes, groups, media } = drawing;
  const W = Math.ceil(bbox.w * res), H = Math.ceil(bbox.h * res);
  const lineC = makeCanvas(W, H), fillC = makeCanvas(W, H);
  const lc = lineC.getContext('2d'), fc = fillC.getContext('2d');
  const setT = (c) => c.setTransform(res, 0, 0, res, -bbox.x * res, -bbox.y * res);
  setT(lc); setT(fc);
  const limit = p >= 1 ? Infinity : p * drawing.weightTotal;
  const started = p > 0;
  let head = null;
  // group-wise fill state
  const groupDone = new Array(groups.length).fill(true);
  const groupAny = new Array(groups.length).fill(false);
  const washMasks = new Map();
  let clipGroup = -1;
  const endClip = () => { if (clipGroup >= 0) { fc.restore(); clipGroup = -1; } };
  for (const s of strokes) {
    const instant = s.w1 === s.w0;
    if (instant ? !started : s.w0 >= limit) {
      if (s.kind === 'fill') groupDone[s.group] = false;
      continue;
    }
    const frac = instant || limit === Infinity ? 1 : Math.min(1, (limit - s.w0) / Math.max(1e-6, s.w1 - s.w0 - 6));
    const U = drawing.unit || 1;
    const upto = frac * s.len;
    if (frac < 1 && s.kind === 'fill') groupDone[s.group] = false;
    if (s.kind === 'line') {
      endClip();
      const h = drawStroke(lc, s, upto, media, phase, 'line', U);
      if (frac < 1 && h) head = h;
    } else {
      const g = groups[s.group];
      groupAny[s.group] = true;
      if (g.mode === 'wash') {
        let m = washMasks.get(s.group);
        if (!m) { m = makeCanvas(W, H); const mc = m.getContext('2d'); setT(mc); washMasks.set(s.group, m); }
        const mc = m.getContext('2d');
        const save = s.color; s.color = '#000';
        const sa = s.alpha; s.alpha = 1;
        const h = drawStroke(mc, s, upto, media, 0, 'fill', U);
        s.color = save; s.alpha = sa;
        if (frac < 1 && h) head = h;
      } else {
        if (clipGroup !== s.group) { endClip(); fc.save(); fc.clip(g.path, g.rule); clipGroup = s.group; }
        const h = drawStroke(fc, s, upto, media, phase, 'fill', U);
        if (frac < 1 && h) head = h;
      }
    }
  }
  endClip();
  // composite wash groups
  groups.forEach((g, gi) => {
    if (g.mode !== 'wash' || !groupAny[gi]) return;
    if (groupDone[gi]) { drawWash(fc, g, media); return; }
    const m = washMasks.get(gi);
    if (!m) return;
    const tmp = makeCanvas(W, H), tc = tmp.getContext('2d');
    setT(tc);
    drawWash(tc, g, media);
    tc.setTransform(1, 0, 0, 1, 0, 0);
    tc.globalCompositeOperation = 'destination-in';
    tc.drawImage(m, 0, 0);
    fc.save(); fc.setTransform(1, 0, 0, 1, 0, 0); fc.drawImage(tmp, 0, 0); fc.restore();
  });
  const kind = media.label === '蜡笔' ? 'crayon' : 'pencil';
  const worldRes = res * (drawing.unit || 1); // sprite pixels per world pixel -> grain has a constant world size
  applyGrain(fc, W, H, media.fill.grain, kind, worldRes);
  applyGrain(lc, W, H, media.line.grain * 0.8, kind, worldRes);
  // fills under lines
  fc.setTransform(1, 0, 0, 1, 0, 0);
  fc.drawImage(lineC, 0, 0);
  return { canvas: fillC, x: bbox.x, y: bbox.y, scale: res, head };
}

/** Cache wrapper: finished drawings are rendered once per boil phase. */
export class SpriteCache {
  constructor(phases = 3) { this.phases = phases; this.map = new Map(); }
  get(key, drawing, p, phase, res) {
    if (p < 1) return renderDrawing(drawing, p, phase, res);
    const k = key + '|' + (phase % this.phases) + '|' + res.toFixed(3);
    let v = this.map.get(k);
    if (!v) { v = renderDrawing(drawing, 1, phase % this.phases, res); v.head = null; this.map.set(k, v); }
    return v;
  }
}
