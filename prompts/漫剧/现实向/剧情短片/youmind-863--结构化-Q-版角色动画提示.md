---
id: "youmind-863"
title: "结构化 Q 版角色动画提示"
title_en: "Structured Chibi Character Animation Prompt"
model: "Seedance 2.0"
language: "en"
medium: "漫剧"
direction: "现实向"
genre: "剧情短片"
art_style: "Q版"
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/0a2bfc4f49fbfabb585f481f4454ae571e71e457/README.md#L2327"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "Sharon Riley"
original_author_url: "https://x.com/Just_sharon7"
original_post_url: "https://x.com/Just_sharon7/status/2030601657701253577"
published: "Mar 8, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=863"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# 结构化 Q 版角色动画提示

*Structured Chibi Character Animation Prompt*

> 一个高度结构化的 JSON 提示，用于 Seedance 2.0，详细描述了四段 Q 版角色动画场景，包括描述、风格、转场和输出规格。

## 提示词（English）

```text
{
  "video_generation_prompt": {
    "scenes": [
      {
        "scene_name": "Intro Jump",
        "description": "Chibi character pops up from bottom of screen, big sparkling eyes, tiny hands waving, oversized head, cheerful smile, colorful outfit with cute accessories, soft pastel gradient background, short jump animation, cinematic soft lighting, adorable expression, 2 seconds"
      },
      {
        "scene_name": "Magic Sparkle",
        "description": "Chibi character casts tiny sparkles from hands, sparkles float around, eyes wide with excitement, dynamic movement, outfit shimmering, pastel-colored magical effect, playful bouncing motion, 3 seconds"
      },
      {
        "scene_name": "Happy Dance",
        "description": "Chibi character does a cute spin and small dance step, waving tiny hands, bouncing slightly, big smile, bright pastel background, soft shading and highlights, 3 seconds"
      },
      {
        "scene_name": "Cute Wave Goodbye",
        "description": "Chibi character waves goodbye, jumps slightly and lands, eyes sparkling, happy expression, background soft pink gradient, end of video loop, 2 seconds"
      }
    ],
    "style": "Ultra-cute chibi, anime-inspired, large sparkling eyes, tiny round body, oversized head, soft pastel color palette, highly detailed cartoon textures, cinematic lighting, smooth fluid animation, 1080x1080 resolution, energetic, playful, kawaii mood",
    "transitions": "Quick cute fade between cut scenes, smooth movement, 0.5 second each",
    "output": {
      "format": "mp4",
      "frame_rate": 24,
      "duration": "total 10 seconds",
      "loop": false
    }
  }
}
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/0a2bfc4f49fbfabb585f481f4454ae571e71e457/README_zh.md#L2389)

````text
```json
{
  "video_generation_prompt": {
    "scenes": [
      {
        "scene_name": "Intro Jump",
        "description": "Q 版角色从屏幕底部跳出，大大的闪亮眼睛，小小的手挥舞着，超大的头部，开心的笑容，色彩鲜艳的服装配有可爱的配饰，柔和的渐变背景，短暂的跳跃动画，电影般的柔和灯光，可爱的表情，2 秒"
      },
      {
        "scene_name": "Magic Sparkle",
        "description": "Q 版角色双手施放小小的火花，火花在空中飘浮，眼睛因兴奋而睁大，动态的动作，服装闪闪发光，柔和的彩色魔法效果，活泼的弹跳动作，3 秒"
      },
      {
        "scene_name": "Happy Dance",
        "description": "Q 版角色做出可爱的旋转和小舞步，挥舞着小小的手，轻轻弹跳，大大的笑容，明亮的柔和背景，柔和的阴影和高光，3 秒"
      },
      {
        "scene_name": "Cute Wave Goodbye",
        "description": "Q 版角色挥手告别，轻轻一跳然后落地，眼睛闪闪发光，开心的表情，背景是柔和的粉色渐变，视频循环结束，2 秒"
      }
    ],
    "style": "超可爱 Q 版，动漫风格，大大的闪亮眼睛，小小的圆身体，超大的头部，柔和的马卡龙色调，高度细致的卡通纹理，电影级灯光，流畅的动画，1080x1080 分辨率，充满活力，俏皮，卡哇伊氛围",
    "transitions": "场景之间快速可爱的淡入淡出，平滑过渡，每个 0.5 秒",
    "output": {
      "format": "mp4",
      "frame_rate": 24,
      "duration": "总计 10 秒",
      "loop": false
    }
  }
}
````

## 出处与许可

- 原作者：[Sharon Riley](https://x.com/Just_sharon7) · 原帖：<https://x.com/Just_sharon7/status/2030601657701253577>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/0a2bfc4f49fbfabb585f481f4454ae571e71e457/README.md#L2327)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `0a2bfc4f49fb`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=863>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
