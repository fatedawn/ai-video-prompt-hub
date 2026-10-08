---
id: "learnprompt-tpl-en-cinematic-narrative-short"
title: "🎭 Cinematic narrative short"
model: ""
language: "en"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/cinematic-narrative-short.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🎭 Cinematic narrative short

> Multi-act storytelling in 15 to 60 seconds. Titled acts, a character card ahead of the acts, and a reveal written as a concrete image rather than as a promise of surprise.

## 模板（English）

```text
I want a cinematic narrative short. [The story: an astronaut in an abandoned space station receives a message from the year 2100.] [Genre and mood: sci-fi mystery, cold palette.] [15 seconds.] Using the prompt template below, rewrite it into one ready-to-use Seedance video prompt for me:

#### Cinematic narrative short

Multi-act storytelling in 15 to 60 seconds. Titled acts, a character card ahead of the acts, and a reveal written as a concrete image rather than as a promise of surprise.

**Use when:** Trailers, mini-dramas, disaster set pieces, sci-fi mysteries and romance shorts — anything where the viewer should follow a plot rather than admire a look.

**Guidance:**

- Title each act. The romance trailer labels its acts The Message and Running Through the City, and the title itself constrains how much information that act carries.
- Keep the character card to five slots — hair, top, bottom, shoes, carried object. That is enough for the model to recognise the person without overloading the identity budget.
- Past about 30 seconds, split into two prompts and stitch. The high-school romance case declares SHOT 1 = 0-30 seconds and SHOT 2 = 30-60 seconds and requires the two to connect seamlessly as one film; another case in the corpus generates two 15-second halves and stitches manually.
- Write the reveal as a picture. The 2100 mystery resolves on clouds separating to expose an enormous object over an empty Dubai, not on the phrase shocking reveal.
- Bind emotional turns to light changes: golden hour into blue hour, cold blue exterior into warm interior. The disaster case switches grading at the moment the protagonist reaches shelter.

**Examples:** [#1](https://goodcase.ai/cases/caden-flux-seedance-ai-8ffb5f062951) [#2](https://goodcase.ai/cases/sci-fi-mystery-message-from-2100) [#3](https://goodcase.ai/cases/mermaid-rescue-cinematic-story) [#4](https://goodcase.ai/cases/youmind-1980s-slasher-yacht-octopus)

**Structure:**

1. Genre and visual key: reference aesthetic, grading, lens behaviour, editing tempo
2. Character cards ahead of the acts, one short block per person
3. Acts, each with a title and a time window
4. Shots inside each act, varying in count between acts
5. Music and sound trajectory
6. Ending instruction, stated as a cut rather than as a feeling

**Pitfalls:**

- Even pacing. If every act gets the same number of shots, the story reads as a montage; vary shot counts deliberately.
- Leaving the dialogue to the model. Generated lines drift off-genre; write them, even if only one per act.
- Single-generation clips over 30 seconds show a marked rise in identity drift. Restate the identity lock at the start of the second half or split the generation.
- Writing fade out at the end. The model really fades and burns the last two seconds; write a hard cut to black, no fade, no extended tail.
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/cinematic-narrative-short.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
