#!/usr/bin/env python3
"""Monocular depth for the CPU 2.5D parallax backend.
Original code for ai-video-prompt-hub/stills2video (Apache-2.0, (c) 2026 天机).

Model: Depth-Anything-V2-Small (Apache-2.0) as ONNX, run with onnxruntime on CPU. Base/Large checkpoints are
CC-BY-NC-4.0 and intentionally unsupported. Without onnxruntime or the model file we fall back to a
"gradient" depth (bottom = near), so the pipeline always works offline.

Returned depth: float32 array in [0,1], 1 = nearest, same size as the input image.
usage: python3 depth.py image.jpg out_depth.png [--method auto|model|gradient] [--model NAME]
"""
import hashlib, os, sys
import numpy as np
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
MEAN = np.array([0.485, 0.456, 0.406], np.float32)
STD = np.array([0.229, 0.224, 0.225], np.float32)
_sessions = {}


def cache_dir():
    d = os.path.join(os.path.abspath(os.path.expanduser(os.environ.get("HDA_MODELS") or "~/.cache/hda-models")), "depth-cache")
    os.makedirs(d, exist_ok=True)
    return d


def _normalize(d):
    lo, hi = np.percentile(d, 1.5), np.percentile(d, 98.5)
    return np.clip((d - lo) / max(hi - lo, 1e-6), 0, 1).astype(np.float32)


def gradient_depth(w, h):
    """Fallback: ground plane (bottom near, top far) + a soft central bump (subjects tend to be centred)."""
    y = np.linspace(0, 1, h, dtype=np.float32)[:, None]
    x = np.linspace(-1, 1, w, dtype=np.float32)[None, :]
    yy = np.linspace(-1, 1, h, dtype=np.float32)[:, None]
    ground = 0.15 + 0.7 * y ** 1.4
    bump = 0.25 * np.exp(-(x ** 2 / 0.25 + (yy - 0.15) ** 2 / 0.35))
    return np.clip(ground + bump, 0, 1).astype(np.float32)


def model_available(name=None):
    try:
        import onnxruntime  # noqa: F401
    except Exception:
        return False
    from fetch_models import model_path
    return os.path.exists(model_path(name))


def model_depth(img, name=None, input_size=518, threads=None):
    import onnxruntime as ort
    from fetch_models import model_path
    p = model_path(name)
    if p not in _sessions:
        so = ort.SessionOptions()
        if threads:
            so.intra_op_num_threads = threads
        _sessions[p] = ort.InferenceSession(p, so, providers=["CPUExecutionProvider"])
    s = _sessions[p]
    w, h = img.size
    # keep aspect, short side = input_size, both sides multiple of 14 (ViT patch size)
    k = input_size / min(w, h)
    nw, nh = max(14, round(w * k / 14) * 14), max(14, round(h * k / 14) * 14)
    x = np.asarray(img.convert("RGB").resize((nw, nh), Image.BICUBIC), np.float32) / 255.0
    x = ((x - MEAN) / STD).transpose(2, 0, 1)[None]
    out = s.run(None, {s.get_inputs()[0].name: x})[0][0]  # relative inverse depth: larger = nearer
    d = Image.fromarray(out.astype(np.float32), mode="F").resize((w, h), Image.BILINEAR)
    return _normalize(np.asarray(d, np.float32))


def estimate(img, method="auto", name=None, work_size=768, use_cache=True):
    """img: PIL image. Returns (depth float32 [0,1] at img size, method_used)."""
    w, h = img.size
    if method not in ("auto", "model", "gradient"):  # a depth-map file supplied by the user (DepthFlow, ComfyUI, …)
        d = Image.open(method).convert("L").resize((w, h), Image.BILINEAR)
        return _normalize(np.asarray(d, np.float32) / 255.0), "file"
    if method == "gradient" or (method == "auto" and not model_available(name)):
        if method == "model":
            raise SystemExit("深度模型未下载：运行 npm run setup:depth（或 python3 stills2video/py/fetch_models.py）")
        return gradient_depth(w, h), "gradient"
    small = img.convert("RGB")
    small.thumbnail((work_size, work_size))
    key = hashlib.sha1(small.tobytes() + str((small.size, name)).encode()).hexdigest()[:20]
    cf = os.path.join(cache_dir(), key + ".png")
    if use_cache and os.path.exists(cf):
        d = np.asarray(Image.open(cf), np.float32) / 65535.0
    else:
        d = model_depth(small, name)
        if use_cache:
            Image.fromarray((d * 65535).astype(np.uint16)).save(cf)
    d = Image.fromarray(d.astype(np.float32), mode="F").resize((w, h), Image.BILINEAR)
    return np.asarray(d, np.float32), "model"


def main(argv):
    if len(argv) < 2:
        print(__doc__)
        return 1
    method, name = "auto", None
    if "--method" in argv:
        method = argv[argv.index("--method") + 1]
    if "--model" in argv:
        name = argv[argv.index("--model") + 1]
    from PIL import ImageOps
    img = ImageOps.exif_transpose(Image.open(argv[0])).convert("RGB")
    d, used = estimate(img, method, name)
    Image.fromarray((d * 255).astype(np.uint8)).save(argv[1])
    print(f"{argv[1]}  ({used})")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
