---
id: "learnprompt-tpl-en-horror-suspense"
title: "🎭 Horror and suspense"
model: ""
language: "en"
source_repo: "LearnPrompt/awesome-seedance"
source_url: "https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/horror-suspense.md#L25"
license: "CC-BY-4.0 (curation)"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "LearnPrompt / goodcase.ai (curation)"
original_author_url: "https://github.com/LearnPrompt"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# 🎭 Horror and suspense

> Every shot carries its own timecode and shows one visible change on a body. The dread comes from the chain — a look, veins, a bite, the next person — and the ending seals a door without settling anything.

## 模板（English）

```text
I want a horror-suspense clip. [The setting is an underground car park late at night, a young woman looking for her car.] [The first to turn is the security guard; I am sending you his reference photo.] Using the prompt template below, rewrite it into one ready-to-use Seedance video prompt for me:

#### Horror and suspense

Every shot carries its own timecode and shows one visible change on a body. The dread comes from the chain — a look, veins, a bite, the next person — and the ending seals a door without settling anything.

**Use when:** Outbreak and possession clips, corridor chases, ritual scenes — anything where the fear comes from a body changing on a clock.

**Guidance:**

- Give every shot a timecode and exactly one change. The sleeper-train case fits 26 shots into 30 seconds, where Shot 2 is only `dark veins emerging beneath the skin` and Shot 3 is only `Her eyes cloud milky white`.
- Lock the face in the very first shot, before anything happens. The sleeper train opens with `<<<image_1>>>, face and outfit matching reference`; the zombie-train case uses `Character A, matching reference face/outfit`; the ritual case uses `Keep the Word character's face and outfit consistent throughout`.
- Pass the infection on and compress the second round. In the zombie-train case the first person takes twelve seconds from symptom to finished turn; the man he bites is done in seven, across Shots 13 to 16.
- Land the scare on somebody else's reaction. The sleeper train cuts to `A sleeping passenger stirs as another blood drop lands on his forehead`, and the rooftop case has `friends fall silent, chairs scrape back`.
- Refuse to resolve it. The sleeper train ends on the train running through the night with chaos in the windows; the Korean ritual case ends on `One intact talisman emits faint dark smoke`.

**Examples:** [#1](https://goodcase.ai/cases/seedance-shot-1-0-0-1-2s-image-1-face-and-outfit-matching-reference-lying-in-b6d9ef0e370e) [#2](https://goodcase.ai/cases/case-3b1796c66ab4) [#3](https://goodcase.ai/cases/case-b529ffbdfd9a) [#4](https://goodcase.ai/cases/seedance-30-sec-cinematic-korean-folk-horror-ritual-78323fedb479)

**Structure:**

1. Header: runtime, the genre named, and the reference lock on whoever turns first
2. Shot 1 with a timecode: patient zero in an ordinary seat or bunk, already carrying one symptom
3. Escalation shots, each adding exactly one visible change: veins, milky eyes, a stiff head tilt
4. The trigger shot: the attack itself, written as slow motion with impact
5. Transmission: the bitten person runs the same escalation on a shorter clock
6. Crowd panic and the barricade: the door, the luggage, hands clawing through glass
7. Closing shot: a sealed door still shuddering, or a wide exterior, with nothing resolved

**Pitfalls:**

- Cramming a whole transformation into one shot. Split it across four or five: eyes cloud, veins branch, body convulses, inhuman scream, head snaps forward.
- Buying the horror with gore volume. The hardest beats in the top cases are a single blood drop landing on a forehead, held as extreme close-up in slow motion.
- Letting the middle collapse into a brawl where nobody can tell who bit whom. Even the chaos shots name a subject and a target, like `The infected turns and lunges at nearby passengers`.
- Putting the consistency lock at the end with the style notes. By then the face has already drifted; the lock belongs in Shot 1, and the infected version still has to be the same face.
```

## 出处与许可

- 作者：[LearnPrompt / goodcase.ai (curation)](https://github.com/LearnPrompt)（上游仓库作者 / 贡献者）
- 收录来源：[LearnPrompt/awesome-seedance](https://github.com/LearnPrompt/awesome-seedance)，[原文位置](https://github.com/LearnPrompt/awesome-seedance/blob/487c166e2f09487016452b90fec5e19a470af883/docs/templates/en/horror-suspense.md#L25)
- 上游许可：CC-BY-4.0 (curation)（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
