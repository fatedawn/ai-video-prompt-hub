---
id: "learnprompt-tpl-zh-pov-continuous-take"
title: "📱 第一人称一镜到底"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/pov-continuous-take.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 📱 第一人称一镜到底

> 执法记录仪、GoPro、FPV 和车把视角。相机挂在身体上，运动必须从身体推导，每一次剪辑都得手动声明。

## 模板（中文）

```text
我要做一条第一人称一镜到底的视频，【我的视角是：骑着山地车从林道冲下山】，【画面里要出现我的双手和车把】。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### 第一人称一镜到底

执法记录仪、GoPro、FPV 和车把视角。相机挂在身体上，运动必须从身体推导，每一次剪辑都得手动声明。

**适用场景:** 要观众就是操作者的沉浸素材：破门突入、极限运动、厨师视角做饭、无人机飞行。207 条里 32 条属于这类。

**要点:**

- 声明挂载位置和高度，模型才能推出该怎么晃：胸挂在破门手身上、POV 保持胸到眼的高度、只随身体移动。
- 拒绝空首帧。GoPro 钓鱼那条写 `Non-empty opening frame: already mid-cast, rod raised, line already peeling off the reel`，把死掉的第一秒省掉了。
- 一镜到底和剪辑要分开声明。剪点写成清单——A 0-9s 河边一镜，HARD CUT，B 9-21s 案板一镜——再补一句除此之外相机不剪。
- 视场角逐段写成度数（84° 在搏斗中收到 63°，下一段 63° 收到 18°），后面跟一句 `No drift within any segment`。
- 把身体挂载的光学后果写出来：边缘广角畸变、行走造成的上下颠动、快速转头的运动模糊、手电只照亮操作者面向的方向。

**示例:** [#1](https://goodcase.ai/cases/seedance-2-5-d68024212dfc) [#2](https://goodcase.ai/cases/seedance-2-5-gopro-94a73eef1dbf) [#3](https://goodcase.ai/cases/seedance-2-5-f1696dad13bc) [#4](https://goodcase.ai/cases/fpv-cd4a852a53ba)

**结构:**

1. SCENE CONTEXT：一段话交代主体、挂载方式和总时长
2. ACTIVE REFERENCES：场景、手和道具的命名 token
3. LOCATION MAP：每段的前景、中景、背景各是什么，以及机位高度
4. FIRST FRAME / BLOCKING：首帧非空，开场就在动作中间
5. FORMAT MODE：硬切落在哪里，哪几段是连续一镜
6. OPTICS：每段的视场角，附一句段内不许漂移
7. 时间轴与音频

**常见坑:**

- 操作者自己的脸入画。补一句 `the camera itself is never visible`，只描述手在做什么。
- 手入画却不说左右手和持物。要写清哪只手拿什么，否则会长出第三只手。
- 在标了一镜到底的段落里安排跨场景大跳。要么实时走过去，要么在边界放一个声明过的硬切。
- 忘了禁掉电影化处理。执法记录仪和运动相机素材要明写 no slow-motion, no cinematic grading，否则会变成电影预告片。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/pov-continuous-take.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
