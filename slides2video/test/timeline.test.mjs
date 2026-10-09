import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { parseDeck } from '../lib/parse.mjs';
import { buildTimeline, transitionOf, charTimes, evenWords, longestStatic, T } from '../lib/timeline.mjs';
import { lintDeck } from '../lib/lint.mjs';
import { pagePrompts, promptsMarkdown } from '../lib/prompts.mjs';
import { toSRT } from '../lib/audio.mjs';

const SKY = parseDeck(fs.readFileSync(new URL('../examples/sky/deck.md', import.meta.url), 'utf8'));

test('pages are contiguous and cover all narration', () => {
  const tl = buildTimeline(SKY, null);
  assert.equal(tl.pages[0].start, 0);
  for (let i = 1; i < tl.pages.length; i++) assert.equal(tl.pages[i].start, tl.pages[i - 1].end);
  assert.equal(tl.cues.length, 7);
  for (const p of tl.pages) for (const c of p.cues) { assert.ok(c.start >= p.start && c.end <= p.end); assert.equal(c.charTimes.length, [...c.text].length); }
  assert.ok(tl.duration > 20 && tl.duration < 60);
});

test('word-timed reveals follow the narration (with real word timings)', () => {
  // fake TTS: every line 2 s, words = single chars evenly spread
  const lines = SKY.pages.flatMap((p) => p.say.map((s) => ({ dur: 2, words: evenWords(s.text, 2) })));
  const tl = buildTimeline(SKY, lines);
  const p2 = tl.pages[1];
  const [title, b1, b2] = p2.elements;
  assert.ok(Math.abs(title.t - p2.start) < 1e-3);
  const c1 = p2.cues[0], c2 = p2.cues[1];
  const idx = [...c1.text].indexOf('七');
  assert.ok(Math.abs(b1.t - c1.charTimes[idx]) < 1e-3, 'at: 七种 → time of 七');
  assert.ok(b2.t >= c2.start && b2.t < c2.end);
  assert.equal(b2.marks[0].type, 'underline');
  assert.ok(b2.marks[0].t >= b2.t);
  // formula terms + chart items resolve on the page
  const f = tl.pages[2].elements.find((e) => e.kind === 'formula');
  assert.equal(f.termT.length, 1);
  assert.ok(f.termT[0] > tl.pages[2].start && f.termT[0] < tl.pages[2].end);
  const ch = tl.pages[3].elements.find((e) => e.kind === 'chart');
  const ts = ch.chart.items.map((i) => i.t);
  assert.ok(ts[0] < ts[1] && ts[1] < ts[2], 'bars rise in spoken order');
  // morph pairs by id
  assert.equal(tl.pages[2].elements[0].morphFrom, 'q');
  assert.equal(tl.pages[3].elements.find((e) => e.kind === 'formula').morphFrom, 'law');
});

test('time references: seconds, c2:word.end, after, page.end; unknown word throws', () => {
  const d = parseDeck('# T\n\n- a {at: 1.5}\n- b {at: "c2:世界.end"}\n- c {at: after+0.3}\n- d {at: page.end-1}\n\n> say: 你好\n> say: 你好世界\n');
  const tl = buildTimeline(d, [{ dur: 1 }, { dur: 2 }]);
  const p = tl.pages[0], [, a, b, c, dd] = p.elements;
  assert.equal(a.t, +(p.start + 1.5).toFixed(3));
  assert.ok(Math.abs(b.t - p.cues[1].end) < 0.01);
  assert.ok(Math.abs(c.t - (b.t + 0.3)) < 0.01);
  assert.ok(Math.abs(dd.t - (p.end - 1)) < 0.01);
  assert.throws(() => buildTimeline(parseDeck('# T\n- x {at: 不存在}\n\n> say: 你好\n'), null), /找不到/);
});

test('transitions and charTimes', () => {
  assert.equal(transitionOf('none'), null);
  assert.deepEqual(transitionOf('fade'), { type: 'fade', dur: T.transDefault });
  assert.deepEqual(transitionOf('morph@1.2'), { type: 'morph', dur: 1.2 });
  assert.equal(transitionOf('huashu:godRays').dur, 0.7);
  const ct = charTimes('你好，世界', [{ text: '你好', start: 0, end: 0.4 }, { text: '世界', start: 0.6, end: 1 }], 10, 11);
  assert.equal(ct.length, 5);
  assert.equal(ct[0], 10);
  for (let i = 1; i < ct.length; i++) assert.ok(ct[i] >= ct[i - 1]);
});

test('lint: sample is clean; crowded page + fast speech are flagged', () => {
  const tl = buildTimeline(SKY, null);
  assert.deepEqual(lintDeck(SKY, tl).filter((x) => x.level !== 'info'), []);
  assert.ok(longestStatic(tl).gap < 6);
  const bad = parseDeck('# 一个非常非常非常非常非常非常长的标题标题\n- 1\n- 2\n- 3\n- 4\n- 5\n\n> say: 快快快快快快快快快快快快快快快快快快快快\n');
  const tl2 = buildTimeline(bad, [{ dur: 1 }]);
  const msgs = lintDeck(bad, tl2).map((x) => x.msg).join('\n');
  assert.match(msgs, /要点 5 条/);
  assert.match(msgs, /标题/);
  assert.match(msgs, /语速/);
});

test('prompts: one Chinese prompt per image page, no text in images', () => {
  const list = pagePrompts(SKY);
  assert.deepEqual(list.map((x) => x.page), [1, 5]);
  assert.equal(list[0].file, '01-sky.jpg');
  assert.match(list[0].prompt, /竖版 9:16/);
  assert.match(list[0].prompt, /不要出现任何文字/);
  assert.match(promptsMarkdown(SKY, list), /第 5 页/);
});

test('SRT export', () => {
  const srt = toSRT([{ start: 0.5, end: 2.25, text: '你好' }, { start: 61, end: 62.001, text: '世界' }]);
  assert.match(srt, /^1\n00:00:00,500 --> 00:00:02,250\n你好\n/);
  assert.match(srt, /00:01:01,000 --> 00:01:02,001/);
});
