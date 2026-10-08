// Luma Dream Machine API. Docs (checked 2026-10): https://docs.lumalabs.ai/docs/video-generation
//   POST https://api.lumalabs.ai/dream-machine/v1/generations · Authorization: Bearer $LUMA_API_KEY
//   {prompt, model: ray-2|ray-flash-2, aspect_ratio, duration '5s'|'9s', resolution, keyframes:{frame0:{type:'image', url}}}
//   GET /dream-machine/v1/generations/{id} → state (queued|dreaming|completed|failed), assets.video
// Keyframe images must be public URLs (no upload/base64).
// Original adapter code for ai-video-prompt-hub/videogen.
import { imageInput, pick, firstFrameOf, withNegative } from './util.mjs';

const BASE = 'https://api.lumalabs.ai/dream-machine/v1';
export default {
  id: 'luma', name: 'Luma Dream Machine', route: 'cloud',
  env: ['LUMA_API_KEY'], optionalEnv: ['LUMA_MODEL'],
  docs: ['https://docs.lumalabs.ai/docs/video-generation', 'https://docs.lumalabs.ai/reference/creategeneration'],
  caps: { t2v: true, i2v: '仅公网 URL', refImages: 0, durations: [5, 9], ratios: ['16:9', '9:16', '1:1', '4:3', '3:4', '21:9', '9:21'], negative: false },
  submit(shot, ctx) {
    const ff = firstFrameOf(shot);
    const body = { prompt: withNegative(shot), model: ctx.model || ctx.env.LUMA_MODEL || 'ray-2', aspect_ratio: shot.aspect, duration: `${pick(shot.duration, [5, 9])}s`, resolution: ctx.resolution || '720p' };
    if (ff) body.keyframes = { frame0: { type: 'image', url: imageInput(ff, 'url', ctx.baseDir) } };
    return { method: 'POST', url: `${BASE}/generations`, headers: { 'Content-Type': 'application/json', accept: 'application/json', Authorization: `Bearer ${ctx.env.LUMA_API_KEY || '$LUMA_API_KEY'}` }, body };
  },
  parseSubmit: (j) => ({ taskId: j.id }),
  poll: (task, ctx) => ({ method: 'GET', url: `${BASE}/generations/${task.taskId}`, headers: { Authorization: `Bearer ${ctx.env.LUMA_API_KEY}` } }),
  parsePoll: (j) => (j.state === 'completed' ? { state: 'done', videoUrl: j.assets?.video } : j.state === 'failed' ? { state: 'failed', error: j.failure_reason } : { state: 'pending' }),
};
