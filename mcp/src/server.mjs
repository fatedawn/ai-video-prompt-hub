#!/usr/bin/env node
// Read-only MCP server. Apache-2.0, Copyright 2026 天机.
// Not published to npm. Run from a clone: node mcp/src/server.mjs
import { McpServer } from '@modelcontextprotocol/server';
import { serveStdio } from '@modelcontextprotocol/server/stdio';
import * as z from 'zod/v4';
import * as hub from './hub.mjs';

const RO = { readOnlyHint: true, openWorldHint: false, destructiveHint: false };

function ok(data) {
  const payload = { ...data, data_version: hub.dataVersion() };
  return { content: [{ type: 'text', text: JSON.stringify(payload) }], structuredContent: payload };
}

export function factory() {
  const s = new McpServer({ name: 'ai-video-prompt-hub', version: '0.1.0' });
  const tool = (name, description, schema, fn) => s.registerTool(name, { description, inputSchema: schema, annotations: RO }, async (args) => ok(await fn(args)));

  tool('recommend_video_pipeline', '按题材从本仓库路由一条只读制作方案（路线、提示词 id、模板、画风、外部项目链接、命令）。不调用任何生成 API。',
    z.object({
      topic: z.string(),
      medium: z.enum(['漫剧', '真人', '其他']).optional(),
      direction: z.enum(['现实向', '特效向']).optional(),
      budget: z.enum(['free-cpu', 'gpu', 'api-key', 'web-manual']).optional(),
      duration_s: z.number().optional(),
      aspect: z.enum(['9:16', '16:9', '1:1']).optional(),
      assets: z.array(z.enum(['character', 'product', 'footage', 'images'])).optional(),
      vram_gb: z.number().optional(),
      style: z.string().optional(),
      commercial: z.boolean().optional(),
      lang: z.enum(['zh', 'en']).optional(),
    }), (a) => hub.pipeline(a));

  tool('get_i2v_plan', '只有图片时的静图成片方案（stills2video）：按图片文件名 + 台词排镜头、选配方/运镜/转场、按显存给出后端，并给每镜 ChatGPT 出图提示词。只读：不读图片、不探测硬件、不调用任何生成接口。',
    z.object({
      script: z.string().optional(),
      image_names: z.array(z.string()).max(60).optional(),
      n_images: z.number().int().min(1).max(60).optional(),
      aspect: z.enum(['9:16', '16:9', '1:1']).optional(),
      vram_gb: z.number().min(0).max(512).optional(),
      comfyui_running: z.boolean().optional(),
      cloud_provider: z.string().optional(),
      backend: z.string().optional(),
      subject: z.string().optional(),
    }), (a) => hub.i2vPlan(a));

  tool('get_intake_questions', '列出 AI 导演开工前要向用户确认的问题。',
    z.object({ lang: z.enum(['zh', 'en']).optional() }), (a) => hub.intake(a.lang));

  tool('search_video_prompts', '检索视频分镜提示词。默认不含仅链接条目，也不返回全文。',
    z.object({
      query: z.string().optional(),
      medium: z.enum(['漫剧', '真人', '其他']).optional(),
      direction: z.enum(['现实向', '特效向']).optional(),
      genre: z.string().optional(),
      art_style: z.string().optional(),
      model: z.string().optional(),
      language: z.string().optional(),
      include_link_only: z.boolean().optional(),
      limit: z.number().int().max(50).optional(),
      cursor: z.string().optional(),
    }), (a) => hub.searchPrompts(a));

  tool('get_video_prompt', '按 id 取一条提示词。仅链接条目的 prompt 恒为 null，只给 read_at 与署名。',
    z.object({ id: z.string(), include_variants: z.boolean().optional() }), (a) => {
      const p = hub.promptById(a.id);
      if (!p) return { error: 'not found', id: a.id };
      return hub.publicPrompt(p, { includeVariants: !!a.include_variants });
    });

  tool('list_prompt_taxonomy', '媒介 → 方向 → 题材的计数，以及漫剧画风计数。', z.object({}), () => hub.taxonomy());

  tool('search_templates', '检索可复用分镜模板（不含第三方图片）。',
    z.object({ query: z.string().optional(), kind: z.string().optional(), language: z.string().optional(), limit: z.number().int().max(50).optional() }),
    (a) => ({ templates: hub.searchTemplates(a) }));

  tool('get_template', '取一个模板全文和署名。', z.object({ id: z.string() }), (a) => hub.templateById(a.id) || { error: 'not found', id: a.id });

  tool('search_projects', '检索外部项目目录。commercial=true 时排除非商用、无许可证和 Elastic/社区商用限制条目。只返回链接和自写简介。',
    z.object({
      query: z.string().optional(), category: z.string().optional(),
      route: z.enum(['A-handdrawn', 'B-videogen', 'C-code-motion', 'M-method', 'E-edit', 'S-stills']).optional(),
      cost: z.string().optional(), zh: z.string().optional(), license_class: z.string().optional(),
      commercial: z.boolean().optional(), limit: z.number().int().max(50).optional(),
    }), (a) => ({ projects: hub.projects(a) }));

  tool('get_project', '按 owner/repo 取目录条目（自写简介、许可证、核验日期）。不转发对方 README。',
    z.object({ repo: z.string() }), (a) => hub.projectByRepo(a.repo) || { error: 'not found', repo: a.repo });

  tool('get_style_presets', '手绘画风预设（配方摘要 + 上游署名）。',
    z.object({ query: z.string().optional(), featured: z.boolean().optional(), id: z.string().optional(), limit: z.number().int().max(50).optional() }),
    (a) => ({ presets: hub.stylePresets(a) }));

  tool('lint_storyboard_prompt', '对分镜草稿做启发式要素检查（镜头、时长、运镜、光线、声音、参考、负面）。不是版权审核。',
    z.object({ text: z.string(), target_model: z.string().optional(), duration_s: z.number().optional() }),
    (a) => hub.lintStoryboard(a.text, a.target_model));

  tool('compliance_check', '汇总署名义务，并给出可粘贴的 attribution_block。商用时会挡住非商用/无许可证/有商用限制的项目，以及仅链接条目。',
    z.object({
      prompt_ids: z.array(z.string()).optional(),
      template_ids: z.array(z.string()).optional(),
      project_repos: z.array(z.string()).optional(),
      commercial: z.boolean().optional(),
      uses_real_person: z.boolean().optional(),
      voice_clone: z.boolean().optional(),
      platform: z.string().optional(),
    }), (a) => hub.compliance(a));

  return s;
}

if (process.argv[1] && process.argv[1].endsWith('server.mjs')) serveStdio(factory);
