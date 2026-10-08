// Built-in prop library. All drawings below are original, hand-written SVG for ai-video-prompt-hub/animator.
// viewBox is 0 0 200 200 unless noted; (100,100) is the element origin used for placement/rotation.
// Colour placeholders: {line} outline, {c1} main fill, {c2} secondary fill, {c3} accent.

const S = (body, vb = '0 0 200 200') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" fill="none" stroke-linecap="round" stroke-linejoin="round">${body}</svg>`;

export const SHAPES = {
  ground: {
    colors: { line: '#6b8f3a', c1: '#b9d98a' },
    origin: [100, 100],
    svg: S(`<path d="M-120 100 C -40 92, 30 108, 100 98 S 250 92, 320 101 L 320 140 L -120 140 Z" fill="{c1}" stroke="{line}" stroke-width="3"/>`, '-120 60 440 90'),
  },
  hill: {
    colors: { line: '#5f8a3c', c1: '#a8d08d' },
    svg: S(`<path d="M0 160 C 40 80, 90 60, 120 90 C 140 70, 180 80, 200 160 Z" fill="{c1}" stroke="{line}" stroke-width="3"/>`),
  },
  grass: {
    colors: { line: '#4f8a2e' },
    svg: S(`<path d="M70 150 Q 72 120 64 104 M84 150 Q 86 116 92 98 M98 150 Q 99 124 108 112 M112 150 Q 118 118 126 106 M126 150 Q 128 130 140 120" stroke="{line}" stroke-width="4"/>`),
  },
  house: {
    colors: { line: '#5a3b2a', c1: '#f3d9a4', c2: '#d9543f', c3: '#7fb2d9' },
    svg: S(`
      <path d="M45 95 L45 175 L155 175 L155 95" fill="{c1}" stroke="{line}" stroke-width="3.5"/>
      <path d="M30 100 L100 35 L170 100 Z" fill="{c2}" stroke="{line}" stroke-width="3.5"/>
      <path d="M86 175 L86 128 Q 100 118 114 128 L114 175" fill="#c98b52" stroke="{line}" stroke-width="3"/>
      <circle cx="108" cy="152" r="2.5" fill="{line}" stroke="{line}" stroke-width="1"/>
      <rect x="56" y="112" width="22" height="22" rx="3" fill="{c3}" stroke="{line}" stroke-width="3"/>
      <rect x="124" y="112" width="22" height="22" rx="3" fill="{c3}" stroke="{line}" stroke-width="3"/>
      <path d="M128 55 L128 30 L142 30 L142 68" fill="#b5785a" stroke="{line}" stroke-width="3"/>`),
  },
  sun: {
    colors: { line: '#e2851f', c1: '#ffcf3f' },
    svg: S(`
      <circle cx="100" cy="100" r="36" fill="{c1}" stroke="{line}" stroke-width="4"/>
      <path d="M100 48 L100 30 M100 152 L100 170 M48 100 L30 100 M152 100 L170 100 M63 63 L50 50 M137 63 L150 50 M63 137 L50 150 M137 137 L150 150" stroke="{line}" stroke-width="5"/>
      <path d="M86 98 Q 89 93 92 98 M108 98 Q 111 93 114 98 M88 112 Q 100 122 112 112" stroke="#9a4b12" stroke-width="3"/>`),
  },
  cloud: {
    colors: { line: '#7fa6c9', c1: '#e3eef8' },
    svg: S(`<path d="M40 130 C 20 130, 18 100, 42 98 C 40 72, 74 62, 88 82 C 98 58, 140 60, 142 88 C 168 84, 182 112, 160 128 C 156 136, 140 136, 132 132 L 50 134 C 46 134, 42 132, 40 130 Z" fill="{c1}" stroke="{line}" stroke-width="3.5"/>`),
  },
  tree: {
    colors: { line: '#4a3a24', c1: '#7cc26b', c2: '#9a6a3f', c3: '#f6a5c0' },
    svg: S(`
      <path d="M90 196 C 92 170, 92 150, 86 128 L 114 128 C 108 150, 108 172, 112 196 Z" fill="{c2}" stroke="{line}" stroke-width="3.5"/>
      <path d="M100 132 C 60 140, 26 118, 34 88 C 18 66, 40 36, 66 42 C 74 18, 120 12, 134 36 C 160 30, 184 56, 170 82 C 186 106, 160 140, 128 130 C 120 140, 108 140, 100 132 Z" fill="{c1}" stroke="{line}" stroke-width="3.5"/>
      <g fill="{c3}" stroke="#c45a86" stroke-width="2">
        <circle cx="60" cy="70" r="6"/><circle cx="92" cy="48" r="6"/><circle cx="130" cy="58" r="6"/>
        <circle cx="152" cy="92" r="6"/><circle cx="76" cy="104" r="6"/><circle cx="116" cy="96" r="6"/><circle cx="48" cy="96" r="5"/>
      </g>`),
  },
  apple: {
    colors: { line: '#7a1f1a', c1: '#e8402f', c2: '#5ea83f' },
    svg: S(`
      <path d="M100 76 C 82 62, 54 70, 56 102 C 58 132, 82 150, 100 140 C 118 150, 142 132, 144 102 C 146 70, 118 62, 100 76 Z" fill="{c1}" stroke="{line}" stroke-width="4"/>
      <path d="M100 76 C 100 66, 102 58, 106 52" stroke="#5a3b2a" stroke-width="4"/>
      <path d="M106 62 C 116 50, 132 52, 136 58 C 126 68, 114 68, 106 62 Z" fill="{c2}" stroke="#3f7a2a" stroke-width="3"/>
      <path d="M72 96 Q 74 86 82 82" stroke="#ffffff" stroke-width="4" opacity="0.8"/>`),
  },
  flower: {
    colors: { line: '#9a3f6a', c1: '#ffb3cf', c2: '#ffd84a', c3: '#5ea83f' },
    svg: S(`
      <path d="M100 110 C 100 140, 98 160, 100 185" stroke="{c3}" stroke-width="4"/>
      <path d="M100 160 C 112 150, 126 152, 130 158 C 120 166, 108 166, 100 160 Z" fill="{c3}" stroke="#3f7a2a" stroke-width="2.5"/>
      <g fill="{c1}" stroke="{line}" stroke-width="3"><circle cx="100" cy="78" r="14"/><circle cx="122" cy="96" r="14"/><circle cx="112" cy="122" r="14"/><circle cx="88" cy="122" r="14"/><circle cx="78" cy="96" r="14"/></g>
      <circle cx="100" cy="102" r="11" fill="{c2}" stroke="#c98b1a" stroke-width="3"/>`),
  },
  heart: {
    colors: { line: '#b52a4a', c1: '#ff6f8f' },
    svg: S(`<path d="M100 160 C 60 130, 36 104, 44 78 C 52 54, 86 52, 100 76 C 114 52, 148 54, 156 78 C 164 104, 140 130, 100 160 Z" fill="{c1}" stroke="{line}" stroke-width="4"/>`),
  },
  star: {
    colors: { line: '#d18a12', c1: '#ffd84a' },
    svg: S(`<path d="M100 40 L116 82 L160 84 L126 112 L138 156 L100 132 L62 156 L74 112 L40 84 L84 82 Z" fill="{c1}" stroke="{line}" stroke-width="4"/>`),
  },
  sparkle: {
    colors: { line: '#e2a21f' },
    svg: S(`<path d="M100 60 L100 140 M60 100 L140 100 M76 76 L124 124 M124 76 L76 124" stroke="{line}" stroke-width="5"/>`),
  },
  wind: {
    colors: { line: '#7aa9cf' },
    svg: S(`
      <path d="M20 80 C 70 76, 120 84, 150 74 C 172 66, 170 40, 150 42 C 136 44, 138 60, 150 60" stroke="{line}" stroke-width="4"/>
      <path d="M10 112 C 60 106, 110 118, 168 110 C 190 106, 192 86, 176 84" stroke="{line}" stroke-width="4"/>
      <path d="M36 144 C 76 140, 110 148, 136 142 C 152 138, 154 122, 142 122" stroke="{line}" stroke-width="4"/>`),
  },
  road: {
    colors: { line: '#9a7a52', c1: '#ead7b0' },
    svg: S(`<path d="M30 200 C 70 160, 110 140, 120 110 C 126 92, 150 80, 190 76 L 196 84 C 160 92, 142 104, 138 120 C 128 152, 100 176, 90 200 Z" fill="{c1}" stroke="{line}" stroke-width="3"/>`),
  },
  lane: {
    colors: { line: '#a9865a', c1: '#efdcb4' },
    svg: S(`<path d="M0 104 C 50 96, 120 116, 200 100 L 200 118 C 120 134, 50 114, 0 124 Z" fill="{c1}" stroke="{line}" stroke-width="2.5"/>`, '0 90 200 50'),
  },
  bird: {
    colors: { line: '#3b3b48' },
    svg: S(`<path d="M60 100 Q 80 78 100 100 Q 120 78 140 100" stroke="{line}" stroke-width="5"/>`),
  },
  bush: {
    colors: { line: '#3f7a2a', c1: '#8fcf6f' },
    svg: S(`<path d="M30 150 C 20 120, 50 100, 70 112 C 76 86, 120 84, 128 108 C 148 96, 182 116, 170 150 Z" fill="{c1}" stroke="{line}" stroke-width="3.5"/>`),
  },
  bubble: {
    colors: { line: '#3b3b48', c1: '#ffffff' },
    svg: S(`<path d="M40 60 C 40 40, 60 30, 100 30 C 140 30, 162 40, 162 64 C 162 92, 140 102, 100 102 L 82 102 L 62 126 L 66 100 C 48 96, 40 84, 40 60 Z" fill="{c1}" stroke="{line}" stroke-width="3.5"/>`),
  },
  basket: {
    colors: { line: '#6b4423', c1: '#d8a865' },
    svg: S(`<path d="M50 100 L150 100 L138 160 L62 160 Z" fill="{c1}" stroke="{line}" stroke-width="3.5"/><path d="M60 100 C 60 50, 140 50, 140 100" stroke="{line}" stroke-width="4"/><path d="M58 120 L142 120 M60 140 L140 140" stroke="{line}" stroke-width="2.5"/>`),
  },
  paper: {
    colors: { line: '#6b5a45', c1: '#fffaf0', c2: '#c9b89a', c3: '#e2603f' },
    svg: S(`
      <path d="M38 22 L 150 18 L 170 40 L 166 182 L 34 180 Z" fill="{c1}" stroke="{line}" stroke-width="3.5"/>
      <path d="M150 18 L 148 42 L 170 40" fill="{c2}" stroke="{line}" stroke-width="3"/>
      <path d="M54 62 L 140 60 M54 88 L 148 86 M54 114 L 128 112 M54 140 L 144 138" stroke="{c2}" stroke-width="5"/>
      <path d="M46 62 L 46 62 M46 88 L 46 88" stroke="{c3}" stroke-width="7"/>`),
  },
  frame: {
    colors: { line: '#6b5a45', c1: '#fffdf6' },
    svg: S(`<path d="M22 30 C 70 24, 130 26, 178 30 C 182 80, 180 130, 176 172 C 130 176, 70 176, 24 172 C 20 130, 18 80, 22 30 Z" fill="{c1}" stroke="{line}" stroke-width="3.5"/>`),
  },
  terminal: {
    colors: { line: '#2b2d42', c1: '#2f3347', c2: '#e9e4d6', c3: '#7bd389' },
    svg: S(`
      <path d="M18 40 C 18 34, 22 30, 28 30 L 172 30 C 178 30, 182 34, 182 40 L 182 162 C 182 168, 178 172, 172 172 L 28 172 C 22 172, 18 168, 18 162 Z" fill="{c1}" stroke="{line}" stroke-width="4"/>
      <path d="M18 56 L 182 56 L 182 40 C 182 34, 178 30, 172 30 L 28 30 C 22 30, 18 34, 18 40 Z" fill="{c2}" stroke="{line}" stroke-width="3.5"/>
      <circle cx="34" cy="43" r="5" fill="#ef6f5e" stroke="{line}" stroke-width="2"/>
      <circle cx="50" cy="43" r="5" fill="#f5c451" stroke="{line}" stroke-width="2"/>
      <circle cx="66" cy="43" r="5" fill="#7bd389" stroke="{line}" stroke-width="2"/>
      <path d="M34 82 L 46 92 L 34 102" stroke="{c3}" stroke-width="5"/>
      <path d="M52 150 L 70 150" stroke="{c3}" stroke-width="5"/>`),
  },
  arrow: {
    colors: { line: '#e2603f' },
    svg: S(`<path d="M24 128 C 60 70, 128 66, 168 104" stroke="{line}" stroke-width="7"/><path d="M146 96 L 170 106 L 162 80" stroke="{line}" stroke-width="7"/>`),
  },
  bulb: {
    colors: { line: '#b9831f', c1: '#ffe27a', c2: '#c9c2b5' },
    svg: S(`
      <path d="M100 30 C 66 30, 50 58, 56 84 C 60 102, 76 112, 80 132 L 120 132 C 124 112, 140 102, 144 84 C 150 58, 134 30, 100 30 Z" fill="{c1}" stroke="{line}" stroke-width="4"/>
      <path d="M82 140 L 118 140 L 116 160 C 108 168, 92 168, 84 160 Z" fill="{c2}" stroke="{line}" stroke-width="3.5"/>
      <path d="M90 104 Q 94 80 100 104 Q 106 80 110 104" stroke="{line}" stroke-width="3"/>
      <path d="M100 6 L 100 16 M40 30 L 48 38 M160 30 L 152 38 M22 84 L 34 84 M178 84 L 166 84" stroke="{line}" stroke-width="4"/>`),
  },
  check: {
    colors: { line: '#3f8f4f' },
    svg: S(`<path d="M48 104 L 84 140 L 156 58" stroke="{line}" stroke-width="12"/>`),
  },

};

/** Fill colour placeholders and return final SVG markup plus origin. */
export function shapeMarkup(name, colors = {}) {
  const def = SHAPES[name];
  if (!def) throw new Error(`未知的内置图形: ${name}（可用：${Object.keys(SHAPES).join(', ')}）`);
  const c = { ...def.colors, ...colors };
  const svg = def.svg.replace(/\{(\w+)\}/g, (m, k) => c[k] || '#888888');
  return { svg, origin: def.origin || null };
}
