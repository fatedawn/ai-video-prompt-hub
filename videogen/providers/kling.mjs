// 可灵 Kling (new API design, model in path). Docs (checked 2026-10):
//   https://kling.ai/document-api/api/get-started/authentication        Authorization: Bearer <API key>
//   https://kling.ai/document-api/api/video/3-0-omni/text-to-video       POST /text-to-video/kling-3.0
//   https://kling.ai/document-api/api/video/3-0-omni/image-to-video      POST /image-to-video/kling-3.0 (contents: prompt / first_frame / last_frame / element)
//   GET /tasks?task_ids=<id>  → data[0].status (submitted|processing|succeeded|failed), data[0].outputs[{type:'video', url}]
// settings: aspect_ratio 16:9 9:16 1:1 · duration 3–15 · resolution 720p/1080p/4k · audio native/off · multi_shot.
// Character consistency = Kling "Elements" (create in the console/API, then put element_id on a ref).
// Original adapter code for ai-video-prompt-hub/videogen.
import { imageInput, snapDuration, firstFrameOf, refsOf, withNegative } from './util.mjs';

const base = (env) => env.KLING_BASE_URL || 'https://api-singapore.klingai.com';
export default {
  id: 'kling', name: '可灵 Kling', route: 'cloud',
  env: ['KLING_API_KEY'], optionalEnv: ['KLING_BASE_URL', 'KLING_MODEL'],
  docs: ['https://kling.ai/document-api/api/video/3-0-omni/text-to-video', 'https://kling.ai/document-api/api/video/3-0-omni/image-to-video'],
  caps: { t2v: true, i2v: true, refImages: '3 Elements（需先建）', durations: [3, 15], ratios: ['16:9', '9:16', '1:1'], negative: false, audio: 'settings.audio' },
  submit(shot, ctx) {
    const model = ctx.model || ctx.env.KLING_MODEL || 'kling-3.0';
    const ff = firstFrameOf(shot);
    const elements = refsOf(shot).filter((r) => r.kling_element_id);
    const settings = { aspect_ratio: ['16:9', '9:16', '1:1'].includes(shot.aspect) ? shot.aspect : '16:9', duration: snapDuration(shot.duration, [3, 15]), resolution: ctx.resolution || '720p', audio: ctx.nativeAudio ? 'native' : 'off', multi_shot: false };
    const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${ctx.env.KLING_API_KEY || '$KLING_API_KEY'}` };
    if (!ff && !elements.length) return { method: 'POST', url: `${base(ctx.env)}/text-to-video/${model}`, headers, body: { prompt: withNegative(shot), settings, options: { external_task_id: shot.id } } };
    const contents = [{ type: 'prompt', text: withNegative(shot) }];
    if (ff) contents.push({ type: 'first_frame', url: imageInput(ff, 'url-or-data', ctx.baseDir) });
    elements.slice(0, 3).forEach((r, i) => contents.push({ type: 'element', element_id: r.kling_element_id, id: r.kling_id || String(i + 1) }));
    return { method: 'POST', url: `${base(ctx.env)}/image-to-video/${model}`, headers, body: { contents, settings, options: { external_task_id: shot.id } } };
  },
  parseSubmit: (j) => ({ taskId: j.data?.id }),
  poll: (task, ctx) => ({ method: 'GET', url: `${base(ctx.env)}/tasks?task_ids=${encodeURIComponent(task.taskId)}`, headers: { Authorization: `Bearer ${ctx.env.KLING_API_KEY}` } }),
  parsePoll(j) {
    const t = Array.isArray(j.data) ? j.data[0] : j.data;
    if (!t) return { state: 'pending' };
    if (t.status === 'succeeded') return { state: 'done', videoUrl: (t.outputs || []).find((o) => o.type === 'video')?.url };
    if (t.status === 'failed') return { state: 'failed', error: t.message };
    return { state: 'pending' };
  },
};
