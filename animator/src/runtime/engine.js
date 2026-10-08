// Frame renderer: renderFrame(t) is a pure function of time (deterministic, seekable), so frames can be
// captured in any order / in parallel. Original code for ai-video-prompt-hub/animator.
// Idea credits: Canvas render -> headless browser frame capture -> ffmpeg, second-level cue spec, "every scene has a
// main motion", viewport camera over a world canvas (alchaincyf/huashu-art-motion, MIT — pipeline ideas reimplemented here;
// its recipe/transition/post code is ported verbatim under MIT in vendor/huashu-art-motion, see below);
// elements bound to subtitle events and drawn with a continuous pen (geeklee/srt-whiteboard-animation, MIT, ideas only).
// Cinematic layer: vendored huashu-art-motion code (MIT, © alchaincyf) is driven through ./fx/huashu.js (style recipes as
// backdrops, its transitions, post layers and stylisers); ./fx/effects.js holds our own particles / reveals / camera moves.
import { mountSvg, buildDrawing } from './geometry.js';
import { loadHuashu, recipeFrame, huashuTransition, huashuPost, huashuStylise } from './fx/huashu.js';
import { drawParticles, drawOverlay, sketchOf, revealMask, inkMask, cameraMoves, ownTransition, OWN_TRANSITIONS } from './fx/effects.js';
import { SpriteCache, renderDrawing, UNDERPAINT } from './sprite.js';
import { getMedia, paperTexture } from './media.js';
import { shapeMarkup, SHAPES } from './shapes.js';
import { buildCharacter, drawCharacter, scribbleReveal, characterPoint } from './rig.js';
import { getEase, clamp01, ease, noise1, prog, rng, makeCanvas, lerp } from './util.js';

const S = { project: null, chars: {}, items: new Map(), cache: new SpriteCache(3), canvas: null, ctx: null, scale: 1 };

async function loadImage(url) { const im = new Image(); im.src = url; await im.decode(); return im; }

function sceneMaxZoom(scene) {
  const keys = scene.camera?.keys || [];
  return Math.max(1.05, ...keys.map((k) => k.zoom || 1));
}

async function setup(project) {
  S.project = project;
  S.scale = project.renderScale || 1;
  const W = project.width, H = project.height;
  const c = S.canvas = document.getElementById('c');
  c.width = Math.round(W * S.scale); c.height = Math.round(H * S.scale);
  S.ctx = c.getContext('2d');
  UNDERPAINT.value = project.underpaint ?? !!project.scenes.some((s) => s.backdrop);   // opaque fills over backdrops
  if (document.fonts && project.subtitle?.font) {
    try { await document.fonts.load(`700 40px ${project.subtitle.font}`, '中文字幕'); } catch (e) { /* system fallback */ }
  }
  for (const [id, def] of Object.entries(project.characters || {})) {
    S.chars[id] = await buildCharacter({ ...def, id }, project.media);
  }
  for (const scene of project.scenes) {
    const zmax = sceneMaxZoom(scene);
    for (const it of scene.items) {
      if (it.kind !== 'element') continue;
      const media = getMedia(it.media || scene.media || project.media, it.mediaOverrides);
      const rec = { it, media, res: S.scale * zmax * (it.scale || 1) * 1.15 };
      const src = it.source;
      if (src.type === 'shape' || src.type === 'svg') {
        const markup = src.type === 'shape' ? shapeMarkup(src.name, src.colors).svg : src.markup;
        const { svg, viewBox } = mountSvg(markup);
        rec.drawing = buildDrawing(svg, svg, { media, seed: it.id, scale: it.scale || 1 });
        rec.origin = resolveOrigin(it.origin, viewBox, src.type === 'shape' ? shapeMarkup(src.name).origin : null);
        rec.res = Math.min(rec.res, 4096 / Math.max(rec.drawing.bbox.w, rec.drawing.bbox.h));
      } else if (src.type === 'image') {
        rec.img = await loadImage(src.url);
        const w = src.width || rec.img.naturalWidth, h = src.height || rec.img.naturalHeight * (w / rec.img.naturalWidth);
        rec.size = [w, h];
        rec.origin = resolveOrigin(it.origin, { x: 0, y: 0, w, h }, null);
      } else if (src.type === 'text') {
        rec.origin = [0, 0];
      }
      S.items.set(scene.id + '/' + it.id, rec);
    }
  }
  // cinematic layer: load only what the project uses
  const recipes = [...new Set(project.scenes.map((s) => s.backdrop?.recipe).filter(Boolean))];
  const usesStage = project.scenes.some((s) => String(s.transition?.type || '').startsWith('huashu:') || s.style || (s.fx || []).some((f) => f.type === 'post'))
    || (project.post || []).some((f) => f.type === 'post');
  if (recipes.length || usesStage) await loadHuashu({ scenes: recipes, stage: usesStage }, c.width, c.height);
  window.__ready = true;
}

function resolveOrigin(o, vb, fallback) {
  if (Array.isArray(o)) return o;
  if (o === 'bottom') return [vb.x + vb.w / 2, vb.y + vb.h];
  if (o === 'top') return [vb.x + vb.w / 2, vb.y];
  if (fallback) return fallback;
  return [vb.x + vb.w / 2, vb.y + vb.h / 2];
}

// ---------------- camera ----------------
function cameraAt(scene, t) {
  const cam = cameraBase(scene, t);
  const mv = cameraMoves(scene.camera?.moves, t);
  cam.x += mv.x; cam.y += mv.y; cam.zoom = (cam.zoom || 1) * mv.zoomMul; cam.rot = (cam.rot || 0) + mv.rot;
  cam.bgZoom = mv.bgZoom; cam.blurX = mv.blurX; cam.blurY = mv.blurY;
  return cam;
}

function cameraBase(scene, t) {
  const W = S.project.width, H = S.project.height;
  const keys = scene.camera?.keys?.length ? scene.camera.keys : [
    { t: scene.start, x: W / 2, y: H / 2, zoom: 1.0 },
    { t: scene.end, x: W / 2, y: H / 2 - 20, zoom: 1.05, ease: 'inOut' },
  ];
  let cam = { ...keys[0] };
  for (let i = 1; i < keys.length; i++) {
    const a = keys[i - 1], b = keys[i];
    if (t <= a.t) break;
    if (t >= b.t) { cam = { ...b }; continue; }
    const u = getEase(b.ease || 'inOut')((t - a.t) / (b.t - a.t));
    cam = { x: lerp(a.x, b.x, u), y: lerp(a.y, b.y, u), zoom: lerp(a.zoom ?? 1, b.zoom ?? 1, u), rot: lerp(a.rot || 0, b.rot || 0, u) };
    break;
  }
  const hh = scene.camera?.handheld ?? S.project.camera?.handheld ?? 1;
  if (hh) {
    cam.x += noise1(scene.id + 'cx', t * 0.6) * 6 * hh;
    cam.y += noise1(scene.id + 'cy', t * 0.5) * 5 * hh;
    cam.rot = (cam.rot || 0) + noise1(scene.id + 'cr', t * 0.4) * 0.25 * hh;
  }
  for (const sh of scene.camera?.shakes || []) {
    if (t >= sh.at && t < sh.at + sh.dur) {
      const k = 1 - (t - sh.at) / sh.dur;
      cam.x += Math.sin(t * 70) * sh.amp * k; cam.y += Math.cos(t * 83) * sh.amp * k;
    }
  }
  return cam;
}

function cameraMatrix(cam) {
  const W = S.project.width, H = S.project.height;
  return new DOMMatrix().scale(S.scale).translate(W / 2, H / 2).rotate(cam.rot || 0).scale(cam.zoom || 1).translate(-cam.x, -cam.y);
}

// ---------------- elements ----------------
function elementState(rec, t) {
  const it = rec.it;
  let x = it.x, y = it.y, rot = it.rot || 0, sc = it.scale || 1, alpha = 1, redraw = null;
  for (const m of it.motions || []) {
    const t0 = m.start ?? it.start;
    if (t < t0) {
      if ((m.type === 'move' || m.type === 'fall') && m.from) { x = m.from[0]; y = m.from[1]; }
      continue;
    }
    const lt = t - t0;
    const k = m.end ? clamp01((m.end - t) / 0.3) : 1;
    switch (m.type) {
      case 'drift': x += (m.dx || 0) * Math.sin((lt / (m.period || 6)) * Math.PI * 2) * k; y += (m.dy || 0) * Math.sin((lt / (m.period || 6)) * Math.PI * 2 + 1) * k; break;
      case 'sway': rot += (m.deg || 4) * Math.sin((lt / (m.period || 2.5)) * Math.PI * 2) * k; break;
      case 'spin': rot += (m.speed || 20) * lt; break;
      case 'bob': y += (m.amp || 8) * Math.sin((lt / (m.period || 1.6)) * Math.PI * 2) * k; break;
      case 'pulse': sc *= 1 + (m.amt || 0.06) * Math.sin((lt / (m.period || 1.2)) * Math.PI * 2) * k; break;
      case 'twinkle': { const v = 0.5 + 0.5 * Math.sin((lt / (m.period || 0.9)) * Math.PI * 2); sc *= 0.85 + 0.25 * v; alpha *= 0.55 + 0.45 * v; break; }
      case 'rise': y -= (m.dist || 120) * ease.out(clamp01(lt / (m.dur || 3))); break;
      case 'move': case 'fall': {
        const fx = m.from ? m.from[0] : it.x, fy = m.from ? m.from[1] : it.y;
        const u = clamp01(lt / (m.dur || 1));
        const e = m.type === 'fall' ? ease.outBounce(u) : getEase(m.ease || 'inOut')(u);
        x = lerp(fx, m.to[0], e); y = lerp(fy, m.to[1], e);
        if (m.arc) y -= Math.sin(Math.PI * u) * m.arc;
        if (m.type === 'fall') rot += (m.spin ?? 180) * ease.out(u);
        break;
      }
      case 'flow': {
        const per = m.period || 2.2;
        const q = (lt % per) / per;
        redraw = q;
        x += (m.dx ?? 30) * q;
        alpha *= Math.min(1, (1 - q) * 3);
        break;
      }
      default: break;
    }
  }
  if (it.exit && t >= it.exit.at) alpha *= 1 - clamp01((t - it.exit.at) / (it.exit.dur || 0.4));
  return { x, y, rot, sc, alpha, redraw };
}

function actorWorldScale(actor) {
  const ch = S.chars[actor.character];
  return (actor.height || ch.def.height || 520) / ch.unitHeight;
}

/** elementState + optional attachment to a character point (props held in hand). */
function placedState(rec, t, scene) {
  const it = rec.it;
  const st = elementState(rec, t);
  const at = it.attach;
  if (at && t >= at.start) {
    const actor = scene.items.find((x) => x.kind === 'actor' && x.id === at.actor);
    if (!actor) throw new Error(`元素 ${it.id} 挂到了不存在的角色 ${at.actor}`);
    const ch = S.chars[actor.character];
    const ws = actorWorldScale(actor);
    const pt = characterPoint(ch, actor, t, at.point, ws);
    const ox = (at.offset || [0, 0])[0], oy = (at.offset || [0, 0])[1];
    const k = ease.inOut(clamp01((t - at.start) / (at.blend ?? 0.35)));
    if (k < 1) { const p0 = elementState(rec, at.start); st.x = lerp(p0.x, pt.x + ox, k); st.y = lerp(p0.y, pt.y + oy, k); }
    else { st.x = pt.x + ox; st.y = pt.y + oy; }
    st.rot = lerp(st.rot, at.rot ?? 0, k);
  }
  return st;
}

function drawElement(ctx, rec, t, camM, phase, scene) {
  const it = rec.it;
  if (t < it.start) return null;
  const st = placedState(rec, t, scene);
  if (st.alpha <= 0.001) return null;
  let p = it.draw > 0 ? clamp01((t - it.start) / it.draw) : 1;
  if (st.redraw !== null && p >= 1) p = clamp01(st.redraw * 1.8);
  const M = camM.translate(st.x, st.y).rotate(st.rot).scale(st.sc).translate(-rec.origin[0], -rec.origin[1]);
  ctx.save();
  ctx.globalAlpha = st.alpha;
  let head = null;
  const src = it.source;
  if (rec.drawing) {
    const appear = it.appear || 'draw';
    let pp = appear === 'draw' ? p : 1;
    if (appear === 'pop') { const q = ease.outBack(clamp01((t - it.start) / 0.35)); if (q <= 0) { ctx.restore(); return null; } ctx.setTransform(M); }
    const spr = S.cache.get(it.id + '@' + it.scene, rec.drawing, pp, phase, rec.res);
    let MM = M;
    if (appear === 'pop') { const q = ease.outBack(clamp01((t - it.start) / 0.35)); MM = M.translate(rec.origin[0], rec.origin[1]).scale(Math.max(0.001, q)).translate(-rec.origin[0], -rec.origin[1]); }
    if (appear === 'fade') ctx.globalAlpha *= clamp01((t - it.start) / Math.max(0.01, it.draw || 0.4));
    ctx.setTransform(MM);
    ctx.drawImage(spr.canvas, spr.x, spr.y, spr.canvas.width / spr.scale, spr.canvas.height / spr.scale);
    if (spr.head && it.pen !== false) { const q = new DOMPoint(spr.head[0], spr.head[1]).matrixTransform(MM); head = [q.x, q.y]; }
  } else if (rec.img) {
    ctx.setTransform(M);
    const [w, h] = rec.size;
    if (p < 1 && (it.appear || 'draw') === 'draw') {
      const c = scribbleReveal(rec.img, [0, 0, rec.img.naturalWidth, rec.img.naturalHeight], Math.ceil(w), Math.ceil(h), p, it.id);
      ctx.drawImage(c, 0, 0, w, h);
      if (c.head) { const q = new DOMPoint(c.head[0], c.head[1]).matrixTransform(M); head = [q.x, q.y]; }
    } else {
      if (it.appear === 'fade') ctx.globalAlpha *= p;
      ctx.drawImage(rec.img, 0, 0, w, h);
    }
  } else if (src.type === 'text') {
    head = drawHandText(ctx, M, src, p, it.id, t);
  }
  ctx.restore();
  return head;
}

function drawHandText(ctx, M, src, p, seed, t) {
  const chars = [...src.text];
  const size = src.size || 72;
  const font = `${src.weight || 700} ${size}px ${src.font || S.project.subtitle?.font || 'sans-serif'}`;
  ctx.setTransform(M);
  ctx.font = font;
  ctx.textBaseline = 'middle';
  const widths = chars.map((c) => ctx.measureText(c).width + (src.spacing ?? 6));
  const total = widths.reduce((a, b) => a + b, 0);
  let x = -total / 2;
  const r = rng(seed);
  let head = null;
  chars.forEach((c, i) => {
    const q = clamp01(p * chars.length - i);
    const jitterR = (r() - 0.5) * 0.12, jy = (r() - 0.5) * size * 0.12;
    if (q > 0) {
      const wob = noise1(seed + i, t * 4) * 0.025;
      ctx.save();
      ctx.translate(x + widths[i] / 2, jy);
      ctx.rotate(jitterR + wob);
      ctx.scale(0.6 + 0.4 * ease.outBack(q), 0.6 + 0.4 * ease.outBack(q));
      ctx.globalAlpha *= q;
      ctx.fillStyle = src.color || '#3b2f2a';
      ctx.strokeStyle = src.outline || 'rgba(255,255,255,0.9)';
      ctx.lineWidth = size * 0.12; ctx.lineJoin = 'round';
      ctx.strokeText(c, -widths[i] / 2 + (src.spacing ?? 6) / 2, 0);
      ctx.fillText(c, -widths[i] / 2 + (src.spacing ?? 6) / 2, 0);
      ctx.restore();
      if (q < 1) { const pt = new DOMPoint(x + widths[i] * q, jy + size * 0.3).matrixTransform(M); head = [pt.x, pt.y]; }
    }
    x += widths[i];
  });
  return head;
}

// ---------------- scene ----------------
function renderScene(ctx, scene, t) {
  const W = S.project.width, H = S.project.height;
  const cam = cameraAt(scene, t);
  const camM = cameraMatrix(cam);
  const fps = S.project.boilFps || 8;
  const phase = Math.floor(t * fps);
  if (scene.backdrop) drawBackdrop(ctx, scene, t, cam);
  else if (!S.project.paper?.transparent) {
    ctx.save();
    ctx.setTransform(camM);
    const paper = paperTexture(scene.paper || S.project.paper?.color || '#f8f2e4');
    const pat = ctx.createPattern(paper, 'repeat');
    ctx.fillStyle = pat;
    ctx.fillRect(-W * 1.5, -H * 1.5, W * 4, H * 4);
    ctx.restore();
  }
  for (const f of scene.fx || []) if (f.layer === 'back') drawFx(ctx, f, t);
  let pen = null;
  for (const it of scene.items) {
    if (S.hidden && S.hidden.has(scene.id + '/' + it.id)) continue; // QA ablation: render without this item
    if (it.kind === 'element') {
      const h = drawElement(ctx, S.items.get(scene.id + '/' + it.id), t, camM, phase + (it.boilOffset || 0), scene);
      if (h) pen = h;
    } else if (it.kind === 'actor') {
      const ch = S.chars[it.character];
      const worldScale = actorWorldScale(it);
      const res = S.scale * sceneMaxZoom(scene) * worldScale * 1.2;
      const r = drawCharacter(ctx, ch, it, t, camM, S.cache, phase, res, worldScale);
      if (r.head) pen = r.head;
    }
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  finishScene(ctx, scene, t, cam);
  return { pen, cam };
}

// ---------------- cinematic layer ----------------
/** Backdrop: a huashu-art-motion style recipe (1920×1080, drawn live) or a gradient, in screen space with parallax. */
function drawBackdrop(ctx, scene, t, cam) {
  const b = scene.backdrop, W = S.project.width, H = S.project.height, k = S.scale;
  const lt = t - scene.start, u = clamp01((t - scene.start) / Math.max(0.01, scene.end - scene.start));
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (b.gradient) {
    const g = ctx.createLinearGradient(0, 0, 0, H * k); b.gradient.forEach((c, i) => g.addColorStop(i / Math.max(1, b.gradient.length - 1), c));
    ctx.fillStyle = g; ctx.fillRect(0, 0, W * k, H * k);
  }
  if (b.recipe) {
    const src = recipeFrame(b.recipe, (b.offset || 0) + lt * (b.speed ?? 1), t, { hideCast: b.hideCast !== false });
    const fit = b.fit || 'cover';
    const zoom = lerp(b.zoom?.[0] ?? 1, b.zoom?.[1] ?? b.zoom?.[0] ?? 1, ease.inOut(u)) * (cam.bgZoom || 1);
    const par = b.parallax ?? 0.25, cz = 1 + ((cam.zoom || 1) - 1) * par;
    const px = lerp(b.pan?.[0] ?? 0.5, b.pan?.[1] ?? b.pan?.[0] ?? 0.5, ease.inOut(u));
    const py = b.panY ?? 0.5;
    if (fit === 'contain') {
      // blurred cover fill + sharp landscape panel ("widescreen inset")
      const sc = (H * k) / 1080;
      ctx.filter = `blur(${24 * k}px) brightness(0.55)`; ctx.drawImage(src, (W * k - 1920 * sc) / 2, 0, 1920 * sc, 1080 * sc); ctx.filter = 'none';
      const s2 = (W * k) / 1920 * zoom * cz, y0 = (b.y ?? 0.3) * H * k - 1080 * s2 / 2;
      ctx.drawImage(src, (W * k - 1920 * s2) / 2, y0, 1920 * s2, 1080 * s2);
    } else {
      const sc = Math.max((W * k) / 1920, (H * k) / 1080) * zoom * cz;
      const dw = 1920 * sc, dh = 1080 * sc;
      const ox = -(dw - W * k) * px - (cam.x - W / 2) * par * k * 0.5, oy = -(dh - H * k) * py - (cam.y - H / 2) * par * k * 0.5;
      if (b.blur) ctx.filter = `blur(${b.blur * k}px)`;
      ctx.drawImage(src, ox, oy, dw, dh);
      ctx.filter = 'none';
    }
  }
  if (b.dim) { ctx.fillStyle = `rgba(${b.dimColor || '10,8,20'},${b.dim})`; ctx.fillRect(0, 0, W * k, H * k); }
  ctx.restore();
}

function drawFx(ctx, f, t) {
  const W = S.project.width, H = S.project.height;
  if (f.type === 'particles') drawParticles(ctx, f, t, W, H, S.scale);
  else if (f.type === 'post') { if (t >= f.start && (f.end == null || t <= f.end)) huashuPost(ctx, f.name, t, t - f.start, f); }
  else if (f.type !== 'reveal') drawOverlay(ctx, f, t, W, H, S.scale);
}

/** Per-scene finishing passes on the scene's own target: styliser → reveal → front fx → whip motion blur. */
function finishScene(ctx, scene, t, cam) {
  const st = scene.style;
  if (st && t >= (st.start ?? -1e9) && t <= (st.end ?? 1e9)) huashuStylise(ctx, st.name, t, st);
  for (const f of scene.fx || []) if (f.type === 'reveal' && t >= f.start - 0.001 && t < f.start + f.dur) applyReveal(ctx, f, t);
  for (const f of scene.fx || []) if (f.layer !== 'back' && f.type !== 'reveal') drawFx(ctx, f, t);
  if (cam.blurX > 0.5 || cam.blurY > 0.5) {
    const c = sceneCanvas('blur'), g = c.getContext('2d');
    g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, c.width, c.height); g.drawImage(ctx.canvas, 0, 0);
    ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); const n = 7;
    for (let i = 0; i < n; i++) { const q = (i / (n - 1) - 0.5) * S.scale; ctx.globalAlpha = 1 / (i + 1); ctx.drawImage(c, cam.blurX * q, cam.blurY * q); }
    ctx.restore();
  }
}

function applyReveal(ctx, f, t) {
  const W = S.project.width, H = S.project.height, k = S.scale;
  const u = clamp01((t - f.start) / f.dur);
  const col = sceneCanvas('rv_col'), cg = col.getContext('2d');
  cg.setTransform(1, 0, 0, 1, 0, 0); cg.globalCompositeOperation = 'source-over'; cg.clearRect(0, 0, col.width, col.height); cg.drawImage(ctx.canvas, 0, 0);
  const m = sceneCanvas('rv_mask');
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  if (f.mode === 'ink') {
    const rim = sceneCanvas('rv_rim');
    inkMask(m, rim, u, W, H, k, f.seed || 7, f.drops);
    ctx.fillStyle = f.paper || '#f3ecdc'; ctx.fillRect(0, 0, col.width, col.height);
    // inside the ink the picture first appears as ink wash (desaturated), colour floods in over the last 40 %
    const lay = sceneCanvas('rv_lay'), lg = lay.getContext('2d');
    lg.setTransform(1, 0, 0, 1, 0, 0); lg.globalCompositeOperation = 'source-over'; lg.clearRect(0, 0, lay.width, lay.height);
    const sat = clamp01((u - 0.55) / 0.45);
    lg.filter = `grayscale(${1 - sat}) contrast(${1.25 - 0.25 * sat})`; lg.drawImage(col, 0, 0); lg.filter = 'none';
    lg.globalCompositeOperation = 'destination-in'; lg.drawImage(m, 0, 0); lg.globalCompositeOperation = 'source-over';
    ctx.drawImage(lay, 0, 0);
    ctx.globalCompositeOperation = 'multiply'; ctx.drawImage(rim, 0, 0); ctx.globalCompositeOperation = 'source-over';
  } else {
    const sk = sketchOf(col, sceneCanvas('rv_sk'), k, f.paper || '#f6f0e2');
    revealMask(m, u, W, H, k, f.mode === 'bloom' ? 'bloom' : 'brush', f.seed || 3, f.center);
    ctx.drawImage(sk, 0, 0);
    cg.globalCompositeOperation = 'destination-in'; cg.drawImage(m, 0, 0); cg.globalCompositeOperation = 'source-over';
    ctx.drawImage(col, 0, 0);
  }
  ctx.restore();
}

function vignette(ctx) {
  const w = S.canvas.width, h = S.canvas.height;
  const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.45, w / 2, h / 2, Math.max(w, h) * 0.75);
  g.addColorStop(0, 'rgba(90,70,40,0)');
  g.addColorStop(1, 'rgba(90,70,40,0.16)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function drawPencil(ctx, pen, t) {
  if (!pen || S.project.pen === false) return;
  const s = S.scale * 1.15;
  ctx.save();
  ctx.translate(pen[0], pen[1]);
  ctx.rotate(-0.62 + Math.sin(t * 9) * 0.04);
  ctx.scale(s, s);
  // a simple code-drawn pencil (original): tip at origin, body up-right
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#4a3020'; ctx.lineWidth = 3;
  ctx.fillStyle = '#f2c98a';
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-11, 34); ctx.lineTo(11, 34); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#3a3a3a';
  ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(-4, 12); ctx.lineTo(4, 12); ctx.closePath(); ctx.fill();
  ctx.fillStyle = '#f7b733';
  ctx.beginPath(); ctx.rect(-11, 34, 22, 120); ctx.fill(); ctx.stroke();
  ctx.strokeStyle = 'rgba(160,100,10,0.6)'; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(-3.5, 36); ctx.lineTo(-3.5, 152); ctx.moveTo(3.5, 36); ctx.lineTo(3.5, 152); ctx.stroke();
  ctx.strokeStyle = '#4a3020'; ctx.lineWidth = 3;
  ctx.fillStyle = '#c9c9c9'; ctx.beginPath(); ctx.rect(-11, 154, 22, 16); ctx.fill(); ctx.stroke();
  ctx.fillStyle = '#f08a9a'; ctx.beginPath(); ctx.roundRect(-11, 170, 22, 18, [0, 0, 7, 7]); ctx.fill(); ctx.stroke();
  ctx.restore();
}

// ---------------- subtitles ----------------
function wrapText(ctx, text, maxW) {
  const lines = [];
  let cur = '';
  for (const ch of [...text]) {
    const test = cur + ch;
    if (ctx.measureText(test).width > maxW && cur) {
      if (/[，。！？、；：”」』）,.!?]/.test(ch)) { cur = test; continue; } // keep closing punctuation on the line
      lines.push(cur); cur = ch;
    } else cur = test;
  }
  if (cur) lines.push(cur);
  return lines;
}

function drawSubtitle(ctx, t) {
  const sub = S.project.subtitle || {};
  if (sub.enabled === false) return;
  const cue = (S.project.cues || []).find((c) => t >= c.start && t < c.end + (sub.hold ?? 0.15));
  if (!cue) return;
  const W = S.project.width, H = S.project.height;
  const a = Math.min(clamp01((t - cue.start) / 0.15), clamp01((cue.end + (sub.hold ?? 0.15) - t) / 0.15));
  const size = sub.size || 56;
  const font = `${sub.weight || 700} ${size}px ${sub.font || 'sans-serif'}`;
  ctx.save();
  ctx.setTransform(S.scale, 0, 0, S.scale, 0, 0);
  ctx.font = font;
  const maxW = sub.maxWidth || W * 0.82;
  const lines = wrapText(ctx, cue.text, maxW);
  const lh = size * 1.32;
  const boxW = Math.min(maxW, Math.max(...lines.map((l) => ctx.measureText(l).width))) + size * 1.1;
  const boxH = lines.length * lh + size * 0.7;
  const cy = (sub.y ?? 0.855) * H;
  const x0 = W / 2 - boxW / 2, y0 = cy - boxH / 2 + (1 - a) * 10;
  ctx.globalAlpha = a;
  if (sub.style === 'cinematic') { drawCinematicSub(ctx, cue, lines, { size, lh, y0, W, t, sub, font }); ctx.restore(); return; }
  ctx.fillStyle = sub.background || 'rgba(255,251,240,0.9)';
  ctx.strokeStyle = sub.border || 'rgba(80,60,40,0.55)';
  ctx.lineWidth = 3;
  ctx.beginPath(); ctx.roundRect(x0, y0, boxW, boxH, size * 0.45); ctx.fill(); ctx.stroke();
  if (cue.speakerName) {
    ctx.font = `700 ${Math.round(size * 0.55)}px ${sub.font || 'sans-serif'}`;
    const tw = ctx.measureText(cue.speakerName).width + size * 0.6;
    ctx.fillStyle = cue.speakerColor || '#f08a5d';
    ctx.beginPath(); ctx.roundRect(x0 + size * 0.4, y0 - size * 0.42, tw, size * 0.78, size * 0.39); ctx.fill();
    ctx.fillStyle = '#fff'; ctx.textBaseline = 'middle';
    ctx.fillText(cue.speakerName, x0 + size * 0.7, y0 - size * 0.03);
    ctx.font = font;
  }
  // karaoke progress: characters already spoken are darker
  const spoken = (cue.charTimes || []).filter((ct) => ct <= t).length;
  let idx = 0;
  ctx.textBaseline = 'middle';
  lines.forEach((line, li) => {
    const lw = ctx.measureText(line).width;
    let x = W / 2 - lw / 2;
    const y = y0 + size * 0.35 + lh * li + lh / 2;
    for (const ch of [...line]) {
      ctx.fillStyle = idx < spoken || sub.karaoke === false ? (sub.color || '#2f2620') : (sub.pendingColor || 'rgba(47,38,32,0.45)');
      ctx.fillText(ch, x, y);
      x += ctx.measureText(ch).width;
      idx++;
    }
  });
  ctx.restore();
}

/** Cinematic subtitles: no box, heavy outline + soft glow; the word being spoken pops and turns accent colour. */
function drawCinematicSub(ctx, cue, lines, { size, lh, y0, W, t, sub, font }) {
  const times = cue.charTimes || [];
  let idx = 0;
  ctx.textBaseline = 'middle'; ctx.lineJoin = 'round';
  lines.forEach((line, li) => {
    const lw = ctx.measureText(line).width;
    let x = W / 2 - lw / 2;
    const y = y0 + size * 0.35 + lh * li + lh / 2;
    for (const ch of [...line]) {
      const cw = ctx.measureText(ch).width;
      const ct = times[idx] ?? cue.start, age = t - ct;
      const spoken = age >= 0 || sub.karaoke === false;
      const pop = age >= 0 && age < 0.22 ? 1 + 0.16 * Math.sin((age / 0.22) * Math.PI) : 1;
      const nextT = times[idx + 1] ?? cue.end;
      const current = age >= 0 && t < nextT + 0.08;
      ctx.save();
      ctx.translate(x + cw / 2, y); ctx.scale(pop, pop);
      ctx.font = font;
      ctx.shadowColor = sub.glow || 'rgba(0,0,0,0.55)'; ctx.shadowBlur = size * 0.35;
      ctx.strokeStyle = sub.outline || 'rgba(12,10,24,0.92)'; ctx.lineWidth = size * 0.17;
      ctx.strokeText(ch, -cw / 2, 0);
      ctx.shadowBlur = 0;
      ctx.fillStyle = current ? (sub.accent || '#ffd54a') : spoken ? (sub.color || '#ffffff') : (sub.pendingColor || 'rgba(255,255,255,0.62)');
      ctx.fillText(ch, -cw / 2, 0);
      ctx.restore();
      x += cw; idx++;
    }
  });
}

// ---------------- transitions ----------------
const scratch = {};
function sceneCanvas(k) {
  if (!scratch[k]) scratch[k] = makeCanvas(S.canvas.width, S.canvas.height);
  return scratch[k];
}

function transitionMask(type, u, id) {
  const w = S.canvas.width, h = S.canvas.height;
  const m = sceneCanvas('mask'), g = m.getContext('2d');
  g.setTransform(1, 0, 0, 1, 0, 0);
  g.clearRect(0, 0, w, h);
  if (type === 'scribble') {
    const r = rng(id);
    const rows = 7;
    const pts = [];
    for (let i = 0; i <= rows; i++) {
      const y = (i / rows) * h;
      pts.push(i % 2 ? [w * 1.1, y + (r() - 0.5) * 60] : [-w * 0.1, y + (r() - 0.5) * 60]);
    }
    let len = 0; const cum = [0];
    for (let i = 1; i < pts.length; i++) { len += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); cum.push(len); }
    g.lineWidth = (h / rows) * 1.6; g.lineCap = 'round'; g.lineJoin = 'round'; g.strokeStyle = '#000';
    g.beginPath();
    const lim = u * len;
    for (let i = 0; i < pts.length; i++) {
      let [x, y] = pts[i];
      if (cum[i] > lim) { const f = (lim - cum[i - 1]) / (cum[i] - cum[i - 1]); x = pts[i - 1][0] + (x - pts[i - 1][0]) * f; y = pts[i - 1][1] + (y - pts[i - 1][1]) * f; }
      if (i === 0) g.moveTo(x, y); else g.lineTo(x, y);
      if (cum[i] > lim) break;
    }
    g.stroke();
  }
  return m;
}

export function renderFrame(t) {
  const ctx = S.ctx;
  const scenes = S.project.scenes;
  let i = scenes.findIndex((s) => t >= s.start && t < s.end);
  if (i < 0) i = t < scenes[0].start ? 0 : scenes.length - 1;
  const B = scenes[i];
  const tr = B.transition || { type: 'cut', dur: 0 };
  const inTr = i > 0 && tr.type !== 'cut' && tr.dur > 0 && t < B.start + tr.dur;
  let pen = null;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, S.canvas.width, S.canvas.height);
  if (!inTr) {
    pen = renderScene(ctx, B, t).pen;
  } else {
    const A = scenes[i - 1];
    const u = ease.inOut(clamp01((t - B.start) / tr.dur));
    const ca = sceneCanvas('a'), cb = sceneCanvas('b');
    const ga = ca.getContext('2d'), gb = cb.getContext('2d');
    ga.setTransform(1, 0, 0, 1, 0, 0); gb.setTransform(1, 0, 0, 1, 0, 0);
    ga.clearRect(0, 0, ca.width, ca.height); gb.clearRect(0, 0, cb.width, cb.height);
    renderScene(ga, A, t);
    pen = renderScene(gb, B, t).pen;
    const w = S.canvas.width;
    const p = clamp01((t - B.start) / tr.dur);
    if (tr.type.startsWith('huashu:')) {
      huashuTransition(tr.type.slice(7), ctx, ca, cb, p, { ...(tr.params || {}), id: B.id, from: A.id, lt: t - B.start, t, dur: tr.dur });
    } else if (OWN_TRANSITIONS.includes(tr.type)) {
      ownTransition(tr.type, ctx, ca, cb, p, { ...(tr.params || {}), k: S.scale });
    } else if (tr.type === 'fade') {
      ctx.drawImage(ca, 0, 0); ctx.globalAlpha = u; ctx.drawImage(cb, 0, 0); ctx.globalAlpha = 1;
    } else if (tr.type === 'slide') {
      ctx.drawImage(ca, -w * u, 0); ctx.drawImage(cb, w * (1 - u), 0);
    } else { // scribble wipe: next scene is coloured in over the old one
      ctx.drawImage(ca, 0, 0);
      const m = transitionMask('scribble', u, B.id);
      gb.globalCompositeOperation = 'destination-in';
      gb.drawImage(m, 0, 0);
      gb.globalCompositeOperation = 'source-over';
      ctx.drawImage(cb, 0, 0);
    }
  }
  for (const f of S.project.post || []) drawFx(ctx, f, t);
  if (!S.project.paper?.transparent && S.project.vignette !== false) vignette(ctx);
  drawPencil(ctx, pen, t);
  drawSubtitle(ctx, t);
}

/** QA probe: element/actor states and screen-space boxes at time t. */
function probe(t) {
  const out = [];
  for (const scene of S.project.scenes) {
    const cam = cameraAt(scene, t);
    const camM = cameraMatrix(cam);
    for (const it of scene.items) {
      if (it.kind !== 'element') continue;
      const rec = S.items.get(scene.id + '/' + it.id);
      let box = null;
      if (rec.drawing) {
        const st = placedState(rec, t, scene);
        const M = camM.translate(st.x, st.y).rotate(st.rot).scale(st.sc).translate(-rec.origin[0], -rec.origin[1]);
        const b = rec.drawing.bbox;
        const pd = rec.drawing.pad || 0;
        const pts = [[b.x + pd, b.y + pd], [b.x + b.w - pd, b.y + pd], [b.x + pd, b.y + b.h - pd], [b.x + b.w - pd, b.y + b.h - pd]].map(([x, y]) => new DOMPoint(x, y).matrixTransform(M));
        box = [Math.min(...pts.map((p) => p.x)), Math.min(...pts.map((p) => p.y)), Math.max(...pts.map((p) => p.x)), Math.max(...pts.map((p) => p.y))].map((v) => v / S.scale);
      }
      else if (it.source.type === 'text') {
        const st = placedState(rec, t, scene);
        const size = it.source.size || 72, w = [...it.source.text].length * size * 1.05, h = size * 1.2;
        const M = camM.translate(st.x, st.y).scale(st.sc);
        const pts = [[-w / 2, -h / 2], [w / 2, h / 2]].map(([x, y]) => new DOMPoint(x, y).matrixTransform(M));
        box = [pts[0].x, pts[0].y, pts[1].x, pts[1].y].map((v) => v / S.scale);
      }
      // signature colour (main fill) helps the video-based sync check ignore overlapping elements
      let sig = null;
      if (it.source.type === 'shape') { const c = { ...(SHAPES[it.source.name]?.colors || {}), ...(it.source.colors || {}) }; sig = c.c1 || c.line || null; }
      else if (it.source.type === 'text') sig = it.source.color || '#3b2f2a';
      out.push({ scene: scene.id, id: it.id, start: it.start, drawEnd: it.start + (it.draw || 0), cue: it.cueRef || null, box, sig });
    }
  }
  return out;
}

async function grab(t, type = 'jpeg', q = 0.93) {
  renderFrame(t);
  return S.canvas.toDataURL(type === 'png' ? 'image/png' : 'image/jpeg', q).split(',')[1];
}

/**
 * QA ablation: render frame t with one item removed and return a downsampled grayscale crop of `box`
 * (output-pixel coordinates). Comparing it with the same crop of the encoded video shows exactly when the
 * item becomes visible in the video, independent of camera moves or overlapping elements.
 */
function ablate(t, key, box, ds = 4, withItem = false) {
  S.hidden = withItem ? null : new Set([key]);
  renderFrame(t);
  S.hidden = null;
  const k = S.scale;
  const x0 = Math.max(0, Math.floor(box[0] * k)), y0 = Math.max(0, Math.floor(box[1] * k));
  const x1 = Math.min(S.canvas.width, Math.ceil(box[2] * k)), y1 = Math.min(S.canvas.height, Math.ceil(box[3] * k));
  const w = Math.floor((x1 - x0) / ds), h = Math.floor((y1 - y0) / ds);
  if (w < 2 || h < 2) return null;
  const d = S.ctx.getImageData(x0, y0, w * ds, h * ds).data;
  const out = new Array(w * h);
  for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) {
    let acc = 0;
    for (let b = 0; b < ds; b++) for (let a = 0; a < ds; a++) {
      const o = ((j * ds + b) * w * ds + (i * ds + a)) * 4;
      acc += 0.2126 * d[o] + 0.7152 * d[o + 1] + 0.0722 * d[o + 2];
    }
    out[j * w + i] = Math.round(acc / (ds * ds));
  }
  return { w, h, x: x0, y: y0, px: out };
}

window.__setup = async (p) => { try { await setup(p); } catch (e) { window.__bootFailed = String(e && e.stack || e); throw e; } };
window.__render = renderFrame;
window.__grab = grab;
window.__probe = probe;
window.__ablate = ablate;
