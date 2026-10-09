# 制作方案：DV vlog：2005 年夏天一家人去海边的家庭录像

> 由 `router/cli.mjs recommend` 生成。题材识别为 **Vlog / DV 录像 / 旅行记录**（vlog）；媒介 **真人** · 方向 **现实向** · 9:16 · 约 45 秒 · 预算：用即梦/可灵/海螺等网页端手动生成（会员或免费额度）

## 1. 路线

**主路线：路线②：videogen 视频生成 + prompts/ 提示词（本仓库）**

- 「Vlog / DV 录像 / 旅行记录」需要写实画面与真人表演，用视频模型生成，提示词与模板来自本仓库 prompts/ 和 templates/
- 网页手动：videogen export 导出逐镜头生成包，网页生成后 import 收回

备选：路线③：代码动效（Remotion / HyperFrames / Manim）；路线④：外部开源项目（catalog/）

## 2. 台词 / 分镜骨架

1. 开场：地点/时间/今天要做什么
2. 过程：3–5 个手持片段（走、看、吃、玩）
3. 高光：一个最有感觉的瞬间
4. 结尾：一句感受

要点：
- 有实拍素材时优先走剪辑（路线④ 的剪映 skill / editly），AI 只补空镜
- DV 质感：4:3 或带黑边、时间码、轻微噪点与自动曝光呼吸

## 3. 执行步骤

1. **确认需求（intake）** — 题材、媒介、方向、时长、画幅、预算、角色素材、配音逐项确认；不确定就用本方案的默认值

   ```bash
   node router/cli.mjs intake
   ```

**路线②：videogen 视频生成 + prompts/ 提示词（本仓库）（主路线）**

2. **剧本与分镜** — 按下方模板写：[全局]（画风/角色/场景锁定）+ 镜头1/镜头2/…；照着推荐提示词的写法改成你的剧情

   ```bash
   mkdir -p .work/dv-vlog-2005/refs && $EDITOR .work/dv-vlog-2005/分镜.md
   ```

3. **拆成镜头清单**

   ```bash
   node videogen/cli.mjs plan .work/dv-vlog-2005/分镜.md --out .work/dv-vlog-2005/shots.json --aspect 9:16
   ```

4. **生成镜头（网页手动）** — 网页端费用以平台为准

   ```bash
   node videogen/cli.mjs export .work/dv-vlog-2005/shots.json --site jimeng --out .work/dv-vlog-2005/packages
   # 按生成包逐镜头在网页端生成，下载文件名保持 S01_shot01… 前缀
   node videogen/cli.mjs import .work/dv-vlog-2005/shots.json --from ~/Downloads
   ```

5. **配音 + 字幕 + 合成** — 台词交给本地 Kokoro TTS（需先 cd animator && npm run setup:tts），自动逐字字幕；--bgm 加你有版权的音乐

   ```bash
   node videogen/cli.mjs assemble .work/dv-vlog-2005/shots.json --out .work/dv-vlog-2005/final.mp4
   ```

**路线③：代码动效（Remotion / HyperFrames / Manim）（备选/升级）**

6. **安装 HyperFrames（HTML→MP4，Apache-2.0）**

   ```bash
   npx skills add heygen-com/hyperframes
   npx hyperframes init .work/dv-vlog-2005/hf
   ```

7. **配音与字幕（复用本仓库本地 TTS）** — 会同时生成 .work/dv-vlog-2005/voice-preview.voice.*（音频 + SRT + 字级时间戳），导入代码动效工程即可逐字对齐

   ```bash
   node animator/src/cli.mjs make .work/dv-vlog-2005/台词.txt --out .work/dv-vlog-2005/voice-preview.mp4 --scale 0.25
   ```

8. **让 agent 写画面、预览、渲染** — 数据图表可 npx hyperframes add data-chart；手绘质感可配 rough.js / rough-notation

   ```bash
   cd .work/dv-vlog-2005/hf && npx hyperframes preview
   cd .work/dv-vlog-2005/hf && npx hyperframes render
   ```

9. **发布前质检** — 核对字幕错别字与音画对齐；按平台要求标注「AI 生成」；可用 self-media-compliance-review 做违规风险自查

## 4. 推荐素材（本仓库）

**画风预设**（`node animator/src/cli.mjs styles --show <id>`）

| id | 名称 | 适合 | animator 画材 |
|---|---|---|---|
| `zine-riso-collage` | Zine 孔版拼贴 | 成长回忆、旅行故事、情绪混剪 | crayon |
| `naive-marker-notes` | 稚拙马克笔笔记 | 社交媒体故事、观点表达、年轻化品牌 | marker |

**模板**

| id | 标题 | 来源 · 许可 |
|---|---|---|
| [`learnprompt-tpl-zh-handheld-ugc-vlog`](../../templates/LearnPrompt-%E5%88%86%E7%B1%BB%E6%A8%A1%E6%9D%BF/zh/zh-handheld-ugc-vlog--%F0%9F%93%B1-%E6%89%8B%E6%8C%81-UGC-vlog.md) | 📱 手持 UGC vlog | LearnPrompt/awesome-seedance · CC-BY-4.0 (curation) |
| [`learnprompt-tpl-zh-retro-found-footage`](../../templates/LearnPrompt-%E5%88%86%E7%B1%BB%E6%A8%A1%E6%9D%BF/zh/zh-retro-found-footage--%F0%9F%93%B1-%E6%97%A9%E5%B9%B4-DV-%E5%AE%B6%E5%BA%AD%E5%BD%95%E5%83%8F.md) | 📱 早年 DV 家庭录像 | LearnPrompt/awesome-seedance · CC-BY-4.0 (curation) |
| [`learnprompt-tpl-zh-travel-city-walk`](../../templates/LearnPrompt-%E5%88%86%E7%B1%BB%E6%A8%A1%E6%9D%BF/zh/zh-travel-city-walk--%F0%9F%8E%AD-%E7%94%B5%E5%BD%B1%E6%84%9F%E6%97%85%E8%A1%8C%E6%BC%AB%E6%B8%B8.md) | 🎭 电影感旅行漫游 | LearnPrompt/awesome-seedance · CC-BY-4.0 (curation) |
| [`learnprompt-tpl-zh-pov-continuous-take`](../../templates/LearnPrompt-%E5%88%86%E7%B1%BB%E6%A8%A1%E6%9D%BF/zh/zh-pov-continuous-take--%F0%9F%93%B1-%E7%AC%AC%E4%B8%80%E4%BA%BA%E7%A7%B0%E4%B8%80%E9%95%9C%E5%88%B0%E5%BA%95.md) | 📱 第一人称一镜到底 | LearnPrompt/awesome-seedance · CC-BY-4.0 (curation) |

**参考提示词**（检索类目：真人/现实向/生活与vlog、真人/现实向/年代怀旧、其他/风景空镜、其他/美食）

| id | 标题 | 类目 | 语言 | 来源 · 许可 |
|---|---|---|---|---|
| [`youmind-6728`](../../prompts/%E7%9C%9F%E4%BA%BA/%E7%8E%B0%E5%AE%9E%E5%90%91/%E7%94%9F%E6%B4%BB%E4%B8%8Evlog/youmind-6728--%E5%86%99%E5%AE%9E%E9%A3%8E%E6%A0%BC-2000-%E5%B9%B4%E4%BB%A3%E4%B8%AD%E5%9B%BD-DV-%E8%A7%86%E9%A2%91.md) | 写实风格 2000 年代中国 DV 视频 | 真人/现实向/生活与vlog | zh | YouMind-OpenLab/awesome-seedance-2-prompts · CC-BY-4.0 |
| [`youmind-7923`](../../prompts/%E7%9C%9F%E4%BA%BA/%E7%8E%B0%E5%AE%9E%E5%90%91/%E5%B9%B4%E4%BB%A3%E6%80%80%E6%97%A7/youmind-7923--90-%E5%B9%B4%E4%BB%A3%E5%A4%8D%E5%8F%A4-VHS-%E5%81%A5%E8%BA%AB-Vlog.md) | 90 年代复古 VHS 健身 Vlog | 真人/现实向/年代怀旧 | zh | YouMind-OpenLab/awesome-seedance-2-prompts · CC-BY-4.0 |
| [`youmind-9883`](../../prompts/%E7%9C%9F%E4%BA%BA/%E7%8E%B0%E5%AE%9E%E5%90%91/%E7%94%9F%E6%B4%BB%E4%B8%8Evlog/youmind-9883--%E5%A4%8D%E5%8F%A4%E6%97%A5%E7%B3%BB-MiniDV-%E6%97%85%E8%A1%8C%E8%AE%B0%E5%BF%86.md) | 复古日系 MiniDV 旅行记忆 | 真人/现实向/生活与vlog | zh | YouMind-OpenLab/awesome-seedance-2-prompts · CC-BY-4.0 |
| [`renoise-2088997736083587132`](../../prompts/%E7%9C%9F%E4%BA%BA/%E7%8E%B0%E5%AE%9E%E5%90%91/%E7%94%9F%E6%B4%BB%E4%B8%8Evlog/renoise-2088997736083587132--%E5%9F%BA%E7%A1%80%E8%AE%BE%E5%AE%9A-%E5%9F%BA%E4%BA%8E%E8%BF%99%E5%BC%A0-Mixed-2-%E7%9A%84%E8%89%B2%E5%8D%A1,%E6%96%87%E5%AD%97%E7%AD%89%E4%BF%A1%E6%81%AF%E5%92%8C%E4%BA%BA%E7%89%A9%E8%A7%92%E8%89%B2%E5%9B%BE-Mixed.md) | 基础设定：基于这张 {{Mixed 2}} 的色卡，文字等信息和人物角色图 {{Mixed 1}}… | 真人/现实向/生活与vlog | zh | renoise-ai/awesome-seedance-prompts · CC-BY-4.0 |
| [`youmind-7251`](../../prompts/%E7%9C%9F%E4%BA%BA/%E7%8E%B0%E5%AE%9E%E5%90%91/%E5%B9%B4%E4%BB%A3%E6%80%80%E6%97%A7/youmind-7251--1990-%E5%B9%B4%E4%BB%A3%E5%B7%B4%E9%BB%8E%E5%A1%9E%E7%BA%B3%E6%B2%B3%E5%AE%B6%E5%BA%AD%E5%BD%95%E5%83%8F.md) | 1990 年代巴黎塞纳河家庭录像 | 真人/现实向/年代怀旧 | zh | YouMind-OpenLab/awesome-seedance-2-prompts · CC-BY-4.0 |
| [`youmind-2667`](../../prompts/%E7%9C%9F%E4%BA%BA/%E7%8E%B0%E5%AE%9E%E5%90%91/%E5%B9%B4%E4%BB%A3%E6%80%80%E6%97%A7/youmind-2667--%E9%80%82%E7%94%A8%E4%BA%8E-Seedance-2.0-%E7%9A%84-Y2K-%E6%B3%B3%E6%B1%A0%E6%B4%BE%E5%AF%B9%E8%A7%86%E9%A2%91%E6%8F%90%E7%A4%BA%E8%AF%8D.md) | 适用于 Seedance 2.0 的 Y2K 泳池派对视频提示词 | 真人/现实向/年代怀旧 | zh | YouMind-OpenLab/awesome-seedance-2-prompts · CC-BY-4.0 |

## 5. 外部项目（catalog/registry.json）

**工具 / 引擎 / 技能**

| 项目 | ★ | 许可 | 成本 | 语言 | 用法 |
|---|---|---|---|---|---|
| [luoluoluo22/jianying-editor-skill](https://github.com/luoluoluo22/jianying-editor-skill) | 3832 | MIT | 免费CPU/Agent额度 | 中文 | 让 Agent 自动操作剪映：写文案、配音、字幕、选乐、特效到导出草稿；**接入**：成片最后一公里：把 animator/videogen 产物导入剪映精修；含 Apache-2.0 第三方组件 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | 129233 | MIT | API key/免费CPU | 中文 | 主题→文案→实拍素材库拼接→配音字幕的短视频生成；**接入**：实拍素材口播；不适合手绘；stills2video 借鉴了它的亚像素缩放与图片清洗思路（MIT，自写实现） |
| [FireRedTeam/FireRed-OpenStoryline](https://github.com/FireRedTeam/FireRed-OpenStoryline) | 3470 | Apache-2.0 | API key | 中英 | AI 剪辑 agent：自然语言驱动剪辑决策；**接入**：已有素材的剪辑路线 |
| [remotion-dev/template-tiktok](https://github.com/remotion-dev/template-tiktok) | 283 | NONE ⚠️无许可证 | 免费CPU | 英文 | 官方模板：Whisper.cpp 生成 TikTok 式逐词字幕；**接入**：口播/vlog 加逐词字幕；package.json 标注 UNLICENSED（Remotion License 管框架） |
| [Anil-matcha/Open-Generative-AI](https://github.com/Anil-matcha/Open-Generative-AI) | 29903 | MIT | API key | 英文 | 开源的多模型生成工作台：图、视频、口型等在一个界面里调用；**接入**：云端 API 聚合界面；本仓库 videogen 有同类适配器 |
| [Comfy-Org/ComfyUI](https://github.com/Comfy-Org/ComfyUI) | 136504 | GPL-3.0 传染性 | GPU | 英文 | 节点式本地生成底座；Wan2.2 I2V / FLF2V、LTX、FramePack 等都有官方或社区工作流；**接入**：stills2video --backend comfyui 与 videogen --provider comfyui 都走它的 HTTP API；工作流用 API 格式导出，节点标题写 $prompt.text / $image.image 即可自动绑定 |
| [LingyiChen-AI/comfyui-workflow-skill](https://github.com/LingyiChen-AI/comfyui-workflow-skill) | 424 | NONE ⚠️无许可证 | Agent额度/GPU | 中文 | 自然语言 → ComfyUI 工作流 JSON 的 Agent skill；**接入**：只给链接；stills2video 的工作流是从 MIT 官方模板改写的 |

**方法论（剧本、分镜、提示词）**

| 项目 | ★ | 许可 | 成本 | 语言 | 用法 |
|---|---|---|---|---|---|
| [kangarooking/director-skills](https://github.com/kangarooking/director-skills) | 174 | MIT | Agent额度 | 中文 | 导演 Skill 集：文旅视频、旅拍照片图生视频、影视资产提示词、动作打戏、角色情绪表演；**接入**：旅拍/vlog 与情绪表演 |
| [liangdabiao/make-prompt-seedance2](https://github.com/liangdabiao/make-prompt-seedance2) | 696 | NONE ⚠️无许可证 | Agent额度 | 中文 | Seedance 2.0 结构化提示词指南：16+ 模板、8+ 示例（带货、TVC、真人实拍）；**接入**：写法参考；无许可证，且 docs/ 收录他人文章，仅链接 |

## 6. 合规

- 本仓库提示词/模板各自保留原许可证（见每条的 license 与 source_repo），转载或二次分发请保留出处；link-only 条目只给链接，不在此推荐
- 不使用真实明星/他人的脸、名字和声音；声音克隆、数字人只用本人或已获授权的素材
- 背景音乐、字体、参考图需自有版权或可商用授权
- 按《人工智能生成合成内容标识办法》和平台规则标注 AI 生成内容
- remotion-dev/template-tiktok：未附 LICENSE 文件，package.json 标注 UNLICENSED；按官方方式 npx create-video 使用（无许可证：仅可参考，勿复制代码）
- Comfy-Org/ComfyUI：已读 LICENSE：GPL-3.0。本仓库只通过它的 HTTP API（/prompt、/history、/view）把它当外部程序调用，不复制、不链接它的代码。
- LingyiChen-AI/comfyui-workflow-skill：2026-10-09 确认仓库根目录没有 LICENSE / COPYING：默认保留所有权利，只能看和自用，本仓库只给链接、不复制任何内容。（无许可证：仅可参考，勿复制代码）
- liangdabiao/make-prompt-seedance2：无 LICENSE 文件；docs/ 收录了他人文章，仅链接，切勿复制（无许可证：仅可参考，勿复制代码）
