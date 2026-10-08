---
id: "youmind-4482"
title: "篮球赛事转播动态序列"
title_en: "Basketball Broadcast Motion Sequence"
model: "Seedance 2.0"
language: "en"
medium: "真人"
direction: "现实向"
genre: "运动"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/63b2402f3f09063005c36faeebc7d147e759864a/README.md#L2303"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "WasifAI"
original_author_url: "https://x.com/doctorwasif"
original_post_url: "https://x.com/doctorwasif/status/2052989151474331770"
published: "May 9, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=4482"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# 篮球赛事转播动态序列

*Basketball Broadcast Motion Sequence*

> 一份全面的 JSON 格式提示词，用于生成超写实的篮球赛事转播画面，包含镜头、图形及同步音频。

## 提示词（English）

```text
{
  "animate": "reference image into a 15s hyper-realistic live basketball TV broadcast",

  "visuals": {
    "shots": [
      "wide high-angle tracking shot of fast break",
      "side medium shot of contested drive to basket",
      "explosive euro-step or pull-up jumper in paint",
      "last-second shot hangs in air then swishes cleanly",
      "subtle handheld shake during contact drive",
      "crowd erupts with towels waving",
      "CUT TO: exact girl from reference image in arena crowd, oversized team jersey, shocked/euphoric reaction on jumbotron cam, leaning forward slightly, fans blurred behind, warm court lights reflecting on face, telephoto lens compression, identity perfectly preserved"
    ],
    "consistency": "reference subject perfectly recognizable in final reaction shot",
    "physics": "realistic ball arc, net swish, sneaker squeaks, jersey movement",
    "grading": "authentic playoff broadcast look",
    "effects": "anamorphic flares, telephoto compression, natural motion blur"
  },

  "graphics": {
    "scorebug": "HOME 108-107 AWAY, 4Q clock from 0:04",
    "stats_popup": "player number, position, points, FG%",
    "watermark": "sports network logo top-right",
    "ticker": "playoff series updates scrolling"
  },

  "audio": {
    "style": "high-energy synced basketball commentary with arena ambience",
    "dialogue": [
      "0-3s: 'Home team in transition! Number 23 ahead to the big man — four seconds left!'",
      "3-7s: 'Strong drive to the rim — contact! Off the glass — IS IT GOOD?!'",
      "7-10s: 'IT COUNTS! AND THE FOUL! This arena has exploded — look at these fans!'"
    ],
    "sfx": [
      "massive crowd roar",
      "sneaker squeaks",
      "net swish",
      "backboard rattle",
      "on-court player shouts"
    ]
  },

  "specs": {
    "quality": "photorealistic broadcast realism",
    "resolution": "1080p 60fps",
    "style": "cinematic playoff sports broadcast",
    "lip_sync": "perfect",
    "artifacts": "none",
    "identity_preservation": "reference subject likeness must remain exact"
  }
}
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/63b2402f3f09063005c36faeebc7d147e759864a/README_zh.md#L2327)

```text
{
  "animate": "将参考图像生成为 15 秒超写实的篮球现场直播画面",

  "visuals": {
    "shots": [
      "快攻的高机位广角追踪镜头",
      "侧面中景镜头，展示激烈的篮下突破",
      "禁区内爆发力十足的欧洲步或急停跳投",
      "最后时刻投篮在空中停留后空心入网",
      "对抗突破时细微的手持摄像机晃动",
      "观众挥舞毛巾欢呼雀跃",
      "切换至：参考图像中的女孩在赛场观众席，身穿超大号球队球衣，在大屏幕镜头下表现出震惊/狂喜的反应，身体微微前倾，背景观众模糊处理，温暖的球场灯光映照在脸上，长焦镜头压缩感，人物特征完美保留"
    ],
    "consistency": "参考主体在最终反应镜头中必须清晰可辨",
    "physics": "真实的篮球弧线、篮网入球声、球鞋摩擦声、球衣摆动",
    "grading": "地道的季后赛转播色调",
    "effects": "变形镜头光晕、长焦压缩感、自然的运动模糊"
  },

  "graphics": {
    "scorebug": "主队 108-107 客队，第四节比赛时间从 0:04 开始",
    "stats_popup": "球员号码、位置、得分、投篮命中率",
    "watermark": "右上角体育频道台标",
    "ticker": "滚动播放季后赛系列赛比分"
  },

  "audio": {
    "style": "高能量同步篮球解说与赛场环境音",
    "dialogue": [
      "0-3 秒：'主队快攻！23 号传给大个子——还剩四秒！'",
      "3-7 秒：'强力突破篮下——有身体对抗！打板——球进了吗？！'",
      "7-10 秒：'球进了！还有加罚！整个球场沸腾了——看看这些球迷！'"
    ],
    "sfx": [
      "巨大的观众欢呼声",
      "球鞋摩擦声",
      "篮网入球声",
      "篮板震动声",
      "场上球员的喊叫声"
    ]
  },

  "specs": {
    "quality": "照片级转播真实感",
    "resolution": "1080p 60fps",
    "style": "电影级季后赛体育转播",
    "lip_sync": "完美",
    "artifacts": "无",
    "identity_preservation": "参考主体形象必须保持完全一致"
  }
}
```

## 出处与许可

- 原作者：[WasifAI](https://x.com/doctorwasif) · 原帖：<https://x.com/doctorwasif/status/2052989151474331770>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/63b2402f3f09063005c36faeebc7d147e759864a/README.md#L2303)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `63b2402f3f09`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=4482>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
