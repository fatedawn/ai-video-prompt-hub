---
id: "youmind-8631"
title: "Subway Fight Scene Cinematic Prompt"
title_en: "Subway Fight Scene Cinematic Prompt"
model: "Seedance 2.0"
language: "en"
medium: "真人"
direction: "特效向"
genre: "武侠打斗"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/6add278b460a880cc9e6c8c37359719bec646406/README.md#L2813"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "Zunaira"
original_author_url: "https://x.com/ZunairaSaeedAi"
original_post_url: "https://x.com/ZunairaSaeedAi/status/2085172792551686401"
published: "Aug 6, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=8631"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# Subway Fight Scene Cinematic Prompt

> A complex JSON-structured prompt for a handheld close-combat fight sequence inside a subway car, featuring an orange-haired woman.

## 提示词（English）

```text
{
  "model": "seedance-2.0",
  "task_type": "generation",
  "task": "generate_video",

  "priority": {
    "primary": "handheld close-combat fight sequence inside a moving subway car — young woman with orange hair dismantles multiple male attackers using poles, seats, tight-space acrobatics, then walks away unfazed",

    "secondary": "casual dominance — size disparity, effortless precision against brute force, nonchalant aftermath as if nothing happened"
  },

  "reference": {
    "use_reference": "<<image_1>>",

    "description": "young east asian woman, chin-length bright orange-red hair, white wired earphones, dark bomber jacket over white t-shirt, blue slim jeans, boots — lean athletic build, composed neutral expression; attackers: 3–4 men of varying builds — one slim in black jacket, one stocky bearded in grey hoodie, one large dark coat, one in khaki pants"
  },

  "sound": {
    "type": "diegetic only",

    "layers": [
      "subway car rattle and wheel screech on rails, constant low rumble",
      "sharp impact thuds — fist and boot on body, deep meaty hits",
      "metal pole clang — hands and bodies slamming against grab bars",
      "fabric rip and shuffle — jacket friction during grapples",
      "heavy bodies hitting plastic seats and floor, hollow thud",
      "earphone dangling click against jacket zipper between strikes",
      "muffled PA announcement bleeding through speakers"
    ]
  },

  "camera": {
    "type": "handheld tracking, tight interior coverage",
    "height": "shoulder level ~150cm, drops to hip level during ground exchanges",
    "movement": "reactive handheld — follows the woman's movement through the car, quick pans on strikes, slight push-ins on impacts, pulls back for acrobatic beats, stabilizes for aftermath wide shot"
  },

  "environment": {
    "setting": "interior of a moving subway car — blue molded plastic seats, chrome grab bars and poles, overhead fluorescent panel lighting, ad posters and route maps on walls, sliding doors with dark windows",

    "lighting": "harsh overhead fluorescent — cool white, unflattering, creates hard shadows under brows and jawlines, specular glints on chrome poles, warm orange spill from tunnel lights streaking past windows",

    "atmosphere": "confined, claustrophobic, rattling — car sways and lurches during the fight"
  },

  "action": {
    "phase_1": "0:00–0:03 — woman stands near door with earphones in, one attacker grabs her shoulder from behind; she reacts instantly, pivots",

    "phase_2": "0:03–0:08 — explosive close-quarters combat — she uses the grab pole as leverage for an aerial kick, sends the first attacker into seats, engages second attacker with rapid strikes and a headbutt",

    "phase_3": "0:08–0:12 — fight escalates to multiple opponents — she blocks, counters, uses tight space to advantage, slams one man into the door, knees another, grapples using overhead bars",

    "phase_4": "0:12–0:15 — all attackers are down on seats" }
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/6add278b460a880cc9e6c8c37359719bec646406/README_zh.md#L2809)

```text
{
  "model": "seedance-2.0",
  "task_type": "generation",
  "task": "generate_video",

  "priority": {
    "primary": "handheld close-combat fight sequence inside a moving subway car — young woman with orange hair dismantles multiple male attackers using poles, seats, tight-space acrobatics, then walks away unfazed",

    "secondary": "casual dominance — size disparity, effortless precision against brute force, nonchalant aftermath as if nothing happened"
  },

  "reference": {
    "use_reference": "<<image_1>>",

    "description": "young east asian woman, chin-length bright orange-red hair, white wired earphones, dark bomber jacket over white t-shirt, blue slim jeans, boots — lean athletic build, composed neutral expression; attackers: 3–4 men of varying builds — one slim in black jacket, one stocky bearded in grey hoodie, one large dark coat, one in khaki pants"
  },

  "sound": {
    "type": "diegetic only",

    "layers": [
      "subway car rattle and wheel screech on rails, constant low rumble",
      "sharp impact thuds — fist and boot on body, deep meaty hits",
      "metal pole clang — hands and bodies slamming against grab bars",
      "fabric rip and shuffle — jacket friction during grapples",
      "heavy bodies hitting plastic seats and floor, hollow thud",
      "earphone dangling click against jacket zipper between strikes",
      "muffled PA announcement bleeding through speakers"
    ]
  },

  "camera": {
    "type": "handheld tracking, tight interior coverage",
    "height": "shoulder level ~150cm, drops to hip level during ground exchanges",
    "movement": "reactive handheld — follows the woman's movement through the car, quick pans on strikes, slight push-ins on impacts, pulls back for acrobatic beats, stabilizes for aftermath wide shot"
  },

  "environment": {
    "setting": "interior of a moving subway car — blue molded plastic seats, chrome grab bars and poles, overhead fluorescent panel lighting, ad posters and route maps on walls, sliding doors with dark windows",

    "lighting": "harsh overhead fluorescent — cool white, unflattering, creates hard shadows under brows and jawlines, specular glints on chrome poles, warm orange spill from tunnel lights streaking past windows",

    "atmosphere": "confined, claustrophobic, rattling — car sways and lurches during the fight"
  },

  "action": {
    "phase_1": "0:00–0:03 — woman stands near door with earphones in, one attacker grabs her shoulder from behind; she reacts instantly, pivots",

    "phase_2": "0:03–0:08 — explosive close-quarters combat — she uses the grab pole as leverage for an aerial kick, sends the first attacker into seats, engages second attacker with rapid strikes and a headbutt",

    "phase_3": "0:08–0:12 — fight escalates to multiple opponents — she blocks, counters, uses tight space to advantage, slams one man into the door, knees another, grapples using overhead bars",

    "phase_4": "0:12–0:15 — all attackers are down on seats" }
```

## 出处与许可

- 原作者：[Zunaira](https://x.com/ZunairaSaeedAi) · 原帖：<https://x.com/ZunairaSaeedAi/status/2085172792551686401>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/6add278b460a880cc9e6c8c37359719bec646406/README.md#L2813)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `6add278b460a`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=8631>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
