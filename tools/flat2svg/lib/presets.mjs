// flat2svg presets — maps friendly names to vtracer CLI args.
// Original for ai-video-prompt-hub (Apache-2.0, © 2026 天机).
// vtracer itself is MIT (visioncortex/vtracer); not vendored — install with: cargo install vtracer

/** @typedef {{ label: string, desc: string, args: string[] }} Preset */

/** @type {Record<string, Preset>} */
export const PRESETS = {
  clean: {
    label: 'clean',
    desc: '扁平色块插画：少颜色、块面干净（推荐定妆/设定图）',
    args: [
      '--colormode', 'color',
      '--mode', 'spline',
      '--hierarchical', 'stacked',
      '--filter_speckle', '8',
      '--color_precision', '5',
      '--gradient_step', '32',
      '--corner_threshold', '60',
      '--segment_length', '8',
      '--splice_threshold', '45',
    ],
  },
  photo: {
    label: 'photo',
    desc: '照片/写实：vtracer 官方 photo 预设（路径多，偏海报化）',
    args: ['--preset', 'photo'],
  },
  'face-safe': {
    label: 'face-safe',
    desc: '保脸：低 filter_speckle，尽量留五官小色块（文件更大）',
    args: [
      '--colormode', 'color',
      '--mode', 'spline',
      '--hierarchical', 'stacked',
      '--filter_speckle', '2',
      '--color_precision', '6',
      '--gradient_step', '16',
      '--corner_threshold', '60',
      '--segment_length', '6',
      '--splice_threshold', '45',
    ],
  },
};

export const PRESET_NAMES = Object.keys(PRESETS);

export function resolvePreset(name) {
  const key = String(name || 'clean').toLowerCase();
  const p = PRESETS[key];
  if (!p) {
    const known = PRESET_NAMES.join(' / ');
    throw new Error(`未知预设「${name}」。可选：${known}`);
  }
  return p;
}
