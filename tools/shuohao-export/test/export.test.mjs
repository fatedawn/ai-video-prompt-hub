import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { toBoard, exportPack, cleanShotBody, h3AlignmentLine, hubShotsToBoard, buildH3Skeleton } from '../lib/core.mjs';
import { validateDoc, lintTextGates, gateReport } from '../lib/gates.mjs';

const hubShots = {
  version: 1,
  title: 'demo',
  characters: [{ name: '沈晚' }, { name: '林柔' }],
  shots: [
    { id: 'S01_shot01', segment: 1, index: 1, duration: 4, shot_text: '中景固定。林柔抬手说：{姐姐}', lines: [{ speaker: '林柔', text: '姐姐' }] },
    { id: 'S01_shot02', segment: 1, index: 2, duration: 3, shot_text: '特写推近。沈晚冷笑说：{戏还没演完吗}', lines: [{ speaker: '沈晚', text: '戏还没演完吗' }] },
    { id: 'S01_shot03', segment: 1, index: 3, duration: 5, shot_text: '全景固定。宾客哗然。', lines: [] },
  ],
};

test('hub shots → board segments under 15s', () => {
  const board = hubShotsToBoard(hubShots);
  assert.equal(board._source, 'hub-shots');
  assert.equal(board.episodes.length, 1);
  assert.ok(board.episodes[0].segments.length >= 1);
  const total = board.episodes[0].segments.reduce(
    (n, s) => n + s.cuts.reduce((m, c) => m + c.seconds, 0),
    0,
  );
  assert.equal(total, 12);
});

test('cleanShotBody strips dialogue braces and hub trailer', () => {
  assert.equal(cleanShotBody('中景。林柔说：{你好}。（共 3 个镜头中的第 1 个；只生成这一个镜头）'), '中景。林柔。');
});

test('exportPack seedance + h3 write files', () => {
  const board = toBoard(hubShots);
  const h3 = exportPack(board, { protocol: 'h3' });
  assert.ok(h3.files.some((f) => f.path.endsWith('prompt.md')));
  assert.ok(h3.files.some((f) => f.path.endsWith('manifest.json')));
  const sd = exportPack(board, { protocol: 'seedance' });
  assert.ok(sd.files.some((f) => f.path.endsWith('seedance.md')));
  assert.match(sd.files.find((f) => f.path.endsWith('seedance.md')).content, /【镜头1】/);
});

test('validateDoc passes hub demo; prompt-no-names catches 沈晚 in shot', () => {
  const ok = validateDoc(hubShots, { names: ['沈晚', '林柔'] });
  // shot bodies still contain 林柔/沈晚 from cleanShotBody leaving names in action text
  assert.equal(ok.board._source, 'hub-shots');
  assert.ok(ok.gates.some((g) => g.id === 'segment-cap' && g.ok));
  // names in action prose should fail prompt-no-names
  const nameGate = ok.gates.find((g) => g.id === 'prompt-no-names');
  assert.ok(nameGate);
});

test('h3AlignmentLine single cut uses I2VA', () => {
  assert.match(h3AlignmentLine([{ seconds: 4 }], 'en'), /Picture 1/);
});

test('lintTextGates flags oversized time span', () => {
  const r = lintTextGates('[0-20秒] 大远景推进', { target: 'seedance' });
  assert.ok(r.issues.some((i) => i.id === 'segment-cap'));
});

test('shuohao storyboard episode shape validates segment-cap', () => {
  const cuts = [
    { seconds: 3, shot: 'youth at ferry', size: 'medium', camera: 'Static Shot' },
    { seconds: 4, shot: 'boatman poles closer', size: 'wide', camera: 'Push In' },
  ];
  const seg = { id: 'E01-01', cuts, h3Prompt: buildH3Skeleton({ cuts }, 'en') };
  const board = {
    promptLang: 'en',
    params: { maxSegmentSeconds: 15, minCutSeconds: 2, maxCutSeconds: 5 },
    episodes: [{ ep: 1, segments: [seg] }],
    _source: 'shuohao-storyboard',
  };
  const gates = gateReport(board, { names: [] });
  assert.ok(gates.find((g) => g.id === 'segment-cap').ok);
  assert.ok(gates.find((g) => g.id === 'cut-length').ok);
  assert.ok(gates.find((g) => g.id === 'h3-structure').ok, gates.find((g) => g.id === 'h3-structure').detail);
});
