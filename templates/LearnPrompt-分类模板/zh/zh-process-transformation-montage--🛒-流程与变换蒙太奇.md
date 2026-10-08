---
id: "learnprompt-tpl-zh-process-transformation-montage"
title: "🛒 流程与变换蒙太奇"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/process-transformation-montage.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🛒 流程与变换蒙太奇

> 烹饪步骤、改造延时、蓝图变房子、微缩城市组装。这类的手艺在于先声明什么不许变，再把变化按空间顺序排开。

## 模板（中文）

```text
我要做一条过程与变换的蒙太奇，【要展示的过程是：一块面团从揉面到出炉变成牛角包】，【机位固定俯拍，时长 12 秒】。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### 流程与变换蒙太奇

烹饪步骤、改造延时、蓝图变房子、微缩城市组装。这类的手艺在于先声明什么不许变，再把变化按空间顺序排开。

**适用场景:** 主角是过程而不是人的片子：菜谱、建造、组装、前后对比。案例库里 35 条。

**要点:**

- 拿一整段写不变量。改造那条锁了机位、角度、焦段、透视、构图，再单独锁了房间尺寸、墙、窗、门、层高和结构布局。
- 变化按空间顺序排，不要含糊。地面从左到右铺开，然后墙和天花板同时变，然后家具落位——这比 gradually transforms 强得多。
- 两张参考图各定义不同东西时要说清谁定义什么。蓝图那条声明平面图是布局和尺寸的来源、外立面照片是建筑风格的来源，再禁止任何房间移位。
- 烹饪类只拍手不拍脸。身份预算直接归零，细节全给食材。
- 收尾给生命感而不是定格：水面反光、旗子飘、灯塔光束转、窗户亮灯。微缩港口那条明确排除了完成后完全静止的结尾。

**示例:** [#1](https://goodcase.ai/cases/case-429309e40d97) [#2](https://goodcase.ai/cases/case-778d0c927488) [#3](https://goodcase.ai/cases/case-8bdac964f9d4) [#4](https://goodcase.ai/cases/case-179a06586ce5)

**结构:**

1. 不变量块：什么固定不动——机位、几何、布局、尺度
2. 起始状态，写具体
3. 有序变换段，每段带一个空间方向
4. 终态，外加一小段生命感
5. 音效：组装声、环境音，以及到底有没有对白

**常见坑:**

- 变换过程中还运镜。任何机位运动都在跟变化本身抢注意力，观众也丢了前后对比的锚点。
- 组装蒙太奇越拍越小变成玩具感。微缩那条专门用一个 NEGATIVE 块排除了岛太小、港口局促、廉价塑料感和只有几栋房子的小镇。
- 一段里同时用延时和慢动作。每一拍只用一种时间处理。
- 一条 prompt 里排超过六个步骤。超了就拆成两次生成再拼。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/process-transformation-montage.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
