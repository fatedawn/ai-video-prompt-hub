---
id: "grok-3482"
title: "High-status paparazzi reaction prompt"
title_en: null
model: "Grok Imagine"
language: "en"
medium: "真人"
direction: "现实向"
genre: "情绪特写"
art_style: null
tags: ["Grok Imagine", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-grok-imagine-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-grok-imagine-prompts/blob/6ba7b05b67cafc38c96fbd9d9242114eceab562e/README.md#L2127"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "Özge Döner"
original_author_url: "https://x.com/astronomerozge1"
original_post_url: "https://x.com/astronomerozge1/status/2046656621414129727"
published: "Apr 21, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/grok-imagine-prompts?id=3482"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
output_status: "output_unverified"
verification: "attribution_checked"
---

# High-status paparazzi reaction prompt

> A complex JSON-based video prompt for a cinematic paparazzi scene with strict identity locking.

## 提示词（English）

```text
{
  "generation_request": {
    "meta_data": {
      "tool": "Video",
      "task_type": "paparazzi_controlled_luxury_reaction",
      "version": "v2.0_NO_DROP_HIGH_STATUS"
    },
    "input": {
      "mode": "image_to_video",
      "reference_image_usage": "maximum",
      "preserve_identity": "strict_lock",
      "preserve_scene": true,
      "notes": "Keep the exact same woman, outfit, drink, location, camera angle, lighting, and composition. Do not change her face or body."
    },
    "motion": {
      "style": "cinematic paparazzi realism",
      "speed": "natural real-time",
      "camera": "subtle handheld feel only, no reframing or zoom"
    },
    "scene_events": {
      "paparazzi_arrival": {
        "action": "2-3 paparazzi photographers quickly step into frame from the sides and background",
        "details": "they raise cameras and move closer, slightly chaotic but not blocking the subject"
      },
      "flash_effect": {
        "action": "multiple camera flashes fire intermittently",
        "details": "strong realistic light bursts reflecting on her sunglasses, skin, and outfit"
      },
      "subject_reaction": {
        "action": "woman reacts with visible annoyance but controlled composure",
        "details": "slight head turn away from cameras, subtle brow tension, lips tighten slightly, gaze becomes colder and more dominant"
      },
      "body_language": {
        "action": "she continues walking forward confidently",
        "details": "posture remains strong, shoulders stable, no panic movement, luxury attitude maintained"
      },
      "drink_behavior": {
        "action": "drink remains stable in her hand",
        "details": "minor natural hand adjustment only, no spilling, no dropping, liquid remains intact"
      }
    },
    "realism_rules": {
      "face": "no distortion, identity locked, natural micro-expressions only",
      "body": "correct walking biomechanics, no stiffness, no warping",
      "hands": "perfect grip, correct finger articulation",
      "physics": "realistic movement, no exaggerated motion",
      "lighting": "consistent ambient light + flash bursts only"
    },
    "performance_direction": {
      "emotion": "annoyed but powerful, unbothered, high-status presence",
      "energy": "controlled dominance, not reactive panic",
      "vibe": "celebrity ignoring paparazzi, luxury confidence"
    },
    "duration": {
      "length": "6-8 seconds"
    },
    "negative_prompt": {
      "avoid": [
        "drink spilling",
        "drink dropping",
        "panic reaction",
        "exaggerated movement",
        "face distortion",
        "body deformation",
        "extra limbs",
        "bad hands",
        "glitch",
        "warping",
        "camera zoom",
        "scene change",
        "cartoon motion"
      ]
    }
  }
}
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-grok-imagine-prompts/blob/6ba7b05b67cafc38c96fbd9d9242114eceab562e/README_zh.md#L2126)

```text
{
  "generation_request": {
    "meta_data": {
      "tool": "Video",
      "task_type": "paparazzi_controlled_luxury_reaction",
      "version": "v2.0_NO_DROP_HIGH_STATUS"
    },
    "input": {
      "mode": "image_to_video",
      "reference_image_usage": "maximum",
      "preserve_identity": "strict_lock",
      "preserve_scene": true,
      "notes": "保持完全一致的女性形象、服装、饮品、地点、拍摄角度、光影和构图。严禁改变其面部或身体特征。"
    },
    "motion": {
      "style": "cinematic paparazzi realism",
      "speed": "natural real-time",
      "camera": "subtle handheld feel only, no reframing or zoom"
    },
    "scene_events": {
      "paparazzi_arrival": {
        "action": "2-3 名狗仔摄影师从画面侧面和背景快速切入",
        "details": "他们举起相机并靠近，画面略显混乱但不会遮挡主体"
      },
      "flash_effect": {
        "action": "多个相机闪光灯间歇性闪烁",
        "details": "强烈的写实光束反射在她的墨镜、皮肤和服装上"
      },
      "subject_reaction": {
        "action": "女性表现出明显的厌烦但保持克制的镇定",
        "details": "头部轻微转向避开镜头，眉间微蹙，双唇轻抿，目光变得冷峻且更具压迫感"
      },
      "body_language": {
        "action": "她继续自信地向前走",
        "details": "姿态保持挺拔，双肩平稳，没有任何惊慌动作，维持奢华的高姿态"
      },
      "drink_behavior": {
        "action": "手中的饮品保持稳定",
        "details": "仅有细微自然的持杯调整，没有洒出，没有掉落，液体保持原状"
      }
    },
    "realism_rules": {
      "face": "无畸变，身份锁定，仅限自然的微表情",
      "body": "正确的行走生物力学，无僵硬感，无扭曲",
      "hands": "完美的抓握，正确的手指关节活动",
      "physics": "写实的运动轨迹，无夸张动作",
      "lighting": "仅限一致的环境光 + 闪光灯爆发"
    },
    "performance_direction": {
      "emotion": "厌烦但强大，不受干扰，高阶名流气场",
      "energy": "受控的支配感，而非惊慌失措的反应",
      "vibe": "名人无视狗仔队，奢华自信的氛围"
    },
    "duration": {
      "length": "6-8 秒"
    },
    "negative_prompt": {
      "avoid": [
        "饮品洒出",
        "饮品掉落",
        "惊慌反应",
        "夸张动作",
        "面部畸变",
        "身体变形",
        "多余肢体",
        "手部瑕疵",
        "故障",
        "扭曲",
        "镜头变焦",
        "场景切换",
        "卡通化运动"
      ]
    }
  }
}
```

### YouMind 提供的日本語版本（README_ja-JP.md）

[位置](https://github.com/YouMind-OpenLab/awesome-grok-imagine-prompts/blob/6ba7b05b67cafc38c96fbd9d9242114eceab562e/README_ja-JP.md#L2127)

```text
{
  "generation_request": {
    "meta_data": {
      "tool": "Video",
      "task_type": "paparazzi_controlled_luxury_reaction",
      "version": "v2.0_NO_DROP_HIGH_STATUS"
    },
    "input": {
      "mode": "image_to_video",
      "reference_image_usage": "maximum",
      "preserve_identity": "strict_lock",
      "preserve_scene": true,
      "notes": "女性、服装、飲み物、場所、カメラアングル、照明、構図を完全に維持すること。顔や体型を変更しないこと。"
    },
    "motion": {
      "style": "cinematic paparazzi realism",
      "speed": "natural real-time",
      "camera": "subtle handheld feel only, no reframing or zoom"
    },
    "scene_events": {
      "paparazzi_arrival": {
        "action": "2 ～ 3 人のパパラッチがサイドや背景から素早くフレームインする",
        "details": "カメラを構えて近づく。少し混沌としているが、被写体を遮らないこと"
      },
      "flash_effect": {
        "action": "複数のカメラフラッシュが断続的に光る",
        "details": "サングラス、肌、服装に反射するリアルで強い光のバースト"
      },
      "subject_reaction": {
        "action": "女性は目に見えて不快感を示すが、冷静さを保つ",
        "details": "カメラからわずかに顔を背け、眉間にわずかな緊張、唇を少し引き締め、視線はより冷たく支配的なものになる"
      },
      "body_language": {
        "action": "彼女は自信を持って歩き続ける",
        "details": "姿勢は力強く、肩は安定し、パニックによる動きはなく、ラグジュアリーな態度を維持する"
      },
      "drink_behavior": {
        "action": "飲み物は手に持ったまま安定させる",
        "details": "自然な手の微調整のみ。こぼしたり落としたりせず、液体もそのままの状態を維持する"
      }
    },
    "realism_rules": {
      "face": "歪みなし、アイデンティティ固定、自然な微表情のみ",
      "body": "正しい歩行のバイオメカニクス、硬直や歪みなし",
      "hands": "完璧なグリップ、正しい指の関節表現",
      "physics": "リアルな動き、誇張された動作なし",
      "lighting": "一貫した環境光とフラッシュのバーストのみ"
    },
    "performance_direction": {
      "emotion": "不快だが力強く、動じない、ハイステータスな存在感",
      "energy": "コントロールされた支配力、パニック反応ではない",
      "vibe": "パパラッチを無視するセレブリティ、ラグジュアリーな自信"
    },
    "duration": {
      "length": "6 ～ 8 秒"
    },
    "negative_prompt": {
      "avoid": [
        "drink spilling",
        "drink dropping",
        "panic reaction",
        "exaggerated movement",
        "face distortion",
        "body deformation",
        "extra limbs",
        "bad hands",
        "glitch",
        "warping",
        "camera zoom",
        "scene change",
        "cartoon motion"
      ]
    }
  }
}
```

## 出处与许可

- 原作者：[Özge Döner](https://x.com/astronomerozge1) · 原帖：<https://x.com/astronomerozge1/status/2046656621414129727>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-grok-imagine-prompts](https://github.com/YouMind-OpenLab/awesome-grok-imagine-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-grok-imagine-prompts/blob/6ba7b05b67cafc38c96fbd9d9242114eceab562e/README.md#L2127)
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/grok-imagine-prompts?id=3482>
- 说明：YouMind 的 README 由 CMS 轮换展示；本条取自该仓库 README 历史版本（commit `6ba7b05b67ca`），与当前版本同为 CC BY 4.0
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
