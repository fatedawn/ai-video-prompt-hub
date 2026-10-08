---
id: "youmind-2486"
title: "风格化 3D 理发店变身序列"
title_en: "Stylized 3D Barbershop Transformation Sequence"
model: "Seedance 2.0"
language: "en"
medium: "漫剧"
direction: "现实向"
genre: "剧情短片"
art_style: "3D卡通"
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/3f8bf8060fb3d828514ee474797f09620ef10a4c/README.md#L2578"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "Shami"
original_author_url: "https://x.com/ShamiWeb3"
original_post_url: "https://x.com/ShamiWeb3/status/2039372124079669655"
published: "Apr 1, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=2486"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# 风格化 3D 理发店变身序列

*Stylized 3D Barbershop Transformation Sequence*

> 这是一个为 Seedance 2.0 设计的高度结构化 JSON 格式提示词，用于生成理发店场景中的风格化 3D 动画序列。它定义了两个角色（“Dr. Eraser” 和 “Patient Plush”）、环境、氛围，以及一段详细的 15 秒动作和镜头时间轴，重点展现一场混乱而精准的理发变身过程。

## 提示词（English）

```text
{
  "title": "Stylized 3D Barbershop Transformation Sequence",
  "style": "Stylized 3D animation with exaggerated cartoon proportions, cinematic martial-arts-inspired choreography, rhythmic musical energy, ultra-smooth motion, expressive physics",

  "characters": {
    "dr_eraser": {
      "description": "Lean, almost skeletal barber-scientist with long fingers and oversized glasses that slip down his nose. Wears a bright yellow lab coat filled with strange tools (mini vacuum, magnifying glass, combs, razors, quirky gadgets).",
      "movement_style": "step → pause → spin, precise, calm, orchestral control over chaos"
    },
    "patient_plush": {
      "description": "Huge, soft, teddy-bear-like client with wild messy hair, extremely long drooping beard, and a stained oversized sweater.",
      "emotion": "nervous, trembling, comically overwhelmed, eyes tracking every movement"
    }
  },

  "environment": {
    "location": "Whimsical cartoon barbershop",
    "details": "Oversized mirrors reflecting exaggerated motion, warm golden lighting, steam curling like soft clouds, gleaming tools, hair accumulating like fluffy clouds"
  },

  "mood": "Absurd precision vs comedic fear; controlled elegance vs chaotic nervous energy",

  "timeline": [
    {
      "time": "0:00-0:02",
      "shot": "Close-up",
      "action": "Patient Plush shown with wild hair and massive beard. Dr. Eraser dramatically pulls oversized scissors, spins them on finger, snaps toward camera. Coat flares like wings. Plush reacts in exaggerated shock."
    },
    {
      "time": "0:02-0:05",
      "shot": "Mirror medium shot",
      "action": "Scissors cut rhythmically. Hair falls like confetti. Glasses magnify strands. Beard and hair begin transforming. Plush grips chair, eyes dart nervously."
    },
    {
      "time": "0:05-0:08",
      "shot": "Tracking shot",
      "action": "Scissors disappear. A giant straight razor appears like a sword. Beard shaved in stylized strips. Foam bursts like fireworks. Plush closes eyes tightly."
    },
    {
      "time": "0:08-0:11",
      "shot": "Slow motion",
      "action": "Hot towel spins through air, lands perfectly, then removed in one sharp motion revealing smooth skin. Plush touches face in disbelief."
    },
    {
      "time": "0:11-0:13",
      "shot": "Styling sequence",
      "action": "Pomade applied with theatrical precision. Hair reshaped into shiny cartoon-perfect style. Talc brush creates glowing powder cloud."
    },
    {
      "time": "0:13-0:15",
      "shot": "Final reveal",
      "action": "Chair spins to mirror. Patient Plush fully transformed. He touches face in awe. Dr. Eraser stands behind, spins scissors once, snaps them shut, nods confidently."
    }
  ],
}
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/3f8bf8060fb3d828514ee474797f09620ef10a4c/README_zh.md#L2589)

```text
{
  "title": "风格化 3D 理发店变身序列",
  "style": "风格化 3D 动画，具有夸张的卡通比例、电影般受武术启发的编舞、富有节奏感的音乐能量、极其流畅的动作、富有表现力的物理效果",

  "characters": {
    "dr_eraser": {
      "description": "瘦削、近乎骨感的理发师兼科学家，手指修长，戴着一副滑落到鼻尖的超大号眼镜。身穿亮黄色实验服，里面装满了各种奇怪的工具（迷你吸尘器、放大镜、梳子、剃刀、奇特的装置）。",
      "movement_style": "步进 → 停顿 → 旋转，精准、冷静，以管弦乐般的节奏掌控混乱"
    },
    "patient_plush": {
      "description": "巨大、柔软、像泰迪熊一样的顾客，头发凌乱不堪，留着极长的下垂胡须，穿着一件沾有污渍的超大号毛衣。",
      "emotion": "紧张、颤抖、滑稽地不知所措，双眼紧盯着每一个动作"
    }
  },

  "environment": {
    "location": "异想天开的卡通理发店",
    "details": "超大镜子反射出夸张的动作，温暖的金色灯光，像柔软云朵般卷曲的蒸汽，闪闪发光的工具，像蓬松云朵般堆积的头发"
  },

  "mood": "荒诞的精准度与喜剧般的恐惧；受控的优雅与混乱的紧张能量",

  "timeline": [
    {
      "time": "0:00-0:02",
      "shot": "特写",
      "action": "展示 Patient Plush 凌乱的头发和巨大的胡须。Dr. Eraser 戏剧性地掏出超大号剪刀，在手指上旋转，并向镜头猛地合上。实验服像翅膀一样张开。Plush 做出夸张的震惊反应。"
    },
    {
      "time": "0:02-0:05",
      "shot": "镜中中景",
      "action": "剪刀有节奏地剪动。头发像五彩纸屑一样落下。眼镜放大发丝。胡须和头发开始变形。Plush 紧紧抓住椅子，眼睛紧张地转动。"
    },
    {
      "time": "0:05-0:08",
      "shot": "追踪镜头",
      "action": "剪刀消失。一把巨大的直剃刀像剑一样出现。胡须被剃成风格化的条状。泡沫像烟花一样迸发。Plush 紧闭双眼。"
    },
    {
      "time": "0:08-0:11",
      "shot": "慢动作",
      "action": "热毛巾在空中旋转，完美地落下，然后以一个利落的动作移开，露出光滑的皮肤。Plush 难以置信地摸着脸。"
    },
    {
      "time": "0:11-0:13",
      "shot": "造型序列",
      "action": "以戏剧性的精准度涂抹发蜡。头发被重塑成闪亮、完美的卡通造型。滑石粉刷制造出一团发光的粉尘云。"
    },
    {
      "time": "0:13-0:15",
      "shot": "最终展示",
      "action": "椅子转向镜子。Patient Plush 完成了彻底变身。他惊叹地摸着脸。Dr. Eraser 站在身后，旋转剪刀一次，合上剪刀，自信地点点头。"
    }
  ]
}
```

## 出处与许可

- 原作者：[Shami](https://x.com/ShamiWeb3) · 原帖：<https://x.com/ShamiWeb3/status/2039372124079669655>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/3f8bf8060fb3d828514ee474797f09620ef10a4c/README.md#L2578)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `3f8bf8060fb3`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=2486>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
