---
id: "youmind-200"
title: "Seedance 2.0 提示词技术和模板"
title_en: "Seedance 2.0 Prompting Techniques and Template"
model: "Seedance 2.0"
language: "zh"
medium: "真人"
direction: "现实向"
genre: "剧情短片"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/b48207165d655f5e155039c41ebb907381984a0d/README_zh.md#L1982"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "web3奶糖"
original_author_url: "https://x.com/web3naitang"
original_post_url: "https://x.com/web3naitang/status/2021510580440608905"
published: "Feb 11, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=200"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# Seedance 2.0 提示词技术和模板

*Seedance 2.0 Prompting Techniques and Template*

> 一份关于如何撰写高效 Seedance 2.0 提示词的综合指南，内容包括一个通用公式（主体 + 动作 + 场景 + 灯光 + 运镜 + 风格 + 质量 + 限制）、描述动作和运镜的技巧、稳定化技术，以及两个可直接用于人像和风景视频的模板。

## 提示词（中文）

```text
① 通用公式

主体 + 动作 + 场景 + 光线 + 镜头语言 + 风格 + 质量 + 约束

示例：
一个女孩在海边缓慢行走，发丝被微风轻柔吹动，自然微笑，夕阳暖光，中景，缓慢推近，运镜稳定流畅，4K 高清，电影质感，面部清晰无畸形。

② 动作描述

不要只写：走路 / 跳舞
要写：缓慢 + 持续 + 自然

优先词：
缓慢、轻柔、自然、持续、流畅、不僵硬

好用的组合：
缓慢转身 / 轻柔抬手 / 微微低头 / 随风摇曳

③ 镜头语言

Seedance 在识别镜头运动上很强，记得写：

特写 / 中景 / 特殊镜头
缓慢推近 / 轻微拉远 / 平滑横移 / 稳定跟拍

示例：
中景，缓慢推近，稳定跟拍，运镜流畅无卡顿

④ 防变脸 / 防畸形

非常重要：

面部清晰，五官稳定，无畸形
人体结构正常，比例自然
相同人物，服装一致，发型不变

⑤ 质量提升通用词

4K，超高清，细节丰富，清晰锐利
电影质感，柔和光影，色彩自然
无模糊，无闪烁，画面稳定

⑥ 风格 / 氛围词

治愈清新 / 日系风格 / 韩系氛围
复古胶片颗粒 / 梦幻柔光 / 赛博朋克
极简干净 / 高级质感

⑦ 多镜头写法（进阶用法）

按顺序描述，不要随意打乱：

特写面部开场 → 缓慢拉远 → 人物缓慢行走 → 镜头平稳跟随 → 定格微笑结尾

⑧ 规避指南

❌ 剧烈跑跳 / 复杂多人互动
❌ 模糊词：好看 / 很美 / 很酷
❌ 矛盾要求：超高速 + 极致稳定

⑨ 可直接复制的模板

人像氛围短片
一个女孩在森林中缓慢行走，发丝被微风轻柔吹动，自然微笑，中景，缓慢推近，运镜稳定流畅，4K 高清，电影质感，面部清晰无畸形。

风景氛围
夕阳下的海边，海浪轻柔拍打沙滩，镜头缓慢横移，暖橙色调，画面流畅，4K 超高清，无闪烁无重影。

⑩ 提示总结

1️⃣ 动作写缓慢、持续
2️⃣ 运镜写稳定、简单
3️⃣ 必加稳定 / 无畸形 / 不僵硬
4️⃣ 质量 & 风格最后加
5️⃣ 少复杂，多精准
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的English版本（README.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/b48207165d655f5e155039c41ebb907381984a0d/README.md#L2013)

```text
A young girl slowly walks in the forest, the breeze gently ruffles her hair, smiling naturally, medium shot, slow push-in, stable and smooth picture, 4K high definition, cinematic feel, clear and non-distorted face.

Sunset by the sea, waves gently lapping the beach, slow horizontal camera movement, warm orange tones, silky smooth picture, 4K ultra-high definition, no flicker, no ghosting.
```

## 出处与许可

- 原作者：[web3奶糖](https://x.com/web3naitang) · 原帖：<https://x.com/web3naitang/status/2021510580440608905>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/b48207165d655f5e155039c41ebb907381984a0d/README_zh.md#L1982)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `b48207165d65`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=200>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
