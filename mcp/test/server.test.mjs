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
    'lint_storyboard_prompt', 'compliance_check', 'get_i2v_plan']) {
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
  await client.close();
});
