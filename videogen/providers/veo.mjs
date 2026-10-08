// Google Veo via the Gemini API. Docs (checked 2026-10): https://ai.google.dev/gemini-api/docs/veo
//   POST {base}/v1beta/models/{model}:predictLongRunning   header x-goog-api-key
//   instances[0]: {prompt, image:{inlineData:{mimeType,data}} (first frame) | referenceImages:[{image:{inlineData}, referenceType:'asset'}] (≤3)}
//   parameters: aspectRatio 16:9|9:16, durationSeconds 4|6|8 (8 required with reference images / 1080p), negativePrompt, resolution
//   GET {base}/v1beta/{operation.name} → done, response.generateVideoResponse.generatedSamples[0].video.uri (download with the key; kept 2 days)
// Original adapter code for ai-video-prompt-hub/videogen.
import { imageInput, pick, firstFrameOf, refsOf, promptOf } from './util.mjs';

const BASE = 'https://generativelanguage.googleapis.com';
export default {
  id: 'veo', name: 'Google Veo（Gemini API）', route: 'cloud',
  env: ['GEMINI_API_KEY'], optionalEnv: ['VEO_MODEL'],
  docs: ['https://ai.google.dev/gemini-api/docs/veo'],
  caps: { t2v: true, i2v: true, refImages: 3, durations: [4, 6, 8], ratios: ['16:9', '9:16'], negative: true, audio: 'always (muted by assemble)' },
  submit(shot, ctx) {
    const model = ctx.model || ctx.env.VEO_MODEL || 'veo-3.1-generate-preview';
    const ff = firstFrameOf(shot);
    const refs = refsOf(shot).filter((r) => r.role !== 'reference_video').slice(0, 3);
    const inst = { prompt: promptOf(shot) };
    if (ff) inst.image = { inlineData: imageInput(ff, 'inline', ctx.baseDir) };
    else if (refs.length) inst.referenceImages = refs.map((r) => ({ image: { inlineData: imageInput(r, 'inline', ctx.baseDir) }, referenceType: 'asset' }));
    const parameters = { aspectRatio: shot.aspect === '9:16' ? '9:16' : '16:9', durationSeconds: inst.referenceImages ? 8 : pick(shot.duration, [4, 6, 8]), resolution: ctx.resolution || '720p' };
    if (shot.negative) parameters.negativePrompt = shot.negative;
    return { method: 'POST', url: `${BASE}/v1beta/models/${model}:predictLongRunning`, headers: { 'Content-Type': 'application/json', 'x-goog-api-key': ctx.env.GEMINI_API_KEY || '$GEMINI_API_KEY' }, body: { instances: [inst], parameters } };
  },
  parseSubmit: (j) => ({ taskId: j.name }),
  poll: (task, ctx) => ({ method: 'GET', url: `${BASE}/v1beta/${task.taskId}`, headers: { 'x-goog-api-key': ctx.env.GEMINI_API_KEY } }),
  parsePoll(j) {
    if (!j.done) return { state: 'pending' };
    if (j.error) return { state: 'failed', error: j.error.message };
    const uri = j.response?.generateVideoResponse?.generatedSamples?.[0]?.video?.uri;
    return uri ? { state: 'done', videoUrl: uri } : { state: 'failed', error: '没有返回视频（可能被安全策略过滤）' };
  },
  download: (url, ctx) => ({ url, headers: { 'x-goog-api-key': ctx.env.GEMINI_API_KEY } }),
};
