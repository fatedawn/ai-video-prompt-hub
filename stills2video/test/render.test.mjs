// CPU render smoke test: tiny clip through py/motion.py (gradient depth, so no model download needed).
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const PY = process.env.S2V_PYTHON || 'python3';
const hasDeps = spawnSync(PY, ['-c', 'import numpy, PIL'], { stdio: 'ignore' }).status === 0 && spawnSync('ffmpeg', ['-version'], { stdio: 'ignore' }).status === 0;

test('motion.py renders a moving clip on CPU', { skip: !hasDeps && 'needs python3 + numpy + pillow + ffmpeg' }, () => {
  const d = fs.mkdtempSync(path.join(os.tmpdir(), 's2v-r-'));
  const img = path.join(d, 'in.png');
  // procedural test image: gradient + bright disc (no external assets)
  const mk = spawnSync(PY, ['-c', `from PIL import Image, ImageDraw
im = Image.linear_gradient('L').resize((320, 240)).convert('RGB'); ImageDraw.Draw(im).ellipse([120, 80, 200, 160], fill=(255, 200, 80)); im.save(${JSON.stringify(img)})`]);
  assert.equal(mk.status, 0, String(mk.stderr));
  for (const [preset, overlays] of [['push_in', [{ type: 'fog' }, { type: 'snow' }]], ['orbit', [{ type: 'rain' }, { type: 'vignette' }]]]) {
    const out = path.join(d, `${preset}.mp4`);
    const job = { image: img, out, width: 144, height: 256, fps: 12, duration: 1, motion: { preset, amount: 1 }, overlays, depth: 'gradient', workers: 1 };
    fs.writeFileSync(path.join(d, 'job.json'), JSON.stringify(job));
    const r = spawnSync(PY, [path.join(HERE, '..', 'py', 'motion.py'), path.join(d, 'job.json')], { encoding: 'utf8' });
    assert.equal(r.status, 0, r.stderr);
    const info = JSON.parse(r.stdout.trim().split('\n').pop());
    assert.equal(info.frames, 12);
    const p = spawnSync('ffprobe', ['-v', 'error', '-count_frames', '-select_streams', 'v', '-show_entries', 'stream=width,height,nb_read_frames', '-of', 'csv=p=0', out], { encoding: 'utf8' });
    assert.equal(p.stdout.trim(), '144,256,12');
    // first vs last frame must differ (no static freeze)
    const fr = (t) => spawnSync('ffmpeg', ['-v', 'error', '-ss', String(t), '-i', out, '-frames:v', '1', '-f', 'rawvideo', '-pix_fmt', 'gray', '-'], { maxBuffer: 1 << 24 }).stdout;
    const a = fr(0), b = fr(0.9);
    let diff = 0; for (let i = 0; i < a.length; i++) diff += Math.abs(a[i] - b[i]);
    assert.ok(diff / a.length > 1, `${preset} moves (mean diff ${diff / a.length})`);
  }
});
