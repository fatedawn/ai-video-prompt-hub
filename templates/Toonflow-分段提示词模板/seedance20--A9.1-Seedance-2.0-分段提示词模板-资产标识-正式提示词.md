---
id: "toonflow-tpl-seedance20"
title: "A9.1 Seedance 2.0 分段提示词模板（资产标识 + 正式提示词）"
model: "Seedance 2.0"
language: "zh"
source_repo: "HBAI-Ltd/Toonflow-app"
source_url: "https://github.com/HBAI-Ltd/Toonflow-app/blob/72a895c26aab3f54c5a914517615362208fa6008/packages/skills/workflow/SKILL.md#L794"
license: "MIT"
license_url: "https://opensource.org/license/mit"
original_author: "HBAI-Ltd (Toonflow)"
original_author_url: "https://github.com/HBAI-Ltd"
changes: "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"
kind: "template"
---

# A9.1 Seedance 2.0 分段提示词模板（资产标识 + 正式提示词）

## 模板（中文）

```text
═══════════════════════════════════════════
G0N｜Batch X / 段 N ｜目标模型：Seedance 2.0 ｜本段时长：Xs ｜全局时间：MM:SS–MM:SS
═══════════════════════════════════════════

## 资产标识

### 涉及角色
角色名｜出镜状态总览
- 镜头 N-1｜00:00–00:XX｜仅手部 / 实际出镜 / 完全画外……｜说话 / 不说话
- 镜头 N-2｜00:XX–00:XX｜……
（身份 + 外观锚点 + 世界坐标 + 画面坐标 + 特殊状态 + 本段重点表演 + 表演要求 + 同期台词原文）

### 涉及场景
场景名｜时间
（场景锚点 + 摄影机位置朝向高度 + 前中后景 + 空间关系）

### 关键道具
道具名
（段首绝对位置 + 时间轴动作 + 段末状态 + 禁止项；包装文字按 A1.3）

─────────────────────────────────────────
【正式提示词】

生成一段总时长严格为 Xs 的真人电影短片。
（画面风格 / 摄影机总述 / 光源总述）

## 人物空间关系
（世界坐标 + 画面坐标 · 双层；禁止只写“延续上一段”）

## 镜头 N-1｜00:00–00:XX｜XXs｜主体 + 景别 + 角度
摄影机与构图：……
首帧锁定：……
动作时间轴：……
表演：……
物理：……

## 00:XX｜HARD CUT

## 镜头 N-2｜00:XX–00:XX｜XXs｜主体 + 景别 + 角度
……

## 光线
（主光源世界方向 + 画面方向 + 曝光逻辑 + 与前段/前镜的连续性）

## 声音
（真实环境音 + 同期对白原文；是否有 BGM 服从用户要求）

## 正向锁
（人物绝对位置 / 道具持有 / 视线 / 连续状态 / 本镜不该出现的人物）

## 文字锁
无字幕、无额外屏幕文字、无后期叠字；实体包装/招牌文字仅保持参考资产，不新增、不改写、不重绘。
```

## 出处与许可

- 作者：[HBAI-Ltd (Toonflow)](https://github.com/HBAI-Ltd)（上游仓库作者 / 贡献者）
- 收录来源：[HBAI-Ltd/Toonflow-app](https://github.com/HBAI-Ltd/Toonflow-app)，[原文位置](https://github.com/HBAI-Ltd/Toonflow-app/blob/72a895c26aab3f54c5a914517615362208fa6008/packages/skills/workflow/SKILL.md#L794)
- 上游许可：MIT（[许可说明](https://opensource.org/license/mit)；全文见本仓库 `LICENSES/`）
- 本仓库所做改动：仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。
