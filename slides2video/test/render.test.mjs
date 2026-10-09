// Layout QA + tiny render smoke (needs Chrome via animator's playwright-core and ffmpeg; skipped otherwise).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { parseDeck } from '../lib/parse.mjs';
import { buildTimeline } from '../lib/timeline.mjs';
import { compileRuntime } from '../lib/compile.mjs';

let deps = null;
try { const r = await import('../lib/render.mjs'); const { findChrome } = await r.loadBrowserDeps(); if (findChrome()) deps = r; } catch { deps = null; }
const ffmpeg = spawnSync('ffmpeg', ['-version']).status === 0;
const skip = !deps || !ffmpeg ? '需要 Chrome（animator 依赖）和 ffmpeg' : false;
const HERE = path.dirname(new URL(import.meta.url).pathname);

async function compile(src, opts = {}) {
  const deck = parseDeck(src);
  const tl = buildTimeline(deck, null);
  return { tl, ...(await compileRuntime(tl, { imagesDir: opts.images || null, baseDir: HERE })) };
}

test('layout QA: sample decks pass, an overfull page is caught', { skip }, async () => {
  for (const f of ['../examples/sky/deck.md', '../examples/features/deck.md', '../examples/starter/deck.md']) {
    const file = path.join(HERE, f);
    const { deck, assets } = await compile(fs.readFileSync(file, 'utf8'), { images: path.join(path.dirname(file), 'images') });
    const qa = await deps.runQA(deck, assets);
    assert.deepEqual(qa.errors, [], f);
    assert.deepEqual(qa.issues, [], f + ' ' + JSON.stringify(qa.issues));
  }
  const many = Array.from({ length: 14 }, (_, i) => `- 第 ${i + 1} 条很长很长的要点文字，会把这一页挤爆`).join('\n');
  const { deck, assets } = await compile(`# 太挤了\n\n${many}\n\n> say: 太挤了。\n`);
  const qa = await deps.runQA(deck, assets);
  assert.ok(qa.issues.some((x) => x.type === 'overflow' || x.type === 'subtitle-zone'), JSON.stringify(qa.issues));
});

test('render smoke: 1:1 deck with formula, chart, mermaid, code morph → mp4', { skip, timeout: 180000 }, async () => {
  const src = `---\naspect: "1:1"\ntheme: paper\nfps: 12\n---\n# 小测试 {id: t}\n\n$$ a^2+b^2=\\term{c^2} $$ {terms: [c]}\n\n> say: 勾股定理 c 方。\n\n---\nlayout: chart\ntransition: morph\n---\n# 小测试 {id: t}\n\n\`\`\`chart\ntype: line\npoints: [1, 3, 2]\n\`\`\`\n\n> say: 一条折线。\n\n---\nlayout: diagram\ntransition: zoom\n---\n\n\`\`\`mermaid\nflowchart LR\n  A --> B\n\`\`\`\n\n> say: 一张图。\n`;
  const { deck, assets, tl } = await compile(src);
  const out = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 's2v-smoke-')), 'smoke.mp4');
  const r = await deps.renderVideo(deck, assets, out, { workers: 2, progress: false, crf: 30 });
  assert.equal(r.frames, Math.round(tl.duration * 12));
  const probe = spawnSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', out], { encoding: 'utf8' });
  assert.match(probe.stdout.trim(), /^1080,1080/);
  // frames differ over time (something animates)
  const files = await deps.renderStills(deck, assets, [0.05, 2.5], path.dirname(out));
  assert.notEqual(fs.readFileSync(files[0]).length, fs.readFileSync(files[1]).length);
  fs.rmSync(path.dirname(out), { recursive: true, force: true });
});
