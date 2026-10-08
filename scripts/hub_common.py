"""Shared helpers for ai-video-prompt-hub scripts (front matter I/O, fences, language, classification).

Front matter format: one `key: <JSON value>` per line between `---` lines.
JSON values are valid YAML flow scalars/sequences/mappings, so any YAML parser can read it,
and this module can read it without third-party dependencies.
"""
import json
import re
import unicodedata

FM_ORDER = [
    "id", "title", "title_en", "model", "language", "medium", "direction", "genre", "art_style",
    "tags", "source_repo", "source_url", "license", "license_url", "original_author",
    "original_author_url", "original_post_url", "published", "third_party_author", "flags",
    "also_in", "source_page", "classification", "changes",
]

LANG_LABEL = {"zh": "中文", "en": "English", "ja": "日本語", "ko": "한국어", "ru": "Русский", "es": "Español"}


def normalize_ws(text: str) -> str:
    """Whitespace-only normalization: CRLF->LF, strip trailing spaces, drop leading/trailing blank lines,
    remove common indentation. Never changes non-whitespace characters."""
    import textwrap
    text = text.replace("\r\n", "\n").replace("\r", "\n")
    lines = [l.rstrip() for l in text.split("\n")]
    while lines and not lines[0].strip():
        lines.pop(0)
    while lines and not lines[-1].strip():
        lines.pop()
    return textwrap.dedent("\n".join(lines))


def fence_for(text: str) -> str:
    longest = max([len(m) for m in re.findall(r"`+", text)] + [2])
    return "`" * max(3, longest + 1)


def iter_fences(lines):
    """Yield (open_idx, close_idx, info, content_lines) for CommonMark-style fenced code blocks."""
    i = 0
    n = len(lines)
    while i < n:
        m = re.match(r"^\s*(`{3,}|~{3,})\s*([^`\s]*)\s*$", lines[i])
        if m:
            fence = m.group(1)
            close_re = re.compile(r"^\s*" + re.escape(fence[0]) + "{%d,}\\s*$" % len(fence))
            j = i + 1
            while j < n and not close_re.match(lines[j]):
                j += 1
            yield i, j, m.group(2), lines[i + 1:j]
            i = j + 1
        else:
            i += 1


def write_front_matter(meta: dict) -> str:
    keys = [k for k in FM_ORDER if k in meta] + [k for k in meta if k not in FM_ORDER]
    out = ["---"]
    for k in keys:
        out.append(f"{k}: {json.dumps(meta[k], ensure_ascii=False)}")
    out.append("---")
    return "\n".join(out) + "\n"


def read_front_matter(text: str):
    if not text.startswith("---\n"):
        raise ValueError("missing front matter")
    end = text.index("\n---\n", 4)
    meta = {}
    for line in text[4:end].split("\n"):
        if not line.strip():
            continue
        k, v = line.split(": ", 1)
        meta[k] = json.loads(v)
    return meta, text[end + 5:]


def detect_lang(text: str) -> str:
    kana = len(re.findall(r"[\u3040-\u30ff]", text))
    hangul = len(re.findall(r"[\uac00-\ud7af]", text))
    cjk = len(re.findall(r"[\u4e00-\u9fff]", text))
    cyr = len(re.findall(r"[\u0400-\u04ff]", text))
    latin = len(re.findall(r"[A-Za-z]", text))
    total = max(1, kana + hangul + cjk + cyr + latin)
    if kana >= 5 and kana / total > 0.05:
        return "ja"
    if hangul >= 5 and hangul / total > 0.1:
        return "ko"
    if cyr / total > 0.3:
        return "ru"
    if cjk / total > 0.15:
        return "zh"
    if re.search(r"[ñáéíóú¿¡]", text) and len(re.findall(r"\b(el|la|los|las|del|una|con|sin|para)\b", text)) >= 3:
        return "es"
    return "en"


def norm_for_dedup(text: str) -> str:
    text = unicodedata.normalize("NFKC", text).lower()
    return re.sub(r"[\W_]+", "", text)


def slugify(s: str, maxlen: int = 40) -> str:
    s = unicodedata.normalize("NFKC", s)
    s = re.sub(r"[\\/:*?\"<>|#%&{}$!'@`=+\[\]()（）【】「」『』《》，。、：；！？“”‘’·…|]+", " ", s)
    s = re.sub(r"\s+", "-", s.strip()).strip("-.")
    return s[:maxlen].rstrip("-.") or "untitled"
