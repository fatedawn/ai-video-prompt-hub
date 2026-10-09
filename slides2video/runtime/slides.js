// slides2video browser runtime (original work for ai-video-prompt-hub, Apache-2.0, © 2026 天机).
// Every frame is a pure function of time: window.__render(t) sets opacity/transform/clip/dash values from the
// compiled deck; no CSS transitions, timers or requestAnimationFrame. Idea credits (all reimplemented here, no
// code copied): bullet builds / v-click (slidevjs/slidev, MIT); same-id FLIP morph between pages (reveal.js
// Auto-Animate, MIT); hand-drawn circle/underline/box/highlight marks (rough-notation, MIT); spotlight on the
// element being talked about (Paper2Video cursor / pptx2video Spotlight, MIT); line-diff code morph
// (shiki-magic-move, MIT); deterministic virtual-time capture (timecut, BSD-3). Page transitions named
// `huashu:<name>` run the MIT-licensed huashu-art-motion transitions through the animator adapter.
const D = { deck: null, W: 1080, H: 1920, u: 10.8, pages: [], slides: [], byKey: new Map(), cueIdx: -1, huashu: null };
const $ = (tag, cls, parent) => { const n = document.createElement(tag); if (cls) n.className = cls; if (parent) parent.appendChild(n); return n; };
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, k) => a + (b - a) * k;
const E = { out: (x) => 1 - Math.pow(1 - x, 3), inOut: (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2), back: (x) => { const c = 1.6; return 1 + (c + 1) * Math.pow(x - 1, 3) + c * Math.pow(x - 1, 2); } };
const TEXTY = new Set(['title', 'heading', 'subheading', 'text', 'bullet']);

function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function hash(s) { let h = 2166136261; for (const c of String(s)) { h ^= c.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; }

// ---------------------------------------------------------------- DOM construction
function elementNode(e, page) {
  const n = $('div', `el k-${e.kind}`);
  n.dataset.key = e.key;
  const inner = $('div', 'inner', n);
  if (e.kind === 'bullet') {
    if (page.layout === 'timeline' || e.ordered) $('span', 'num', inner).textContent = String(e.n);
    else $('span', 'dot', inner);
    $('span', 'txt', inner).innerHTML = e.html;
    inner.style.display = 'contents';
  } else if (e.kind === 'formula') inner.innerHTML = e.html;
  else if (e.kind === 'code') {
    for (const line of e.lines) { const ln = $('span', 'ln', inner); for (const tk of line) { const s = $('span', '', ln); s.textContent = tk.content; if (tk.color) s.style.color = tk.color; if (tk.fontStyle & 1) s.style.fontStyle = 'italic'; if (tk.fontStyle & 2) s.style.fontWeight = '700'; } if (!line.length) ln.textContent = ' '; }
    if (e.bg) n.style.background = e.bg;
  } else if (e.kind === 'diagram') inner.innerHTML = e.svg || '';
  else if (e.kind === 'chart') inner.innerHTML = chartSVG(e);
  else if (e.kind === 'image') { const m = $('div', 'media', inner); if (e.url) { const im = $('img', '', m); im.src = e.url; } else $('div', 'ph', m).textContent = `待出图：${e.alt || e.src}`; inner.style.position = 'absolute'; inner.style.inset = '0'; }
  else inner.innerHTML = e.html;
  if (e.kind === 'diagram' || e.kind === 'chart' || e.kind === 'image') inner.style.cssText += ';width:100%;height:100%;display:flex;align-items:center;justify-content:center';
  return n;
}

function mediaNode(page) {
  const m = $('div', 'media');
  if (page.imageUrl) { const im = $('img', '', m); im.src = page.imageUrl; }
  else $('div', 'ph', m).textContent = `待出图：${page.imageName || '（本页 image）'}`;
  return m;
}

function buildSlide(p, pi) {
  const s = $('section', `slide layout-${p.layout} theme-${D.deck.theme}`, D.stage);
  s.style.display = 'none';
  $('div', 'paper', s);
  let bg = null;
  if (p.layout === 'image-full' && (p.imageUrl || p.imageName)) { bg = $('div', 'bgimg' + (p.scrim === false ? ' noscrim' : ''), s); if (p.imageUrl) { const im = $('img', '', bg); im.src = p.imageUrl; if (p.fit === 'contain') im.style.objectFit = 'contain'; } }
  const content = $('div', 'content', s);
  const head = p.elements.filter((e) => ['title', 'heading'].includes(e.kind) && e.col !== 'right');
  const rest = p.elements.filter((e) => !head.includes(e));
  const nodes = new Map();
  const place = (list, parent) => {
    let bul = null;
    for (const e of list) {
      const n = elementNode(e, p);
      nodes.set(e.key, n);
      if (e.kind === 'bullet') { if (!bul) bul = $('div', 'bul', parent); bul.appendChild(n); }
      else { bul = null; parent.appendChild(n); }
      if (['diagram', 'chart', 'image'].includes(e.kind)) n.style.flex = '1';
    }
  };
  place(head, content);
  let media = null;
  const portrait = D.W < D.H;
  if (['image-right', 'image-left', 'image-top'].includes(p.layout)) {
    const vertical = p.layout === 'image-top' || portrait;
    const cols = $('div', 'cols', content);
    if (vertical) cols.style.flexDirection = 'column';
    media = mediaNode(p);
    const txt = $('div', 'col');
    if (vertical) { media.style.flex = portrait ? '0 0 50%' : '0 0 42%'; cols.append(media, txt); }
    else { media.style.flex = '0 0 44%'; if (p.layout === 'image-left') cols.append(media, txt); else cols.append(txt, media); }
    place(rest, txt);
  } else if (['two-cols', 'compare'].includes(p.layout)) {
    const cols = $('div', 'cols', content);
    if (portrait && p.layout === 'two-cols') cols.style.flexDirection = 'column';
    const a = $('div', 'col', cols), b = $('div', 'col', cols);
    place(rest.filter((e) => e.col !== 'right'), a); place(rest.filter((e) => e.col === 'right'), b);
  } else if (['cover', 'section', 'end', 'image-full', 'big-number', 'quote'].includes(p.layout)) place(rest, content);
  else place(rest, $('div', 'body', content));
  if (p.layout === 'image-full') { content.style.justifyContent = 'flex-end'; }
  const marks = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  marks.setAttribute('class', 'marks'); marks.setAttribute('width', D.W); marks.setAttribute('height', D.H); marks.setAttribute('viewBox', `0 0 ${D.W} ${D.H}`);
  s.appendChild(marks);
  const spots = p.elements.filter((e) => e.spotT).map((e) => { const d = $('div', 'spot', s); return { e, d }; });
  return { s, content, nodes, marks, media, bg, spots, page: p, index: pi };
}

// ---------------------------------------------------------------- charts (own SVG)
function chartSVG(e) {
  const ch = e.chart || {}, items = ch.items || [];
  const W = 1000, H = D.W < D.H ? 900 : 640, padL = 40, padB = 100, padT = 80, top = padT, bottom = H - padB;
  const max = +ch.max || Math.max(1e-9, ...items.map((i) => +i.value || 0)) * 1.12;
  const unit = ch.unit || '';
  const col = (i, it) => it.color || ['var(--accent)', '#5b8def', '#57c08a', '#e0686b', '#a78bfa', '#f59e0b'][i % 6];
  let s = `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid meet" font-family="inherit">`;
  if (ch.title) s += `<text x="${W / 2}" y="34" text-anchor="middle" font-size="34" font-weight="800" fill="var(--title-ink)">${esc(ch.title)}</text>`;
  s += `<line x1="${padL}" y1="${bottom}" x2="${W - 20}" y2="${bottom}" stroke="var(--muted)" stroke-width="3"/>`;
  const n = Math.max(1, items.length), slot = (W - padL - 20) / n;
  if ((ch.type || (ch.points ? 'line' : 'bar')) === 'line') {
    const pts = items.map((it, i) => [padL + slot * (i + 0.5), bottom - ((+it.value || 0) / max) * (bottom - top)]);
    s += `<polyline class="cl" points="${pts.map((p) => p.join(',')).join(' ')}" fill="none" stroke="var(--accent)" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/>`;
    items.forEach((it, i) => { s += `<g class="ci" data-i="${i}"><circle cx="${pts[i][0]}" cy="${pts[i][1]}" r="13" fill="var(--accent)"/><text x="${pts[i][0]}" y="${pts[i][1] - 26}" text-anchor="middle" font-size="44" font-weight="800" fill="var(--ink)" class="cv" data-v="${+it.value}">${fmt(+it.value)}${esc(unit)}</text></g><text x="${pts[i][0]}" y="${bottom + 60}" text-anchor="middle" font-size="40" fill="var(--ink)">${esc(it.label ?? '')}</text>`; });
  } else {
    const bw = Math.min(200, slot * 0.62);
    items.forEach((it, i) => {
      const x = padL + slot * (i + 0.5) - bw / 2, h = ((+it.value || 0) / max) * (bottom - top);
      s += `<g class="ci" data-i="${i}"><rect class="cb" x="${x}" y="${bottom - h}" width="${bw}" height="${h}" rx="10" fill="${col(i, it)}" style="transform-origin:${x + bw / 2}px ${bottom}px"/>`;
      s += `<text class="cv" data-v="${+it.value}" x="${x + bw / 2}" y="${bottom - h - 18}" text-anchor="middle" font-size="48" font-weight="800" fill="var(--ink)">${fmt(+it.value)}${esc(unit)}</text></g>`;
      s += `<text x="${x + bw / 2}" y="${bottom + 60}" text-anchor="middle" font-size="40" font-weight="700" fill="${col(i, it)}">${esc(it.label ?? '')}</text>`;
    });
  }
  if (ch.note) s += `<text x="${W - 20}" y="${H - 12}" text-anchor="end" font-size="22" fill="var(--muted)">${esc(ch.note)}</text>`;
  return s + '</svg>';
}
const esc = (x) => String(x).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const fmt = (v) => (Math.abs(v) >= 100 || Number.isInteger(v) ? String(Math.round(v)) : v.toFixed(1));

// ---------------------------------------------------------------- marks (rough-notation idea, own paths)
function roughPath(type, r, seed) {
  const R = rng(seed), j = (k) => (R() - 0.5) * k;
  const pad = D.u * 1.1;
  if (type === 'circle') {
    const cx = r.x + r.w / 2, cy = r.y + r.h / 2, rx = r.w / 2 + pad * 1.6, ry = r.h / 2 + pad * 1.4;
    const a0 = -Math.PI * 0.6 + j(0.4), turn = Math.PI * 2 * 1.08;
    let d = '';
    for (let k = 0; k <= 64; k++) { const a = a0 + (turn * k) / 64, w = 1 + 0.04 * Math.sin(k * 0.7 + seed) + j(0.015); d += `${k ? 'L' : 'M'}${(cx + Math.cos(a) * rx * w).toFixed(1)} ${(cy + Math.sin(a) * ry * w).toFixed(1)}`; }
    return d;
  }
  if (type === 'underline' || type === 'strike') {
    const y = type === 'strike' ? r.y + r.h * 0.55 : r.y + r.h + pad * 0.3;
    const x0 = r.x - pad * 0.3, x1 = r.x + r.w + pad * 0.3;
    let d = `M${x0.toFixed(1)} ${(y + j(4)).toFixed(1)}`;
    for (let k = 1; k <= 8; k++) d += `L${lerp(x0, x1, k / 8).toFixed(1)} ${(y + Math.sin(k * 1.3 + seed) * D.u * 0.25 + j(3)).toFixed(1)}`;
    return d;
  }
  if (type === 'box') {
    const x0 = r.x - pad, y0 = r.y - pad, x1 = r.x + r.w + pad, y1 = r.y + r.h + pad;
    return `M${x0 + j(6)} ${y0 + j(6)}L${x1 + j(6)} ${y0 + j(6)}L${x1 + j(6)} ${y1 + j(6)}L${x0 + j(6)} ${y1 + j(6)}L${x0 + j(6)} ${y0 + j(8) - 4}`;
  }
  if (type === 'highlight') {
    const y = r.y + r.h * 0.55; return `M${r.x - pad * 0.4} ${y + j(3)}L${r.x + r.w + pad * 0.4} ${y + j(3)}`;
  }
  return '';
}

/** Box of the text itself (not the full-width block), for marks on whole bullets / lines. */
function textRect(n) {
  const host = n.querySelector('.txt') || n.querySelector('.inner') || n;
  const rg = document.createRange(); rg.selectNodeContents(host);
  const a = rg.getBoundingClientRect(), b = D.stage.getBoundingClientRect();
  return a.width ? { x: a.left - b.left, y: a.top - b.top, w: a.width, h: a.height } : relRect(n);
}

/** Wrap the first occurrence of `word` inside node's text in a span (for word-level marks). */
function wrapWord(node, word) {
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  let tn;
  while ((tn = walker.nextNode())) {
    const i = tn.data.indexOf(word);
    if (i < 0) continue;
    const r = document.createRange(); r.setStart(tn, i); r.setEnd(tn, i + word.length);
    const span = document.createElement('span'); span.className = 'mw'; r.surroundContents(span);
    return span;
  }
  return null;
}

function relRect(node) {
  const a = node.getBoundingClientRect(), b = D.stage.getBoundingClientRect();
  return { x: a.left - b.left, y: a.top - b.top, w: a.width, h: a.height };
}

// ---------------------------------------------------------------- setup
async function setup(deck) {
  D.deck = deck; D.W = deck.W; D.H = deck.H; D.u = Math.min(D.W, D.H) / 100;
  const st = D.stage = document.getElementById('stage');
  st.style.width = D.W + 'px'; st.style.height = D.H + 'px'; st.style.setProperty('--u', D.u + 'px');
  st.className = `${D.W < D.H ? 'portrait' : D.W > D.H ? 'landscape' : 'square'} theme-${deck.theme}`;
  D.pages = deck.pages;
  D.slides = D.pages.map((p, i) => buildSlide(p, i));
  if (deck.progress !== false) D.progress = $('div', '', st), D.progress.id = 'progress';
  if (deck.theme === 'tianji' && deck.seal !== false) { const s = $('div', 'seal', st); s.innerHTML = '天<br>机'; }
  D.subs = $('div', '', st); D.subs.id = 'subs';
  if (deck.hasDiagram) await renderMermaid();
  await document.fonts.ready;
  await Promise.all([...document.images].map((im) => (im.complete ? 0 : new Promise((r) => { im.onload = im.onerror = r; }))));
  // typewriter: one span per visible character
  for (const sl of D.slides) for (const e of sl.page.elements) if (e.build === 'type') {
    const n = sl.nodes.get(e.key); const chars = [];
    const walker = document.createTreeWalker(n, NodeFilter.SHOW_TEXT); const tns = []; let tn;
    while ((tn = walker.nextNode())) if (!tn.parentElement.closest('.katex')) tns.push(tn);
    for (const t of tns) { const frag = document.createDocumentFragment(); for (const c of t.data) { const s = document.createElement('span'); s.textContent = c; frag.appendChild(s); chars.push(s); } t.replaceWith(frag); }
    e._chars = chars;
  }
  // measure every slide (show each alone; builds only use transform/opacity so layout is static)
  for (const sl of D.slides) {
    sl.s.style.display = 'block';
    for (const e of sl.page.elements) {
      const n = sl.nodes.get(e.key);
      e._rect = relRect(n);
      const fs = parseFloat(getComputedStyle(n).fontSize);
      e._font = fs;
      e._marks = (e.marks || []).map((m, k) => {
        let target = n;
        if (m.word) target = wrapWord(n, m.word) || n;
        const r = target === n && TEXTY.has(e.kind) ? textRect(n) : relRect(target);
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', roughPath(m.type, r, hash(e.key + k)));
        path.setAttribute('fill', 'none');
        path.setAttribute('stroke', m.type === 'highlight' ? 'var(--hl)' : 'var(--mark)');
        path.setAttribute('stroke-width', m.type === 'highlight' ? Math.max(8, r.h * 0.62) : D.u * 0.62);
        path.setAttribute('stroke-linecap', 'round'); path.setAttribute('stroke-linejoin', 'round');
        sl.marks.appendChild(path);
        const len = path.getTotalLength() || 1;
        path.style.strokeDasharray = `${len} ${len}`; path.style.strokeDashoffset = len;
        return { ...m, path, len };
      });
      e._hl = [...n.querySelectorAll('.hl')].map((h, k) => ({ node: h, t: (e.hl || [])[k]?.t ?? e.t + 0.4 }));
      e._terms = [...n.querySelectorAll('.term')];
      if (e.kind === 'code') e._lines = [...n.querySelectorAll('.ln')].map((ln) => ({ node: ln, y: relRect(ln).y, text: ln.textContent }));
      if (e.kind === 'diagram') prepDiagram(e, n);
      if (e.kind === 'chart') e._items = [...n.querySelectorAll('.ci')];
    }
    for (const sp of sl.spots) { const r = sp.e._rect, pad = D.u * 1.4; Object.assign(sp.d.style, { left: r.x - pad + 'px', top: r.y - pad + 'px', width: r.w + 2 * pad + 'px', height: r.h + 2 * pad + 'px' }); }
    sl.s.style.display = 'none';
  }
  // morph pairs
  D.slides.forEach((sl, i) => {
    if (!i) return;
    const prev = D.slides[i - 1];
    sl.pairs = [];
    for (const e of sl.page.elements) if (e.morphFrom) {
      const o = prev.page.elements.find((x) => String(x.id) === e.morphFrom);
      if (!o) continue;
      const pair = { o, n: e, on: prev.nodes.get(o.key), nn: sl.nodes.get(e.key) };
      if (o.kind === 'code' && e.kind === 'code') pair.code = codeDiff(o, e, pair);
      sl.pairs.push(pair);
    }
    sl.matchedOld = new Set(sl.pairs.map((p) => p.o.key));
  });
  if (deck.hasHuashu) {
    const mod = await import('/ar/fx/huashu.js');
    await mod.loadHuashu({ stage: true }, D.W, D.H);
    D.huashu = mod;
  }
  return { pages: D.slides.length };
}

async function renderMermaid() {
  const mermaid = (await import('/mermaid/mermaid.esm.min.mjs')).default;
  const dark = ['tianji', 'chalk'].includes(D.deck.theme);
  const cs = getComputedStyle(D.stage);
  const v = (k) => cs.getPropertyValue(k).trim();
  mermaid.initialize({ startOnLoad: false, deterministicIds: true, securityLevel: 'strict', theme: 'base', fontFamily: '"Noto Sans CJK SC", sans-serif',
    flowchart: { htmlLabels: false, useMaxWidth: false, curve: 'basis', padding: 18 },
    themeVariables: { fontSize: '30px', primaryColor: dark ? '#13243a' : '#ffffff', primaryTextColor: v('--ink'), primaryBorderColor: v('--accent'), lineColor: v('--accent'), secondaryColor: dark ? '#1a2d45' : '#f1f5f9', tertiaryColor: dark ? '#0f1d30' : '#fefce8', textColor: v('--ink'), edgeLabelBackground: dark ? '#0b1626' : '#ffffff' } });
  for (const sl of D.slides) for (const e of sl.page.elements) if (e.kind === 'diagram') {
    try { const { svg } = await mermaid.render('m' + e.key, e.src); sl.nodes.get(e.key).querySelector('.inner').innerHTML = svg; }
    catch (err) { sl.nodes.get(e.key).querySelector('.inner').textContent = 'Mermaid 解析失败：' + (err.message || err); D.errors = (D.errors || []).concat(`第 ${sl.page.index} 页 mermaid：${err.message || err}`); }
  }
}

function prepDiagram(e, n) {
  const svg = n.querySelector('svg'); if (!svg) return;
  const w = parseFloat(svg.getAttribute('width')) || svg.viewBox.baseVal.width, h = parseFloat(svg.getAttribute('height')) || svg.viewBox.baseVal.height;
  svg.removeAttribute('width'); svg.removeAttribute('height');
  svg.style.width = '100%'; svg.style.height = '100%'; svg.style.maxWidth = (w * 2) + 'px'; svg.style.maxHeight = '100%';
  const shapes = [...svg.querySelectorAll('path, line, polyline, polygon, rect, circle, ellipse')].filter((s) => !s.closest('marker') && !s.closest('defs'));
  e._shapes = shapes.map((s, k) => {
    let len = 0; try { len = s.getTotalLength(); } catch { len = 0; }
    const cs = getComputedStyle(s);
    const fillOp = cs.fillOpacity;
    if (len > 0) { s.style.strokeDasharray = `${len} ${len}`; s.style.strokeDashoffset = len; }
    return { s, len, k, fillOp, hasFill: cs.fill && cs.fill !== 'none' };
  });
  e._texts = [...svg.querySelectorAll('text, foreignObject')];
}

/** Line-level diff for code morph (LCS on line text). */
function codeDiff(o, n, pair) {
  const A = o._lines.map((l) => l.text), B = n._lines.map((l) => l.text);
  const L = Array.from({ length: A.length + 1 }, () => new Array(B.length + 1).fill(0));
  for (let i = A.length - 1; i >= 0; i--) for (let j = B.length - 1; j >= 0; j--) L[i][j] = A[i] === B[j] ? L[i + 1][j + 1] + 1 : Math.max(L[i + 1][j], L[i][j + 1]);
  const map = new Map(); let i = 0, j = 0;
  while (i < A.length && j < B.length) { if (A[i] === B[j]) { map.set(j, i); i++; j++; } else if (L[i + 1][j] >= L[i][j + 1]) i++; else j++; }
  const usedOld = new Set(map.values());
  // ghosts: removed old lines placed (absolutely) inside the new block at their old offsets
  const host = pair.nn;
  const ghosts = o._lines.map((l, k) => ({ l, k })).filter(({ k }) => !usedOld.has(k)).map(({ l }) => {
    const g = l.node.cloneNode(true); g.classList.add('ghost'); g.style.top = (l.y - n._rect.y) + 'px'; host.appendChild(g); g.style.opacity = 0; return g;
  });
  return { map, ghosts, dy: n._lines.map((l, k) => (map.has(k) ? o._lines[map.get(k)].y - l.y : null)) };
}

// ---------------------------------------------------------------- per-frame state
function setT(n, tr, op) { n.style.transform = tr || ''; n.style.opacity = op; }

function applyElement(sl, e, t, pageT0) {
  const n = sl.nodes.get(e.key);
  const raw = e.dur > 0 ? (t - e.t) / e.dur : t >= e.t ? 1 : 0;
  let q = clamp(raw);
  let op = t >= e.t ? 1 : 0, tr = '', clip = '';
  if (t < e.t) op = 0;
  else switch (e.build) {
    case 'fade': op = E.out(q); break;
    case 'up': op = E.out(q); tr = `translateY(${(1 - E.out(q)) * D.u * 4}px)`; break;
    case 'left': op = E.out(q); tr = `translateX(${-(1 - E.out(q)) * D.u * 7}px)`; break;
    case 'right': op = E.out(q); tr = `translateX(${(1 - E.out(q)) * D.u * 7}px)`; break;
    case 'zoom': op = E.out(q); tr = `scale(${0.86 + 0.14 * E.out(q)})`; break;
    case 'pop': op = clamp(q * 3); tr = `scale(${0.6 + 0.4 * E.back(q)})`; break;
    case 'wipe': clip = q < 1 ? `inset(-5% ${(1 - E.inOut(q)) * 100}% -5% -5%)` : ''; break;
    case 'type': if (e._chars) { const k = Math.round(q * e._chars.length); e._chars.forEach((c, i) => (c.style.opacity = i < k ? 1 : 0)); } break;
    case 'draw': break;
    default: break;
  }
  if (e.tOut != null && t >= e.tOut) op *= 1 - clamp((t - e.tOut) / 0.4);
  if (e.kind === 'image') { const im = n.querySelector('img'); if (im) im.style.transform = kenBurns(sl, t); }
  setT(n, tr, op); n.style.clipPath = clip;
  for (const m of e._marks || []) { const pm = clamp((t - m.t) / m.dur); m.path.style.strokeDashoffset = m.len * (1 - E.inOut(pm)); m.path.style.opacity = op && pm > 0 ? 1 : 0; }
  for (const h of e._hl || []) h.node.style.setProperty('--p', E.out(clamp((t - h.t) / 0.45)));
  if (e._terms?.length && e.termT) e._terms.forEach((tn, k) => { const tt = e.termT[k]; const on = tt != null && t >= tt; tn.classList.toggle('lit', on); if (e.build === 'term') tn.style.opacity = tt == null ? 1 : clamp((t - tt) / 0.35); });
  if (e.kind === 'code' && e._lines && !e.morphFrom) {
    const step = Math.min(0.18, 1.2 / Math.max(1, e._lines.length));
    e._lines.forEach((l, k) => { const lq = clamp((t - e.t - k * step) / 0.3); l.node.style.opacity = e.build === 'none' ? 1 : lq; l.node.style.transform = `translateX(${(1 - E.out(lq)) * D.u * 2}px)`; });
  }
  if (e.kind === 'diagram' && e._shapes) {
    const N = e._shapes.length || 1;
    for (const sh of e._shapes) {
      const a = (sh.k / N) * 0.72, pq = clamp((q - a) / 0.28);
      if (sh.len > 0) sh.s.style.strokeDashoffset = sh.len * (1 - pq);
      sh.s.style.fillOpacity = sh.hasFill ? (pq >= 1 ? 1 : pq * 0.6) * (+sh.fillOp || 1) : '';
    }
    e._texts.forEach((tx, k) => { tx.style.opacity = clamp((q - 0.35 - (0.5 * k) / Math.max(1, e._texts.length)) / 0.15); });
  }
  if (e.kind === 'chart' && e._items) {
    const items = e.chart.items;
    const line = n.querySelector('.cl');
    let reach = 0;
    e._items.forEach((g, i) => {
      const iq = E.out(clamp((t - items[i].t) / 0.8));
      const bar = g.querySelector('.cb'); if (bar) bar.style.transform = `scaleY(${iq})`;
      const val = g.querySelector('.cv'); if (val) { val.style.opacity = clamp(iq * 2); const v = +val.dataset.v * iq; val.firstChild.data = fmt(v) + (e.chart.unit || ''); }
      if (!bar) { g.style.opacity = clamp(iq * 2); if (iq > 0) reach = i + iq; }
    });
    if (line) { const len = line.getTotalLength(); const n2 = items.length; line.style.strokeDasharray = `${len} ${len}`; line.style.strokeDashoffset = n2 > 1 ? len * (1 - clamp((reach - 1) / (n2 - 1))) : 0; }
  }
}

function kenBurns(sl, t) {
  const p = sl.page, k = clamp((t - p.start) / Math.max(0.1, p.end - p.start));
  const dir = [[1, 0], [-1, 0], [0, 1], [0, -1]][sl.index % 4];
  return `scale(${1.03 + 0.07 * k}) translate(${dir[0] * k * 1.2}%, ${dir[1] * k * 1.2}%)`;
}

function applySlide(sl, t) {
  const p = sl.page;
  for (const e of p.elements) applyElement(sl, e, t, p.start);
  if (sl.media) { const im = sl.media.querySelector('img'); if (im) im.style.transform = kenBurns(sl, t); }
  if (sl.bg && sl.page.kenburns !== false) { const im = sl.bg.querySelector('img'); if (im) im.style.transform = kenBurns(sl, t); }
  for (const sp of sl.spots) { const [a, b] = sp.e.spotT; const o = Math.min(clamp((t - a) / 0.3), clamp((b - t) / 0.3)); sp.d.style.opacity = o; }
  sl.marks.style.opacity = 1;
}

function resetSlide(sl) { sl.s.style.cssText = 'display:block'; sl.s.querySelector('.paper').style.opacity = 1; if (sl.bg) sl.bg.style.opacity = 1; for (const n of sl.nodes.values()) n.style.visibility = ''; }

function pageAt(t) { let i = 0; while (i + 1 < D.pages.length && D.pages[i + 1].start <= t) i++; return i; }

function frameInfo(t) {
  const i = pageAt(t), p = D.pages[i], tr = p.transition;
  if (i > 0 && tr && t < p.start + tr.dur) {
    const k = clamp((t - p.start) / tr.dur);
    return { i, prev: i - 1, k, type: tr.type, huashu: tr.type.startsWith('huashu:') && !!D.huashu ? tr.type.slice(7) : null };
  }
  return { i, prev: null, k: 1, type: null, huashu: null };
}

function render(t, opts = {}) {
  const f = frameInfo(t);
  for (const sl of D.slides) sl.s.style.display = 'none';
  const cur = D.slides[f.i];
  let only = opts.only;
  if (only === 'prev' && f.prev == null) only = 'cur';
  if (only === 'prev') { const pv = D.slides[f.prev]; resetSlide(pv); applySlide(pv, pv.page.end - 1e-3); }
  else if (only === 'cur' || f.prev == null || opts.noTransition) { resetSlide(cur); applySlide(cur, t); }
  else {
    const pv = D.slides[f.prev], k = f.k, e = E.inOut(k);
    resetSlide(cur); resetSlide(pv);
    applySlide(cur, t); applySlide(pv, pv.page.end - 1e-3);
    cur.s.style.zIndex = 2; pv.s.style.zIndex = 1;
    const type = f.huashu ? 'fade' : f.type;
    if (type === 'morph') morph(pv, cur, e, k);
    else if (type === 'slide') { pv.s.style.transform = `translateX(${-e * 100}%)`; cur.s.style.transform = `translateX(${(1 - e) * 100}%)`; }
    else if (type === 'zoom') { cur.s.style.opacity = e; cur.s.style.transform = `scale(${1.12 - 0.12 * e})`; pv.s.style.transform = `scale(${1 + 0.06 * e})`; }
    else if (type === 'up') { pv.s.style.transform = `translateY(${-e * 100}%)`; cur.s.style.transform = `translateY(${(1 - e) * 100}%)`; }
    else cur.s.style.opacity = e;
  }
  subtitles(t, opts);
  if (D.progress) D.progress.style.width = (100 * clamp(t / D.deck.duration)) + '%';
}

function morph(pv, cur, e, k) {
  // previous slide sits on top with a transparent background; its unmatched elements fade out quickly,
  // matched pairs crossfade while travelling between their two rects (FLIP).
  pv.s.style.zIndex = 3; pv.s.style.background = 'transparent'; pv.s.querySelector('.paper').style.opacity = 0; if (pv.bg) pv.bg.style.opacity = 1 - e;
  pv.marks.style.opacity = clamp(1 - k * 2);
  for (const o of pv.page.elements) if (!cur.matchedOld.has(o.key)) { const n = pv.nodes.get(o.key); n.style.opacity = (+n.style.opacity || 0) * clamp(1 - k * 1.8); }
  for (const pr of cur.pairs) {
    const a = pr.o._rect, b = pr.n._rect;
    const dx = (a.x + a.w / 2) - (b.x + b.w / 2), dy = (a.y + a.h / 2) - (b.y + b.h / 2);
    const texty = TEXTY.has(pr.n.kind);
    const sxA = texty ? pr.o._font / pr.n._font : a.w / b.w, syA = texty ? sxA : a.h / b.h;
    if (pr.code) {
      pr.on.style.opacity = 0;
      pr.nn.style.transform = `translate(${dx * (1 - e)}px, ${dy * (1 - e)}px)`; pr.nn.style.opacity = 1;
      pr.n._lines.forEach((l, j) => { const d = pr.code.dy[j]; if (d == null) { l.node.style.opacity = clamp((k - 0.45) / 0.5); l.node.style.transform = ''; } else { l.node.style.opacity = 1; l.node.style.transform = `translateY(${(d - dy) * (1 - e)}px)`; } });
      pr.code.ghosts.forEach((g) => (g.style.opacity = clamp(1 - k * 2.2)));
      continue;
    }
    pr.nn.style.transformOrigin = '50% 50%'; pr.on.style.transformOrigin = '50% 50%';
    pr.nn.style.transform = `translate(${dx * (1 - e)}px, ${dy * (1 - e)}px) scale(${lerp(sxA, 1, e)}, ${lerp(syA, 1, e)})`;
    const same = texty ? pr.o.text === pr.n.text : pr.n.kind === 'formula' ? pr.o.tex === pr.n.tex : true;
    pr.nn.style.opacity = same ? clamp(e * 1.4 - 0.2) : clamp(e * 2.2 - 1.0);
    pr.on.style.transform = `translate(${-dx * e}px, ${-dy * e}px) scale(${lerp(1, 1 / sxA, e)}, ${lerp(1, 1 / syA, e)})`;
    pr.on.style.opacity = same ? clamp(1 - e * 1.4) : clamp(1 - e * 2.2);
  }
}

// ---------------------------------------------------------------- subtitles (karaoke)
function subtitles(t, opts) {
  const mode = D.deck.subtitles;
  if (mode === 'none' || opts.noSubs) { D.subs.style.display = 'none'; return; }
  const cues = D.deck.cues;
  let idx = -1;
  for (let i = 0; i < cues.length; i++) if (t >= cues[i].start - 0.08 && t <= cues[i].end + 0.22) { idx = i; }
  if (idx < 0) { D.subs.style.display = 'none'; D.cueIdx = -1; return; }
  D.subs.style.display = 'block';
  const c = cues[idx];
  if (idx !== D.cueIdx) {
    D.subs.innerHTML = '';
    const line = $('span', 'line', D.subs);
    c._spans = [...c.text].map((ch) => { const s = $('span', '', line); s.textContent = ch; return s; });
    D.cueIdx = idx;
  }
  if (mode === 'karaoke') c._spans.forEach((s, i) => s.classList.toggle('on', c.charTimes[i] <= t));
}

// ---------------------------------------------------------------- huashu composite (two snapshots → one frame)
async function composite(name, a64, b64, p, t) {
  const load = async (b64x) => createImageBitmap(await (await fetch('data:image/jpeg;base64,' + b64x)).blob());
  const [A, B] = await Promise.all([load(a64), load(b64)]);
  const mk = (img) => { const c = document.createElement('canvas'); c.width = D.W; c.height = D.H; c.getContext('2d').drawImage(img, 0, 0, D.W, D.H); return c; };
  const out = D._out || (D._out = Object.assign(document.createElement('canvas'), { width: D.W, height: D.H }));
  const g = out.getContext('2d'); g.setTransform(1, 0, 0, 1, 0, 0); g.clearRect(0, 0, D.W, D.H);
  D.huashu.huashuTransition(name, g, mk(A), mk(B), p, { id: 'p' + pageAt(t), t, lt: p });
  return out.toDataURL('image/jpeg', 0.92).split(',')[1];
}

// ---------------------------------------------------------------- layout QA (explainroo idea, own rules)
function qa() {
  const issues = [];
  const minPx = Math.min(D.W, D.H) * 0.026;
  const subsTop = (() => { if (D.deck.subtitles === 'none') return D.H; const cs = getComputedStyle(D.subs); const fs = parseFloat(cs.fontSize); return D.H - parseFloat(cs.bottom) - fs * 1.75 * 2; })();
  for (const sl of D.slides) {
    for (const s of D.slides) s.s.style.display = 'none';
    resetSlide(sl); applySlide(sl, sl.page.end - 1e-3);
    const P = sl.page.index;
    const content = sl.content;
    if (content.scrollHeight > content.clientHeight + 4) issues.push({ page: P, type: 'overflow', msg: `第 ${P} 页内容超出版面 ${Math.round(content.scrollHeight - content.clientHeight)}px（要点太多或字太长：拆页或删减）` });
    const boxes = [];
    for (const e of sl.page.elements) {
      const n = sl.nodes.get(e.key); const r = relRect(n);
      const label = (e.text || e.kind).slice(0, 14);
      if (r.x < -2 || r.y < -2 || r.x + r.w > D.W + 2 || r.y + r.h > D.H + 2) issues.push({ page: P, key: e.key, type: 'offstage', msg: `第 ${P} 页「${label}」超出画面` });
      const tol = Math.max(4, parseFloat(getComputedStyle(n).fontSize) * 0.35);
      if (n.scrollWidth > n.clientWidth + tol || (e.kind !== 'diagram' && n.scrollHeight > n.clientHeight + tol)) issues.push({ page: P, key: e.key, type: 'clip', msg: `第 ${P} 页「${label}」内容被裁切（太宽/太长）` });
      if (r.y + r.h > subsTop + 4 && D.deck.cues.some((c) => c.page === P)) issues.push({ page: P, key: e.key, type: 'subtitle-zone', msg: `第 ${P} 页「${label}」压到字幕区` });
      if (TEXTY.has(e.kind) && parseFloat(getComputedStyle(n).fontSize) < minPx) issues.push({ page: P, key: e.key, type: 'small-text', msg: `第 ${P} 页「${label}」字号过小（<${Math.round(minPx)}px）` });
      if (e.kind === 'formula') { const k = n.querySelector('.katex'); if (k && k.getBoundingClientRect().width > n.getBoundingClientRect().width + 2) issues.push({ page: P, key: e.key, type: 'clip', msg: `第 ${P} 页公式太宽` }); }
      boxes.push({ e, r });
    }
    for (let a = 0; a < boxes.length; a++) for (let b = a + 1; b < boxes.length; b++) {
      const A = boxes[a].r, B = boxes[b].r;
      const ix = Math.max(0, Math.min(A.x + A.w, B.x + B.w) - Math.max(A.x, B.x)), iy = Math.max(0, Math.min(A.y + A.h, B.y + B.h) - Math.max(A.y, B.y));
      const small = Math.min(A.w * A.h, B.w * B.h) || 1;
      if ((ix * iy) / small > 0.06) issues.push({ page: P, type: 'overlap', msg: `第 ${P} 页「${(boxes[a].e.text || boxes[a].e.kind).slice(0, 10)}」与「${(boxes[b].e.text || boxes[b].e.kind).slice(0, 10)}」重叠` });
    }
    sl.s.style.display = 'none';
  }
  return { issues, errors: D.errors || [] };
}

window.__setup = setup;
window.__render = render;
window.__frameInfo = frameInfo;
window.__composite = composite;
window.__qa = qa;
window.__ready = true;
