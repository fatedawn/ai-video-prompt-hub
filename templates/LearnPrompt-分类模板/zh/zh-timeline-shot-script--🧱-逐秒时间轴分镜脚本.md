---
id: "learnprompt-tpl-zh-timeline-shot-script"
title: "🧱 逐秒时间轴分镜脚本"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/timeline-shot-script.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🧱 逐秒时间轴分镜脚本

> 把片子切成首尾相接的时间段，每段带一个机位、一个主要动作和一行音效。整个案例库里承重最强的结构。

## 模板（中文）

```text
我要做一条按时间轴分镜的视频，【内容是：一位骑手在雨夜的霓虹街头送最后一单】，【总时长 15 秒，竖屏 9:16】。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### 逐秒时间轴分镜脚本

把片子切成首尾相接的时间段，每段带一个机位、一个主要动作和一行音效。整个案例库里承重最强的结构。

**适用场景:** 长度超过 8 秒，或者某件事必须发生在某个时刻。207 条里 63 条（30%）用了时间分段，在 Seedance 2.5 案例里这个比例升到 45%。

**要点:**

- 段长控制在 2 到 5 秒。纪实跟拍两秒一段，广告三秒一段，有音频驱动的 MV 可以细到亚秒级锚点。段越短，越要给可见的动作动词，别给情绪形容词。
- 时间写成闭区间并首尾相接（`0-4s` 接 `4-8s`），且总和等于声明的时长。写 30 秒却只列到 24 秒，模型会把最后一段拉长填满。
- 每段只给一个主要动作。两个动作挤在一段里，会被平均分配时间，结果两个都做一半。
- 段与段之间显式交接状态。执法记录仪那条案例每一阶段写三行——开始时、主要事件、结束时——并在下一段开头写承接上一阶段、同一批人、同一套装备、不切镜。
- 机位术语用英文原词写在段头括号里（Ground-level Low Angle、Dynamic Tracking、Handlebar POV），正文用工作语言。混写比全译更稳。

**示例:** [#1](https://goodcase.ai/cases/seedance-2-5-vlog-30-3b85f315bb08) [#2](https://goodcase.ai/cases/seedance-2-5-3f70c2f28d22) [#3](https://goodcase.ai/cases/seedance-2-5-f3651857750b) [#4](https://goodcase.ai/cases/boa-hancock-water-obstacle-race-prompt)

**结构:**

1. 全局块：时长、画幅、帧率、整体风格与画质词
2. 固定块：全片不变的人物、服装、道具和地点
3. 时间轴块：一段一拍，段头写 `[00:00-00:04] 镜头1：低角度起步（Ground-level Low Angle）`，段内写画面、动作、细节、音效
4. 全局约束块：负向清单与硬性限制，放在时间轴之后

**常见坑:**

- 只写总时长不写分段。50% 的案例写了时长，只有 30% 做了分段，没分段的那批普遍在六秒后开始漂。
- 在每段里重写服装发型。逐段重申身份反而诱发段间外观突变，应该在固定块里写一次，再加一句全程不变。
- 没有音频输入却把时间精确到 0.01 秒。纯文生视频的时间分辨率大约在 0.5 秒，更细的数字只是噪音。
- 把负向清单塞进某一段里。硬性限制应该单独成块放在末尾，才对全片生效。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/timeline-shot-script.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
