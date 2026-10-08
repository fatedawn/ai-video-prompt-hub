# 安全说明 · Security

## 不要提交任何密钥

本仓库**不提供、不保管任何 API key**。`videogen/` 和 TTS 工具只从环境变量或本地 `.env` 文件读取密钥：

1. `cp .env.example .env`，在 `.env` 里填你自己的 key；
2. `.env` 与 `.env.*` 已在 `.gitignore` 中忽略（只有 `.env.example` 会被提交，里面只有变量名、没有值）；
3. 提交前请自查：`git diff --cached | grep -nE "(sk-|ghp_|gho_|AKIA|AIza|xox[bp]-)"`；更彻底的检查可用 [gitleaks](https://github.com/gitleaks/gitleaks)：`gitleaks git --redact`。

如果不小心把 key 推送到了公开仓库：**立即在服务商后台吊销并轮换该 key**（删除提交不能让已泄露的 key 失效），然后再清理提交。

## 报告安全问题

发现漏洞（例如脚本会泄露密钥、执行不受信任的输入）时，请优先通过 GitHub 的 **Security → Report a vulnerability**（私密报告）联系维护者；不方便时再开 issue，但不要在公开 issue 里贴出任何密钥或可利用细节。

## 范围说明

- 渲染、TTS、视频生成都在你自己的机器或你自己的 API 账号上运行；本仓库不收集任何数据。
- `animator/tts/fetch_models.py` 下载模型时逐个校验 `animator/tts/models.json` 中的 sha256。
