---
id: "youmind-6805"
title: "3x3 分镜转视频序列模板"
title_en: "3x3 Storyboard to Video Sequence Template"
model: "Seedance 2.0"
language: "ja"
medium: "真人"
direction: "现实向"
genre: "剧情短片"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/3efda227ad15d4835d81c4ea888253c5b3de291e/README_ja-JP.md#L3006"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "AIライフハック"
original_author_url: "https://x.com/ai_lifehack55"
original_post_url: "https://x.com/ai_lifehack55/status/2072882708863410216"
published: "Jul 3, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=6805"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# 3x3 分镜转视频序列模板

*3x3 Storyboard to Video Sequence Template*

> 这是一个为 Seedance 2.0 设计的高度结构化技术提示词，旨在将 3x3 的 9 宫格参考图转换为具有精确时间控制和镜头调度的 15 秒视频序列。

## 提示词（日本語）

```text
参照 @image1 3x3/9 フレームの参照画像を共有します
[条件定義]
添付された 3 行 3 列（合計 9 フレーム）の 1:1 正方形参照画像を、約 15 秒の動画のストーリーボードとして使用してください。参照画像全体を 3x3 の分割画面として動かすのではなく、各フレームを個別に標準のフルスクリーンショットとして展開してください。参照画像内の 9 フレームすべてを、省略、統合、繰り返し、順序の入れ替えを行うことなく使用してください。常に一度に 1 フレームのみをフルスクリーンで表示し、複数のフレームを同時に表示しないでください。参照画像が実写の場合は実写の質感を維持し、アニメやイラストの場合は元のスタイル、線、色使い、陰影、質感を維持してください。実写をアニメに変換したり、その逆を行ったりしないでください。プロンプト側から新しい固定の衣装、表情、ポーズ、アクション、小道具、背景設定を持ち込まないでください。各フレームに描かれた構図、被写体の状態、姿勢、表情、衣装、背景、雰囲気に基づき、そのコンテンツとスタイルに適した自然な動きを補完してください。9 つのフレームが同一人物やキャラクターを描いている場合は、すべてのショットを通じて顔の特徴、髪型、推定年齢、体格、衣装、主要な身体的特徴の同一性を維持してください。

[ショット / フロー]
参照画像の読み取り順序は左上から右へ、上段、中段、下段の順に進みます。
ショット 1 | 0.0–1.5 秒
左上のフレームをフルスクリーンショットとして展開し、その構図、スタイル、被写体の状態に合わせて自然に動かしてください。
ショット 2 | 1.5–3.0 秒
上段中央のフレームをフルスクリーンショットとして展開し、その構図、スタイル、被写体の状態に合わせて自然に動かしてください。
ショット 3 | 3.0–4.5 秒
右上のフレームをフルスクリーンショットとして展開し、その構図、スタイル、被写体の状態に合わせて自然に動かしてください。
ショット 4 | 4.5–6.0 秒
中段左のフレームをフルスクリーンショットとして展開し、その構図、スタイル、被写体の状態に合わせて自然に動かしてください。
ショット 5 | 6.0–8.0 秒
中央のフレームをフルスクリーンショットとして展開し、その構図、スタイル、被写体の状態に合わせて自然に動かしてください。
ショット 6 | 8.0–9.5 秒
中段右のフレームをフルスクリーンショットとして展開し、その構図、スタイル、被写体の状態に合わせて自然に動かしてください。
ショット 7 | 9.5–11.0 秒
左下のフレームをフルスクリーンショットとして展開し、その構図、スタイル、被写体の状態に合わせて自然に動かしてください。
ショット 8 | 11.0–12.5 秒
下段中央のフレームをフルスクリーンショットとして展開し、その構図、スタイル、被写体の状態に合わせて自然に動かしてください。
ショット 9 | 12.5–15.0 秒
右下のフレームをフルスクリーンショットとして展開し、その構図、スタイル、被写体の状態に合わせて自然に動かしてください。最後は短い余韻を残して終了します。
各ショットは開始時から自然で目に見える動きを生成してください。目、表情、呼吸、姿勢、髪、衣服、周囲の物体、光、背景は、各フレームの元の状態から論理的につながる範囲内で自然に動かしてください。
参照画像に関連のない新しいパフォーマンスや大きなアクションを追加しないでください。

[カメラ / 編集]
各フレームの元の構図と距離感を基準として維持し、1:1 のフルスクリーンショットとして自然に展開してください。被写体と背景の自然な動きを優先し、カメラは基本的に安定させてください。必要に応じて、ごくわずかなズーム、プル、パン、または奥行きの変化のみを加えてください。ショットの順序と切り替えタイミングは [ショット / フロー] で指定されたタイムラインに従ってください。ショット間の切り替えは明確なカットで行ってください。顔、体、衣装、背景が次のショットに溶け込むようなモーフィングは行わないでください。最終的な動画において、3x3 画像の枠線や余白を固定フレームとして残さないでください。各フレーム内に元々描かれている装飾、線、記号、エフェクトは、オリジナルのアートスタイルの一部として自然に維持される場合があります。ただし、装飾を増殖させたり、形状を崩したり、異なるショットにまたがって継続させたりしないでください。

[サウンド]
BGM を含めてください。動画のアートスタイル、雰囲気、テンポに自然に合うインストゥルメンタル音楽を追加してください。歌詞、歌、ナレーション、対話は含めないでください。BGM を邪魔しない範囲で、必要に応じて微かな環境音や効果音を追加してください。

[ネガティブ]
3x3 の参照画像全体を分割画面として動かさないでください。マルチスクリーン、分割画面、コラージュ表示は使用しないでください。9 つのフレームを省略、統合、繰り返し、順序変更しないでください。指定された読み取り順序を変更しないでください。指定された時間配分から大きく逸脱しないでください。各フレームを長い静止画として表示しないでください。同一人物やキャラクターの同一性を変更しないでください。参照コンテンツに関連のない新しい人物、衣装、小道具、背景、パフォーマンスを追加しないでください。元の表情、姿勢、衣装、構図を大幅に変更しないでください。実写をアニメに、またはアニメ/イラストを実写に変更しないでください。ショット間で顔、体、衣装、背景を溶け込ませたりモーフィングさせたりしないでください。装飾、線、記号、エフェクトをショット間で増殖、変形、接続しないでください。激しいカメラワーク、極端なズーム、過剰な演技、不必要なシーンの切り替えは避けてください。
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的中文版本（README_zh.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/3efda227ad15d4835d81c4ea888253c5b3de291e/README_zh.md#L3002)

```text
参考 @image1 3x3/9 帧参考图进行分享
[条件定义]
使用所附的 1:1 正方形参考图（由 3 行 x 3 列共 9 帧组成）作为约 15 秒视频的分镜脚本。请勿将整个参考图作为 3x3 分屏移动，而是将每一帧单独展开为标准全屏镜头。必须使用参考图中的全部 9 帧，不得遗漏、整合、重复或重新排序。始终保持一次仅显示一帧全屏画面；严禁同时显示多帧。如果参考图为真人实拍，请保持实拍质感。如果是动漫或插画，请保持原有的风格、线条、配色、阴影和纹理。不得将实拍转换为动漫，反之亦然。不得从提示词侧引入新的固定服装、表情、姿势、动作、道具或背景设置。根据每帧描绘的构图、主体状态、姿态、表情、服装、背景和氛围，补充适合该内容和风格的自然动态。如果 9 帧描绘的是同一个人或角色，请在所有镜头中保持面部特征、发型、感知年龄、体格、服装和主要身体特征的一致性。

[镜头 / 流程]
参考图的阅读顺序为从左上角开始，依次经过顶行、中行和底行。
镜头 1 | 0.0–1.5 秒
将左上角帧展开为全屏镜头，并根据其构图、风格和主体状态进行自然运动。
镜头 2 | 1.5–3.0 秒
将顶部中间帧展开为全屏镜头，并根据其构图、风格和主体状态进行自然运动。
镜头 3 | 3.0–4.5 秒
将右上角帧展开为全屏镜头，并根据其构图、风格和主体状态进行自然运动。
镜头 4 | 4.5–6.0 秒
将中间行左侧帧展开为全屏镜头，并根据其构图、风格和主体状态进行自然运动。
镜头 5 | 6.0–8.0 秒
将中心帧展开为全屏镜头，并根据其构图、风格和主体状态进行自然运动。
镜头 6 | 8.0–9.5 秒
将中间行右侧帧展开为全屏镜头，并根据其构图、风格和主体状态进行自然运动。
镜头 7 | 9.5–11.0 秒
将左下角帧展开为全屏镜头，并根据其构图、风格和主体状态进行自然运动。
镜头 8 | 11.0–12.5 秒
将底部中间帧展开为全屏镜头，并根据其构图、风格和主体状态进行自然运动。
镜头 9 | 12.5–15.0 秒
将右下角帧展开为全屏镜头，并根据其构图、风格和主体状态进行自然运动。结尾处添加短暂的停留效果。
每个镜头应从开始就产生自然、可见的动态。眼睛、表情、呼吸、姿态、头发、衣物、周围物体、光影和背景应在与每帧原始状态逻辑连接的范围内自然移动。
不得添加与参考图无关的新表演或大幅度动作。

[摄像机 / 编辑]
以每帧的原始构图和距离感为基础，自然地扩展为 1:1 全屏镜头。优先考虑主体和背景的自然运动，保持摄像机基本稳定。仅在必要时添加轻微的推拉、平移或景深变化。镜头的顺序和转场时间遵循 [镜头 / 流程] 中指定的时间轴。镜头之间采用硬切切换。不得执行将面部、身体、服装或背景溶解到下一个镜头的变形效果。最终视频中不得保留 3x3 图像的边框或边缘作为固定框架。每帧内原本绘制的装饰、线条、符号和效果可以作为原始艺术风格的一部分自然保留。但是，不得使装饰增生、破坏其形状或将其延续到不同的镜头中。

[声音]
包含背景音乐 (BGM)。添加与视频艺术风格、氛围和节奏自然契合的器乐。不得包含歌词、演唱、旁白或对话。根据需要添加细微的环境音或音效，且不得干扰背景音乐。

[负面提示词]
不得将整个 3x3 参考图作为分屏移动。不得使用多屏、分屏或拼贴显示。不得遗漏、整合、重复或重新排序 9 帧中的任何一帧。不得更改指定的阅读顺序。不得偏离指定的时间分配。不得将每一帧显示为长静态图像。不得更改同一个人或角色的身份。不得添加与参考内容无关的新人物、服装、道具、背景或表演。不得显著改变原始表情、姿态、服装或构图。不得将实拍转为动漫，或将动漫/插画转为实拍。镜头之间不得溶解或变形面部、身体、服装或背景。不得在镜头之间增生、变形或连接装饰、线条、符号或效果。避免剧烈的摄像机移动、极端的缩放、过度的表演或不必要的场景切换。
```

### YouMind 提供的English版本（README.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/3efda227ad15d4835d81c4ea888253c5b3de291e/README.md#L2897)

```text
Reference @image1 3x3/9-frame reference image for sharing
[CONDITION DEFINITION]
Use the attached 1:1 square reference image consisting of 3 rows x 3 columns (9 total frames) as a storyboard for a video of approximately 15 seconds. Instead of moving the entire reference image as a 3x3 split screen, expand each frame individually as a standard full-screen shot. Use all 9 frames in the reference image without omission, integration, repetition, or reordering. Always display only one frame at a time in full screen; do not display multiple frames simultaneously. If the reference image is live-action, maintain the live-action texture. If it is anime or illustration, maintain the original style, lines, coloring, shading, and texture. Do not convert live-action to anime or vice versa. Do not introduce new fixed costumes, expressions, poses, actions, props, or background settings from the prompt side. Based on the composition, subject state, posture, expression, costume, background, and atmosphere depicted in each frame, supplement natural movement suitable for that content and style. If the 9 frames depict the same person or character, maintain the identity of facial features, hairstyle, perceived age, physique, costume, and major physical characteristics across all shots.

[SHOT / FLOW]
The reading order of the reference image is from top-left to right, proceeding through the top row, middle row, and bottom row.
Shot 1 | 0.0–1.5s
Expand the top-left frame as a full-screen shot and move naturally according to its composition, style, and subject state.
Shot 2 | 1.5–3.0s
Expand the top-middle frame as a full-screen shot and move naturally according to its composition, style, and subject state.
Shot 3 | 3.0–4.5s
Expand the top-right frame as a full-screen shot and move naturally according to its composition, style, and subject state.
Shot 4 | 4.5–6.0s
Expand the middle-row left frame as a full-screen shot and move naturally according to its composition, style, and subject state.
Shot 5 | 6.0–8.0s
Expand the center frame as a full-screen shot and move naturally according to its composition, style, and subject state.
Shot 6 | 8.0–9.5s
Expand the middle-row right frame as a full-screen shot and move naturally according to its composition, style, and subject state.
Shot 7 | 9.5–11.0s
Expand the bottom-left frame as a full-screen shot and move naturally according to its composition, style, and subject state.
Shot 8 | 11.0–12.5s
Expand the bottom-middle frame as a full-screen shot and move naturally according to its composition, style, and subject state.
Shot 9 | 12.5–15.0s
Expand the bottom-right frame as a full-screen shot and move naturally according to its composition, style, and subject state. End with a short lingering effect.
Each shot should generate natural, visible movement from the start. Eyes, expressions, breathing, posture, hair, clothing, surrounding objects, light, and backgrounds should move naturally within a range that connects logically from the original state of each frame.
Do not add new performances or large actions unrelated to the reference image.

[CAMERA / EDITING]
Maintain the original composition and sense of distance of each frame as the basis, expanding naturally as a 1:1 full-screen shot. Prioritize natural movement of the subject and background, keeping the camera generally stable. Add very slight zooms, pulls, pans, or depth changes only when necessary. The order and transition timing of shots follow the timeline specified in [SHOT / FLOW]. Switch between shots with clear cuts. Do not perform morphing that dissolves faces, bodies, costumes, or backgrounds into the next shot. Do not leave the frame borders or margins of the 3x3 image as fixed frames in the final video. Decorations, lines, symbols, and effects originally drawn within each frame may be naturally maintained as part of the original art style. However, do not proliferate decorations, break their shapes, or continue them into different shots.

[SOUND]
Include BGM. Add instrumental music that naturally fits the art style, atmosphere, and tempo of the video. Do not include lyrics, singing, narration, or dialogue. Add subtle ambient sounds or sound effects as needed without interfering with the BGM.

[NEGATIVE]
Do not move the entire 3x3 reference image as a split screen. Do not use multiple screens, split screens, or collage displays. Do not omit, integrate, repeat, or reorder any of the 9 frames. Do not change the specified reading order. Do not deviate significantly from the specified time allocation. Do not display each frame as a long still image. Do not change the identity of the same person or character. Do not add new people, costumes, props, backgrounds, or performances unrelated to the reference content. Do not significantly change the original expressions, postures, costumes, or compositions. Do not turn live-action into anime or anime/illustrations into live-action. Do not dissolve or morph faces, bodies, costumes, or backgrounds between shots. Do not proliferate, deform, or connect decorations, lines, symbols, or effects between shots. Avoid violent camera movements, extreme zooms, excessive acting, or unnecessary scene changes.
```

## 出处与许可

- 原作者：[AIライフハック](https://x.com/ai_lifehack55) · 原帖：<https://x.com/ai_lifehack55/status/2072882708863410216>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/3efda227ad15d4835d81c4ea888253c5b3de291e/README_ja-JP.md#L3006)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `3efda227ad15`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=6805>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
