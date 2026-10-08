// The router's decision logic (original work, Apache-2.0). Pure functions over loadData() output.
import { SCENARIOS, GENERIC, MODIFIERS, MEDIUM_HINTS, DIRECTION_HINTS, ROUTES, BUDGETS } from './profiles.mjs';
import { grams, overlap, norm, slug } from './text.mjs';

// Well-known copyrighted characters/franchises: prompts naming them are pushed down (we recommend original characters).
const IP_TERMS = ['韩立', '王林', '萧炎', '叶凡', '石昊', '哪吒', '孙悟空', '悟空', '奥特曼', '漫威', '火影', '鸣人', '海贼', '路飞', '龙珠', '皮卡丘', '宝可梦', '蜘蛛侠', '钢铁侠', '蝙蝠侠', '哈利', '迪士尼', '米老鼠', '柯南', '原神', '黑神话', 'naruto', 'marvel', 'pokemon', 'pikachu', 'disney', 'spider-man', 'batman', 'goku', 'harry potter', 'ultraman', 'one piece'];
const MEDIA = ['crayon', 'colored-pencil', 'pencil', 'ink', 'picture-book', 'marker'];
const PROVIDER_BY_MEDIUM = { 漫剧: 'seedance', 真人: 'seedance', 其他: 'seedance' };

/** Mirrors suggestMedia() in animator/src/styles.mjs (kept dependency-free here; animator imports yaml). */
export function mediaForPreset(st) {
  if (!st) return 'crayon';
  const t = `${st.name_zh} ${st.name_en || ''} ${st.summary || ''}`;
  if (/彩铅|colou?red[- ]pencil/i.test(t)) return 'colored-pencil';
  if (/蜡笔|crayon|油画棒|pastel/i.test(t)) return 'crayon';
  if (/马克|marker|毡尖/i.test(t)) return 'marker';
  if (/水墨|墨|ink|钢笔/i.test(t)) return 'ink';
  if (/铅笔|素描|graphite|pencil/i.test(t)) return 'pencil';
  if (/水彩|水粉|绘本|watercolou?r|gouache|storybook/i.test(t)) return 'picture-book';
  return { crayon: 'crayon', ink: 'ink', watercolor: 'picture-book', gouache: 'picture-book', line: 'pencil', diary: 'colored-pencil' }[st.category] || 'crayon';
}

const hits = (text, kws) => kws.filter((k) => text.includes(norm(k)));

export function classify(topic, opts = {}) {
  const t = norm(topic);
  let scenario = null, scores = [];
  if (opts.scenario) scenario = SCENARIOS.find((s) => s.id === opts.scenario) || (opts.scenario === GENERIC.id ? GENERIC : null);
  if (!scenario) {
    scores = SCENARIOS.map((s, i) => {
      const h = hits(t, s.kw);
      return { s, i, score: h.reduce((a, k) => a + (k.length >= 2 ? 1 + 0.15 * (k.length - 2) : 0.5), 0), h };
    }).filter((x) => x.score > 0).sort((a, b) => b.score - a.score || a.i - b.i);
    scenario = scores[0]?.s || GENERIC;
  }
  const modifiers = MODIFIERS.filter((m) => hits(t, m.kw).length);
  const explicitMedium = opts.medium && ['漫剧', '真人', '其他'].includes(opts.medium) ? opts.medium : null;
  let medium = explicitMedium;
  if (!medium) for (const [m, kws] of Object.entries(MEDIUM_HINTS)) if (hits(t, kws).length) { medium = m; break; }
  medium ||= scenario.medium;
  let direction = ['现实向', '特效向'].includes(opts.direction) ? opts.direction : null;
  if (!direction && scenario.drama) for (const [d, kws] of Object.entries(DIRECTION_HINTS)) if (hits(t, kws).length) { direction = d; break; }
  direction ||= scenario.direction;
  return {
    scenario, modifiers, medium, direction, explicitMedium: !!explicitMedium,
    matched: scores.slice(0, 3).map((x) => ({ id: x.s.id, score: +x.score.toFixed(2), keywords: x.h })),
  };
}

export function decideRoute(c, opts) {
  const { scenario: s, medium } = c;
  const budget = opts.budget;
  let primary = s.route;
  const secondary = new Set(s.alt);
  const why = [];
  let videogenMode = { 'api-key': 'api', gpu: 'comfyui', 'web-manual': 'web', 'free-cpu': 'web' }[budget];

  if (primary === 'A' && medium === '真人' && c.explicitMedium) {
    primary = 'C'; secondary.add('D');
    why.push('题材适合讲解，但你要真人出镜：用代码动效包装口播，或用外部数字人项目（肖像需授权）');
  } else if (primary === 'A') {
    why.push(`「${s.name}」以讲清楚/讲好故事为主，本仓库 animator 手绘逐笔动画免费、CPU 可跑、画面与台词逐词对齐`);
  } else if (primary === 'C') {
    why.push(`「${s.name}」以图表/公式/文字信息为主，代码动效最精确，且全部可在 CPU 上免费渲染`);
  } else if (primary === 'B') {
    why.push(`「${s.name}」需要${medium === '漫剧' ? '漫剧角色表演与镜头运动' : '写实画面与真人表演'}，用视频模型生成，提示词与模板来自本仓库 prompts/ 和 templates/`);
    if (budget === 'free-cpu') {
      if (medium === '漫剧' && s.alt.includes('A')) {
        primary = 'A'; secondary.add('B');
        why.push('预算是「免费 + CPU」：视频模型无法在 CPU 上免费运行，先用 animator 做手绘漫剧版；之后有额度再按路线② 升级');
      } else if (s.id === 'product') {
        primary = 'C'; secondary.add('B'); secondary.add('D');
        why.push('预算是「免费 + CPU」：用产品实拍图 + 代码动效/ffmpeg 做带货片（无需 API）；视频模型镜头作为可选升级');
      } else if (s.id === 'vlog') {
        secondary.add('D');
        why.push('预算是「免费 + CPU」：有实拍素材就直接剪（剪映 skill / editly），AI 镜头只用网页端免费额度补空镜');
      } else {
        secondary.add('A');
        why.push('预算是「免费 + CPU」：真人画面只能靠网页端生成（会员或免费额度，可能产生费用），或改做手绘版');
      }
    }
  }
  if (budget === 'gpu' && (primary === 'B' || secondary.has('B'))) why.push('有自己的显卡：路线② 走本地 ComfyUI（Wan2.2 5B 工作流），没有 API 费用');
  if (budget === 'api-key' && (primary === 'B' || secondary.has('B'))) why.push('有 API key：路线② 直接 videogen gen 批量生成（按秒计费，先 --dry-run 估算）');
  if (budget === 'web-manual' && (primary === 'B' || secondary.has('B'))) why.push('网页手动：videogen export 导出逐镜头生成包，网页生成后 import 收回');
  if (c.modifiers.some((m) => m.id === 'subtitle-heavy')) secondary.add('C');
  secondary.delete(primary);
  secondary.add('D');
  return { primary, secondary: [...secondary], videogenMode, why };
}

function genreTargets(c) {
  const { scenario: s, medium, direction } = c;
  let gs = s.genres.filter((g) => g.medium === medium || g.medium === '其他');
  if (c.explicitMedium || s.drama) gs = gs.filter((g) => g.medium === medium || (g.medium === '其他' && !s.drama));
  const pref = gs.filter((g) => g.direction === direction);
  gs = [...pref, ...gs.filter((g) => g.direction !== direction)];
  return gs;
}

export function pickPrompts(data, c, topic, opts) {
  if (c.scenario.noPrompts && !opts.forcePrompts) return { targets: [], art: null, items: [], note: '主路线不需要视频模型提示词；要做 AI 插段可加 --scenario 指定剧情类题材，或直接浏览 prompts/其他/动态图形与界面' };
  let targets = genreTargets(c);
  if (!targets.length && data.taxonomy) {
    const tree = data.taxonomy.tree[c.medium]?.[c.direction] || {};
    const top = Object.entries(tree).sort((a, b) => b[1] - a[1])[0];
    if (top) targets = [{ medium: c.medium, direction: c.direction, genre: top[0] }];
  }
  const tg = grams(topic);
  const art = opts.art || (c.medium === '漫剧' ? (c.scenario.art || [])[0] : null);
  const key = (g) => [g.medium, g.direction, g.genre].filter(Boolean).join('/');
  const rank = new Map(targets.map((g, i) => [key(g), i]));
  const kids = ['picture-book', 'healing'].includes(c.scenario.id);
  const scored = [];
  for (const p of data.prompts) {
    if (p.access === 'link-only' || !p.text) continue;
    const k = key(p);
    if (!rank.has(k)) continue;
    let s = Math.max(0, 4 - rank.get(k));
    s += Math.min(8, overlap(tg, grams(p.title + ' ' + p.text)));
    if (p.language === 'zh') s += opts.lang === 'en' ? 0 : 1.5;
    if (art && p.art_style === art) s += 2;
    if (/2\.5|2\.0/.test(p.model)) s += 0.3;
    const lt = (p.title + ' ' + p.text).toLowerCase();
    if (IP_TERMS.some((w) => lt.includes(w))) s -= 8;
    if (kids && /战斗|打斗|厮杀|鲜血|血腥|枪|爆炸|恐怖|fight|battle|blood|gun|kill|horror/.test(lt)) s -= 6;
    scored.push({ p, s });
  }
  scored.sort((a, b) => b.s - a.s || (a.p.id < b.p.id ? -1 : 1));
  const out = [], perGenre = {}, titles = new Set();
  for (const { p, s } of scored) {
    if (titles.has(p.title)) continue;
    titles.add(p.title);
    if ((perGenre[p.genre] = (perGenre[p.genre] || 0) + 1) > 3) continue;
    out.push({ id: p.id, title: p.title, genre: key(p), art_style: p.art_style || '', language: p.language,
      model: p.model, license: p.license, source_repo: p.source_repo, path: p.path, score: +s.toFixed(2) });
    if (out.length >= (opts.limit || 6)) break;
  }
  return { targets: targets.map(key), art, items: out };
}

export function pickTemplates(data, c, opts) {
  const byId = new Map(data.templates.map((t) => [t.id, t]));
  let ids = [...c.scenario.templates];
  if (opts.aspect === '16:9') ids = ids.map((x) => (x === 'manju-73db35a4' ? 'manju-92fb121c' : x));
  if (c.scenario.drama && c.medium === '漫剧' && !ids.includes('manju-cdac03bb')) ids.push('manju-cdac03bb');
  if (opts.assets?.includes('character') && !ids.includes('learnprompt-tpl-zh-character-reference-lock')) ids.push('learnprompt-tpl-zh-character-reference-lock');
  if (opts.lang === 'en') ids = ids.map((x) => x.replace('-tpl-zh-', '-tpl-en-'));
  return ids.map((id) => byId.get(id)).filter(Boolean).slice(0, 7)
    .map((t) => ({ id: t.id, title: t.title, source_repo: t.source_repo, license: t.license, path: t.path }));
}

export function pickStyles(data, c, topic, opts) {
  const styles = data.styles.styles;
  const byId = new Map(styles.map((s) => [s.id.toLowerCase(), s]));
  let ids = [...c.scenario.presets];
  if (opts.style) {
    const exact = byId.get(String(opts.style).toLowerCase());
    if (exact) ids.unshift(exact.id);
    else {
      const sg = grams(opts.style);
      const best = styles.map((s) => ({ s, n: overlap(sg, grams(`${s.name_zh} ${(s.best_for || []).join(' ')}`)) })).filter((x) => x.n).sort((a, b) => b.n - a.n)[0];
      if (best) ids.unshift(best.s.id);
    }
  }
  const tg = grams(topic);
  const extra = styles.filter((s) => !ids.includes(s.id))
    .map((s) => ({ s, n: overlap(tg, grams(`${s.name_zh} ${(s.best_for || []).join(' ')}`)) }))
    .filter((x) => x.n >= 2).sort((a, b) => b.n - a.n || (a.s.id < b.s.id ? -1 : 1)).slice(0, 2).map((x) => x.s.id);
  ids = [...new Set([...ids, ...extra])];
  return ids.map((id) => byId.get(id.toLowerCase())).filter(Boolean).slice(0, 5)
    .map((s) => ({ id: s.id, name_zh: s.name_zh, category: s.category, best_for: s.best_for || [], media: mediaForPreset(s) }));
}

// The input a scenario naturally starts from; tools that accept it directly rank higher.
const SCENARIO_INPUT = { 'repo-promo': ['repo'], product: ['product'], 'picture-book': ['story', 'image'], healing: ['story', 'image'], explainer: ['script', 'topic', 'srt'],
  book: ['topic', 'script'], data: ['data'], math: ['topic', 'script'], poem: ['poem'], vlog: ['video'], 'music-mv': ['lyrics', 'audio'] };

function costScore(cost, budget) {
  const has = (k) => cost.includes(k);
  const free = has('free-cpu') || (cost.length === 1 && has('agent-llm'));
  if (budget === 'free-cpu') return free ? 1 : has('web-manual') ? 0 : -4;
  if (budget === 'gpu') return free || has('gpu') ? 1 : -2;
  if (budget === 'web-manual') return free || has('web-manual') ? 1 : has('api-key') ? -1 : -2;
  return has('gpu') && !has('api-key') && !free ? -1 : 0.5; // api-key
}

export function rankExternal(data, c, route, opts) {
  const want = new Set([...c.scenario.use_for, ...c.modifiers.flatMap((m) => m.use_for)]);
  const keys = new Set([ROUTES[route.primary]?.key, ...route.secondary.map((r) => ROUTES[r]?.key)]);
  const scored = [];
  for (const e of data.registry.entries) {
    if (opts.commercial && ['noncommercial', 'none'].includes(e.license_class)) continue;
    const real = e.use_for.filter((u) => want.has(u)).length;
    const anyOk = e.use_for.includes('any') && e.routes.includes(ROUTES[route.primary].key);
    const uf = real + (anyOk ? 0.5 : 0);
    if (!uf) continue;
    let s = uf * 3 + (e.use_for.includes(c.scenario.use_for[0]) ? 2 : 0);
    const wantIn = SCENARIO_INPUT[c.scenario.id] || (c.scenario.drama ? ['story', 'novel', 'script'] : []);
    if (c.modifiers.some((m) => m.id === 'novel-adapt')) wantIn.push('novel');
    if (e.input.some((i) => wantIn.includes(i))) s += 1.5;
    if (e.routes.includes(ROUTES[route.primary].key)) s += 2;
    else if (e.routes.some((r) => keys.has(r))) s += 1;
    s += costScore(e.cost, opts.budget);
    s += e.zh === 'native' ? 1.5 : e.zh === 'bilingual' ? 0.7 : 0;
    s += { permissive: 1, copyleft: 0, 'source-available': 0, noncommercial: -1.5, none: -1.5 }[e.license_class] ?? 0;
    s += { archived: -3, research: opts.budget === 'gpu' ? 0 : -1.5, experimental: -0.5 }[e.maturity] ?? 0;
    s += Math.min(2, Math.log10((e.stars || 0) + 1) * 0.5);
    if (c.medium === '真人' && e.styles.length && e.styles.every((x) => ['anime', 'xianxia', 'guofeng', 'comic'].includes(x)) && c.scenario.drama) s -= 1.5;
    if (c.medium === '漫剧' && e.styles.length === 1 && e.styles[0] === 'realistic') s -= 1.5;
    scored.push({ e, s });
  }
  scored.sort((a, b) => b.s - a.s || b.e.stars - a.e.stars);
  const fmt = ({ e, s }) => ({ id: e.id, repo: e.repo, url: e.url, kind: e.kind, intro_zh: e.intro_zh, stars: e.stars, license: e.license,
    license_class: e.license_class, license_note: e.license_note, cost: e.cost, zh: e.zh, plugs_into: e.plugs_into, score: +s.toFixed(2) });
  const methods = scored.filter((x) => x.e.routes.includes('M-method') && x.e.routes.length <= 2 && x.e.category !== 'handdrawn');
  const tools = scored.filter((x) => !methods.includes(x));
  return { tools: tools.slice(0, opts.limitTools || 8).map(fmt), methods: methods.slice(0, c.scenario.drama ? 5 : 3).map(fmt) };
}

const SKELETON = {
  explain: ['（钩子）一句话抛出反常识结论或痛点', '（是什么）用一个生活化比喻解释「关键词」', '（为什么）第 1 个原因 / 第 2 个原因', '（怎么用）给一个马上能照做的方法', '（结尾）一句话总结 + 引导关注'],
  repo: ['（钩子）「它能帮你……」：直说解决什么问题', '（信号）开源许可证 / star 数 / 谁在用', '（演示）三步上手：安装 → 一条命令 → 出结果', '（适合谁）谁该用、谁不必用', '（结尾）天机亮扇：项目名 + 链接在评论区'],
  book: ['开头：这本书解决什么问题', '核心观点 1 + 一个画面化例子', '核心观点 2 + 例子', '核心观点 3 + 例子', '结尾：一句可执行的建议'],
  kids: ['从前，有一只「小主角」……', '有一天，它遇到了一个难题', '它试了一次，没成功', '朋友帮忙 / 换了个办法', '终于成功了，它明白了一个道理'],
  drama: ['第 1 镜：3 秒内立冲突（谁、想要什么、被谁挡住）', '第 2–3 镜：冲突升级 / 误会加深', '第 4 镜：反转或爽点', '第 5 镜：留钩子（下一集悬念）'],
  product: ['0–3 秒：痛点钩子或效果对比', '3–10 秒：产品出场 + 核心卖点 1', '10–20 秒：卖点 2/3 演示与证据', '20–30 秒：使用场景 + 行动号召'],
  vlog: ['开场：地点/时间/今天要做什么', '过程：3–5 个手持片段（走、看、吃、玩）', '高光：一个最有感觉的瞬间', '结尾：一句感受'],
  poem: ['题签：诗名 + 作者（逐字写出）', '每句诗一个画面，朗读一句画一景', '结尾：用白话说一句诗意'],
  data: ['开头：一个最惊人的数字', '图表 1：趋势', '图表 2：对比 / 排名', '结论：这意味着什么（注明数据来源）'],
};
const skeletonFor = (s) => ({ 'repo-promo': SKELETON.repo, explainer: SKELETON.explain, math: SKELETON.explain, book: SKELETON.book, 'picture-book': SKELETON.kids, healing: SKELETON.kids,
  product: SKELETON.product, vlog: SKELETON.vlog, poem: SKELETON.poem, data: SKELETON.data, 'music-mv': SKELETON.vlog }[s.id] || SKELETON.drama);

function commandsFor(route, ctx) {
  const { slug: sg, aspect, c, styles, budget } = ctx;
  const W = `.work/${sg}`;
  const preset = styles[0];
  const media = MEDIA.includes(ctx.media) ? ctx.media : ctx.style && preset ? preset.media : c.scenario.media;
  const ch = ctx.character || c.scenario.character || 'tianji';
  if (route === 'A') return [
    { title: '准备（只需一次）', cmds: ['cd animator && npm install && npm run setup:tts && cd ..'], note: 'Node ≥18；setup:tts 下载本地开源 TTS（Kokoro v1.1-zh，CPU、离线、免费）' },
    { title: '写台词', cmds: [`mkdir -p ${W} && $EDITOR ${W}/台词.txt`], note: '一行一句（会成为一条字幕）；空行 = 换镜头；「关键词」说到时会被画出来；「角色：台词」可切换说话人（天机/豆豆）' },
    { title: '选画风', cmds: [`node animator/src/cli.mjs styles --show ${preset?.id || 'colored-pencil-diary'}`, `node animator/src/cli.mjs styles --search ${{ poem: '水墨', 'drama-xianxia': '水墨', 'picture-book': '绘本', explainer: '讲解', book: '白板', math: '白板', data: '信息图', 'repo-promo': '讲解', comedy: '涂鸦' }[c.scenario.id] || '彩铅'}`], note: `推荐画材 --media ${media}；画风预设只是提示词配方，渲染本身不调用任何 AI 服务` },
    { title: '一条命令出片', cmds: [`node animator/src/cli.mjs make ${W}/台词.txt --out ${W}/${sg}.mp4 --character ${ch} --media ${media}`], note: '先加 --scale 0.5 快速预览；完成后会生成可编辑的工程 project.json' },
    { title: '精修（可选）', cmds: [`node animator/src/cli.mjs check ${W}/${sg}.work/project.json`, `node animator/src/cli.mjs preview ${W}/${sg}.work/project.json`, `node animator/src/cli.mjs make ${W}/${sg}.work/project.json --out ${W}/${sg}.mp4`], note: `在 project.json 里加 "stylePreset": "${preset?.id || 'colored-pencil-diary'}"，调整道具、动作、相机；${aspect === '16:9' ? '横屏把 canvas 改成 1920×1080；' : ''}synccheck 可做图文对齐质检` },
  ];
  if (route === 'B') {
    const gen = {
      api: [`node videogen/cli.mjs providers`, `node videogen/cli.mjs gen ${W}/shots.json --provider ${PROVIDER_BY_MEDIUM[c.medium]} --dry-run`, `node videogen/cli.mjs gen ${W}/shots.json --provider ${PROVIDER_BY_MEDIUM[c.medium]}`],
      comfyui: [`node videogen/cli.mjs gen ${W}/shots.json --provider comfyui --workflow videogen/workflows/wan22_ti2v_5b_${ctx.hasRefs ? 'i2v' : 't2v'}.json`],
      web: [`node videogen/cli.mjs export ${W}/shots.json --site jimeng --out ${W}/packages`, `# 按生成包逐镜头在网页端生成，下载文件名保持 S01_shot01… 前缀`, `node videogen/cli.mjs import ${W}/shots.json --from ~/Downloads`],
    }[ctx.videogenMode];
    return [
      { title: '剧本与分镜', cmds: [`mkdir -p ${W}/refs && $EDITOR ${W}/分镜.md`], note: '按下方模板写：[全局]（画风/角色/场景锁定）+ 镜头1/镜头2/…；照着推荐提示词的写法改成你的剧情' },
      ...(c.scenario.drama ? [{ title: '角色与场景资产（一致性）', cmds: [`# 用 templates/ 里「角色 4 View」「场景母版」模板出参考图，存到 ${W}/refs/`], note: '同一角色全剧用同一张参考图；分镜里用 @角色名 引用' }] : []),
      { title: '拆成镜头清单', cmds: [`node videogen/cli.mjs plan ${W}/分镜.md --out ${W}/shots.json --aspect ${aspect}${c.scenario.drama ? ` --refs ${W}/refs` : ''}`] },
      { title: `生成镜头（${{ api: '云 API', comfyui: '本地 GPU', web: '网页手动' }[ctx.videogenMode]}）`, cmds: gen, note: ctx.videogenMode === 'api' ? '先 --dry-run 只打印请求；provider 还可选 kling / minimax / veo / fal / replicate / runway / luma' : ctx.videogenMode === 'web' ? (budget === 'free-cpu' ? '网页端可能消耗会员/额度，费用以平台为准' : '网页端费用以平台为准') : 'ComfyUI 需先装好 Wan2.2 TI2V 5B 模型' },
      { title: '配音 + 字幕 + 合成', cmds: [`node videogen/cli.mjs assemble ${W}/shots.json --out ${W}/final.mp4`], note: '台词交给本地 Kokoro TTS（需先 cd animator && npm run setup:tts），自动逐字字幕；--bgm 加你有版权的音乐' },
    ];
  }
  if (route === 'C') {
    if (c.scenario.id === 'math') return [
      { title: '安装 Manim + agent skill', cmds: ['pip install manim manim-voiceover', 'npx skills add adithya-s-k/manim_skill'], note: 'Manim 社区版 MIT；需要 FFmpeg，公式需 LaTeX' },
      { title: '让 agent 写场景并渲染', cmds: [`mkdir -p ${W} && manim -qh ${W}/scene.py MainScene`] },
    ];
    const useHF = ['repo-promo', 'product', 'vlog'].includes(c.scenario.id);
    const tts = { title: '配音与字幕（复用本仓库本地 TTS）', cmds: [`node animator/src/cli.mjs make ${W}/台词.txt --out ${W}/voice-preview.mp4 --scale 0.25`], note: `会同时生成 ${W}/voice-preview.voice.*（音频 + SRT + 字级时间戳），导入代码动效工程即可逐字对齐` };
    return useHF ? [
      { title: '安装 HyperFrames（HTML→MP4，Apache-2.0）', cmds: ['npx skills add heygen-com/hyperframes', `npx hyperframes init ${W}/hf`] },
      tts,
      { title: '让 agent 写画面、预览、渲染', cmds: [`cd ${W}/hf && npx hyperframes preview`, `cd ${W}/hf && npx hyperframes render`], note: '数据图表可 npx hyperframes add data-chart；手绘质感可配 rough.js / rough-notation' },
    ] : [
      { title: '安装 Remotion skills 并新建工程', cmds: ['npx skills add remotion-dev/skills', `cd ${W} && npx create-video@latest`], note: 'Remotion License：个人/≤3 人公司免费；更大的营利公司需商业许可（否则换 HyperFrames / Motion Canvas / Revideo）' },
      tts,
      { title: '预览与渲染', cmds: ['npx remotion studio', `npx remotion render`], note: '字幕可用 remotion-subtitles；数据视频可用 DataMagic 配方' },
    ];
  }
  return [];
}

export function recommend(data, topic, opts = {}) {
  opts = { budget: 'free-cpu', ...opts };
  if (!BUDGETS[opts.budget]) throw new Error(`--budget 只能是 ${Object.keys(BUDGETS).join(' | ')}`);
  opts.assets = [].concat(opts.assets || []).flatMap((a) => String(a).split(',')).filter(Boolean);
  const c = classify(topic, opts);
  const aspect = opts.aspect || c.scenario.aspect;
  const route = decideRoute(c, opts);
  const prompts = pickPrompts(data, c, topic, { ...opts });
  const templates = pickTemplates(data, c, { ...opts, aspect });
  const styles = pickStyles(data, c, topic, opts);
  const external = rankExternal(data, c, route, opts);
  const sg = opts.slug || slug(topic);
  const ctx = { slug: sg, aspect, c, styles, budget: opts.budget, videogenMode: route.videogenMode, media: opts.media, style: opts.style, character: opts.character, hasRefs: opts.assets.includes('character') || opts.assets.includes('product') };
  const steps = [];
  steps.push({ title: '确认需求（intake）', cmds: [`node router/cli.mjs intake`], note: '题材、媒介、方向、时长、画幅、预算、角色素材、配音逐项确认；不确定就用本方案的默认值' });
  for (const r of [route.primary, ...route.secondary.filter((x) => x !== 'D').slice(0, 1)]) {
    const block = commandsFor(r, ctx);
    if (block.length) steps.push({ route: r, title: `—— ${ROUTES[r].name}${r === route.primary ? '（主路线）' : '（备选/升级）'} ——`, cmds: [] }, ...block.map((b) => ({ ...b, route: r })));
  }
  steps.push({ title: '发布前质检', cmds: [], note: '核对字幕错别字与音画对齐；按平台要求标注「AI 生成」；可用 self-media-compliance-review 做违规风险自查' });
  const compliance = [
    '本仓库提示词/模板各自保留原许可证（见每条的 license 与 source_repo），转载或二次分发请保留出处；link-only 条目只给链接，不在此推荐',
    '不使用真实明星/他人的脸、名字和声音；声音克隆、数字人只用本人或已获授权的素材',
    '背景音乐、字体、参考图需自有版权或可商用授权',
    '按《人工智能生成合成内容标识办法》和平台规则标注 AI 生成内容',
  ];
  for (const e of [...external.tools, ...external.methods]) {
    if (['noncommercial', 'none', 'copyleft', 'source-available'].includes(e.license_class)) compliance.push(`${e.repo}：${e.license_note || e.license}${e.license_class === 'none' ? '（无许可证：仅可参考，勿复制代码）' : ''}`);
  }
  if ([route.primary, ...route.secondary].includes('C') && !['math', 'repo-promo', 'product', 'vlog'].includes(c.scenario.id)) compliance.push('Remotion：个人与 ≤3 人公司免费，更大的营利公司需购买 Company License');
  const warnings = [];
  if (c.scenario === GENERIC) warnings.push('没有识别出明确题材，按「通用剧情短片」处理；可用 --scenario 指定（见 node router/cli.mjs scenarios）');
  if (route.primary === 'B' && prompts.items.length && prompts.items.every((p) => p.language !== 'zh')) warnings.push('该类目暂无中文提示词，推荐的是英文原文，可让 AI 翻译后再改写');
  return {
    topic, generated_by: 'router/cli.mjs recommend',
    inputs: { medium: c.medium, direction: c.direction, duration_s: +opts.duration || c.scenario.duration, aspect, budget: opts.budget, budget_zh: BUDGETS[opts.budget], assets: opts.assets, voice: opts.voice || 'Kokoro 本地 TTS（默认）', commercial: !!opts.commercial },
    scenario: { id: c.scenario.id, name: c.scenario.name, matched: c.matched, modifiers: c.modifiers.map((m) => ({ id: m.id, note: m.note })) },
    route: { primary: route.primary, primary_name: ROUTES[route.primary].name, secondary: route.secondary.map((r) => ({ id: r, name: ROUTES[r].name })), videogen_mode: route.videogenMode, why: route.why },
    script_skeleton: skeletonFor(c.scenario), tips: c.scenario.tips,
    prompts, templates, style_presets: styles, external, steps, compliance, warnings,
  };
}
