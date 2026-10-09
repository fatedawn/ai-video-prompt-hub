# 交付前质检与合规（ai-video-director 参考）

## 1. 各路线质检命令

| 路线 | 命令 | 检查什么 |
|---|---|---|
| ① animator | `node animator/src/cli.mjs check <project.json>`、`synccheck <project> <video.mp4>` | 画面呆板（无主动作）、图文对齐 |
| ② videogen | `node videogen/cli.mjs plan … --dry-run`、MCP `lint_storyboard_prompt` | 镜头要素（景别、运镜、光线、声音、参考、负面） |
| ⑤ stills2video | `render` / `make` 时自动打印防幻灯片警告（⚠）、`doctor` | 静止过久、运镜单调、缺图 |
| ⑥ slides2video | `node slides2video/cli.mjs lint deck.md --qa`、`plan deck.md --voice`、`stills deck.md`、`make … --sheet` | 一页要点数、标题长度、语速、最长静止、`at` 引用找不到；浏览器版式检查：溢出、重叠、出画、压字幕区、字号过小；每页样张拼图人工过一遍 |

通用人工检查：字幕错别字、数字单位读音、音画对齐、画面里有没有乱码文字、封面。

## 2. 合规

- **署名**：第三方提示词 / 模板保留许可证与来源（MCP `compliance_check` 可生成可粘贴的署名块）；`access: link-only` 的条目只给链接。
- **外部项目**（catalog）：只链接 + 自写简介。商用时排除非商用 / 无许可证 / 有商用限制的项目（`--commercial`）。默认只推荐 2026 年仍活跃的项目；停更项目需要明确 `include_stale`。
- **代码吸收规则**（本仓库自己的开发规则，Agent 改仓库时也要遵守）：
  - MIT / Apache / BSD：可移植，保留版权头，并写进 `NOTICE.md`、`ATTRIBUTION.md`、`LICENSES/`、对应的 `VENDOR.md`；
  - GPL / AGPL：只借鉴思路，干净重写，在文档里写明思路来源；
  - 非商用 / 无许可证 / 专有 / 自定义限制：只链接，不复制任何东西；
  - **字体**：KaTeX 字体为 SIL OFL，不提交进仓库，渲染时从 `slides2video/node_modules/katex/dist/fonts` 加载；中文字体用系统已安装的；不提交 Arphic 等字体文件，不提交花叔（huashu）作品里的画作素材。
  - 不提交模型权重、密钥、node_modules。
- **人像与声音**：不用真实名人 / 他人的脸、名字、声音；声音克隆、数字人只用本人或已授权素材。
- **素材**：音乐、字体、参考图要有授权；AI 出的示意图在数据页标「示意」。
- **标识**：按《人工智能生成合成内容标识办法》和平台规则标注 AI 生成。
- **给用户的最终回复**：成片路径、用到的提示词 / 模板 id 和来源许可、外部项目链接与许可、花费（如有）、下一步可选升级。
