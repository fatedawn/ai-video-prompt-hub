import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { indexOf, orderImages, parseScriptLine, parseScript, buildStoryboard, normalizeStoryboard, toVideogen, speechSeconds } from '../lib/storyboard.mjs';
import { findRecipe, resolveTag, guessRecipe, recipes, PRESETS } from '../lib/recipes.mjs';
import { resolveShot, pickTransition } from '../lib/plan.mjs';
import { lint } from '../lib/lint.mjs';

test('indexOf: filename numbers like route C', () => {
  assert.equal(indexOf('S01_shot03.png'), 1003);
  assert.equal(indexOf('S2-shot10.jpg'), 2010);
  assert.equal(indexOf('镜头7.png'), 7);
  assert.equal(indexOf('shot_04.webp'), 4);
  assert.equal(indexOf('03_竹林.png'), 3);
  assert.equal(indexOf('12.jpg'), 12);
  assert.equal(indexOf('竹林 (5).png'), 5);
  assert.equal(indexOf('ChatGPT Image 2026年10月9日 10_31_22.png'), null);
  assert.equal(indexOf('cover.png'), null);
});

test('orderImages: by number, else mtime', () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 's2v-t-'));
  for (const f of ['10_b.png', '2_a.png', '1.jpg', 'notes.txt']) fs.writeFileSync(path.join(d, f), '');
  assert.deepEqual(orderImages(d), { files: ['1.jpg', '2_a.png', '10_b.png'], order: 'number' });
  fs.writeFileSync(path.join(d, 'cover.png'), '');
  const mt = { '1.jpg': 4, '2_a.png': 3, '10_b.png': 2, 'cover.png': 1 };
  assert.deepEqual(orderImages(d, { mtime: (f) => mt[f] }).files, ['cover.png', '10_b.png', '2_a.png', '1.jpg']);
  assert.equal(orderImages(d, { order: 'name', mtime: (f) => mt[f] }).order, 'name');
});

test('parseScriptLine: index, tags, duration, speaker, empty shot', () => {
  assert.deepEqual(parseScriptLine('镜头3：【推进】(5s) 天机：只有图片也能出片'), { index: 3, tag: '推进', duration: 5, speaker: '天机', text: '只有图片也能出片' });
  assert.deepEqual(parseScriptLine('2. 【仙侠云海环绕】云海翻涌（4秒）'), { index: 2, tag: '仙侠云海环绕', duration: 4, speaker: null, text: '云海翻涌' });
  assert.equal(parseScriptLine('旁白：开场').speaker, null);
  assert.equal(parseScriptLine('旁白：开场').text, '开场');
  assert.equal(parseScriptLine('（空镜）').text, '');
  assert.equal(parseScript('# 注释\n\n一\n二').length, 2);
  assert.ok(speechSeconds('只有图片也能出片。') > 1.5 && speechSeconds('只有图片也能出片。') < 3);
});

test('recipes: 20+ recipes, valid presets, Chinese aliases', () => {
  const rs = recipes();
  assert.ok(rs.length >= 20);
  for (const r of rs) {
    assert.ok(PRESETS.includes(r.motion.preset), `${r.id} preset ${r.motion.preset}`);
    assert.ok(r.image_prompt.includes('{主体}') || r.image_prompt.length > 10, r.id);
    assert.ok(r.i2v_prompt && r.name && r.duration > 0, r.id);
  }
  assert.equal(findRecipe('晨雾竹林推进').id, 'bamboo_mist_push');
  assert.equal(findRecipe('xianxia_sea_orbit').name, '仙侠云海环绕');
  assert.equal(resolveTag('推进').preset, 'push_in');
  assert.equal(resolveTag('城市夜景延时感').recipe, 'city_night_timelapse');
  assert.ok(guessRecipe('夜晚的城市霓虹'));
});

test('buildStoryboard: lines by index, recipe tags, auto durations', () => {
  const imgs = ['/p/01.png', '/p/02.png', '/p/03.png'];
  const sb = buildStoryboard({ images: imgs, baseDir: '/p', script: '1. 【晨雾竹林推进】第一句\n3. （6秒）第三句\n3. 天机：再一句' });
  assert.equal(sb.shots.length, 3);
  assert.equal(sb.shots[0].recipe, 'bamboo_mist_push');
  assert.equal(sb.shots[0].image, '01.png');
  assert.equal(sb.shots[1].lines.length, 0);
  assert.ok(sb.shots[1].recipe || sb.shots[1].motion, 'empty shot still gets motion');
  assert.equal(sb.shots[2].duration, 6);
  assert.equal(sb.shots[2].duration_auto, undefined);
  assert.equal(sb.shots[0].duration_auto, true);
  assert.deepEqual(sb.shots[2].lines[1], { speaker: '天机', text: '再一句' });
  // no script → one silent shot per image, varied motion
  const sb2 = buildStoryboard({ images: imgs, baseDir: '/p' });
  assert.equal(new Set(sb2.shots.map((s) => s.recipe || s.motion.preset)).size, 3);
  assert.throws(() => buildStoryboard({ images: [] }));
});

test('normalizeStoryboard + toVideogen + resolveShot', () => {
  const sb = normalizeStoryboard({ shots: [{ line: '你好', motion: '环绕' }, { image: 'x.png', recipe: '仙侠云海环绕', transition: 'huashu:inkBloom' }, { image: 'y.png', duration: 3 }] }, { images: ['/p/01.png'], baseDir: '/p' });
  assert.equal(sb.shots[0].image, '01.png');
  assert.equal(sb.shots[0].motion.preset, 'orbit');
  assert.equal(sb.shots[1].recipe, 'xianxia_sea_orbit');
  const vg = toVideogen(sb);
  assert.equal(vg.shots[0].first_frame.path, '01.png');
  assert.equal(vg.shots[0].lines[0].text, '你好');
  const p = resolveShot(sb.shots[1], sb, 1, { baseDir: '/p' });
  assert.equal(p.transition, 'huashu:inkBloom');
  assert.equal(p.motion.preset, 'orbit');
  assert.equal(p.image, path.resolve('/p/x.png'));
  assert.ok(p.renderSeconds > p.duration);
  assert.equal(resolveShot(sb.shots[1], sb, 1, { noHuashu: true }).transition, 'fade');
  assert.equal(resolveShot(sb.shots[2], sb, 2).transition, null, 'last shot has no outgoing transition');
  assert.equal(pickTransition({}, null, { transition: 'fadeblack' }, 0), 'fadeblack');
  assert.notEqual(pickTransition({}, null, { transition: 'auto' }, 1), 'dissolve');
});

test('lint flags slideshow patterns', () => {
  const sb = { shots: Array.from({ length: 4 }, (_, i) => ({ id: `s${i}`, duration: 9 })) };
  const plans = sb.shots.map(() => ({ motion: { preset: 'static', amount: 0 }, overlays: [], fx: [], transition: null, depth: 'gradient' }));
  assert.ok(lint(sb, plans).length >= 2);
});
