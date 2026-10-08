---
id: "learnprompt-tpl-zh-storyboard-grid-to-video"
title: "🧱 分镜网格转视频"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/storyboard-grid-to-video.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🧱 分镜网格转视频

> 分两步走：先用图像模型出一张带编号格子的单页分镜图，再把这张图当参考喂给 Seedance。顺序、构图和时长由分镜图定死，视频提示语只负责把格子连起来。

## 模板（中文）

```text
我要先出一张分镜图再把它转成视频，【故事是一只流浪猫在雨夜一路找到家，分成 9 格】，【画风像皮克斯 3D，总时长 15 秒】。请根据下面这个提示语模板，分两步把提示语写好：先写生成分镜图的提示语，再写把这张分镜图转成视频的 Seedance 提示语：

#### 分镜网格转视频

分两步走：先用图像模型出一张带编号格子的单页分镜图，再把这张图当参考喂给 Seedance。顺序、构图和时长由分镜图定死，视频提示语只负责把格子连起来。

**适用场景:** 想在出片之前先看见并改定镜头顺序的多镜头片子：制作流程、动作预览、产品广告、一天生活的串场蒙太奇。

**要点:**

- 格数和总时长在出图这一步就绑死。牛角包那张分镜图的页眉写着 `TOTAL VIDEO TIME: 12 SECONDS` 和 `8 SHOTS`，页脚再算一遍 `8 shots × 1.5s = 12 seconds`。
- 两张参考图分工写清楚。灾难逃生那条把 Image1 定成 `the EXACT main character reference`，Image2 定成 `the EXACT storyboard design and layout reference`。
- 明说谁说了算。欧洲夏日漫步那条写 `Do not copy any pose or layout from the Master Character Set`，把地点、动作、构图和顺序全部交给分镜图。
- 第二步写成一小串硬规则。牛角包那条的视频提示语列了 `Follow the sequence exactly from 1 to 8`、`One shot per panel, approximately 1.5 seconds each` 和 `No skipped steps`。
- 每一格写成动作加景别，不要写成一张画。功夫那张分镜图的十二行都是 `begin mid-air with a flying diagonal kick already in motion` 这种句子，并且要求 `Every panel must contain visible motion`。

**示例:** [#1](https://goodcase.ai/cases/real-case-06-aimikoda) [#2](https://goodcase.ai/cases/real-case-07-techiebysa) [#3](https://goodcase.ai/cases/seedance-create-a-single-page-premium-hollywood-disaster-action-storyboard-in-16-9-wide-7cc2f22eaa0c) [#4](https://goodcase.ai/cases/apartment-arrival-storyboard-animation)

**结构:**

1. 出图提示语开头：单页分镜、画幅、格数，画风写成高级分镜、信息图海报或者铅笔草稿预览
2. 信息卡：片名、总时长、镜头数、音频方向，让时长和格数对得上
3. 逐格清单，一格一行：景别、这一格里正在发生的动作、这一格是干什么用的
4. 出图提示语收尾：标注系统，以及排除项，比如不要时间码、不要多余角色、不要水印
5. 视频提示语开头：点名哪张是角色参考、哪张是分镜参考，各自管什么
6. 规则清单：按 1 到 N 走、一格一镜、每镜多少秒、不跳步不加戏、人物和场景全程一致
7. 整体质感与收尾：光线、镜头运动、音频，最后写上不要字幕水印

**常见坑:**

- 把时间码画进分镜图里。格子上的时间戳会被当成画面内容一起带进视频，功夫那条在出图段直接写 `No timestamps`，时长交给第二步的规则清单。
- 格数超出时长能装下的量。按每格 1.5 到 3 秒倒推格数，牛角包那条是 8 格配 12 秒。
- 角色图和分镜图打架。模型会照抄角色图上的姿势，要写明分镜图管地点、动作、构图和顺序，角色图只管长相。
- 格子里只写画面不写动作。片子动起来就是几张静止图轮播，每一格都要给一个正在发生的动作。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/storyboard-grid-to-video.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
