#!/usr/bin/env python3
"""Download + sha256-verify local TTS models listed in models.json (original code for ai-video-prompt-hub/animator).

usage: python3 fetch_models.py [kokoro] [melo] [aishell3] [whisper-small] [--dir DIR] [--list]
Default: kokoro + whisper-small. Models go to $HDA_MODELS (default ~/.cache/hda-models); nothing is committed to git.
"""
import hashlib, json, os, sys, tarfile, urllib.request

HERE = os.path.dirname(os.path.abspath(__file__))
MANIFEST = json.load(open(os.path.join(HERE, "models.json"), encoding="utf-8"))["models"]


def model_root(cli=None):
    return os.path.abspath(os.path.expanduser(cli or os.environ.get("HDA_MODELS") or "~/.cache/hda-models"))


def sha256(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for b in iter(lambda: f.read(1 << 20), b""):
            h.update(b)
    return h.hexdigest()


def download(url, dest, expect):
    if os.path.exists(dest) and sha256(dest) == expect:
        return
    tmp = dest + ".part"
    print(f"  下载 {url}", file=sys.stderr)
    with urllib.request.urlopen(url) as r, open(tmp, "wb") as f:
        total, got = int(r.headers.get("Content-Length") or 0), 0
        while True:
            b = r.read(1 << 20)
            if not b:
                break
            f.write(b); got += len(b)
            if total:
                print(f"\r  {got * 100 // total:3d}%  {got >> 20}/{total >> 20} MB", end="", file=sys.stderr)
    print(file=sys.stderr)
    got = sha256(tmp)
    if got != expect:
        os.remove(tmp)
        raise SystemExit(f"校验失败 {url}\n  期望 {expect}\n  实际 {got}")
    os.replace(tmp, dest)


def ensure(name, root=None):
    """Return the directory of an installed model, downloading + verifying it first if needed."""
    m = MANIFEST[name]
    root = model_root(root)
    os.makedirs(root, exist_ok=True)
    d = os.path.join(root, m["dir"])
    ok = os.path.join(d, ".hda-verified")
    if os.path.exists(ok):
        return d
    print(f"[models] 准备 {m['name']}（许可：{m['license']}）", file=sys.stderr)
    if "url" in m:
        arc = os.path.join(root, os.path.basename(m["url"]))
        download(m["url"], arc, m["sha256"])
        with tarfile.open(arc, "r:*") as t:
            kw = {"filter": "data"} if hasattr(tarfile, "data_filter") else {}
            t.extractall(root, **kw)
        os.remove(arc)
    else:
        os.makedirs(d, exist_ok=True)
        for fn, h in m["files"].items():
            download(f"https://huggingface.co/{m['hf_repo']}/resolve/{m['revision']}/{fn}", os.path.join(d, fn), h)
    with open(ok, "w") as f:
        f.write(m.get("sha256", m.get("revision", "")) + "\n")
    return d


if __name__ == "__main__":
    args = sys.argv[1:]
    root = None
    if "--dir" in args:
        i = args.index("--dir"); root = args[i + 1]; del args[i:i + 2]
    if "--list" in args:
        for k, m in MANIFEST.items():
            st = "已安装" if os.path.exists(os.path.join(model_root(root), m["dir"], ".hda-verified")) else "未安装"
            print(f"{k:14s} {st}  {m['name']}  许可：{m['license']}")
        sys.exit(0)
    for n in args or ["kokoro", "whisper-small"]:
        if n not in MANIFEST:
            sys.exit(f"未知模型 {n}；可选：{', '.join(MANIFEST)}")
        print(ensure(n, root))
