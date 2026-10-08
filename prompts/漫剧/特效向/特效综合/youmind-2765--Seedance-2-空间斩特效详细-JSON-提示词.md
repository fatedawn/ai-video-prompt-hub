---
id: "youmind-2765"
title: "Seedance 2 空间斩特效详细 JSON 提示词"
title_en: "Detailed JSON Prompt for Dimensional Slash Effect in Seedance 2"
model: "Seedance 2.0"
language: "ja"
medium: "漫剧"
direction: "特效向"
genre: "特效综合"
art_style: "2D日漫"
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/96d7b8b1792b32ff0bbc9e62c446cce1340b6a0d/README_ja-JP.md#L2652"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "テックトークナビゲーター@AIコンテンツクリエイター"
original_author_url: "https://x.com/TechTalkNAVI"
original_post_url: "https://x.com/TechTalkNAVI/status/2040740135860617499"
published: "Apr 5, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=2765"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# Seedance 2 空间斩特效详细 JSON 提示词

*Detailed JSON Prompt for Dimensional Slash Effect in Seedance 2*

> 这是一个专为 Seedance 2 设计的高度结构化 JSON 提示词，用于生成空间斩和空间破碎的动态视频特效，适用于动漫角色的攻击动作。该提示词将特效拆解为主题、色彩、视觉元素，并针对角色动作、冲击破碎以及宇宙爆炸余波提供了具体的提示词。

## 提示词（日本語）

```text
{
  "effect_analysis": {
    "theme": "次元斬と空間粉砕",
    "primary_colors": ["鮮やかな赤", "深い黒", "明るい白", "ペールシアン（キャラクター）"],
    "visual_elements": [
      "鋭い曲線状のエネルギー軌跡",
      "放射状のガラス粉砕ライン",
      "破片と浮遊する岩の断片",
      "星雲のような宇宙の背景",
      "強烈なレンズフレアと輝き"
    ]
  },
  "reproduction_prompts": {
    "character_action": {
      "description": "キャラクターの攻撃モーション用",
      "prompt": "ダイナミックなアクションショット、水色の髪のアニメスタイルの少女、光る剣を振るい、大きく水平に斬りつける、鮮やかな赤いエネルギーの弧の軌跡、火花と光の粒子、白いグリッドの床、映画のような照明。"
    },
    "impact_shatter": {
      "description": "空間が粉砕される瞬間用",
      "prompt": "画面破壊エフェクト、中心から広がる放射状の亀裂、赤と黒の高コントラストライン、カメラに向かって飛ぶ粉砕されたガラスの破片、中心での強烈な白い光の爆発、高エネルギー、鋭いエッジ。"
    },
    "cosmic_explosion": {
      "description": "後半の空間崩壊・宇宙背景用",
      "prompt": "宇宙爆発の余波、浮遊する暗い岩の破片、輝く赤い星雲の背景、星々と星屑、映画のような被写界深度、高解像度、劇的なインパクト、闇を突き抜ける赤い光線。"
    }
  },
  "technical_parameters": {
    "rendering_style": "高忠実度アニメ / ゲーム VFX",
    "motion_keywords": ["高速トランジション", "放射状ブラー", "画面揺れ", "時間遅延（スローモーション）"],
    "aspect_ratio": "16:9"
  }
}
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/96d7b8b1792b32ff0bbc9e62c446cce1340b6a0d/README_zh.md#L2623)

```text
{
  "effect_analysis": {
    "theme": "空间斩与空间破碎",
    "primary_colors": ["鲜艳红", "深邃黑", "明亮白", "淡青色（角色）"],
    "visual_elements": [
      "锋利的弧形能量轨迹",
      "放射状玻璃破碎纹理",
      "碎片和漂浮的岩石残骸",
      "星云般的宇宙背景",
      "强烈的镜头光晕与辉光"
    ]
  },
  "reproduction_prompts": {
    "character_action": {
      "description": "用于角色攻击动作",
      "prompt": "动态动作镜头，动漫风格浅蓝色头发少女，手持发光长剑，进行大幅度横向斩击，鲜艳的红色能量弧光轨迹，火花与光粒子，白色网格地面，电影级灯光。"
    },
    "impact_shatter": {
      "description": "用于空间破碎瞬间",
      "prompt": "屏幕破碎特效，放射状裂纹从中心蔓延，红黑高对比度线条，破碎的玻璃碎片飞向镜头，中心强烈的白光爆炸，高能量，锋利边缘。"
    },
    "cosmic_explosion": {
      "description": "用于后半段空间坍塌/宇宙背景",
      "prompt": "宇宙爆炸余波，漂浮的暗色岩石碎片，发光的红色星云背景，恒星与星尘，电影级景深，高分辨率，戏剧性冲击感，红色光束穿透黑暗。"
    }
  },
  "technical_parameters": {
    "rendering_style": "高保真动漫/游戏 VFX",
    "motion_keywords": ["快速转场", "径向模糊", "屏幕抖动", "时间膨胀（慢动作）"],
    "aspect_ratio": "16:9"
  }
}
```

### YouMind 提供的English版本（README.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/96d7b8b1792b32ff0bbc9e62c446cce1340b6a0d/README.md#L2609)

```text
{
  "effect_analysis": {
    "theme": "Dimensional Slash and Space Shattering",
    "primary_colors": ["Vibrant Red", "Deep Black", "Bright White", "Pale Cyan (Character)"],
    "visual_elements": [
      "Sharp curved energy trails",
      "Radial glass-shattering lines",
      "Debris and floating rock fragments",
      "Nebula-like cosmic background",
      "Intense lens flare and glow"
    ]
  },
  "reproduction_prompts": {
    "character_action": {
      "description": "For character attack motion",
      "prompt": "Dynamic action shot, anime style girl with light blue hair, wielding a glowing sword, performing a wide horizontal slash, vibrant red energy arc trail, sparks and light particles, white grid floor, cinematic lighting."
    },
    "impact_shatter": {
      "description": "For the moment the space shatters",
      "prompt": "Screen-breaking effect, radial cracks spreading from the center, red and black high contrast lines, shattered glass fragments flying towards the camera, intense white light explosion in the center, high energy, sharp edges."
    },
    "cosmic_explosion": {
      "description": "For the latter half's space collapse/cosmic background",
      "prompt": "Cosmic explosion aftermath, floating dark rock debris, glowing red nebula background, stars and stardust, cinematic depth of field, high resolution, dramatic impact, red light rays piercing through darkness."
    }
  },
  "technical_parameters": {
    "rendering_style": "High-fidelity anime/game VFX",
    "motion_keywords": ["Fast transition", "Radial blur", "Screen shake", "Time dilation (slow motion)"],
    "aspect_ratio": "16:9"
  }
}
```

## 出处与许可

- 原作者：[テックトークナビゲーター@AIコンテンツクリエイター](https://x.com/TechTalkNAVI) · 原帖：<https://x.com/TechTalkNAVI/status/2040740135860617499>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/96d7b8b1792b32ff0bbc9e62c446cce1340b6a0d/README_ja-JP.md#L2652)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `96d7b8b1792b`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=2765>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
