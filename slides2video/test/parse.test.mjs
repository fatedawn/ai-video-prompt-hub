import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { parseDeck, splitAttrs, guessLayout, plainText } from '../lib/parse.mjs';

const SKY = fs.readFileSync(new URL('../examples/sky/deck.md', import.meta.url), 'utf8');

test('frontmatter + page frontmatter + say lines', () => {
  const d = parseDeck(SKY);
  assert.equal(d.meta.title, '为什么天空是蓝色的？');
  assert.equal(d.meta.aspect, '9:16');
  assert.equal(d.meta.theme, 'tianji');
  assert.equal(d.pages.length, 6);
  assert.equal(d.pages[0].layout, 'image-full');
  assert.equal(d.pages[0].meta.image, '01-sky.jpg');
  assert.equal(d.pages[1].say.length, 2);
  assert.equal(d.pages[2].layout, 'formula');
  assert.equal(d.pages[2].meta.transition, 'morph');
  assert.deepEqual(d.warnings, []);
});

test('element kinds and attributes', () => {
  const d = parseDeck(SKY);
  const p2 = d.pages[1];
  assert.deepEqual(p2.elements.map((e) => e.kind), ['title', 'bullet', 'bullet']);
  assert.equal(p2.elements[0].id, 'q');
  assert.equal(p2.elements[2].mark, 'underline:波长');
  assert.equal(p2.elements[2].build, 'pop');
  const f = d.pages[2].elements.find((e) => e.kind === 'formula');
  assert.match(f.tex, /\\term\{\\lambda\^\{4\}\}/);
  assert.deepEqual(f.terms, ['四次方']);
  const ch = d.pages[3].elements.find((e) => e.kind === 'chart');
  assert.equal(ch.chart.bars.length, 3);
  assert.equal(ch.chart.bars[2].at, '蓝光');
});

test('splitAttrs keeps text without attrs, numbers stay strings except at/duration/out', () => {
  assert.deepEqual(splitAttrs('普通文字'), ['普通文字', {}]);
  const [t, a] = splitAttrs('文字 {at: 1.5, id: 7, build: up}');
  assert.equal(t, '文字');
  assert.equal(a.at, 1.5);
  assert.equal(a.id, '7');
  assert.throws(() => splitAttrs('x {at: [}'), /YAML/);
});

test('two-cols split, code/mermaid blocks, bad values warn', () => {
  const d = parseDeck('---\ntheme: nope\n---\n# A\n- a\n::right::\n- b {build: wobble}\n\n---\n\n```mermaid\nflowchart LR\n A-->B\n```\n\n```js\nlet x = 1\n```\n');
  assert.equal(d.pages[0].layout, 'two-cols');
  assert.equal(d.pages[0].elements[2].col, 'right');
  assert.equal(d.meta.theme, 'tianji');
  assert.ok(d.warnings.some((w) => w.includes('theme')));
  assert.ok(d.warnings.some((w) => w.includes('wobble')));
  assert.deepEqual(d.pages[1].elements.map((e) => e.kind), ['diagram', 'code']);
});

test('guessLayout and plainText', () => {
  assert.equal(guessLayout({ index: 1, meta: {}, elements: [{ kind: 'title' }] }, 3), 'cover');
  assert.equal(guessLayout({ index: 2, meta: {}, elements: [{ kind: 'title' }, { kind: 'chart' }] }, 3), 'chart');
  assert.equal(guessLayout({ index: 2, meta: { image: 'a.png' }, elements: [{ kind: 'title' }, { kind: 'bullet' }] }, 3), 'image-right');
  assert.equal(plainText('**粗** ==亮== $x$ `c`'), '粗 亮  c');
});
