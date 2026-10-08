---
id: "youmind-1144"
title: "Seedance 2.0 场景连续视频提示词"
title_en: "Seedance 2.0 Scene Continuation Video Prompt"
model: "Seedance 2.0"
language: "zh"
medium: "真人"
direction: "现实向"
genre: "剧情短片"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/ef2bb42e8896464dd4b31fa04a80c391d0579dc8/README_zh.md#L3109"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "探路AI"
original_author_url: "https://x.com/TanLuAI"
original_post_url: "https://x.com/TanLuAI/status/2032376164967465471"
published: "Mar 13, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=1144"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# Seedance 2.0 场景连续视频提示词

*Seedance 2.0 Scene Continuation Video Prompt*

> 这是一个为 Seedance 2.0 设计的两段式提示，用于根据一张参考图像（图像 1）生成连续的视频序列。第一部分生成图像 1 之前的 10 秒动作，内容是一名身穿黑衣的女刺客，模仿一个著名场景（艾莉亚·史塔克 对战 夜王）。第二部分生成图像 1 之后的 10 秒内容，展示刺客击败将军并摆出姿势。两部分都要求有特定的镜头运用、节奏、电影般的画质、武术编排和音效，同时严格避免血腥暴力和危险动作。刺客的面部和姿势必须参考第二张图像（图像 2）。

## 提示词（中文）

```text
生成 @Image 1 之前的 10 秒剧情。黑衣女刺客的面部完全参考 @Image 2 的第一个场景：特写跟拍，女刺客的黑色布靴，脚尖点地；第二个场景：低角度全景，月光穿透森林中的薄雾，女刺客从屏幕左侧如离弦之箭般跃起，短刃直指将军咽喉；将军单手扼住其颈部；第三个场景：特写镜头，刺客面部特写，双眼凶狠但因窒息而泛红，牙关紧咬。要求运用分镜和不同视角切换，使整个画面更具节奏感和电影感。

生成 @Image 1 之后的 10 秒剧情。黑衣女刺客掷出飞刀，飞刀划过将军咽喉，将军倒地，女子轻盈落地。随后，飞刀旋转着飞回黑衣女子手中，她以 @Image 2 相同的姿势握住飞刀。整个影片需运用分镜和不同视角切换，使整个画面更具节奏感和电影感。只生成打斗音效和环境音效，不包含背景音乐。动作设计必须符合武侠片标准，动作干净利落。禁止出现血腥画面，无血腥暴力；无负面引导，无危险动作。（注意短刀的长度在整个过程中必须与参考图片保持一致）
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的English版本（README.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/ef2bb42e8896464dd4b31fa04a80c391d0579dc8/README.md#L2989)

```text
Generate the 10 seconds of plot before @Image 1. The face of the female assassin in black completely references the first scene of @Image 2: Close-up follow shot, the female assassin's black cloth boots, toes touching the ground; Second scene: Low-angle full shot, moonlight penetrates the thin mist in the forest, the female assassin leaps up from the left side of the screen like an arrow released from a bow, her short blade pointing directly at the general's throat; the general grips her neck with one hand; Third scene: Close-up shot, assassin's face close-up, eyes fierce but flushed due to suffocation, teeth clenched. Requires the use of storyboarding and different perspective switching to make the whole picture more rhythmic and cinematic.

Generate the 10 seconds of plot after @Image 1. The female assassin in black throws a flying knife, the knife slices across the general's throat, the general falls to the ground, and the woman lands gracefully. Subsequently, the flying knife spins back into the black-clad woman's hand, and she holds the flying knife in the same pose as @Image 2. The entire film needs to use storyboarding and different perspective switching to make the whole picture more rhythmic and cinematic. Only generate fighting sound effects and environmental sound effects, do not include background music. Action design must conform to Wuxia film standards, with clean and sharp movements. Prohibit the appearance of bloody scenes, no gore or violence; no negative guidance, no dangerous actions. (Note that the length of the short knife must remain consistent with the reference image throughout)
```

## 出处与许可

- 原作者：[探路AI](https://x.com/TanLuAI) · 原帖：<https://x.com/TanLuAI/status/2032376164967465471>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/ef2bb42e8896464dd4b31fa04a80c391d0579dc8/README_zh.md#L3109)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `ef2bb42e8896`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=1144>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
