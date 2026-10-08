---
id: "learnprompt-tpl-zh-car-vehicle"
title: "💥 汽车与载具速度片"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/car-vehicle.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 💥 汽车与载具速度片

> 机器从头到尾得是同一台机器，出力的是镜头。先把车按部件锁住，再用编号分镜表把时长排满，每一秒换一个机位。

## 模板（中文）

```text
我要做一条载具速度短片，【车是一台白色越野摩托，路况是清晨起雾的碎石山路】，【骑手是一个穿旧皮衣的男生，全程戴全盔】。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### 汽车与载具速度片

机器从头到尾得是同一台机器，出力的是镜头。先把车按部件锁住，再用编号分镜表把时长排满，每一秒换一个机位。

**适用场景:** 摩托和汽车广告、山路疾驰、追逐与特技段落，还有车辆变形类的片子。

**要点:**

- 车按部件写，不靠车标。Karakoram 那条广告点名 `realistic suspension movement, wheel rotation, chain movement, engine vibration`，再要求整条保持比例一致。
- 先声明总镜头数，再写表。山路摩托那条开头写 `exactly 16 distinct cuts, total runtime ≈ 16–17 seconds`，后面 CUT 01 到 CUT 16 一秒一条。
- 速度写在机位和被甩过去的东西上。同一条里写 `camera drops even lower, almost road-level`，然后写 `grass and fence posts racing past`。
- 开头给一句配比，下面照着执行。山路那条声明 `90 % pure kinetic camera motion and 10 % environmental beauty`，于是十六个镜头没有一个停下来看风景。
- 负面清单要点名车会怎么坏。Karakoram 那条排除 `no duplicated motorcycle components, no unrealistic wheel geometry, no floating motorcycle`，摩托变龙那条另外要求变形前后必须明确是同一个实体。

**示例:** [#1](https://goodcase.ai/cases/ruzainameer-seedance-ai-e6073ec318f1) [#2](https://goodcase.ai/cases/just-sharon7-seedance-ai-f5af358d1f88) [#3](https://goodcase.ai/cases/karakoram-motorcycle-commercial) [#4](https://goodcase.ai/cases/missdelulu9-seedance-ai-02009f1f7daf)

**结构:**

1. 开场一句：时长、画幅、帧率，以及总共多少个镜头
2. 车辆锁定：车型、颜色，以及那些必须动对的部件
3. 骑手或司机锁定：体型、装备、头盔，收一句一致性
4. 路面和天气：铺装、路两边是什么、光线
5. 一句配比，说明这条片子多少是镜头运动、多少是风景
6. 编号分镜表，一秒一条，每条点名机位和被甩过去的东西
7. 收尾：视觉风格，再加一份专门针对车会怎么坏的负面清单

**常见坑:**

- 只写车名和路，剩下交给模型。颜色和姿态会一镜一变，山路那条专门写 `Preserve the exact bike color, rider silhouette, road markings`。
- 一个镜头里写两个机位。一秒只装得下一个机位，写多了模型会在镜头中间自己切一刀。
- 把变形写成剪辑切换。摩托变龙那条要求 `No cuts or jumps`，并把轮子变爪肢、车架撑成装甲躯干逐件写出来。
- 特写停在车标或者仪表盘文字上。生成出来的字必歪，特写改打轮胎接地、悬挂压缩和排气这些结构件。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/car-vehicle.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
