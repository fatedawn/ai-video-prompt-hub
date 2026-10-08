// Optional style presets (prompt text for AI image generation). Original code for ai-video-prompt-hub/animator.
// Data: presets/handdrawn-styles.json, a text-only subset derived from gnipbao/story-to-handdrawn-video (MIT),
// whose entries are largely adapted from yang0/handraw-style (MIT) and threerocks/hand-drawn-styles (MIT).
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { readStructured } from './project.mjs';

const FILE = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'presets', 'handdrawn-styles.json');

/** Suggest the closest built-in renderer medium for a preset (heuristic, by category and name). */
export function suggestMedia(s) {
  const t = `${s.name_zh} ${s.name_en} ${s.summary || ''}`;
  if (/彩铅|colou?red[- ]pencil/i.test(t)) return 'colored-pencil';
  if (/蜡笔|crayon|油画棒|pastel/i.test(t)) return 'crayon';
  if (/马克|marker|毡尖/i.test(t)) return 'marker';
  if (/水墨|墨|ink|钢笔/i.test(t)) return 'ink';
  if (/铅笔|素描|graphite|pencil/i.test(t)) return 'pencil';
  if (/水彩|水粉|绘本|watercolou?r|gouache|storybook/i.test(t)) return 'picture-book';
  return { crayon: 'crayon', ink: 'ink', watercolor: 'picture-book', gouache: 'picture-book', line: 'pencil', diary: 'colored-pencil' }[s.category] || 'crayon';
}

export function loadPresets() { return JSON.parse(fs.readFileSync(FILE, 'utf8')); }

export function findStyle(lib, id) {
  const k = String(id).toLowerCase();
  return lib.styles.find((s) => s.id.toLowerCase() === k || (s.aliases || []).some((a) => a.toLowerCase() === k)) || lib.palettes.find((p) => p.id.toLowerCase() === k);
}

export function stylesCmd(a) {
  const lib = loadPresets();
  if (a.show) {
    const s = findStyle(lib, a.show);
    if (!s) throw new Error('找不到画风: ' + a.show);
    if (s.prompt) { console.log(`${s.id} ${s.name_zh}（配色）\n${s.prompt}`); return; }
    console.log(`${s.id} · ${s.name_zh} / ${s.name_en}   分类: ${s.category}   建议渲染画材: ${suggestMedia(s)}`);
    console.log(`适用: ${(s.best_for || []).join('、')}\n摘要: ${s.summary}\n`);
    let charPart = '';
    if (a.character) {
      const ch = readStructured(path.resolve(String(a.character)));
      charPart = `\n角色（保持与设定一致）：${ch.description || ''} ${ch.prompt || ''}\n画出角色设定图：正面、侧面、背面 + 开心/惊讶/说话三个表情，白底，同一套服装与比例。`;
    }
    console.log('—— 可直接用于 AI 生图的提示词 ——');
    console.log([...(s.prompt_blocks || []), s.color_hint ? '配色：' + s.color_hint : '', s.avoid ? 'Avoid: ' + s.avoid : ''].filter(Boolean).join('\n') + charPart);
    console.log(`\n出处：${s.origin?.url || 'gnipbao/story-to-handdrawn-video'}（MIT），经 gnipbao/story-to-handdrawn-video 整理。`);
    return;
  }
  let list = lib.styles;
  if (a.featured) list = list.filter((s) => s.featured);
  if (a.category) list = list.filter((s) => s.category === a.category);
  if (a.search) {
    const k = String(a.search).toLowerCase();
    list = list.filter((s) => [s.id, s.name_zh, s.name_en, s.summary, ...(s.aliases || [])].join(' ').toLowerCase().includes(k));
  }
  for (const s of list) console.log(`${s.id.padEnd(28)} ${s.name_zh}  [${s.category} → ${suggestMedia(s)}]`);
  console.log(`\n共 ${list.length} 条（总库 ${lib.styles.length} 画风 + ${lib.palettes.length} 配色）。用 --show <id> 查看完整提示词，--character <character.json> 生成角色设定图提示词。`);
}
