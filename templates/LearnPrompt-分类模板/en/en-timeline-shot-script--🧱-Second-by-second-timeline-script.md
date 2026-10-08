---
id: "learnprompt-tpl-en-timeline-shot-script"
title: "🧱 Second-by-second timeline script"
model: ""
language: "en"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/timeline-shot-script.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🧱 Second-by-second timeline script

> Split the clip into contiguous timed segments, each carrying one shot type, one main action and its own sound line. The single most load-bearing structure in the corpus.

## 模板（English）

```text
I want to make a clip scripted second by second. [It shows: a courier delivering the last order of the night through neon-lit rain.] [Total length 15 seconds, vertical 9:16.] Using the prompt template below, rewrite it into one ready-to-use Seedance video prompt for me:

#### Second-by-second timeline script

Split the clip into contiguous timed segments, each carrying one shot type, one main action and its own sound line. The single most load-bearing structure in the corpus.

**Use when:** Any clip longer than about 8 seconds, or any clip where a specific thing must happen at a specific moment. 63 of 207 cases (30%) use timed segments, and the share rises to 45% among Seedance 2.5 cases.

**Guidance:**

- Keep segments 2-5 seconds. Documentary tracking runs 2s per beat, ads run 3s, and an audio-locked MV can go down to sub-second anchors. The shorter the segment, the more it needs a visible action verb rather than a mood adjective.
- Write closed intervals that touch end to end (`0-4s` then `4-8s`) and make them sum to the stated duration. Declaring 30 seconds but listing only 24 makes the model stretch the last beat to fill the gap.
- Give each segment exactly one main action. Two actions in one segment get half-finished at both ends because the model splits the time evenly.
- Hand state over between segments explicitly. The bodycam raid case writes three lines per stage — opening state, main event, ending state — and starts each new stage with a carry-over line naming the same team, same gear, no cut.
- Put camera terminology in English inside the segment header parentheses (Ground-level Low Angle, Dynamic Tracking, Handlebar POV) and keep the prose in your working language. Mixed headers hold better than fully translated ones.

**Examples:** [#1](https://goodcase.ai/cases/seedance-2-5-vlog-30-3b85f315bb08) [#2](https://goodcase.ai/cases/seedance-2-5-3f70c2f28d22) [#3](https://goodcase.ai/cases/seedance-2-5-f3651857750b) [#4](https://goodcase.ai/cases/boa-hancock-water-obstacle-race-prompt)

**Structure:**

1. Global block: duration, aspect ratio, frame rate, overall style and image-quality vocabulary
2. Fixed block: characters, wardrobe, props and location that stay unchanged for the whole clip
3. Timeline block: one segment per beat, headed `[00:00-00:04] Shot 1: Ground-level Low Angle`, then frame content, action, detail, sound
4. Global constraint block: negative list and hard limits, placed after the timeline

**Pitfalls:**

- Writing a total duration without segments. Half the corpus states a duration but only 30% segments it, and the un-segmented half visibly drifts after roughly six seconds.
- Repeating wardrobe and hairstyle inside every segment. Restating identity per beat triggers appearance mutation between beats; state it once in the fixed block and add a whole-clip lock line.
- Timing to 0.01s precision without an audio input. Text-only generation resolves to about 0.5s, so finer numbers only add noise.
- Burying the negative list inside a segment. Hard limits belong in one block at the end so they apply to the whole clip.
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/timeline-shot-script.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
