// Generates catalog/*.md from catalog/registry.json (original work, Apache-2.0).
import fs from 'node:fs';
import path from 'node:path';
import { ROOT } from './data.mjs';
import { registryTableRows } from './render.mjs';

export const FILES = { handdrawn: '01-手绘白板火柴人.md', stroke: '02-笔画与手绘风组件.md', sketchai: '03-AI草图动画研究.md', remotion: '04-Remotion生态.md',
  engine: '05-代码动效引擎.md', agentvideo: '06-视频Agent技能.md', drama: '07-漫剧短剧方法论.md', pipeline: '08-端到端平台.md',
  edit: '09-剪辑与切条.md', models: '10-开源视频模型.md', mcp: '11-视频MCP.md', promptlib: '12-提示词库资源.md' };
const BLURB = {
  handdrawn: '「一支笔画一个小人」这一类：白板逐笔、火柴人、手绘日记漫画、绘本揭示。多数是 Agent Skill，生成画面的方式分两种——**代码逐笔作画**（免费、可控）和 **AI 生插图 + 擦除/描线揭示**（需要生图）。本仓库自己的 `animator/` 属于前者。',
  stroke: '可以直接嵌进 Remotion / HyperFrames / 网页的底层组件：SVG 描边、汉字笔顺、手绘风图形、手绘标注、Excalidraw 动画化。',
  sketchai: '学术/实验方向：让孩子画的小人动起来、逐笔生成草图、从成品图反推绘画过程。多数需要 GPU，许可证差异大。',
  remotion: 'Remotion（用 React 写视频）及其官方 skills、模板、字幕组件，和基于它的中文口播/科普/数据视频 skill。⚠️ Remotion 本体为 Remotion License：个人和 ≤3 人公司免费。',
  engine: 'Remotion 之外的代码动效引擎：Manim（数学）、Motion Canvas / Revideo（MIT）、HyperFrames（HTML→MP4）、Theatre.js、Lottie、Rive、FFCreator、editly 等。',
  agentvideo: '面向编程 Agent 的视频制作技能与系统：项目发布片、带货、剪映自动化、口播剪辑、数字人、合规审核等。',
  drama: '漫剧/短剧的方法论 Skill：小说改编、编剧结构、分镜拆解、角色一致性、Seedance/可灵/H3 提示词写法、打戏与情绪表演。本仓库只写自己的总结（见 methodology.md），不复制原文。',
  pipeline: '端到端短剧/短视频平台（多为需要模型 API 或 GPU 的完整应用）。',
  edit: '把成片剪开、加字幕、出草稿、做短视频切片的开源工具。本页只写链接和我们自己的一句话介绍，不复制对方文档。带 ⚠️ 的许可证（非商用、无许可证、Elastic License 等）商用场景会被排除，排序也靠后。',
  models: '可以在自己显卡上跑的开源视频生成模型（权重许可单独写在备注里）。本仓库 videogen 已带 Wan2.2 的 ComfyUI 工作流示例。只放链接，不放权重。',
  mcp: '和视频生成、配音、工作流相关的 MCP 服务器，以及 mcp.film 这个「MCP 目录」本身（我们不内置它的数据）。非官方、可能违反平台条款的接口服务器不收录。',
  promptlib: '别人维护的提示词库，作为资源链接放在这里。正文是否能转载，以各库许可证为准；本页不复制提示词。第三方提示词被上游明确排除在许可之外的，只链到仓库。',
};

export function buildCatalog({ write = true } = {}) {
  const reg = JSON.parse(fs.readFileSync(path.join(ROOT, 'catalog/registry.json'), 'utf8'));
  const out = {};
  const head = '<!-- 本文件由 `node router/cli.mjs build-catalog` 从 catalog/registry.json 生成，请改 registry.json 后重新生成 -->';
  const counts = {};
  for (const cat of reg.categories) {
    const warn = (e) => (e.warning || e.commercial_block ? 1 : 0);
    const es = reg.entries.filter((e) => e.category === cat.id).sort((a, b) => warn(a) - warn(b) || b.stars - a.stars);
    counts[cat.id] = es.length;
    out[FILES[cat.id]] = [head, '', `# ${cat.name_zh}（${es.length}）`, '', BLURB[cat.id], '', `> 数据核验于 ${reg.checked_at}（GitHub API）；★ 与日期会变化。许可证以仓库 LICENSE 原文为准，⚠️ 标记的条目商用前务必阅读原许可证。`, '',
      ...registryTableRows(es), '', '[← 返回目录](README.md)', ''].join('\n');
  }
  const total = reg.entries.length;
  const byLic = reg.entries.reduce((m, e) => ((m[e.license_class] = (m[e.license_class] || 0) + 1), m), {});
  const featured = ['gnipbao/story-to-handdrawn-video', 'alchaincyf/huashu-art-motion', 'geeklee/srt-whiteboard-animation', 'gnipbao/whiteboard-video-engine', 'alexgreensh/anidoodle',
    'heygen-com/hyperframes', 'remotion-dev/skills', 'HKUSTDial/DataMagic', 'latent-spaces/brag', 'eternityspring/shuohao-skills', 'zenstory-ai/drama-skills', 'xianyu110/ecommerce-video-skills',
    'luoluoluo22/jianying-editor-skill', 'JuneYaooo/self-media-compliance-review', 'chanind/hanzi-writer'];
  const fe = featured.map((r) => reg.entries.find((e) => e.repo === r)).filter(Boolean);
  out['README.md'] = [head, '', `# 外部项目目录（${total} 个，核验于 ${reg.checked_at}）`, '',
    '这里聚合了做 AI 漫剧 / 手绘动画 / 代码动效 / 短剧方法论时值得用的开源项目，供人查阅，也供 AI Agent 通过 `node router/cli.mjs recommend` 自动挑选。',
    '', '- 机器可读：[`registry.json`](registry.json)（字段说明见文件内 `vocab`）', '- 方法论总结（本仓库原创整理）：[`methodology.md`](methodology.md)', '- 怎么让 Agent 用：仓库根目录 [`AGENTS.md`](../AGENTS.md)、[`skills/ai-video-director/SKILL.md`](../skills/ai-video-director/SKILL.md)', '',
    '## 分类', '', '| 分类 | 数量 | 说明 |', '|---|---|---|',
    ...reg.categories.map((c) => `| [${c.name_zh}](${encodeURI(FILES[c.id])}) | ${counts[c.id]} | ${BLURB[c.id].split('。')[0]} |`), '',
    '## 精选 15 个', '', ...registryTableRows(fe), '',
    '## 收录规则', '',
    '- 每个条目都实时调用 GitHub API 核验过存在性、★、最后推送时间；许可证读的是仓库 LICENSE 原文（GitHub 显示 NOASSERTION 的也逐个读了原文）。',
    '- **只放链接和本仓库自写的一句话简介**，不复制任何第三方代码、提示词或文档。',
    `- 许可证分布：宽松 ${byLic.permissive || 0} · 传染性(GPL/AGPL) ${byLic.copyleft || 0} · 非商用 ${byLic.noncommercial || 0} · 有条件(Remotion License) ${byLic['source-available'] || 0} · 无许可证 ${byLic.none || 0}。非商用和无许可证的仍然列出（方便了解生态），但 router 默认降权，加 \`--commercial\` 会直接排除。`,
    '- 刷新 ★/日期/许可证：`python3 catalog/tools/refresh_registry.py`（需要已登录的 gh CLI）；改完 registry.json 后运行 `node router/cli.mjs build-catalog` 重新生成这些页面。',
    '- 发现错误或希望下架：开 issue 说明即可，按仓库「合规与下架」流程处理。', ''].join('\n');
  if (write) for (const [f, s] of Object.entries(out)) fs.writeFileSync(path.join(ROOT, 'catalog', f), s);
  return out;
}
