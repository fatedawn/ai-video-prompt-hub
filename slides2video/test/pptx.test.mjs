import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parsePptx, parseNotes, pptxToDeck } from '../lib/pptx.mjs';
import { parseDeck } from '../lib/parse.mjs';

const FIX = new URL('./fixtures/mini.pptx', import.meta.url).pathname;

test('pptx: slides, notes, alt-text handles, animation order', () => {
  const { slides, size } = parsePptx(fs.readFileSync(FIX));
  assert.equal(slides.length, 2);
  assert.ok(size.cx > size.cy);
  assert.equal(slides[0].shapes.find((s) => s.kind === 'title').paras[0].text, '为什么天空是蓝色的');
  const pic = slides[1].shapes.find((s) => s.kind === 'image');
  assert.match(pic.alt, /\[sky-pic\]/);
  assert.deepEqual(slides[1].order, [pic.id]);
  assert.match(slides[1].notes, /## \[law\]/);
});

test('notes protocol (pptx2video-compatible): handles + Spotlight', () => {
  const n = parseNotes('## [law] 散射定律\n散射强度和波长的四次方成反比。\n## [pic] 看图\n所以天空是蓝色的。[[Spotlight] 看这片蓝天。]');
  assert.deepEqual(n.say, ['散射强度和波长的四次方成反比。', '所以天空是蓝色的。', '看这片蓝天。']);
  assert.deepEqual(n.blocks.map((b) => [b.handle, b.firstWords, b.spotlight]), [['law', '散射强度', false], ['pic', '所以天空', true]]);
});

test('rebuild mode → valid deck.md with words bound to handles', () => {
  const out = fs.mkdtempSync(path.join(os.tmpdir(), 's2v-imp-'));
  const r = pptxToDeck(FIX, out, { mode: 'rebuild' });
  const d = parseDeck(fs.readFileSync(r.deckPath, 'utf8'));
  assert.deepEqual(d.warnings, []);
  assert.equal(d.pages.length, 2);
  assert.equal(d.meta.aspect, '16:9');
  const img = d.pages[1].elements.find((e) => e.kind === 'image');
  assert.equal(img.at, '所以天空');
  assert.equal(img.mark, 'box');
  assert.ok(fs.existsSync(path.join(out, 'images', img.src)));
  fs.rmSync(out, { recursive: true, force: true });
});
