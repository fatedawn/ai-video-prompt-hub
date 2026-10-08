---
id: "youmind-803"
title: "Claude 提示词：数据概览与健康检查"
title_en: "Claude Prompt: Data Overview and Health Check"
model: "Seedance 2.0"
language: "zh"
medium: "真人"
direction: "现实向"
genre: "剧情短片"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/f95b78f9916dd873aaee1ec6cd36963476563aa2/README_zh.md#L2704"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "露西的百宝箱"
original_author_url: "https://x.com/Lucy_love_AI"
original_post_url: "https://x.com/Lucy_love_AI/status/2029013218367291779"
published: "Mar 4, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=803"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# Claude 提示词：数据概览与健康检查

*Claude Prompt: Data Overview and Health Check*

> 一个为 Claude 设计的提示模板，用于对上传的 Excel/CSV 文件执行初步数据分析和健康检查，重点关注摘要、缺失值、异常值和基本统计数据。

## 提示词（中文）

```text
上传您的 Excel/CSV 文件。

您是一位能迅速发现问题的高级数据分析师。

请给我一份完整的初步分析报告：

1. 文件摘要：行数、列数、数据类型、大小

2. 缺失值/重复值/异常值（每列的计数和百分比）

3. 每个数值列的基本统计数据（最小值/最大值/平均值/中位数/标准差）

4. 分类列中排名前 5-10 的类别
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的English版本（README.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/f95b78f9916dd873aaee1ec6cd36963476563aa2/README.md#L2701)

```text
Upload your Excel/CSV file.

You are a senior data analyst who quickly identifies problems.

Give me a complete first-look analysis:

1. File summary: number of rows, number of columns, data types, size

2. Missing values/duplicates/outliers (count and percentage per column)

3. Basic statistics for each numerical column (min/max/average/median/standard deviation)

4. Top 5-10 categories in categorical columns
```

## 出处与许可

- 原作者：[露西的百宝箱](https://x.com/Lucy_love_AI) · 原帖：<https://x.com/Lucy_love_AI/status/2029013218367291779>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/f95b78f9916dd873aaee1ec6cd36963476563aa2/README_zh.md#L2704)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `f95b78f9916d`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=803>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
