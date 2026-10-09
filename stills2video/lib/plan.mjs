// Resolve each storyboard shot into a concrete render plan (recipe + overrides + backend). Original code (Apache-2.0, © 2026 天机).
import path from 'node:path';
import { findRecipe } from './recipes.mjs';
import { transitionSpec, XFADE } from '../../videogen/lib/assemble.mjs';

export const PRESET_ZH = { push_in: '镜头缓慢向前推进', pull_out: '镜头缓慢后拉', pan_left: '镜头向左平移', pan_right: '镜头向右平移', tilt_up: '镜头缓慢上摇', tilt_down: '镜头缓慢下摇', orbit: '镜头缓慢环绕主体', dolly_zoom: '希区柯克变焦', drift: '镜头轻微漂浮', sway: '镜头轻轻左右摆动', rise: '镜头上升并前进', kenburns: '画面缓慢推近', static: '镜头固定' };
export const NEGATIVE_ZH = '画面闪烁，突然切镜，人物变形，多余的手指，脸部崩坏，文字，字幕，水印，Logo，静止不动，过曝，模糊';
// (xfade 'dissolve' is a noisy pixel dither — available by name, not used automatically)
const AUTO_TRANSITIONS = ['fade', 'smoothup', 'smoothleft', 'circleopen', 'fadeblack'];

/** Which transition goes after shot i: explicit > recipe > storyboard default > rotation. Pure. */
export function pickTransition(shot, R, sb, i) {
  if (shot.transition) return shot.transition;
  const def = sb.transition;
  if (def && def !== 'auto') return def;
  if (R?.transition) return R.transition;
  return AUTO_TRANSITIONS[i % AUTO_TRANSITIONS.length];
}

/** Shot → plan used by every backend. `extra` seconds are rendered beyond the planned length so the
 *  assembler can trim instead of freezing (voice may run a little longer than estimated; transitions overlap). */
export function resolveShot(shot, sb, i, o = {}) {
  const R = shot.recipe ? findRecipe(shot.recipe) : null;
  const motion = { amount: 1, ease: 'sine', ...(R?.motion || {}), ...(shot.motion || {}) };
  if (!motion.preset) motion.preset = 'push_in';
  let transition = pickTransition(shot, R, sb, i);
  // FLF2V bridge after this shot: it starts on our last frame, so hard-cut into it — unless the bridge can't be made
  // (CPU backend / not generated), in which case the normal transition is kept. o.bridges(j) → will shot j exist?
  const nx = sb.shots[i + 1];
  if (nx?.bridge && (o.bridges ? o.bridges(i + 1) : true)) transition = 'cut';
  if (o.noHuashu && String(transition).startsWith('huashu:')) transition = 'fade';
  const tr = i < sb.shots.length - 1 ? transitionSpec(transition) : null;
  const loop = shot.loop ?? R?.loop ?? false;
  const prompt = [shot.prompt || R?.i2v_prompt || `${PRESET_ZH[motion.preset] || ''}，画面主体保持稳定，自然的细微运动`, '画面稳定，不要切镜'].filter(Boolean).join('；');
  return {
    id: shot.id, index: i, image: shot.image ? path.resolve(o.baseDir || '.', shot.image) : null, last_image: shot.last_frame?.path ? path.resolve(o.baseDir || '.', shot.last_frame.path) : null,
    duration: shot.duration, renderSeconds: +(shot.duration + (tr?.dur || 0) + (o.extra ?? 0.4)).toFixed(2),
    recipe: R?.id || null, recipeName: R?.name || null,
    motion, overlays: shot.overlays ?? R?.overlays ?? [], fx: shot.fx ?? R?.fx ?? [], flow: shot.flow ?? R?.flow ?? null, loop,
    transition: tr ? (XFADE.includes(tr.type) || tr.type.startsWith('huashu:') ? transition : 'fade') : null,
    prompt, negative: shot.negative || NEGATIVE_ZH,
    backend: shot.backend || o.backend || 'cpu',
    lines: shot.lines || [],
  };
}
