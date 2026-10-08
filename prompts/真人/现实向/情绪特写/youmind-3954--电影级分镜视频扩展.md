---
id: "youmind-3954"
title: "电影级分镜视频扩展"
title_en: "Cinematic Storyboard Video Extension"
model: "Seedance 2.0"
language: "en"
medium: "真人"
direction: "现实向"
genre: "情绪特写"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/b80281e1f76085a7502022eba2f30eda1eb8397c/README.md#L2871"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "Dev Khanna"
original_author_url: "https://x.com/CurieuxExplorer"
original_post_url: "https://x.com/CurieuxExplorer/status/2049709989019971811"
published: "Apr 30, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=3954"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# 电影级分镜视频扩展

*Cinematic Storyboard Video Extension*

> 一套多场景提示词序列，旨在将分镜项目转化为具有角色和光影连贯性的电影级写实场景。

## 提示词（English）

```text
Scene 1 prompt:
Use the attached storyboard sheet as the primary source of truth.

@ Image1 Create a 15-second cinematic scene exactly following the timing, shots, and dialogue from the sheet.

Characters: Indian man and Indian woman Location: modern apartment at night (living room + kitchen continuity)

Style: cinematic realism, natural acting, subtle emotions

Lighting: warm practical lighting with city lights

outside Rules:
Follow the exact shot timing and dialogue cadence from the sheet When a character speaks, keep them isolated in frame (close-up) Maintain realistic pacing, pauses, and micro-expressions

Do not exaggerate acting or add extra dialogue Audio: soft ambient room tone + subtle background music, natural dialogue delivery.

Scene 2 prompt:
Use @ video1 as the base continuity reference (same characters, positions, lighting, camera style, and emotional tone).

Use @ image1 as the storyboard guide for the next 15 seconds (follow its timing, shot sequence, and dialogue exactly).

Extend the scene naturally from where @ video1 ends.

Rules:
Maintain perfect visual continuity (same apartment layout, wardrobe, lighting, framing)

Match character appearance and expressions exactly from @ video1 Follow @ image1 strictly for shot timing and dialogue cadence

When a character speaks, keep them isolated in frame (close-up) Keep movements subtle, realistic, and emotionally grounded

Preserve pauses and natural pacing Style: cinematic realism, warm indoor lighting, soft shadows, shallow depth of field

Audio: natural dialogue delivery, soft ambient room tone, very subtle background score Do not add extra dialogue, actions, or cuts beyond @ image1.

Scene 3 prompt:
Use @ video1 as the base continuity reference (same characters, positions, lighting, camera style, and emotional tone).

Use @ image1 as the storyboard guide for the next 15 seconds (follow its timing, shot sequence, and dialogue exactly).

Extend the scene naturally from where @ video1 ends. Rules: Maintain perfect visual continuity (same apartment layout, kitchen + living room positioning, wardrobe, lighting) Match facial features, expressions, and camera framing exactly from @ video1 Follow @ image1 strictly for shot timing and dialogue cadence

When a character speaks, isolate them in frame (close-up) Keep movements minimal, realistic, and emotionally grounded

Preserve pauses, eye contact beats, and subtle performance shifts

Style: cinematic realism, warm indoor lighting, soft shadows, shallow depth of field Audio: natural dialogue delivery, soft ambient room tone, very subtle emotional background score

Do not add extra dialogue, actions, or cuts beyond @ image1.

Ensure smooth continuation with no visible jump cut—this should feel like a single continuous scene.
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/b80281e1f76085a7502022eba2f30eda1eb8397c/README_zh.md#L2871)

```text
场景 1 提示词：
请以附件中的分镜项目为主要参考依据。

@ Image1 创建一个 15 秒的电影级场景，严格遵循项目中的时间节点、镜头和对话。

角色：印度籍男性和女性 地点：夜晚的现代公寓（客厅 + 厨房连贯性）

风格：电影级写实，自然表演，细腻情感

光影：温暖的实用照明，窗外可见城市灯光

规则：
严格遵循项目中的镜头时间和对话节奏。当角色说话时，保持其在画面中独立呈现（特写）。保持写实的节奏、停顿和微表情。

不要夸大表演或添加额外对话。音频：柔和的环境音 + 微弱的背景音乐，自然的对话呈现。

场景 2 提示词：
使用 @ video1 作为基础连贯性参考（相同的角色、位置、光影、运镜风格和情感基调）。

使用 @ image1 作为接下来 15 秒的分镜指南（严格遵循其时间节点、镜头序列和对话）。

从 @ video1 结束的位置自然地延伸场景。

规则：
保持完美的视觉连贯性（相同的公寓布局、服装、光影、构图）。

角色外貌和表情需与 @ video1 完全一致。严格遵循 @ image1 的镜头时间和对话节奏。

当角色说话时，保持其在画面中独立呈现（特写）。动作保持细腻、写实且情感扎实。

保留停顿和自然的节奏。风格：电影级写实，温暖的室内光，柔和阴影，浅景深。

音频：自然的对话呈现，柔和的环境音，非常细微的背景配乐。不要添加 @ image1 之外的额外对话、动作或剪辑。

场景 3 提示词：
使用 @ video1 作为基础连贯性参考（相同的角色、位置、光影、运镜风格和情感基调）。

使用 @ image1 作为接下来 15 秒的分镜指南（严格遵循其时间节点、镜头序列和对话）。

从 @ video1 结束的位置自然地延伸场景。规则：保持完美的视觉连贯性（相同的公寓布局、厨房 + 客厅位置、服装、光影）。面部特征、表情和镜头构图需与 @ video1 完全一致。严格遵循 @ image1 的镜头时间和对话节奏。

当角色说话时，保持其在画面中独立呈现（特写）。动作保持最小化、写实且情感扎实。

保留停顿、眼神交流的节奏和细腻的表演变化。

风格：电影级写实，温暖的室内光，柔和阴影，浅景深。音频：自然的对话呈现，柔和的环境音，非常细微的情感背景配乐。

不要添加 @ image1 之外的额外对话、动作或剪辑。

确保平滑衔接，避免出现明显的跳剪——这应该感觉像是一个连续的场景。
```

## 出处与许可

- 原作者：[Dev Khanna](https://x.com/CurieuxExplorer) · 原帖：<https://x.com/CurieuxExplorer/status/2049709989019971811>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/b80281e1f76085a7502022eba2f30eda1eb8397c/README.md#L2871)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `b80281e1f760`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=3954>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
