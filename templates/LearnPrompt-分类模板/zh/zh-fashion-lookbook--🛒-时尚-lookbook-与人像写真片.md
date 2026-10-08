---
id: "learnprompt-tpl-zh-fashion-lookbook"
title: "🛒 时尚 lookbook 与人像写真片"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/fashion-lookbook.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🛒 时尚 lookbook 与人像写真片

> 一个人、一身造型、几个地点。一段从头写到脚的外观锁撑起整条片子，每个场景只给一个地点、一个动作、一种光。

## 模板（中文）

```text
我要做一条时尚 lookbook 短片，【模特是一个短发的亚洲女生，走在秋天的上海梧桐街区】，【主推单品是一件燕麦色长风衣配棕色皮质托特包】。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### 时尚 lookbook 与人像写真片

一个人、一身造型、几个地点。一段从头写到脚的外观锁撑起整条片子，每个场景只给一个地点、一个动作、一种光。

**适用场景:** 时尚广告大片、街拍 lookbook、换装短片，以及人像和美妆类写真片，有效载荷就是一个人在几个场景里的样子。

**要点:**

- 开头一段把造型从头写到脚，再写明它全程跟着走。巴黎街拍那条一路列到 `black pointed-toe heels, babypink smooth leather hobo shoulder bag`，末尾补一句 `hanging naturally on arm throughout all scenes`。
- 每个场景只给一个景别、一个地点、一个动作。巴黎那条的小标题是 `Scene 5 · 3 sec Medium close-up`，这一段里唯一的动作是 `slowly pushes sunglasses up with one finger`。
- 主推单品和人分开锁。东京手袋那条先写 `One consistent young female fashion model throughout`，再单独一行锁住 `one identical glossy pastel-pink Prada handbag`。
- 人像写真式的就用一个长句把动作串起来，不标镜号。溪畔那条从 `holding a juicy red watermelon slice near her face` 一路接到她在木门廊上回头对镜头笑。
- 照片质感靠器材加排除清单换。巴黎那条点名 `shot on Canon EOS R5 35mm f/1.4, Kodak Portra 400 film tone`，再排掉 `plastic skin, robotic movement, stiff poses`。

**示例:** [#1](https://goodcase.ai/cases/youmind-paris-fashion-campaign-streetwear) [#2](https://goodcase.ai/cases/aiwithnatalia-seedance-ai-12c56e79550f) [#3](https://goodcase.ai/cases/noorlewisx-seedance-ai-4b6f8c8c977a) [#4](https://goodcase.ai/cases/seedance-a-graceful-young-korean-woman-with-soft-short-wavy-brown-hair-delicate-feature-11d70672ecb9)

**结构:**

1. 开头参数：画幅、准确时长、片种写成时尚广告大片、Vogue editorial 或电影感写真，再交代剪辑节奏
2. 人物与造型锁：脸、发型、妆、首饰，然后每一件衣服鞋包点名，补一句每个场景都一样
3. 主推单品锁：材质、颜色、五金、怎么拿在身上
4. 场景链：每段标出秒数或场景号，写景别、地点、一个动作和光线
5. 要上屏文字的，就在对应场景下面单起一行短句
6. 收尾英雄镜头：整体慢下来，镜头绕一圈或推到单品上，最后上摇到脸
7. 视觉方向与排除清单：镜头、胶片色调、颗粒，排掉塑料皮肤、僵硬姿势和水印

**常见坑:**

- 造型只用一句好看的衣服带过。场景一换衣服就变，每件单品都点名，并补一句每个场景都一样。
- 三秒的一段里塞三个动作。一个场景一个动作，巴黎那条每格三秒只做一件事。
- 把整段文案交给模型上屏。东京那条上屏的只有 `TOKYO`、`MADE TO BE SEEN` 这种一两行短句，长段文字排出来会糊，留到后期加。
- 全程慢动作加转场特效。东京那条的快剪段写死 `hard cuts synchronized to the beat`，慢只留给最后的英雄镜头。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/fashion-lookbook.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
