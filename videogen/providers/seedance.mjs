// 火山方舟 Seedance (Volcengine Ark). Docs (checked 2026-10):
//   https://docs.volcengine.com/docs/ark/create-video-generation-task-api   POST /api/v3/contents/generations/tasks
//   https://docs.volcengine.com/docs/82379/1521309                          GET  /api/v3/contents/generations/tasks/{id}
//   https://docs.volcengine.com/docs/ark/seedance-2-5
// ratio: 16:9 4:3 1:1 3:4 9:16 21:9 adaptive (first-frame tasks must use adaptive); duration: 2.5 → 4–30 s, 2.0 → 4–15 s.
// Result: content.video_url (valid 24 h). Original adapter code for ai-video-prompt-hub/videogen.
import { imageInput, snapDuration, firstFrameOf, refsOf, promptOf } from './util.mjs';

export default {
  id: 'seedance', name: '火山方舟 Seedance', route: 'cloud',
  env: ['ARK_API_KEY'], optionalEnv: ['ARK_BASE_URL', 'SEEDANCE_MODEL'],
  docs: ['https://docs.volcengine.com/docs/ark/create-video-generation-task-api', 'https://docs.volcengine.com/docs/82379/1521309'],
  caps: { t2v: true, i2v: true, refImages: 9, durations: [4, 30], ratios: ['16:9', '4:3', '1:1', '3:4', '9:16', '21:9'], negative: false, audio: 'generate_audio' },
  submit(shot, ctx) {
    const base = ctx.env.ARK_BASE_URL || 'https://ark.cn-beijing.volces.com';
    const model = ctx.model || ctx.env.SEEDANCE_MODEL || 'doubao-seedance-2-5-260628';
    const ff = firstFrameOf(shot);
    const content = [{ type: 'text', text: promptOf(shot) + (shot.negative ? `\n[禁止] ${shot.negative}` : '') }];
    if (ff) content.push({ type: 'image_url', image_url: { url: imageInput(ff, 'url-or-data', ctx.baseDir) }, role: 'first_frame' });
    // first-frame and reference-image are different Ark task types: with a first frame, references are not sent
    if (!ff) for (const r of refsOf(shot)) if (r.role !== 'reference_video') content.push({ type: 'image_url', image_url: { url: imageInput(r, 'url-or-data', ctx.baseDir) }, role: 'reference_image' });
    const is20 = /2-0|2\.0/.test(model);
    return {
      method: 'POST', url: `${base}/api/v3/contents/generations/tasks`,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${ctx.env.ARK_API_KEY || '$ARK_API_KEY'}` },
      body: { model, content, ratio: ff ? 'adaptive' : shot.aspect, duration: snapDuration(shot.duration, is20 ? [4, 15] : [4, 30]), resolution: ctx.resolution || '720p', generate_audio: !!ctx.nativeAudio, watermark: false },
    };
  },
  parseSubmit: (j) => ({ taskId: j.id }),
  poll: (task, ctx) => ({ method: 'GET', url: `${ctx.env.ARK_BASE_URL || 'https://ark.cn-beijing.volces.com'}/api/v3/contents/generations/tasks/${task.taskId}`, headers: { Authorization: `Bearer ${ctx.env.ARK_API_KEY}` } }),
  parsePoll: (j) => (j.status === 'succeeded' ? { state: 'done', videoUrl: j.content?.video_url } : ['failed', 'cancelled', 'expired'].includes(j.status) ? { state: 'failed', error: j.error?.message || j.status } : { state: 'pending' }),
};
