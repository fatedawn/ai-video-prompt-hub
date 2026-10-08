---
id: "learnprompt-tpl-en-pov-continuous-take"
title: "📱 First-person continuous take"
model: ""
language: "en"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/pov-continuous-take.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 📱 First-person continuous take

> Bodycam, GoPro, FPV and handlebar POV. The camera is mounted on a body, so its motion has to be derived from that body, and every cut has to be declared by hand.

## 模板（English）

```text
I want a first-person clip in one continuous take. [My point of view: riding a mountain bike down a forest trail.] [My hands and the handlebars should stay in frame.] Using the prompt template below, rewrite it into one ready-to-use Seedance video prompt for me:

#### First-person continuous take

Bodycam, GoPro, FPV and handlebar POV. The camera is mounted on a body, so its motion has to be derived from that body, and every cut has to be declared by hand.

**Use when:** Immersive footage where the viewer is the operator: tactical entry, action sports, cooking from the cook's eyes, drone flight. 32 of 207 cases sit here.

**Guidance:**

- Declare the physical mount and its height so the model can derive the shake: chest-mounted on the point agent, POV chest-to-eye height, moving only with the body.
- Refuse an empty first frame. The GoPro fishing case writes `Non-empty opening frame: already mid-cast, rod raised, line already peeling off the reel`, which removes the dead first second.
- Separate one-take from cutting. Write the cut plan as an explicit list — A 0-9s river, one continuous take, HARD CUT, B 9-21s board, one continuous take — and add that the camera does not cut anywhere else.
- Pin the field of view per segment in degrees (84° easing to 63° through the fight, 63° easing to 18° across the next block) and follow it with `No drift within any segment`.
- Spell out the optical consequences of a body mount: wide-angle distortion at the edges, vertical bob from walking, motion blur on fast head turns, and a flashlight beam that only lights what the operator faces.

**Examples:** [#1](https://goodcase.ai/cases/seedance-2-5-d68024212dfc) [#2](https://goodcase.ai/cases/seedance-2-5-gopro-94a73eef1dbf) [#3](https://goodcase.ai/cases/seedance-2-5-f1696dad13bc) [#4](https://goodcase.ai/cases/fpv-cd4a852a53ba)

**Structure:**

1. SCENE CONTEXT: one paragraph naming the subject, the mount and the total duration
2. ACTIVE REFERENCES: named tokens for location, hands and props
3. LOCATION MAP: what sits in foreground, midground and background per segment, plus camera height
4. FIRST FRAME / BLOCKING: a non-empty opening frame, already mid-action
5. FORMAT MODE: where the hard cuts fall and which stretches are one continuous take
6. OPTICS: field of view per segment, with a no-drift clause
7. Timeline and audio

**Pitfalls:**

- The operator's own face appearing in frame. Add `the camera itself is never visible` and describe only what the hands do.
- Hands entering frame without a left or right assignment. Say which hand holds what, or a third hand grows in.
- Scheduling a large scene jump inside a stretch labelled one continuous take. Either walk there in real time or put a declared hard cut at the boundary.
- Forgetting to ban cinematic treatment. Bodycam and action-cam material needs an explicit `no slow-motion, no cinematic grading` or it turns into a movie trailer.
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/pov-continuous-take.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
