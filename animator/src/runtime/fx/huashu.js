// Adapter for the vendored alchaincyf/huashu-art-motion code (MIT, © 2026 alchaincyf (花叔 · 花生)).
// This adapter is original code for ai-video-prompt-hub/animator (Apache-2.0, © 2026 天机); the vendored files in
// animator/vendor/huashu-art-motion/ stay MIT under their own copyright and are loaded byte-for-byte.
//
// How it works
//   The upstream code is a set of classic scripts that attach globals (U, MO, PAINT, KIT, RIG, CAM, TRANSITIONS,
//   SCENES …) and is written for a 1920×1080 stage. We run it in two hidden same-origin iframes ("realms") so its
//   globals never touch our runtime:
//     · scene realm  – unmodified, native 1920×1080: the 35 style-recipe scenes (scenes/*.js) are drawn here and
//                      composited into our 9:16 (or any) frame as a backdrop (cover / pan / contain).
//     · stage realm  – the same libraries resized to our output canvas, for transitions, post layers (bloom, film,
//                      VHS, lens flare, RGB split …) and whole-frame stylisers (Van Gogh strokes, dabs, mosaic,
//                      halftone, pixel, cubist facets, pointillism).
//   Stage-realm runtime patch (applied in memory, files on disk untouched): a top-level
//       const W = 1920, H = 1080
//   becomes
//       let W = window.STAGE.W, H = window.STAGE.H; U.onStage((w, h) => { W = w; H = h; });
//   i.e. upstream's own resize idiom (lib/camera.js, lib/ui.js … already do exactly this) extended to
//   paint/brush/render/post/kit/transitions. Nothing else is changed.
//   Excluded upstream material (fonts, Arphic stroke data, 花叔 likeness rigs/frames) is not vendored; text inside
//   recipes falls back to system fonts.

const BASE = '/vendor/huashu-art-motion/scripts/engine/';
const LIBS = ['lib/util.js', 'lib/motion.js', 'lib/paint.js', 'lib/brush.js', 'lib/render.js', 'lib/post.js', 'lib/kit.js',
  'lib/rig.js', 'lib/camera.js', 'lib/typo.js', 'lib/ui.js', 'lib/diagram.js', 'lib/collage.js', 'lib/chart.js'];
const STAGE_RE = /^const W = 1920, H = 1080([,;])/m;
const STAGE_SUB = 'let W = window.STAGE.W, H = window.STAGE.H; U.onStage((w, h) => { W = w; H = h; });\nconst __hamStage = 0$1';

const src = {};
async function fetchText(rel) {
  if (!src[rel]) {
    const r = await fetch(BASE + rel);
    if (!r.ok) throw new Error(`huashu-art-motion: 缺少 vendored 文件 ${rel} (HTTP ${r.status})`);
    src[rel] = await r.text();
  }
  return src[rel];
}

function makeRealm() {
  const f = document.createElement('iframe');
  f.style.cssText = 'position:absolute;width:1px;height:1px;left:-10px;top:-10px;border:0;visibility:hidden';
  document.body.appendChild(f);
  const win = f.contentWindow;
  win.document.open(); win.document.write('<!doctype html><html><body></body></html>'); win.document.close();
  return win;
}

function run(win, code, rel) { win.eval(code + `\n//# sourceURL=huashu-art-motion/${rel}`); }

export const H = { ready: false, scene: null, stage: null, recipes: [], stageW: 0, stageH: 0 };

/** Load the realms. needs = { scenes:[ids], stage:bool } */
export async function loadHuashu(needs, stageW, stageH) {
  const libs = await Promise.all(LIBS.map(fetchText));
  // recipe registry: id, display name and signature transition of each style (eras_gallery.js, data only)
  const gal = await fetchText('eras_gallery.js');
  const probe = makeRealm();
  try { run(probe, gal, 'eras_gallery.js'); H.recipes = (probe.ERAS || []).map((e) => ({ id: e.id, name: e.name, transition: e.transition || null })); } catch { H.recipes = []; }
  probe.frameElement.remove();

  if (needs.scenes && needs.scenes.length) {
    const w = H.scene = makeRealm();
    LIBS.forEach((rel, i) => run(w, libs[i], rel));
    w.SCENES = {}; w.IMG = {};
    for (const id of needs.scenes) {
      if (!/^[0-9]{2}_[a-z0-9_]+$/.test(id)) throw new Error(`未知的 huashu 风格配方 ${id}`);
      run(w, await fetchText(`scenes/${id}.js`), `scenes/${id}.js`);
      if (!w.SCENES[id]) throw new Error(`风格配方 ${id} 没有注册`);
      if (w.SCENES[id].init) w.SCENES[id].init(w.IMG);
    }
    w.__buf = w.document.createElement('canvas'); w.__buf.width = 1920; w.__buf.height = 1080;
    w.__rigOrig = { ...w.RIG };
  }
  if (needs.stage) {
    const w = H.stage = makeRealm();
    run(w, libs[0], LIBS[0]); run(w, libs[1], LIBS[1]);
    w.U.setStage(stageW, stageH);                       // patched libs read window.STAGE at load (render.js builds a full-frame path at load)
    for (let i = 2; i < LIBS.length; i++) run(w, libs[i].replace(STAGE_RE, STAGE_SUB), LIBS[i]);
    run(w, (await fetchText('transitions.js')).replace(STAGE_RE, STAGE_SUB), 'transitions.js');
    w.U.setStage(stageW, stageH);                       // and the libs that registered U.onStage themselves
    const mk = () => { const c = w.document.createElement('canvas'); c.width = stageW; c.height = stageH; return c; };
    w.__tmp = mk(); w.__tmp2 = mk(); w.__mk = mk;
  }
  H.stageW = stageW; H.stageH = stageH; H.ready = true;
}

// ---------------- recipes as backdrops ----------------
// hideCast: draw the recipe without the girl + cat of the upstream film (their geometry is still computed so the
// scene code runs unchanged; only the paint calls become no-ops / empty paths).
// decorative point lists some recipes stroke by hand (eyes, whiskers, stripes …) – emptied too
const DECOR = new Set(['eyes', 'whiskers', 'stripes', 'earInner', 'mouth', 'nose', 'locks', 'hairLines', 'folds', 'bunSpiral', 'lashes', 'brows', 'pupils', 'cheeks', 'cheek']);
// move every point of a decorative feature far off-canvas (keeps array shapes so recipe code still destructures fine)
const FAR = -90000;
function offCanvas(win, v, d = 0) {
  if (d > 4 || !v || typeof v !== 'object' || v instanceof win.Path2D) return v;
  if (Array.isArray(v) && v.length >= 2 && typeof v[0] === 'number' && typeof v[1] === 'number') return v.map(() => FAR);
  for (const k of Object.keys(v)) {
    if ((k === 'x' || k === 'y') && typeof v[k] === 'number') v[k] = FAR;
    else if (typeof v[k] === 'object') v[k] = offCanvas(win, v[k], d + 1);
  }
  return v;
}
function emptied(win, obj, depth = 0) {
  if (!obj || typeof obj !== 'object' || depth > 3) return obj;
  for (const k of Object.keys(obj)) {
    const v = obj[k];
    if (depth === 0 && DECOR.has(k) && v && typeof v === 'object') obj[k] = offCanvas(win, v);
    else if (v instanceof win.Path2D) obj[k] = new win.Path2D();
    else if (Array.isArray(v) && v.length && v[0] instanceof win.Path2D) obj[k] = v.map(() => new win.Path2D());
    else if (v && typeof v === 'object' && !Array.isArray(v)) emptied(win, v, depth + 1);
  }
  return obj;
}
function castOff(win, off) {
  const R = win.RIG, O = win.__rigOrig;
  if (!off) { Object.assign(R, O); return; }
  const noop = () => {};
  R.drawGirl = noop; R.drawCat = noop; R.drawFeatures = noop; R.drawCup = noop; R.drawCatLines = noop;
  R.visibleLines = () => { const c = win.document.createElement('canvas'); c.width = 2; c.height = 2; return c; };
  R.girl = (o) => emptied(win, O.girl(o)); R.cat = (o) => emptied(win, O.cat(o));
}

/** Draw recipe `id` at local time lt into the scene-realm 1920×1080 buffer and return it. */
export function recipeFrame(id, lt, t, { hideCast = true } = {}) {
  const w = H.scene;
  const c = w.__buf, g = c.getContext('2d');
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over'; g.filter = 'none';
  g.clearRect(0, 0, 1920, 1080);
  castOff(w, hideCast);
  try { g.save(); w.SCENES[id].draw(g, lt, t, w.IMG, null); g.restore(); }
  finally { castOff(w, false); }
  return c;
}

// ---------------- transitions ----------------
export function transitionNames() { return H.stage ? Object.keys(H.stage.TRANSITIONS) : []; }

/** Run upstream transition `name` from canvas A to canvas B into ctx (all at stage size). */
export function huashuTransition(name, ctx, A, B, p, o = {}) {
  const w = H.stage, T = w.TRANSITIONS[name];
  if (!T) throw new Error(`没有这个 huashu 转场: ${name}（可选：${transitionNames().join(' ')}）`);
  ctx.save();
  T.call(w.TRANSITIONS, ctx, A, B, p, { ...o, W: H.stageW, H: H.stageH, tmp: w.__tmp, IMG: {} });
  ctx.restore();
}

// ---------------- post layers & stylisers ----------------
export const POST = ['bloom', 'film', 'vhs', 'lensFlare', 'rgbSplit', 'scanlines', 'vignette', 'fade', 'gateWeave'];
export const STYLISERS = ['strokes', 'dabs', 'mosaic', 'halftone', 'pixelate', 'facets', 'pointillism'];

function snapshot(ctx) { const w = H.stage, s = w.__tmp2, g = s.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, s.width, s.height); g.drawImage(ctx.canvas, 0, 0); return s; }

/** Apply an upstream post layer on top of ctx (stage-sized). */
export function huashuPost(ctx, name, t, lt, o = {}) {
  const P = H.stage.PAINT;
  const k = H.stageW / 1080;                      // our canvases are 1080-wide at scale 1; upstream params are in px
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  const a = o.alpha ?? 1;
  switch (name) {
    case 'bloom': P.bloom(ctx, { scale: o.scale ?? 4, blur: o.blur ?? 6, brightness: o.brightness ?? 1.15, alpha: (o.amount ?? 0.32) * a, key: 'bloom' }); break;
    case 'film': P.film(ctx, t, { scratches: o.scratches ?? 2, dust: o.dust ?? 10, grainDensity: o.grain ?? 0.14, gate: o.gate ?? false, ...(o.opts || {}) }); break;
    case 'vhs': { const S = snapshot(ctx); P.vhs(ctx, S, t, lt, { osd: o.osd || {}, ...(o.opts || {}) }); break; }
    case 'lensFlare': {
      const sun = o.sun ? [o.sun[0] * k, o.sun[1] * k] : [H.stageW * 0.78, H.stageH * 0.16];
      ctx.globalAlpha = a; P.lensFlare(ctx, sun, t, { core: (o.core ?? 130) * k, streak: (o.streak ?? 840) * k, ...(o.opts || {}) }); break;
    }
    case 'rgbSplit': { const S = snapshot(ctx); const d = (o.amount ?? 6) * k; ctx.clearRect(0, 0, H.stageW, H.stageH); P.rgbSplit(ctx, S, { r: [-d, 0], g: [0, 0], b: [d, d / 3] }); break; }
    case 'scanlines': P.scanlines(ctx, o.a1 ?? 0.18, o.a2 ?? 0.08); break;
    case 'vignette': P.vignette(ctx, { cx: H.stageW / 2, cy: H.stageH / 2, inner: (o.inner ?? 0.42) * H.stageH, outer: (o.outer ?? 0.8) * H.stageH, col: o.color || 'rgba(0,0,0,.45)' }); break;
    case 'fade': P.fade(ctx, { sat: o.sat ?? 0.5, tint: o.tint }); break;
    case 'gateWeave': { const S = snapshot(ctx); ctx.clearRect(0, 0, H.stageW, H.stageH); P.gateWeave(ctx, t, () => ctx.drawImage(S, 0, 0), [(o.amp ?? 3) * k, (o.amp ?? 4) * k]); break; }
    default: throw new Error(`没有这个 huashu 后期层: ${name}（可选：${POST.join(' ')}）`);
  }
  ctx.restore();
}

const PALETTES = {
  seurat: ['#f6f1dc', '#f3d36b', '#e98a3c', '#c8463b', '#7a4fa0', '#3f63b5', '#3f9a8a', '#7fbf6a', '#2b2b3a', '#ffffff'],
};
/** Re-paint the whole frame with an upstream styliser (opacity `mix` blends it over the original). */
export function huashuStylise(ctx, name, t, o = {}) {
  const w = H.stage, P = w.PAINT, S = snapshot(ctx);
  const out = w.__tmp, g = out.getContext('2d');
  g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.clearRect(0, 0, out.width, out.height); g.drawImage(S, 0, 0);
  const k = H.stageW / 1080;
  switch (name) {
    case 'strokes': P.strokes(g, S, { cell: (o.cell ?? 11) * k, len: (o.len ?? 20) * k, width: (o.width ?? 6) * k, t, boil: o.boil ?? 8, outline: o.outline ?? 0.25,
      angle: (x, y, tt) => Math.sin(x * 0.006 + tt * 0.4) * 0.9 + Math.cos(y * 0.005) * 0.6 }); break;
    case 'dabs': P.dabs(g, S, { cell: (o.cell ?? 9) * k, size: (o.size ?? 8) * k, t, boil: o.boil ?? 8 }); break;
    case 'mosaic': P.mosaic(g, S, { tile: (o.tile ?? 12) * k }); break;
    case 'halftone': P.halftone(g, S, { cell: (o.cell ?? 12) * k, paper: o.paper || '#f6efdc' }); break;
    case 'pixelate': P.pixelate(g, S, { size: Math.max(2, Math.round((o.size ?? 8) * k)), palette: o.palette }); break;
    case 'facets': P.facets(g, S, { nx: o.nx ?? 12, ny: o.ny ?? 20, t, shiftAmt: (o.shift ?? 18) * k }); break;
    case 'pointillism': { const pal = o.palette || PALETTES.seurat; P.pointillism(g, S, { pal, pitch: (o.pitch ?? 9) * k, rad: (o.rad ?? 4.2) * k, t, white: o.white ?? pal.length - 1, dark: o.dark ?? 8 }); break; }
    default: throw new Error(`没有这个 huashu 风格渲染器: ${name}（可选：${STYLISERS.join(' ')}）`);
  }
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = o.mix ?? 1; ctx.drawImage(out, 0, 0); ctx.restore();
}
