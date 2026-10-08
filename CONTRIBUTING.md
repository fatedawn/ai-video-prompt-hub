# 贡献指南 · Contributing

欢迎补充提示词、修正分类、改进工具。原则：**最大范围开放、最大范围收集，同时不碰违规内容**。

## 1. 添加提示词：先确认来源和许可

只收**许可证明确允许转载**的文字：

| 来源情况 | 怎么处理 |
|---|---|
| 上游仓库是 MIT / CC BY 4.0 / Apache-2.0 等宽松许可 | 可以收全文。把上游许可全文（含版权行）放进 `LICENSES/<owner>_<repo>-<LICENSE>.txt` |
| 你自己写的提示词 | 可以收全文，随本仓库按 Apache-2.0 发布（提交即表示你同意这一点，见第 5 节） |
| 没有许可证、NC / ND / SA 等不兼容许可、官方文档「版权所有」、网站内容 | **只放链接**（README「相关项目」或 `tools/`），不复制文字 |
| 第三方原作者（X / 公众号 / 博客）的提示词，经宽松许可的上游收录 | 可以收，但必须保留原作者署名和原帖链接，标 `third_party_author: true` |

推荐做法是把来源加进 `scripts/extract_sources.py`（固定 commit、行级永久链接），然后运行：

```bash
python3 scripts/extract_sources.py   # 提取 + 去重 + 下架名单 + 内容审核
python3 scripts/build_index.py       # 重建分类目录、索引、data/ 分片和 README 统计
```

手动添加单条时，新建 `prompts/<媒介>/<方向>/<题材>/<id>--<标题>.md`，front matter 至少包含：

```yaml
id: "mysource-001"
title: "标题"
language: "zh"
medium: "漫剧"            # 漫剧 / 真人 / 其他
direction: "特效向"       # 现实向 / 特效向（「其他」填 null）
genre: "仙侠玄幻"
source_repo: "owner/repo"
source_url: "https://github.com/owner/repo/blob/<commit>/README.md#L123"   # 固定 commit 的行级链接
license: "MIT"
license_url: "https://opensource.org/licenses/MIT"
original_author: "作者名"
original_post_url: "https://x.com/…"      # 有就填
third_party_author: true
classification: "manual"
changes: "仅做格式规范化，提示词文字未改动。"
```

正文放一个 ```` ```text ```` 代码块（提示词原文，一字不改），再写「出处与许可」。最后运行 `python3 scripts/build_index.py --check`。

**不要提交**：第三方图片 / GIF / 视频、模型权重、单独的音频文件、任何 API key（见 [SECURITY.md](SECURITY.md)），以及超过 10 MB 的文件。

## 2. 内容审核

所有第三方提示词在发布前都经过 `scripts/audit.py`（关键词规则，先去掉「不要 / avoid / no …」这类否定约束）和人工复核（`data/audit_overrides.tsv`）。

| 情况 | 处理 | `audit_reason` |
|---|---|---|
| 以真实可识别人物（名人、政要、企业家、运动员、主播；历史人物被置于现代诋毁或性化情境）为主体 | 仅链接 | `real-person` |
| 性暗示、裸露、性行为描写 | 仅链接 | `sexual` |
| 未成年人或年龄不明人物出现在任何性化情境 | **不收录**（只在 `data/extraction_report.json` 记 id 与原因） | `sexual-minor` |
| 极端血腥（斩首、肢解、内脏等） | 仅链接 | `gore` |
| 仇恨符号、侮辱性用语 | 仅链接 | `hate` |
| 自杀、自残 | 仅链接 | `self-harm` |
| 毒品使用、武器 / 爆炸物制作 | 仅链接 | `drugs-weapons` |
| 政治敏感（领导人、敏感事件、分裂主张） | 仅链接 | `politics` |
| 核心是复刻特定版权角色 / IP（皮卡丘、蜘蛛侠、鸣人等） | 仅链接 | `copyrighted-character` |
| 以真实品牌产品广告为内容、可能被误认为品牌官方广告 | 仅链接 | `brand-ad` |

- **仅链接**：保留标题、原作者署名、原帖与上游链接和一句中性说明，不转载正文；front matter 写 `access: "link-only"` 和 `audit_reason`。
- **不影响的情况**：「迪士尼风格」「吉卜力风格」「受《X》启发」这类风格提法；顺带一提的名字（球迷穿着某球员的球衣、背景音乐提到某首歌）；唐伯虎、荆轲等虚构或传说人物（除非内容诋毁或性化）。
- **拿不准时从严**：降级为仅链接，而不是删掉署名。
- **纠错 / 申诉**：规则误判时，在 `data/audit_overrides.tsv` 加一行 `id<TAB>keep|link-only|exclude<TAB>reason<TAB>说明`，重新运行提取脚本，并在 PR 里说明理由。

## 3. 下架

原作者或权利人请使用 [下架申请模板](.github/ISSUE_TEMPLATE/takedown.md)。维护者把原帖链接、条目 id 或 `author:@账号` 加到 `data/takedown.txt`，重新运行提取和索引脚本；名单永久保留，以后重新提取也不会再收录。

## 4. 代码

- `videogen/`：`cd videogen && npm test`（全部 mock，不联网、不需要 key）。
- `animator/`：`cd animator && node src/cli.mjs check`，以及一次短渲染冒烟测试，例如 `node src/cli.mjs render examples/demo/project.json --scale 0.5 --from 0 --to 3 --out /tmp/smoke.mp4`。
- `scripts/`：只用 Python 3 标准库；改完跑 `python3 scripts/build_index.py --check`。

## 5. 许可

提交到本仓库的原创代码和内容按 [Apache-2.0](LICENSE) 授权（Apache-2.0 第 5 条）。第三方内容保持其上游许可，并必须附带署名与许可全文。
