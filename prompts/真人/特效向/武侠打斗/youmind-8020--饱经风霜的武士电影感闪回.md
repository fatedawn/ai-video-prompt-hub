---
id: "youmind-8020"
title: "饱经风霜的武士电影感闪回"
title_en: "Cinematic Samurai Flashback"
model: "Seedance 2.0"
language: "en"
medium: "真人"
direction: "特效向"
genre: "武侠打斗"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/9984efcb41a5abdfc638d0030782de28a3c01a13/README.md#L1780"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "auqib"
original_author_url: "https://x.com/auqibhabib"
original_post_url: "https://x.com/auqibhabib/status/2081999646969446547"
published: "Jul 28, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=8020"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# 饱经风霜的武士电影感闪回

*Cinematic Samurai Flashback*

> 这是为 Seedance 2.0 设计的一款综合电影感提示词，旨在通过高对比度的闪回和富有感染力的音效设计，生成一段武士回首残酷战斗的戏剧性场景。

## 提示词（English）

```text
{"scene_description": "A battle-worn samurai stands alone after a brutal fight. The ground is covered in bodies. He looks emotionally broken, holding his katana loosely.",
  "style": "cinematic, ultra realistic, dramatic, high contrast, shallow depth of field, film grain",
  "camera": {
    "movement": "slow push-in + rapid cuts in flashback",
    "lens": "85mm",
    "depth_of_field": "very shallow"
  },
  "timeline": [
    {
      "time": "0-2s",
      "action": "present timeline, slow push-in, samurai standing still, breathing heavy, eyes down, blood dripping from sword"
    },
    {
      "time": "2-5s",
      "action": "FLASHBACK SEQUENCE — strong transition with hard cut + white flash. Black and white. MULTIPLE DISTINCT SHOTS: (1) samurai swings katana horizontally, enemy falls, (2) close-up of intense eyes, (3) fast dodge and counter attack, (4) overhead shot of chaotic fighting, (5) final brutal downward strike. Fast cuts, aggressive motion blur, shaky handheld camera"
    },
    {
      "time": "5-7s",
      "action": "hard cut back to present, color returns instantly, silence, camera now closer to face, samurai frozen, slight trembling, realization hits"
    },
    {
      "time": "7-10s",
      "action": "samurai slowly releases katana, sword drops in slow motion, metallic echo, he lowers his head slightly, expression full of regret and emptiness"
    }
  ],
  "effects": [
    "strong white flash transition",
    "black and white flashback",
    "fast motion blur in flashback",
    "handheld shake in action",
    "slow motion sword drop",
    "dust and smoke particles"
  ],
  "sound_design": {
    "structure": [
      "low ambient wind in present",
      "sudden loud battle sounds in flashback (metal clashes, shouts)",
      "instant silence on return",
      "echoing metal drop at end"
    ]
  },
  "color_grading": {
    "present": "desaturated cinematic tones",
    "flashback": "high contrast black and white, harsh highlights"
  },
  "mood": "intense, chaotic past vs silent regretful present"
}
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/9984efcb41a5abdfc638d0030782de28a3c01a13/README_zh.md#L1780)

```text
{"scene_description": "一位饱经风霜的武士在残酷的战斗后独自伫立。地面上横尸遍野。他神情颓丧，无力地握着武士刀。",
  "style": "电影感，超写实，戏剧性，高对比度，浅景深，胶片颗粒感",
  "camera": {
    "movement": "缓慢推镜头 + 闪回中的快速剪辑",
    "lens": "85mm",
    "depth_of_field": "极浅景深"
  },
  "timeline": [
    {
      "time": "0-2 秒",
      "action": "当前时间线，缓慢推镜头，武士静止站立，呼吸沉重，眼神低垂，鲜血从刀刃滴落"
    },
    {
      "time": "2-5 秒",
      "action": "闪回序列 —— 强烈的转场，硬切 + 白色闪光。黑白画面。多个不同镜头：(1) 武士横向挥刀，敌人倒下，(2) 锐利眼神的特写，(3) 快速闪避与反击，(4) 混乱战斗的俯拍镜头，(5) 最后致命的向下劈砍。快速剪辑，强烈的动态模糊，手持摄影机的晃动感"
    },
    {
      "time": "5-7 秒",
      "action": "硬切回当前，色彩瞬间恢复，寂静无声，镜头更靠近面部，武士僵住，轻微颤抖，意识到一切已成定局"
    },
    {
      "time": "7-10 秒",
      "action": "武士缓缓松开武士刀，刀刃慢动作坠地，发出金属回响，他微微低头，表情充满悔恨与空虚"
    }
  ],
  "effects": [
    "强烈的白色闪光转场",
    "黑白闪回",
    "闪回中的快速动态模糊",
    "动作戏中的手持晃动",
    "慢动作落刀",
    "尘埃与烟雾粒子"
  ],
  "sound_design": {
    "structure": [
      "当前场景中低沉的环境风声",
      "闪回中突然响起的激烈战斗声（金属碰撞声、呐喊声）",
      "回到当前瞬间的寂静",
      "结尾处金属坠地的回响"
    ]
  },
  "color_grading": {
    "present": "低饱和度电影色调",
    "flashback": "高对比度黑白，强烈的亮部"
  },
  "mood": "强烈的、混乱的过去与寂静、悔恨的现在形成对比"
}
```

## 出处与许可

- 原作者：[auqib](https://x.com/auqibhabib) · 原帖：<https://x.com/auqibhabib/status/2081999646969446547>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/9984efcb41a5abdfc638d0030782de28a3c01a13/README.md#L1780)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `9984efcb41a5`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=8020>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
