// node --test router/test/  — checks the router gives sensible plans for 8 sample topics.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { loadData, ROOT } from '../lib/data.mjs';
import { recommend, classify } from '../lib/plan.mjs';
import { planToMarkdown } from '../lib/render.mjs';
import { SAMPLES, check } from '../cli.mjs';

const data = loadData();
const plan = (i, extra = {}) => recommend(data, SAMPLES[i].topic, { ...SAMPLES[i].opts, ...extra });
const cmds = (p) => p.steps.flatMap((s) => s.cmds).join('\n');
const repos = (p) => [...p.external.tools, ...p.external.methods].map((e) => e.repo);
const exists = (rel) => fs.existsSync(path.join(ROOT, rel));

test('registry, scenario references and generated catalog are valid', () => {
  const r = check();
  assert.deepEqual(r.problems, []);
  assert.ok(r.entries >= 50);
});

test('1 仙侠漫剧 → 漫剧/特效向 videogen with 漫剧老李 templates', () => {
  const p = plan(0);
  assert.equal(p.scenario.id, 'drama-xianxia');
  assert.equal(p.inputs.medium, '漫剧');
  assert.equal(p.inputs.direction, '特效向');
  assert.equal(p.route.primary, 'B');
  assert.match(cmds(p), /videogen\/cli\.mjs gen .* --provider seedance --dry-run/);
  assert.ok(p.templates.some((t) => t.id === 'manju-cdac03bb'), 'character 4-view asset template');
  assert.ok(p.prompts.items.length >= 3);
  assert.ok(p.prompts.items.every((x) => x.genre.startsWith('漫剧/特效向/')));
  assert.ok(p.prompts.items[0].genre.endsWith('仙侠玄幻'));
  assert.ok(p.prompts.items.every((x) => exists(x.path)));
  assert.ok(p.external.methods.length >= 3);
});

test('仙侠漫剧 on free CPU falls back to the hand-drawn animator', () => {
  const p = plan(0, { budget: 'free-cpu' });
  assert.equal(p.route.primary, 'A');
  assert.ok(p.route.secondary.some((r) => r.id === 'B'));
  assert.match(cmds(p), /animator\/src\/cli\.mjs make .*--media ink/);
});

test('2 都市甜宠真人剧 → 真人/现实向, web-manual export/import', () => {
  const p = plan(1);
  assert.equal(p.scenario.id, 'drama-romance');
  assert.equal(p.inputs.medium, '真人');
  assert.equal(p.route.primary, 'B');
  assert.match(cmds(p), /export .* --site jimeng/);
  assert.match(cmds(p), /videogen\/cli\.mjs import/);
  assert.ok(p.prompts.items.every((x) => x.genre.startsWith('真人/')));
  assert.ok(p.prompts.items.some((x) => /甜宠恋爱|都市剧情/.test(x.genre)));
});

test('3 知识科普口播 → animator explainer with a line/whiteboard preset', () => {
  const p = plan(2);
  assert.equal(p.scenario.id, 'explainer');
  assert.equal(p.route.primary, 'A');
  assert.match(cmds(p), /animator\/src\/cli\.mjs make .*--character tianji/);
  assert.equal(p.style_presets[0].id, 'minimal-line-explainer');
  assert.equal(p.prompts.items.length, 0, 'explainers need no video prompts');
  assert.ok(p.external.tools.every((e) => e.cost.some((c) => ['free-cpu', 'agent-llm'].includes(c))), 'free-cpu budget keeps free tools');
});

test('4 儿童绘本故事 → animator picture-book media, kid-safe prompts', () => {
  const p = plan(3);
  assert.equal(p.scenario.id, 'picture-book');
  assert.equal(p.route.primary, 'A');
  assert.match(cmds(p), /--media picture-book/);
  assert.ok(p.scenario.modifiers.some((m) => m.id === 'kids-safe'));
  assert.ok(p.prompts.items.every((x) => !/战斗|打斗|fight|battle/i.test(x.title)));
  assert.ok(repos(p).includes('gnipbao/story-to-handdrawn-video'));
});

test('5 悬疑短剧 on own GPU → ComfyUI workflow', () => {
  const p = plan(4);
  assert.equal(p.scenario.id, 'drama-suspense');
  assert.equal(p.route.primary, 'B');
  assert.match(cmds(p), /--provider comfyui --workflow videogen\/workflows\/wan22_ti2v_5b_t2v\.json/);
  assert.ok(exists('videogen/workflows/wan22_ti2v_5b_t2v.json'));
  assert.ok(p.templates.some((t) => t.id === 'learnprompt-tpl-zh-horror-suspense'));
  assert.ok(p.prompts.items.some((x) => /悬疑/.test(x.genre)));
});

test('6 产品带货 on free CPU → code motion + no-API e-commerce skill', () => {
  const p = plan(5);
  assert.equal(p.scenario.id, 'product');
  assert.equal(p.route.primary, 'C');
  assert.ok(repos(p).includes('xianyu110/ecommerce-video-skills'));
  assert.ok(p.templates.some((t) => t.id === 'learnprompt-tpl-zh-product-commercial-shotlist'));
  assert.ok(p.prompts.items.some((x) => x.genre === '其他/广告带货'));
});

test('7 GitHub 项目推荐（天机）→ animator with 天机 host + repo-to-video tools', () => {
  const p = plan(6);
  assert.equal(p.scenario.id, 'repo-promo');
  assert.equal(p.route.primary, 'A');
  assert.match(cmds(p), /--character tianji/);
  assert.ok(repos(p).some((r) => ['latent-spaces/brag', 'nexu-io/html-video', 'Vincentwei1021/video-shotcraft'].includes(r)));
});

test('8 DV vlog → retro found-footage template and vlog prompts', () => {
  const p = plan(7);
  assert.equal(p.scenario.id, 'vlog');
  assert.equal(p.route.primary, 'B');
  assert.ok(p.templates.some((t) => t.id === 'learnprompt-tpl-zh-retro-found-footage'));
  assert.ok(p.prompts.items.some((x) => /生活与vlog|年代怀旧/.test(x.genre)));
  assert.ok(repos(p).includes('luoluoluo22/jianying-editor-skill'));
});

test('--commercial removes non-commercial and unlicensed external projects', () => {
  for (let i = 0; i < SAMPLES.length; i++) {
    const p = plan(i, { commercial: true });
    for (const e of [...p.external.tools, ...p.external.methods]) {
      assert.ok(!['noncommercial', 'none'].includes(e.license_class), `${SAMPLES[i].file}: ${e.repo}`);
      assert.ok(!e.commercial_block, `${SAMPLES[i].file}: commercial_block ${e.repo}`);
    }
  }
});

test('link-only prompts and well-known IP characters are never recommended', () => {
  const linkOnly = new Set(data.prompts.filter((p) => p.access === 'link-only').map((p) => p.id));
  for (let i = 0; i < SAMPLES.length; i++) {
    for (const x of plan(i).prompts.items) {
      assert.ok(!linkOnly.has(x.id));
      assert.ok(!/韩立|王林|孙悟空|哪吒|奥特曼|漫威/.test(x.title), x.title);
    }
  }
});

test('explicit medium and style overrides are respected', () => {
  const c = classify('一个关于友情的故事', { medium: '漫剧' });
  assert.equal(c.medium, '漫剧');
  const p = recommend(data, '一个关于友情的故事', { medium: '漫剧', budget: 'free-cpu', style: '水墨' });
  assert.equal(p.style_presets[0].category, 'ink');
  assert.match(cmds(p), /--media ink/);
});

test('every plan renders markdown and only references existing repo files', () => {
  for (let i = 0; i < SAMPLES.length; i++) {
    const p = plan(i);
    const md = planToMarkdown(p);
    assert.match(md, /## 3\. 执行步骤/);
    for (const t of p.templates) assert.ok(exists(t.path), t.path);
  }
});

test('preset → medium mapping matches animator styles.mjs', async () => {
  const { mediaForPreset } = await import('../lib/plan.mjs');
  const src = fs.readFileSync(path.join(ROOT, 'animator/src/styles.mjs'), 'utf8');
  const fn = new Function(`${src.match(/export function suggestMedia[\s\S]*?\n}\n/)[0].replace('export ', '')}; return suggestMedia;`)();
  for (const s of data.styles.styles) assert.equal(mediaForPreset(s), fn(s), s.id);
});

test('only-images / no-subscription → stills2video route S with the hardware tier', () => {
  const topic = '我只有 ChatGPT 出的几张仙侠图，没有视频订阅，想做 20 秒短片';
  const cpu = recommend(data, topic, { budget: 'free-cpu' });
  assert.equal(cpu.route.primary, 'S');
  assert.equal(cpu.stills.tier, 'cpu');
  assert.equal(cpu.stills.backend, 'cpu');
  assert.match(cmds(cpu), /stills2video\/cli\.mjs make .*--backend cpu/);
  assert.ok(exists('stills2video/cli.mjs'));
  const g8 = recommend(data, topic, { budget: 'gpu', vram: 8 });
  assert.equal(g8.stills.tier, 'gpu8');
  assert.equal(g8.stills.backend, 'comfyui');
  assert.match(cmds(g8), /--backend comfyui --dry-run/);
  assert.equal(recommend(data, topic, { budget: 'gpu', vram: 24 }).stills.tier, 'gpu24');
  assert.equal(recommend(data, topic, { budget: 'api-key' }).stills.backend, 'cloud:seedance');
  assert.equal(recommend(data, topic, { budget: 'web-manual' }).stills.backend, 'manual');
  assert.ok(recommend(data, '一个关于友情的故事', { budget: 'free-cpu', assets: 'images' }).route.primary === 'S');
  // stills/I2V/polish catalog entries are ranked for route S
  assert.ok(cpu.external.tools.some((e) => /Depth-Anything|DepthFlow|kburns|editly/.test(e.repo)));
  assert.ok(planToMarkdown(cpu).includes('路线⑤'));
});

test('video-model plans on free CPU offer stills2video as an alternative; text-only plans do not', () => {
  const p = plan(0, { budget: 'free-cpu' });
  assert.ok(p.route.secondary.some((r) => r.id === 'S'));
  assert.notEqual(p.route.primary, 'S');
  assert.equal(plan(2).stills, undefined);
});
