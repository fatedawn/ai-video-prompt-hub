---
id: "youmind-736"
title: "LLM 提示词 2：设计系统生成器"
title_en: "LLM Prompt 2: Design System Generator"
model: "Seedance 2.0"
language: "zh"
medium: "其他"
direction: null
genre: "广告带货"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/69ca1437301374f99e6145eef4837cb4cf70d1d5/README_zh.md#L2771"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "AI探路者Tim"
original_author_url: "https://x.com/AIExplorerTim"
original_post_url: "https://x.com/AIExplorerTim/status/2027922032588165213"
published: "Mar 1, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=736"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# LLM 提示词 2：设计系统生成器

*LLM Prompt 2: Design System Generator*

> 此提示要求大型语言模型 (LLM) 扮演 Apple 设计总监的角色，为一个品牌创建一套全面的设计系统，明确美学风格等属性，并要求提供诸如调色板、排版比例、间距系统和组件规范等可交付成果。

## 提示词（中文）

```text
您是 Apple 的设计总监。请为 {argument name="brand" default="[brand]"} 创建一个系统。

属性：{argument name="attributes" default="[极简/大胆/奢华/趣味]"}

生成内容：调色板、排版比例、间距系统、组件规范（30 个组件，所有状态）、布局模式、动画指南、WCAG AA 要求
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的English版本（README.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/69ca1437301374f99e6145eef4837cb4cf70d1d5/README.md#L2751)

```text
You are Apple's Design Director. Create a system for {argument name="brand" default="[brand]"}.

Attributes: {argument name="attributes" default="[minimalist/bold/luxurious/playful]"}

Generate: Color palette, typography scale, spacing system, component specifications (30 components, all states), layout patterns, animation guidelines, WCAG AA requirements
```

## 出处与许可

- 原作者：[AI探路者Tim](https://x.com/AIExplorerTim) · 原帖：<https://x.com/AIExplorerTim/status/2027922032588165213>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/69ca1437301374f99e6145eef4837cb4cf70d1d5/README_zh.md#L2771)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `69ca14373013`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=736>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
