---
id: "learnprompt-tpl-en-dialogue-performance-beats"
title: "🎭 Dialogue and performance beats"
model: ""
language: "en"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/dialogue-performance-beats.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🎭 Dialogue and performance beats

> Declare the spoken language, tag the speaker, write the reaction as a causal chain rather than a list of expressions, and close each beat with an explicit end state.

## 模板（English）

```text
I want an acted scene with dialogue. [Characters: two former lovers meeting again in a cafe on a rainy night.] [Lines: He says, you have not changed. She says, neither have you.] [The mood moves from guarded to softening.] Using the prompt template below, rewrite it into one ready-to-use Seedance video prompt for me:

#### Dialogue and performance beats

Declare the spoken language, tag the speaker, write the reaction as a causal chain rather than a list of expressions, and close each beat with an explicit end state.

**Use when:** Whenever a line has to be heard rather than implied. 78 of 207 cases carry quoted dialogue inline (38%), and 16 explicitly manage lip sync. Seedance 2.5 additionally supports driving lip sync from an uploaded audio track.

**Guidance:**

- Declare the language on its own line before the line itself, in the form `セリフ言語: 日本語` or `Natural English dialogue only`, and wrap the line in braces or quotes so it is not read as scene description.
- With an uploaded audio track, state that lip sync follows the actual vocal in the audio rather than the written text, and require closed lips during instrumental passages. Also restrict lip sync to one performer so background characters do not start mouthing.
- Write the reaction as a chain, not a checklist: hears it, brief pause to understand, expression starts to shift, body follows, residue of the previous expression lingers, then the next state. Listing eyebrows, eyes, nose and mouth separately produces sticker-style switching.
- Close every beat with an end state line so the next beat has a defined starting point — the raid case uses `ending state` per stage, the Japanese dialogue case uses `終了状態`.
- For emotional states with a physical tell, specify the behaviour rather than the symptom. Asking for a blush yields a uniform pink filter; asking for the eyes to look away, the mouth corner to slip, the speech to slow and the hand to pause yields shyness.

**Examples:** [#1](https://goodcase.ai/cases/youmind-surprise-visit-romance-trailer) [#2](https://goodcase.ai/cases/noorlewisx-seedance-ai-b2d98861daf9) [#3](https://goodcase.ai/cases/case-1f8136a9893a) [#4](https://goodcase.ai/cases/case-a845e1418b39)

**Structure:**

1. Language and audio-source declaration, before any line
2. Speaker tags, one per character
3. Per beat: the causal reaction chain, then the line, then the end state
4. Global performance principles: what the character does and does not know
5. Negative: no voice-over, no silent gaps, no expression-sticker switching

**Pitfalls:**

- Continuous dialogue clips need an explicit `no silent moments and no voice-over`, otherwise the model delivers music plus a mouth moving.
- Proper nouns and digits are the least reliable part of any generated line. Move brand names and numbers out of the dialogue and into on-screen text added in post.
- Two characters speaking in the same beat splits the lip-sync budget. Give one the line and the other a physical reaction.
- A line longer than roughly eight words in a three-second beat will desync. Shorten the line before touching anything else.
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/dialogue-performance-beats.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
