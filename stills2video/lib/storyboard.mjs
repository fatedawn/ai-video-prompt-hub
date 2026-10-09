// stills2video storyboard: a folder of stills (+ optional script / storyboard JSON / videogen shots.json) → shot list.
// Original code for ai-video-prompt-hub/stills2video (Apache-2.0, © 2026 天机).
// Matching images to shots by filename numbers follows videogen route C (S01_shot03.*); ChatGPT downloads without
// numbers fall back to download (mtime) order.
import fs from 'node:fs';
import path from 'node:path';
import { resolveTag, guessRecipe, findRecipe, ROTATION } from './recipes.mjs';

export const IMG_RE = /\.(png|jpe?g|webp|bmp|avif)$/i;
const SIZES = { '9:16': [1080, 1920], '16:9': [1920, 1080], '1:1': [1080, 1080], '3:4': [1080, 1440], '4:3': [1440, 1080] };
export const sizeOf = (aspect) => SIZES[aspect] || SIZES['9:16'];

/** Index token of an image filename: S01_shot03 → 1003 (segment-aware), 镜头3 / shot3 / 03_xxx / xxx_03 → 3. Pure. */
export function indexOf(name) {
  const b = name.replace(IMG_RE, '');
  let m = b.match(/S0*(\d{1,3})[ _-]?shot0*(\d{1,3})/i);
  if (m) return +m[1] * 1000 + +m[2];
  m = b.match(/(?:镜头|分镜|镜|shot|scene|场)\s*0*(\d{1,3})/i);
  if (m) return +m[1];
  m = b.match(/^0*(\d{1,3})(?=[\s._\-、)）]|$)/);
  if (m) return +m[1];
  m = b.match(/[\s_\-(（]0*(\d{1,3})[)）]?$/);
  if (m && !/\d{1,2}[_:]\d{2}[_:]\d{2}/.test(b)) return +m[1];
  return null;
}

/** Sort image files into shot order. Returns {files, order: 'number'|'mtime'|'name'}. */
export function orderImages(dir, o = {}) {
  const files = fs.readdirSync(dir).filter((f) => IMG_RE.test(f) && !f.startsWith('.'));
  const idx = files.map((f) => ({ f, i: indexOf(f), mt: o.mtime ? o.mtime(f) : fs.statSync(path.join(dir, f)).mtimeMs }));
  if (idx.length && idx.every((x) => x.i != null) && new Set(idx.map((x) => x.i)).size === idx.length) return { files: idx.sort((a, b) => a.i - b.i).map((x) => x.f), order: 'number' };
  if (o.order === 'name') return { files: files.sort((a, b) => a.localeCompare(b, 'zh-Hans-CN', { numeric: true })), order: 'name' };
  return { files: idx.sort((a, b) => a.mt - b.mt || a.f.localeCompare(b.f, 'zh', { numeric: true })).map((x) => x.f), order: 'mtime' };
}

/** One script line → {index, tag, duration, speaker, text}. Pure. Accepts:
 *  "镜头3：【推进】(5s) 天机：台词"  "3. 台词"  "[仙侠云海环绕] 台词"  "台词"  "（空镜）" */
export function parseScriptLine(raw) {
  let s = raw.trim();
  const out = { index: null, tag: null, duration: null, speaker: null, text: '' };
  let m = s.match(/^(?:镜头|分镜|镜|shot)\s*0*(\d{1,3})\s*[：:.、\-]?\s*/i) || s.match(/^0*(\d{1,3})\s*[.、:：)）]\s*/);
  if (m) { out.index = +m[1]; s = s.slice(m[0].length); }
  for (;;) {
    if ((m = s.match(/^[[【]([^\]】]{1,20})[\]】]\s*/))) { out.tag = out.tag ? out.tag + ',' + m[1] : m[1]; s = s.slice(m[0].length); continue; }
    if ((m = s.match(/^[(（]\s*(\d+(?:\.\d+)?)\s*(?:s|秒)\s*[)）]\s*/i))) { out.duration = +m[1]; s = s.slice(m[0].length); continue; }
    break;
  }
  if ((m = s.match(/[(（]\s*(\d+(?:\.\d+)?)\s*(?:s|秒)\s*[)）]\s*$/i))) { out.duration = +m[1]; s = s.slice(0, m.index).trim(); }
  if ((m = s.match(/^([^\s：:，,。"“]{1,6})[：:]\s*(.+)$/)) && !/^(旁白|画外音|VO)$/i.test(m[1])) { out.speaker = m[1]; s = m[2]; }
  else if ((m = s.match(/^(?:旁白|画外音|VO)[：:]\s*(.+)$/i))) s = m[1];
  s = s.replace(/^[“"「『]|[”"」』]$/g, '').trim();
  if (/^[(（]?(空镜|无台词|静音|—+|-+)[)）]?$/.test(s)) s = '';
  out.text = s;
  return out;
}

export function parseScript(text) {
  return String(text || '').replace(/\r/g, '').split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#') && !l.startsWith('//')).map(parseScriptLine);
}

/** Estimated narration seconds for Chinese/English text (Kokoro zh ≈ 4.3 chars/s). Pure. */
export function speechSeconds(text) {
  const t = String(text || '');
  const cjk = (t.match(/[\u3400-\u9fff]/g) || []).length;
  const words = (t.replace(/[\u3400-\u9fff]/g, ' ').match(/[A-Za-z0-9]+/g) || []).length;
  const pauses = (t.match(/[，。！？；、,.!?;]/g) || []).length;
  return cjk / 4.3 + words / 2.6 + pauses * 0.18;
}

/**
 * Build a storyboard.
 * o: {images: [abs paths] , script: text | null, aspect, title, baseDir, defaults: {transition, backend}, fps}
 */
export function buildStoryboard(o) {
  const images = o.images || [];
  const lines = o.script ? parseScript(o.script) : [];
  const n = Math.max(images.length, 0);
  if (!n) throw new Error('没有图片：把 ChatGPT 下载的图放进一个文件夹（建议命名 01.png、02.png…），用 --images 指定');
  const perShot = Array.from({ length: n }, () => []);
  if (lines.some((l) => l.index != null)) {
    let cur = 0;
    for (const l of lines) { if (l.index != null) cur = Math.min(n, Math.max(1, l.index)) - 1; perShot[cur].push(l); }
  } else if (lines.length <= n) lines.forEach((l, i) => perShot[i].push(l));
  else lines.forEach((l, i) => perShot[Math.min(n - 1, Math.floor((i * n) / lines.length))].push(l));
  const rel = (f) => path.relative(o.baseDir || '.', f).split(path.sep).join('/');
  const used = [];
  const shots = images.map((img, i) => {
    const ls = perShot[i];
    const tags = ls.map((l) => l.tag).filter(Boolean).join(',').split(',').filter(Boolean);
    let recipe = null, preset = null;
    for (const t of tags) { const r = resolveTag(t); if (r.recipe && !recipe) recipe = r.recipe; if (r.preset && !preset) preset = r.preset; }
    const text = ls.map((l) => l.text).join(' ');
    if (!recipe && !preset) { const g = guessRecipe(`${text} ${path.basename(img)}`, used.slice(-2)); if (g) recipe = g.id; }
    const R = recipe ? findRecipe(recipe) : null;
    if (!R && !preset) preset = ROTATION[i % ROTATION.length];
    used.push(recipe || preset);
    const speech = ls.reduce((a, l) => a + speechSeconds(l.text), 0) + Math.max(0, ls.filter((l) => l.text).length - 1) * 0.25;
    const want = ls.find((l) => l.duration)?.duration;
    const duration = +(want || Math.max(R?.duration || 4, speech ? speech + 0.9 : 0, 3)).toFixed(2);
    return {
      id: `S01_shot${String(i + 1).padStart(2, '0')}`,
      image: rel(img),
      duration,
      ...(want ? {} : { duration_auto: true }),
      recipe: recipe || null,
      motion: preset ? { preset } : null,
      overlays: null, fx: null, flow: null,
      lines: ls.filter((l) => l.text).map((l) => ({ speaker: l.speaker, text: l.text })),
      transition: null,
      backend: null,
      prompt: '',
      clip: null,
    };
  });
  return {
    version: 1, kind: 'stills2video', title: o.title || 'stills2video', aspect: o.aspect || '9:16', fps: o.fps || 30,
    voice: { engine: 'local', narrator: o.narrator || 'kokoro:zf_001', characters: {} },
    bgm: null, transition: o.defaults?.transition ?? 'auto',
    shots,
  };
}

/** Accept a hand-written storyboard JSON ({shots:[{image, line|lines, ...}]}) or a videogen shots.json. */
export function normalizeStoryboard(sb, o = {}) {
  const imgs = o.images || [];
  const byId = Object.fromEntries(imgs.map((f) => [path.basename(f).replace(IMG_RE, ''), f]));
  const rel = (f) => path.relative(o.baseDir || '.', f).split(path.sep).join('/');
  sb.kind = 'stills2video';
  sb.aspect ||= o.aspect || '9:16';
  sb.fps ||= 30;
  sb.voice ||= { engine: 'local', narrator: 'kokoro:zf_001', characters: {} };
  sb.transition ??= 'auto';
  sb.shots = sb.shots.map((s, i) => {
    const id = s.id || `S01_shot${String(i + 1).padStart(2, '0')}`;
    let image = s.image || s.first_frame?.path || null;
    if (!image) { const hit = byId[id] || Object.entries(byId).find(([k]) => indexOf(k) === i + 1)?.[1] || imgs[i]; if (hit) image = rel(hit); }
    const lines = s.lines || (s.line ? [{ speaker: s.speaker || null, text: s.line }] : []);
    const tag = s.motion && typeof s.motion === 'string' ? resolveTag(s.motion) : {};
    return { ...s, id, image, lines, duration: +(s.duration || 4), recipe: s.recipe ? findRecipe(s.recipe)?.id || s.recipe : tag.recipe || null, motion: typeof s.motion === 'object' ? s.motion : tag.preset ? { preset: tag.preset } : null };
  });
  return sb;
}

/** stills2video storyboard → videogen shots.json shape (for assemble / cloud adapters / route C export). */
export function toVideogen(sb) {
  return {
    version: 1, title: sb.title, aspect: sb.aspect, fps: sb.fps, unit: 'shot', characters: [], voice: sb.voice, bgm: sb.bgm,
    transition: sb.transition === 'auto' ? null : sb.transition,
    shots: sb.shots.map((s, i) => ({
      id: s.id, segment: 1, index: i + 1, duration: s.duration, aspect: sb.aspect,
      prompt_zh: s.prompt_full || s.prompt || '', prompt_en: '', shot_text: s.prompt || '', negative: s.negative || '', refs: [],
      first_frame: s.image ? { path: s.image } : null, last_frame: s.last_frame || null,
      lines: s.lines || [], sfx: [], fit: s.fit || 'auto', source: null, clip: s.clip || null, transition: s.transition_resolved ?? s.transition ?? null,
    })),
  };
}
