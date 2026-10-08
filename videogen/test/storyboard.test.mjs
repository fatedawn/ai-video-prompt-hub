import test from 'node:test';
import assert from 'node:assert/strict';
import { parseStoryboard, dialogue } from '../lib/storyboard.mjs';
import { fitPlan, shotTarget, buildAss } from '../lib/assemble.mjs';

const EX2 = `竖屏9:16，国产爽剧质感；保持无字幕。
将@图片1中穿黑色礼服的女人定义为「沈晚」，@图片2中穿白裙的女人定义为「林柔」。
镜头1：中景固定。林柔打翻花瓶，抬手指向沈晚，带着哭腔说：{姐姐，你怎么能推我}。
镜头2：切到沈晚近景。沈晚冷笑，把文件甩到林柔面前，冷声说：{戏还没演完吗}。
镜头3：文件特写。
[负面] 换脸、水印`;

test('镜头N storyboard → shots with ids, dialogue speakers, refs, negative', () => {
  const sb = parseStoryboard(EX2);
  assert.equal(sb.aspect, '9:16');
  assert.deepEqual(sb.shots.map((s) => s.id), ['S01_shot01', 'S01_shot02', 'S01_shot03']);
  assert.deepEqual(sb.shots[0].lines, [{ speaker: '林柔', text: '姐姐，你怎么能推我', tone: '哭腔' }]);
  assert.equal(sb.shots[1].lines[0].speaker, '沈晚');
  assert.equal(sb.shots[0].negative, '换脸、水印');
  assert.deepEqual(sb.shots[0].refs.map((r) => r.tag), ['@图片1', '@图片2']);
  assert.match(sb.shots[2].prompt_zh, /只生成这一个镜头/);
});

test('timed [a-b秒], 00:00-00:06 and 第N段 segments', () => {
  const sb = parseStoryboard(`[全局] 20秒，4:3\n[0-4秒] 平视中景\n[4-9秒] 侧面跟拍\n00:09-00:20 [镜头3] 跟随`);
  assert.deepEqual(sb.shots.map((s) => s.duration), [4, 5, 11]);
  assert.equal(sb.aspect, '4:3');
  const two = parseStoryboard(`第1段（0–15秒）\n[风格] 16:9，国漫\n[0-5秒] a\n[5-15秒] b\n第2段（15–30秒）：沿用第1段，只改写分镜部分。\n[0-15秒] c`);
  assert.deepEqual(two.shots.map((s) => s.id), ['S01_shot01', 'S01_shot02', 'S02_shot01']);
  assert.match(two.shots[2].prompt_zh, /国漫/, 'segment 2 inherits segment 1 globals');
  assert.equal(parseStoryboard(EX2, { unit: 'segment' }).shots.length, 1);
});

test('explicit 角色（语气）：{台词} wins; narrator fallback', () => {
  assert.equal(dialogue('林柔看向沈晚。沈晚（冷声）：{滚}', ['沈晚', '林柔'])[0].speaker, '沈晚');
  assert.deepEqual(dialogue('画外·旁白（VO·低沉）："在帝都，\n每分钟。"', []), [{ speaker: null, text: '在帝都，每分钟。', tone: '旁白' }]);
});

test('fit plan: trim / slow / slow+hold / hold / loop', () => {
  assert.equal(fitPlan(6, 4).mode, 'trim');
  assert.deepEqual(fitPlan(4, 4.8), { mode: 'slow', speed: 0.8333, hold: 0, trim: 0 });
  const sh = fitPlan(3, 6);
  assert.equal(sh.mode, 'slow+hold'); assert.equal(sh.speed, 0.8); assert.equal(sh.hold, 2.25);
  assert.equal(fitPlan(3, 6, 'hold').hold, 3);
  assert.equal(fitPlan(2, 5, 'loop').loops, 3);
  assert.equal(shotTarget({ duration: 4 }, 5), 5.75, 'voice longer than planned stretches the shot');
  assert.equal(shotTarget({ duration: 4, fit: 'strict' }, 5), 4);
});

test('ASS karaoke uses char timestamps', () => {
  const ass = buildAss([{ start: 1, end: 2, text: '你好！', speaker: '天机', words: [{ text: '你', start: 1, end: 1.4 }, { text: '好', start: 1.4, end: 1.9 }] }], 1080, 1920);
  assert.match(ass, /\{\\kf40\}你\{\\kf50\}好！/);
  assert.match(ass, /Dialogue: 0,0:00:01\.00,0:00:02\.25,Who,,0,0,0,,天机/);
});
