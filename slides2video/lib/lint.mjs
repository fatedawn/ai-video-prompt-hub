// Static deck checks (pure). Original work, Apache-2.0, © 2026 天机.
// Rules come from our science-explainer script method (skills/ai-video-director/references/methods.md):
// one idea per page, ≤4 builds per page, ~4–5 spoken chars/s, captions short, no long static stretches.
import { plainText } from './parse.mjs';
import { longestStatic } from './timeline.mjs';

export function lintDeck(deck, tl) {
  const out = [];
  const portrait = deck.meta.aspect === '9:16';
  const W = (level, page, msg) => out.push({ level, page, msg });
  const ids = new Map();
  for (const p of deck.pages) {
    const bullets = p.elements.filter((e) => e.kind === 'bullet');
    const content = p.elements.filter((e) => !['title', 'heading', 'subheading'].includes(e.kind));
    if (!p.say.length && !p.meta.duration && p.index !== 1) W('warn', p.index, '这一页没有 `> say:` 旁白，会按 2.6 秒静默停留');
    if (bullets.length > 4) W('warn', p.index, `要点 ${bullets.length} 条（建议 ≤4，一页一个想法）`);
    if (content.length > 5) W('warn', p.index, `元素 ${content.length} 个，画面可能太挤`);
    for (const e of p.elements) {
      const len = [...plainText(e.text || '')].length;
      if (e.kind === 'title' && len > (portrait ? 18 : 24)) W('warn', p.index, `标题 ${len} 字（建议 ≤${portrait ? 18 : 24}）：标题就是结论句，短一点`);
      if (e.kind === 'bullet' && len > (portrait ? 22 : 30)) W('info', p.index, `要点「${plainText(e.text).slice(0, 10)}…」${len} 字，会折行`);
      if (e.id) { const k = `${p.index}:${e.id}`; if (ids.has(k)) W('error', p.index, `同一页有重复 id「${e.id}」`); ids.set(k, 1); }
    }
    if (p.meta.transition === 'morph' && p.index > 1) {
      const prev = new Set(deck.pages[p.index - 2].elements.filter((e) => e.id).map((e) => String(e.id)));
      if (!p.elements.some((e) => e.id && prev.has(String(e.id)))) W('warn', p.index, 'transition: morph 但和上一页没有相同 id 的元素，只会淡入淡出');
    }
    for (const s of p.say) {
      const n = [...s.text].filter((c) => !/[\s，。！？、；：,.!?;:“”「」]/.test(c)).length;
      if (n > (portrait ? 34 : 44)) W('info', p.index, `旁白一句 ${n} 字：字幕会两行，可拆成两句 say`);
    }
  }
  if (tl) {
    for (const p of tl.pages) {
      const spoken = p.cues.reduce((a, c) => a + [...c.text].filter((ch) => !/[\s，。！？、；：,.!?;:]/.test(ch)).length, 0);
      const secs = p.cues.reduce((a, c) => a + (c.end - c.start), 0);
      if (secs > 0 && spoken / secs > 6.2) W('warn', p.index, `语速 ${(spoken / secs).toFixed(1)} 字/秒，偏快（中文讲解约 4–5.5 字/秒）`);
      for (const e of p.elements) if (e.t > p.end - 0.35) W('warn', p.index, `「${(e.text || e.kind).slice(0, 10)}」在页尾才出现（检查 at；注意 at 写纯数字表示“本页第几秒”）`);
    }
    const st = longestStatic(tl);
    if (st.gap > 6) W('warn', null, `${st.at}s 起有 ${st.gap}s 画面没有新变化（加一条 build / mark / 拆页）`);
    const dur = tl.duration;
    if (dur > 0) out.push({ level: 'info', page: null, msg: `总时长 ${dur.toFixed(1)}s，${tl.pages.length} 页，${tl.cues.length} 句旁白，最长静止 ${st.gap}s` });
  }
  return out;
}
