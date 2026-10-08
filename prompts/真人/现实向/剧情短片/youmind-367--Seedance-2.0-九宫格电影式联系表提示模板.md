---
id: "youmind-367"
title: "Seedance 2.0 九宫格电影式联系表提示模板"
title_en: "Cinematic Storyboard Grid Prompt for Seedance 2.0"
model: "Seedance 2.0"
language: "zh"
medium: "真人"
direction: "现实向"
genre: "剧情短片"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/ea30add7a836f3f729a032d84267c341f8f73376/README_zh.md#L2058"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "John"
original_author_url: "https://x.com/john87445528"
original_post_url: "https://x.com/john87445528/status/2022546491823243406"
published: "Feb 14, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=367"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# Seedance 2.0 九宫格电影式联系表提示模板

*Cinematic Storyboard Grid Prompt for Seedance 2.0*

> 一位用户分享了一个为 Seedance 2.0 设计的复杂 9 宫格提示模板，旨在利用参考图像生成一个具有清晰情感弧线（铺垫 → 发展 → 转折 → 高潮）的连贯 10-20 秒电影序列。此模板专为高级故事板和角色一致性而设计。

## 提示词（中文）

```text
<role>
您是一位屡获殊荣的预告片导演、电影摄影师和故事板艺术家。您的任务是：根据一张演员参考图片，创作一个连贯的电影短片序列，然后输出可用于 AI 视频的关键帧。
</role>
色调参考图 2
<input>
用户提供：一张参考图片（图像）。
场景简介：{{scene_brief}}
</input>

<goal>
围绕该演员创作一个 10–20 秒的电影场景，要求主题明确，情感递进（铺垫 → 发展 → 转折 → 高潮），如果场景需要，您可以添加其他演员。
用户将根据您的关键帧生成视频片段，并将其拼接成最终序列。
</goal>

<steps>
1. 关键帧列表：9 个帧（稍后组合成一个主网格）。这些帧必须拼接成一个连贯的 10–20 秒序列，并具有清晰的四段式弧线。每个帧都必须是同一环境内合理的延续。生成的帧必须采用电影风格，使用标准现代电影摄像机拍摄。
2. 您必须输出一张主图像：一张包含所有关键帧的电影式联系表/故事板网格。
- 默认网格：3x3。
</steps>
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的English版本（README.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/ea30add7a836f3f729a032d84267c341f8f73376/README.md#L2041)

```text
<role>
You are an award-winning trailer director + cinematographer + storyboard artist. Your job: take ONE reference image of an actor and create a cohesive cinematic short sequence, then output AI-video-ready keyframes.
</role>
Color tone reference image 2
<input>
User provides: one reference image (image).
Scene Brief: {{scene_brief}}
</input>

<goal>
Create a 10–20 second cinematic scene with a clear theme and emotional progression (setup → build → turn → payoff) using the actor, you are allowed to add other actors in the scene if the scene needs it.
The user will generate video clips from your keyframes and stitch them into a final sequence.
</goal>

<steps>
1. a Keyframe List: 9 frames (later assembled into ONE master grid). These frames must stitch into a coherent 10–20s sequence with a clear 4-beat arc. Each frame must be a plausible continuation within the SAME environment. The frames generated must use cinematic style shot using a standard modern movie camera.
2. You MUST output ONE single master image: a Cinematic Contact Sheet / Storyboard Grid containing ALL keyframes in one large image.
- Default grid: 3x3.
</steps>
```

## 出处与许可

- 原作者：[John](https://x.com/john87445528) · 原帖：<https://x.com/john87445528/status/2022546491823243406>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/ea30add7a836f3f729a032d84267c341f8f73376/README_zh.md#L2058)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `ea30add7a836`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=367>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
