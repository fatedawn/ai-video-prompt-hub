# 制作方案：GitHub 项目推荐（天机）：一个免费的本地 AI 配音开源工具

> 由 `router/cli.mjs recommend` 生成。题材识别为 **GitHub 项目 / AI 工具推荐（天机风）**（repo-promo）；媒介 **其他** · 方向 **现实向** · 9:16 · 约 60 秒 · 预算：免费 + 普通电脑（CPU）

## 1. 路线

**主路线：路线①：animator 手绘动画（本仓库）**

- 「GitHub 项目 / AI 工具推荐（天机风）」以讲清楚/讲好故事为主，本仓库 animator 手绘逐笔动画免费、CPU 可跑、画面与台词逐词对齐

备选：路线③：代码动效（Remotion / HyperFrames / Manim）；路线④：外部开源项目（catalog/）

## 2. 台词 / 分镜骨架

1. （钩子）「它能帮你……」：直说解决什么问题
2. （信号）开源许可证 / star 数 / 谁在用
3. （演示）三步上手：安装 → 一条命令 → 出结果
4. （适合谁）谁该用、谁不必用
5. （结尾）天机亮扇：项目名 + 链接在评论区

要点：
- 开头 3 秒直接说「它能帮你做什么」，再给 star 数/许可证等可信信号
- 天机「亮扇」reveal 动作适合放在项目名揭晓那一句
- 代码/架构插段用路线③（Code Hike 模板、Archscribe 手绘架构图）

## 3. 执行步骤

1. **确认需求（intake）** — 题材、媒介、方向、时长、画幅、预算、角色素材、配音逐项确认；不确定就用本方案的默认值

   ```bash
   node router/cli.mjs intake
   ```

**路线①：animator 手绘动画（本仓库）（主路线）**

2. **准备（只需一次）** — Node ≥18；setup:tts 下载本地开源 TTS（Kokoro v1.1-zh，CPU、离线、免费）

   ```bash
   cd animator && npm install && npm run setup:tts && cd ..
   ```

3. **写台词** — 一行一句（会成为一条字幕）；空行 = 换镜头；「关键词」说到时会被画出来；「角色：台词」可切换说话人（天机/豆豆）

   ```bash
   mkdir -p .work/github-项目推荐 && $EDITOR .work/github-项目推荐/台词.txt
   ```

4. **选画风** — 推荐画材 --media colored-pencil；画风预设只是提示词配方，渲染本身不调用任何 AI 服务

   ```bash
   node animator/src/cli.mjs styles --show minimal-line-explainer
   node animator/src/cli.mjs styles --search 讲解
   ```

5. **一条命令出片** — 先加 --scale 0.5 快速预览；完成后会生成可编辑的工程 project.json

   ```bash
   node animator/src/cli.mjs make .work/github-项目推荐/台词.txt --out .work/github-项目推荐/github-项目推荐.mp4 --character tianji --media colored-pencil
   ```

6. **精修（可选）** — 在 project.json 里加 "stylePreset": "minimal-line-explainer"，调整道具、动作、相机；synccheck 可做图文对齐质检

   ```bash
   node animator/src/cli.mjs check .work/github-项目推荐/github-项目推荐.work/project.json
   node animator/src/cli.mjs preview .work/github-项目推荐/github-项目推荐.work/project.json
   node animator/src/cli.mjs make .work/github-项目推荐/github-项目推荐.work/project.json --out .work/github-项目推荐/github-项目推荐.mp4
   ```

**路线③：代码动效（Remotion / HyperFrames / Manim）（备选/升级）**

7. **安装 HyperFrames（HTML→MP4，Apache-2.0）**

   ```bash
   npx skills add heygen-com/hyperframes
   npx hyperframes init .work/github-项目推荐/hf
   ```

8. **配音与字幕（复用本仓库本地 TTS）** — 会同时生成 .work/github-项目推荐/voice-preview.voice.*（音频 + SRT + 字级时间戳），导入代码动效工程即可逐字对齐

   ```bash
   node animator/src/cli.mjs make .work/github-项目推荐/台词.txt --out .work/github-项目推荐/voice-preview.mp4 --scale 0.25
   ```

9. **让 agent 写画面、预览、渲染** — 数据图表可 npx hyperframes add data-chart；手绘质感可配 rough.js / rough-notation

   ```bash
   cd .work/github-项目推荐/hf && npx hyperframes preview
   cd .work/github-项目推荐/hf && npx hyperframes render
   ```

10. **发布前质检** — 核对字幕错别字与音画对齐；按平台要求标注「AI 生成」；可用 self-media-compliance-review 做违规风险自查

## 4. 推荐素材（本仓库）

**画风预设**（`node animator/src/cli.mjs styles --show <id>`）

| id | 名称 | 适合 | animator 画材 |
|---|---|---|---|
| `minimal-line-explainer` | 极简黑白线条讲解 | 知识讲解、流程、观点拆解 | pencil |
| `naive-marker-notes` | 稚拙马克笔笔记 | 社交媒体故事、观点表达、年轻化品牌 | marker |
| `whiteboard-explainer` | 白板讲解动画 | 教程、商业解释、时间线 | pencil |
| `bean-doodle-infographic` | 小豆人涂鸦信息图 | 方法步骤、清单、知识卡 | pencil |

**参考提示词**：主路线不需要视频模型提示词；要做 AI 插段可加 --scenario 指定剧情类题材，或直接浏览 prompts/其他/动态图形与界面

## 5. 外部项目（catalog/registry.json）

**工具 / 引擎 / 技能**

| 项目 | ★ | 许可 | 成本 | 语言 | 用法 |
|---|---|---|---|---|---|
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | 59325 | Apache-2.0 | 免费CPU | 英文 | HeyGen 出品：写 HTML 渲视频，为 agent 设计的确定性 HTML→MP4 框架（Apache-2.0）；**接入**：大量中文白板/口播 skill 的渲染底座；与 Remotion 二选一 |
| [Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) | 10922 | Apache-2.0 | 免费CPU/Agent额度 | 中英 | 电影感产品宣传片 skill：150+ 镜头配方卡、200+ 动效预览、可直接用的 Remotion 模板；**接入**：产品带货/项目推荐的 Remotion 镜头库（Apache-2.0） |
| [excalidraw/excalidraw](https://github.com/excalidraw/excalidraw) | 133521 | MIT | 免费CPU | 中英 | 手绘风白板（开源），大量手绘工具的上游；**接入**：画线稿/示意图，再交给 excalidraw-animate / excalimate 动起来 |
| [latent-spaces/brag](https://github.com/latent-spaces/brag) | 14453 | MIT | 免费CPU/Agent额度 | 英文 | /brag：把你刚做的项目一条命令变成带音乐、动效和分享文案的发布短片；**接入**：GitHub 项目推荐（天机）的现成「项目→发布片」方案 |
| [op7418/guizang-product-video-skill](https://github.com/op7418/guizang-product-video-skill) | 738 | AGPL-3.0 传染性 | 免费CPU/Agent额度 | 中文 | 归藏：复用产品真实组件与设计语言，用代码做软件更新宣传片（含分镜文案、原创配乐、音效）；**接入**：软件/开源项目宣传片；AGPL-3.0 |
| [nexu-io/html-video](https://github.com/nexu-io/html-video) | 4654 | Apache-2.0 | 免费CPU/Agent额度 | 英文 | 编程 agent 的程序化视频：HTML/CSS/数据→MP4，21 个模板，可直接贴文章或 GitHub 仓库链接；**接入**：「GitHub 仓库→视频」直接对口天机选题 |
| [geekjourneyx/hyperframes-motion-director](https://github.com/geekjourneyx/hyperframes-motion-director) | 451 | AGPL-3.0 传染性 | 免费CPU/Agent额度 | 中文 | 中文优先的 HyperFrames 动效视频导演：文章/产品/网站/README→9:16 宣传片，含审片；**接入**：README→竖屏宣传片；AGPL-3.0 |
| [lazypay/Archscribe](https://github.com/lazypay/Archscribe) | 359 | MIT | 免费CPU/Agent额度 | 中文 | 手绘风动态架构/流程图：JSON 配置→可编辑 Excalidraw + PNG + 真动画 GIF，深色霓虹/浅色纸面两套；**接入**：GitHub 项目推荐里的「架构图」插段素材 |

**方法论（剧本、分镜、提示词）**

| 项目 | ★ | 许可 | 成本 | 语言 | 用法 |
|---|---|---|---|---|---|
| [kangarooking/promo-creator-skills](https://github.com/kangarooking/promo-creator-skills) | 103 | MIT | Agent额度 | 中文 | 产品宣传片 skills：先做产品判断，再叙事结构、视觉规划、HyperFrames 剪辑、BGM 设计；**接入**：带货/宣传片的「先判断后画面」方法 |
| [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | 40203 | MIT | API key/免费CPU | 中文 | 清华多智能体互动课堂：主题/文档 → 课件 + 白板公式 + 语音讲解，可一键导出 MP4；**接入**：课堂化讲解的参考（多角色、白板推导）；本仓库只链接 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | 58391 | MIT | Agent额度 | 中英 | Agent skill：把文档或主题做成原生可编辑的 PPTX（母版、形状、图表、公式、切换和动画）；**接入**：在 Codex / Claude Code 里先用它生成 PPTX，再交给 slides2video import 或 pptx2video 出片 |

## 6. 合规

- 本仓库提示词/模板各自保留原许可证（见每条的 license 与 source_repo），转载或二次分发请保留出处；link-only 条目只给链接，不在此推荐
- 不使用真实明星/他人的脸、名字和声音；声音克隆、数字人只用本人或已获授权的素材
- 背景音乐、字体、参考图需自有版权或可商用授权
- 按《人工智能生成合成内容标识办法》和平台规则标注 AI 生成内容
- op7418/guizang-product-video-skill：AGPL-3.0
- geekjourneyx/hyperframes-motion-director：AGPL-3.0
