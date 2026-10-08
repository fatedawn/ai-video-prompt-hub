// Replicate. Docs (checked 2026-10): https://replicate.com/docs/reference/http
//   POST https://api.replicate.com/v1/models/{owner}/{name}/predictions {input} · Authorization: Bearer $REPLICATE_API_TOKEN
//   GET  urls.get → status starting|processing|succeeded|failed|canceled, output (URL or [URL])
// Default models: wan-video/wan-2.2-t2v-fast / wan-video/wan-2.2-i2v-fast (prompt, image, num_frames, aspect_ratio, resolution, frames_per_second).
// Original adapter code for ai-video-prompt-hub/videogen.
import { imageInput, firstFrameOf, promptOf } from './util.mjs';

export default {
  id: 'replicate', name: 'Replicate', route: 'cloud',
  env: ['REPLICATE_API_TOKEN'], optionalEnv: ['REPLICATE_MODEL', 'REPLICATE_MODEL_I2V'],
  docs: ['https://replicate.com/docs/reference/http', 'https://replicate.com/wan-video/wan-2.2-i2v-fast'],
  caps: { t2v: true, i2v: true, refImages: 0, durations: '按 num_frames（Wan：81 帧 @16fps ≈ 5 s 最佳）', ratios: ['16:9', '9:16'], negative: false },
  submit(shot, ctx) {
    const ff = firstFrameOf(shot);
    const model = ctx.model || (ff ? ctx.env.REPLICATE_MODEL_I2V || 'wan-video/wan-2.2-i2v-fast' : ctx.env.REPLICATE_MODEL || 'wan-video/wan-2.2-t2v-fast');
    const fps = 16;
    const input = { prompt: promptOf(shot), num_frames: Math.min(121, Math.max(81, Math.round(shot.duration * fps / 4) * 4 + 1)), frames_per_second: fps, resolution: ctx.resolution || '480p' };
    if (ff) input.image = imageInput(ff, 'url-or-data', ctx.baseDir); else input.aspect_ratio = shot.aspect === '9:16' ? '9:16' : '16:9';
    Object.assign(input, shot.replicate_input || {});
    return { method: 'POST', url: `https://api.replicate.com/v1/models/${model}/predictions`, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ctx.env.REPLICATE_API_TOKEN || '$REPLICATE_API_TOKEN'}` }, body: { input } };
  },
  parseSubmit: (j) => ({ taskId: j.id, pollUrl: j.urls?.get }),
  poll: (task, ctx) => ({ method: 'GET', url: task.pollUrl || `https://api.replicate.com/v1/predictions/${task.taskId}`, headers: { Authorization: `Bearer ${ctx.env.REPLICATE_API_TOKEN}` } }),
  parsePoll: (j) => (j.status === 'succeeded' ? { state: 'done', videoUrl: Array.isArray(j.output) ? j.output[0] : j.output } : ['failed', 'canceled'].includes(j.status) ? { state: 'failed', error: j.error } : { state: 'pending' }),
};
