---
id: "youmind-4005"
title: "一致的电影级角色序列"
title_en: "Consistent Cinematic Character Sequence"
model: "Seedance 2.0"
language: "en"
medium: "真人"
direction: "现实向"
genre: "剧情短片"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/12ab240e5d8a1a4c4ed41a95fc7e2ce08d76e6f6/README.md#L2382"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "aanggaamc"
original_author_url: "https://x.com/aanggaamc"
original_post_url: "https://x.com/aanggaamc/status/2050151622513492060"
published: "May 1, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=4005"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# 一致的电影级角色序列

*Consistent Cinematic Character Sequence*

> 这是一个为 Seedance 2.0 设计的技术性多阶段提示词，旨在确保角色在遵循复杂的 12 画面项目布局以制作电影级视频时，保持绝对的一致性。

## 提示词（English）

```text
@image 1 is the main subject identity (female, silver hair, exact face, must remain 100% consistent across all frames, no variation)

@image 2 is the storyboard layout reference (12 panels, sequence, framing, timing must be followed precisely, no deviation)

@image Generate a 15-second cinematic video that strictly follows the storyboard sequence from @image 2 while using the subject from @image 1.

@image STYLE:
ultra realistic, photorealistic, cinematic lighting, physically accurate lighting, global illumination, volumetric fog, god rays, soft shadows, high dynamic range, realistic light falloff, subsurface scattering skin, skin pores, micro texture, cinematic lens 85

@image CONSISTENCY RULE:
same face, same proportions, same hair, no redesign, no stylization drift, no identity change
CAMERA:
cinematic movement, parallax depth, smooth tracking, whip pan for action, handheld micro shake, motion blur on impact

@image Micro details: cloth movement, hair physics, breathing motion, dust particles
cinematic timing: build → impact → silence
impact frames use slight slow motion + shake burst
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/12ab240e5d8a1a4c4ed41a95fc7e2ce08d76e6f6/README_zh.md#L2377)

```text
@image 1 是主体身份（女性，银发，精确的面部特征，必须在所有帧中保持 100% 一致，不得有任何变化）

@image 2 是项目布局参考（必须严格遵循 12 个画面的序列、构图和时序，不得有任何偏差）

@image 生成一个 15 秒的电影级视频，严格遵循 @image 2 的项目序列，并使用 @image 1 中的主体。

@image 风格：
超写实，照片级真实感，电影级布光，物理精确布光，全局光照，体积雾，丁达尔效应，柔和阴影，高动态范围，逼真的光线衰减，次表面散射皮肤，皮肤毛孔，微纹理，85mm 电影镜头

@image 一致性规则：
相同的面部，相同的比例，相同的发型，禁止重新设计，禁止风格化漂移，禁止身份改变
摄像机：
电影级运镜，视差深度，平滑追踪，动作快摇，手持微抖动，冲击时的运动模糊

@image 微观细节：布料运动，头发物理效果，呼吸动作，尘埃粒子
电影级时序：铺垫 → 冲击 → 静止
冲击帧使用轻微慢动作 + 震动爆发
```

## 出处与许可

- 原作者：[aanggaamc](https://x.com/aanggaamc) · 原帖：<https://x.com/aanggaamc/status/2050151622513492060>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/12ab240e5d8a1a4c4ed41a95fc7e2ce08d76e6f6/README.md#L2382)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `12ab240e5d8a`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=4005>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
