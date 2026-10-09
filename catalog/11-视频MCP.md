<!-- 本文件由 `node router/cli.mjs build-catalog` 从 catalog/registry.json 生成，请改 registry.json 后重新生成 -->

# 视频 MCP（7 个活跃 · 1 个历史）

和视频生成、配音、工作流相关的 MCP 服务器，以及 mcp.film 这个「MCP 目录」本身（我们不内置它的数据）。非官方、可能违反平台条款的接口服务器不收录。

> 数据核验于 2026-10-09（GitHub API）；★ 与日期会变化。只推荐 2026-01-01 之后仍有推送、未归档的项目；之前停更或已归档的放在页尾「历史 / 不再推荐」。许可证以仓库 LICENSE 原文为准，⚠️ 标记的条目商用前务必阅读原许可证。

| 项目 | ★ | 最近推送 | 许可 | 简介 | 最适合（题材） | 强项 | 我们吸收了什么 | 怎么用 | 路线 | 成本 | 中文 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| [MiniMax-AI/MiniMax-MCP](https://github.com/MiniMax-AI/MiniMax-MCP) | 1583 | 2026-08-20 | MIT | MiniMax 官方 MCP：语音、克隆、图像、海螺视频、音乐。调用需要你自己的 API key | Agent 调海螺视频 / 配音 | MiniMax 官方 MCP，语音克隆和视频一站式 | — | 路线② videogen：与 videogen 的 minimax provider 同类，走 MCP 而不是本仓库 CLI；key 不要写进仓库 | B-videogen | API key | 中英 |
| [joenorton/comfyui-mcp-server](https://github.com/joenorton/comfyui-mcp-server) | 407 | 2026-02-17 | Apache-2.0 | 本地 ComfyUI 的 MCP 服务器，Apache-2.0，用来提交和查看工作流 | 让 Agent 通过 MCP 调用 | 本地 ComfyUI 的 MCP 服务器，Apache-2.0，用来提交和查看工作流（需要自己的显卡） | — | 路线② videogen：目录里另有其他 ComfyUI MCP；选一个即可，不要同时把 key 或工作流密钥提交到 git | B-videogen | GPU | 英文 |
| [artokun/comfyui-mcp-panel](https://github.com/artokun/comfyui-mcp-panel) | 125 | 2026-10-05 | MIT | ComfyUI 侧边面板，让 Claude 或 ChatGPT 订阅里的 Agent 直接驱动本地 ComfyUI | 让 Agent 通过 MCP 调用 | ComfyUI 侧边面板，让 Claude 或 ChatGPT 订阅里的 Agent 直接驱动本地 ComfyUI（需要自己的显卡） | — | 路线② videogen：和 stills2video 互补：Agent 在面板里调工作流，批量出片仍可用 stills2video render --backend comfyui | B-videogen S-stills | GPU/Agent额度 | 英文 |
| [luminarylane/fal-mcp-server](https://github.com/luminarylane/fal-mcp-server) | 58 | 2026-05-04 | MIT | 社区版 fal MCP，用 fal 的密钥调用其视频/图像模型 | 让 Agent 通过 MCP 调用 | 社区版 fal MCP，用 fal 的密钥调用其视频/图像模型（需要 API key） | — | 路线② videogen：videogen 已有 fal provider；这是 MCP 形态的同类入口 | B-videogen | API key | 英文 |
| [AceDataCloud/SeedanceMCP](https://github.com/AceDataCloud/SeedanceMCP) | 20 | 2026-10-08 | MIT<br><sub>MIT 只覆盖这个 MCP 代码。生成服务的条款以 AceData / 模型提供方为准。</sub> | 第三方 Seedance API 的 MCP 封装，需要该服务的 key，不是字节官方客户端 | 让 Agent 通过 MCP 调用 | 第三方 Seedance API 的 MCP 封装，需要该服务的 key，不是字节官方客户端（需要 API key） | — | 路线② videogen：没有官方 API、又接受第三方中转时的选项；key 放在你自己的环境变量里 | B-videogen | API key | 英文 |
| [c47-inc/mcp-film](https://github.com/c47-inc/mcp-film) | 6 | 2026-10-08 | MIT | mcp.film：影视相关 MCP 服务器的目录站点，不是我们内置的数据。这里只收录这个目录本身 | 让 Agent 通过 MCP 调用 | mcp.film：影视相关 MCP 服务器的目录站点，不是我们内置的数据（免费 CPU 可跑） | — | 方法论 skill：要找更多影视 MCP 时去它的目录检索；本仓库不厂商化（vendor）它的 registry | M-method | 免费CPU | 英文 |
| [runwayml/runway-mcp-plugin](https://github.com/runwayml/runway-mcp-plugin) | 3 | 2026-09-11 | MIT | Runway 官方 MCP 插件，给 Cursor 等客户端调用 Runway，需要 Runway 账号 | 让 Agent 通过 MCP 调用 | Runway 官方 MCP 插件，给 Cursor 等客户端调用 Runway，需要 Runway 账号（需要 API key） | — | 路线② videogen：官方插件，优先于非官方中转；本目录不代跑、不保存密钥 | B-videogen | API key | 英文 |

<details>
<summary>历史 / 不再推荐（1 个：2026-01-01 之后没有推送或已归档；router 与 MCP 默认不推荐，加 include_stale 可查）</summary>

| 项目 | ★ | 最后推送 | 原因 | 许可 | 简介 |
|---|---|---|---|---|---|
| [ATH-MaaS/Pixelle-MCP](https://github.com/ATH-MaaS/Pixelle-MCP) | 1127 | 2025-12-17 | 2026 年前停更 | MIT | 把 ComfyUI 工作流暴露成 MCP 工具，在本地图/视频工作流上给 Agent 用 |

</details>

[← 返回目录](README.md) · [项目用途地图](../docs/%E9%A1%B9%E7%9B%AE%E7%94%A8%E9%80%94%E5%9C%B0%E5%9B%BE.md)
