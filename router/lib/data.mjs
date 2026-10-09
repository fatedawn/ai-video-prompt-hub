// Loads everything the router reasons over. All data lives in this repo; nothing is fetched from the network.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseCSV } from './text.mjs';

// HUB_ROOT / AVPH_ROOT override the repo root (used by mcp/ when the package is not sitting inside the clone).
const envRoot = process.env.HUB_ROOT || process.env.AVPH_ROOT;
export const ROOT = envRoot
  ? path.resolve(envRoot)
  : path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..', '..');
const P = (...a) => path.join(ROOT, ...a);
const readJSON = (f) => JSON.parse(fs.readFileSync(P(f), 'utf8'));
const readJSONL = (f) => fs.readFileSync(P(f), 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));

let cache = null;

/** @param {{prompts?: boolean}} opts  prompts=false skips the ~34 MB prompt text (catalog/check only need the registry). */
export function loadData(opts = {}) {
  if (cache && (cache.prompts || opts.prompts === false)) return cache;
  const registry = readJSON('catalog/registry.json');
  const styles = readJSON('animator/presets/handdrawn-styles.json');
  const templates = readJSONL('data/templates.jsonl');
  let prompts = null, taxonomy = null;
  if (opts.prompts !== false) {
    const index = parseCSV(fs.readFileSync(P('data/index.csv'), 'utf8'));
    const access = new Map(index.map((r) => [r.id, r.access]));
    taxonomy = buildTaxonomy(index);
    prompts = [];
    const dir = P('data/prompts');
    for (const f of fs.readdirSync(dir).filter((x) => /^part-\d+\.jsonl$/.test(x)).sort()) {
      for (const d of readJSONL(path.join('data/prompts', f))) {
        prompts.push({
          id: d.id, title: d.title, title_en: d.title_en, medium: d.medium, direction: d.direction, genre: d.genre,
          art_style: d.art_style || '', language: d.language, model: d.model, license: d.license,
          source_repo: d.source_repo, original_author: d.original_author, path: d.path,
          access: access.get(d.id) || '', text: String(d.prompt || '').slice(0, 700),
        });
      }
    }
  }
  cache = { registry, styles, templates, prompts, taxonomy };
  return cache;
}

/** medium → direction → genre counts, derived from data/index.csv (single source of truth for the taxonomy). */
export function buildTaxonomy(index) {
  const t = {};
  const art = {};
  for (const r of index) {
    ((t[r.medium] ??= {})[r.direction] ??= {});
    t[r.medium][r.direction][r.genre] = (t[r.medium][r.direction][r.genre] || 0) + 1;
    if (r.medium === '漫剧') art[r.art_style || '未注明'] = (art[r.art_style || '未注明'] || 0) + 1;
  }
  return { tree: t, art_styles: art };
}
