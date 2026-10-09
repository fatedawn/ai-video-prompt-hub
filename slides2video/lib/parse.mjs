// deck.md parser (original work for ai-video-prompt-hub/slides2video, Apache-2.0, © 2026 天机).
// Syntax is a Slidev-like Markdown subset (idea credit: slidevjs/slidev, MIT — no code copied):
//   - a YAML frontmatter block at the top (deck options), `---` lines separate pages, and a YAML-only chunk right
//     after a separator is that page's frontmatter (Slidev convention);
//   - block elements: # / ## / ### headings, - / 1. list items (one build step each), paragraphs, ![alt](img),
//     $$…$$ formulas (KaTeX), ```lang code```, ```mermaid```, ```chart``` (YAML), ::right:: column split;
//   - trailing `{at: "词", build: up, mark: circle, id: sky}` sets element attributes (YAML flow map);
//   - `> say: …` lines are the narration (one subtitle cue each); `> note: …` and <!-- comments --> are ignored.
// Pure: no file system access. Returns { meta, pages:[{ index, meta, elements, say, warnings }] }.
import YAML from 'yaml';

export const LAYOUTS = ['cover', 'default', 'image-right', 'image-left', 'image-top', 'image-full', 'two-cols', 'compare', 'big-number', 'quote', 'formula', 'code', 'chart', 'diagram', 'timeline', 'section', 'end'];
export const THEMES = ['tianji', 'paper', 'chalk', 'clean'];
export const BUILDS = ['fade', 'up', 'left', 'right', 'zoom', 'type', 'wipe', 'draw', 'pop', 'none'];
export const MARKS = ['circle', 'underline', 'highlight', 'box', 'strike'];

const DECK_DEFAULTS = { title: '', aspect: '9:16', theme: 'tianji', voice: null, speed: 1, transition: 'fade', subtitles: 'karaoke', fps: 30, lang: 'zh' };

function yamlMap(src, where) {
  try {
    const v = YAML.parse(src);
    if (v && typeof v === 'object' && !Array.isArray(v)) return v;
    return {};
  } catch (e) {
    throw new Error(`${where} YAML 解析失败：${e.message.split('\n')[0]}`);
  }
}

const isYamlOnly = (chunk) => {
  const lines = chunk.split('\n').filter((l) => l.trim() && !l.trim().startsWith('#!'));
  return lines.length > 0 && lines.every((l) => /^[A-Za-z_][\w-]*\s*:(\s|$)/.test(l) || /^\s+\S/.test(l));
};

/** Split trailing `{...}` attributes off a line. Returns [text, attrs]. */
export function splitAttrs(line, where = '') {
  const m = line.match(/^(.*?)\s*\{([^{}]*:[^{}]*)\}\s*$/);
  if (!m) return [line, {}];
  const attrs = yamlMap(`{${m[2]}}`, `${where} 属性 {${m[2]}}`);
  for (const k of Object.keys(attrs)) if (typeof attrs[k] === 'number' && k !== 'at' && k !== 'duration' && k !== 'out') attrs[k] = String(attrs[k]);
  return [m[1], attrs];
}

/** Turn the page body into block elements. */
function parseBody(body, pageNo) {
  const els = [], say = [], warnings = [];
  const lines = body.replace(/<!--[\s\S]*?-->/g, '').split('\n');
  let col = 'main', para = [];
  const where = `第 ${pageNo} 页`;
  const flushPara = () => {
    if (!para.length) return;
    const [text, attrs] = splitAttrs(para.join(' ').trim(), where);
    if (text) els.push({ kind: 'text', text, ...attrs, col });
    para = [];
  };
  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line) { flushPara(); continue; }
    let m;
    if ((m = line.match(/^>\s*(say|旁白|台词)\s*[:：]\s*(.*)$/i))) {
      flushPara();
      const [text, attrs] = splitAttrs(m[2], where);
      if (text.trim()) say.push({ text: text.trim(), ...attrs });
      continue;
    }
    if (/^>\s*(note|备注)\s*[:：]/i.test(line)) { flushPara(); continue; }
    if (/^::(right|左|右|left)::$/.test(line)) { flushPara(); col = /right|右/.test(line) ? 'right' : 'main'; continue; }
    if ((m = line.match(/^```\s*([\w+-]*)\s*(\{.*\})?\s*$/))) {
      flushPara();
      const lang = (m[1] || 'text').toLowerCase();
      const attrs = m[2] ? splitAttrs('x ' + m[2], where)[1] : {};
      const buf = [];
      for (i++; i < lines.length && !/^\s*```\s*$/.test(lines[i]); i++) buf.push(lines[i]);
      if (i >= lines.length) warnings.push(`${where}：代码块没有结束的 \`\`\``);
      const src = buf.join('\n');
      if (lang === 'mermaid') els.push({ kind: 'diagram', src, ...attrs, col });
      else if (lang === 'chart') els.push({ kind: 'chart', chart: yamlMap(src, `${where} chart`), ...attrs, col });
      else els.push({ kind: 'code', lang, src, ...attrs, col });
      continue;
    }
    if (line.startsWith('$$')) {
      flushPara();
      let tex = line.slice(2);
      let rest = '';
      if (tex.includes('$$')) { rest = tex.slice(tex.indexOf('$$') + 2); tex = tex.slice(0, tex.indexOf('$$')); }
      else {
        const buf = [tex];
        for (i++; i < lines.length && !lines[i].includes('$$'); i++) buf.push(lines[i]);
        if (i < lines.length) { buf.push(lines[i].slice(0, lines[i].indexOf('$$'))); rest = lines[i].slice(lines[i].indexOf('$$') + 2); }
        tex = buf.join('\n');
      }
      const attrs = rest.trim() ? splitAttrs('x ' + rest.trim(), where)[1] : {};
      els.push({ kind: 'formula', tex: tex.trim(), ...attrs, col });
      continue;
    }
    if ((m = line.match(/^(#{1,3})\s+(.*)$/))) {
      flushPara();
      const [text, attrs] = splitAttrs(m[2], where);
      els.push({ kind: ['title', 'heading', 'subheading'][m[1].length - 1], text: text.trim(), ...attrs, col });
      continue;
    }
    if ((m = line.match(/^([-*+]|\d+[.)])\s+(.*)$/))) {
      flushPara();
      const [text, attrs] = splitAttrs(m[2], where);
      els.push({ kind: 'bullet', ordered: /\d/.test(m[1]), text: text.trim(), ...attrs, col });
      continue;
    }
    if ((m = line.match(/^!\[([^\]]*)\]\(([^)\s]+)\)\s*(\{.*\})?$/))) {
      flushPara();
      const attrs = m[3] ? splitAttrs('x ' + m[3], where)[1] : {};
      els.push({ kind: 'image', alt: m[1], src: m[2], ...attrs, col });
      continue;
    }
    para.push(line);
  }
  flushPara();
  // number list items so ordered lists keep their count; give every element a stable key
  let n = 0;
  els.forEach((e, k) => { e.key = `p${pageNo}e${k + 1}`; if (e.kind === 'bullet') e.n = ++n; });
  return { els, say, warnings };
}

/** Parse deck.md source → { meta, pages }. */
export function parseDeck(src) {
  const text = src.replace(/\r\n?/g, '\n').replace(/^\uFEFF/, '');
  const chunks = text.split(/^---[ \t]*$/m);
  let meta = { ...DECK_DEFAULTS };
  let start = 0;
  // leading frontmatter: "" + yaml + rest
  if (chunks.length > 2 && chunks[0].trim() === '' && isYamlOnly(chunks[1])) {
    meta = { ...meta, ...yamlMap(chunks[1], '文件头 frontmatter') };
    start = 2;
  }
  const pages = [];
  const warnings = [];
  let pendingMeta = null;
  for (let i = start; i < chunks.length; i++) {
    const c = chunks[i];
    if (isYamlOnly(c) && i + 1 < chunks.length) { pendingMeta = yamlMap(c, `第 ${pages.length + 1} 页 frontmatter`); continue; }
    if (!c.trim() && !pendingMeta) continue;
    const pageNo = pages.length + 1;
    const pm = pendingMeta || {};
    pendingMeta = null;
    const { els, say, warnings: w } = parseBody(c, pageNo);
    warnings.push(...w);
    pages.push({ index: pageNo, meta: pm, elements: els, say });
  }
  meta.aspect = String(meta.aspect);
  if (!['9:16', '16:9', '1:1'].includes(meta.aspect)) warnings.push(`aspect ${meta.aspect} 不支持，改用 9:16`), (meta.aspect = '9:16');
  if (!THEMES.includes(meta.theme)) warnings.push(`theme ${meta.theme} 不存在（可选：${THEMES.join(' / ')}），改用 tianji`), (meta.theme = 'tianji');
  for (const p of pages) {
    p.layout = p.meta.layout || guessLayout(p, pages.length);
    if (!LAYOUTS.includes(p.layout)) { warnings.push(`第 ${p.index} 页：layout ${p.layout} 不存在（可选：${LAYOUTS.join(' / ')}），改用 default`); p.layout = 'default'; }
    for (const e of p.elements) {
      if (e.build && !BUILDS.includes(e.build) && e.kind !== 'formula') warnings.push(`第 ${p.index} 页：build ${e.build} 未知（可选：${BUILDS.join(' / ')}）`);
      for (const mk of [].concat(e.mark || [])) { const t = String(mk).split(':')[0]; if (!MARKS.includes(t)) warnings.push(`第 ${p.index} 页：mark ${mk} 未知（可选：${MARKS.join(' / ')}，可写 circle:词）`); }
    }
  }
  return { meta, pages, warnings };
}

/** Pick a layout when the page does not say: by content. */
export function guessLayout(p, total) {
  const kinds = p.elements.map((e) => e.kind);
  const has = (k) => kinds.includes(k);
  const content = kinds.filter((k) => !['title', 'heading', 'subheading'].includes(k));
  if (p.index === 1 && content.length <= 1 && !p.meta.image) return 'cover';
  if (p.meta.image && content.length === 0) return 'image-full';
  if (p.meta.image) return 'image-right';
  if (has('chart') && content.length <= 2) return 'chart';
  if (has('diagram') && content.length <= 2) return 'diagram';
  if (has('code') && content.length <= 2) return 'code';
  if (has('formula') && content.filter((k) => k !== 'formula').length <= 1) return 'formula';
  if (p.elements.some((e) => e.col === 'right')) return 'two-cols';
  if (p.index === total && total > 2 && has('bullet') && content.length <= 4) return 'end';
  return 'default';
}

/** Plain text of an element (for word lookup, QA and prompts). */
export function plainText(s) {
  return String(s || '').replace(/\$[^$]*\$/g, '').replace(/==|\*\*|`/g, '').trim();
}
