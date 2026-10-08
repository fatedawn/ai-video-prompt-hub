---
id: "learnprompt-tpl-zh-sports-extreme"
title: "💥 体育与极限运动"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/sports-extreme.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 💥 体育与极限运动

> 这类片子全押在动作闭环上。从助跑到落地，每个环节按顺序写出来，要哪几项物理就点名哪几项，负面清单专门用来打掉飞行、悬浮和瞬移。

## 模板（中文）

```text
我要做一条极限运动短片，【项目是滑板，场地是傍晚城市高架桥下的水泥碗池】，【我提供自己的照片当主角，全程锁脸和造型】。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### 体育与极限运动

这类片子全押在动作闭环上。从助跑到落地，每个环节按顺序写出来，要哪几项物理就点名哪几项，负面清单专门用来打掉飞行、悬浮和瞬移。

**适用场景:** 单板滑雪、山地骑行、跑酷、街头篮球、水上闯关，以及手机实拍风格的特技片段，身体必须服从重力和接触。

**要点:**

- 把特技写成一条有顺序的接触与反应链条。屋顶蹦极那条的 STUNT ENGINE 段从 `屋顶助跑 → 飞越护墙 → 高空下落 → 命中圆形弹性面中心` 一路排到落地，还要求 `接触—下陷—压缩—回弹` 四个阶段都看得见。
- 物理逐项点名。山地车决赛那条要的是 `suspension compression, braking, cornering, jump physics, dirt displacement`，车才会像车，而不是在地面上滑行。
- 人、车、赛道和光在开头一句话锁死。山谷骑行那条开篇就是 `Same female rider, bike, clothing, trail, and daylight throughout`，后面再也不重复描述。
- 所有反应都从接触开始。水上闯关那条写了 `反应必须由接触触发`，墙板真的碰到之前，不许她提前站起或者提前后仰。
- 负面清单留给作弊动作，不要拿来写审美。山地车决赛那条禁掉 `no teleportation, no floating bikes, no unrealistic physics`，蹦极那条还补了飞行、悬浮、隐形绳索和反重力。

**示例:** [#1](https://goodcase.ai/cases/seedance-269d1fc95820) [#2](https://goodcase.ai/cases/ayzalnooor24521-seedance-ai-db77eb406bfb) [#3](https://goodcase.ai/cases/nawalsehar-seedance-ai-9cff7acb6229) [#4](https://goodcase.ai/cases/johnagi168-seedance-ai-792fb30bed36)

**结构:**

1. 开头参数：时长、画幅、参考图、现场声，整体质感写成极限运动手机实拍
2. 全局连续性：场地、器械、主角、旁观者，各占一小段
3. 相机连续性：谁在拿着拍、镜头怎么走，写明不切镜、不换视角
4. 动作闭环：从助跑到落地，每个环节按顺序点名一次，连成一条链
5. 按时间码切拍，每拍写身体细节，再配上这一拍的相机动作
6. 约束段：环境位置不漂移，力从哪来说清楚，不能表现成飞行
7. 负面清单：造型漂移、机位瞬移、物理失效、受伤流血、字幕水印

**常见坑:**

- 只写结果，跳过接触。身体会在碰到东西之前就弹起来或者飞出去，接触、压缩、回弹各给一个时间段。
- 在一镜到底里塞额外机位。写上 `不切镜、不瞬移、不更换视角`，相机动作按摄影者跟着运动员跑来描述。
- 落地轻飘，站直了就站住。要求屈膝屈髋深度下沉吸收冲击，再把 `落地无重量，站直落地` 放进负面清单。
- 翻转方向和圈数写得太死。四肢会扭曲穿模，蹦极那条写的是 `不要锁定具体翻转方向`，要的是自然连续的旋转。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/sports-extreme.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
