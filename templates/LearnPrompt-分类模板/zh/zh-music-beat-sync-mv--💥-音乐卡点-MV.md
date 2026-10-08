---
id: "learnprompt-tpl-zh-music-beat-sync-mv"
title: "💥 音乐卡点 MV"
model: ""
language: "zh"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/music-beat-sync-mv.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 💥 音乐卡点 MV

> 从 BPM 推出节拍锚点，把每一次剪辑、甩发和队形变化钉在真实重拍上，再把伴舞约束住，别让他们抢走视觉中心。

## 模板（中文）

```text
我要做一条卡点音乐 MV，【曲风是：K-pop 舞曲，节奏大约每分钟 120 拍】，【艺人形象是：银色短发的女 solo 歌手，未来感舞台服】，音频或歌词我会一起发给你。请根据下面这个提示语模板，帮我改写成一条可以直接用的 Seedance 视频提示语：

#### 音乐卡点 MV

从 BPM 推出节拍锚点，把每一次剪辑、甩发和队形变化钉在真实重拍上，再把伴舞约束住，别让他们抢走视觉中心。

**适用场景:** K-pop MV、翻跳、卡点健身剪辑、俱乐部演出片段。带音频锚点的写法只在 Seedance 2.5 上用，它接受音轨作为输入模态。

**要点:**

- 先算节拍间隔再写镜头。Y2K 那条写约 128 BPM、每拍约 0.469 秒，然后列了九个命名锚点——2.78 秒第一个强重拍、6.06 秒第一次换景、14.02 秒能量下降、21.07 秒高潮副歌、24.82 秒音乐抽空——并把每次剪辑、甩发、转身和队形变化都钉上去。
- 伴舞按人数和权限双重约束：允许二到六名，不给面部特写、不对口型、不遮挡主角、不成为第二视觉中心。
- 队形写成几何：V 字行进、横排、菱形、对称半圆，并写清主角在每种队形里站哪。
- 字幕单独一块规则——粗体窄体展示字、位置在上三分之一或侧边、不压脸和手、随拍快速淡入或滑入、同一时间只有一行。
- 结尾用一个跟末音同步的物理硬停（翻盖手机啪地合上、灯瞬间灭），并禁止淡出、延长尾音和多余的结束镜头。

**示例:** [#1](https://goodcase.ai/cases/seedance-25-kpop-mv-zero-to-pop) [#2](https://goodcase.ai/cases/seedance-25-kpop-mv-dual-idol) [#3](https://goodcase.ai/cases/seedance-2-5-k-pop-87e2d00e2fe8) [#4](https://goodcase.ai/cases/vibrant-k-pop-stage-performance)

**结构:**

1. 音源声明：用哪条音轨，以及禁止重新生成、变速和自动淡出
2. BPM 与一份带时间戳的命名节拍锚点清单
3. 逐段编舞与队形
4. 服装与身份锁，外加伴舞人数上限
5. 字幕排版规则，如果有字上屏
6. 用一个物理动作硬收

**常见坑:**

- 不声明音源。模型会自己编一段背景音乐，口型也跟着乱。
- 伴舞穿得跟主角太像。主角的颜色要最饱和，位置离镜头最近。
- 身份漂移集中在高能量舞蹈段。要专门在那些段里重申同一张脸。
- 同一拍里既要复杂编舞又要复杂运镜。一拍给一样，另一样保持稳定。
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/zh/music-beat-sync-mv.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
