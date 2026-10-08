// User-defined characters: SVG parts rig or PNG/SVG image (single images or a character sheet).
// Original code for ai-video-prompt-hub/animator. Idea credit: "character declared once, reused in every
// shot" (HKUDS/ViMax, HBAI-Ltd/Toonflow-app — ideas only); "code-driven skeleton for flat characters"
// (alchaincyf/huashu-art-motion rig idea — no code, no character assets used).
import { mountSvg, buildDrawing } from './geometry.js';
import { renderDrawing } from './sprite.js';
import { getMedia } from './media.js';
import { noise1, hash, clamp01, ease, envelope, prog, lerp, makeCanvas, rng } from './util.js';

const DEFAULT_PARTS = ['leg_l', 'leg_r', 'body', 'arm_l', 'arm_r', 'head', 'tail', 'hand_l', 'hand_r'];
// switchable layers: face (eyes/mouth/expr/brows/blush) and props / effects (prop_*, fx_*) toggled by poseLayers
const LAYER_RE = /^(eyes.*|mouth.*|expr_.+|brows.*|blush.*|prop_.+|fx_.+)$/;

export async function buildCharacter(def, projectMedia) {
  if (def.type === 'image') return buildImageCharacter(def);
  const media = getMedia(def.media || projectMedia, def.mediaOverrides);
  const { svg, viewBox } = mountSvg(def.svg);
  const ws = (def.height || 520) / viewBox.h; // world px per SVG unit at the declared character height
  const cfgParts = def.parts || {};
  const names = Object.keys(cfgParts).length ? Object.keys(cfgParts) : DEFAULT_PARTS;
  const partEls = new Map();
  for (const n of names) { const el = svg.querySelector(`[id="${n}"]`); if (el) partEls.set(n, el); }
  svg.querySelectorAll('[data-part]').forEach((el) => { if (el.id && !partEls.has(el.id)) partEls.set(el.id, el); });
  if (!partEls.size) throw new Error(`角色 ${def.id}: SVG 里没有找到任何部件分组（需要 id 为 body/head/arm_l/... 的 <g>）`);
  // document order
  const order = [...partEls.entries()].sort((a, b) => (a[1].compareDocumentPosition(b[1]) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1)).map((e) => e[0]);
  const layerEls = new Map();
  svg.querySelectorAll('g[id]').forEach((el) => { if (LAYER_RE.test(el.id) && !partEls.has(el.id)) layerEls.set(el.id, el); });
  const exclAll = new Set([...partEls.values(), ...layerEls.values()]);
  const parts = {};
  for (const n of order) {
    const el = partEls.get(n);
    const excl = new Set([...exclAll].filter((e) => e !== el));
    const drawing = buildDrawing(el, svg, { media, seed: def.id + ':' + n, exclude: excl, scale: ws });
    const cfg = cfgParts[n] || {};
    let pivot = cfg.pivot || (el.dataset.pivot ? el.dataset.pivot.split(/[ ,]+/).map(Number) : null);
    const b = drawing.bbox;
    if (!pivot) {
      if (n === 'head' || n === 'body') pivot = [b.x + b.w / 2, b.y + b.h - drawing.pad];
      else pivot = [b.x + b.w / 2, b.y + drawing.pad];
    }
    let parent = cfg.parent !== undefined ? cfg.parent : (n !== 'body' && partEls.has('body') ? 'body' : null);
    const raise = cfg.raise ?? (n.endsWith('_r') ? -1 : 1);
    parts[n] = { name: n, drawing, pivot, parent, raise, idle: cfg.idle || null, upright: cfg.upright || 0 };
  }
  const layers = {};
  for (const [id, el] of layerEls) {
    let owner = null, p = el.parentElement;
    while (p && p !== svg) { if (p.id && parts[p.id]) { owner = p.id; break; } p = p.parentElement; }
    if (!owner) owner = parts.head ? 'head' : order[order.length - 1];
    const excl = new Set([...layerEls.values()].filter((e) => e !== el && !el.contains(e)));
    const drawing = buildDrawing(el, svg, { media, seed: def.id + ':' + id, exclude: excl, scale: ws });
    layers[id] = { id, owner, drawing };
  }
  const expressions = { normal: {}, ...(def.expressions || {}) };
  for (const id of Object.keys(layers)) if (id.startsWith('expr_') && !expressions[id.slice(5)]) expressions[id.slice(5)] = { extra: id };
  const anchor = def.anchor || [viewBox.x + viewBox.w / 2, viewBox.y + viewBox.h];
  return {
    id: def.id, type: 'rig', def, media, parts, order, layers, expressions, anchor, viewBox,
    unitHeight: viewBox.h,
    defaultExpression: def.defaultExpression || 'normal',
    eyes: def.layers?.eyes || 'eyes', blink: def.layers?.blink || 'eyes_closed',
    mouthClosed: def.layers?.mouthClosed || 'mouth_closed', mouthOpen: def.layers?.mouthOpen || 'mouth_open',
  };
}

async function loadImage(url) {
  const im = new Image();
  im.src = url;
  await im.decode();
  return im;
}

async function buildImageCharacter(def) {
  const imgs = {};
  for (const [k, url] of Object.entries(def.images || {})) imgs[k] = await loadImage(url);
  const frames = {};
  const sheet = def.sheet ? await loadImage(def.sheet.src) : null;
  if (sheet) for (const [k, r] of Object.entries(def.sheet.frames || {})) frames[k] = { img: sheet, crop: r };
  for (const [k, im] of Object.entries(imgs)) frames[k] = { img: im, crop: [0, 0, im.naturalWidth, im.naturalHeight] };
  const first = frames[def.views?.front] || frames.front || Object.values(frames)[0];
  if (!first) throw new Error(`角色 ${def.id}: 没有可用的图片`);
  return { id: def.id, type: 'image', def, frames, unitHeight: first.crop[3], anchor: def.anchor || [0.5, 1] };
}

// ---------------- pose ----------------
function activeIn(actions, type, t) { return actions.filter((a) => a.type === type && t >= a.start && t < a.end); }

/** Root position after walk/move actions (applied in time order). */
function rootPosition(actor, t) {
  let x = actor.x, y = actor.y, walking = null, dir = 0, first = true;
  const moves = actor.actions.filter((a) => a.type === 'walk' || a.type === 'move').sort((p, q) => p.start - q.start);
  for (const a of moves) {
    const fx = a.from ? a.from[0] : x, fy = a.from ? a.from[1] : y;
    const tx = a.to ? a.to[0] : fx, ty = a.to ? a.to[1] : fy;
    if (t < a.start) { if (first && a.from) { x = fx; y = fy; } break; }
    first = false;
    if (t >= a.end) { x = tx; y = ty; continue; }
    const u = (t - a.start) / (a.end - a.start);
    const e = a.type === 'walk' ? ease.inOut(u) * 0.35 + u * 0.65 : ease.inOut(u);
    x = lerp(fx, tx, e); y = lerp(fy, ty, e);
    if (a.type === 'walk') { walking = a; dir = Math.sign(tx - fx); }
    break;
  }
  return { x, y, walking, dir };
}

export function poseAt(ch, actor, t) {
  const seed = actor.id;
  const P = { angles: {}, offs: {}, sx: 1, sy: 1, rot: 0, dy: 0, dx: 0, alpha: 1, flip: actor.flip ? -1 : 1, draw: 1, pop: 1 };
  const ang = (n, v) => { P.angles[n] = (P.angles[n] || 0) + v; };
  const off = (n, dx, dy, sy) => { const o = P.offs[n] || { dx: 0, dy: 0, sy: 1 }; o.dx += dx || 0; o.dy += dy || 0; o.sy *= sy || 1; P.offs[n] = o; };
  const U = ch.unitHeight / 100; // svg units per "percent of height"
  // position / walking
  const rp = rootPosition(actor, t);
  P.x = rp.x; P.y = rp.y;
  // facing
  for (const a of actor.actions) if (a.type === 'turn' && t >= a.start) P.flip = a.face === 'left' ? -1 : a.face === 'right' ? 1 : -P.flip;
  if (rp.walking && rp.dir && actor.autoFace !== false) P.flip = rp.dir < 0 ? -1 : 1;
  // idle: breathing, sway, blink
  const ph = (hash(seed) % 1000) / 1000 * 6.28;
  P.sy *= 1 + 0.014 * Math.sin(t * 2.4 + ph);
  P.sx *= 1 - 0.006 * Math.sin(t * 2.4 + ph);
  ang('head', 2.2 * Math.sin(t * 1.7 + ph));
  ang('arm_l', 3 * Math.sin(t * 1.9 + ph));
  ang('arm_r', -3 * Math.sin(t * 1.9 + ph + 1));
  ang('body', 1.0 * Math.sin(t * 1.3 + ph));
  // per-part idle motion declared in character.json (e.g. a floating companion): {"idle": {"bob": 6, "sway": 8, "period": 1.8}}
  for (const [n, part] of Object.entries(ch.parts || {})) {
    if (!part.idle) continue;
    const per = part.idle.period || 1.8, q = ((t + (hash(seed + n) % 100) / 37) / per) * Math.PI * 2;
    if (part.idle.bob) off(n, 0, part.idle.bob * Math.sin(q), 1);
    if (part.idle.sway) ang(n, part.idle.sway * Math.sin(q * 0.5 + 0.7));
  }
  const blinkPeriod = 3.1 + (hash(seed + 'b') % 100) / 100;
  P.blink = ((t + ph) % blinkPeriod) < 0.13;
  // walk cycle
  if (rp.walking) {
    const a = rp.walking;
    const k = envelope(t, a.start, a.end, 0.2, 0.2);
    const f = a.stepHz || 1.9;
    const s = Math.sin((t - a.start) * f * Math.PI * 2);
    ang('leg_l', 24 * s * k); ang('leg_r', -24 * s * k);
    ang('arm_l', -20 * s * k); ang('arm_r', 20 * s * k);
    P.dy -= Math.abs(Math.sin((t - a.start) * f * Math.PI * 2)) * 4.5 * U * k;
    P.rot += 2.5 * s * k;
  }
  for (const a of actor.actions) {
    if (t < a.start - 0.001 || t > a.end + 0.001) continue;
    const u = prog(t, a.start, a.end - a.start);
    const k = envelope(t, a.start, a.end, Math.min(0.3, (a.end - a.start) / 3), Math.min(0.3, (a.end - a.start) / 3));
    switch (a.type) {
      case 'wave': {
        const arm = a.arm || 'arm_r';
        const sign = ch.parts?.[arm]?.raise ?? (arm.endsWith('_r') ? -1 : 1);
        const osc = Math.sin((t - a.start) * (a.hz || 3) * Math.PI * 2) * (a.amp ?? 20);
        ang(arm, sign * ((a.angle ?? 125) + osc) * k);
        ang('head', sign * 5 * k); // tilt slightly away from the raised arm so it never covers the face
        break;
      }
      case 'point': case 'raise': {
        const arm = a.arm || 'arm_r';
        const sign = ch.parts?.[arm]?.raise ?? (arm.endsWith('_r') ? -1 : 1);
        ang(arm, sign * (a.angle ?? (a.type === 'raise' ? 160 : 100)) * k);
        break;
      }
      case 'nod': {
        const n = a.times || 2;
        const v = Math.abs(Math.sin(Math.PI * n * u)) * k;
        ang('head', 5 * v * (P.flip));
        off('head', 0, 5 * U * v, 1 - 0.05 * v);
        break;
      }
      case 'shake': { // shake head "no"
        const v = Math.sin(Math.PI * 2 * (a.times || 2) * u) * k;
        ang('head', 9 * v);
        off('head', 4 * U * v, 0, 1);
        break;
      }
      case 'look': {
        ang('head', (a.angle ?? -10) * k);
        off('head', 0, (a.lift ?? -1.5) * U * k, 1);
        break;
      }
      case 'jump': {
        const h = (a.height ?? 18) * U;
        if (u < 0.18) { const q = ease.out(u / 0.18); P.sy *= 1 - 0.12 * q; P.sx *= 1 + 0.08 * q; }
        else if (u < 0.78) { const q = (u - 0.18) / 0.6; P.dy -= Math.sin(Math.PI * q) * h; P.sy *= 1 + 0.06 * Math.sin(Math.PI * q); ang('arm_l', 60 * Math.sin(Math.PI * q)); ang('arm_r', -60 * Math.sin(Math.PI * q)); ang('leg_l', 10 * Math.sin(Math.PI * q)); ang('leg_r', -10 * Math.sin(Math.PI * q)); }
        else { const q = 1 - (u - 0.78) / 0.22; P.sy *= 1 - 0.1 * q; P.sx *= 1 + 0.07 * q; }
        break;
      }
      case 'hop': {
        const n = a.times || 3;
        const q = (u * n) % 1;
        P.dy -= Math.sin(Math.PI * q) * (a.height ?? 7) * U * k;
        break;
      }
      case 'tremble': P.dx += Math.sin(t * 60) * 1.2 * U * k; break;
      case 'reveal': { // signature gesture: raise the held prop, flick it open (poseLayers.reveal), sparkle
        const arm = a.arm || 'arm_r';
        const sign = ch.parts?.[arm]?.raise ?? (arm.endsWith('_r') ? -1 : 1);
        const lt = t - a.start;
        ang(arm, sign * (a.angle ?? 120) * k);
        const prop = a.prop || 'fan';
        if (ch.parts?.[prop]) ang(prop, -sign * 28 * Math.exp(-lt * 7) * Math.sin(lt * 22)); // flick + settle
        ang('head', sign * 6 * k);
        P.dy -= Math.sin(Math.PI * clamp01(lt / 0.32)) * 4 * U;
        if (ch.parts?.star) { ang('star', 360 * ease.inOut(clamp01(lt / 0.9))); off('star', 0, -6 * U * k, 1); }
        break;
      }
      default: break;
    }
  }
  // props that stay roughly upright in the hand: counter-rotate by a fraction of the parent's angle
  for (const [n, part] of Object.entries(ch.parts || {})) if (part.upright && part.parent) ang(n, -part.upright * (P.angles[part.parent] || 0));
  // active action types (for poseLayers); the reveal swaps its layers a beat after the arm starts rising
  P.active = actor.actions.filter((a) => t >= a.start + (a.type === 'reveal' ? 0.14 : 0) && t < a.end).map((a) => a.type);
  // expression timeline
  let expr = ch.defaultExpression || 'normal';
  for (const e of actor.expressions) if (t >= e.t) expr = e.name;
  P.expr = expr;
  // talk: mouth flap within talk windows (from cues spoken by this character + explicit talk actions)
  P.talking = false; P.mouthOpen = false;
  for (const [s, e] of actor.talk) {
    if (t >= s && t < e) {
      P.talking = true;
      const syl = noise1(seed + 'talk', (t - s) * 9.5) + 0.25 * Math.sin((t - s) * 31);
      P.mouthOpen = syl > -0.05 && (e - t) > 0.08;
      ang('head', 1.6 * Math.sin((t - s) * 7.3));
      break;
    }
  }
  if (actor.forceMouth === 'open') { P.talking = true; P.mouthOpen = true; }
  // appear / exit
  const ap = actor.appear;
  if (ap && ap.type !== 'none') {
    if (t < ap.at) P.alpha = 0;
    else if (ap.type === 'fade') P.alpha = clamp01((t - ap.at) / ap.dur);
    else if (ap.type === 'pop') { const q = clamp01((t - ap.at) / ap.dur); P.pop = ease.outBack(q); }
    else if (ap.type === 'draw') P.draw = clamp01((t - ap.at) / ap.dur);
  }
  if (actor.exit && t >= actor.exit.at) P.alpha *= 1 - clamp01((t - actor.exit.at) / (actor.exit.dur || 0.4));
  return P;
}

/** World-space matrices for the root and each part (no camera). */
export function worldMatrices(ch, P, worldScale) {
  const scale = worldScale * P.pop;
  const isImg = ch.type === 'image';
  const root = new DOMMatrix()
    .translate(P.x + P.dx, P.y + P.dy)
    .rotate(P.rot)
    .scale(P.flip * scale * P.sx, scale * P.sy)
    .translate(isImg ? 0 : -ch.anchor[0], isImg ? 0 : -ch.anchor[1]);
  const mats = {};
  const matOf = (n) => {
    if (mats[n]) return mats[n];
    const part = ch.parts && ch.parts[n];
    if (!part) return root;
    const parentM = part.parent && ch.parts[part.parent] ? matOf(part.parent) : root;
    const o = P.offs[n] || { dx: 0, dy: 0, sy: 1 };
    const m = parentM.translate(part.pivot[0] + o.dx, part.pivot[1] + o.dy).rotate(P.angles[n] || 0).scale(1, o.sy).translate(-part.pivot[0], -part.pivot[1]);
    mats[n] = m;
    return m;
  };
  return { root, matOf };
}

/**
 * World position of a named character point (e.g. "hand_r") at time t — used to attach props to hands.
 * Points are declared in character.json: "points": {"hand_r": {"part": "arm_r", "at": [x, y]}} (SVG units).
 */
export function characterPoint(ch, actor, t, name, worldScale) {
  const P = poseAt(ch, actor, t);
  const W = worldMatrices(ch, P, worldScale);
  const pt = (ch.def.points || {})[name];
  if (!pt) {
    if (ch.type === 'image') return { x: P.x, y: P.y - ch.unitHeight * worldScale * 0.5 };
    throw new Error(`角色 ${ch.id} 没有定义挂点 ${name}（在 character.json 的 points 中声明）`);
  }
  const m = ch.type === 'image' ? W.root : W.matOf(pt.part);
  const q = new DOMPoint(pt.at[0], pt.at[1]).matrixTransform(m);
  return { x: q.x, y: q.y, alpha: P.alpha };
}

// ---------------- drawing ----------------
/** Visible layer ids for the current pose. */
function visibleLayers(ch, P) {
  const L = ch.layers;
  const ex = ch.expressions[P.expr] || {};
  const vis = [];
  const eyes = ex.eyes || ch.eyes;
  if (P.blink && L[ch.blink] && eyes !== 'none') vis.push(ch.blink);
  else if (L[eyes]) vis.push(eyes);
  const closed = ex.mouth || ch.mouthClosed;
  if (P.mouthOpen && L[ch.mouthOpen]) vis.push(ch.mouthOpen);
  else if (L[closed]) vis.push(closed);
  if (ex.extra && L[ex.extra]) vis.push(ex.extra);
  for (const id of ex.show || []) if (L[id]) vis.push(id);
  // prop / effect layers: poseLayers.default unless an active action has its own set (e.g. "reveal")
  const PL = ch.def.poseLayers;
  if (PL) {
    let set = PL.default || [];
    for (const ty of P.active || []) if (PL[ty]) { set = PL[ty]; break; }
    for (const id of set) if (L[id]) vis.push(id);
  }
  return vis;
}

/**
 * Draw a character. `base` is the canvas transform (camera, render scale) as a DOMMatrix.
 * Returns {head} pen position in canvas pixels if currently being drawn in.
 */
export function drawCharacter(ctx, ch, actor, t, base, cache, phase, res, worldScale) {
  const P = poseAt(ch, actor, t);
  if (P.alpha <= 0.001 || P.pop <= 0.001) return { pose: P };
  const W = worldMatrices(ch, P, worldScale);
  const root = W.root, matOf = W.matOf;
  ctx.save();
  ctx.globalAlpha = P.alpha;
  let head = null;
  if (ch.type === 'image') {
    head = drawImageCharacter(ctx, ch, actor, P, t, base.multiply(root), worldScale * P.pop);
    ctx.restore();
    return { pose: P, head };
  }
  const vis = visibleLayers(ch, P);
  // draw-in sequencing
  const seq = [];
  const hide = new Set(actor.hide || []);
  for (const n of ch.order) {
    if (hide.has(n) || (ch.parts[n].parent && hide.has(ch.parts[n].parent))) continue;
    seq.push({ key: n, drawing: ch.parts[n].drawing, owner: n });
    for (const id of vis) if (ch.layers[id].owner === n) seq.push({ key: id, drawing: ch.layers[id].drawing, owner: n });
  }
  const total = seq.reduce((s, x) => s + x.drawing.weightTotal, 0) || 1;
  let acc = 0;
  for (const it of seq) {
    const w = it.drawing.weightTotal;
    const p = P.draw >= 1 ? 1 : clamp01((P.draw * total - acc) / Math.max(1e-6, w));
    acc += w;
    if (p <= 0) continue;
    const r = res * P.pop > 0 ? res : res;
    const spr = cache.get(ch.id + ':' + it.key, it.drawing, p, phase, r);
    const m = base.multiply(matOf(it.owner));
    ctx.setTransform(m);
    ctx.drawImage(spr.canvas, spr.x, spr.y, spr.canvas.width / spr.scale, spr.canvas.height / spr.scale);
    if (spr.head) { const q = new DOMPoint(spr.head[0], spr.head[1]).matrixTransform(m); head = [q.x, q.y]; }
  }
  ctx.restore();
  return { pose: P, head };
}

const revealCache = new Map();
/** Scribble-mask reveal for raster images (colouring-in instead of a rectangular wipe). */
export function scribbleReveal(img, crop, w, h, p, seed) {
  const c = makeCanvas(w, h), g = c.getContext('2d');
  g.drawImage(img, crop[0], crop[1], crop[2], crop[3], 0, 0, w, h);
  if (p >= 1) return c;
  let path = revealCache.get(seed + w + 'x' + h);
  if (!path) {
    const r = rng(seed);
    const pts = [];
    const rows = 9;
    for (let i = 0; i <= rows; i++) {
      const y = (i / rows) * h * 1.1 - h * 0.05;
      const xs = i % 2 ? [w * 1.05, -w * 0.05] : [-w * 0.05, w * 1.05];
      pts.push([xs[0], y + (r() - 0.5) * h * 0.04], [xs[1], y + h / rows / 2 + (r() - 0.5) * h * 0.04]);
    }
    let len = 0; const cum = [0];
    for (let i = 1; i < pts.length; i++) { len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); cum.push(len); }
    path = { pts, cum, len };
    revealCache.set(seed + w + 'x' + h, path);
  }
  const m = makeCanvas(w, h), mg = m.getContext('2d');
  mg.lineWidth = h / 9 * 1.5; mg.lineCap = 'round'; mg.lineJoin = 'round'; mg.strokeStyle = '#000';
  mg.beginPath();
  const lim = p * path.len;
  let head = null;
  for (let i = 0; i < path.pts.length; i++) {
    let [x, y] = path.pts[i];
    if (path.cum[i] > lim) { const f = (lim - path.cum[i - 1]) / (path.cum[i] - path.cum[i - 1]); x = path.pts[i - 1][0] + (x - path.pts[i - 1][0]) * f; y = path.pts[i - 1][1] + (y - path.pts[i - 1][1]) * f; }
    if (i === 0) mg.moveTo(x, y); else mg.lineTo(x, y);
    head = [x, y];
    if (path.cum[i] > lim) break;
  }
  mg.stroke();
  g.globalCompositeOperation = 'destination-in';
  g.drawImage(m, 0, 0);
  c.head = head;
  return c;
}

function drawImageCharacter(ctx, ch, actor, P, t, M, scale) {
  const d = ch.def;
  const ex = (d.expressions || {})[P.expr];
  let key = (ex && ch.frames[ex]) ? ex : (d.views?.front || 'front');
  // optional per-action frames, e.g. "actions": {"wave": "wave"} (a hand-drawn waving pose on the sheet)
  let actionFrame = null;
  for (const a of actor.actions) if (t >= a.start && t <= a.end && d.actions?.[a.type] && ch.frames[d.actions[a.type]]) actionFrame = d.actions[a.type];
  if (actionFrame) key = actionFrame;
  else if (P.talking && P.mouthOpen && d.mouth?.open && ch.frames[d.mouth.open]) key = d.mouth.open;
  if (P.blink && d.blink && ch.frames[d.blink]) key = d.blink;
  const fr = ch.frames[key] || Object.values(ch.frames)[0];
  const [cx, cy, cw, chh] = fr.crop;
  const w = cw, h = chh;
  // flat images have no limbs: wave/point/nod become whole-body gestures
  let rot = 0, sy = 1;
  for (const a of actor.actions) {
    if (t < a.start || t > a.end) continue;
    const k = envelope(t, a.start, a.end, 0.2, 0.2);
    if (a.type === 'wave') rot += Math.sin((t - a.start) * 12) * 5 * k;
    if (a.type === 'point') rot += 4 * k;
    if (a.type === 'nod') sy *= 1 - 0.04 * Math.abs(Math.sin(Math.PI * (a.times || 2) * prog(t, a.start, a.end - a.start))) * k;
  }
  if (P.talking && !(d.mouth?.open)) sy *= 1 + (P.mouthOpen ? 0.012 : 0);
  const ax = ch.anchor[0] * w, ay = ch.anchor[1] * h;
  const m = M.rotate(rot + (P.angles.body || 0)).scale(1, sy).translate(-ax, -ay);
  ctx.setTransform(m);
  let head = null;
  if (P.draw < 1) {
    const c = scribbleReveal(fr.img, fr.crop, Math.ceil(w), Math.ceil(h), P.draw, actor.id + key);
    ctx.drawImage(c, 0, 0, w, h);
    if (c.head) { const q = new DOMPoint(c.head[0], c.head[1]).matrixTransform(m); head = [q.x, q.y]; }
  } else ctx.drawImage(fr.img, cx, cy, cw, chh, 0, 0, w, h);
  return head;
}
