# 漫剧 / 短剧 / 手绘讲解方法论速查（本仓库整理）

> **本页是本仓库用自己的话做的归纳**，没有摘录任何第三方原文。每条后面的链接是「这个思路在哪里被系统化地写过」，方便你去读原作。思路本身不受版权保护，但原文、模板和示例仍归原作者，请按各自许可证使用。核验日期 2026-10-08。
>
> 让 Agent 使用：`skills/ai-video-director/SKILL.md` 第 4 步会按题材引用本页的对应小节。

## 1. 总流程：先定事实，再出画面

立项（题材、受众、平台、时长）→ 剧本 → **资产锁定**（角色、场景、道具、色盘）→ 分镜 → 生成 → 配音字幕 → 剪辑 → 质检。

- **每一阶段只消费上一阶段的产物，不重新做决定。** 例如分镜阶段只把剧本「翻译」成镜头，不临时加新角色或新情节；需要改就回到剧本阶段改。这样多集、多人协作时设定才不会漂。（[eternityspring/shuohao-skills](https://github.com/eternityspring/shuohao-skills) Apache-2.0）
- **每集用几份固定的 Markdown 作为「事实来源」**（剧本、视觉设定、分镜、提示词、审查记录），后续任何工具都只读这些文件。（[zenstory-ai/drama-skills](https://github.com/zenstory-ai/drama-skills) MIT）
- **每个阶段之间设「确认闸门」**：让用户确认后再进入下一步，比一口气跑完返工少。（[aaronyi97/image-story-video-wizard](https://github.com/aaronyi97/image-story-video-wizard) MIT、[runesleo/claude-video-kit](https://github.com/runesleo/claude-video-kit) MIT）
- 本仓库对应：`router/cli.mjs recommend` 生成方案 → `docs/skill/SKILL.md` 写分镜 → `videogen plan/gen/assemble` 或 `animator make`。

## 2. 短剧剧本结构

- **开头几秒立冲突**：谁、想要什么、被谁挡住。第 1 集决定留存，要尽早给出主角的困境与「爽点承诺」。（[0xsline/short-drama](https://github.com/0xsline/short-drama) MIT、[Vi7QY/screenwriter-skill](https://github.com/Vi7QY/screenwriter-skill) MIT）
- **每集结尾留钩子**，钩子类型轮换使用（悬念、反转、危机、情感爆点、身份揭露……），避免观众摸到套路。（[lixiaoxiao9888-create/short-drama-factory](https://github.com/lixiaoxiao9888-create/short-drama-factory) MIT）
- **整季节奏有起伏**：铺垫、升级、高潮、收束的比例要提前规划；付费短剧要明确「卡点」放在哪几集。（[0xsline/short-drama](https://github.com/0xsline/short-drama)）
- **反派分层**：从眼前的小阻碍到最终对手逐级抬高，主角每赢一次都要付出代价。（同上）
- 广告/带货脚本：痛点钩子 → 卖点演示 → 证据 → 行动号召；先判断产品本身的卖点再设计画面。（[snailzsh/ad-script-master](https://github.com/snailzsh/ad-script-master) MIT、[kangarooking/promo-creator-skills](https://github.com/kangarooking/promo-creator-skills) MIT、[xianyu110/ecommerce-video-skills](https://github.com/xianyu110/ecommerce-video-skills) MIT）

## 3. 小说改编为漫剧

1. 先写**改编大纲**：主线、保留与删减、人物弧光、每集对应原著哪些章节。
2. 再做**角色设定集**（外貌、服装、性格、口头禅、音色）和**场景道具设定**。
3. 最后才分集写剧本，再进分镜。

参考：[eternityspring/shuohao-skills](https://github.com/eternityspring/shuohao-skills)、[senmanx/novel-to-manju](https://github.com/senmanx/novel-to-manju)（CC0）、[zenstory-ai/drama-skills](https://github.com/zenstory-ai/drama-skills)。改编他人小说需取得授权。

## 4. 角色与画风一致性

- **角色多视图参考图**（正、侧、背、3/4）全剧复用；分镜里用固定代号引用同一张图。本仓库模板：`templates/漫剧老李-七段式与资产图模板/`（角色 4 View、场景母版、道具资产图，MIT）。
- **全剧色盘先定死**，每集只从色盘里取色，画风就不容易漂。（[liangdabiao/smy-seedance-storyboard](https://github.com/liangdabiao/smy-seedance-storyboard)，无许可证，仅链接）
- **连续性锁定卡**：每个镜头写清首尾状态（位置、朝向、手里拿什么、伤痕/服装变化），下一个镜头从上一个的尾状态接。（[liyue-aigc/xianxia-cinematic-video-director](https://github.com/liyue-aigc/xianxia-cinematic-video-director)，无许可证，仅链接）
- 工程化做法：三视图 + 检索记忆，生成每个镜头前把相关角色设定取回来。（[neopen/story-shot-agent](https://github.com/neopen/story-shot-agent) MIT、[HVision-NKU/StoryDiffusion](https://github.com/HVision-NKU/StoryDiffusion) Apache-2.0）

## 5. 分镜与提示词写法

- **原子镜头**：一个镜头只做一件事（一个主体动作或一次运镜），复杂动作拆开。（[zyz254009-crypto/script-to-shootable-storyboard](https://github.com/zyz254009-crypto/script-to-shootable-storyboard) MIT）
- **Seedance 2.0 用「镜头1/镜头2/镜头3」而不是逐秒卡点**：官方说明精确到秒的时序控制并不稳定。Seedance 2.5 支持更长、更明确的时间轴，可以按 30 秒段落规划。（[liyue-aigc/seedance-2-5-video-director](https://github.com/liyue-aigc/seedance-2-5-video-director) MIT、[woodfantasy/Seedance-ShotDesign-Skills](https://github.com/woodfantasy/Seedance-ShotDesign-Skills) MIT-0）
- **情绪戏要给表演依据**：有作者实测 MiniMax H3 只有在镜头带对白标注时才稳定渲染面部表情，所以情绪特写镜头最好配一句台词或内心独白。（[phileiny/h3-storyboard-skill](https://github.com/phileiny/h3-storyboard-skill) MIT，作者经验，非官方结论）
- **结构化提示词**：全局设定（画风、角色、场景）+ 逐镜头（景别、运镜、动作、光线、声音）+ 负面约束。本仓库手册：`docs/分镜提示词手册.md`、`docs/skill/SKILL.md`。
- **常见失败要记录成清单**（脸崩、穿模、多手指、字幕乱码、角色互换……），每次返工先对照清单改提示词。（[A-cat-with-carrots/OnlyShot](https://github.com/A-cat-with-carrots/OnlyShot) MIT）

## 6. 打戏与法术镜头

- **攻守回合制**：把一场打戏拆成几轮「起势 → 交锋 → 余波」，每轮一个明确的胜负变化，镜头时长取整数秒。（思路见 [lixiaoxiao9888-create/xuanhuan-combat-director](https://github.com/lixiaoxiao9888-create/xuanhuan-combat-director)，无许可证，仅链接；本仓库模板 `manju-8afc721d`「玄幻法术战斗 5 段式」、`manju-d66baf8d`「15 秒大招三段式」为 MIT）
- **先出宫格分镜海报再出视频**，便于确认招式和站位。（[CY-CHENYUE/martial-arts-director-cy](https://github.com/CY-CHENYUE/martial-arts-director-cy) Apache-2.0）
- 避免直接使用知名作品的角色、招式名和标志性造型。

## 7. 手绘讲解 / 白板 / 火柴人

- **按语义节拍拆镜**，不是按字数平均切：一个意思一个画面，4–6 秒左右。（[kaomei/hand-drawn-video-prompts](https://github.com/kaomei/hand-drawn-video-prompts) MIT）
- **画面元素绑定到字幕事件**：说到哪个词，哪个元素开始画。本仓库 animator 的 `"at": "c3:苹果树"` 就是这个思路。（[geeklee/srt-whiteboard-animation](https://github.com/geeklee/srt-whiteboard-animation) MIT）
- **按叙事顺序揭示**，而不是按画面从左到右。（[geeklee/whiteboard-mask-animation](https://github.com/geeklee/whiteboard-mask-animation) MIT）
- **两种密度**：慢讲版每条 6–8 个画面，信息密集版 16–20 个画面，先和用户确认用哪种。（[nutllwhy/whiteboard-book-video-skill](https://github.com/nutllwhy/whiteboard-book-video-skill) MIT）
- **每幕一个主动作 + 少量循环小动作**，画面不会呆板也不会乱。（[alchaincyf/huashu-art-motion](https://github.com/alchaincyf/huashu-art-motion) MIT）
- **左右两个语义区**对比讲解（问题/答案、过去/现在）。（[hi-nikola/hand-drawn-explainer-video-nikola](https://github.com/hi-nikola/hand-drawn-explainer-video-nikola) Apache-2.0）
- 骨骼而非逐帧坐标：火柴人用关节骨骼驱动（走路循环、IK 踩地），比让模型逐帧写坐标稳定。（[cafermutluozkan/stick-motion](https://github.com/cafermutluozkan/stick-motion) MIT；本仓库角色也是 SVG 骨骼）

## 8. 代码动效（Remotion / HyperFrames）

- **配方卡**：把常用镜头（数字滚动、对比条、代码高亮、logo 揭示）沉淀成可复用卡片，Agent 按卡片组合。（[Vincentwei1021/video-shotcraft](https://github.com/Vincentwei1021/video-shotcraft) Apache-2.0、[HKUSTDial/DataMagic](https://github.com/HKUSTDial/DataMagic) MIT）
- **字级时间戳驱动动画**：先出配音和逐字时间戳，再写动画，而不是反过来。（[Vincentwei1021/video-talkcraft](https://github.com/Vincentwei1021/video-talkcraft)，PolyForm Noncommercial，仅链接）。本仓库 animator 的 `make` 会产出 `*.voice.*`（音频 + SRT + 字级时间戳）可直接复用。
- **独立评审回路**：生成者和评审者分开（不同提示/不同 agent），评审只看成片给意见。（[echris6/motion-video-kit](https://github.com/echris6/motion-video-kit) MIT、[erduo1998-cell/erduo-broll-loop-engineering](https://github.com/erduo1998-cell/erduo-broll-loop-engineering) MIT）
- **连贯转场**：下一个画面从上一个画面里的元素「长出来」，适合发布片。（[feitangyuan/onetake](https://github.com/feitangyuan/onetake)，PolyForm Noncommercial，仅链接）

## 9. 发布前质检

- 字幕错别字、音画对齐（animator 有 `synccheck`）、画面里的乱码文字。
- 违规风险自查：画面、声音、文字、封面、带货话术、资质、导流。（[JuneYaooo/self-media-compliance-review](https://github.com/JuneYaooo/self-media-compliance-review) MIT）
- 按《人工智能生成合成内容标识办法》和平台规则标注 AI 生成内容；不用真实名人的脸和声音；音乐、字体、参考图要有授权。

## 10. 科普 / PPT 式讲解（路线⑥ slides2video）

- **脚本验收四条**：一句话一口气能读完；每一节用钩子开头、干净地交给下一节；数字、单位、专有名词、英文单独过一遍（TTS 误读大多出在这里）；按每分钟约 280 个中文字估算时长。（[Agents365-ai/video-podcast-maker](https://github.com/Agents365-ai/video-podcast-maker) MIT）
- 以下是本仓库自己的做法（没有外部出处，当建议看），完整版见 `skills/ai-video-director/references/methods.md`：
  1. **钩子（0–3 秒）**：反常识问题、一个具体数字或一个看得见的现象；第一页就要有动作（逐条出现 / 变形），不放静止标题页。
  2. **一页一个想法**：标题就是结论句，要点 ≤4 条，每条在旁白说到关键词时出现（`{at: 词}`）。
  3. **比喻先于公式**：先用熟悉的画面讲直觉，再出公式；公式用 `\term{}` 逐项点亮，边念边圈。
  4. **分层**：现象 → 直觉 → 原理 → 公式 / 数据 → 应用或反例 → 一句话总结；层与层之间用 `morph` 把同一个元素带过去。
  5. **字幕节奏**：一句旁白一屏字幕；竖屏一行约 12–16 字，横屏约 18–22 字；中文 4–5.5 字/秒；每 3–5 秒画面要有新变化。
  6. **证据**：数据页写来源；AI 出的示意图标「示意」。
  7. **收尾**：回到开头的问题，一页总结（一句话或 3 个关键词）。
- 思路来源（只借鉴，代码自写）：Markdown 幻灯片与逐条出现（[slidevjs/slidev](https://github.com/slidevjs/slidev) MIT）、同 id 跨页变形（[hakimel/reveal.js](https://github.com/hakimel/reveal.js) Auto-Animate，MIT）、PPT 备注即旁白与聚光标记（[ai-nuts/pptx2video](https://github.com/ai-nuts/pptx2video) MIT）、版式自检（[vincentsch/explainroo](https://github.com/vincentsch/explainroo) MIT）、「每页一张 AI 图」的工作流（[Anionex/banana-slides](https://github.com/Anionex/banana-slides) AGPL，仅思路）。
