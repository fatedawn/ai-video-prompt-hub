---
id: "goodcase-yaml-629d172a4820"
title: "YAML 跑酷电影级序列"
title_en: "YAML Cinematic Parkour Sequence"
model: "Seedance 2.0"
language: "en"
medium: "漫剧"
direction: "现实向"
genre: "剧情短片"
art_style: "2D日漫"
tags: ["template:sports-extreme"]
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/data/cases.json#L8861"
license: "CC-BY-4.0 (curation) — prompt © original creator"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "@yudotanaka"
original_author_url: null
original_post_url: "https://x.com/yudotanaka/status/2079900274064490842"
published: "2026-07-22"
third_party_author: true
flags: []
also_in: []
source_page: "https://goodcase.ai/cases/yaml-629d172a4820"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# YAML 跑酷电影级序列

*YAML Cinematic Parkour Sequence*

> 一个用于现代城市精英跑酷选手的结构化 YAML 格式提示词，包含电影级运镜和逼真的物理效果。

## 提示词（English）

```text
meta:
  task_type: video_generation
  style:
    camera: cinematic_dynamic
    render: AAA_animation_unreal_engine_quality
  reference_lock:
    character_appearance: strict
    style_and_art_direction: strict
  priority: cinematic_impact

cinematography:
  shot_type: multi_shot_dynamic_sequence
  framing:
    - full_body_visible_during_key_actions
  camera_height: variable
  lens_look: 24mm_to_35mm
  camera_motion:
    - low_tracking_shot_following_behind
    - side_tracking_shot
    - drone_orbit
    - fpv_drone_chase
    - handheld_chase
    - crane_pull_back
    - speed_ramp
    - slow_motion_on_key_flip

subjects:
  athlete:
    type: parkour_runner
    level: elite
    attributes:
      - athletic_build
      - consistent_outfit_and_appearance_locked
      - hair_and_cloth_physics_reactive

environment:
  location: modern_realistic_city
  floor:
    - paved_street
    - rooftop_concrete
    - metal_beams_and_pipes
  background:
    - glass_skyscrapers
    - busy_traffic
    - pedestrians
    - street_signs
    - bridges
    - construction_zones
  lighting:
    - warm_sunset_transitioning_to_blue_hour
    - volumetric_lighting
    - realistic_reflections

process:
  - phase: sprint_launch
    timing: 0s-3s
    description:
      - explosive_believable_acceleration
      - dodge_pedestrians
      - jump_over_obstacles
      - slide_beneath_barriers
  - phase: vault_and_wall_run
    timing: 3s-6s
    description:
      - vault_over_railings
      - wall_run_across_building
      - leap_to_next_rooftop
      - believable_momentum_and_impact_recovery
  - phase: advanced_parkour_techniques
    timing: 6s-9s
    description:
      - kong_vault
      - precision_jump
      - tic_tac_wall_jump
      - front_flip
      - perfect_balance_no_floating
  - phase: rooftop_traversal
    timing: 9s-12s
    description:
      - swing_from_metal_beam
      - run_along_narrow_rooftop_edge
      - slide_under_pipes
      - long_rooftop_gap_jump
  - phase: final_leap
    timing: 12s-15s
    description:
      - reach_tallest_rooftop
      - confident_smile
      - final_cinematic_leap_toward_skyline
      - freeze_frame_ending

motion_rules:
  pacing:
    - natural_timing_with_dramatic_speed_ramps
    - uninterrupted_flow_between_phases
  physics:
    - grounded_gravity_present
    - accurate_center_of_gravity
    - natural_inertia_and_weight_shift
    - realistic_foot_placement
    - proper_landing_compression
    - cloth_simulation
    - hair_simulation
    - no_unearned_floating

visual_rules:
  style:
    - anime_photorealistic_hybrid
    - HDR_ray_tracing_reflections
    - global_illumination
    - soft_bloom
    - shallow_depth_of_field
    - filmic_color_grading
    - shinkai_inspired_lighting
  clarity:
    - body_mechanics_readable_outside_slow_motion_beats

audio:
  - high_energy_cinematic_soundtrack
  - synchronized_footsteps
  - wind_rushing
  - city_ambience
  - cloth_movement_sfx
  - metal_impact_sfx
  - environmental_reverb
  - no_dialogue

constraints:
  forbidden:
    - unnatural_physics
    - outfit_change
    - multiple_characters
    - text
    - logo

output_rules:
  emphasis:
    - cinematic_spectacle
    - technical_parkour_accuracy
    - character_consistency
```

## 出处与许可

- 原作者：@yudotanaka · 原帖：<https://x.com/yudotanaka/status/2079900274064490842>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/data/cases.json#L8861)
- 上游许可：CC-BY-4.0 (curation) — prompt © original creator（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://goodcase.ai/cases/yaml-629d172a4820>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
