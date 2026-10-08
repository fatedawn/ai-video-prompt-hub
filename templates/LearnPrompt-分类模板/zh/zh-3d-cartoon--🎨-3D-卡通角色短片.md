---
id: "learnprompt-tpl-zh-3d-cartoon"
title: "🎨 3D 卡通角色短片"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/3d-cartoon.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🎨 3D 卡通角色短片

> 一个拟人小角色撑起整条片子。外形逐项写死并全程复述，画风写成能测量的渲染项，时间轴切成一段一个动作目标。

## 模板（中文）

```text
我要做一条 3D 卡通动画短片，【主角是一只戴红围巾的小刺猬，圆眼睛，走路一摇一摆】，【故事是它在雨夜给一只迷路的萤火虫带路回家】。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### 3D 卡通角色短片

一个拟人小角色撑起整条片子。外形逐项写死并全程复述，画风写成能测量的渲染项，时间轴切成一段一个动作目标。

**适用场景:** 皮克斯味的动画短片，主角是个可爱角色：动物厨师、幼龙、黏土质感但运动平滑的小家伙。

**要点:**

- 角色写成零件清单，再补一句把它冻住。青蛙大厨那条把皮肤、眼睛、嘴、脸颊、蹼足、厨师服逐项写出来，然后跟一句 `Keep the exact same frog appearance, outfit, proportions`；水獭冒险那条用的是 `Maintain the exact same character design, proportions, fur pattern`。
- 把风格词换成渲染项。沙发萌兔那条要的是柔软真实的绒毛、电影景深、奶油焦外，再补一句 `premium Pixar-like quality without copying any specific existing character`。
- 正文切成带标题的段。青蛙大厨从 `0–5 SEC — THE RESTAURANT` 一路排到 `27–30 SEC — THE PAYOFF`；水獭冒险用的是 `SCENE 1 — Meadow Chase`，每段点名地点和情绪。
- 情绪写成能动起来的身体动作。青蛙大厨那条写 `He moves one tiny vegetable approximately one millimeter` 和 `His eyes narrow`，揭晓那拍写 `The hedgehog's ears shoot upward`，比写一句大家很惊讶更容易落地。
- 收尾放一份针对动画翻车的排除清单。小蝴蝶那条以 `No character changes, face distortion, extra characters, outfit changes, flickering, deformed hands` 收尾，冰淇淋水獭那条补的是 `no distorted anatomy, no extra characters`。

**示例:** [#1](https://goodcase.ai/cases/ayzalnooor24521-seedance-ai-4a336f514777) [#2](https://goodcase.ai/cases/caden-flux-seedance-ai-473fedbbc75f) [#3](https://goodcase.ai/cases/seedance-made-with-seedance-2-5-71bc731fe900) [#4](https://goodcase.ai/cases/seedance-made-with-seedance-2-5-e2f2af930d0e)

**结构:**

1. 开篇一句定片型：时长、3D 动画短片、画幅、整体调性
2. 角色段：外形逐项、服装、性格，末尾加一句保持不变
3. 正文按秒或按 SCENE 切段，每段一个地点加一个动作目标
4. 段内写微动作和表情变化，让情绪靠动作出来
5. 视觉与渲染段：毛发、景深、光线、材质、焦外
6. 镜头与情绪段：推镜、跟拍、特写，再加一行 mood 词
7. 排除清单收尾：外形变化、脸崩、多余角色、闪烁、文字水印

**常见坑:**

- 只丢一个皮克斯风就收尾。模型还给你的是通用 CG，照萌兔那条把绒毛、景深、光线和焦外一项项写出来。
- 角色只在开头锁一次。片子走到中段外形就开始漂，每个场景开头重提识别物，比如蓝围巾、过大的厨师帽。
- 场景数量超过时长能装的。水獭那条 40 秒塞了 9 个场景，每段不到五秒，动作只能一滑而过。先砍场景，一段留一个动作目标。
- 让角色做精细手部操作又不设防。青蛙大厨用镊子摆香草这种动作最容易长出多余手指，把 `deformed hands` 写进排除清单，或者改成整只爪子抓。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/3d-cartoon.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
