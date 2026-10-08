// Re-exports for adapters. Original code for ai-video-prompt-hub/videogen.
export { imageInput } from '../lib/media.mjs';
export function snapDuration(want, allowed) {
  if (Array.isArray(allowed) && allowed.length !== 2) return allowed.reduce((b, x) => (Math.abs(x - want) < Math.abs(b - want) || (Math.abs(x - want) === Math.abs(b - want) && x > b) ? x : b), allowed[0]);
  const [lo, hi] = allowed;
  return Math.min(hi, Math.max(lo, Math.ceil(want)));
}
export const pick = (want, list) => list.reduce((b, x) => (Math.abs(x - want) < Math.abs(b - want) || (Math.abs(x - want) === Math.abs(b - want) && x > b) ? x : b), list[0]);
export const promptOf = (shot) => (shot.use_en && shot.prompt_en ? shot.prompt_en : shot.prompt_zh);
export const withNegative = (shot) => (shot.negative ? `${promptOf(shot)}\n不要出现：${shot.negative}` : promptOf(shot));
export const refsOf = (shot) => (shot.refs || []).filter((r) => r.path || r.url);
export const firstFrameOf = (shot) => (shot.first_frame && (shot.first_frame.path || shot.first_frame.url) ? shot.first_frame : null);
