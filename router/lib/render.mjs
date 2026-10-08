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
