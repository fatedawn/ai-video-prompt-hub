---
name: 下架申请 / Takedown request
about: 原作者或权利人请求删除某条提示词或内容 · Ask us to remove your prompt or content
title: "[takedown] "
labels: takedown
---

<!-- 请勿在此贴出任何个人敏感信息。Please do not post sensitive personal data here. -->

**要删除的内容 / What should be removed**
- 文件路径或条目 id / File path or entry id（例如 `prompts/真人/现实向/剧情短片/youmind-1234--….md`）：
- 原帖链接 / Original post URL：
- 或：删除某作者的全部条目 / Or: remove all entries by an author（`author:@账号`）：

**你与该内容的关系 / Your relationship to the content**
- [ ] 我是原作者 / I am the original author
- [ ] 我是权利人或其代理人 / I am the rights holder or their agent
- [ ] 其他（请说明）/ Other (please explain)：

**原因（可选）/ Reason (optional)**

---

维护者处理流程 / Maintainer steps：把上面的链接、id 或 `author:@账号` 加到 `data/takedown.txt`，运行 `python3 scripts/extract_sources.py && python3 scripts/build_index.py`，提交后关闭本 issue。名单永久保留，以后重新提取也不会再收录。
