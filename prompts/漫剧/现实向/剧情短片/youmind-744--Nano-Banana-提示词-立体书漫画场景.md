---
id: "youmind-744"
title: "Nano Banana 提示词：立体书漫画场景"
title_en: "Nano Banana Prompt: Pop-Up Book Manga Scene"
model: "Seedance 2.0"
language: "en"
medium: "漫剧"
direction: "现实向"
genre: "剧情短片"
art_style: "2D日漫"
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/69ca1437301374f99e6145eef4837cb4cf70d1d5/README.md#L2797"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "Gadgetify"
original_author_url: "https://x.com/Gdgtify"
original_post_url: "https://x.com/Gdgtify/status/2027914970172952964"
published: "Mar 1, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=744"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# Nano Banana 提示词：立体书漫画场景

*Nano Banana Prompt: Pop-Up Book Manga Scene*

> 一个实验性的提示模板，用于生成一张 2x2 网格图像，采用高端“立体书”美学风格，描绘了著名漫画系列中的一个动态动作场景。它使用空间地图来定义图层：一个平面背景、一个跳出的 3D 角色和一个地面基座，所有这些都以“玩具摄影”的灯光效果渲染。

## 提示词（English）

```text
2x2 grid, do this 4 famous manga <spatial_map>
      [   OUT OF FOCUS LIBRARY BACKGROUND   ]

      [       VERTICAL MANGA PANEL ART      ]
      [     (Action Scene from Series)      ] <--- Backplate
                |
      [  3D {argument name="character" default="[CHARACTER]"} JUMPING OUTWARD     ] <--- Hero Object
      [  (Mid-Air Pose, Dynamic Action)     ]
                |
      [   OPEN BOOK / GRASS / DEBRIS BASE   ] <--- Ground
      [   (Infer based on {argument name="series name" default="[SERIES_NAME]"})    ]

      [  TABLE SURFACE  ]
</spatial_map>

INSTRUCTION:
1. Render as a high-end "Pop-Up Book" aesthetic.
2. The Background is flat paper. The Character is full 3D plastic/resin.
3. Lighting: "Toy Photography" style (Softbox, vibrant colors).
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/69ca1437301374f99e6145eef4837cb4cf70d1d5/README_zh.md#L2817)

```text
2x2 网格，制作这 4 个著名的漫画 <spatial_map>
      [   失焦的图书馆背景   ]

      [       垂直漫画分格艺术      ]
      [     （系列中的动作场景）      ] <--- 背景板
                |
      [  3D {argument name="character" default="[CHARACTER]"} 向外跳跃     ] <--- 主体对象
      [  （空中姿势，动态动作）     ]
                |
      [   打开的书本 / 草地 / 碎片底座   ] <--- 底部
      [   （根据 {argument name="series name" default="[SERIES_NAME]"} 推断）    ]

      [  桌面  ]
</spatial_map>

说明：
1. 渲染成高端“立体书”美学风格。
2. 背景是平面纸张。角色是全 3D 塑料/树脂。
3. 灯光：“玩具摄影”风格（柔光箱，鲜艳色彩）。
```

## 出处与许可

- 原作者：[Gadgetify](https://x.com/Gdgtify) · 原帖：<https://x.com/Gdgtify/status/2027914970172952964>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/69ca1437301374f99e6145eef4837cb4cf70d1d5/README.md#L2797)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `69ca14373013`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=744>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
