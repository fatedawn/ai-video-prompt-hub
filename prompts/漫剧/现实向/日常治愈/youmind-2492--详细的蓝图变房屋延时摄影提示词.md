---
id: "youmind-2492"
title: "详细的蓝图变房屋延时摄影提示词"
title_en: "Detailed Blueprint-to-House Timelapse Prompt"
model: "Seedance 2.0"
language: "en"
medium: "漫剧"
direction: "现实向"
genre: "日常治愈"
art_style: "2D日漫"
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/3f8bf8060fb3d828514ee474797f09620ef10a4c/README.md#L3005"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "Keskin"
original_author_url: "https://x.com/craftian_keskin"
original_post_url: "https://x.com/craftian_keskin/status/2039053365666037902"
published: "Mar 31, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=2492"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# 详细的蓝图变房屋延时摄影提示词

*Detailed Blueprint-to-House Timelapse Prompt*

> 这是一个高度详细且结构化的提示词，用于生成 15 秒的建筑可视化延时摄影视频。视频将展示从 2D 蓝图到逼真的 3D 现代农舍的过渡，明确了时长、风格、蓝图细节（布局、屋顶规则）、外观材质，以及转换过程中的精确动作序列和摄像机运动。

## 提示词（English）

```text
{
  "video_prompt": {
    "duration": "15 seconds",
    "title": "Blueprint to Reality – Single-Story House Transformation",
    "style": "Architectural visualization, photoreal, modern farmhouse exterior, clean cinematic motion",

    "blueprint_reference": {
      "floors": 1,
      "footprint_shape": "Irregular L-plus-T shape",
      "layout_zones": {
        "top_left": "Master bedroom with large en-suite (double vanity, bathtub, shower, toilet)",
        "top_center": "Open lounge / sitting area with plants",
        "top_right": "Secondary bedroom + full bathroom",
        "center_left": "Walk-in closet / laundry adjacent to master bath",
        "center": "Open-plan kitchen with island, connected to dining room",
        "center_right": "Family room / playroom with colorful seating",
        "right": "Covered outdoor terrace / patio (open to sky)",
        "bottom_center": "Entry foyer leading to interior",
        "bottom_left": "Double attached garage (2-car, open indoor space, roofed)",
        "bottom_right_upper": "Bedroom 3 with shared bathroom",
        "bottom_right_lower": "Bedroom 4 with small private patio (open to sky)",
        "bottom_right_corner": "Small outdoor lounge / garden corner (open to sky)"
      }
    },

    "roof_rules": {
      "all_interior_rooms": "Fully covered with roof — master bedroom, all secondary bedrooms, bathrooms, kitchen, dining, family room, lounge, garage, foyer, hallways",
      "outdoor_spaces": "Open to sky — right-side terrace, bottom-right small patio, garden corner",
      "garage": "Roofed as part of main structure, no skylight"
    },

    "exterior_style_reference": {
      "roof_type": "Standing seam dark charcoal / black metal roof, low-to-mid pitch",
      "facade": "Light beige / warm white board-and-batten vertical siding",
      "trim": "Dark brown / black window frames and fascia",
      "garage_door": "Dark modern panel garage door, double-wide",
      "covered_porch": "Covered front entry and right-side patio with exposed wood beam columns",
      "windows": "Large black-framed rectangular windows matching each room's position"
    },

    "sequence": [
      {
        "time": "0:00–0:02",
        "action": "Clean white background. Crisp 2D top-down colored floor plan appears — exact layout with all rooms labeled, walls in bold black, rooms color-coded in warm wood tones and blue for bathrooms, gray for garage."
      },
      {
        "time": "0:02–0:05",
        "action": "Camera slowly pulls back. Floor plan glows softly. Thin white grid lines appear beneath the plan, establishing ground plane. Room walls begin to gently pulse, ready to rise."
      },
      {
        "time": "0:05–0:09",
        "action": "Walls begin extruding upward from the 2D plan — all interior walls rise simultaneously, preserving exact footprint. Garage walls, bedroom walls, k
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/3f8bf8060fb3d828514ee474797f09620ef10a4c/README_zh.md#L3016)

```text
{
  "video_prompt": {
    "duration": "15 秒",
    "title": "从蓝图到现实 —— 单层住宅蜕变",
    "style": "建筑可视化，照片级真实感，现代农舍外观，干净的电影级运镜",

    "blueprint_reference": {
      "floors": 1,
      "footprint_shape": "不规则 L 加 T 型",
      "layout_zones": {
        "top_left": "主卧，带大型套内卫浴（双洗手台、浴缸、淋浴间、马桶）",
        "top_center": "开放式休息区 / 起居室，配有绿植",
        "top_right": "次卧 + 完整卫浴",
        "center_left": "步入式衣帽间 / 洗衣房，毗邻主卫",
        "center": "开放式厨房，配有岛台，连接餐厅",
        "center_right": "家庭室 / 游戏室，配有色彩鲜艳的座椅",
        "right": "带顶户外露台 / 庭院（露天）",
        "bottom_center": "通往室内的入口门厅",
        "bottom_left": "双车位连体车库（2 车位，开放式室内空间，有顶）",
        "bottom_right_upper": "卧室 3，带共享卫浴",
        "bottom_right_lower": "卧室 4，带小型私人庭院（露天）",
        "bottom_right_corner": "小型户外休息区 / 花园角落（露天）"
      }
    },

    "roof_rules": {
      "all_interior_rooms": "全部覆盖屋顶 —— 包括主卧、所有次卧、卫浴、厨房、餐厅、家庭室、休息区、车库、门厅、走廊",
      "outdoor_spaces": "露天 —— 右侧露台、右下角小庭院、花园角落",
      "garage": "作为主体结构的一部分覆盖屋顶，无天窗"
    },

    "exterior_style_reference": {
      "roof_type": "深炭灰色 / 黑色金属立边屋顶，低至中等坡度",
      "facade": "浅米色 / 暖白色垂直板条外墙",
      "trim": "深棕色 / 黑色窗框和封檐板",
      "garage_door": "深色现代板式车库门，双车位宽",
      "covered_porch": "带顶前门廊和右侧露台，配有外露木梁柱",
      "windows": "大型黑色边框矩形窗户，与各房间位置对应"
    },

    "sequence": [
      {
        "time": "0:00–0:02",
        "action": "纯白背景。清晰的 2D 俯视彩色平面图出现 —— 精确布局，标注所有房间，墙壁为粗黑线条，房间以暖木色调编码，卫浴为蓝色，车库为灰色。"
      },
      {
        "time": "0:02–0:05",
        "action": "摄像机缓慢后拉。平面图发出柔和光芒。平面图下方出现细白网格线，确立地面平面。房间墙壁开始轻微脉动，准备升起。"
      },
      {
        "time": "0:05–0:09",
        "action": "墙壁开始从 2D 平面向上挤压生成 —— 所有内墙同时升起，保持精确的占地轮廓。车库墙壁、卧室墙壁、厨房"
      }
    ]
  }
}
```

## 出处与许可

- 原作者：[Keskin](https://x.com/craftian_keskin) · 原帖：<https://x.com/craftian_keskin/status/2039053365666037902>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/3f8bf8060fb3d828514ee474797f09620ef10a4c/README.md#L3005)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `3f8bf8060fb3`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=2492>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
