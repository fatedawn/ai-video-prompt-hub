// fal.ai queue API (hosts many models: Wan, Kling, Veo, Seedance…). Docs (checked 2026-10):
//   https://fal.ai/docs/documentation/model-apis/inference/queue   POST https://queue.fal.run/{model} · Authorization: Key $FAL_KEY
//   → {request_id, status_url, response_url}; GET status_url → IN_QUEUE|IN_PROGRESS|COMPLETED|FAILED; GET response_url → {video:{url}}
// Default models: fal-ai/wan/v2.2-a14b/text-to-video and …/image-to-video (inputs: prompt, negative_prompt, image_url,
// num_frames 17–161 @ frames_per_second, aspect_ratio 16:9|9:16|1:1, resolution 480p|580p|720p).
// Other fal models take different inputs: set FAL_MODEL and, if needed, "fal_input" on the shot to add/override fields.
// Original adapter code for ai-video-prompt-hub/videogen.
import { imageInput, firstFrameOf, promptOf } from './util.mjs';

export default {
  id: 'fal', name: 'fal.ai', route: 'cloud',
  env: ['FAL_KEY'], optionalEnv: ['FAL_MODEL', 'FAL_MODEL_I2V'],
  docs: ['https://fal.ai/docs/documentation/model-apis/inference/queue', 'https://fal.ai/models/fal-ai/wan/v2.2-a14b/image-to-video/api'],
  caps: { t2v: true, i2v: true, refImages: 0, durations: '按 num_frames（Wan：17–161 帧 @16fps）', ratios: ['16:9', '9:16', '1:1'], negative: true },
  submit(shot, ctx) {
    const ff = firstFrameOf(shot);
    const model = ctx.model || (ff ? ctx.env.FAL_MODEL_I2V || 'fal-ai/wan/v2.2-a14b/image-to-video' : ctx.env.FAL_MODEL || 'fal-ai/wan/v2.2-a14b/text-to-video');
    const fps = 16;
    const frames = Math.min(161, Math.max(17, Math.round(shot.duration * fps / 4) * 4 + 1));
    const input = { prompt: promptOf(shot), negative_prompt: shot.negative || undefined, num_frames: frames, frames_per_second: fps, aspect_ratio: ['16:9', '9:16', '1:1'].includes(shot.aspect) ? shot.aspect : '16:9', resolution: ctx.resolution || '720p' };
    if (ff) input.image_url = imageInput(ff, 'url-or-data', ctx.baseDir);
    Object.assign(input, shot.fal_input || {});
    return { method: 'POST', url: `https://queue.fal.run/${model}`, headers: { 'Content-Type': 'application/json', Authorization: `Key ${ctx.env.FAL_KEY || '$FAL_KEY'}` }, body: JSON.parse(JSON.stringify(input)) };
  },
  parseSubmit: (j) => ({ taskId: j.request_id, statusUrl: j.status_url, responseUrl: j.response_url }),
  poll: (task, ctx) => ({ method: 'GET', url: task.statusUrl, headers: { Authorization: `Key ${ctx.env.FAL_KEY}` } }),
  parsePoll: (j) => (j.status === 'COMPLETED' ? { state: 'done', videoUrl: null, needResult: true } : ['FAILED', 'CANCELED', 'CANCELLED'].includes(j.status) ? { state: 'failed', error: j.error || j.status } : { state: 'pending' }),
  // fal needs one more GET (response_url) to get the video URL; handled by `resolve`
  async resolve(task, ctx, http) { const r = await http({ method: 'GET', url: task.responseUrl, headers: { Authorization: `Key ${ctx.env.FAL_KEY}` } }); return r.video?.url || r.videos?.[0]?.url; },
};
