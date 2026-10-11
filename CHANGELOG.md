# 变更记录

本仓库面向用户的说明以**中文**为准。

## [0.2.0] — 2026-10-11

### 吸收 · eternityspring/shuohao-skills（烁皓，Apache-2.0）

按天机「加所有有价值的」要求，合入分支 `feat/absorb-shuohao-skills`（PR #1）。

#### 新增

- **`tools/shuohao-export/`** — 从 hub `shots.json`（或上游 `storyboard.json`）导出 MiniMax **H3** / 即梦 **Seedance** 投产包；附 `references/h3-prompt.md`、`seedance-prompt.md`、`shot-writing.md`
- **确定性质量门** — `segment-cap`、`cut-length`、`h3-structure`、`seedance-shot`、`prompt-no-names`；入口：`videogen validate`、`tools/shuohao-export validate`、MCP `lint_storyboard_prompt`（`gates` 字段）
- **`skills/character-refs/`** — 角色参考图 skill（自带出图后端配置，BYO）
- **`skills/novel-outline/`** — 小说改编大纲五件套 + 14 道代码质量门
- **方法论** — `catalog/methodology.md` §11：角色三档、空景无人、冷开场前 3 拍
- **演示** — `tools/shuohao-export/examples/banquet-twist/`（plan→validate→export）、`demos/shuohao-absorb/` 中文索引；skill 内已有 `阿禾` / `渡口` 示例

#### 文档

- 根 `README.md` / `README.zh.md` 以中文列出全部吸收能力与命令
- `AGENTS.md`、导演 Skill §2.5、`videogen/README.md`、`NOTICE` / `ATTRIBUTION.md` 已同步署名

#### 未做（有意跳过）

- 不 npm publish；不强制 ComfyUI；不替换 Markdown 分镜主路径；不整包吸收 novel-characters（与漫剧 4 View 重叠处只进方法论）

#### 验证

```bash
node --test tools/shuohao-export/test/export.test.mjs
bash tools/shuohao-export/examples/banquet-twist/run_demo.sh /tmp/shuohao-demo
```

### 合并

- PR #1 → `main`：`feat/absorb-shuohao-skills`

---

## 更早

此前合入：`feat/flat2svg`、`feat/hub-fresh-slides`（slides2video / 目录保鲜）、`feat/stills2video`、`feat/mcp-and-ingest` 等，详见各分支提交与根 README「我想……」表。
