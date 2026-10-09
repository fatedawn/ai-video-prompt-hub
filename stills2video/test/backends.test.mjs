import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseNvidiaSmi, tierOf, selectBackend, TIERS, comfyReachable } from '../lib/hardware.mjs';
import { comfySettings } from '../lib/backends/comfyui.mjs';
import { getBackend, BACKENDS } from '../lib/backends/index.mjs';
import { wan2gpSettings } from '../lib/backends/wan2gp.mjs';
import { lightx2vArgs } from '../lib/backends/lightx2v.mjs';
import { polishPlan } from '../lib/polish.mjs';
import { imageRequest, generateImages } from '../lib/openai_image.mjs';
import { buildStoryboard } from '../lib/storyboard.mjs';
import { resolveShot } from '../lib/plan.mjs';

test('nvidia-smi parsing and VRAM tiers', () => {
  const g = parseNvidiaSmi('NVIDIA GeForce RTX 4060 Laptop GPU, 8188, 7700\nNVIDIA GeForce RTX 4090, 24564, 23000\n');
  assert.equal(g.length, 2);
  assert.equal(g[1].vramMB, 24564);
  assert.deepEqual([0, 4, 6, 8, 12, 16, 24, 48].map(tierOf), ['cpu', 'cpu', 'gpu8', 'gpu8', 'gpu12', 'gpu16', 'gpu24', 'gpu24']);
  for (const t of ['cpu', 'gpu8', 'gpu12', 'gpu16', 'gpu24']) assert.ok(TIERS[t].label, t);
  assert.deepEqual(parseNvidiaSmi(''), []);
});

test('selectBackend: flag > comfy online > cpu (+cloud hint)', () => {
  assert.equal(selectBackend({ prefer: 'cloud:kling', hw: { tier: 'cpu' } }).provider, 'kling');
  assert.equal(selectBackend({ hw: { tier: 'gpu12', vramGB: 12, comfyuiUrl: 'x' }, comfyReachable: true }).backend, 'comfyui');
  const off = selectBackend({ hw: { tier: 'gpu12', vramGB: 12, comfyuiUrl: 'http://127.0.0.1:8188' }, comfyReachable: false });
  assert.equal(off.backend, 'cpu'); assert.equal(off.suggest, 'comfyui');
  const k = selectBackend({ hw: { tier: 'cpu' }, keys: { minimax: true } });
  assert.equal(k.backend, 'cpu'); assert.equal(k.suggest, 'cloud:minimax');
  assert.deepEqual(Object.keys(BACKENDS).sort(), ['cloud', 'comfyui', 'cpu', 'lightx2v', 'manual', 'wan2gp']);
  assert.throws(() => getBackend('nope'));
});

test('comfyReachable is false when nothing listens', async () => {
  assert.equal(await comfyReachable('http://127.0.0.1:9', async () => { throw new Error('ECONNREFUSED'); }), false);
  assert.equal(await comfyReachable('http://x/', async (u) => ({ ok: u === 'http://x/system_stats' })), true);
});

const tmp = () => fs.mkdtempSync(path.join(os.tmpdir(), 's2v-b-'));
function fixture(n = 2) {
  const d = tmp();
  const imgs = Array.from({ length: n }, (_, i) => { const f = path.join(d, `0${i + 1}.png`); fs.writeFileSync(f, 'x'); return f; });
  const sb = buildStoryboard({ images: imgs, baseDir: d, script: '1. 【仙侠云海环绕】云海\n2. 【推进】竹林' });
  return { d, sb, plans: sb.shots.map((s, i) => resolveShot(s, sb, i, { baseDir: d })) };
}

test('comfyui dry-run writes a filled API workflow (both I2V and FLF2V)', async () => {
  const { d, sb, plans } = fixture();
  for (const tier of ['gpu8', 'gpu12', 'gpu16', 'gpu24']) {
    const st = comfySettings(plans[0], sb, tier);
    assert.ok(fs.existsSync(st.workflow), `${tier} workflow exists: ${st.workflow}`);
    assert.equal((st.vars.LENGTH - 1) % 4, 0);
  }
  const ctx = { baseDir: d, outDir: d, clipsDir: path.join(d, 'clips'), tier: 'gpu24', dryRun: true, log: () => {} };
  const r = await getBackend('comfyui').render(plans[0], sb, ctx);
  assert.equal(r.dryRun, true);
  const wf = JSON.parse(fs.readFileSync(r.files[0], 'utf8'));
  const s = JSON.stringify(wf);
  assert.ok(!/\{\{[A-Z_]+\}\}/.test(s), 'all placeholders filled');
  assert.ok(s.includes('01.png'));
  assert.ok(Object.values(wf).some((n) => n.class_type === 'CLIPTextEncode' && n.inputs.text.includes('不要切镜')));
  assert.match(r.text, /\/prompt/);
  // FLF2V bridge: first + last frame
  const flf = { ...plans[0], last_image: path.join(d, '02.png') };
  const r2 = await getBackend('comfyui').render(flf, sb, ctx);
  const wf2 = JSON.parse(fs.readFileSync(r2.files[0], 'utf8'));
  const loads = Object.values(wf2).filter((n) => n.class_type === 'LoadImage').map((n) => n.inputs.image).sort();
  assert.deepEqual(loads, ['01.png', '02.png']);
  assert.ok(Object.values(wf2).some((n) => n.class_type === 'WanFirstLastFrameToVideo'));
  assert.match(r2.text, /FLF2V/);
});

test('cloud backend without a key stays dry-run; manual/wan2gp/lightx2v only write files/commands', async () => {
  const { d, sb, plans } = fixture();
  const ctx = { baseDir: d, outDir: d, clipsDir: path.join(d, 'clips'), tier: 'gpu12', dryRun: false, log: () => {}, provider: 'kling' };
  const saved = { ...process.env };
  for (const k of Object.keys(process.env)) if (/KLING|ACCESS_KEY|SECRET/.test(k)) delete process.env[k];
  try {
    const r = await getBackend('cloud').render(plans[0], sb, ctx);
    assert.equal(r.dryRun, true);
  } finally { Object.assign(process.env, saved); }
  const w = wan2gpSettings({ ...plans[0], last_image: '/x/02.png' }, sb, { tier: 'gpu8' });
  assert.equal(w.image_prompt_type, 'SE'); assert.equal(w.image_end, '/x/02.png'); assert.equal(w.resolution, '480x832');
  const r3 = await getBackend('wan2gp').render(plans[0], sb, ctx);
  assert.match(r3.text, /wgp\.py --process/);
  const a = lightx2vArgs(plans[0], '/o.mp4', {}, 'gpu8');
  assert.ok(a.includes('i2v') && a.includes('--image_path') && a.some((x) => x.endsWith('wan_moe_i2v_4090.json')));
  assert.ok(lightx2vArgs({ ...plans[0], last_image: '/l.png' }, '/o.mp4', {}).includes('flf2v'));
  const r4 = await getBackend('lightx2v').render(plans[0], sb, { ...ctx, run: false });
  assert.equal(r4.dryRun, true);
});

test('polish plan detects tools and falls back to ffmpeg', () => {
  assert.deepEqual(polishPlan({}, { interp: 2, upscale: 2 }).map((p) => p.via), ['minterpolate', 'lanczos']);
  assert.deepEqual(polishPlan({ rife: '/bin/rife', realesrgan: '/bin/re' }, { interp: 2, upscale: 4 }).map((p) => p.via), ['rife', 'realesrgan']);
  assert.deepEqual(polishPlan({}, {}), []);
});

test('OpenAI image adapter: no key → dry-run, key never written', async () => {
  const req = imageRequest('竹林', { size: '1024x1536' }, { OPENAI_API_KEY: 'sk-test-not-real' });
  assert.equal(req.body.size, '1024x1536');
  assert.ok(!JSON.stringify(req.body).includes('sk-test'));
  const d = tmp();
  const r = await generateImages(['竹林'], d, { env: {} });
  assert.equal(r[0].dryRun, true);
  assert.ok(!fs.existsSync(r[0].file));
});
