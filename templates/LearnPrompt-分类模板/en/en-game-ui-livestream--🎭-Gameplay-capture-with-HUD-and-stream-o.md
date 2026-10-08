---
id: "learnprompt-tpl-en-game-ui-livestream"
title: "🎭 Gameplay capture with HUD and stream overlay"
model: ""
language: "en"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/game-ui-livestream.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🎭 Gameplay capture with HUD and stream overlay

> The screen itself is the shot: a fake gameplay capture, livestream or desktop recording. It holds up when the overlay layer is pinned to fixed positions and its numbers and banners change in step with the action.

## 模板（English）

```text
I want a video that looks like real gameplay capture. [The hero is a short-haired girl in a school uniform; I am sending you her photo.] [The mission: steal the last rice ball from a convenience store late at night and escape into the street.] [A streamer facecam sits in the bottom-right corner, with scrolling live chat on the left.] Using the prompt template below, rewrite it into one ready-to-use Seedance video prompt for me:

#### Gameplay capture with HUD and stream overlay

The screen itself is the shot: a fake gameplay capture, livestream or desktop recording. It holds up when the overlay layer is pinned to fixed positions and its numbers and banners change in step with the action.

**Use when:** GTA-style mission clips, streamer facecam plus game footage, and interactive desktop or UI recordings where the HUD has to read as a real interface.

**Guidance:**

- Pin every overlay to a named screen position before the timeline starts. GTA 6 Simulation opens with `Fixed full-screen game HUD throughout` and puts the streamer in a `bottom-right square pink-blue neon facecam`; the snow-station trailer assigns one element to each corner, stamina bars top-left, objective banner top-center, date top-right, minimap bottom-left, button prompts bottom-right.
- Treat the HUD as a scoreboard that changes with each beat. GTA 6 Simulation tracks ammo `from 24/120 to 14/120` and wanted level from two stars to three; the diamond escape gives every segment its own HUD block, going from `MISSION: STEAL VIP NECKLACE` to `TARGET ACQUIRED` to `ESCAPE SUCCESSFUL`.
- Say outright that it is gameplay and write the camera like a game rig. The Rio chase asks for genuine gameplay, `not a cinematic film`; the diamond escape writes `Clearly a GAME, not anime or cartoon` and puts the camera `1.5m behind NAGI, slightly camera-right` with FOV breathing between 30 and 60 degrees.
- Count the cast and make each extra person look different. GTA 6 Simulation asks for `exactly two dark-red-jacket gang enemies` and no extra armed characters; the five o'clock office case gives four coworkers different ages, heights and hair, and states that the boss is the only bald character.
- Split languages by layer and spell out how on-screen text appears. The diamond escape keeps `All HUD text English`, dialogue in Japanese; the desktop wallpaper case puts subtitles at the left middle of the frame and types them in at about 0.08 to 0.12 seconds per character, with a waveform under them.

**Examples:** [#1](https://goodcase.ai/cases/seedance-gta-6-simulation-414a3b385a58) [#2](https://goodcase.ai/cases/seedance-mission-the-great-diamond-escape-39fea191a6da) [#3](https://goodcase.ai/cases/seedance-2-5-ai-cabf3749d5b6) [#4](https://goodcase.ai/cases/seedance-leaving-work-at-five-shouldn-t-require-stealth-mode-but-her-boss-made-it-a-mis-8495c8c9337e)

**Structure:**

1. Format header: duration, aspect ratio, how the take is cut, and a plain statement that this is game capture
2. Character lock: Image1 for face and identity only, outfit written out in text
3. Screen layer spec: where each HUD element, facecam, chat or subtitle sits, and what language it uses, fixed throughout
4. Camera rig: third-person follow distance and FOV, or one locked camera for desktop recordings
5. Timeline segments: each one carries the action, the HUD state change and any spoken line
6. Audio: engine, footsteps, keyboard and mouse, ambience, voice language
7. Strict rules tail: exact character counts, no extra cuts, HUD stays put, how the clip may and may not end

**Pitfalls:**

- The HUD slides around or changes layout between beats. Write `HUD fixed in the same screen positions` as a hard rule and only let the values change, never the layout.
- Long HUD sentences come out as garbled text. Keep banners to two to four capitalised words like the diamond escape does, and keep numbers in a simple pattern like 38/120.
- The streamer or hero shows up twice, once in the facecam and once in the game world, or in a reflection. GTA 6 Simulation states HANEUL appears only in the facecam; the office case removes any mirror that could create a second NAGI.
- The model edits it like a cinematic trailer, with cuts and a tidy ending. Write no cuts and no transitions; if you need a closing shot, declare one hard cut at an exact second, as in `Exactly one hard cut at 27s`, and rule out a black screen or end card.
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/game-ui-livestream.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
