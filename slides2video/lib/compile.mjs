// Node-side compile: timeline → runtime JSON (HTML for text/KaTeX, Shiki tokens for code, image URLs).
// Original work, Apache-2.0, © 2026 天机. KaTeX (MIT) and Shiki (MIT) are npm dependencies; KaTeX fonts (OFL)
// are served from node_modules at render time and never copied into this repository.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
let katex = null, shiki = null;
function K() { if (!katex) { try { katex = require('katex'); } catch { throw new Error('缺少依赖 katex：cd slides2video && npm install'); } } return katex; }

export const SIZES = { '9:16': [1080, 1920], '16:9': [1920, 1080], '1:1': [1080, 1080] };
export const IMAGE_EXT = ['.png', '.jpg', '.jpeg', '.webp'];

const escHTML = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

export function texToHTML(tex, display) {
  let n = 0;
  const src = String(tex).replace(/\\term\{/g, () => `\\htmlClass{term term-${++n}}{`);
  return K().renderToString(src, { displayMode: display, throwOnError: false, trust: (ctx) => ctx.command === '\\htmlClass', strict: 'ignore', output: 'html' });
}

/** Inline Markdown → HTML: $tex$, ==highlight==, **bold**, `code`. Pure apart from KaTeX. */
export function inlineHTML(text) {
  const parts = String(text).split(/(\$[^$]+\$)/g);
  return parts.map((p) => {
    if (/^\$[^$]+\$$/.test(p)) return texToHTML(p.slice(1, -1), false);
    return escHTML(p).replace(/==(.+?)==/g, '<span class="hl">$1</span>').replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/`([^`]+)`/g, '<code>$1</code>');
  }).join('');
}

async function codeTokens(src, lang, dark) {
  if (!shiki) { try { shiki = await import('shiki'); } catch { throw new Error('缺少依赖 shiki：cd slides2video && npm install'); } }
  const theme = dark ? 'github-dark' : 'github-light';
  let r;
  try { r = await shiki.codeToTokens(src, { lang, theme }); }
  catch { r = await shiki.codeToTokens(src, { lang: 'text', theme }); }
  return { lines: r.tokens.map((line) => line.map((t) => ({ content: t.content, color: t.color, fontStyle: t.fontStyle || 0 }))), bg: r.bg };
}

/** Find a page image: absolute/relative path, or a name inside --images, or NN.* by page number. */
export function resolveImage(name, { imagesDir, baseDir, pageNo }) {
  const tries = [];
  if (name) {
    if (path.isAbsolute(name)) tries.push(name);
    if (imagesDir) tries.push(path.join(imagesDir, name));
    tries.push(path.join(baseDir, name));
    if (!path.extname(name)) for (const x of IMAGE_EXT) { if (imagesDir) tries.push(path.join(imagesDir, name + x)); tries.push(path.join(baseDir, name + x)); }
  } else if (imagesDir && pageNo != null) {
    const pre = String(pageNo).padStart(2, '0');
    const hit = fs.existsSync(imagesDir) ? fs.readdirSync(imagesDir).sort().find((f) => (f.startsWith(pre + '.') || f.startsWith(pre + '_') || f.startsWith(pre + '-')) && IMAGE_EXT.includes(path.extname(f).toLowerCase())) : null;
    if (hit) tries.push(path.join(imagesDir, hit));
  }
  return tries.find((f) => fs.existsSync(f) && fs.statSync(f).isFile()) || null;
}

/** timeline → runtime deck JSON + asset map (url → file). */
export async function compileRuntime(tl, { imagesDir, baseDir, autoImages = false }) {
  const meta = tl.meta;
  const [W, H] = SIZES[meta.aspect] || SIZES['9:16'];
  const dark = ['tianji', 'chalk'].includes(meta.theme);
  const assets = new Map();
  const missing = [];
  const asset = (file) => { const url = `/assets/${assets.size + 1}${path.extname(file).toLowerCase()}`; assets.set(url, file); return url; };
  let hasDiagram = false, hasHuashu = false;
  const pages = [];
  for (const p of tl.pages) {
    const imgName = p.meta.image || null;
    const wantsImage = imgName || (autoImages && ['image-right', 'image-left', 'image-top', 'image-full'].includes(p.layout));
    const imgFile = wantsImage ? resolveImage(imgName, { imagesDir, baseDir, pageNo: imgName ? null : p.index }) : null;
    if (wantsImage && !imgFile) missing.push(`第 ${p.index} 页图片 ${imgName || `${String(p.index).padStart(2, '0')}.*`}`);
    if (p.transition?.type?.startsWith('huashu:')) hasHuashu = true;
    const elements = [];
    for (const e of p.elements) {
      const o = { ...e };
      if (['title', 'heading', 'subheading', 'text', 'bullet'].includes(e.kind)) o.html = inlineHTML(e.text);
      if (e.kind === 'formula') o.html = texToHTML(e.tex, true);
      if (e.kind === 'code') Object.assign(o, await codeTokens(e.src, e.lang, dark));
      if (e.kind === 'diagram') hasDiagram = true;
      if (e.kind === 'image') { const f = resolveImage(e.src, { imagesDir, baseDir }); if (f) o.url = asset(f); else missing.push(`第 ${p.index} 页图片 ${e.src}`); }
      elements.push(o);
    }
    pages.push({ index: p.index, layout: p.layout, start: p.start, end: p.end, transition: p.transition, elements, imageName: imgName || (wantsImage ? `${String(p.index).padStart(2, '0')}.png` : null), imageUrl: imgFile ? asset(imgFile) : null, fit: p.meta.fit === 'contain' ? 'contain' : 'cover', kenburns: p.meta.kenburns !== false, scrim: p.meta.scrim !== false });
  }
  const cues = tl.cues.map((c) => ({ page: c.page, start: c.start, end: c.end, text: c.text, charTimes: c.charTimes }));
  return { deck: { W, H, fps: +meta.fps || 30, theme: meta.theme, subtitles: meta.subtitles, progress: meta.progress, seal: meta.seal, duration: tl.duration, pages, cues, hasDiagram, hasHuashu }, assets, missing };
}
