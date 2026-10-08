---
id: "learnprompt-tpl-zh-stop-motion-cadence"
title: "🎨 定格动画与步进节奏"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/stop-motion-cadence.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🎨 定格动画与步进节奏

> 定格首先是时间规格，其次才是质感。写死帧率和保持帧数，指名工艺材质，再禁掉那三样会悄悄把它抹平的东西。

## 模板（中文）

```text
我要做一条定格动画质感的短片，【材质是：毛毡和黏土】，【内容是：一只毛毡小狐狸在森林里搭帐篷】，【要有明显的逐帧步进感】。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### 定格动画与步进节奏

定格首先是时间规格，其次才是质感。写死帧率和保持帧数，指名工艺材质，再禁掉那三样会悄悄把它抹平的东西。

**适用场景:** 黏土、剪纸、会动的油画、拼贴、台面物件动画。案例库里 24 条属于这一族。

**要点:**

- 节奏用数字写死：`True 12fps, ANIMATED ON TWOS: 12 distinct hand-painted drawings per second, each pose held two frames then snapping to the next, never gliding`。
- 指名材质的同时排除相邻材质。狼群袭击那条写的是手绘 2D 质感、会动的油画，NOT clay、NOT puppets、NOT 3D。
- 负向三件套是必需的：NO smooth interpolation、NO motion blur、NO morphing。步进感被悄悄抹平，主要就走这三条路。
- 台面类要把机位锁死——perfectly locked top-down overhead、无机位运动、不出现手、不出现周边物件——只让被摄物变。
- 工艺瑕疵要写成要求：手工不齐的纸边、姿势之间的微小位移抖动、偶尔一帧的拖影、轮廓持续的画面 boil。

**示例:** [#1](https://goodcase.ai/cases/case-69e5879cc5a7) [#2](https://goodcase.ai/cases/case-b079faa80f0f) [#3](https://goodcase.ai/cases/case-0287a838e662) [#4](https://goodcase.ai/cases/case-50ba683413ff)

**结构:**

1. 节奏声明：每秒帧数、每个姿势保持几帧、跳变而不是滑动
2. 工艺材质，并显式排除相邻材质
3. 负向块：不插值、不运动模糊、不形变过渡
4. 机位与台面：锁死俯拍或锁死舞台，不出现手，不出现多余物件
5. 被摄物的逐段变形

**常见坑:**

- 没有把环境运动和主体运动分开。风雪、烟、水可以平滑漂移，人物和道具要步进，不写清楚就会一起被平滑掉。
- 同时要定格和长镜头运动。这是互斥需求，通常是运镜赢。
- 同一条里既要黏土又要纸片。两者的光影逻辑不同，模型会混成一种说不清的表面。
- 12fps 下还用常规动作幅度。步进动画在快动作上会丢可读性，姿势幅度要放大。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/stop-motion-cadence.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
