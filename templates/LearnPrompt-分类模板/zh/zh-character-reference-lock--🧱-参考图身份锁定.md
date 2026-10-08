---
id: "learnprompt-tpl-zh-character-reference-lock"
title: "🧱 参考图身份锁定"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/character-reference-lock.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🧱 参考图身份锁定

> 给每张参考图一个稳定 token，逐条列出要继承什么，再单独列出不许继承什么。能不能生效，差别就在后面那条不继承声明。

## 模板（中文）

```text
我要做一条需要人物前后长得一样的视频，【我会发给你 2 张人物参考图，她是一位短发、戴细框眼镜的年轻女性】，【她要做的事：在书店里找书、抬头对镜头笑】。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### 参考图身份锁定

给每张参考图一个稳定 token，逐条列出要继承什么，再单独列出不许继承什么。能不能生效，差别就在后面那条不继承声明。

**适用场景:** 任何需要一张脸、一套衣服、一个产品或一套 UI 布局跨镜头存活的片子。2.0 和 2.5 都适用，2.5 还能用同一套 token 语法引用音频和视频。

**要点:**

- 按角色拆参考图，分别锁定。GoPro 钓鱼那条把 `@location1` 用于河流场景、`@hands1` 用于前臂和工具器物，每个后面各跟一句 100% matches reference。
- 继承清单要逐条枚举，别写保持一致。男友视角那条列了十三项：身份、五官、脸型、肤色、年龄感、发型、发色、身高、体型、身体比例、服装、鞋履、整体气质。
- 一定要补不继承声明。少了这条，参考图的背景、姿势和原始光线会一起被搬进视频；动漫剑戟那条明写参考图的背景、房间、家具、文字、分割布局、姿势、画角、构图都不再现。
- UI 或场景参考要把构图锁和设计锁分开。角色选择界面那条把 `@image1` 标为 LOCKED SCENE COMPOSITION，`@image2` 到 `@image6` 只当设计参考，并补一句不许复制参考图里的站姿。
- 身份最容易在转头、遮挡和快速运动时漂。把这些姿态单独列出来，并在高能量段重申同一张脸。

**示例:** [#1](https://goodcase.ai/cases/elsasofia-ai-seedance-ai-e087ab2aed4b) [#2](https://goodcase.ai/cases/liyue-ai-seedance-ai-dd263958ed42) [#3](https://goodcase.ai/cases/case-79acf1a3e8a6) [#4](https://goodcase.ai/cases/seedance-2-5-ui-228cf63ce8ff)

**结构:**

1. Token 声明：给每张参考图起名——`@图1`、`@Image2`、`<<<image_1>>>`、`@location1`、`@hands1`——并全程原样复用
2. 继承清单：从参考图取哪些属性（脸型、五官、发色、身材比例、服装单品、饰品）
3. 不继承清单：背景、房间、家具、姿势、构图、画角、原始光线、任何文字
4. 跨镜头声明：转头、低头、说话、手靠近脸时保持同一张脸
5. 负向：禁止克隆、分身、五官平均化、角色之间属性互换

**常见坑:**

- 只上传参考图不写文字锁定。模型会把它当风格图，不当身份图。
- 把服装压缩成同一套衣服。案例库里生效的写法都把服装拆成逐件命名的单品和饰品。
- 用草图或插画当参考却不写渲染指令。要补 use only as design blueprints, render as fully realistic live-action humans，否则线稿感会留在成片里。
- 塞进没有 token 指名的参考图。每多一张，属性串味的机会就多一次。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/character-reference-lock.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
