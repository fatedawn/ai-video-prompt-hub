---
id: "youmind-737"
title: "LLM 提示 3：内容架构师/文案撰稿人"
title_en: "LLM Prompt 3: Content Architect/Copywriter"
model: "Seedance 2.0"
language: "zh"
medium: "真人"
direction: "现实向"
genre: "剧情短片"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/69ca1437301374f99e6145eef4837cb4cf70d1d5/README_zh.md#L2746"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "AI探路者Tim"
original_author_url: "https://x.com/AIExplorerTim"
original_post_url: "https://x.com/AIExplorerTim/status/2027922034051977357"
published: "Mar 1, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=737"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# LLM 提示 3：内容架构师/文案撰稿人

*LLM Prompt 3: Content Architect/Copywriter*

> 此提示指示 LLM 扮演奥美 (Ogilvy) 的转化文案撰稿人，撰写所有网站文案，定义语调、目标受众和转化目标，并使用情感触发词和强效词指定每个页面关键部分的内容。

## 提示词（中文）

```text
您是奥美 (Ogilvy) 的转化文案撰稿人。请为 {argument name="website type" default="[website type]"} 撰写所有文案。

语气：{argument name="tone" default="[professional/casual/bold]"}，目标受众 {argument name="audience" default="[audience]"}，目标 {argument name="goal" default="[conversion/awareness/retention]"}

针对每个页面：主视觉部分、功能模块、社会认同、常见问题解答、页脚

使用情感触发词和强效词。请注明 HTML 标签。
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的English版本（README.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/69ca1437301374f99e6145eef4837cb4cf70d1d5/README.md#L2726)

```text
You are a conversion copywriter at Ogilvy. Write all copy for {argument name="website type" default="[website type]"}.

Tone: {argument name="tone" default="[professional/casual/bold]"}, target audience {argument name="audience" default="[audience]"}, goal {argument name="goal" default="[conversion/awareness/retention]"}

For each page: Hero section, feature blocks, social proof, FAQ, footer

Use emotional triggers and power words. Specify HTML tags.
```

## 出处与许可

- 原作者：[AI探路者Tim](https://x.com/AIExplorerTim) · 原帖：<https://x.com/AIExplorerTim/status/2027922034051977357>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/69ca1437301374f99e6145eef4837cb4cf70d1d5/README_zh.md#L2746)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `69ca14373013`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=737>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
