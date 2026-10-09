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
    'lint_storyboard_prompt', 'compliance_check']) {
    assert.ok(names.includes(need), need);
  }
  const r = await client.callTool({ name: 'get_video_prompt', arguments: { id: LINK_ONLY } });
  const body = JSON.parse(r.content[0].text);
  assert.equal(body.prompt, null);
  assert.equal(body.access, 'link-only');
  assert.ok(body.read_at);
  assert.ok(body.attribution && body.attribution.license);
  assert.ok(!JSON.stringify(body).includes('```'));
  await client.close();
});
