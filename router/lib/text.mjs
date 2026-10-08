// Tiny text helpers (original code, Apache-2.0).
export const norm = (s) => String(s || '').toLowerCase().replace(/\s+/g, ' ').trim();

/** CJK bigrams + latin words, used for cheap topic matching without any NLP dependency. */
export function grams(s) {
  const t = norm(s);
  const out = new Set();
  for (const w of t.match(/[a-z0-9][a-z0-9+#.\-]{1,}/g) || []) out.add(w);
  const cjk = t.replace(/[^\u3400-\u9fff]+/g, ' ').split(' ').filter(Boolean);
  for (const run of cjk) {
    if (run.length === 1) out.add(run);
    for (let i = 0; i + 1 < run.length; i++) out.add(run.slice(i, i + 2));
  }
  return out;
}

export function overlap(a, b) {
  let n = 0;
  for (const g of a) if (b.has(g)) n++;
  return n;
}

export const slug = (s) => (norm(s).replace(/[^\u3400-\u9fffa-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 12).replace(/-+$/, '') || 'video');

/** Minimal RFC4180 CSV parser (quotes, escaped quotes, newlines in fields). */
export function parseCSV(text) {
  const rows = [];
  let row = [], f = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"') { if (text[i + 1] === '"') { f += '"'; i++; } else q = false; }
      else f += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(f); f = ''; }
    else if (c === '\n') { row.push(f.replace(/\r$/, '')); rows.push(row); row = []; f = ''; }
    else f += c;
  }
  if (f || row.length) { row.push(f); rows.push(row); }
  const head = rows.shift().map((h) => h.replace(/^\ufeff/, ''));
  return rows.filter((r) => r.length > 1).map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ''])));
}
