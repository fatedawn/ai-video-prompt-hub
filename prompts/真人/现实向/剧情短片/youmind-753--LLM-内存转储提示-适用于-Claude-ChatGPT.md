---
id: "youmind-753"
title: "LLM 内存转储提示（适用于 Claude/ChatGPT）"
title_en: "LLM Memory Dump Prompt (for Claude/ChatGPT)"
model: "Seedance 2.0"
language: "zh"
medium: "真人"
direction: "现实向"
genre: "剧情短片"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/fa969d7a723b77facaf4336fd3ac026af19bd2d4/README_zh.md#L2699"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "indigo"
original_author_url: "https://x.com/indigox"
original_post_url: "https://x.com/indigox/status/2028266426373668884"
published: "Mar 2, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=753"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# LLM 内存转储提示（适用于 Claude/ChatGPT）

*LLM Memory Dump Prompt (for Claude/ChatGPT)*

> 一个详细的系统提示，旨在与 ChatGPT 等大型语言模型 (LLM) 配合使用，以提取或“导出”用户提供给模型的所有存储记忆、背景信息、偏好和指令，并将其格式化为单个代码块，以便迁移到 OpenClaw 等其他服务。

## 提示词（中文）

```text
我正在切换到另一项服务，需要导出我的数据。请列出您存储的关于我的所有记忆，以及您从过去的对话中了解到的所有关于我的背景信息。请将所有内容输出到一个代码块中，以便我轻松复制。

请将每个条目格式化为：[保存日期（如适用）] - 记忆内容。

请确保涵盖以下内容——尽可能保留我的原话：

- 我给您关于如何回复的指示（语气、格式、风格、“总是做 X”、“从不做 Y”）

- 个人详细信息：姓名、地点、工作、家庭、兴趣

- 项目、目标和经常讨论的话题

- 我使用的工具、语言和框架

- 我的偏好以及我对您行为的纠正

- 任何未涵盖在上述内容中的其他存储背景信息。请勿进行总结、分类或遗漏任何条目。

在代码块之后，请确认这是否是全部内容，或者是否还有遗漏。
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的English版本（README.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/fa969d7a723b77facaf4336fd3ac026af19bd2d4/README.md#L2683)

```text
I am switching to another service and need to export my data. Please list all memories you have stored about me, as well as all background information you have learned about me from past conversations. Output all content in a single code block so I can easily copy it.

Format each entry as: [Date Saved (if applicable)] - Memory Content.

Ensure the following are covered — retaining my original words as much as possible:

- Instructions I gave you on how to reply (tone, format, style, “always do X,” “never do Y”)

- Personal details: name, location, job, family, interests

- Projects, goals, and frequently discussed topics

- Tools, languages, and frameworks I use

- My preferences and corrections I made to your behavior

- Any other stored background information not covered above. Do not summarize, categorize, or omit any entries.

After the code block, please confirm if this is everything, or if there is anything remaining.
```

## 出处与许可

- 原作者：[indigo](https://x.com/indigox) · 原帖：<https://x.com/indigox/status/2028266426373668884>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/fa969d7a723b77facaf4336fd3ac026af19bd2d4/README_zh.md#L2699)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `fa969d7a723b`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=753>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
