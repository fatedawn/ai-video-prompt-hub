// `import x.pptx` → deck.md (original work, Apache-2.0, © 2026 天机). No code from other projects.
// Speaker-notes convention is compatible with pptx2video's "Author Notes" (ai-nuts/pptx2video, MIT; protocol idea
// only): blocks start with `## [handle] heading`, the handle matches a shape's Alt Text `[handle]`, and
// `[[Spotlight] phrase]` asks for a focus cue on that shape. We map:
//   - every sentence of the notes → `> say:` lines (handle headings dropped, Spotlight text kept as speech);
//   - a handle block → the matching element gets `at:` the first words of that block, and Spotlight → `mark: box`;
//   - Animation Pane click order (p:timing) → build order of elements.
// Two modes: `pages` (default; LibreOffice renders each slide to an image, layout image-full — looks exactly like
// the PPT) and `rebuild` (titles / bullets / pictures re-typeset in our themes; editable and animatable).
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import os from 'node:os';
import { spawnSync } from 'node:child_process';

/** Minimal ZIP reader (stored + deflate). */
export function readZip(buf) {
  let eocd = -1;
  for (let i = buf.length - 22; i >= Math.max(0, buf.length - 65557); i--) if (buf.readUInt32LE(i) === 0x06054b50) { eocd = i; break; }
  if (eocd < 0) throw new Error('不是有效的 pptx（zip）文件');
  const n = buf.readUInt16LE(eocd + 10);
  let off = buf.readUInt32LE(eocd + 16);
  const files = new Map();
  for (let k = 0; k < n; k++) {
    if (buf.readUInt32LE(off) !== 0x02014b50) throw new Error('zip 目录损坏');
    const method = buf.readUInt16LE(off + 10), csize = buf.readUInt32LE(off + 20), nlen = buf.readUInt16LE(off + 28), xlen = buf.readUInt16LE(off + 30), clen = buf.readUInt16LE(off + 32), lho = buf.readUInt32LE(off + 42);
    const name = buf.toString('utf8', off + 46, off + 46 + nlen);
    files.set(name, () => {
      const start = lho + 30 + buf.readUInt16LE(lho + 26) + buf.readUInt16LE(lho + 28);
      const data = buf.subarray(start, start + csize);
      return method === 0 ? Buffer.from(data) : zlib.inflateRawSync(data);
    });
    off += 46 + nlen + xlen + clen;
  }
  return { names: [...files.keys()], read: (p) => (files.has(p) ? files.get(p)() : null), text: (p) => (files.has(p) ? files.get(p)().toString('utf8') : null) };
}

const unxml = (s) => s.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d)).replace(/&amp;/g, '&');
const attr = (tag, name) => { const m = tag.match(new RegExp(`\\b${name}="([^"]*)"`)); return m ? unxml(m[1]) : null; };

function rels(zip, p) {
  const f = path.posix.join(path.posix.dirname(p), '_rels', path.posix.basename(p) + '.rels');
  const x = zip.text(f) || '';
  const out = {};
  for (const m of x.matchAll(/<Relationship\b[^>]*>/g)) out[attr(m[0], 'Id')] = { target: path.posix.normalize(path.posix.join(path.posix.dirname(p), attr(m[0], 'Target') || '')), type: attr(m[0], 'Type') || '' };
  return out;
}

function paragraphs(xml) {
  const out = [];
  for (const m of xml.matchAll(/<a:p\b[^>]*>([\s\S]*?)<\/a:p>/g)) {
    const lvl = +(m[1].match(/<a:pPr\b[^>]*\blvl="(\d)"/)?.[1] || 0);
    const t = [...m[1].matchAll(/<a:t>([\s\S]*?)<\/a:t>|<a:t\/>/g)].map((x) => unxml(x[1] || '')).join('').trim();
    if (t) out.push({ text: t, lvl });
  }
  return out;
}

/** Parse slides → [{ n, title, shapes:[{id,name,alt,kind,paras,image}], notes, order:[shapeId…] }]. */
export function parsePptx(buf) {
  const zip = readZip(buf);
  const pres = zip.text('ppt/presentation.xml');
  if (!pres) throw new Error('缺少 ppt/presentation.xml');
  const prel = rels(zip, 'ppt/presentation.xml');
  const ids = [...pres.matchAll(/<p:sldId\b[^>]*>/g)].map((m) => attr(m[0], 'r:id'));
  const sz = pres.match(/<p:sldSz\b[^>]*>/)?.[0];
  const size = sz ? { cx: +attr(sz, 'cx'), cy: +attr(sz, 'cy') } : null;
  const slides = ids.map((rid, i) => {
    const p = prel[rid].target;
    const x = zip.text(p) || '';
    const r = rels(zip, p);
    const shapes = [];
    for (const m of x.matchAll(/<p:(sp|pic)\b[\s\S]*?<\/p:\1>/g)) {
      const s = m[0];
      const nv = s.match(/<p:cNvPr\b[^>]*>/)?.[0] || '';
      const ph = s.match(/<p:ph\b[^>]*>/)?.[0];
      const phType = ph ? attr(ph, 'type') || 'body' : null;
      const shape = { id: attr(nv, 'id'), name: attr(nv, 'name') || '', alt: attr(nv, 'descr') || '', ph: phType };
      if (m[1] === 'pic') {
        const emb = s.match(/r:embed="([^"]+)"/)?.[1];
        shape.kind = 'image';
        shape.image = emb && r[emb] ? r[emb].target : null;
      } else {
        shape.paras = paragraphs(s);
        if (!shape.paras.length) continue;
        shape.kind = phType === 'title' || phType === 'ctrTitle' ? 'title' : phType === 'subTitle' ? 'subtitle' : 'body';
      }
      shapes.push(shape);
    }
    const notesRel = Object.values(r).find((v) => /notesSlide$/.test(v.type));
    let notes = '';
    if (notesRel) {
      const nx = zip.text(notesRel.target) || '';
      for (const m of nx.matchAll(/<p:sp\b[\s\S]*?<\/p:sp>/g)) if (/<p:ph\b[^>]*type="body"/.test(m[0])) notes += paragraphs(m[0]).map((q) => q.text).join('\n') + '\n';
    }
    // animation pane click order: <p:spTgt spid="N"/> in document order
    const timing = x.match(/<p:timing>[\s\S]*<\/p:timing>/)?.[0] || '';
    const order = [...new Set([...timing.matchAll(/<p:spTgt\b[^>]*spid="(\d+)"/g)].map((q) => q[1]))];
    return { n: i + 1, shapes, notes: notes.trim(), order };
  });
  return { slides, size, zip };
}

/** Notes → { say:[text], blocks:[{handle, firstWords, spotlight}] } (pptx2video-compatible notation). */
export function parseNotes(notes) {
  const say = [], blocks = [];
  let cur = null;
  for (const raw of notes.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    const h = line.match(/^#{1,3}\s*\[([^\]]+)\]\s*(.*)$/);
    if (h) { cur = { handle: h[1].trim(), firstWords: null, spotlight: false }; blocks.push(cur); continue; }
    let text = line.replace(/\[\[\s*spotlight\s*\]\s*([^\]]*)\]/gi, (_, s) => { if (cur) cur.spotlight = true; return s; }).trim();
    for (const sent of text.split(/(?<=[。！？!?；;])\s*|(?<=[.])\s+/).map((s) => s.trim()).filter(Boolean)) {
      say.push(sent);
      if (cur && !cur.firstWords) cur.firstWords = sent.replace(/[，。！？、,.!?\s]/g, '').slice(0, 4);
    }
  }
  return { say, blocks };
}

const esc = (s) => s.replace(/[{}]/g, '');
const yq = (s) => JSON.stringify(s);

/** pptx → deck.md text (+ writes images). mode: 'pages' | 'rebuild'. */
export function pptxToDeck(file, outDir, { mode = 'pages', aspect, theme = 'clean', title } = {}) {
  const buf = fs.readFileSync(file);
  const { slides, size, zip } = parsePptx(buf);
  const imgDir = path.join(outDir, 'images');
  fs.mkdirSync(imgDir, { recursive: true });
  const asp = aspect || (size && size.cx < size.cy ? '9:16' : '16:9');
  let pageImgs = [];
  if (mode === 'pages') pageImgs = renderPages(file, imgDir);
  const lines = ['---', `title: ${yq(title || path.basename(file, path.extname(file)))}`, `aspect: "${asp}"`, `theme: ${theme}`, 'transition: fade', '---'];
  slides.forEach((s, i) => {
    const { say, blocks } = parseNotes(s.notes);
    const pm = [];
    if (mode === 'pages') { pm.push('layout: image-full', `image: ${pageImgs[i] ? path.basename(pageImgs[i]) : 'MISSING'}`, 'kenburns: false', 'scrim: false', 'fit: contain'); }
    if (pm.length || i > 0) lines.push(...(i > 0 ? ['---'] : []), ...(pm.length ? [...pm, '---'] : []));
    if (mode === 'rebuild') {
      const byHandle = Object.fromEntries(blocks.map((b) => [b.handle, b]));
      const ordered = [...s.shapes].sort((a, b) => { const ia = s.order.indexOf(a.id), ib = s.order.indexOf(b.id); return (ia < 0 ? -1 : ia) - (ib < 0 ? -1 : ib); });
      for (const sh of ordered) {
        const handle = sh.alt.match(/\[([^\]]+)\]/)?.[1];
        const b = handle && byHandle[handle];
        const at = b?.firstWords ? { at: b.firstWords } : {};
        const extra = { ...at, ...(b?.spotlight ? { mark: 'box' } : {}) };
        const a = Object.keys(extra).length ? ' {' + Object.entries(extra).map(([k, v]) => `${k}: ${yq(v)}`).join(', ') + '}' : '';
        if (sh.kind === 'title') lines.push(`# ${esc(sh.paras.map((q) => q.text).join(' '))}${a}`);
        else if (sh.kind === 'subtitle') lines.push(`### ${esc(sh.paras.map((q) => q.text).join(' '))}${a}`);
        else if (sh.kind === 'image' && sh.image) {
          const data = zip.read(sh.image);
          if (data) { const name = `s${String(s.n).padStart(2, '0')}_${path.posix.basename(sh.image)}`; fs.writeFileSync(path.join(imgDir, name), data); lines.push(`![${esc(sh.alt.replace(/\[[^\]]*\]/, '').trim())}](${name})${a}`); }
        } else if (sh.paras) sh.paras.forEach((q, k) => lines.push(`${'  '.repeat(q.lvl)}- ${esc(q.text)}${k === 0 ? a : ''}`));
      }
    }
    lines.push('');
    for (const t of say) lines.push(`> say: ${t}`);
    lines.push('');
  });
  lines.push(`<!-- 由 slides2video import 从 ${path.basename(file)} 生成（${mode} 模式）；旁白来自演讲者备注 -->`, '');
  const deckPath = path.join(outDir, 'deck.md');
  fs.writeFileSync(deckPath, lines.join('\n'));
  return { deckPath, imagesDir: imgDir, slides: slides.length, aspect: asp, withNotes: slides.filter((s) => s.notes).length };
}

export function sofficeBin() {
  for (const b of ['soffice', 'libreoffice', '/Applications/LibreOffice.app/Contents/MacOS/soffice', 'C:\\Program Files\\LibreOffice\\program\\soffice.exe']) if (spawnSync(b, ['--version'], { encoding: 'utf8' }).status === 0) return b;
  return null;
}

/** LibreOffice → PDF → PNG per slide (pdftoppm). Returns PNG paths in slide order. */
export function renderPages(file, imgDir) {
  const so = sofficeBin();
  if (!so) throw new Error('pages 模式需要 LibreOffice（soffice）；或改用 --mode rebuild');
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 's2v-pptx-'));
  const r = spawnSync(so, ['--headless', '--convert-to', 'pdf', '--outdir', tmp, file], { encoding: 'utf8', timeout: 180000 });
  const pdf = path.join(tmp, path.basename(file, path.extname(file)) + '.pdf');
  if (r.status !== 0 || !fs.existsSync(pdf)) throw new Error('LibreOffice 转 PDF 失败：' + (r.stderr || r.stdout));
  const pp = spawnSync('pdftoppm', ['-png', '-r', '144', pdf, path.join(imgDir, 'page')], { encoding: 'utf8' });
  if (pp.status !== 0) throw new Error('pdftoppm 失败（需要 poppler-utils）：' + pp.stderr);
  fs.rmSync(tmp, { recursive: true, force: true });
  return fs.readdirSync(imgDir).filter((f) => /^page-\d+\.png$/.test(f)).sort((a, b) => +a.match(/\d+/)[0] - +b.match(/\d+/)[0]).map((f) => path.join(imgDir, f));
}
