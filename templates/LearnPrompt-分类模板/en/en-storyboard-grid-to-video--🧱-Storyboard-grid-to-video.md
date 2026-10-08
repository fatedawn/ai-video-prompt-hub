---
id: "learnprompt-tpl-en-storyboard-grid-to-video"
title: "🧱 Storyboard grid to video"
model: ""
language: "en"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/storyboard-grid-to-video.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🧱 Storyboard grid to video

> Two stages: first a single-page sheet of numbered panels from an image model, then that sheet fed to Seedance as the reference. The sheet owns order, framing and timing, and the video prompt only has to connect the panels.

## 模板（English）

```text
I want to make the storyboard sheet first and then turn it into video. [The story: a stray cat finding its way home through a rainy night, in 9 panels.] [Pixar-style 3D look, 15 seconds total.] Using the prompt template below, write both prompts for me: first the one that generates the storyboard sheet, then the Seedance prompt that turns that sheet into video:

#### Storyboard grid to video

Two stages: first a single-page sheet of numbered panels from an image model, then that sheet fed to Seedance as the reference. The sheet owns order, framing and timing, and the video prompt only has to connect the panels.

**Use when:** Multi-shot pieces where you want to see and fix the shot order before spending a generation: recipe sequences, action previs, product commercials, day-in-the-life montages.

**Guidance:**

- Tie panel count to runtime already in the image prompt. The croissant sheet puts `TOTAL VIDEO TIME: 12 SECONDS` and `8 SHOTS` in the header and recounts it in the footer as `8 shots × 1.5s = 12 seconds`.
- Give the two reference images separate jobs. The disaster-run case defines Image1 as `the EXACT main character reference` and Image2 as `the EXACT storyboard design and layout reference`.
- Say plainly which reference wins. The European summer walk writes `Do not copy any pose or layout from the Master Character Set` and hands locations, actions, compositions and sequence to the storyboard.
- Make step two a short list of hard rules. The croissant video prompt lists `Follow the sequence exactly from 1 to 8`, `One shot per panel, approximately 1.5 seconds each` and `No skipped steps`.
- Write each panel as an action plus a shot size, never as a picture. The kung-fu sheet numbers twelve lines like `begin mid-air with a flying diagonal kick already in motion` and requires `Every panel must contain visible motion`.

**Examples:** [#1](https://goodcase.ai/cases/real-case-06-aimikoda) [#2](https://goodcase.ai/cases/real-case-07-techiebysa) [#3](https://goodcase.ai/cases/seedance-create-a-single-page-premium-hollywood-disaster-action-storyboard-in-16-9-wide-7cc2f22eaa0c) [#4](https://goodcase.ai/cases/apartment-arrival-storyboard-animation)

**Structure:**

1. Image prompt header: single-page sheet, aspect ratio, panel count, and the drawing style stated as premium storyboard, infographic poster or rough pencil previs
2. Information cards: title, total runtime, number of shots, audio direction, so timing and panel count agree
3. Panel list, one line each: shot size, the action happening in it, and what that panel is for
4. Image prompt tail: the annotation system, and the exclusions such as no timestamps, no extra characters, no watermark
5. Video prompt opening: name which image is the character reference and which is the storyboard, and what each one controls
6. Rule list: follow 1 to N in order, one shot per panel, seconds per shot, no skipped or added steps, character and set stay identical
7. Overall look and close: lighting, camera movement, audio, and the no-subtitle no-watermark tail

**Pitfalls:**

- Baking timecodes into the sheet. Panel timestamps get drawn as artwork and carried into the video; the kung-fu sheet writes `No timestamps` and leaves timing to the rules in step two.
- More panels than the runtime can hold. Work backwards at 1.5 to 3 seconds per panel — the croissant sheet pairs 8 panels with a 12-second video.
- Letting the character sheet and the storyboard fight. The model copies poses off the character sheet; state that the storyboard controls locations, actions, compositions and sequence, and the character sheet only controls the face.
- Panels that describe a picture and no movement. The video comes out as a slideshow; give every panel something already in motion.
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/storyboard-grid-to-video.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
