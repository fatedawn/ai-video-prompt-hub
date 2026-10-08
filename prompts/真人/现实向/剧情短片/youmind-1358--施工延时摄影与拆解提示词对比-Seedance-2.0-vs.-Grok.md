---
id: "youmind-1358"
title: "施工延时摄影与拆解提示词对比 (Seedance 2.0 vs. Grok)"
title_en: "Construction Time-Lapse and Deconstruction Prompt Comparison (Seedance 2.0 vs. Grok)"
model: "Seedance 2.0"
language: "zh"
medium: "真人"
direction: "现实向"
genre: "剧情短片"
art_style: null
tags: ["Seedance 2.0", "YouMind"]
source_repo: "YouMind-OpenLab/awesome-seedance-2-prompts"
source_url: "https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/6219133e4e4528709333b2e02f4577bb3b8bb748/README_zh.md#L3315"
license: "CC-BY-4.0"
license_url: "https://creativecommons.org/licenses/by/4.0/"
original_author: "John"
original_author_url: "https://x.com/john87445528"
original_post_url: "https://x.com/john87445528/status/2033054826662130092"
published: "Mar 15, 2026"
third_party_author: true
flags: []
also_in: []
source_page: "https://youmind.com/en-US/seedance-2-0-prompts?id=1358"
classification: "auto"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
---

# 施工延时摄影与拆解提示词对比 (Seedance 2.0 vs. Grok)

*Construction Time-Lapse and Deconstruction Prompt Comparison (Seedance 2.0 vs. Grok)*

> 用户比较了 Grok 和 Seedance 2.0 在生成建筑物建造/拆除延时视频方面的性能。该推文包含两个高度详细的提示：一个用于建造（Seedance 2.0 使用），一个用于拆除（Grok 使用）。由于建造提示已成功用于 Seedance 2.0，并展示了清晰的视频生成指令，因此仅提取了该建造提示。

## 提示词（中文）

```text
固定机位广角延时摄影，完整记录一栋建筑从空地基到竣工的全过程。摄像机保持固定，仅通过时间压缩（10-30 倍快进）来展现建造节奏，并呈现自然光线在场景中的循环（早晨 → 中午 → 黄昏 → 夜晚）。

阶段 0：空旷起点 - 平坦、空旷的原始场地，可见测量桩和放线。施工设备尚未抵达。背景环境（山脉/海洋/城市天际线）清晰可见，作为整个作品中唯一稳定、不变的元素。静态画面持续 3 秒。

阶段 1：场地准备和地基工程 - 挖掘机和推土机迅速抵达，安全围栏竖起，安全标识就位。挖掘机挖地基沟槽，泥土装载到运输车辆并运至场地一侧。地基坑内迅速铺设钢筋网，混凝土搅拌车进入，浇筑并找平。地基轮廓在画面中逐渐清晰。

阶段 2：主体结构生长 - 脚手架像骨架一样从地面迅速升起。混凝土柱和楼板逐层浇筑，每完成一层，整栋建筑都会明显升高——呈现出阶梯式上升的节奏（而非连续飞升）。起重机持续旋转，精确地将钢筋、模板和混凝土构件吊运到工作层。建筑旁边的材料堆放区始终可见，材料堆随着施工进度而增减。

阶段 3：围护结构和外墙封闭 - 楼板结构完成后，外墙材料开始安装：
砖结构：工人逐层砌砖，墙体迅速升高。
玻璃幕墙：起重机吊起整块玻璃单元，工人定位并固定。
木质外墙：工人逐块组装，木板依次覆盖。
石材立面：预切石板吊起，粘合，压紧。
建筑从透明骨架过渡到被外墙“填充”，轮廓变得越来越清晰。

阶段 4：屋顶完工 - 屋顶结构在工人协作下完成：铺设防水层，覆盖保温层，逐块放置表面材料（瓦片/金属屋面/平屋顶铺设）。屋顶封闭标志着主体建筑形态的完成，整体轮廓首次呈现。

阶段 5：门窗和机电安装 - 门窗框架精确安装到开口中，工人使用起重设备缓慢定位玻璃。同时，导管、水管、风管迅速穿过内外墙体，如同血管般延伸至建筑内部。电气设备、管道装置陆续抵达并安装，内部空间从空壳迅速转变为功能性实体。

阶段 6：室内精装修和外部收尾 - 室内地板铺设、墙面涂料、天花板逐步完成，每个空间从粗糙过渡到精装修状态。外部同步推进：立面精装修、外墙涂料滚涂或外挂板安装、窗台压顶，建筑表面质感逐渐变得精致。

阶段 7：景观和场地完工 - 安全围栏拆除，施工设备依次撤离。景观施工车辆抵达：铺撒表土，起重机将树木吊入种植坑，灌木迅速覆盖地面，草坪分段铺设。硬质铺装（石材/木材/混凝土）逐块完成。灯具、标识、设施依次安装。

阶段 8：竣工状态 - 最后一辆施工车辆驶离，场地恢复整洁。建筑巍然屹立：立面一尘不染，景观绿意盎然，灯光亮起。静态画面持续 5 秒。背景环境（山脉/海洋/天际线）仍是最初的区域，从未改变。画面定格——从空地到建筑，见证一座房屋的诞生。

技术参数：
摄像机：固定广角，构图覆盖建筑主体 + 周围材料堆放区 + 车辆进出通道。
风格：建造纪录片，4K 超清，工业质感色调 → 竣工暖色调。
时间压缩：10-30 倍，保持机械动作可读性。
音频：施工声音（机械轰鸣、钢筋碰撞）快进处理 → 竣工时过渡到空灵音乐。
无水印，无字幕，无文字叠加。

精准拆解：[参考图像建筑名称] 有序拆解延时摄影，类型：建筑精准拆解延时摄影 / 固定机位逆向记录，时长：高速逆向演化序列（完整有序拆解周期），核心原则：禁止魔幻过渡；使用快进方式展示机械和人工有序拆解、材料堆放、转运和清理的真实过程。绝对禁止失控的镜头，如倒塌、爆炸、突然消失。所有拆解必须是受控的、按部就班的、有序的工程操作。

拆除方法论：工业级精准拆解：人 + 机械协作 → 逐件拆卸 → 分类堆放 → 系统转运 → 场地清理。

参考图像分析：指令：深入分析用户提供的[参考图像]，默默记录所有建筑关键细节，作为拆解起点的 100% 精确起始点。
分析清单：[建筑风格类型（现代/传统/混合/热带/工业等），建筑层数和整体规模（单层/多层/别墅/豪宅），主体结构形式（木/混凝土/钢/砖石），外立面材料（木/石/玻璃/混凝土/金属/涂层），可拆卸构件清单（屋顶/门窗/外墙板/楼板/柱梁等），材料估算（需要堆放多少立方米的木材/钢材/混凝土块），拆解难度评估（哪些部分需要起重机 vs 人工拆解）]。

初始状态锁定：阶段 0 必须 100% 还原参考图像的竣工状态，作为有序拆解的起始点。

叙事时间线：[阶段 0：竣工状态（拆解前准备），阶段 1：拆解准备和景观移除，阶段 2：内部物品拆解和转运，阶段 3：第一批材料转运（部分清理堆放区），阶段 4：门窗和特殊构件移除，阶段 5：外墙材料移除，阶段 6：第二批材料大规模转运，阶段 7：主体结构拆解（自上而下有序拆卸），阶段 8：地基移除和材料清理] - 每个阶段包含详细的视觉描述、动作风格、关键行动、材料流向以及重要性/强调说明。该提示详细描述了从初始完整建筑状态到系统拆解、材料分类、移除和最终场地清理的整个过程，强调受控拆除方法，避免魔幻过渡或倒塌场景。
```

## 其他语言版本（上游仓库提供，非本仓库翻译）

### YouMind 提供的English版本（README.md）

[位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/6219133e4e4528709333b2e02f4577bb3b8bb748/README.md#L3269)

```text
Fixed-position wide-angle time-lapse photography, fully documenting the entire process of a building from empty foundation to completion. The camera remains fixed, only using time compression (10-30x fast-forward) to present the construction rhythm, showing natural light cycling through the scene (morning → noon → dusk → night). Phase 0: Empty Starting Point - The flat, empty raw site with survey stakes and layout lines visible. Construction equipment has not yet arrived. The background environment (mountain/sea/city skyline) is clearly visible as the only stable, unchanging element throughout the entire piece. Static frame lasts 3 seconds. Phase 1: Site Preparation and Foundation Work - Excavators and bulldozers quickly arrive, safety fences erected, safety signs in place. Excavators dig foundation trenches, soil loaded onto transport vehicles and moved to one side of the site. Reinforcement mesh quickly laid in the foundation pit, concrete mixer trucks enter, pour, and level. Foundation outline gradually becomes clear in the frame. Phase 2: Main Structure Growth - Scaffolding rapidly rises from the ground like a skeleton growing. Concrete columns and floors are poured layer by layer, each completed level visibly raising the entire building—presenting a stepped rising rhythm (not continuous flying up). Cranes continuously rotate, precisely lifting reinforcement, formwork, and concrete components to working levels. Material stacking areas remain visible beside the building, material piles grow and shrink with work progress. Phase 3: Envelope and Exterior Wall Closure - After floor structure completion, exterior wall materials begin installation: Brick structure: workers lay bricks layer by layer, walls rise quickly Glass curtain wall: crane lifts whole glass units, workers position and fix them Wooden exterior: workers assemble piece by piece, wooden boards cover in sequence Stone facade: pre-cut stone panels lifted, adhered, pressed tight Building transitions from transparent skeleton to being "filled" with exterior walls, outline becoming increasingly clear. Phase 4: Roof Completion - Roof structure completed with worker coordination: waterproof layer laid, insulation layer covered, surface materials placed piece by piece (tiles/metal roofing/flat roof paving). Roof closure marks completion of main building form, overall outline presented for the first time. Phase 5: Doors, Windows and MEP Installation - Door and window frames precisely installed in openings, glass slowly positioned by workers with lifting equipment. Simultaneously, conduits, water pipes, air ducts quickly thread through inside and outside walls, like blood vessels extending through the building interior. Electrical equipment, plumbing fixtures progressively arrive and install, interior space rapidly transforming from empty shell to functional body. Phase 6: Interior Finishing and Exterior Completion - Interior floor铺设, wall coatings, ceilings progressively completed, each space transitioning from rough to finished state. Exterior simultaneously advances: facade finishing, exterior wall paint rolling or cladding attachment, window sill coping, building surface texture gradually becoming refined. Phase 7: Landscape and Site Completion - Safety fences removed, construction equipment departs in sequence. Landscaping construction vehicles arrive: topsoil spreading, trees lifted by crane into planting holes, shrubs quickly covering ground, turf laid in sections. Hard paving (stone/wood/concrete) completed piece by piece. Lights, signs, facilities installed in sequence. Phase 8: Completed State - Last construction vehicle departs, site restored to cleanliness. Building stands complete: facade pristine, landscape lush with greenery, lights illuminated. Static frame lasts 5 seconds. Background environment (mountain/sea/skyline) remains that same initial area, never changed. Frame frozen—from empty land to building, witnessing the birth of a house. Technical Parameters: Camera: Fixed wide-angle, composition covering building main body + surrounding material staging area + vehicle access channels Style: Construction documentary, 4K ultra-clear, industrial texture tones → completion warm tones Time compression: 10-30x, maintaining mechanical action readability Audio: Construction sounds (mechanical rumbling, steel collision) fast-forward processed → transitioning to ethereal music at completion No watermark, no subtitles, no text overlay

Precision Dismantling: [Reference Image Building Name] Organized Deconstruction Time-lapse, Type: Building Precision Dismantling Time-lapse / Fixed-position Reverse Record, Duration: High-speed Reverse Evolution Sequence (Complete Ordered Dismantling Cycle), Core Principle: Prohibit magical transitions; use fast-forward to display real processes of mechanical and人工 ordered dismantling, material stacking, transfer and cleanup. Absolutely prohibit uncontrollable shots like collapse, explosion, sudden disappearance. All dismantling must be controlled, step-by-step, ordered engineering operations. Demolition Methodology: Industrial-grade precision dismantling: human + mechanical cooperation → piece-by-piece disassembly → classified stacking → systematic transfer → site clearing. Reference Image Analysis: Instruction: Deeply analyze user-provided [reference image], silently record all building key details as 100% precise starting point for dismantling origin. Analysis Checklist: [Building style type (modern/traditional/mixed/tropical/industrial etc.), Building floors and overall scale (single-story/multi-story/villa/mansion), Main structural form (wood/concrete/steel/masonry), Exterior facade materials (wood/stone/glass/concrete/metal/coating), Dismantlable component checklist (roof/doors-windows/exterior wall panels/floors/columns-beams etc.), Material estimation (how many cubic meters of wood/steel/concrete blocks need stacking), Dismantling difficulty assessment (which parts need cranes vs manual dismantling)]. Initial State Lock: Phase 0 must 100% restore reference image completed state as starting point for ordered dismantling. Narrative Timeline: [Phase 0: Completed State (Pre-dismantling Preparation), Phase 1: Dismantling Preparation and Landscape Removal, Phase 2: Interior Items Dismantling and Transfer, Phase 3: First Batch Material Transfer (Partially Clearing Staging Area), Phase 4: Doors, Windows and Special Component Removal, Phase 5: Exterior Wall Material Removal, Phase 6: Second Batch Material Large-scale Transfer, Phase 7: Main Structure Dismantling (Ordered Disassembly Top-to-Bottom), Phase 8: Foundation Removal and Material Clearance] - Each phase contains detailed visual descriptions, motion style, key action, material flow, and importance/emphasis notes. The prompt details the entire process from initial complete building state through systematic deconstruction, material sorting, removal, and final site clearance, with emphasis on controlled demolition methods avoiding magical transitions or collapse scenarios. Note: This prompt appears truncated in the original source.
```

## 出处与许可

- 原作者：[John](https://x.com/john87445528) · 原帖：<https://x.com/john87445528/status/2033054826662130092>
- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。
- 收录来源：[YouMind-OpenLab/awesome-seedance-2-prompts](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts)，[原文位置](https://github.com/YouMind-OpenLab/awesome-seedance-2-prompts/blob/6219133e4e4528709333b2e02f4577bb3b8bb748/README_zh.md#L3315)
- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `6219133e4e45`），与当前版本同为 CC BY 4.0 发布
- 上游许可：CC-BY-4.0（[许可说明](https://creativecommons.org/licenses/by/4.0/)；全文见本仓库 `LICENSES/`）
- 效果预览（外部链接，本仓库不收录图片/视频）：<https://youmind.com/en-US/seedance-2-0-prompts?id=1358>
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
