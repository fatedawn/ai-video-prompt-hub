// Media helpers (ffprobe, image encoding). Original code for ai-video-prompt-hub/videogen.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };
export const mimeOf = (f) => MIME[path.extname(f).toLowerCase()] || 'application/octet-stream';
export const b64 = (f) => fs.readFileSync(f).toString('base64');
export const dataUri = (f) => `data:${mimeOf(f)};base64,${b64(f)}`;

/** A ref is {path} (local file) or {url} (public URL). Returns what a provider wants. */
export function imageInput(ref, mode, baseDir = '.') {
  if (!ref) return null;
  if (ref.url) {
    if (mode === 'base64' || mode === 'inline') throw new Error(`该接口需要直接上传图片内容，请给 ${ref.tag || '参考图'} 填本地 path（现在是 url）`);
    return ref.url;
  }
  const f = path.resolve(baseDir, ref.path);
  if (!fs.existsSync(f)) throw new Error(`参考图不存在：${f}`);
  if (mode === 'url') throw new Error(`该接口只接受公网图片 URL：请把 ${path.basename(f)} 上传到图床/对象存储，在 shots.json 的 refs 里填 url`);
  if (mode === 'base64') return b64(f);
  if (mode === 'inline') return { mimeType: mimeOf(f), data: b64(f) };
  return dataUri(f); // 'url-or-data'
}

export function probe(file) {
  const r = spawnSync('ffprobe', ['-v', 'error', '-show_entries', 'stream=codec_type,width,height,r_frame_rate:stream_side_data=rotation:format=duration', '-of', 'json', file], { encoding: 'utf8' });
  if (r.status !== 0) throw new Error(`无法读取视频：${file}\n${r.stderr}`);
  const j = JSON.parse(r.stdout);
  const v = (j.streams || []).find((s) => s.codec_type === 'video');
  const a = (j.streams || []).find((s) => s.codec_type === 'audio');
  let w = v?.width, h = v?.height;
  const rot = Math.abs(v?.side_data_list?.[0]?.rotation || 0);
  if (rot === 90 || rot === 270) [w, h] = [h, w];
  const [n, d] = (v?.r_frame_rate || '0/1').split('/').map(Number);
  return { duration: +j.format?.duration || 0, width: w, height: h, fps: d ? n / d : 0, hasVideo: !!v, hasAudio: !!a };
}

export const ratioNum = (aspect) => { const [a, b] = aspect.split(':').map(Number); return a / b; };

export function run(cmd, args, opts = {}) {
  const r = spawnSync(cmd, args, { encoding: 'utf8', maxBuffer: 1 << 26, ...opts });
  if (r.status !== 0) throw new Error(`${cmd} 失败：${(r.stderr || '').split('\n').slice(-6).join('\n')}`);
  return r.stdout;
}
