---
id: "learnprompt-tpl-en-music-beat-sync-mv"
title: "💥 Beat-synced music video"
model: ""
language: "en"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/music-beat-sync-mv.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 💥 Beat-synced music video

> Derive beat anchors from BPM, pin every cut, hair flip and formation change to a real downbeat, and constrain the backup dancers so they never steal the visual centre.

## 模板（English）

```text
I want a beat-synced music video. [Genre: K-pop dance track, around 120 BPM.] [The artist: a female soloist with short silver hair in a futuristic stage outfit.] I will send you the audio or lyrics as well. Using the prompt template below, rewrite it into one ready-to-use Seedance video prompt for me:

#### Beat-synced music video

Derive beat anchors from BPM, pin every cut, hair flip and formation change to a real downbeat, and constrain the backup dancers so they never steal the visual centre.

**Use when:** K-pop MVs, dance covers, beat-cut fitness edits and club performance clips. Use the audio-anchored variant only on Seedance 2.5, which accepts an audio track as an input modality.

**Guidance:**

- Compute the beat interval before writing shots. The Y2K MV states roughly 128 BPM with about 0.469s per beat, then lists nine named anchors — first downbeat at 2.78s, first scene change at 6.06s, energy drop at 14.02s, chorus at 21.07s, music cut-out at 24.82s — and pins every cut, hair flip, turn and formation change to them.
- Constrain backup dancers by count and by permission: two to six allowed, no facial close-ups, no lip sync, never occluding the lead, never becoming a second visual centre.
- Write formations as geometry: V-shape queue, horizontal line, diamond, symmetrical semicircle, and state where the lead stands inside each one.
- Give on-screen captions their own rule block — bold condensed display font, upper third or side margin, never over faces or hands, quick fade or slide-in on the beat, one line active at a time.
- End on a physical hard stop synced to the final note (a flip phone snapping shut, lights cutting out), and ban fade-outs, extended tails and extra end cards.

**Examples:** [#1](https://goodcase.ai/cases/seedance-25-kpop-mv-zero-to-pop) [#2](https://goodcase.ai/cases/seedance-25-kpop-mv-dual-idol) [#3](https://goodcase.ai/cases/seedance-2-5-k-pop-87e2d00e2fe8) [#4](https://goodcase.ai/cases/vibrant-k-pop-stage-performance)

**Structure:**

1. Audio source declaration: which track, and a ban on regenerating, retiming or fading it
2. BPM and a list of named beat anchors with their timestamps
3. Per-segment choreography and formation
4. Wardrobe and identity lock, plus dancer-count limits
5. Typography rules, if captions are on screen
6. A hard stop on a physical action

**Pitfalls:**

- Not declaring an audio source. The model invents background music and the lip sync drifts with it.
- Dressing backup dancers too close to the lead. Make the lead's colours the most saturated and keep her nearest the camera.
- Identity drift concentrating in the high-energy dance segments. Restate the same-face requirement inside those segments specifically.
- Asking for complex choreography and complex camera movement in the same beat. Give one of them the beat and let the other hold steady.
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/music-beat-sync-mv.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
