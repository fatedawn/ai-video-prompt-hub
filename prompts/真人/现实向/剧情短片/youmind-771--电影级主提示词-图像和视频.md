---
id: "youmind-771"
title: "电影级主提示词（图像和视频）"
title_en: "The Cinematic Master Prompt (Image and Video)"
model: "Seedance 2.0"
language: "en"
medium: "真人"
direction: "现实向"
genre: "剧情短片"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/f95b78f9916dd873aaee1ec6cd36963476563aa2/README.md#L2809"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "Benjamin De Ridder"
original_author_url: "https://x.com/SilverCoder2009"
original_post_url: "https://x.com/SilverCoder2009/status/2028881059207958799"
published: "Mar 3, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=771"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# 电影级主提示词（图像和视频）

*The Cinematic Master Prompt (Image and Video)*

> 一个高度详细、结构化的提示，用于生成一张新黑色都市场景的图像（使用 Nano Banana 2）和一段 10 秒的视频（使用 Seedance 1.5 Pro），重点关注建筑体量和氛围效果。

## 提示词（English）

```text
{
  "project_title": "The Cinematic Master Prompt",
  "scene_description": {
    "subject_and_composition": {
      "angle": "High-angle, 'God’s eye' cinematic overlook",
      "setting": "Dense North American metropolitan canyon",
      "time_of_day": "Blue hour",
      "focal_point": "Massive, tiered Art Deco skyscraper dominating the left-third power line",
      "perspective": "Deep one-point perspective leading down a central street",
      "architecture_styles": [
        "Brutalist",
        "International-style"
      ],
      "framing": "Upper 40% dominated by crushing, heavy, slate-grey overcast sky"
    },
    "atmosphere_and_lighting": {
      "mood": "Neo-noir urban melancholy",
      "weather_effects": [
        "High atmospheric density",
        "Thick fog",
        "Drizzle",
        "Smog"
      ],
      "primary_lighting": "7500K ultra-soft, top-down diffused cool daylight",
      "secondary_lighting": "2700K warm tungsten glow from interior windows and amber streetlamps",
      "surface_interaction": "Reflections off highly specular, wet asphalt",
      "ambient_fill": "Subtle cyan-blue in shadows"
    },
    "color_and_tone": {
      "palette": "Desaturated teal-and-charcoal",
      "contrast": "High contrast (cold exterior vs. warm human activity)",
      "black_point": "Raised black points for a faded, matte filmic look",
      "toning": "Soft S-curve"
    },
    "technical_camera_specs": {
      "format": "35mm full-frame digital (underexposed film emulation)",
      "aperture": "f/8.0 deep depth of field",
      "visual_texture": "High frequency architectural window grids",
      "artifacts": [
        "Visible ISO 3200 film grain",
        "Slight chromatic aberration at edges",
        "Subtle vignetting"
      ],
      "depth": "Sharp foreground masonry with atmospheric haze recession"
    },
    "narrative_vibe": {
      "themes": [
        "Liminal space",
        "Edward Hopper-inspired realism",
        "The Sentient City",
        "Profound isolation",
        "Lonely crowd motif"
      ],
      "constraints": "No visible people or organic life; pure architectural massing and gravity"
    }
  }
}

Video:
{
  "video_metadata": {
    "duration": "10s",
    "aspect_ratio": "16:9",
    "style": "Cinematic Neo-Noir"
  },
  "prompt_details": {
    "subject_composition": "High-angle 'God’s eye' cinematic overlook of a North American metropolitan canyon at blue hour. Massive Art Deco skyscraper anchored on the left-third.",
    "atmosphere": "Neo-noir urban melancholy, thick fog, drizzle, and smog softening the distant skyline.",
    "lighting": {
      "primary": "7500K cool top-down diffused daylight",
      "secondary": "2700K warm tungsten glow from interior windows and amber streetlamps",
      "reflections"
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/f95b78f9916dd873aaee1ec6cd36963476563aa2/README_zh.md#L2812)

````text
```json
{
  "project_title": "电影大师提示词",
  "scene_description": {
    "subject_and_composition": {
      "angle": "高角度，“上帝视角”电影俯瞰",
      "setting": "北美稠密的都市峡谷",
      "time_of_day": "蓝色时刻",
      "focal_point": "巨大的分层装饰艺术摩天大楼主导左侧三分之一的强力线",
      "perspective": "深邃的单点透视，通向一条中央街道",
      "architecture_styles": [
        "粗野主义",
        "国际风格"
      ],
      "framing": "上方 40% 被压抑、沉重、板岩灰的阴沉天空占据"
    },
    "atmosphere_and_lighting": {
      "mood": "新黑色都市忧郁",
      "weather_effects": [
        "高大气密度",
        "浓雾",
        "细雨",
        "烟雾"
      ],
      "primary_lighting": "7500K 超柔和、自上而下漫射的冷日光",
      "secondary_lighting": "2700K 室内窗户和琥珀色路灯发出的暖钨光",
      "surface_interaction": "高光泽湿沥青上的反射",
      "ambient_fill": "阴影中微妙的青蓝色"
    },
    "color_and_tone": {
      "palette": "去饱和的青色和炭灰色",
      "contrast": "高对比度（寒冷的外部与温暖的人类活动）",
      "black_point": "提高黑点，营造褪色、哑光的电影感",
      "toning": "柔和的 S 曲线"
    },
    "technical_camera_specs": {
      "format": "35mm 全画幅数码（欠曝胶片模拟）",
      "aperture": "f/8.0 深景深",
      "visual_texture": "高频建筑窗格网",
      "artifacts": [
        "可见的 ISO 3200 胶片颗粒",
        "边缘轻微色差",
        "微妙的暗角"
      ],
      "depth": "清晰的前景砖石结构与大气霾的衰退"
    },
    "narrative_vibe": {
      "themes": [
        "阈限空间",
        "爱德华·霍珀风格的现实主义",
        "有感知力的城市",
        "深刻的孤独",
        "孤独人群主题"
      ],
      "constraints": "没有可见的人或有机生命；纯粹的建筑体量和重力"
    }
  }
}

Video:
{
  "video_metadata": {
    "duration": "10s",
    "aspect_ratio": "16:9",
    "style": "电影新黑色"
  },
  "prompt_details": {
    "subject_composition": "在蓝色时刻，高角度“上帝视角”电影俯瞰北美都市峡谷。巨大的装饰艺术摩天大楼锚定在左侧三分之一处。",
    "atmosphere": "新黑色都市忧郁，浓雾、细雨和烟雾柔化了远处的城市天际线。",
    "lighting": {
      "primary": "7500K 冷色自上而下漫射日光",
      "secondary": "2700K 室内窗户和琥珀色路灯发出的暖钨光",
      "reflections"
    }
  }
}
````

## 出处与许可

- 原作者：[Benjamin De Ridder](https://x.com/SilverCoder2009) · 原帖：<https://x.com/SilverCoder2009/status/2028881059207958799>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/f95b78f9916dd873aaee1ec6cd36963476563aa2/README.md#L2809)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `f95b78f9916d`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=771>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
