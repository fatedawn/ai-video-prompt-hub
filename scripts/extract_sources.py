#!/usr/bin/env python3
"""Extract PUBLIC prompt texts from local clones of the upstream repos into prompts/ and templates/.

Usage:  python3 scripts/extract_sources.py [--src /path/to/clones] [--official /path/to/official_guide_txts]
Only sources whose license permits redistribution (MIT / CC BY 4.0) are parsed. Prompt text is copied
verbatim (whitespace / Markdown-fence normalization only). No images/GIFs/videos are copied.
Prompts that look copied from the all-rights-reserved Volcengine Seedance guides are held back (metadata only).
After extraction run scripts/build_index.py.
"""
import argparse, hashlib, json, os, re, shutil, subprocess, sys
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import quote

sys.path.insert(0, str(Path(__file__).resolve().parent))
from hub_common import (normalize_ws, iter_fences, write_front_matter, detect_lang, norm_for_dedup, slugify,
                        fence_for, LANG_LABEL)
from classify import classify, folder_for, TEMPLATE_HINTS

ROOT = Path(__file__).resolve().parent.parent
CC_BY = "https://creativecommons.org/licenses/by/4.0/"
CHANGES = "仅做提取与空白/Markdown 代码块格式规范化，提示词文字未做任何改动（含错别字）；未收录任何图片/视频。"

SOURCES = {
    "youmind": dict(repo="YouMind-OpenLab/awesome-seedance-2-prompts", dir="YouMind-OpenLab_awesome-seedance-2-prompts",
                    license="CC-BY-4.0", license_url=CC_BY, copyright="Copyright (c) 2025 YouMind OpenLab"),
    "learnprompt": dict(repo="LearnPrompt/awesome-seedance", dir="LearnPrompt_awesome-seedance",
                        license="MIT (code) / CC-BY-4.0 (curation)", license_url=CC_BY, copyright="Copyright (c) 2026 LearnPrompt"),
    "zerolu": dict(repo="ZeroLu/awesome-seedance", dir="ZeroLu_awesome-seedance", license="MIT",
                   license_url="https://opensource.org/license/mit", copyright="Copyright (c) 2026 ZeroLu"),
    "emily": dict(repo="Emily2040/seedance-2.0", dir="Emily2040_seedance-2.0", license="MIT",
                  license_url="https://opensource.org/license/mit", copyright="Copyright (c) 2026 Iamemily2050 (@iamemily2050)"),
    "dexhunter": dict(repo="dexhunter/seedance2-skill", dir="dexhunter_seedance2-skill", license="MIT",
                      license_url="https://opensource.org/license/mit", copyright="Copyright (c) 2026 Dex (i@dex.moe)"),
    "manju": dict(repo="lixiaoxiao9888-create/manju-laoli-skill", dir="lixiaoxiao9888-create_manju-laoli-skill", license="MIT",
                  license_url="https://opensource.org/license/mit", copyright="Copyright (c) 2026 Short-Drama Director Suite contributors"),
    "toonflow": dict(repo="HBAI-Ltd/Toonflow-app", dir="HBAI-Ltd_Toonflow-app", license="MIT",
                     license_url="https://opensource.org/license/mit", copyright="Copyright (c) 2026 HBAI-Ltd"),
}
PRIORITY = ["youmind", "learnprompt", "zerolu", "emily", "dexhunter", "manju"]


def git_head(d):
    return subprocess.check_output(["git", "-C", str(d), "rev-parse", "HEAD"], text=True).strip()


class Ctx:
    def __init__(self, src):
        self.src = Path(src)
        for k, s in SOURCES.items():
            s["path"] = self.src / s["dir"]
            s["commit"] = git_head(s["path"])

    def url(self, key, rel, line=None):
        s = SOURCES[key]
        u = f"https://github.com/{s['repo']}/blob/{s['commit']}/{quote(rel)}"
        return u + (f"#L{line}" if line else "")

    def read(self, key, rel):
        return (SOURCES[key]["path"] / rel).read_text(encoding="utf-8")


def base_record(key, ctx, rel, line, title, prompt, **kw):
    s = SOURCES[key]
    r = dict(source_key=key, source_repo=s["repo"], source_url=ctx.url(key, rel, line), source_file=rel, source_line=line,
             license=s["license"], license_url=s["license_url"], title=title, title_en=None, description=None, model="",
             prompt=normalize_ws(prompt), variants=[], tags=[], original_author=None, original_author_url=None,
             original_post_url=None, published=None, third_party_author=False, flags=[], source_page=None, hints="",
             kind="prompt")
    r.update(kw)
    return r


# ----------------------------------------------------------------- YouMind
YM_LANG = {"English": "en", "中文": "zh", "日本語": "ja"}
YM_FILE = {"en": "README.md", "zh": "README_zh.md", "ja": "README_ja-JP.md"}


def parse_youmind_text(text_all):
    lines = text_all.split("\n")
    heads = [i for i, l in enumerate(lines) if l.startswith("### ")]
    out = {}
    for k, h in enumerate(heads):
        end = heads[k + 1] if k + 1 < len(heads) else len(lines)
        for j in range(h + 1, end):
            if lines[j].startswith("## "):
                end = j
                break
        block = lines[h:end]
        text = "\n".join(block)
        idm = re.search(r"seedance-2-0-prompts\?id=(\d+)", text)
        fences = list(iter_fences(block))
        if not idm or not fences:
            continue
        o, c, info, content = fences[0]
        title = re.sub(r"^### (No\. \d+: )?", "", block[0]).strip()
        lang = re.search(r"lang-([^-]+)-", text)
        desc = None
        for j, l in enumerate(block[:o]):
            if l.startswith("> "):
                desc = l[2:].strip(); break
            if l.startswith("#### ") and ("📖" in l):
                nxt = [x for x in block[j + 1:o] if x.strip() and not x.startswith("####")]
                desc = nxt[0].strip() if nxt else None; break
        links = re.findall(r"\*\*([^*\[\]]+?)[:：]\*\*\s*\[([^\]]*)\]\(([^)\s]*)\)", text)
        pub = re.search(r"\*\*[^*\[\]]+?[:：]\*\*\s*((?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2}, \d{4})", text)
        out[idm.group(1)] = dict(title=title, lang=YM_LANG.get(lang.group(1)) if lang else None, desc=desc,
                                 prompt="\n".join(content), line=h + 1, author=links[0] if links else None,
                                 source=links[1] if len(links) > 1 else None, published=pub.group(1) if pub else None,
                                 page=re.search(r"\((https://youmind\.com/[^)]*seedance-2-0-prompts\?id=\d+)\)", text).group(1))
    return out


def parse_youmind_readme(ctx, rel):
    out = parse_youmind_text(ctx.read("youmind", rel))
    for v in out.values():
        v["commit"] = SOURCES["youmind"]["commit"]
    return out


def youmind_history(repo, rel, head_commit):
    """YouMind regenerates its README several times a day from its CMS and shows a different set of 100 prompts each
    time. Every committed version is published under the repo's CC BY 4.0 licence, so we walk the README history (newest
    first) and keep, per prompt id, the most recent committed version, with a permalink to that commit."""
    G = ["git", "-C", str(repo)]
    commits = [l.split() for l in subprocess.check_output(G + ["log", "--format=%H", head_commit, "--", rel], text=True).split("\n") if l]
    shas = subprocess.run(G + ["cat-file", "--batch-check"], input="\n".join(f"{c[0]}:{rel}" for c in commits),
                          capture_output=True, text=True).stdout.split("\n")
    out, seen_blobs = {}, set()
    for (c,), line in zip(commits, shas):
        if not line or "missing" in line:
            continue
        blob = line.split()[0]
        if blob in seen_blobs:
            continue
        seen_blobs.add(blob)
        for pid, v in parse_youmind_text(subprocess.check_output(G + ["cat-file", "-p", blob], text=True)).items():
            if pid not in out:
                v["commit"] = c
                out[pid] = v
    return out


def ym_url(rel, commit, line):
    return f"https://github.com/{SOURCES['youmind']['repo']}/blob/{commit}/{quote(rel)}#L{line}"


def extract_youmind(ctx, history=None):
    head = SOURCES["youmind"]["commit"]
    if history:
        per = {lang: youmind_history(history, f, head) for lang, f in YM_FILE.items()}
    else:
        per = {lang: parse_youmind_readme(ctx, f) for lang, f in YM_FILE.items()}
    recs = []
    for pid, en in per["en"].items():
        olang = en["lang"] or "en"
        prim = per[olang].get(pid) or en
        prim_file = YM_FILE[olang] if pid in per[olang] else "README.md"
        zh = per["zh"].get(pid)
        r = base_record("youmind", ctx, prim_file, prim["line"],
                        (zh or en)["title"], prim["prompt"], title_en=en["title"], description=(zh or en)["desc"],
                        model="Seedance 2.0", published=en["published"], source_page=en["page"])
        r["source_url"] = ym_url(prim_file, prim["commit"], prim["line"])
        r["source_commit"] = prim["commit"]
        r["in_current_readme"] = prim["commit"] == head
        # trust YouMind's language badge, except when the text is plainly English (some badges say 中文/日本語 for English prompts)
        r["language"] = "en" if olang != "en" and detect_lang(prim["prompt"]) == "en" else olang
        r["id"] = f"youmind-{pid}"
        for vl in ("zh", "en"):
            if vl != olang and per[vl].get(pid):
                v = per[vl][pid]
                r["variants"].append(dict(language=vl, label=f"YouMind 提供的{LANG_LABEL[vl]}版本（{YM_FILE[vl]}）",
                                          text=normalize_ws(v["prompt"]), source_url=ym_url(YM_FILE[vl], v["commit"], v["line"])))
        a = en["author"]
        if a:
            r.update(original_author=a[1], original_author_url=a[2], third_party_author=True)
        if en["source"]:
            r["original_post_url"] = en["source"][2]
        if not a or not en["source"]:
            r["flags"].append("no_traceable_original_post")
        r["tags"] = ["Seedance 2.0", "YouMind"]
        recs.append(r)
    return recs


# ----------------------------------------------------------------- LearnPrompt (goodcase.ai export)
def extract_learnprompt(ctx):
    rel = "data/cases.json"
    raw = ctx.read("learnprompt", rel)
    lines = raw.split("\n")
    slug_line = {}
    for i, l in enumerate(lines):
        m = re.match(r'\s*"slug": "([^"]+)"', l)
        if m and m.group(1) not in slug_line:
            slug_line[m.group(1)] = i + 1
    cases = json.loads(raw)["cases"]
    tax = json.loads(ctx.read("learnprompt", "data/case-taxonomy.json"))["assignments"]
    recs = []
    for c in cases:
        models = [m for m in c["models"]]
        smodels = [m for m in models if m.startswith("Seedance")]
        model = ", ".join(models) if any(m != "Seedance" for m in models) else "Seedance（版本未注明）"
        if smodels == ["Seedance"] and len(models) > 1:
            model = "Seedance（版本未注明）, " + ", ".join(m for m in models if m != "Seedance")
        tmpl = tax.get(c["slug"])
        tags = [t for t in c["tags"] if t not in ("human-reviewed", "x") and not t.lower().startswith("seedance")]
        if tmpl:
            tags.append(f"template:{tmpl}")
        r = base_record("learnprompt", ctx, rel, slug_line.get(c["slug"]), c["title"], c["promptFull"],
                        title_en=c.get("titleEn"), description=c.get("summary"), model=model, tags=tags,
                        original_author=c.get("creator") or None, original_post_url=c.get("sourceUrl") or None,
                        published=(c.get("sourcePublishedAt") or "")[:10] or None, source_page=c.get("goodcaseUrl"),
                        third_party_author=True, hints=TEMPLATE_HINTS.get(tmpl or "", ""))
        r["license"] = "CC-BY-4.0 (curation) — prompt © original creator"
        r["id"] = f"goodcase-{c['slug']}"
        if not c.get("creator") or not c.get("sourceUrl"):
            r["flags"].append("no_traceable_original_post")
        recs.append(r)
    return recs


# ----------------------------------------------------------------- ZeroLu
ZL_SKIP_LABEL = re.compile(r"(Post Text|Key Text|帖子文案|要点)", re.I)
ZL_SECTION_HINT = {"6": "短剧 drama", "5": "anime animation", "2": "commercial 广告", "4": "ugc vlog 写实", "7": "", "1": "", "3": "meme"}


def parse_zerolu_source(s):
    s = s.strip().strip("*").strip()
    s = re.sub(r"^(Source|来源)[:：]\s*", "", s)
    m = re.match(r"(.*?)\s*\(\[(@[^\]]+)\]\(([^)]+)\)\)\s*(?:-\s*\[[^\]]+\]\(([^)]+)\))?\s*$", s)
    if m:
        return dict(author=f"{m.group(1).strip()} ({m.group(2)})", author_url=m.group(3), post=m.group(4))
    m = re.match(r"(.*?)\s*-\s*\[([^\]]+)\]\(([^)]+)\)\s*$", s)
    if m:
        return dict(author=m.group(1).strip(), author_url=None, post=m.group(3))
    return dict(author=s or None, author_url=None, post=None)


def extract_zerolu_readme(ctx, rel, lang):
    lines = ctx.read("zerolu", rel).split("\n")
    recs = []
    sec_num = None
    heads = [i for i, l in enumerate(lines) if l.startswith("### ") or l.startswith("## ")]
    for k, h in enumerate(heads):
        if lines[h].startswith("## "):
            m = re.match(r"## (\d+)\.", lines[h]); sec_num = m.group(1) if m else None
            continue
        if re.match(r"### (Sponsor|赞助)", lines[h]):
            continue
        end = heads[k + 1] if k + 1 < len(heads) else len(lines)
        block = lines[h:end]
        title = re.sub(r"^###\s*[\d.]+\s*", "", block[0]).strip()
        desc = next((l.strip("*_ ").strip() for l in block[1:4] if re.match(r"^[*_][^*]", l.strip())), None)
        src_line = next((l for l in block if re.match(r"^\*(Source|来源)[:：]", l.strip())), None)
        src = parse_zerolu_source(src_line) if src_line else dict(author=None, author_url=None, post=None)
        for o, c, info, content in iter_fences(block):
            label = next((block[j].strip() for j in range(o - 1, -1, -1) if block[j].strip()), "")
            if ZL_SKIP_LABEL.search(label):
                continue
            lab = re.sub(r"^\*\*(.+?)[:：]?\*\*[:：]?$", r"\1", label).strip()
            t = title if re.match(r"^(Prompt|提示词)$", lab) or not label.startswith("**") else f"{title}：{lab}"
            r = base_record("zerolu", ctx, rel, h + o + 2, t, "\n".join(content), description=desc,
                            model="Seedance 2.0", original_author=src["author"], original_author_url=src["author_url"],
                            original_post_url=src["post"], third_party_author=bool(src["author"]),
                            hints=ZL_SECTION_HINT.get(sec_num or "", ""))
            r["language"] = detect_lang(r["prompt"])
            r["_readme_lang"] = lang
            if not src["post"]:
                r["flags"].append("no_traceable_original_post")
            recs.append(r)
    return recs


def extract_zerolu(ctx):
    zh = extract_zerolu_readme(ctx, "README-zh.md", "zh")
    en = extract_zerolu_readme(ctx, "README.md", "en")
    # commercial-use-cases.md (WeChat article digest)
    rel = "prompts/commercial-use-cases.md"
    lines = ctx.read("zerolu", rel).split("\n")
    head = next(l for l in lines if l.startswith("> 来源"))
    src = parse_zerolu_source(head.lstrip("> ").replace("来源：", ""))
    sec_title = None
    extra = []
    for o, c, info, content in iter_fences(lines):
        sec = next((lines[j] for j in range(o, -1, -1) if lines[j].startswith("## ")), None)
        label = next((lines[j].strip() for j in range(o - 1, -1, -1) if lines[j].strip()), "")
        if "提示词" not in label:
            continue
        t = re.sub(r"^##\s*\d+\.\s*", "", sec).strip()
        r = base_record("zerolu", ctx, rel, o + 2, t, "\n".join(content), model="Seedance 2.0",
                        original_author=src["author"], original_post_url=src["post"], third_party_author=True)
        r["language"] = detect_lang(r["prompt"])
        extra.append(r)
    # pair zh/en versions that cite the same unique X status URL
    def key(r):
        p = r["original_post_url"] or ""
        return p.split("?")[0] if "/status/" in p else None
    zc = defaultdict(list); ec = defaultdict(list)
    for r in zh: zc[key(r)].append(r)
    for r in en: ec[key(r)].append(r)
    out = []
    used_en = set()
    for r in zh:
        k = key(r)
        if k and len(zc[k]) == 1 and len(ec.get(k, [])) == 1:
            e = ec[k][0]; used_en.add(id(e))
            if norm_for_dedup(e["prompt"]) != norm_for_dedup(r["prompt"]):
                r["variants"].append(dict(language=e["language"], label=f"ZeroLu 英文 README 中的版本（README.md）",
                                          text=e["prompt"], source_url=e["source_url"]))
            r["title_en"] = e["title"]
            r["flags"].append("upstream_does_not_say_which_language_is_original")
        out.append(r)
    out += [e for e in en if id(e) not in used_en] + extra
    for i, r in enumerate(out):
        r["id"] = "zerolu-" + hashlib.sha1((r["source_url"]).encode()).hexdigest()[:8]
        r["tags"] = ["Seedance 2.0"]
    return out


# ----------------------------------------------------------------- Emily2040 (repo author's own examples)
EMILY_AUTHOR = "Iamemily2050 (@iamemily2050)"


def emily_rec(ctx, rel, line, title, prompt, **kw):
    r = base_record("emily", ctx, rel, line, title, prompt, original_author=EMILY_AUTHOR,
                    original_author_url="https://github.com/Emily2040", model="Seedance 2.0", **kw)
    r["language"] = detect_lang(r["prompt"])
    r["tags"] = ["Seedance 2.0"] + kw.pop("extra_tags", []) if False else ["Seedance 2.0"]
    return r


def extract_emily(ctx):
    recs = []
    # 1) front-page clips (data/front-page-clips.json)
    rel = "data/front-page-clips.json"
    raw = ctx.read("emily", rel); lines = raw.split("\n")
    for c in json.loads(raw)["clips"]:
        ln = next((i + 1 for i, l in enumerate(lines) if f'"id": "{c["id"]}"' in l), None)
        r = emily_rec(ctx, rel, ln, c["title"], c["prompt"], description=c.get("premise"))
        r["tags"] += [f"{c.get('duration_seconds')}s", c.get("aspect") or ""]
        recs.append(r)
    # 2) whole-line inline-code examples: `...` or **Label:** `...`
    inline_files = ["references/prompt-examples.md", "references/examples-by-mode.md",
                    "references/multilingual-community-examples.md", "skills/seedance-examples-zh/SKILL.md",
                    "skills/seedance-examples-ja/SKILL.md", "skills/seedance-examples-ko/SKILL.md"]
    for rel in inline_files:
        lines = ctx.read("emily", rel).split("\n")
        heading = None; pending_label = None
        for i, l in enumerate(lines):
            if l.startswith("#"):
                heading = l.lstrip("# ").strip(); pending_label = None; continue
            m = re.match(r"^\*\*([^*]+?)[:：]?\*\*[:：]?\s*`([^`]{60,})`\s*$", l)
            m2 = re.match(r"^`([^`]{60,})`\s*$", l)
            if re.match(r"^\*\*[^*]+\*\*\s*$", l.strip()):
                pending_label = l.strip().strip("*").strip(); continue
            if m:
                t = f"{heading}：{m.group(1)}" if heading and heading not in ("Safe Example Patterns",) else m.group(1)
                recs.append(emily_rec(ctx, rel, i + 1, t, m.group(2)))
            elif m2:
                t = f"{heading}：{pending_label}" if pending_label else heading
                recs.append(emily_rec(ctx, rel, i + 1, t, m2.group(1)))
            pending_label = None if (m or m2) else pending_label
    # 3) example cards with ```text blocks after **Prompt:**
    for rel in ["references/performance-example-cards.md", "references/product-example-cards.md",
                "references/continuity-example-cards.md"]:
        lines = ctx.read("emily", rel).split("\n")
        for o, c, info, content in iter_fences(lines):
            head = next((lines[j] for j in range(o, -1, -1) if lines[j].startswith("## ")), "")
            recs.append(emily_rec(ctx, rel, o + 2, re.sub(r"^## (Card: )?", "", head).strip(), "\n".join(content)))
    # 4) golden prompts + standalone/sequence clip prompts (plain paragraphs)
    import glob
    base = SOURCES["emily"]["path"]
    for path in sorted(glob.glob(str(base / "examples/golden-prompts/*.md"))):
        rel = os.path.relpath(path, base); lines = Path(path).read_text().split("\n")
        try:
            s = lines.index("## Compiled Natural-Language Prompt")
        except ValueError:
            continue
        e = next((j for j in range(s + 1, len(lines)) if lines[j].startswith("## ")), len(lines))
        title = lines[0].lstrip("# ").replace("Golden Prompt: ", "").strip()
        recs.append(emily_rec(ctx, rel, s + 2, f"Golden Prompt：{title}", "\n".join(lines[s + 1:e])))
    for rel in ["examples/standalone-clip/prompt.md", "examples/sequence-airport-arrival/clip-01-prompt.md",
                "examples/sequence-airport-arrival/clip-02-prompt.md"]:
        p = base / rel
        if not p.exists():
            continue
        lines = p.read_text().split("\n")
        body = [l for l in lines[1:]]
        recs.append(emily_rec(ctx, rel, 3, lines[0].lstrip("# ").strip() + f"（{Path(rel).parent.name}）", "\n".join(body)))
    for r in recs:
        r["id"] = "emily-" + hashlib.sha1(r["source_url"].encode()).hexdigest()[:8]
    return [r for r in recs if len(r["prompt"]) >= 40]


# ----------------------------------------------------------------- dexhunter
DEX_EN_TPL = {"Template: Product Ad (15s)": "模版：产品广告片（15秒）", "Template: Short Drama (15s)": "模版：短剧片段（15秒）",
              "Template: Dance Video (13s)": "模版：舞蹈视频（13秒）", "Template: Scenery Montage with Music (15s)": "模版：风光卡点剪辑（15秒）"}


def dex_blocks(ctx, rel, sections):
    lines = ctx.read("dexhunter", rel).split("\n")
    out = []
    for o, c, info, content in iter_fences(lines):
        sec = next((lines[j] for j in range(o, -1, -1) if lines[j].startswith("## ")), "")
        # only the template blocks directly under "### A9.1" and "### A9.2 > #### A9.2.0" are taken;
        # the "#### A9.2.1 Timeline 写法" illustration and blocks under later "## A10" headings are skipped
        h3 = next((lines[j] for j in range(o, -1, -1) if re.match(r"#{1,6} ", lines[j])), "")
        if not any(s in sec for s in sections):
            continue
        out.append(dict(h3=h3[4:].strip(), line=o + 2, text="\n".join(content)))
    return out


def extract_dexhunter(ctx):
    zh = dex_blocks(ctx, "zh/SKILL.md", ["各场景提示词模式", "提示词模版库", "提示词结构模版"])
    en = dex_blocks(ctx, "SKILL.md", ["Capability-Specific Prompt Patterns", "Example Prompt Templates", "Prompt Structure Blueprint"])
    def k_zh(b):
        m = re.match(r"(\d+)\.", b["h3"]); return ("n", m.group(1)) if m else ("t", b["h3"])
    def k_en(b):
        m = re.match(r"(\d+)\.", b["h3"]); return ("n", m.group(1)) if m else ("t", DEX_EN_TPL.get(b["h3"], b["h3"]))
    idx = defaultdict(int); en_map = {}
    for b in en:
        k = k_en(b); en_map[(k, idx[k])] = b; idx[k] += 1
    idx = defaultdict(int); recs = []
    used = set()
    for b in zh:
        k = k_zh(b); kk = (k, idx[k]); idx[k] += 1
        r = base_record("dexhunter", ctx, "zh/SKILL.md", b["line"], b["h3"] + (f"（{kk[1]+1}）" if kk[1] else ""), b["text"],
                        model="Seedance 2.0", original_author="Dex (dexhunter)", original_author_url="https://github.com/dexhunter")
        r["language"] = detect_lang(r["prompt"])
        if kk in en_map:
            e = en_map[kk]; used.add(kk)
            r["title_en"] = e["h3"]
            r["variants"].append(dict(language="en", label="dexhunter 英文版 SKILL.md 中的对应版本",
                                      text=normalize_ws(e["text"]), source_url=ctx.url("dexhunter", "SKILL.md", e["line"])))
        recs.append(r)
    for kk, e in en_map.items():
        if kk not in used:
            r = base_record("dexhunter", ctx, "SKILL.md", e["line"], e["h3"], e["text"], model="Seedance 2.0",
                            original_author="Dex (dexhunter)", original_author_url="https://github.com/dexhunter")
            r["language"] = detect_lang(r["prompt"]); recs.append(r)
    for r in recs:
        r["id"] = "dexhunter-" + hashlib.sha1(r["source_url"].encode()).hexdigest()[:8]
        r["tags"] = ["Seedance 2.0"]
    return recs


# ----------------------------------------------------------------- manju-laoli (MIT): curated examples + templates
MANJU_PREFIX = "short-drama-director/references/"
MANJU_PICKS = [  # (file, fence line (1-based), kind, title)
    ("action-cinematography-breakdown.md", 98, "prompt", "长运镜聚合标准范例（16:9 · 15s · 高密度节奏版）"),
    ("anime-ultimate-vfx-paradigm.md", 92, "prompt", "去水化工业范例（16:9 横屏 10s 大招 · Seedance 2.5）"),
    ("model-adapters.md", 70, "prompt", "Seedance 2.5 三层解耦提示词投喂范式（示例）"),
    ("seedance-render-engine.md", 47, "prompt", "微步进示例（居合拔刀斩 5s）"),
    ("vo-os-weaving.md", 55, "prompt", "OS（内心独白）镜行示例"),
    ("vo-os-weaving.md", 67, "prompt", "VO（旁白/画外音）镜行示例"),
    ("model-adapters.md", 238, "prompt", "语气位语法镜行示例"),
    ("anime-ultimate-vfx-paradigm.md", 67, "template", "15 秒大招三段式标准输出模板"),
    ("seedance-render-engine.md", 103, "template", "七段式 16:9 横屏标准模板（电影级宽银幕）"),
    ("seedance-render-engine.md", 130, "template", "七段式 9:16 竖屏标准模板（抖音/红果短剧）"),
    ("model-adapters.md", 172, "template", "七段式骨架（示范句验证纪律）"),
    ("model-adapters.md", 100, "template", "站位声明一行式写法"),
    ("xuanhuan-magic-combat.md", 122, "template", "玄幻法术战斗 5 段式输出模板"),
    ("asset-spatial-ledger.md", 46, "template", "角色 4 View 资产参考图提示词"),
    ("asset-spatial-ledger.md", 94, "template", "场景空间资产图提示词 · 场景母版"),
    ("asset-spatial-ledger.md", 102, "template", "场景空间资产图提示词 · 文戏机位调度版"),
    ("asset-spatial-ledger.md", 110, "template", "场景空间资产图提示词 · 战斗角色站位版"),
    ("asset-spatial-ledger.md", 128, "template", "场景拼接图（鸟瞰透视 + 机位）"),
    ("asset-spatial-ledger.md", 162, "template", "道具资产图提示词"),
    ("screenplay-gate-engine.md", 32, "template", "专业剧本页排版模板（Gate 5）"),
]


def manju_block(ctx, rel, fence_line):
    lines = ctx.read("manju", rel).split("\n")
    i = fence_line  # 0-based index of first content line
    assert re.match(r"^\s*```", lines[fence_line - 1]), (rel, fence_line)
    out = []
    while i < len(lines) and not re.match(r"^\s*```", lines[i]) and lines[i].strip() != "---" and not lines[i].startswith("## "):
        out.append(lines[i]); i += 1
    return "\n".join(out)


def extract_manju(ctx):
    prompts, templates = [], []
    for f, ln, kind, title in MANJU_PICKS:
        rel = MANJU_PREFIX + f
        r = base_record("manju", ctx, rel, ln + 1, title, manju_block(ctx, rel, ln), model="Seedance 2.5 / 2.0",
                        original_author="漫剧老李 / Short-Drama Director Suite contributors",
                        original_author_url="https://github.com/lixiaoxiao9888-create", kind=kind)
        r["language"] = detect_lang(r["prompt"])
        r["id"] = "manju-" + hashlib.sha1(r["source_url"].encode()).hexdigest()[:8]
        r["tags"] = ["七段式"] if "七段式" in title else []
        (prompts if kind == "prompt" else templates).append(r)
    return prompts, templates


# ----------------------------------------------------------------- templates: LearnPrompt + Toonflow + dexhunter formula
def extract_learnprompt_templates(ctx):
    out = []
    base = SOURCES["learnprompt"]["path"] / "docs/templates"
    for lang in ("zh", "en"):
        for p in sorted((base / lang).glob("*.md")):
            if p.name == "README.md":
                continue
            rel = os.path.relpath(p, SOURCES["learnprompt"]["path"])
            lines = p.read_text(encoding="utf-8").split("\n")
            title = next(l for l in lines if l.startswith("# ")).lstrip("# ").strip()
            summary = next((l[2:].strip() for l in lines if l.startswith("> ")), None)
            f = next(((o, c, content) for o, c, info, content in iter_fences(lines) if info == "text"), None)
            if not f:
                continue
            r = base_record("learnprompt", ctx, rel, f[0] + 2, title, "\n".join(f[2]), description=summary, kind="template",
                            original_author="LearnPrompt / goodcase.ai (curation)", original_author_url="https://github.com/LearnPrompt")
            r["license"] = "CC-BY-4.0 (curation)"
            r["language"] = lang
            r["id"] = f"learnprompt-tpl-{lang}-{p.stem}"
            out.append(r)
    return out


def extract_toonflow_templates(ctx):
    rel = "packages/skills/workflow/SKILL.md"
    lines = ctx.read("toonflow", rel).split("\n")
    out = []
    for o, c, info, content in iter_fences(lines):
        # only the template blocks directly under "### A9.1" and "### A9.2 > #### A9.2.0" are taken;
        # the "#### A9.2.1 Timeline 写法" illustration and blocks under later "## A10" headings are skipped
        near = next((lines[j] for j in range(o, -1, -1) if re.match(r"#{1,6} ", lines[j])), "")
        h3 = next((lines[j] for j in range(o, -1, -1) if lines[j].startswith("### ")), "")
        if re.match(r"### A9\.[12] ", h3) and (near == h3 or near.startswith("#### A9.2.0")) and len(content) > 20:
            r = base_record("toonflow", ctx, rel, o + 2, h3[4:].strip(), "\n".join(content), kind="template",
                            model="Seedance 2.0" if "2.0" in h3 else "Seedance 2.5",
                            original_author="HBAI-Ltd (Toonflow)", original_author_url="https://github.com/HBAI-Ltd")
            r["language"] = "zh"
            r["id"] = "toonflow-tpl-" + ("seedance20" if "2.0" in h3 else "seedance25")
            out.append(r)
    return out


# ----------------------------------------------------------------- official-guide overlap check
def shingles(text, k=10):
    t = norm_for_dedup(text)
    return {t[i:i + k] for i in range(max(0, len(t) - k + 1))}


def official_overlap(recs, official_texts):
    V = set()
    for t in official_texts:
        V |= shingles(t)
    for r in recs:
        S = shingles(r["prompt"])
        r["_official_overlap"] = round(len(S & V) / len(S), 3) if S else 0.0


# ----------------------------------------------------------------- takedown list
def load_takedown(path):
    """data/takedown.txt: one entry per line — an original-post URL, a record id, or author:@handle; '#' starts a comment."""
    ids, urls, authors = set(), set(), set()
    if not Path(path).exists():
        return ids, urls, authors
    for line in Path(path).read_text(encoding="utf-8").splitlines():
        t = line.split("#", 1)[0].strip()
        if not t:
            continue
        if t.lower().startswith("author:"):
            authors.add(t[7:].strip().lstrip("@").lower())
        elif re.match(r"https?://", t):
            urls.add(norm_url(t))
        else:
            ids.add(t)
    return ids, urls, authors


def norm_url(u):
    u = re.sub(r"^https?://(www\.|mobile\.)?", "", (u or "").strip()).split("?")[0].split("#")[0].rstrip("/")
    return u.replace("twitter.com/", "x.com/")


def taken_down(r, td):
    ids, urls, authors = td
    a = (r.get("original_author") or "").lstrip("@").lower()
    return r["id"] in ids or (r.get("original_post_url") and norm_url(r["original_post_url"]) in urls) or (a and a in authors)


# ----------------------------------------------------------------- dedup
def dedup(recs):
    pri = {k: i for i, k in enumerate(PRIORITY)}
    parent = list(range(len(recs)))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]; x = parent[x]
        return x
    norms = [norm_for_dedup(r["prompt"]) for r in recs]
    by_norm = defaultdict(list)
    for i, n in enumerate(norms):
        by_norm[n].append(i)
    for idxs in by_norm.values():
        for j in idxs[1:]:
            parent[find(j)] = find(idxs[0])
    sh = [set(n[i:i + 5] for i in range(max(1, len(n) - 4))) for n in norms]
    order = sorted(range(len(recs)), key=lambda i: len(norms[i]))
    near_pairs = []
    for a_pos, a in enumerate(order):
        la = len(norms[a])
        for b in order[a_pos + 1:]:
            lb = len(norms[b])
            if la < 0.85 * lb:
                break
            if find(a) == find(b) or la < 30:
                continue
            inter = len(sh[a] & sh[b])
            jac = inter / (len(sh[a]) + len(sh[b]) - inter)
            if jac >= 0.9:
                parent[find(b)] = find(a); near_pairs.append((recs[a]["id"], recs[b]["id"], round(jac, 3)))
    groups = defaultdict(list)
    for i in range(len(recs)):
        groups[find(i)].append(i)
    kept = []
    merges = []
    for g in groups.values():
        g.sort(key=lambda i: (pri.get(recs[i]["source_key"], 99), 0 if recs[i]["original_post_url"] else 1, recs[i]["id"]))
        canon = recs[g[0]]
        canon["also_in"] = []
        for i in g[1:]:
            o = recs[i]
            canon["also_in"].append(dict(id=o["id"], source_repo=o["source_repo"], source_url=o["source_url"], license=o["license"],
                                         original_author=o["original_author"], original_post_url=o["original_post_url"]))
            ca, oa = canon["original_post_url"], o["original_post_url"]
            if ca and oa and ca.split("?")[0].rstrip("/") != oa.split("?")[0].rstrip("/") and "attribution_differs_across_sources" not in canon["flags"]:
                canon["flags"].append("attribution_differs_across_sources")
            if not canon["original_post_url"] and oa:
                canon["flags"].append("original_post_found_in_other_source")
        if len(g) > 1:
            merges.append([recs[i]["id"] for i in g])
        kept.append(canon)
    return kept, merges, near_pairs


# ----------------------------------------------------------------- writing
def render_prompt_file(r, heading="提示词"):
    lang = r.get("language") or detect_lang(r["prompt"])
    out = [f"# {r['title']}", ""]
    if r.get("title_en") and r["title_en"] != r["title"]:
        out += [f"*{r['title_en']}*", ""]
    if r.get("description"):
        out += ["> " + r["description"].replace("\n", " "), ""]
    f = fence_for(r["prompt"])
    out += [f"## {heading}（{LANG_LABEL.get(lang, lang)}）", "", f + "text", r["prompt"], f, ""]
    if r["variants"]:
        out += ["## 其他语言版本（上游仓库提供，非本仓库翻译）", ""]
        for v in r["variants"]:
            fv = fence_for(v["text"])
            out += [f"### {v['label']}", "", f"[位置]({v['source_url']})", "", fv + "text", v["text"], fv, ""]
    out += ["## 出处与许可", ""]
    if r.get("third_party_author"):
        a = r["original_author"] or "（上游未注明）"
        a = f"[{a}]({r['original_author_url']})" if r.get("original_author_url") else a
        out.append(f"- 原作者：{a}" + (f" · 原帖：<{r['original_post_url']}>" if r.get("original_post_url") else " · 原帖：上游未提供"))
        out.append("- 版权说明：上游仓库声明单条提示词的权利归原作者所有，本仓库仅为学习/索引目的转录并保留署名；原作者如需删除请提 issue。")
    elif r.get("original_author"):
        a = f"[{r['original_author']}]({r['original_author_url']})" if r.get("original_author_url") else r["original_author"]
        out.append(f"- 作者：{a}（上游仓库作者 / 贡献者）")
    out.append(f"- 收录来源：[{r['source_repo']}](https://github.com/{r['source_repo']})，[原文位置]({r['source_url']})")
    if r.get("source_key") == "youmind" and r.get("in_current_readme") is False:
        out.append(f"- 说明：YouMind 的 README 每天自动轮换展示 100 条提示词；本条取自该仓库 README 的历史版本（commit `{r['source_commit'][:12]}`），与当前版本同为 CC BY 4.0 发布")
    lic = r["license"]
    out.append(f"- 上游许可：{lic}（[许可说明]({r['license_url']})；全文见本仓库 `LICENSES/`）")
    for a in r.get("also_in", []):
        out.append(f"- 同时出现在：[{a['source_repo']}]({a['source_url']})" + (f"（原帖 <{a['original_post_url']}>）" if a.get("original_post_url") else ""))
    if r.get("source_page"):
        out.append(f"- 效果预览（外部链接，本仓库不收录图片/视频）：<{r['source_page']}>")
    out.append(f"- 本仓库所做改动：{CHANGES}")
    if r["flags"]:
        out.append(f"- ⚠️ 标记：{', '.join(r['flags'])}")
    return "\n".join(out) + "\n"


def render_link_only(r, reason):
    """Audit downgrade: keep title, credit and links plus a neutral one-line summary; do not republish the prompt text."""
    import audit
    out = [f"# {r['title']}", ""]
    if r.get("title_en") and r["title_en"] != r["title"]:
        out += [f"*{r['title_en']}*", ""]
    link = r.get("original_post_url") or r["source_url"]
    out += ["## 仅收录标题与链接", "",
            f"> {audit.SUMMARY[reason]}", "",
            f"- 审核类别：{audit.REASON_ZH[reason]}（`{reason}`），规则与流程见仓库根目录 `CONTRIBUTING.md`「内容审核」",
            f"- 阅读原文：<{link}>", ""]
    out += ["## 出处与许可", ""]
    if r.get("third_party_author"):
        a = r["original_author"] or "（上游未注明）"
        a = f"[{a}]({r['original_author_url']})" if r.get("original_author_url") else a
        out.append(f"- 原作者：{a}" + (f" · 原帖：<{r['original_post_url']}>" if r.get("original_post_url") else " · 原帖：上游未提供"))
    elif r.get("original_author"):
        a = f"[{r['original_author']}]({r['original_author_url']})" if r.get("original_author_url") else r["original_author"]
        out.append(f"- 作者：{a}（上游仓库作者 / 贡献者）")
    out.append(f"- 收录来源：[{r['source_repo']}](https://github.com/{r['source_repo']})，[原文位置]({r['source_url']})")
    out.append(f"- 上游许可：{r['license']}（[许可说明]({r['license_url']})）；本仓库未转载提示词正文")
    for a in r.get("also_in", []):
        out.append(f"- 同时出现在：[{a['source_repo']}]({a['source_url']})")
    if r.get("source_page"):
        out.append(f"- 效果预览（外部链接）：<{r['source_page']}>")
    return "\n".join(out) + "\n"


def meta_of(r, cls):
    m = dict(id=r["id"], title=r["title"], title_en=r.get("title_en"), model=r.get("model") or "",
             language=r.get("language") or detect_lang(r["prompt"]), medium=cls["medium"], direction=cls["direction"],
             genre=cls["genre"], art_style=cls["art_style"], tags=[t for t in r["tags"] if t],
             source_repo=r["source_repo"], source_url=r["source_url"], license=r["license"], license_url=r["license_url"],
             original_author=r["original_author"], original_author_url=r["original_author_url"],
             original_post_url=r["original_post_url"], published=r["published"], third_party_author=r["third_party_author"],
             flags=r["flags"], also_in=r.get("also_in", []), source_page=r.get("source_page"), classification="auto",
             changes=CHANGES)
    return m


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--src", default=os.environ.get("PROMPT_HUB_SRC", str(ROOT.parent / "ai-drama-prompts" / "src")))
    ap.add_argument("--official", nargs="*", default=[str(ROOT.parent / "ai-drama-prompts" / n) for n in ("volc_guide.txt", "volc25.txt")])
    ap.add_argument("--official-threshold", type=float, default=0.25)
    ap.add_argument("--include-dexhunter", action="store_true",
                    help="dexhunter/seedance2-skill says its examples are based on the official ByteDance 即梦 Seedance 2.0 manual "
                         "(all rights reserved); they are held back unless this flag is given")
    ap.add_argument("--youmind-history", default=os.environ.get("PROMPT_HUB_YM_HISTORY", str(ROOT.parent / "ai-drama-prompts" / "src-history" / "YouMind-OpenLab_awesome-seedance-2-prompts.git")),
                    help="full-history clone of YouMind-OpenLab/awesome-seedance-2-prompts (e.g. git clone --bare --filter=blob:limit=900k); "
                         "every README version up to the pinned commit is CC BY 4.0. Pass '' to use only the pinned README")
    args = ap.parse_args()
    ctx = Ctx(args.src)
    ym_hist = args.youmind_history if args.youmind_history and Path(args.youmind_history).exists() else None

    raw = {"youmind": extract_youmind(ctx, ym_hist), "learnprompt": extract_learnprompt(ctx), "zerolu": extract_zerolu(ctx),
           "emily": extract_emily(ctx), "dexhunter": extract_dexhunter(ctx)}
    manju_prompts, manju_tpls = extract_manju(ctx)
    raw["manju"] = manju_prompts
    templates = extract_learnprompt_templates(ctx) + manju_tpls + extract_toonflow_templates(ctx)
    for r in [x for v in raw.values() for x in v] + templates:
        r.setdefault("language", detect_lang(r["prompt"]))

    all_recs = [x for v in raw.values() for x in v]
    official_texts = [Path(p).read_text(encoding="utf-8") for p in args.official if Path(p).exists()]
    official_overlap(all_recs + templates, official_texts)
    held = [r for r in all_recs + templates if r["_official_overlap"] >= args.official_threshold]
    for r in held:
        r["_held_reason"] = f"与火山方舟官方 Seedance 指南文本重合度 {r['_official_overlap']}"
    if not args.include_dexhunter:
        for r in raw["dexhunter"]:
            if r not in held:
                r["_held_reason"] = "dexhunter README 声明内容基于字节跳动官方《即梦 Seedance 2.0 使用手册》（含示例提示词），疑似官方示例的译写/转录"
                held.append(r)
    held_ids = {id(r) for r in held}
    recs = [r for r in all_recs if id(r) not in held_ids]
    templates = [r for r in templates if id(r) not in held_ids]
    # no empty prompts
    empty = [r["id"] for r in recs if not r["prompt"].strip()]
    assert not empty, empty
    ids = [r["id"] for r in recs]
    assert len(ids) == len(set(ids)), "duplicate ids"
    kept, merges, near_pairs = dedup(recs)
    td = load_takedown(ROOT / "data" / "takedown.txt")
    removed = [r for r in kept if taken_down(r, td) or any(taken_down(dict(a, id=a["id"]), td) for a in r.get("also_in", []))]
    kept = [r for r in kept if r not in removed]
    if removed:
        print("takedown list: removed", len(removed), "records")
    # pre-publication content audit (scripts/audit.py + data/audit_overrides.tsv)
    import audit
    overrides = audit.load_overrides(ROOT / "data" / "audit_overrides.tsv")
    decisions = {r["id"]: audit.decide(r, overrides) for r in kept}
    excluded = [r for r in kept if decisions[r["id"]][0] == "exclude"]
    kept = [r for r in kept if decisions[r["id"]][0] != "exclude"]
    link_only = {r["id"] for r in kept if decisions[r["id"]][0] == "link-only"}
    print("audit: excluded", len(excluded), "· link-only", len(link_only))

    # write prompts
    pdir = ROOT / "prompts"
    if pdir.exists():
        shutil.rmtree(pdir)
    written = []
    for r in sorted(kept, key=lambda x: x["id"]):
        cls = classify(r["title"], r.get("title_en") or "", r.get("description") or "", r["prompt"], r["tags"], r.get("hints", ""))
        meta = meta_of(r, cls)
        if r["id"] in link_only:
            meta["access"] = "link-only"
            meta["audit_reason"] = decisions[r["id"]][1]
        folder = pdir / folder_for(meta)
        folder.mkdir(parents=True, exist_ok=True)
        fn = folder / f"{r['id'][:60]}--{slugify(r['title'])}.md"
        body = render_link_only(r, meta["audit_reason"]) if r["id"] in link_only else render_prompt_file(r)
        fn.write_text(write_front_matter(meta) + "\n" + body, encoding="utf-8")
        if r["id"] not in link_only:
            written.append((fn, r))
    # templates
    tdir = ROOT / "templates"
    if tdir.exists():
        shutil.rmtree(tdir)
    tsub = {"learnprompt": "LearnPrompt-分类模板", "manju": "漫剧老李-七段式与资产图模板", "toonflow": "Toonflow-分段提示词模板"}
    for r in templates:
        folder = tdir / tsub[r["source_key"]] / (r["language"] if r["source_key"] == "learnprompt" else "")
        folder.mkdir(parents=True, exist_ok=True)
        meta = dict(id=r["id"], title=r["title"], model=r.get("model") or "", language=r["language"], kind="template",
                    source_repo=r["source_repo"], source_url=r["source_url"], license=r["license"], license_url=r["license_url"],
                    original_author=r["original_author"], original_author_url=r["original_author_url"], changes=CHANGES)
        fn = folder / f"{slugify(r['id'].split('-tpl-')[-1] if '-tpl-' in r['id'] else r['id'], 60)}--{slugify(r['title'])}.md"
        fn.write_text(write_front_matter(meta) + "\n" + render_prompt_file(r, heading="模板"), encoding="utf-8")

    # round-trip check: every written prompt can be read back verbatim
    from hub_common import read_front_matter
    for fn, r in written:
        meta, body = read_front_matter(fn.read_text(encoding="utf-8"))
        lines = body.split("\n")
        o, c, info, content = next(iter_fences(lines))
        assert "\n".join(content) == r["prompt"], fn

    report = dict(
        commits={k: s["commit"] for k, s in SOURCES.items()},
        youmind_history=dict(repo=ym_hist and SOURCES["youmind"]["repo"], readme_versions_scanned=bool(ym_hist),
                             prompts_from_pinned_readme=sum(1 for r in raw["youmind"] if r.get("in_current_readme")),
                             prompts_from_earlier_readme_versions=sum(1 for r in raw["youmind"] if not r.get("in_current_readme"))),
        raw_counts={k: len(v) for k, v in raw.items()},
        raw_total=len(all_recs),
        held_back=[dict(id=r["id"], source_url=r["source_url"], title=r["title"], reason=r["_held_reason"], kind=r["kind"]) for r in held],
        after_holdback=len(recs), after_dedup=len(kept) + len(removed), taken_down=[r["id"] for r in removed], published=len(kept),
        audit=dict(rules="scripts/audit.py", overrides="data/audit_overrides.tsv",
                   link_only=dict(Counter(decisions[i][1] for i in link_only)),
                   excluded=[dict(id=r["id"], reason=decisions[r["id"]][1]) for r in excluded]),
        merged_groups=merges, near_duplicate_pairs=near_pairs,
        templates={k: sum(1 for t in templates if t["source_key"] == k) for k in ("learnprompt", "manju", "toonflow")},
        overlap_top=sorted([(r["id"], r["_official_overlap"]) for r in all_recs + templates if r["_official_overlap"] > 0.05], key=lambda x: -x[1])[:40],
    )
    (ROOT / "data").mkdir(exist_ok=True)
    (ROOT / "data" / "extraction_report.json").write_text(json.dumps(report, ensure_ascii=False, indent=1), encoding="utf-8")
    print(json.dumps({k: v for k, v in report.items() if k not in ("merged_groups", "near_duplicate_pairs", "held_back", "overlap_top")}, ensure_ascii=False, indent=1))
    print("held back:", len(held), "merged groups:", len(merges), "near pairs:", len(near_pairs))


if __name__ == "__main__":
    main()
