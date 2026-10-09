#!/usr/bin/env node
// AI 导演路由器 CLI —— 无第三方依赖（Node ≥18）。Original work for ai-video-prompt-hub, Apache-2.0.
import fs from 'node:fs';
import path from 'node:path';
import { loadData, ROOT } from './lib/data.mjs';
import { recommend } from './lib/plan.mjs';
import { planToMarkdown, registryTableRows } from './lib/render.mjs';
import { buildCatalog, FILES } from './lib/catalog.mjs';
import { SCENARIOS, GENERIC, BUDGETS } from './lib/profiles.mjs';
import { grams, overlap } from './lib/text.mjs';

const HELP = `AI 导演路由器：按题材给出制作方案（路线、工具、提示词、模板、画风预设、命令）

用法: node router/cli.mjs <命令> [参数]

  recommend "题材描述" [--medium 漫剧|真人|其他] [--direction 现实向|特效向]
            [--budget free-cpu|gpu|api-key|web-manual] [--duration 60] [--aspect 9:16|16:9|1:1]
            [--assets character,product,footage,images] [--vram 显存GB] [--voice 本地TTS|自己配音] [--style 彩铅|<预设id>]
            [--media crayon|colored-pencil|pencil|ink|picture-book|marker] [--character tianji|doudou]
            [--scenario <id>] [--commercial] [--lang zh|en] [--format md|json] [--out 文件]
  intake    [--format md|json]          打印需求确认问题清单（给 Agent 逐项问用户）
  scenarios                              列出可识别的题材场景
  search    [关键词] [--route A-handdrawn|B-videogen|C-code-motion|M-method|E-edit]
            [--cost free-cpu|gpu|api-key] [--zh native] [--license permissive] [--category <id>] [--format md|json]
  build-catalog                          由 catalog/registry.json 重新生成 catalog/*.md
  check                                  校验 registry.json、场景配置引用的预设/模板、catalog 是否最新
  examples                               为 9 个示例题材生成 router/examples/*.md|json
`;

export const SAMPLES = [
  { file: '01-仙侠漫剧', topic: '仙侠漫剧：废柴少女觉醒灵根，宗门大比一剑逆袭', opts: { medium: '漫剧', budget: 'api-key' } },
  { file: '02-都市甜宠真人剧', topic: '都市甜宠真人剧：契约闪婚的霸总和实习生', opts: { medium: '真人', budget: 'web-manual' } },
  { file: '03-知识科普口播', topic: '知识科普口播：为什么熬夜会让人变笨', opts: { budget: 'free-cpu' } },
  { file: '04-儿童绘本故事', topic: '儿童绘本故事：小兔子学会分享胡萝卜', opts: { budget: 'free-cpu' } },
  { file: '05-悬疑短剧', topic: '悬疑短剧：雨夜失踪的室友留下一段录音', opts: { budget: 'gpu' } },
  { file: '06-产品带货', topic: '产品带货：便携榨汁杯 30 秒种草视频', opts: { budget: 'free-cpu', assets: 'product' } },
  { file: '07-GitHub项目推荐-天机', topic: 'GitHub 项目推荐（天机）：一个免费的本地 AI 配音开源工具', opts: { budget: 'free-cpu' } },
  { file: '08-DV-vlog', topic: 'DV vlog：2005 年夏天一家人去海边的家庭录像', opts: { budget: 'web-manual' } },
  { file: '09-只有图片无订阅', topic: '只有 ChatGPT 出的 5 张图、没有视频订阅：做一条 20 秒仙侠氛围短片', opts: { budget: 'free-cpu', assets: 'images' } },
];

export const INTAKE = [
  { key: 'topic', q: '题材/故事是什么？（一句话梗概 + 目标平台）', default: '—' },
  { key: 'medium', q: '漫剧（动画/漫画/手绘）还是真人（写实）？讲解类可选「其他」', options: ['漫剧', '真人', '其他'], default: '按题材推断' },
  { key: 'direction', q: '现实向还是特效向（法术、大场面、怪兽、科幻）？', options: ['现实向', '特效向'], default: '按题材推断' },
  { key: 'duration', q: '时长？（单集/单条秒数，是否多集）', default: '按题材：讲解 60–90s，短剧单集 60s，带货 30s' },
  { key: 'aspect', q: '画幅？', options: ['9:16', '16:9', '1:1'], default: '9:16' },
  { key: 'budget', q: '预算/硬件？', options: Object.entries(BUDGETS).map(([k, v]) => `${k}（${v}）`), default: 'free-cpu' },
  { key: 'assets', q: '已有素材？（角色设定图/参考图、产品实拍图、实拍视频、品牌素材）', options: ['character', 'product', 'footage', 'images', '无'], default: '无' },
  { key: 'vram', q: '显卡显存多少 GB？（只有图片走 stills2video 时用来选档位；不知道就 0 / 运行 node stills2video/cli.mjs doctor）', options: ['0', '8', '12', '16', '24'], default: '0' },
  { key: 'voice', q: '配音方式？（本地 Kokoro TTS 免费 / 自己录 / 已授权的克隆声音 / 不要配音）', default: '本地 Kokoro TTS' },
  { key: 'style', q: '画风偏好？（例：彩铅日记、水墨、蜡笔、3D 国漫、日漫、写实电影感）', default: '按题材推荐' },
  { key: 'commercial', q: '是否商用（带货、接广告、公司账号）？商用会排除非商用/无许可证的外部项目', options: ['是', '否'], default: '否' },
];

function args(argv) {
  const o = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const k = a.slice(2);
      const v = argv[i + 1] !== undefined && !argv[i + 1].startsWith('--') ? argv[++i] : true;
      o[k] = v;
    } else o._.push(a);
  }
  return o;
}

function emit(text, a) {
  if (a.out) { fs.mkdirSync(path.dirname(path.resolve(a.out)), { recursive: true }); fs.writeFileSync(a.out, text); console.error(`已写入 ${a.out}`); }
  else process.stdout.write(text.endsWith('\n') ? text : text + '\n');
}

export function check() {
  const problems = [];
  const data = loadData({ prompts: false });
  const reg = data.registry;
  const V = reg.vocab;
  const ids = new Set();
  const cats = new Set(reg.categories.map((c) => c.id));
  const req = ['id', 'repo', 'url', 'category', 'kind', 'intro_zh', 'stars', 'pushed', 'license', 'license_class', 'routes', 'cost', 'zh', 'maturity', 'use_for', 'plugs_into', 'verified_at', 'license_source'];
  for (const e of reg.entries) {
    for (const k of req) if (e[k] === undefined || e[k] === '') problems.push(`${e.repo || e.id}: 缺少字段 ${k}`);
    if (ids.has(e.id)) problems.push(`重复 id ${e.id}`); ids.add(e.id);
    if (!cats.has(e.category)) problems.push(`${e.repo}: 未知分类 ${e.category}`);
    for (const r of e.routes || []) if (!V.routes[r]) problems.push(`${e.repo}: 未知路线 ${r}`);
    for (const c of e.cost || []) if (!V.cost[c]) problems.push(`${e.repo}: 未知成本 ${c}`);
    if (!V.zh[e.zh]) problems.push(`${e.repo}: 未知中文支持 ${e.zh}`);
    if (!V.license_class[e.license_class]) problems.push(`${e.repo}: 未知许可类别 ${e.license_class}`);
    if (e.url !== `https://github.com/${e.repo}`) problems.push(`${e.repo}: url 与 repo 不一致`);
  }
  const styleIds = new Set(data.styles.styles.map((s) => s.id));
  const tplIds = new Set(data.templates.map((t) => t.id));
  for (const s of [...SCENARIOS, GENERIC]) {
    for (const p of s.presets) if (!styleIds.has(p)) problems.push(`场景 ${s.id}: 画风预设 ${p} 不存在`);
    for (const t of s.templates) if (!tplIds.has(t)) problems.push(`场景 ${s.id}: 模板 ${t} 不存在`);
  }
  const gen = buildCatalog({ write: false });
  for (const [f, s] of Object.entries(gen)) {
    const p = path.join(ROOT, 'catalog', f);
    if (!fs.existsSync(p) || fs.readFileSync(p, 'utf8') !== s) problems.push(`catalog/${f} 不是最新，运行 node router/cli.mjs build-catalog`);
  }
  return { ok: !problems.length, entries: reg.entries.length, problems };
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const a = args(rest);
  if (!cmd || cmd === 'help' || a.help) return console.log(HELP);
  if (cmd === 'recommend') {
    const topic = a.topic || a._.join(' ');
    if (!topic) throw new Error('请给出题材：node router/cli.mjs recommend "仙侠漫剧：……"');
    const opts = { medium: a.medium, direction: a.direction, budget: a.budget || 'free-cpu', duration: a.duration, aspect: a.aspect, assets: a.assets,
      voice: a.voice, style: a.style, media: a.media, character: a.character, scenario: a.scenario, commercial: !!a.commercial, lang: a.lang, vram: a.vram };
    const plan = recommend(loadData(), topic, opts);
    return emit(a.format === 'json' ? JSON.stringify(plan, null, 2) : planToMarkdown(plan), a);
  }
  if (cmd === 'intake') {
    if (a.format === 'json') return emit(JSON.stringify(INTAKE, null, 2), a);
    return emit(['# 需求确认（逐项问用户；用户不确定就用默认值）', '', ...INTAKE.map((x, i) => `${i + 1}. **${x.q}**${x.options ? `  选项：${x.options.join(' / ')}` : ''}  默认：${x.default}`), '',
      '问完后运行：`node router/cli.mjs recommend "<题材>" --medium <> --budget <> --aspect <> --duration <> [--assets ...] [--style ...] [--commercial]`'].join('\n'), a);
  }
  if (cmd === 'scenarios') {
    return emit(['| id | 场景 | 默认媒介/方向 | 默认路线 | 关键词示例 |', '|---|---|---|---|---|',
      ...[...SCENARIOS, GENERIC].map((s) => `| ${s.id} | ${s.name} | ${s.medium}/${s.direction} | ${s.route} | ${s.kw.slice(0, 6).join('、')} |`)].join('\n'), a);
  }
  if (cmd === 'search') {
    const reg = loadData({ prompts: false }).registry;
    const q = a._.join(' ');
    const qg = grams(q);
    let es = reg.entries.filter((e) => (!a.route || e.routes.includes(a.route)) && (!a.cost || e.cost.includes(a.cost)) && (!a.zh || e.zh === a.zh)
      && (!a.license || e.license_class === a.license) && (!a.category || e.category === a.category));
    if (q) es = es.map((e) => ({ e, n: overlap(qg, grams([e.repo, e.intro_zh, e.plugs_into, e.styles.join(' '), e.use_for.join(' ')].join(' '))) + (e.repo.toLowerCase().includes(q.toLowerCase()) ? 5 : 0) }))
      .filter((x) => x.n > 0).sort((x, y) => y.n - x.n || y.e.stars - x.e.stars).map((x) => x.e);
    else es.sort((x, y) => y.stars - x.stars);
    es = es.slice(0, +a.limit || 20);
    return emit(a.format === 'json' ? JSON.stringify(es, null, 2) : registryTableRows(es).join('\n'), a);
  }
  if (cmd === 'build-catalog') {
    const out = buildCatalog();
    return console.log(`已生成 catalog/ 下 ${Object.keys(out).length} 个页面：${Object.keys(out).join('、')}`);
  }
  if (cmd === 'check') {
    const r = check();
    console.log(r.ok ? `OK：registry ${r.entries} 个条目，场景引用与 catalog 页面均有效` : `发现 ${r.problems.length} 个问题：\n- ${r.problems.join('\n- ')}`);
    process.exitCode = r.ok ? 0 : 1; return;
  }
  if (cmd === 'examples') {
    const data = loadData();
    const dir = path.join(ROOT, 'router', 'examples');
    fs.mkdirSync(dir, { recursive: true });
    for (const s of SAMPLES) {
      const plan = recommend(data, s.topic, s.opts);
      fs.writeFileSync(path.join(dir, `${s.file}.md`), planToMarkdown(plan, { linkBase: '../../' }));
      fs.writeFileSync(path.join(dir, `${s.file}.json`), JSON.stringify(plan, null, 2) + '\n');
    }
    return console.log(`已生成 ${SAMPLES.length} 个示例到 router/examples/`);
  }
  throw new Error(`未知命令 ${cmd}\n\n${HELP}`);
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('cli.mjs')) {
  main().catch((e) => { console.error(e.message); process.exit(1); });
}
