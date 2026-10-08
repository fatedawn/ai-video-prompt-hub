---
id: "youmind-1466"
title: "现代动漫作画战斗序列提示词，适用于 Seedance 2.0"
title_en: "JSON Prompt for Modern Anime Sakuga Fight Sequence"
model: "Seedance 2.0"
language: "en"
medium: "漫剧"
direction: "特效向"
genre: "战斗大招"
art_style: "2D日漫"
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/84cdb969ad0b051a49383165597df1aa6bdc7253/README.md#L2316"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "Ertan Dönmez | Ai Master"
original_author_url: "https://x.com/ertanlabs"
original_post_url: "https://x.com/ertanlabs/status/2033618049736085713"
published: "Mar 16, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=1466"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# 现代动漫作画战斗序列提示词，适用于 Seedance 2.0

*JSON Prompt for Modern Anime Sakuga Fight Sequence*

> 一个高度详细的 JSON 提示，专为 Seedance 2.0 设计，用于生成专业、高质量的现代动漫作画（sakuga）打斗场景。它详细说明了动画风格、动作质量（流畅性、涂抹帧、动态中间动画）、打斗编排、动态镜头运用以及注重表现力面部、头发和布料物理效果的精细角色动画。

## 提示词（English）

```text
{
  "title": "Modern Anime Sakuga Fight Sequence",
  "format": "text-to-video prompt",
  "language": "en",
  "genre": "anime action fight",
  "style": {
    "animation_style": "high-quality modern anime sakuga",
    "aesthetic": "modern anime",
    "finish": "fully finished professional production quality",
    "painting": "professional anime painting",
    "lighting": "cinematic anime lighting",
    "shadows": "fully rendered shadows with polished depth and contrast",
    "resolution": "maximum resolution"
  },
  "motion_quality": {
    "fluidity": "extremely fluid and expertly animated",
    "sakuga_features": [
      "significant background movement",
      "strong smear frames",
      "dynamic in-between animation",
      "high-impact motion accents",
      "expressive timing variation"
    ],
    "body_focus": [
      "faces",
      "eyes",
      "hair",
      "fabrics",
      "arms",
      "legs"
    ],
    "animation_priority": "all character motion must feel alive, responsive, weighty, and continuous"
  },
  "fight_design": {
    "core_description": "an anime fight with unique, well-executed choreography",
    "choreography": [
      "multiple exchanges",
      "creative attack and defense flow",
      "clear impact beats",
      "distinct motion arcs",
      "cinematic combat rhythm"
    ],
    "shot_structure": [
      "multiple cuts",
      "various camera angles",
      "close-ups on expressions and eyes",
      "dynamic medium shots for combat clarity",
      "wide shots for full choreography visibility",
      "fast motion perspective shots"
    ]
  },
  "camera": {
    "style": "dynamic anime cinematography",
    "angles": [
      "low-angle hero shots",
      "high-angle impact shots",
      "close-up reaction shots",
      "tracking shots during movement",
      "wide shots during major combat beats",
      "rotating action shots where appropriate"
    ],
    "editing": "sharp, exciting anime action editing with strong visual rhythm"
  },
  "character_animation": {
    "face": "highly expressive anime facial animation",
    "eyes": "detailed eye animation with emotional intensity and sharp focus",
    "hair": "fluid hair animation reacting naturally to motion, force, and speed",
    "fabric": "cloth and costume movement must be dynamic and physically responsive",
    "limbs": "arms and legs must be anatomically clear, fast, and expertly animated during combat"
  },
  "backgrounds": {
    "movement": "backgrounds must have substantial animated motion and visual energy",
    "integration": "background movement should enhance speed, scale, and impact without reducing combat readability",
    "quality": "fully painted and polished anime backgrounds"
  },
  "dialogue": {
    "rule": "if any dialogue is present, it must be in English only"
  },
  "visual_keywords": [
    "sakuga",
    "modern anime",
    "fluid fight choreography",
    "smear frames",
    "dynamic camera angles",
    "high-detail fac"
}
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/84cdb969ad0b051a49383165597df1aa6bdc7253/README_zh.md#L2359)

````text
```json
{
  "title": "现代动漫作画战斗场景",
  "format": "文本转视频提示",
  "language": "en",
  "genre": "动漫动作格斗",
  "style": {
    "animation_style": "高质量现代动漫作画风格",
    "aesthetic": "现代动漫美学",
    "finish": "完全成品专业制作质量",
    "painting": "专业动漫上色",
    "lighting": "电影级动漫光照",
    "shadows": "完全渲染的阴影，具有精致的深度和对比度",
    "resolution": "最高分辨率"
  },
  "motion_quality": {
    "fluidity": "极其流畅且动画制作精良",
    "sakuga_features": [
      "显著的背景运动",
      "强烈的涂抹帧",
      "动态中间动画",
      "高冲击力动作强调",
      "富有表现力的节奏变化"
    ],
    "body_focus": [
      "面部",
      "眼睛",
      "头发",
      "织物",
      "手臂",
      "腿部"
    ],
    "animation_priority": "所有角色动作都必须感觉生动、反应灵敏、有分量且连贯"
  },
  "fight_design": {
    "core_description": "一场具有独特、精心编排的动漫格斗",
    "choreography": [
      "多回合交锋",
      "富有创意的攻防流程",
      "清晰的打击节奏",
      "独特的动作弧线",
      "电影般的战斗节奏"
    ],
    "shot_structure": [
      "多重剪辑",
      "多种摄像机角度",
      "表情和眼睛的特写",
      "用于战斗清晰度的动态中景",
      "用于完整编排可见度的广角镜头",
      "快速运动透视镜头"
    ]
  },
  "camera": {
    "style": "动态动漫电影摄影",
    "angles": [
      "低角度英雄镜头",
      "高角度冲击镜头",
      "特写反应镜头",
      "运动中的跟踪镜头",
      "主要战斗节奏中的广角镜头",
      "适时的旋转动作镜头"
    ],
    "editing": "锐利、激动人心的动漫动作剪辑，具有强烈的视觉节奏感"
  },
  "character_animation": {
    "face": "高度表现力的动漫面部动画",
    "eyes": "细节丰富的眼睛动画，带有情感强度和锐利焦点",
    "hair": "流畅的头发动画，自然地对运动、力量和速度做出反应",
    "fabric": "布料和服装的运动必须动态且具有物理响应性",
    "limbs": "手臂和腿部在战斗中必须解剖清晰、快速且动画制作精良"
  },
  "backgrounds": {
    "movement": "背景必须具有实质性的动画运动和视觉能量",
    "integration": "背景运动应在不降低战斗可读性的前提下增强速度、规模和冲击力",
    "quality": "完全绘制和精修的动漫背景"
  },
  "dialogue": {
    "rule": "如果存在任何对话，则必须仅使用英语"
  },
  "visual_keywords": [
    "作画",
    "现代动漫",
    "流畅的格斗编排",
    "涂抹帧",
    "动态摄像机角度",
    "高细节面部"
  ]
}
````

## 出处与许可

- 原作者：[Ertan Dönmez | Ai Master](https://x.com/ertanlabs) · 原帖：<https://x.com/ertanlabs/status/2033618049736085713>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/84cdb969ad0b051a49383165597df1aa6bdc7253/README.md#L2316)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `84cdb969ad0b`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=1466>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
