// Catalogue of cinematic options (style recipes, transitions, post layers, stylisers, particles, overlays, camera
// moves) used for validation and `cli fx`. Original code for ai-video-prompt-hub/animator.
// huashu-art-motion names are read from the vendored files themselves, so the list can never drift from the code.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PARTICLES, OVERLAYS, CAMERA_MOVES, OWN_TRANSITIONS } from './runtime/fx/effects.js';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const HAM = path.join(ROOT, 'vendor', 'huashu-art-motion');

export const BUILTIN_TRANSITIONS = ['cut', 'fade', 'slide', 'scribble'];
export const HUASHU_POST = ['bloom', 'film', 'vhs', 'lensFlare', 'rgbSplit', 'scanlines', 'vignette', 'fade', 'gateWeave'];
export const HUASHU_STYLISERS = ['strokes', 'dabs', 'mosaic', 'halftone', 'pixelate', 'facets', 'pointillism'];
export { PARTICLES, OVERLAYS, CAMERA_MOVES, OWN_TRANSITIONS };

let cache = null;
export function huashuCatalog() {
  if (cache) return cache;
  const tr = fs.readFileSync(path.join(HAM, 'scripts/engine/transitions.js'), 'utf8');
  const names = new Set();
  for (const m of tr.matchAll(/^ {2}([a-zA-Z0-9_]+)\(c, A, B/gm)) names.add(m[1]);
  for (const m of tr.matchAll(/^T\.([a-zA-Z0-9_]+) = function/gm)) names.add(m[1]);
  const recipes = fs.readdirSync(path.join(HAM, 'scripts/engine/scenes')).filter((f) => /^\d\d_.*\.js$/.test(f)).map((f) => f.replace(/\.js$/, ''));
  // display names + signature transition per recipe from eras_gallery.js (data: `{ id: '09_postimp', name: '…', … transition: { type: 'swirl' …`)
  const gal = fs.readFileSync(path.join(HAM, 'scripts/engine/eras_gallery.js'), 'utf8');
  const info = {};
  for (const m of gal.matchAll(/\{ id: '([^']+)', name: '([^']+)'[^\n]*?(?:transition: \{ type: '([^']+)')?/g)) info[m[1]] = { name: m[2], transition: m[3] || null };
  cache = { transitions: [...names].sort(), recipes: recipes.map((id) => ({ id, ...(info[id] || {}) })) };
  return cache;
}

// recipes that read cleanly as backdrops with hideCast (checked on the contact sheet from tools/fx_gallery.mjs)
// visually verified (fx_gallery + full-res stills): with hideCast these show no leftover girl/cat parts.
// Other recipes still leave bits of hair / cup / cat body (their scene code draws the cast with its own paths) –
// use them with pan/zoom framing that crops those areas, or with cast shown.
export const CLEAN_BACKDROPS = ['09_postimp', '18_klimt', '21_kusama', '26_vaporwave', '28_monet'];
// upstream transitions that need extra geometry parameters (o.lens / o.rect …) – usable, but not with defaults
export const NEEDS_PARAMS = ['lensReveal', 'expandRect'];

export function fxCmd(a) {
  const c = huashuCatalog();
  const L = [];
  L.push('== 风格配方 backdrop.recipe（huashu-art-motion, MIT；35 种，1920×1080 实时绘制后铺进竖屏）==');
  for (const r of c.recipes) L.push(`  ${r.id.padEnd(18)} ${r.name || ''}${r.transition ? '  · 签名转场 huashu:' + r.transition : ''}${CLEAN_BACKDROPS.includes(r.id) ? '  ★ 去角色后最干净' : ''}`);
  L.push('\n== 转场 transition.type ==');
  L.push('  内置: ' + BUILTIN_TRANSITIONS.join(' '));
  L.push('  本仓库新增: ' + OWN_TRANSITIONS.join(' '));
  L.push('  huashu:<名>（MIT 移植）: ' + c.transitions.filter((x) => x !== 'same').map((x) => x + (NEEDS_PARAMS.includes(x) ? '*' : '')).join(' ') + '   (* 需要额外参数)');
  L.push('\n== 镜头特效 fx[].type ==');
  L.push('  particles.kind: ' + PARTICLES.join(' '));
  L.push('  叠加层: ' + OVERLAYS.join(' '));
  L.push('  reveal.mode: sketch（素描→上色，笔刷扫过） bloom（素描→上色，从一点晕开） ink（水墨晕开开场）');
  L.push('  post.name（huashu 后期层）: ' + HUASHU_POST.join(' '));
  L.push('\n== 整帧风格 style.name（huashu 风格渲染器）: ' + HUASHU_STYLISERS.join(' '));
  L.push('== 镜头运动 camera.moves[].type: ' + CAMERA_MOVES.join(' '));
  console.log(L.join('\n'));
}
