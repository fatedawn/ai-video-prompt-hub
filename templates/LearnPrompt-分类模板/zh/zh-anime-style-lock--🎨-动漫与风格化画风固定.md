---
id: "learnprompt-tpl-zh-anime-style-lock"
title: "🎨 动漫与风格化画风固定"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/anime-style-lock.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🎨 动漫与风格化画风固定

> 把画风写成可测量参数，再附一份相邻画风的排除清单。没有排除清单，动漫会塌成通用 3D 脸。

## 模板（中文）

```text
我要做一条画风固定的动画短片，【画风是：九十年代赛璐璐日式动画，我会发给你风格参考图】，【内容是：少女骑着扫帚掠过黄昏的海边小镇】。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### 动漫与风格化画风固定

把画风写成可测量参数，再附一份相邻画风的排除清单。没有排除清单，动漫会塌成通用 3D 脸。

**适用场景:** 赛璐珞动作戏、吉卜力味日常、3D 卡通 RPG 战斗、2D 手绘烹饪。案例库里大约四分之一是各类风格化动画。

**要点:**

- 画风写成参数：细而有色的轮廓线、二到三段赛璐珞阴影加透明感中间影、瞳孔与头发的多层高光、布革金属宝石湿地面玻璃各自不同的反射与粗糙度。
- 一定要附排除清单。动漫剑戟那条排除了粗黑轮廓、单层平涂阴影、低成本 TV 动画感、通用 3D 美少女脸、塑料 CG 感、半写实、写实、低密度背景和浑浊色彩。
- 从参考图给每个角色抽一组固有色——主色、辅助色、点缀色、材质母题——命名之后禁止在角色之间交换。
- 背景压得比角色暗一档，并用各角色的固有色当主光和影色。这是读成 2D 而不是渲染 3D 的关键。
- 治愈系吉卜力要做减法。森林烹饪那条全片只拍一双手，一张脸都不出，四个镜头做完取材、切配、炖煮、成菜。

**示例:** [#1](https://goodcase.ai/cases/case-a9ab0266f96a) [#2](https://goodcase.ai/cases/case-a45446378e2a) [#3](https://goodcase.ai/cases/case-c32e6c3bb2c5) [#4](https://goodcase.ai/cases/case-ce63bf146d4e)

**结构:**

1. 画风固定块：线条粗细、赛璐珞阴影段数、高光层次、逐材质反射差异
2. 排除清单：不许出现的相邻画风
3. 角色与配色锁：从参考图抽出的固有色，禁止在角色之间交换
4. 舞台与氛围：环境如何向角色配色靠拢
5. 摄影机顺序与动作

**常见坑:**

- 只写 anime style 不指名流派。模型会在它知道的一切之间取平均，还你一张通用脸。
- 把 2D 手绘词表和 3D 卡通渲染词表混着写。这是两套词，混出来是半写实。
- 快动作会让赛璐珞阴影退化成写实光影。要在高速段里重申一次上色规格。
- 让文字、logo、UI 出现在画面里。动漫背景特别容易长出乱码招牌，除非明确禁掉。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/anime-style-lock.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
