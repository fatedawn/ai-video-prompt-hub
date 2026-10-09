#!/usr/bin/env python3
"""Download + sha256-verify the depth model(s) listed in models.json.
Original code for ai-video-prompt-hub/stills2video (Apache-2.0, (c) 2026 天机).

usage: python3 fetch_models.py [name ...] [--dir DIR] [--list]
Default: the model marked "default" (Depth-Anything-V2-Small, int8 quantised, ~26 MB, Apache-2.0).
Files go to $HDA_MODELS (default ~/.cache/hda-models); nothing is written into the git repo.
"""
import hashlib, json, os, sys, urllib.request

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


def model_path(name=None, root=None):
    name = name or next(k for k, v in MANIFEST.items() if v.get("default"))
    m = MANIFEST[name]
    return os.path.join(model_root(root), m["dir"], m["file"])


def ensure(name=None, root=None, quiet=False):
    name = name or next(k for k, v in MANIFEST.items() if v.get("default"))
    m = MANIFEST[name]
    dest = model_path(name, root)
    if os.path.exists(dest) and sha256(dest) == m["sha256"]:
        return dest
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    tmp = dest + ".part"
    if not quiet:
        print(f"  下载 {name}（{m['size_mb']} MB，{m['license']}）\n  {m['url']}", file=sys.stderr)
    with urllib.request.urlopen(m["url"]) as r, open(tmp, "wb") as f:
        total, got = int(r.headers.get("Content-Length") or 0), 0
        while True:
            b = r.read(1 << 20)
            if not b:
                break
            f.write(b); got += len(b)
            if total and not quiet:
                print(f"\r  {got * 100 // total:3d}%  {got >> 20}/{total >> 20} MB", end="", file=sys.stderr)
    if not quiet:
        print(file=sys.stderr)
    got = sha256(tmp)
    if got != m["sha256"]:
        os.remove(tmp)
        raise SystemExit(f"sha256 不匹配：{name}\n  期望 {m['sha256']}\n  实际 {got}")
    os.replace(tmp, dest)
    return dest


def main(argv):
    root = None
    names = []
    it = iter(argv)
    for a in it:
        if a == "--dir":
            root = next(it)
        elif a == "--list":
            for k, v in MANIFEST.items():
                p = model_path(k, root)
                print(f"{k:28s} {v['size_mb']:>4} MB  {v['license']}  {'✓ 已下载' if os.path.exists(p) else '—'}  {p}")
            return
        else:
            names.append(a)
    for n in names or [None]:
        if n and n not in MANIFEST:
            raise SystemExit(f"未知模型 {n}（可选：{', '.join(MANIFEST)}）")
        print(ensure(n, root))


if __name__ == "__main__":
    main(sys.argv[1:])
