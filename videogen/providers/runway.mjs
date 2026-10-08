// Runway API. Docs (checked 2026-10): https://docs.dev.runwayml.com/ai-context.md
//   POST https://api.dev.runwayml.com/v1/text_to_video | /v1/image_to_video · Authorization: Bearer $RUNWAYML_API_SECRET · X-Runway-Version: 2024-11-06
//   gen4.5: ratio 1280:720 | 720:1280, duration 2–10 (both required), promptImage = URL or data URI
//   GET /v1/tasks/{id} → status PENDING|THROTTLED|RUNNING|SUCCEEDED|FAILED|CANCELLED, output[0]
// Original adapter code for ai-video-prompt-hub/videogen.
import { imageInput, snapDuration, firstFrameOf, withNegative } from './util.mjs';

const BASE = 'https://api.dev.runwayml.com';
export default {
  id: 'runway', name: 'Runway', route: 'cloud',
  env: ['RUNWAYML_API_SECRET'], optionalEnv: ['RUNWAY_MODEL'],
  docs: ['https://docs.dev.runwayml.com/ai-context.md', 'https://docs.dev.runwayml.com/guides/using-the-api/'],
  caps: { t2v: true, i2v: true, refImages: 0, durations: [2, 10], ratios: ['16:9', '9:16'], negative: false },
  submit(shot, ctx) {
    const ff = firstFrameOf(shot);
    const body = { model: ctx.model || ctx.env.RUNWAY_MODEL || 'gen4.5', promptText: withNegative(shot).slice(0, 1000), ratio: shot.aspect === '9:16' ? '720:1280' : '1280:720', duration: snapDuration(shot.duration, [2, 10]) };
    if (ff) body.promptImage = imageInput(ff, 'url-or-data', ctx.baseDir);
    return { method: 'POST', url: `${BASE}/v1/${ff ? 'image_to_video' : 'text_to_video'}`, headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ctx.env.RUNWAYML_API_SECRET || '$RUNWAYML_API_SECRET'}`, 'X-Runway-Version': '2024-11-06' }, body };
  },
  parseSubmit: (j) => ({ taskId: j.id }),
  poll: (task, ctx) => ({ method: 'GET', url: `${BASE}/v1/tasks/${task.taskId}`, headers: { Authorization: `Bearer ${ctx.env.RUNWAYML_API_SECRET}`, 'X-Runway-Version': '2024-11-06' } }),
  parsePoll: (j) => (j.status === 'SUCCEEDED' ? { state: 'done', videoUrl: j.output?.[0] } : ['FAILED', 'CANCELLED'].includes(j.status) ? { state: 'failed', error: j.failure || j.failureCode } : { state: 'pending' }),
};
