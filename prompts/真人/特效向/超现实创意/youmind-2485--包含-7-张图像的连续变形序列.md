---
id: "youmind-2485"
title: "包含 7 张图像的连续变形序列"
title_en: "Complex single-shot morphing video prompt for Seedance 2.0"
model: "Seedance 2.0"
language: "ja"
medium: "真人"
direction: "特效向"
genre: "超现实创意"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/3f8bf8060fb3d828514ee474797f09620ef10a4c/README_ja-JP.md#L2350"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "ヤレヤル"
original_author_url: "https://x.com/YaReYaRu30Life"
original_post_url: "https://x.com/YaReYaRu30Life/status/2039474680235741681"
published: "Apr 1, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=2485"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# 包含 7 张图像的连续变形序列

*Complex single-shot morphing video prompt for Seedance 2.0*

> 这是一个为 Seedance 2.0 设计的超详细日文提示词，旨在创建一个单一的连续镜头（无剪辑），在七张不同的参考图像之间平滑变形。它为每个过渡步骤指定了复杂的摄像机运动（推入、横移、环绕）和变换逻辑（粒子分解、光扫描、液体熔化），同时保持时间连贯性和主体身份。

## 提示词（日本語）

```text
[基本設定]
構造：単一の連続ショット（カットなし）
進行：7 枚の画像を順番にモーフィング
視認性：各画像が一瞬明確に認識できること（停止は不要）
遷移：常にスムーズかつ連続的であること
スタイル：シネマティック、高精細、ダイナミック、フリッカーなし
[プロンプト本文]
<<<Image1>>> から開始します。
映像は完全にシームレスな単一ショットで進行し、<<<Image1>>> → <<<Image2>>> → <<<Image3>>> → <<<Image4>>> → <<<Image5>>> → <<<Image6>>> → <<<Image7>>> の順序で継続的に変形します。
シーン全体は静止しておらず、カメラが常に動いているダイナミックな映像の中でモーフィングが発生します。
ただし、被写体の認識可能性は維持され、構成は崩壊を防ぐように制御されます。
各画像は流れの中で一瞬明確に見えるピーク状態を持ちますが、停止や保持は行いません。
すべてが「動きの中の進化」として連続的に表現されます。
[変換ロジック（固定順序、繰り返し禁止）]
<<<Image1>>> → <<<Image2>>>：
カメラがスムーズに前進（プッシュイン）しながら変形を開始。
アウトライン → パーツ → 色 → テクスチャの順で段階的に変化。
微細な粒子分解 → 再構築。
<<<Image2>>> → <<<Image3>>>：
カメラが横方向にトラッキング移動。
光スキャン（light scan）によって構造が書き換えられる。
光のラインが流れ、形状が絶えず変化する。
※粒子表現は禁止。
<<<Image3>>> → <<<Image4>>>：
カメラが被写体の周囲を旋回（オービット）。
空間の歪みとレンズの歪みによって形状が引き伸ばされ、変形する。
<<<Image4>>> → <<<Image5>>>：
カメラがわずかに引き（ライトドリーアウト）、視点を変更。
被写体が液体のように溶け出し、流動して再形成される。
<<<Image5>>> → <<<Image6>>>：
カメラが一時的に加速し、動きに勢いをつける。
被写体が断片化して空間に散らばり、新しい形に再集合する。
<<<Image6>>> → <<<Image7>>>：
カメラが中心に向かって戻りながら安定する。
エネルギーが中心に収束し、光と波を通じて最終形態へと統合される。
[カメラの挙動（重要）]
・常に動いているが、制御された動きであること。
・使用可能：
 - プッシュイン / プルアウト
 - 横方向のトラッキング
 - オービット（周囲を旋回）
 - わずかなパースペクティブの変化
・禁止：
 - 急激なぼかし
 - 被写体の消失
 - 不自然なジャンプ
[制約事項（重要）]
・カット編集の禁止（完全なシングルショットであること）。
・同じエフェクトの再利用禁止。
・フリッカー、ノイズ、崩壊の禁止。
・被写体の位置とスケールを大きく乱さないこと。
・各画像が少なくとも一度は明確に視認できること。
・すべての変化は連続的で、意味のある構造的変換であること。
[強化キーワード]
dynamic camera movement（ダイナミックなカメラワーク）
cinematic motion flow（シネマティックなモーションフロー）
smooth continuous morphing（スムーズな連続モーフィング）
temporal coherence（時間的整合性）
high detail preservation（高精細なディテールの保持）
consistent subject identity（一貫した被写体の同一性）
seamless transformation flow（シームレスな変換フロー）
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/3f8bf8060fb3d828514ee474797f09620ef10a4c/README_zh.md#L2346)

```text
[基础设置]
结构：单一连续镜头（无剪辑）
进度：7 张图像顺序变形
可见性：每张图像在瞬间清晰可辨（无需停顿）
过渡：始终平滑且连续
风格：电影感、高清晰度、动态、无闪烁
[提示词主体]
从 <<<Image1>>> 开始。
视频以完全无缝的单一镜头进行，按以下顺序持续变换：<<<Image1>>> → <<<Image2>>> → <<<Image3>>> → <<<Image4>>> → <<<Image5>>> → <<<Image6>>> → <<<Image7>>>。
整体场景并非静态；变形发生在摄像机持续运动的动态视频中。
同时，保持主体可辨识度，并控制构图以防止崩坏。
每张图像在流动中都有一个峰值状态，可以瞬间清晰可见，但不会出现停顿或保持。
一切都表现为“运动中的演变”。
[变换逻辑（固定顺序，无重复）]
<<<Image1>>> → <<<Image2>>>：
随着摄像机平滑推入，变换开始。
按以下顺序逐渐变化：轮廓 → 部件 → 颜色 → 纹理。
微观粒子分解 → 重构。
<<<Image2>>> → <<<Image3>>>：
摄像机执行横向追踪运动。
结构通过光扫描（light scan）进行重写。
发光线条流动，形状持续改变。
*禁止使用粒子表现。
<<<Image3>>> → <<<Image4>>>：
摄像机围绕主体环绕。
形状通过空间扭曲和镜头畸变进行拉伸和变换。
<<<Image4>>> → <<<Image5>>>：
摄像机轻微拉出并改变视角（轻微推拉镜头 + 角度变化）。
主体像液体一样融化、流动并重塑。
<<<Image5>>> → <<<Image6>>>：
摄像机短暂加速，增加运动动量。
主体碎片化，散布到空间中，然后重新组合成新形式。
<<<Image6>>> → <<<Image7>>>：
摄像机在向中心移动时趋于稳定。
能量在中心汇聚，通过光和波整合为最终形态。
[摄像机行为（重要）]
・受控运动，但保持持续移动。
・可用：
 - 推入 / 拉出
 - 横向追踪
 - 环绕（围绕主体）
 - 轻微透视变化
・禁止：
 - 突然模糊
 - 主体丢失
 - 不自然的跳跃
[约束条件（重要）]
・禁止剪辑（必须是完整的单一镜头）。
・禁止重复使用相同的效果。
・禁止闪烁、噪点或画面崩坏。
・主体位置和比例不应出现显著错位。
・每张图像必须至少清晰可见一次。
・所有变化必须是连续且具有意义的结构性转换。
[增强关键词]
动态摄像机运动
电影级运动流
平滑连续变形
时间连贯性
高细节保留
一致的主体身份
无缝变换流
```

### YouMind 提供的English版本（README.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/3f8bf8060fb3d828514ee474797f09620ef10a4c/README.md#L2345)

```text
【Basic Settings】
structure: Single continuous shot (no cuts)
progression: Morphing 7 images sequentially
visibility: Each image is clearly recognizable for only an instant (no stopping required)
transition: Always smooth and continuous
style: Cinematic, high-definition, dynamic, no flicker
【Prompt Body】
Start from <<<Image1>>>.
The footage proceeds in a completely seamless single shot, continuously transforming in the order of <<<Image1>>> → <<<Image2>>> → <<<Image3>>> → <<<Image4>>> → <<<Image5>>> → <<<Image6>>> → <<<Image7>>>.
The overall scene is not static; morphing occurs within a dynamic video where the camera is constantly moving.
However, the recognizability of the subject is maintained, and the composition is controlled to prevent collapse.
Each image has a peak state where it is clearly visible for an instant within the flow, but there is no stopping or holding.
Everything is expressed as a continuous "evolution within motion."
【Transformation Logic (Fixed order, no duplication)】
<<<Image1>>> → <<<Image2>>>:
The camera begins transformation while smoothly pushing in forward
Gradual change in the order of outline → parts → color → texture
Fine particle decomposition → reconstruction
<<<Image2>>> → <<<Image3>>>:
Tracking movement where the camera flows horizontally
The structure is rewritten by light scanning
Emitting lines flow, and the shape continuously changes
* Particle expression is prohibited
<<<Image3>>> → <<<Image4>>>:
Orbit movement where the camera circles around the subject
The shape is stretched and transformed by spatial distortion and lens warp
<<<Image4>>> → <<<Image5>>>:
The camera slightly pulls back and changes perspective (light dolly out + angle change)
The subject melts like liquid and is reformed while flowing
<<<Image5>>> → <<<Image6>>>:
The camera accelerates momentarily, adding momentum to the movement
The subject fragments, scatters in space, and then reassembles into a new form
<<<Image6>>> → <<<Image7>>>:
The camera stabilizes while converging back towards the center
Energy converges at the center and integrates into the final form through light and waves
【Camera Behavior (Important)】
・Always moving but controlled movement
・Usable:
  - Push-in / Pull-out
  - Horizontal tracking
  - Orbit (circling)
  - Light perspective change
・Prohibited:
  - Sudden blur
  - Loss of subject
  - Unnatural jumps
【Constraints (Important)】
・Cut editing prohibited (complete single shot)
・Reuse of the same effect prohibited
・Flicker, noise, and breakdown prohibited
・Subject position/scale should not be significantly disrupted
・Each image must achieve a clearly visible state at least once
・All changes must be continuous and meaningful structural transformations
【Enhancement Keywords】
dynamic camera movement
cinematic motion flow
smooth continuous morphing
temporal coherence
high detail preservation
consistent subject identity
seamless transformation flow
```

## 出处与许可

- 原作者：[ヤレヤル](https://x.com/YaReYaRu30Life) · 原帖：<https://x.com/YaReYaRu30Life/status/2039474680235741681>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/3f8bf8060fb3d828514ee474797f09620ef10a4c/README_ja-JP.md#L2350)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `3f8bf8060fb3`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=2485>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
