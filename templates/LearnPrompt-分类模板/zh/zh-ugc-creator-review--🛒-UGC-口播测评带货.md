---
id: "learnprompt-tpl-zh-ugc-creator-review"
title: "🛒 UGC 口播测评带货"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/ugc-creator-review.md#L24"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🛒 UGC 口播测评带货

> 创作者对着镜头开箱、上手、种草。要两把独立的锁——一把锁人，一把锁产品——台词焊进动作里。

## 模板（中文）

```text
我要做一个 UGC 口播测评带货视频，【我的产品是一瓶洗发水，产品图片我提供给你】，【出镜的人是一位长发女生，在浴室镜子前边用边讲】。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### UGC 口播测评带货

创作者对着镜头开箱、上手、种草。要两把独立的锁——一把锁人，一把锁产品——台词焊进动作里。

**适用场景:** 带货型产品视频、开箱和创作者测评：产品要在被拿起、旋转、佩戴的过程中始终认得出来。

**要点:**

- 产品锁和人物锁分开写，并把产品拆成结构件。太阳镜测评那条点名了镜框形状、镜片、铰链、颜色、材质、比例，还把零售盒和皮套各自当独立参考锁住。
- 台词写在它发生的那一拍里。咖啡机广告把 `I finally tried this coffee machine` 放在创作者走进厨房的那一秒，不另开对白区。
- 文案写成第一人称感受句，不写广告腔。生效的台词读起来像 `The finish feels amazing, and they're incredibly lightweight`，不像 slogan。
- 收尾固定两拍：产品单独入画，然后创作者拿着产品看镜头。案例库里 16 条广告型案例全是这个收法。
- 显式补 `realistic hands`。产品上手是手指数量翻车的重灾区，而这类格式里手几乎全程在画面上。

**示例:** [#1](https://goodcase.ai/cases/seedance-2-5-ugc-69e79f387106) [#2](https://goodcase.ai/cases/seedance-2-5-ugc-7de9338ecfc9) [#3](https://goodcase.ai/cases/case-b157d9c072bc)

**结构:**

1. 人物锁定段（脸、发型、妆、肤色、比例、整套服装）
2. 产品锁定段，按结构拆开写
3. 场景与光线：房间、时段、手持手机质感
4. 节拍流程：开箱、细节旋转、佩戴或使用、对镜或对镜头确认、放回
5. 台词就写在它被说出的那一拍里
6. 需求收尾：画幅、时长、realistic hands、no logos or watermarks

**常见坑:**

- 微距镜头停在印刷标签上。品牌文字几乎必错，要么特写避开文字，要么直接要求无品牌表面。
- 让创作者边走边做精细的产品操作。拆成两拍。
- 台词写太长。口型对不上时应该砍句子，而不是加口型形容词。
- 让模型渲染上屏 slogan。生成的字排出来是乱码，应该留一个干净的收尾画面，文字后期加。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/ugc-creator-review.md#L24)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
