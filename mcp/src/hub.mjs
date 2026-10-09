// Read-only data access for the MCP server. Original work, Apache-2.0, Copyright 2026 天机.
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { loadData, ROOT } from '../../router/lib/data.mjs';
import { recommend } from '../../router/lib/plan.mjs';
import { INTAKE } from '../../router/cli.mjs';
import { parseStoryboard } from '../../videogen/lib/storyboard.mjs';

let version = 'unknown';
try { version = execSync('git rev-parse --short HEAD', { cwd: ROOT, encoding: 'utf8' }).trim(); } catch { /* snapshot without git */ }

export function dataVersion() {
  return { commit: version, root: ROOT, checked_at: loadData({ prompts: false }).registry.checked_at };
}

function readJSONL(file) {
  if (!fs.existsSync(file)) return [];
  return fs.readFileSync(file, 'utf8').split('\n').filter(Boolean).map((l) => JSON.parse(l));
}

let prompts = null;
let byId = null;

export function allPrompts() {
  if (prompts) return prompts;
  prompts = [];
  const dir = path.join(ROOT, 'data/prompts');
  for (const f of fs.readdirSync(dir).filter((x) => /^part-\d+\.jsonl$/.test(x)).sort()) {
    for (const d of readJSONL(path.join(dir, f))) prompts.push(d);
  }
  byId = new Map(prompts.map((p) => [p.id, p]));
  return prompts;
}

export function promptById(id) { allPrompts(); return byId.get(id) || null; }

export function attribution(p) {
  return {
    author: p.original_author || null,
    author_url: p.original_author_url || null,
    license: p.license,
    license_url: p.license_url || null,
    source_repo: p.source_repo,
    source_url: p.source_url,
    original_post_url: p.original_post_url || null,
    changes: p.changes || null,
    third_party_author: !!p.third_party_author,
  };
}

export function attributionText(p) {
  const who = p.original_author ? `原作者 ${p.original_author}` : '原作者见上游';
  const post = p.original_post_url ? `，原帖 ${p.original_post_url}` : '';
  return `提示词 ${who}，来源 ${p.source_repo}（${p.license}）${post}；本仓库仅做格式规范化，未改文字。`;
}

/** link-only and taken-down entries never return prompt text. */
export function publicPrompt(p, { includeVariants = false } = {}) {
  const linkOnly = p.access === 'link-only' || !String(p.prompt || '').trim();
  const out = {
    id: p.id, title: p.title, title_en: p.title_en || null, medium: p.medium, direction: p.direction || null,
    genre: p.genre, art_style: p.art_style || null, language: p.language, model: p.model || null,
    access: linkOnly ? 'link-only' : (p.access || 'full'),
    prompt: linkOnly ? null : p.prompt,
    read_at: linkOnly ? (p.original_post_url || p.source_url) : null,
    audit_reason: p.audit_reason || null,
    output_status: p.output_status || null,
    verification: p.verification || null,
    path: p.path,
    attribution: attribution(p),
    attribution_text: attributionText(p),
  };
  if (includeVariants && !linkOnly) out.variants = p.variants || [];
  if (linkOnly) out.note = '仅链接：不返回提示词正文。请到 read_at 阅读原文。';
  return out;
}

export function searchPrompts(q) {
  const all = allPrompts();
  const query = (q.query || '').toLowerCase();
  const limit = Math.min(q.limit ?? 10, 50);
  const offset = Math.max(0, Number(q.cursor || 0) || 0);
  const hits = [];
  for (const p of all) {
    if (!q.include_link_only && p.access === 'link-only') continue;
    if (q.medium && p.medium !== q.medium) continue;
    if (q.direction && p.direction !== q.direction) continue;
    if (q.genre && !(p.genre || '').includes(q.genre)) continue;
    if (q.art_style && (p.art_style || '') !== q.art_style) continue;
    if (q.model && !(p.model || '').toLowerCase().includes(String(q.model).toLowerCase())) continue;
    if (q.language && p.language !== q.language) continue;
    if (query) {
      const blob = `${p.title || ''} ${p.title_en || ''} ${p.genre || ''} ${p.model || ''} ${p.prompt || ''}`.toLowerCase();
      if (!blob.includes(query)) continue;
    }
    hits.push(p);
  }
  const page = hits.slice(offset, offset + limit);
  return {
    hits: page.map((p) => ({
      id: p.id, title: p.title, medium: p.medium, direction: p.direction || null, genre: p.genre,
      model: p.model || null, language: p.language, access: p.access || 'full',
      snippet: p.access === 'link-only' ? null : String(p.prompt || '').slice(0, 200),
      attribution: { license: p.license, source_repo: p.source_repo, original_author: p.original_author || null },
    })),
    total: hits.length,
    next_cursor: offset + limit < hits.length ? String(offset + limit) : null,
  };
}

export function templates() {
  return readJSONL(path.join(ROOT, 'data/templates.jsonl'));
}

export function searchTemplates(q) {
  const limit = Math.min(q.limit ?? 10, 50);
  const query = (q.query || '').toLowerCase();
  let rows = templates().filter((t) => (!q.language || t.language === q.language) && (!q.kind || t.kind === q.kind || !q.kind));
  if (query) rows = rows.filter((t) => `${t.title} ${t.prompt || ''}`.toLowerCase().includes(query));
  return rows.slice(0, limit).map((t) => ({
    id: t.id, title: t.title, language: t.language, source_repo: t.source_repo, license: t.license,
    attribution: attribution(t),
  }));
}

export function templateById(id) {
  const t = templates().find((x) => x.id === id);
  if (!t) return null;
  return { ...t, prompt: t.prompt, attribution: attribution(t), attribution_text: attributionText(t) };
}

export function projects(q) {
  const reg = loadData({ prompts: false }).registry;
  const query = (q.query || '').toLowerCase();
  const limit = Math.min(q.limit ?? 20, 50);
  let es = reg.entries.filter((e) => (!q.category || e.category === q.category)
    && (!q.route || (e.routes || []).includes(q.route))
    && (!q.cost || (e.cost || []).includes(q.cost))
    && (!q.zh || e.zh === q.zh)
    && (!q.license_class || e.license_class === q.license_class)
    && !(q.commercial && (['noncommercial', 'none'].includes(e.license_class) || e.commercial_block)));
  if (query) es = es.filter((e) => `${e.repo} ${e.intro_zh} ${e.plugs_into}`.toLowerCase().includes(query));
  const warn = (e) => (e.warning || e.commercial_block ? 1 : 0);
  es.sort((a, b) => warn(a) - warn(b) || b.stars - a.stars);
  return es.slice(0, limit).map((e) => ({
    repo: e.repo, url: e.url, intro_zh: e.intro_zh, stars: e.stars, pushed: e.pushed,
    license: e.license, license_class: e.license_class, license_source: e.license_source || null,
    routes: e.routes, cost: e.cost, zh: e.zh, maturity: e.maturity,
    warning: e.warning || null, commercial_block: !!e.commercial_block,
    verified_at: e.verified_at || reg.checked_at, checked_at: reg.checked_at,
  }));
}

export function projectByRepo(repo) {
  const reg = loadData({ prompts: false }).registry;
  const e = reg.entries.find((x) => x.repo === repo || x.id === repo);
  if (!e) return null;
  return { ...e, checked_at: reg.checked_at, note: '只返回链接与本仓库自写简介，不包含第三方 README 或代码。' };
}

export function stylePresets(q) {
  const styles = loadData({ prompts: false }).styles.styles;
  const query = (q.query || '').toLowerCase();
  let rows = styles;
  if (q.id) rows = rows.filter((s) => s.id === q.id);
  if (q.featured) rows = rows.filter((s) => s.featured);
  if (query) rows = rows.filter((s) => `${s.id} ${s.name_zh} ${s.name_en} ${s.summary}`.toLowerCase().includes(query));
  return rows.slice(0, Math.min(q.limit ?? 20, 50)).map((s) => ({
    id: s.id, name_zh: s.name_zh, name_en: s.name_en, category: s.category, featured: !!s.featured,
    summary: s.summary, best_for: s.best_for || [], color_hint: s.color_hint || null, avoid: s.avoid || null,
    attribution: { origin: s.origin || null, license: 'MIT', note: '画风配方文字来自上游 MIT 预设，见 animator/presets 的 _provenance' },
  }));
}

export function taxonomy() {
  const tree = {};
  const art = {};
  for (const p of allPrompts()) {
    const med = p.medium || '其他';
    const dir = p.direction || '';
    ((tree[med] ??= {})[dir] ??= {});
    tree[med][dir][p.genre] = (tree[med][dir][p.genre] || 0) + 1;
    if (med === '漫剧') art[p.art_style || '未注明'] = (art[p.art_style || '未注明'] || 0) + 1;
  }
  return { tree, art_styles: art };
}

export function intake(lang) {
  return { questions: INTAKE, lang: lang || 'zh' };
}

export function pipeline(args) {
  const data = loadData();
  const opts = {
    medium: args.medium, direction: args.direction, budget: args.budget || 'free-cpu',
    duration: args.duration_s, aspect: args.aspect,
    assets: Array.isArray(args.assets) ? args.assets.join(',') : args.assets,
    style: args.style, commercial: !!args.commercial, lang: args.lang,
  };
  return recommend(data, args.topic, opts);
}

const CAMERA = /运镜|推镜|拉镜|摇镜|移镜|跟拍|dolly|pan\b|tilt|tracking|handheld|手持|镜头运动|camera move|crane|推近|拉远/i;
const LIGHT = /光|lighting|光线|霓虹|sunlight|逆光|侧光|柔光|体积光/i;
const SOUND = /声音|音效|台词|对白|旁白|audio|sfx|音乐|配乐|\{[^}]{1,40}\}/i;
const REF = /角色|@图片|参考图|同一人|character|consistency|一致性/i;
const NEG = /负面|禁止|negative|不要|避免/i;

export function lintStoryboard(text, target) {
  const parsed = parseStoryboard(text || '', {});
  const shotList = parsed.shots || [];
  const present = [];
  const missing = [];
  const checks = [
    ['shots', shotList.length > 0, '镜头分段', '用「镜头1」或「0–3秒」把提示词拆开'],
    ['duration', shotList.some((s) => s.duration) || /\d+\s*(?:s|秒)/.test(text || ''), '时长', '写明每镜秒数或总时长'],
    ['camera', CAMERA.test(text), '运镜', '写推拉摇移或机位'],
    ['light', LIGHT.test(text), '光线', '写主光、时间或色温'],
    ['sound', SOUND.test(text), '声音/台词', '写音效、对白或明确静音'],
    ['reference', REF.test(text), '角色一致性/参考图', '写角色设定或 @图片 参考'],
    ['negative', NEG.test(text), '负面约束', '写不要出现的内容'],
  ];
  for (const [id, ok, element, why] of checks) (ok ? present : missing).push(ok ? element : { element, why });
  const warnings = [];
  if ((text || '').length > 4000) warnings.push('文本超过 4000 字，多数视频模型会截断');
  if (target === 'seedance' && (text || '').length > 2000) warnings.push('Seedance 类提示词过长时后半段容易被忽略');
  return {
    score: Math.round((present.length / checks.length) * 100),
    present, missing,
    shots: shotList.slice(0, 40).map((s) => ({ id: s.id, duration: s.duration, text: String(s.shot_text || '').slice(0, 180) })),
    warnings,
    note: '启发式检查，不能代替 scripts/audit.py 的版权/安全审核。',
  };
}

const AI_LABEL = '若公开发布 AI 生成视频，请按《人工智能生成合成内容标识办法》及平台规则做显著标识；本工具不代替法律意见。';

export function compliance(args) {
  const blockers = [];
  const obligations = [];
  const lines = [];
  for (const id of args.prompt_ids || []) {
    const p = promptById(id);
    if (!p) { blockers.push(`未找到提示词 ${id}`); continue; }
    if (p.access === 'link-only') blockers.push(`${id} 是仅链接条目，不能把正文当作可再分发的全文`);
    lines.push(`- ${attributionText(p)} 文件：${p.path || id}`);
    if (p.license?.includes('CC-BY') || p.license?.includes('CC BY')) obligations.push(`${id}：CC BY 需要保留原作者、来源链接和许可`);
    if (p.third_party_author) obligations.push(`${id}：权利在原作者，上游 MIT/CC BY 不自动覆盖这条提示词本身`);
  }
  for (const id of args.template_ids || []) {
    const t = templateById(id);
    if (!t) { blockers.push(`未找到模板 ${id}`); continue; }
    lines.push(`- 模板 ${t.title}（${t.source_repo}，${t.license}）${t.source_url || ''}`);
  }
  const reg = loadData({ prompts: false }).registry;
  for (const repo of args.project_repos || []) {
    const e = reg.entries.find((x) => x.repo === repo);
    if (!e) { blockers.push(`目录中没有 ${repo}`); continue; }
    lines.push(`- 外部项目 ${e.repo}（${e.license}）${e.url}。${e.license_note || e.intro_zh}`);
    if (args.commercial && (['noncommercial', 'none'].includes(e.license_class) || e.commercial_block)) {
      blockers.push(`${repo}：商用场景已排除（${e.license_class}${e.commercial_block ? '，另有商用限制' : ''}）`);
    }
    if (e.license_class === 'none') obligations.push(`${repo}：无许可证，只可参考链接，不要复制代码或文档`);
    if (e.license?.includes('Remotion')) obligations.push(`${repo}：Remotion 公司许可有人数/收入门槛`);
  }
  if (args.uses_real_person) blockers.push('使用真实人物肖像或声音需要本人授权，本库不提供该授权');
  if (args.voice_clone) blockers.push('声音克隆需要可证明的授权，不要用未授权的名人音色');
  obligations.push(AI_LABEL);
  return {
    ok: blockers.length === 0,
    blockers, obligations,
    attribution_block: ['## 素材署名', ...lines, '', AI_LABEL].join('\n'),
    ai_label_reminder: AI_LABEL,
  };
}
