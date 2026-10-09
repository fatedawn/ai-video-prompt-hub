// Per-page Chinese image prompts for ChatGPT Images (or any text-to-image tool). Original work, Apache-2.0, © 2026 天机.
// Workflow idea ("one AI picture per page, then narrate") credited to banana-slides (AGPL — idea only, no text/code used).
import { plainText } from './parse.mjs';

const STYLE = {
  tianji: '深夜蓝底、金色点缀的科普插画，水墨晕染的天空质感，干净留白，电影感柔光',
  paper: '暖米色纸张质感的手绘科普插画，彩铅和水彩，温暖、亲切',
  chalk: '黑板粉笔画风格的科学示意插画，粉笔线条，深绿色背景',
  clean: '简洁扁平的现代科普插画，白底，蓝色主色，信息图风格',
};
const RATIO = { '9:16': '竖版 9:16', '16:9': '横版 16:9', '1:1': '方形 1:1' };
const SPACE = { 'image-right': '图片会放在页面右侧/上方的卡片里，主体居中', 'image-left': '图片会放在页面左侧/上方的卡片里，主体居中', 'image-top': '图片在上方卡片，主体居中', 'image-full': '整页背景：下方 40% 保持干净、偏暗或偏亮的大面积色块，留给文字', default: '主体居中，四周留白' };

const trim = (s) => String(s).replace(/[。！？.!?；;，,：:\s]+$/u, '');

export function pagePrompts(deck, { all = false } = {}) {
  const { meta } = deck;
  const out = [];
  for (const p of deck.pages) {
    const needs = p.meta.image || all || ['image-right', 'image-left', 'image-top', 'image-full'].includes(p.layout);
    if (!needs) continue;
    const title = plainText(p.elements.find((e) => ['title', 'heading'].includes(e.kind))?.text || meta.title || '');
    const points = p.elements.filter((e) => ['bullet', 'text'].includes(e.kind)).map((e) => plainText(e.text)).slice(0, 3);
    const say = p.say.map((s) => s.text).join('').slice(0, 80);
    const subject = p.meta.image_prompt || [title, ...points].filter(Boolean).join('；');
    const file = p.meta.image || `${String(p.index).padStart(2, '0')}.png`;
    const prompt = [`${RATIO[meta.aspect] || '竖版 9:16'}${SPACE[p.layout] ? '，' + (SPACE[p.layout] || SPACE.default) : ''}。`,
      `画面主题：${trim(subject)}。`, say ? `这一页讲的是：${trim(say)}。用一个直观的画面表现它（比喻、现象或示意图），科学上不要画错。` : '',
      `风格：${STYLE[meta.theme] || STYLE.clean}。`,
      '画面里不要出现任何文字、字母、数字、公式、水印或 logo（文字由视频后期叠加）。不要真实人物的脸，不要品牌和受版权保护的角色。'].filter(Boolean).join('');
    out.push({ page: p.index, file, layout: p.layout, prompt });
  }
  return out;
}

export function promptsMarkdown(deck, list) {
  return [`# 出图提示词：${deck.meta.title || '未命名'}`, '', `按页在 ChatGPT（Images）里逐条出图，下载后按「文件名」保存到图片目录（make 时用 --images 指定）。`,
    '生成的图仅作示意，发布时按平台规则标注「AI 生成」。', '',
    ...list.flatMap((x) => [`## 第 ${x.page} 页 → \`${x.file}\`（${x.layout}）`, '', '```text', x.prompt, '```', ''])].join('\n');
}
