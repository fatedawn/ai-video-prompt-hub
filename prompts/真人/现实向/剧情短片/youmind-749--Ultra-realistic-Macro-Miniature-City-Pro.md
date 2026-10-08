---
id: "youmind-749"
title: "Ultra-realistic Macro Miniature City Prompt (Structured JSON)"
title_en: "Ultra-realistic Macro Miniature City Prompt (Structured JSON)"
model: "Seedance 2.0"
language: "en"
medium: "真人"
direction: "现实向"
genre: "剧情短片"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/e7d859a28f78a55611910e3b94d1df48efd75dcf/README.md#L2734"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "xiaomiaode"
original_author_url: "https://x.com/xiaomiaode5383"
original_post_url: "https://x.com/xiaomiaode5383/status/2028360648393118001"
published: "Mar 2, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=749"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# Ultra-realistic Macro Miniature City Prompt (Structured JSON)

> 一个高度结构化、详细的 JSON 提示，用于生成超逼真的微缩城市模型，其中使用 Nano Banana 2 构建结构，并使用 Seedance 2.0 实现运动。

## 提示词（English）

```text
{
  "project": "Global Miniature City Series",
  "aspect_ratio": "9:16",
  "style": "Ultra-realistic macro miniature city model",

  "composition": {
    "camera_angle": "low-angle macro",
    "framing": "city centered, base fully visible",
    "tilt_shift": true,
    "depth_of_field": "shallow",
    "lens": "85mm macro, f/1.8"
  },

  "base": {
    "material": "dark polished wood",
    "edges": "smooth rounded",
    "city_name_text": {
      "style": "gold embossed 3D",
      "font": "clean modern",
      "attached": true,
      "no_distortion": true
    }
  },

  "rock_structure": {
    "type": "floating natural layered rock",
    "texture": "high detail geological strata",
    "underside_visible": true,
    "internal_tunnel": true,
    "tunnel_light": "warm realistic glow",
    "no_scifi_glow": true
  },

  "city_core": {
    "landmarks": ["REPLACE_WITH_CITY_LANDMARKS"],
    "architecture_density": "realistic",
    "height_variation": true,
    "no_fantasy_elements": true
  },

  "road_system": {
    "type": "circular edge road",
    "lane_clear": true,
    "traffic_direction": "single_direction",
    "vehicles": {
      "lane_aligned": true,
      "no_reverse": true,
      "no_clipping": true,
      "no_floating": true
    },
    "tunnel_rule": "vehicle may enter and disappear without reappearing"
  },

  "environment": {
    "setting": "real tabletop",
    "background": "soft blurred lifestyle interior",
    "lighting": "natural indoor, warm subtle",
    "no_heavy_fog": true
  },

  "render_quality": {
    "resolution": "8K",
    "material_realism": true,
    "soft_shadows": true,
    "no_excess_hdr": true,
    "no_over_saturation": true
  },

  "negative_rules": [
    "no reverse traffic",
    "no floating objects",
    "no extreme storm",
    "no strong wind",
    "no glass-like water",
    "no cyberpunk glow",
    "no excessive particles",
    "no exaggerated lens flare"
  ]
}
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/e7d859a28f78a55611910e3b94d1df48efd75dcf/README_zh.md#L2735)

````text
```json
{
  "project": "全球微缩城市系列",
  "aspect_ratio": "9:16",
  "style": "超逼真的宏观微缩城市模型",

  "composition": {
    "camera_angle": "低角度微距",
    "framing": "城市居中，底座完全可见",
    "tilt_shift": true,
    "depth_of_field": "浅景深",
    "lens": "85mm 微距镜头，f/1.8"
  },

  "base": {
    "material": "深色抛光木材",
    "edges": "光滑圆润",
    "city_name_text": {
      "style": "金色浮雕 3D",
      "font": "简洁现代",
      "attached": true,
      "no_distortion": true
    }
  },

  "rock_structure": {
    "type": "漂浮的天然分层岩石",
    "texture": "高细节地质地层",
    "underside_visible": true,
    "internal_tunnel": true,
    "tunnel_light": "温暖逼真的光芒",
    "no_scifi_glow": true
  },

  "city_core": {
    "landmarks": ["REPLACE_WITH_CITY_LANDMARKS"],
    "architecture_density": "逼真",
    "height_variation": true,
    "no_fantasy_elements": true
  },

  "road_system": {
    "type": "环形边缘道路",
    "lane_clear": true,
    "traffic_direction": "单向",
    "vehicles": {
      "lane_aligned": true,
      "no_reverse": true,
      "no_clipping": true,
      "no_floating": true
    },
    "tunnel_rule": "车辆可以进入并消失，不再出现"
  },

  "environment": {
    "setting": "真实桌面",
    "background": "柔和模糊的生活化室内背景",
    "lighting": "自然室内光，温暖柔和",
    "no_heavy_fog": true
  },

  "render_quality": {
    "resolution": "8K",
    "material_realism": true,
    "soft_shadows": true,
    "no_excess_hdr": true,
    "no_over_saturation": true
  },

  "negative_rules": [
    "无逆向交通",
    "无漂浮物体",
    "无极端风暴",
    "无强风",
    "无玻璃状水面",
    "无赛博朋克光效",
    "无过多粒子",
    "无夸张镜头光晕"
  ]
}
````

## 出处与许可

- 原作者：[xiaomiaode](https://x.com/xiaomiaode5383) · 原帖：<https://x.com/xiaomiaode5383/status/2028360648393118001>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/e7d859a28f78a55611910e3b94d1df48efd75dcf/README.md#L2734)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `e7d859a28f78`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=749>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
