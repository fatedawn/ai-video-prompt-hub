// B-roll / 空镜头 recipe library + motion preset aliases. Original code (Apache-2.0, © 2026 天机).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'recipes');
let cache = null;
export function loadRecipes() {
  if (!cache) cache = JSON.parse(fs.readFileSync(path.join(DIR, 'broll.json'), 'utf8'));
  return cache;
}
export const recipes = () => loadRecipes().recipes;

export const PRESETS = ['push_in', 'pull_out', 'pan_left', 'pan_right', 'tilt_up', 'tilt_down', 'orbit', 'dolly_zoom', 'drift', 'sway', 'rise', 'kenburns', 'static'];
// Chinese camera words → preset (script tags like 【推进】)
export const PRESET_ALIASES = {
  推进: 'push_in', 推: 'push_in', 慢推: 'push_in', 前推: 'push_in', 拉远: 'pull_out', 后拉: 'pull_out', 拉: 'pull_out',
  左摇: 'pan_left', 左移: 'pan_left', 右摇: 'pan_right', 右移: 'pan_right', 横移: 'pan_right', 摇移: 'pan_right',
  上摇: 'tilt_up', 升镜: 'tilt_up', 下摇: 'tilt_down', 降镜: 'tilt_down', 环绕: 'orbit', 旋转: 'orbit',
  变焦: 'dolly_zoom', 希区柯克: 'dolly_zoom', 漂浮: 'drift', 呼吸: 'drift', 摆动: 'sway', 上升: 'rise', 航拍: 'rise',
  静止: 'static', 固定: 'static', 'ken burns': 'kenburns', 平推: 'kenburns',
};

/** Find a recipe by id, Chinese name, or fuzzy name. */
export function findRecipe(q) {
  if (!q) return null;
  const s = String(q).trim().toLowerCase();
  const t = String(q).trim();
  return recipes().find((r) => r.id === s || r.name.toLowerCase() === s)
    || recipes().find((r) => (t.length >= 3 && r.name.includes(t)) || t.includes(r.name)) || null;
}

/** Resolve a script tag: recipe name → {recipe}, camera word / preset → {preset}. */
export function resolveTag(tag) {
  if (!tag) return {};
  const t = String(tag).trim();
  if (PRESETS.includes(t)) return { preset: t };
  if (PRESET_ALIASES[t]) return { preset: PRESET_ALIASES[t] }; // exact camera word wins over fuzzy recipe names ("推进")
  const r = findRecipe(t);
  if (r) return { recipe: r.id };
  const k = Object.keys(PRESET_ALIASES).sort((a, b) => b.length - a.length).find((a) => t.includes(a));
  return k ? { preset: PRESET_ALIASES[k] } : {};
}

/** Pick a recipe from text (台词 / filename / prompt) by keywords; `avoid` = recipe ids used by the previous shots. */
export function guessRecipe(text, avoid = []) {
  const t = String(text || '').toLowerCase();
  let best = null, score = 0;
  for (const r of recipes()) {
    const sc = r.keywords.reduce((a, k) => a + (t.includes(k.toLowerCase()) ? k.length + 1 : 0), 0) - (avoid.includes(r.id) ? 2.5 : 0);
    if (sc > score) { best = r; score = sc; }
  }
  return best;
}

// generic rotation when nothing matches — alternating camera directions avoids the "slideshow" look
export const ROTATION = ['push_in', 'pan_right', 'orbit', 'pull_out', 'tilt_up', 'drift', 'pan_left', 'rise'];
