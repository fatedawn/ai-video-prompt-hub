#!/usr/bin/env node
// Route-C demo helper: render STAND-IN clips with the hand-drawn animator, named the way a user would save
// web downloads (including a browser "(1)" duplicate suffix, a lower-case variant, a wrong aspect ratio and
// mismatched durations) so `import` + `assemble` can be shown end-to-end without any video-model account.
// These clips are placeholders, clearly labelled 「替身片段 STAND-IN」 — not model output.
// Original code for ai-video-prompt-hub/videogen.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ANIM = path.resolve(HERE, '..', '..', '..', 'animator');
const outDir = path.resolve(process.argv[2] || path.join(HERE, 'out', 'downloads'));
const work = path.join(path.dirname(outDir), 'standin-projects');
fs.mkdirSync(outDir, { recursive: true });
fs.mkdirSync(work, { recursive: true });
const rel = (p) => path.relative(work, p).split(path.sep).join('/');

// [file name as "downloaded", seconds, canvas, scene content]
const SHOTS = [
  ['S01_shot01.mp4', 4.0, [720, 1280], '林柔打翻花瓶，指向沈晚', 'doudou', 'surprised', [{ type: 'point', arm: 'arm_r', angle: 95, at: 'scene+0.6', dur: 3 }]],
  ['S01_shot02 (1).mp4', 1.6, [720, 1280], '沈晚近景，冷笑甩文件', 'tianji', 'smug', [{ type: 'reveal', at: 'scene+0.4', until: 'scene.end' }]],
  ['s01-shot03_v2.mp4', 7.0, [720, 1280], '文件特写：“鉴定” + 红色印章', null, null, []],
  ['S01_shot04.mp4', 4.0, [720, 720], '林柔近景，愣住后缩', 'doudou', 'surprised', [{ type: 'tremble', at: 'scene+1.2', dur: 1.2 }]],
];

for (const [name, dur, [W, H], desc, ch, expr, acts] of SHOTS) {
  const id = name.match(/S0*1[ _-]?shot0*(\d)/i)[1];
  const s = (x) => Math.round(x * (W / 720));
  const srt = path.join(work, `shot${id}.srt`);
  fs.writeFileSync(srt, `1\n00:00:00,000 --> 00:00:${String(Math.floor(dur)).padStart(2, '0')},${String(Math.round((dur % 1) * 1000)).padStart(3, '0')}\n${desc}\n`);
  const elements = [
    { id: 'tag', text: '替身片段 STAND-IN', size: s(54), color: '#e2603f', x: W / 2, y: s(110), at: 'scene', draw: 0.4, pen: false },
    { id: 'sid', text: `镜头 ${id}`, size: s(84), color: '#2b2d42', x: W / 2, y: s(220), at: 'scene+0.1', draw: 0.4, pen: false },
    { id: 'desc', text: desc, size: s(36), color: '#5a4a3a', x: W / 2, y: H - s(H > W ? 300 : 90), at: 'scene+0.3', draw: 0.6, pen: false },
  ];
  if (!ch) elements.push(
    { id: 'paper', shape: 'paper', x: W / 2, y: H / 2, scale: s(3.2) / 1, at: 'scene+0.2', draw: 0.7 },
    { id: 'jd', text: '鉴定', size: s(150), color: '#2b2d42', x: W / 2, y: H / 2 - s(40), at: 'scene+0.9', draw: 0.8 },
    { id: 'seal', shape: 'sun', x: W / 2 + s(120), y: H / 2 + s(150), scale: s(0.9), at: 'scene+1.8', draw: 0.5, colors: { c1: '#d8342c', c2: '#d8342c' } });
  else elements.push({ id: 'spark', shape: 'sparkle', x: s(120), y: s(H > W ? 380 : 320), scale: s(0.5), at: 'scene+0.2', draw: 0.3, pen: false, motion: { type: 'twinkle', period: 0.9 } });
  const P = {
    $schema: rel(path.join(ANIM, 'schema/project.schema.json')), version: 1, title: `stand-in ${name}`,
    canvas: { width: W, height: H, fps: 30 }, media: 'crayon', paper: { color: '#efe6d2' },
    timing: { srt: path.basename(srt) }, subtitle: { enabled: false },
    characters: ch ? { [ch]: rel(path.join(ANIM, `characters/${ch}/character.json`)) } : {},
    script: [{ text: desc }],
    scenes: [{ id: 's', cues: [1], camera: { from: { x: W / 2, y: H / 2, zoom: 1 }, to: { x: W / 2, y: H / 2, zoom: 1.06 } }, elements,
      actors: ch ? [{ character: ch, x: W / 2, y: H - s(H > W ? 380 : 120), height: s(H > W ? 560 : 400), actions: [{ type: 'expression', name: expr, at: 'scene' }, ...acts] }] : [] }],
  };
  const pf = path.join(work, `shot${id}.json`);
  fs.writeFileSync(pf, JSON.stringify(P, null, 2));
  const r = spawnSync(process.execPath, [path.join(ANIM, 'src/cli.mjs'), 'render', pf, '--out', path.join(outDir, name), '--no-audio'], { encoding: 'utf8' });
  if (r.status !== 0) { console.error(r.stdout, r.stderr); process.exit(1); }
  console.log(`  替身片段 ${name}  ${dur}s  ${W}x${H}`);
}
fs.writeFileSync(path.join(outDir, 'notes.txt'), '这个文件不是视频，import 会忽略它。\n');
console.log(`→ ${outDir}`);
