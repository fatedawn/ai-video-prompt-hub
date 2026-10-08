---
id: "learnprompt-tpl-zh-horror-suspense"
title: "🎭 恐怖悬疑短片"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/horror-suspense.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🎭 恐怖悬疑短片

> 每一镜都带自己的时间码，身上只发生一个看得见的变化。吓人的地方在于这些变化一环扣一环：一个眼神、浮起的血管、一口咬下去、下一个人。结尾把门关上，事情不了结。

## 模板（中文）

```text
我要做一条恐怖悬疑短片，【场景是深夜的地下车库，一个女生在找自己的车】，【第一个出事的是那位保安，我把他的参考图发给你】。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### 恐怖悬疑短片

每一镜都带自己的时间码，身上只发生一个看得见的变化。吓人的地方在于这些变化一环扣一环：一个眼神、浮起的血管、一口咬下去、下一个人。结尾把门关上，事情不了结。

**适用场景:** 感染爆发、附身、走廊追逐、驱邪仪式，任何靠一具身体按秒变化来吓人的片子。

**要点:**

- 每一镜给时间码，而且只放一个变化。卧铺列车那条把 26 个镜头排进 30 秒，Shot 2 只有 `dark veins emerging beneath the skin`，Shot 3 只有 `Her eyes cloud milky white`。
- 第一镜就把脸锁死，别等事情发生。卧铺列车开头写 `<<<image_1>>>, face and outfit matching reference`；丧尸列车那条写 `Character A, matching reference face/outfit`；韩屋仪式那条写 `Keep the Word character's face and outfit consistent throughout`。
- 感染要传下去，第二轮把时间压短。丧尸列车那条第一个人从出症状到变完用了十二秒，被他咬的人只用七秒，就是 Shot 13 到 16。
- 恐怖的落点放在别人的反应上。卧铺列车切到 `A sleeping passenger stirs as another blood drop lands on his forehead`，天台那条是 `friends fall silent, chairs scrape back`。
- 结尾不给解决。卧铺列车收在夜行的列车外景，窗里还在乱；韩屋仪式那条收在 `One intact talisman emits faint dark smoke`。

**示例:** [#1](https://goodcase.ai/cases/seedance-shot-1-0-0-1-2s-image-1-face-and-outfit-matching-reference-lying-in-b6d9ef0e370e) [#2](https://goodcase.ai/cases/case-3b1796c66ab4) [#3](https://goodcase.ai/cases/case-b529ffbdfd9a) [#4](https://goodcase.ai/cases/seedance-30-sec-cinematic-korean-folk-horror-ritual-78323fedb479)

**结构:**

1. 开头：时长、片种，以及第一个要变的人的参考图锁定
2. Shot 1 带时间码：零号病人坐在普通的座位或铺位上，身上已经有一个症状
3. 递进镜头，每一镜只加一个看得见的变化：血管、白眼、脖子僵硬地偏过去
4. 触发镜：袭击本身，写成慢动作加冲击
5. 传染：被咬的人走同一套递进，时间压得更短
6. 人群恐慌和封门：门、行李、从玻璃后抓过来的手
7. 收尾镜：封住的门还在震，或者一个外部大景，什么都没解决

**常见坑:**

- 一镜里塞完整个变身。拆成四五镜：白眼、血管爬开、抽搐、非人的嘶吼、头猛地甩回来。
- 靠血浆量买恐怖。高热度那几条最狠的镜头是一滴血落在额头上，用极近景加慢动作拖住。
- 中段塌成一团乱打，看不清谁咬了谁。连混乱镜头也要点名主语和对象，像 `The infected turns and lunges at nearby passengers`。
- 把一致性锁放到结尾的风格段里。放那么后面脸早就飘了，锁定句要写在 Shot 1，而且感染之后仍然得是同一张脸。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/horror-suspense.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
