import test from 'node:test';
import assert from 'node:assert/strict';
import { Client } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio';

const LINK_ONLY = 'goodcase-aimikoda-seedance-ai-3e98e88a068f';

test('lists the read-only tools and refuses link-only prompt text', async () => {
  const client = new Client({ name: 'avph-mcp-test', version: '0' });
  await client.connect(new StdioClientTransport({
    command: 'node',
    args: ['src/server.mjs'],
    cwd: new URL('..', import.meta.url).pathname,
  }));
  const names = (await client.listTools()).tools.map((t) => t.name).sort();
  for (const need of ['recommend_video_pipeline', 'get_intake_questions', 'search_video_prompts', 'get_video_prompt',
    'list_prompt_taxonomy', 'search_templates', 'get_template', 'search_projects', 'get_project', 'get_style_presets',
    'lint_storyboard_prompt', 'compliance_check', 'get_i2v_plan', 'list_modes', 'get_slides_plan']) {
    assert.ok(names.includes(need), need);
  }
  const r = await client.callTool({ name: 'get_video_prompt', arguments: { id: LINK_ONLY } });
  const body = JSON.parse(r.content[0].text);
  assert.equal(body.prompt, null);
  assert.equal(body.access, 'link-only');
  assert.ok(body.read_at);
  assert.ok(body.attribution && body.attribution.license);
  assert.ok(!JSON.stringify(body).includes('```'));
  const plan = JSON.parse((await client.callTool({ name: 'get_i2v_plan', arguments: { image_names: ['03_城市.png', '01_竹林.png', '02_云海.png'], script: '1. 【晨雾竹林推进】第一句\n2. 第二句\n3. 第三句', vram_gb: 12 } })).content[0].text);
  assert.equal(plan.tier, 'gpu12');
  assert.equal(plan.backend, 'cpu');
  assert.equal(plan.suggest, 'comfyui');
  assert.deepEqual(plan.shots.map((s) => s.image), ['01_竹林.png', '02_云海.png', '03_城市.png']);
  assert.equal(plan.shots[0].recipe, '晨雾竹林推进');
  assert.ok(plan.shots[0].image_prompt_zh.includes('竹林'));
  const cpu = JSON.parse((await client.callTool({ name: 'get_i2v_plan', arguments: { n_images: 4 } })).content[0].text);
  assert.equal(cpu.tier, 'cpu');
  assert.equal(cpu.shots.length, 4);
  const call = async (name, args) => JSON.parse((await client.callTool({ name, arguments: args })).content[0].text);
  // modes: six routes, ⑥ is the default for 科普 / 课件 / 数理
  const modes = await call('list_modes', {});
  assert.equal(modes.modes.length, 6);
  const P = modes.modes.find((m) => m.id === 'P');
  assert.equal(P.number, '⑥');
  assert.deepEqual(P.default_for_scenarios.map((s) => s.id).sort(), ['courseware', 'math', 'science']);
  // slides plan: drafted skeleton and a real deck
  const draft = await call('get_slides_plan', { topic: '为什么天空是蓝色的' });
  assert.equal(draft.drafted, true);
  assert.ok(draft.deck_md.includes('> say:'));
  assert.deepEqual(draft.lint.filter((x) => x.level === 'error'), []);
  const bad = await call('get_slides_plan', { deck_md: '# 标题\n- 要点 {at: 不存在的词}\n\n> say: 你好。\n' });
  assert.ok(bad.lint.some((x) => x.level === 'error' && x.msg.includes('找不到')));
  // projects: stale excluded unless include_stale; useful fields returned
  const act = await call('search_projects', { route: 'P-slides', limit: 50 });
  assert.ok(act.projects.length > 10);
  for (const e of act.projects) { assert.equal(e.status, 'active'); assert.ok(e.best_for.length && e.how_to_use, e.repo); }
  const withStale = await call('search_projects', { query: 'rough', include_stale: true });
  const noStale = await call('search_projects', { query: 'rough' });
  assert.ok(withStale.projects.some((e) => e.status === 'stale'));
  assert.ok(noStale.projects.every((e) => e.status === 'active'));
  const plan2 = await call('recommend_video_pipeline', { topic: '为什么天空是蓝色的？PPT 式科普' });
  assert.equal(plan2.route.primary, 'P');
  await client.close();
});
