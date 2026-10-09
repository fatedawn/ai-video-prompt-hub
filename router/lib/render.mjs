// Markdown rendering for plans and the catalog (original work, Apache-2.0).
const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const LC = { permissive: '宽松', copyleft: '传染性', noncommercial: '⚠️非商用', 'source-available': '有条件', none: '⚠️无许可证' };
const ZH = { native: '中文', bilingual: '中英', en: '英文' };
export const costZh = (c) => c.map((x) => ({ 'free-cpu': '免费CPU', gpu: 'GPU', 'api-key': 'API key', 'web-manual': '网页手动', 'agent-llm': 'Agent额度' }[x] || x)).join('/');

/** @param {{linkBase?: string}} o  prefix for repo-relative links ("" = paths relative to the repo root). */
export function planToMarkdown(p, o = {}) {
  const base = o.linkBase ?? '';
  const L = [];
  L.push(`# 制作方案：${p.topic}`, '');
  L.push(`> 由 \`${p.generated_by}\` 生成。题材识别为 **${p.scenario.name}**（${p.scenario.id}）；媒介 **${p.inputs.medium}** · 方向 **${p.inputs.direction}** · ${p.inputs.aspect} · 约 ${p.inputs.duration_s} 秒 · 预算：${p.inputs.budget_zh}`, '');
  L.push('## 1. 路线', '', `**主路线：${p.route.primary_name}**`, '');
  for (const w of p.route.why) L.push(`- ${w}`);
  if (p.route.secondary.length) L.push('', `备选：${p.route.secondary.map((r) => r.name).join('；')}`);
  for (const m of p.scenario.modifiers) L.push(`- ${m.note}`);
  if (p.warnings.length) L.push('', ...p.warnings.map((w) => `> ⚠️ ${w}`));
  L.push('', '## 2. 台词 / 分镜骨架', '', ...p.script_skeleton.map((s, i) => `${i + 1}. ${s}`));
  if (p.tips?.length) L.push('', '要点：', ...p.tips.map((t) => `- ${t}`));
  L.push('', '## 3. 执行步骤', '');
  let n = 0;
  for (const s of p.steps) {
    if (!s.cmds.length && s.title.startsWith('——')) { L.push(`**${s.title.replace(/—/g, '').trim()}**`, ''); continue; }
    L.push(`${++n}. **${s.title}**${s.note ? ` — ${s.note}` : ''}`);
    if (s.cmds.length) L.push('', '   ```bash', ...s.cmds.map((c) => `   ${c}`), '   ```');
    L.push('');
  }
  L.push('## 4. 推荐素材（本仓库）', '');
  if (p.style_presets.length) {
    L.push('**画风预设**（`node animator/src/cli.mjs styles --show <id>`）', '', '| id | 名称 | 适合 | animator 画材 |', '|---|---|---|---|');
    for (const s of p.style_presets) L.push(`| \`${s.id}\` | ${esc(s.name_zh)} | ${esc(s.best_for.slice(0, 3).join('、'))} | ${s.media} |`);
    L.push('');
  }
  if (p.templates.length) {
    L.push('**模板**', '', '| id | 标题 | 来源 · 许可 |', '|---|---|---|');
    for (const t of p.templates) L.push(`| [\`${t.id}\`](${base}${encodeURI(t.path)}) | ${esc(t.title)} | ${esc(t.source_repo)} · ${esc(t.license)} |`);
    L.push('');
  }
  if (p.prompts.items.length) {
    L.push(`**参考提示词**（检索类目：${p.prompts.targets.join('、')}${p.prompts.art ? `；画风优先 ${p.prompts.art}` : ''}）`, '', '| id | 标题 | 类目 | 语言 | 来源 · 许可 |', '|---|---|---|---|---|');
    for (const x of p.prompts.items) L.push(`| [\`${x.id}\`](${base}${encodeURI(x.path)}) | ${esc(x.title)} | ${x.genre}${x.art_style ? ` · ${x.art_style}` : ''} | ${x.language} | ${esc(x.source_repo)} · ${esc(x.license)} |`);
    L.push('');
  }
  if (!p.prompts.items.length && p.prompts.note) L.push(`**参考提示词**：${p.prompts.note}`, '');
  L.push('## 5. 外部项目（catalog/registry.json）', '');
  const ext = (arr, title) => {
    if (!arr.length) return;
    L.push(`**${title}**`, '', '| 项目 | ★ | 许可 | 成本 | 语言 | 用法 |', '|---|---|---|---|---|---|');
    for (const e of arr) L.push(`| [${e.repo}](${e.url}) | ${e.stars} | ${esc(e.license)}${LC[e.license_class] && e.license_class !== 'permissive' ? ` ${LC[e.license_class]}` : ''} | ${costZh(e.cost)} | ${ZH[e.zh] || e.zh} | ${esc(e.intro_zh)}；**接入**：${esc(e.plugs_into)} |`);
    L.push('');
  };
  ext(p.external.tools, '工具 / 引擎 / 技能');
  ext(p.external.methods, '方法论（剧本、分镜、提示词）');
  L.push('## 6. 合规', '', ...p.compliance.map((c) => `- ${c}`), '');
  return L.join('\n');
}

export function registryTableRows(entries) {
  const L = ['| 项目 | ★ | 最近更新 | 许可 | 简介 | 路线 | 输入→输出 | 成本 | 中文 | 怎么接入本仓库 |', '|---|---|---|---|---|---|---|---|---|---|'];
  for (const e of entries) {
    const lic = `${e.license}${e.license_class !== 'permissive' ? ` ${LC[e.license_class]}` : ''}${e.license_note ? `<br><sub>${esc(e.license_note)}</sub>` : ''}`;
    L.push(`| [${e.repo}](${e.url}) | ${e.stars} | ${e.pushed}${e.maturity === 'archived' ? ' 已归档' : ''} | ${lic} | ${esc(e.intro_zh)} | ${e.routes.join(' ')} | ${e.input.join('/')}→${e.output.join('/')} | ${costZh(e.cost)} | ${ZH[e.zh] || e.zh} | ${esc(e.plugs_into)} |`);
  }
  return L;
}

const ABS = { port: '移植', idea: '借鉴思路', dependency: '作为依赖调用', none: '' };
const absorbedText = (a) => (a && a.type && a.type !== 'none' ? `**${ABS[a.type]}**：${esc(a.what)}${a.where ? `（${esc(a.where)}）` : ''}` : '—');
const licText = (e) => `${e.license}${e.license_class !== 'permissive' ? ` ${LC[e.license_class]}` : ''}${e.license_note ? `<br><sub>${esc(e.license_note)}</sub>` : ''}`;

/** Category-page table for active entries: what it is best for + how to use it with this repo. */
export function activeTableRows(entries) {
  const L = ['| 项目 | ★ | 最近推送 | 许可 | 简介 | 最适合（题材） | 强项 | 我们吸收了什么 | 怎么用 | 路线 | 成本 | 中文 |', '|---|---|---|---|---|---|---|---|---|---|---|---|'];
  for (const e of entries) L.push(`| [${e.repo}](${e.url}) | ${e.stars} | ${e.pushed} | ${licText(e)} | ${esc(e.intro_zh)} | ${esc((e.best_for || []).join('；'))} | ${esc(e.strengths || '')} | ${absorbedText(e.absorbed)} | ${esc(e.how_to_use || e.plugs_into)} | ${e.routes.join(' ')} | ${costZh(e.cost)} | ${ZH[e.zh] || e.zh} |`);
  return L;
}

/** Collapsed "历史 / 不再推荐" table. */
export function staleTableRows(entries) {
  const why = { archived: '已归档', 'before-cutoff': '2026 年前停更' };
  const L = ['| 项目 | ★ | 最后推送 | 原因 | 许可 | 简介 |', '|---|---|---|---|---|---|'];
  for (const e of entries) L.push(`| [${e.repo}](${e.url}) | ${e.stars} | ${e.pushed} | ${why[e.stale_reason] || '不再推荐'} | ${licText(e)} | ${esc(e.intro_zh)} |`);
  return L;
}

/** 题材 → use_for tags; route = which of our own routes to start from. Kept in step with router/lib/profiles.mjs. */
export const USAGE_GROUPS = [
  { name: '科普（科学知识讲解）', tags: ['science', 'explainer', 'whiteboard'], route: '⑥ slides2video（PPT 式）· ① animator（手绘）', note: '「讲清楚一件事」：钩子问题 → 比喻 → 分层解释 → 公式/数据 → 一句话总结' },
  { name: '数理推导 / 公式', tags: ['math', 'formula', 'physics', 'chemistry'], route: '⑥ slides2video（公式逐项点亮、跨页变形）· ③ Manim（连续几何）' },
  { name: '课件 / PPT 转视频 / 论文讲解', tags: ['slides', 'courseware', 'paper'], route: '⑥ slides2video（deck.md 或 import .pptx）' },
  { name: '数据故事 / 图表', tags: ['data', 'chart', 'diagram'], route: '③ 代码动效 · ⑥ slides2video（柱状/折线按讲解升起）' },
  { name: '仓库推荐 / 产品发布', tags: ['repo-promo', 'launch', 'code'], route: '① animator（天机风）· ③ HyperFrames' },
  { name: '漫剧（动画剧情）', tags: ['drama', 'xianxia', 'wuxia', 'fight', 'romance', 'suspense', 'urban', 'comedy', 'novel-adapt', 'story'], route: '② videogen + prompts/ · ⑤ stills2video（只有图）· ① animator（手绘版）' },
  { name: '真人短剧', tags: ['short-drama'], route: '② videogen（真人提示词）· ④ 外部平台' },
  { name: '产品带货 / 广告', tags: ['product', 'ecommerce', 'ad'], route: '② videogen · ③ 代码动效（免费 CPU）' },
  { name: '绘本 / 儿童', tags: ['picture-book', 'kids'], route: '① animator · ⑤ stills2video' },
  { name: '诗词 / 国学', tags: ['poem'], route: '① animator（水墨）' },
  { name: '拆书 / 影视解说', tags: ['book', 'recap'], route: '① animator · ⑥ slides2video' },
  { name: 'vlog / 空镜头 / 静图成片', tags: ['vlog'], routeKey: 'S-stills', route: '⑤ stills2video · ② videogen 补空镜' },
  { name: '口播 / 数字人', tags: ['talking-head'], route: '④ 外部（肖像需授权）· ③ 字幕包装' },
  { name: '音乐 MV / 歌词', tags: ['music-mv'], route: '② videogen · ③ 代码动效' },
  { name: '配音 / 字幕对齐', tags: ['tts', 'subtitle'], route: '全部路线共用本地 Kokoro（sherpa-onnx）' },
  { name: '剪辑 / 切条 / 后期', tags: ['edit', 'clip'], route: '④ 外部剪辑工具' },
  { name: '本地模型 / 一条龙平台 / MCP', tags: ['open-model', 'pipeline', 'mcp'], route: '② videogen（ComfyUI）· MCP 接入' },
  { name: '通用底座（任何题材）', tags: ['any'], route: '按需' },
  { name: '提示词参考', tags: ['prompt-library'], route: '② videogen' },
];

/** docs/项目用途地图.md — active entries grouped by 题材 (an entry may appear in several groups). */
export function usageMap(reg) {
  const act = reg.entries.filter((e) => e.status !== 'stale');
  const absRank = { port: 0, dependency: 1, idea: 2 };
  const L = ['<!-- 本文件由 `node router/cli.mjs build-catalog` 从 catalog/registry.json 生成，请改 registry.json（或 catalog/tools/usefor.py）后重新生成 -->', '',
    `# 项目用途地图（${act.length} 个 2026 年活跃项目，按题材）`, '',
    `> 只收 ${reg.freshness?.cutoff || '2026-01-01'} 之后仍有推送、未归档的项目；数据核验于 ${reg.checked_at}。「最适合」「强项」「怎么用」是本仓库自己写的判断（不是对方文档原文）。`,
    '> 「我们吸收了什么」：**移植** = 按原许可证带版权头搬进仓库（见 NOTICE.md / VENDOR.md）；**借鉴思路** = 只学做法、代码自写；**作为依赖调用** = 运行时调用对方程序/模型，不复制代码。', '',
    '让 Agent 自动选：`node router/cli.mjs recommend "<题材>"`（或 MCP `recommend_video_pipeline` / `list_modes`）。', '',
    '## 目录', '', ...USAGE_GROUPS.map((g) => `- [${g.name}](#${g.name.replace(/[ （）()/·、，]/g, (c) => (c === ' ' ? '-' : '')).toLowerCase()})`), ''];
  const seen = new Set();
  for (const g of USAGE_GROUPS) {
    const es = act.filter((e) => e.use_for.some((u) => g.tags.includes(u)) || (g.routeKey && e.routes.includes(g.routeKey)))
      .sort((a, b) => (absRank[a.absorbed?.type] ?? 3) - (absRank[b.absorbed?.type] ?? 3) || b.stars - a.stars);
    es.forEach((e) => seen.add(e.id));
    L.push(`## ${g.name}`, '', `从这里开始：**${g.route}**${g.note ? `。${g.note}` : ''}（${es.length} 个项目）`, '',
      '| 项目 | 最适合 | 强项 | 我们吸收了什么 | 怎么用 | 许可 · 成本 |', '|---|---|---|---|---|---|');
    for (const e of es) L.push(`| [${e.repo}](${e.url}) | ${esc((e.best_for || []).join('；'))} | ${esc(e.strengths || '')} | ${absorbedText(e.absorbed)} | ${esc(e.how_to_use || e.plugs_into)} | ${esc(e.license)}${e.license_class !== 'permissive' ? ` ${LC[e.license_class]}` : ''} · ${costZh(e.cost)} |`);
    L.push('');
  }
  const rest = act.filter((e) => !seen.has(e.id)).sort((a, b) => b.stars - a.stars);
  if (rest.length) {
    L.push('## 其他', '', '| 项目 | 最适合 | 强项 | 怎么用 | 许可 · 成本 |', '|---|---|---|---|---|');
    for (const e of rest) L.push(`| [${e.repo}](${e.url}) | ${esc((e.best_for || []).join('；'))} | ${esc(e.strengths || '')} | ${esc(e.how_to_use || e.plugs_into)} | ${esc(e.license)} · ${costZh(e.cost)} |`);
    L.push('');
  }
  return L.join('\n');
}
