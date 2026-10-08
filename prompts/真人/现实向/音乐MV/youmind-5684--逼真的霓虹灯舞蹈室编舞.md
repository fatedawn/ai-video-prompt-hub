---
id: "youmind-5684"
title: "逼真的霓虹灯舞蹈室编舞"
title_en: "Realistic Neon Dance Studio Choreography"
model: "Seedance 2.0"
language: "en"
medium: "真人"
direction: "现实向"
genre: "音乐MV"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/357b14bbb71789f6c69b79e7502ce505cb8c827c/README.md#L2961"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "strike"
original_author_url: "https://x.com/oju689"
original_post_url: "https://x.com/oju689/status/2062405363903959423"
published: "Jun 4, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=5684"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# 逼真的霓虹灯舞蹈室编舞

*Realistic Neon Dance Studio Choreography*

> 一个高度结构化的 JSON 提示词，用于生成一段 15 秒的超逼真视频，展示一名女性舞者在霓虹灯闪烁的舞蹈室中表演嘻哈与拉丁融合舞蹈。

## 提示词（English）

```text
{
  "duration": 15,
  "aspect_ratio": "16:9",
  "camera": {
    "style": "handheld iPhone 15 Pro",
    "lens": "26mm",
    "motion": "slight shake",
    "exposure": "natural shifts",
    "autofocus": "breathing",
    "motion_blur": "realistic"
  },
  "scene": {
    "location": "stylish neon-lit dance studio",
    "floor": "glossy reflections",
    "lighting": {
      "rim": ["violet", "cyan"],
      "key": "warm on face",
      "haze": "subtle"
    }
  },
  "character": {
    "type": "human female",
    "age_range": "young adult",
    "body": "athletic yet feminine",
    "skin_tone": "warm medium",
    "hair": "long wavy dark",
    "face": "expressive, confident, natural makeup",
    "outfit": {
      "top": "sleek crop top",
      "bottom": "high-waist fitted pants",
      "shoes": "stylish sneakers"
    },
    "identity_consistent": true
  },
  "choreography": {
    "style": ["Western", "Latin", "French"],
    "full_body_visible": true,
    "movement": [
      "realistic hip motion",
      "footwork",
      "spins",
      "arm isolations",
      "body rolls",
      "sharp hits",
      "fluid transitions",
      "grounded weight shifts",
      "expressive performance"
    ],
    "timeline": [
      {"start": 0, "end": 2, "action": "opening pose, confident eye contact, slight sway"},
      {"start": 2, "end": 4, "action": "sharp shoulder pops, smooth hip isolation"},
      {"start": 4, "end": 6, "action": "hand & arm wave flowing through torso"},
      {"start": 6, "end": 8, "action": "quick side step + hair flick, body roll"},
      {"start": 8, "end": 10, "action": "chest hits + fast footwork"},
      {"start": 10, "end": 12, "action": "elegant half turn with arm flourish"},
      {"start": 12, "end": 14, "action": "dynamic spin + expressive flourish, hair arcs"},
      {"start": 14, "end": 15, "action": "final signature pose, confident smile, freeze-frame energy"}
    ]
  },
  "music_sync": "dynamic Latin/French pop beats",
  "negative_prompts": [
    "cartoon",
    "anime",
    "CGI",
    "extra fingers",
    "distorted hands",
    "broken joints",
    "floating body",
    "cropped feet",
    "face change",
    "outfit change",
    "unrealistic motion",
    "plastic skin",
    "watermark",
    "text",
    "logo"
  ],
  "style": "ultra-realistic, viral-ready, social-native aesthetics"
}
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/357b14bbb71789f6c69b79e7502ce505cb8c827c/README_zh.md#L2938)

```text
{
  "duration": 15,
  "aspect_ratio": "16:9",
  "camera": {
    "style": "手持 iPhone 15 Pro",
    "lens": "26mm",
    "motion": "轻微晃动",
    "exposure": "自然光影变化",
    "autofocus": "呼吸感对焦",
    "motion_blur": "逼真"
  },
  "scene": {
    "location": "时尚的霓虹灯舞蹈室",
    "floor": "光亮反射",
    "lighting": {
      "rim": ["紫罗兰色", "青色"],
      "key": "面部暖光",
      "haze": "轻微雾气"
    }
  },
  "character": {
    "type": "人类女性",
    "age_range": "年轻成年人",
    "body": "健美且富有女性魅力",
    "skin_tone": "暖色调中等肤色",
    "hair": "深色长卷发",
    "face": "表情丰富、自信、自然妆容",
    "outfit": {
      "top": "修身短款上衣",
      "bottom": "高腰紧身裤",
      "shoes": "时尚运动鞋"
    },
    "identity_consistent": true
  },
  "choreography": {
    "style": ["西方", "拉丁", "法国"],
    "full_body_visible": true,
    "movement": [
      "逼真的胯部动作",
      "脚步动作",
      "旋转",
      "手臂隔离动作",
      "身体波浪",
      "利落的卡点动作",
      "流畅的过渡",
      "扎实的重心转移",
      "富有表现力的表演"
    ],
    "timeline": [
      {"start": 0, "end": 2, "action": "起始姿势，自信的眼神交流，轻微摇摆"},
      {"start": 2, "end": 4, "action": "利落的肩部律动，流畅的胯部隔离动作"},
      {"start": 4, "end": 6, "action": "手部和手臂波浪贯穿躯干"},
      {"start": 6, "end": 8, "action": "快速侧步 + 甩发，身体波浪"},
      {"start": 8, "end": 10, "action": "胸部律动 + 快速脚步"},
      {"start": 10, "end": 12, "action": "优雅的半转加手臂挥动"},
      {"start": 12, "end": 14, "action": "动态旋转 + 富有表现力的挥动，发丝飞扬"},
      {"start": 14, "end": 15, "action": "最终标志性姿势，自信微笑，定格能量感"}
    ]
  },
  "music_sync": "动感的拉丁/法国流行节拍",
  "negative_prompts": [
    "卡通",
    "动漫",
    "CGI",
    "多余的手指",
    "手部畸形",
    "关节断裂",
    "身体悬浮",
    "脚部被裁切",
    "面部变化",
    "服装变化",
    "不真实的动作",
    "塑料感皮肤",
    "水印",
    "文字",
    "Logo"
  ],
  "style": "超逼真、病毒式传播、社交媒体原生美学"
}
```

## 出处与许可

- 原作者：[strike](https://x.com/oju689) · 原帖：<https://x.com/oju689/status/2062405363903959423>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/357b14bbb71789f6c69b79e7502ce505cb8c827c/README.md#L2961)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `357b14bbb717`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=5684>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
