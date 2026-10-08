// MiniMax 海螺 Hailuo — V2 video API. Docs (checked 2026-10):
//   https://platform.minimax.io/docs/api-reference/video-generation-v2-create   POST /v2/video_generation (content[] text/image_url with role)
//   https://platform.minimax.io/docs/api-reference/video-generation-v2-query    GET  /v2/query/video_generation/{task_id} → task.status, task.content.url
// MiniMax-H3: 768P/2K, 4–15 s; first_frame → ratio is always adaptive. China mainland accounts: MINIMAX_BASE_URL=https://api.minimaxi.com
// Original adapter code for ai-video-prompt-hub/videogen.
import { imageInput, snapDuration, firstFrameOf, refsOf, withNegative } from './util.mjs';

const base = (env) => env.MINIMAX_BASE_URL || 'https://api.minimax.io';
export default {
  id: 'minimax', name: 'MiniMax 海螺', route: 'cloud',
  env: ['MINIMAX_API_KEY'], optionalEnv: ['MINIMAX_BASE_URL', 'MINIMAX_MODEL'],
  docs: ['https://platform.minimax.io/docs/api-reference/video-generation-v2-create', 'https://platform.minimax.io/docs/api-reference/video-generation-v2-query'],
  caps: { t2v: true, i2v: true, refImages: 9, durations: [4, 15], ratios: ['16:9', '9:16', '1:1', 'adaptive'], negative: false },
  submit(shot, ctx) {
    const ff = firstFrameOf(shot);
    const content = [{ type: 'text', text: withNegative(shot) }];
    if (ff) content.push({ type: 'image_url', image_url: { url: imageInput(ff, 'url-or-data', ctx.baseDir) }, role: 'first_frame' });
    if (!ff) for (const r of refsOf(shot)) if (r.role !== 'reference_video') content.push({ type: 'image_url', image_url: { url: imageInput(r, 'url-or-data', ctx.baseDir) }, role: 'reference_image' });
    return {
      method: 'POST', url: `${base(ctx.env)}/v2/video_generation`,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ctx.env.MINIMAX_API_KEY || '$MINIMAX_API_KEY'}` },
      body: { model: ctx.model || ctx.env.MINIMAX_MODEL || 'MiniMax-H3', content, duration: snapDuration(shot.duration, [4, 15]), resolution: ctx.resolution || '768P', ratio: ff ? 'adaptive' : shot.aspect },
    };
  },
  parseSubmit: (j) => ({ taskId: j.task_id || j.task?.id || j.id }),
  poll: (task, ctx) => ({ method: 'GET', url: `${base(ctx.env)}/v2/query/video_generation/${task.taskId}`, headers: { Authorization: `Bearer ${ctx.env.MINIMAX_API_KEY}` } }),
  parsePoll(j) {
    const t = j.task || j;
    if (t.status === 'succeeded') return { state: 'done', videoUrl: t.content?.url };
    if (['failed', 'cancelled'].includes(t.status)) return { state: 'failed', error: t.error?.message || t.status };
    return { state: 'pending' };
  },
};
