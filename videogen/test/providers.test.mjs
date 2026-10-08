// Mocked end-to-end tests for every route-A/B adapter: submit → poll (pending, done) → download. No network, no keys.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { PROVIDERS, generateShot, showRequest } from '../providers/index.mjs';

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'vg-test-'));
const png = path.join(tmp, 'ref.png');
fs.writeFileSync(png, Buffer.from('89504e470d0a1a0a0000000d4948445200000001000000010806000000', 'hex'));
const ENV = { ARK_API_KEY: 'ark-secret-123', KLING_API_KEY: 'kling-secret', MINIMAX_API_KEY: 'mm-secret', GEMINI_API_KEY: 'gm-secret', FAL_KEY: 'fal-secret', REPLICATE_API_TOKEN: 'r8-secret', RUNWAYML_API_SECRET: 'rw-secret', LUMA_API_KEY: 'luma-secret', COMFYUI_URL: 'http://gpu-box:8188' };
const shot = (extra = {}) => ({ id: 'S01_shot02', segment: 1, index: 2, duration: 5, aspect: '9:16', prompt_zh: '镜头2：她回头一笑', prompt_en: '', negative: '水印、乱码文字', refs: [], first_frame: null, lines: [], ...extra });

// scripted fetch: each provider declares the JSON its API returns for submit / poll(s) / (result)
const SCRIPT = {
  seedance: [{ id: 'cgt-1' }, { status: 'running' }, { status: 'succeeded', content: { video_url: 'https://cdn/x.mp4' } }],
  kling: [{ code: 0, data: { id: 'k-1', status: 'submitted' } }, { code: 0, data: [{ id: 'k-1', status: 'processing' }] }, { code: 0, data: [{ id: 'k-1', status: 'succeeded', outputs: [{ type: 'video', url: 'https://cdn/k.mp4' }] }] }],
  minimax: [{ task_id: 'm-1' }, { task: { status: 'processing' } }, { task: { status: 'succeeded', content: { url: 'https://cdn/m.mp4' } } }],
  veo: [{ name: 'models/veo-3.1-generate-preview/operations/op1' }, { done: false }, { done: true, response: { generateVideoResponse: { generatedSamples: [{ video: { uri: 'https://generativelanguage.googleapis.com/v1beta/files/f:download' } }] } } }],
  fal: [{ request_id: 'f-1', status_url: 'https://queue.fal.run/fal-ai/wan/requests/f-1/status', response_url: 'https://queue.fal.run/fal-ai/wan/requests/f-1' }, { status: 'IN_PROGRESS' }, { status: 'COMPLETED' }, { video: { url: 'https://v3.fal.media/f.mp4' } }],
  replicate: [{ id: 'r-1', urls: { get: 'https://api.replicate.com/v1/predictions/r-1' } }, { status: 'processing' }, { status: 'succeeded', output: 'https://replicate.delivery/r.mp4' }],
  runway: [{ id: 'rw-1' }, { status: 'RUNNING' }, { status: 'SUCCEEDED', output: ['https://cdn/rw.mp4'] }],
  luma: [{ id: 'l-1', state: 'queued' }, { state: 'dreaming' }, { state: 'completed', assets: { video: 'https://cdn/l.mp4' } }],
};

function mockFetch(responses) {
  const calls = [];
  let i = 0;
  const f = async (url, init = {}) => {
    calls.push({ url, init });
    if (i >= responses.length) return new Response(new Uint8Array([0, 0, 0, 24, 102, 116, 121, 112]), { status: 200 }); // the download
    return new Response(JSON.stringify(responses[i++]), { status: 200, headers: { 'content-type': 'application/json' } });
  };
  return { f, calls };
}

for (const [id, responses] of Object.entries(SCRIPT)) {
  test(`${id}: submit → poll → download (mocked)`, async () => {
    const p = PROVIDERS[id];
    const { f, calls } = mockFetch(responses);
    const out = path.join(tmp, `${id}.mp4`);
    const r = await generateShot(p, shot(), out, { env: ENV, fetch: f, sleep: async () => {}, baseDir: tmp });
    assert.equal(fs.existsSync(out), true);
    assert.ok(r.videoUrl.startsWith('https://'));
    const sub = calls[0];
    assert.equal(sub.init.method, 'POST');
    const body = JSON.parse(sub.init.body);
    const auth = JSON.stringify(sub.init.headers);
    assert.ok(auth.includes(Object.values(ENV).find((v) => auth.includes(v))), 'auth header carries the key');
    assert.ok(JSON.stringify(body).includes('她回头一笑'), 'prompt is sent');
    assert.equal(calls.length, responses.length + 1, 'all polls + 1 download');
    if (id === 'veo') assert.equal(calls.at(-1).init.headers['x-goog-api-key'], 'gm-secret', 'veo download needs the key');
  });
}

test('first frame + negative + duration snapping per provider', () => {
  const s = shot({ duration: 5.2, first_frame: { path: 'ref.png' } });
  const ctx = { env: ENV, baseDir: tmp };
  const b = (id) => PROVIDERS[id].submit(s, ctx);
  assert.equal(b('seedance').body.ratio, 'adaptive');
  assert.equal(b('seedance').body.content[1].role, 'first_frame');
  assert.equal(b('seedance').body.duration, 6);
  assert.match(b('kling').url, /image-to-video\/kling-3\.0$/);
  assert.equal(b('kling').body.contents[1].type, 'first_frame');
  assert.equal(b('veo').body.parameters.durationSeconds, 6);
  assert.equal(b('veo').body.parameters.negativePrompt, '水印、乱码文字');
  assert.ok(b('veo').body.instances[0].image.inlineData.data.length > 10);
  assert.equal(b('runway').body.ratio, '720:1280');
  assert.match(b('runway').url, /image_to_video$/);
  assert.equal(b('fal').body.num_frames, 85, '5.2 s @16 fps rounded up to 4n+1');
  assert.equal(b('minimax').body.duration, 6);
  assert.throws(() => b('luma'), /公网图片 URL/);
  assert.equal(PROVIDERS.luma.submit(shot({ first_frame: { url: 'https://img/x.png' }, duration: 7.5 }), ctx).body.duration, '9s');
  const veoRef = PROVIDERS.veo.submit(shot({ refs: [{ tag: '@图片1', path: 'ref.png' }] }), ctx).body;
  assert.equal(veoRef.parameters.durationSeconds, 8, 'reference images force 8 s');
  assert.equal(veoRef.instances[0].referenceImages[0].referenceType, 'asset');
});

test('dry-run never needs a key and redacts secrets', async () => {
  const r = await generateShot(PROVIDERS.seedance, shot(), path.join(tmp, 'x.mp4'), { env: {}, dryRun: true });
  assert.match(r.text, /POST https:\/\/ark\.cn-beijing\.volces\.com\/api\/v3\/contents\/generations\/tasks/);
  const shown = showRequest(PROVIDERS.kling.submit(shot(), { env: ENV }), ENV);
  assert.ok(!shown.includes('kling-secret'));
});

test('missing key gives a clear error', async () => {
  await assert.rejects(generateShot(PROVIDERS.veo, shot(), path.join(tmp, 'y.mp4'), { env: {} }), /GEMINI_API_KEY/);
});

test('comfyui: upload first frame, fill workflow, poll history, fetch /view', async () => {
  const calls = [];
  const webm = path.join(tmp, 'src.webm');
  const { spawnSync } = await import('node:child_process');
  spawnSync('ffmpeg', ['-v', 'error', '-y', '-f', 'lavfi', '-i', 'color=c=red:s=64x64:d=0.5', '-c:v', 'libvpx-vp9', webm]);
  const f = async (url, init = {}) => {
    calls.push({ url, init });
    if (url.endsWith('/upload/image')) return Response.json({ name: 'ref.png', subfolder: '', type: 'input' });
    if (url.endsWith('/prompt')) return Response.json({ prompt_id: 'p1' });
    if (url.includes('/history/')) return Response.json(calls.filter((c) => c.url.includes('/history/')).length < 2 ? {} : { p1: { status: { status_str: 'success' }, outputs: { 10: { images: [{ filename: 'S01_shot02_00001_.webm', subfolder: 'hda', type: 'output' }] } } } });
    if (url.includes('/view?')) return new Response(fs.readFileSync(webm));
    throw new Error('unexpected ' + url);
  };
  const out = path.join(tmp, 'comfy.mp4');
  await PROVIDERS.comfyui.run(shot({ first_frame: { path: 'ref.png' } }), out, { env: ENV, fetch: f, sleep: async () => {}, baseDir: tmp });
  assert.ok(fs.existsSync(out));
  const sent = JSON.parse(calls.find((c) => c.url.endsWith('/prompt')).init.body).prompt;
  assert.equal(sent['5'].inputs.text, '镜头2：她回头一笑');
  assert.equal(sent['11'].inputs.image, 'ref.png');
  assert.equal(sent['7'].inputs.length, 121, '5 s @ 24 fps → 4n+1 frames');
  assert.deepEqual([sent['7'].inputs.width, sent['7'].inputs.height], [704, 1280]);
  assert.ok(calls[0].url.startsWith('http://gpu-box:8188'));
});
