#!/usr/bin/env python3
"""stills2video CPU motion backend: one still -> one moving shot (mp4), no GPU needed.
Original code for ai-video-prompt-hub/stills2video (Apache-2.0, (c) 2026 天机).

What it does per frame (numpy only, deterministic, seekable):
  1. camera: zoom / pan / tilt / orbit / dolly-zoom on an eased (or periodic, loopable) curve
  2. 2.5D parallax: every output pixel is displaced by (depth - focus) x camera offset, solved by a short
     fixed-point iteration (backward warp); the depth map is dilated + blurred first so foreground edges
     *stretch* instead of tearing ("inpaint-lite")
  3. cinemagraph flow: an optional masked region (far / top / bottom / box) keeps drifting in a seamless loop
  4. overlays drawn in numpy: fog (depth-aware), rain, snow, dust motes, light leaks, god rays, grade,
     vignette, grain, letterbox

Ideas credited (no code copied): parallax "height / steady / focus / isometric" controls and loopable camera
presets - DepthFlow (BrokenSource, AGPL-3.0, ideas only); Ken Burns that keeps moving for the whole clip,
sub-pixel float crop boundaries against zoom jitter and EXIF/CMYK clean-up - MoneyPrinterTurbo (MIT);
zoom-direction / zoom-amount parameters and easings.net easing curves - editly (MIT); pre-scaling the source
so zooms never sample below 1:1 - kburns (MIT).

usage: python3 motion.py job.json            (job schema: see stills2video/README.md, "CPU 后端 job")
       python3 motion.py job.json --still 0.5 out.png   (render one frame at progress 0.5, for previews/tests)
"""
import json, math, os, subprocess, sys
import numpy as np
from PIL import Image, ImageFilter, ImageOps, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
TAU = math.pi * 2

# ------------------------------------------------------------------ easing (curves from easings.net)
EASE = {
    "linear": lambda x: x,
    "sine": lambda x: -(math.cos(math.pi * x) - 1) / 2,
    "cubic": lambda x: 4 * x ** 3 if x < 0.5 else 1 - (-2 * x + 2) ** 3 / 2,
    "quad": lambda x: 2 * x * x if x < 0.5 else 1 - (-2 * x + 2) ** 2 / 2,
    "out": lambda x: 1 - (1 - x) ** 3,
    "in": lambda x: x ** 3,
    "expo": lambda x: 1.0 if x >= 1 else 1 - 2 ** (-10 * x),
}

# ------------------------------------------------------------------ camera presets
# Each returns dict(z, ox, oy, px, py, dolly) for eased progress p (0..1) or loop phase th (0..2pi).
#   z      global zoom (1 = cover fit)          ox, oy  window centre offset, fraction of available slack (-1..1)
#   px, py parallax camera offset (fraction of output width; near pixels move more)
#   dolly  depth-dependent zoom (near grows faster -> real "push in" feel; negative for vertigo)
PRESETS = {
    "push_in":    dict(desc="慢推（向前推进，近景放大更快）", loop=False),
    "pull_out":   dict(desc="慢拉（后退揭示全景）", loop=False),
    "pan_left":   dict(desc="向左摇移 + 视差", loop=False),
    "pan_right":  dict(desc="向右摇移 + 视差", loop=False),
    "tilt_up":    dict(desc="上摇 / 升镜（升降机感）", loop=False),
    "tilt_down":  dict(desc="下摇 / 降镜", loop=False),
    "orbit":      dict(desc="环绕视差（近似绕主体转一圈，可循环）", loop=True),
    "dolly_zoom": dict(desc="希区柯克变焦（主体不动，背景压缩/拉伸）", loop=False),
    "drift":      dict(desc="漂浮微动（呼吸感，可无缝循环，适合空镜）", loop=True),
    "sway":       dict(desc="左右摆动视差（可循环）", loop=True),
    "rise":       dict(desc="上升推进（仙侠/航拍感）", loop=False),
    "kenburns":   dict(desc="经典 Ken Burns（无深度，平面插画/文字图）", loop=False),
    "static":     dict(desc="几乎静止，只有极轻呼吸（配特效层用）", loop=True),
}


def camera(preset, p, th, a, direction=1):
    """a = amount multiplier (1 = default strength)."""
    s = math.sin(th)
    c = math.cos(th)
    if preset == "push_in":
        return dict(z=1.0 + 0.10 * a * p, ox=0, oy=-0.15 * a * p, px=0.0, py=0.0, dolly=0.22 * a * p)
    if preset == "pull_out":
        q = 1 - p
        return dict(z=1.0 + 0.10 * a * q, ox=0, oy=-0.15 * a * q, px=0.0, py=0.0, dolly=0.22 * a * q)
    if preset in ("pan_left", "pan_right"):
        d = -1 if preset == "pan_left" else 1
        u = (p - 0.5) * 2 * d
        return dict(z=1.06, ox=0.85 * u * min(1, a), px=0.018 * a * u, py=0, dolly=0)
    if preset in ("tilt_up", "tilt_down"):
        d = -1 if preset == "tilt_up" else 1
        u = (p - 0.5) * 2 * d
        return dict(z=1.06, ox=0, oy=0.85 * u * min(1, a), px=0, py=0.016 * a * u, dolly=0)
    if preset == "orbit":
        return dict(z=1.09, oxa=0.035 * c * a, oya=0.018 * s * a, px=0.022 * a * c, py=0.010 * a * s, dolly=0.04 * a * (1 - c) / 2)
    if preset == "dolly_zoom":
        return dict(z=1.0 + 0.22 * a * p, ox=0, oy=0, px=0, py=0, dolly=-0.30 * a * p)
    if preset == "drift":
        return dict(z=1.06 + 0.015 * a * (1 - c) / 2, oxa=0.025 * a * s, oya=0.012 * a * math.sin(2 * th), px=0.010 * a * s, py=0.005 * a * math.sin(2 * th), dolly=0.03 * a * (1 - c) / 2)
    if preset == "sway":
        return dict(z=1.07, oxa=0.05 * a * s, px=0.020 * a * s, py=0, dolly=0)
    if preset == "rise":
        return dict(z=1.02 + 0.08 * a * p, ox=0, oy=0.7 * (0.5 - p) * 2 * min(1, a), px=0, py=-0.014 * a * (p - 0.5) * 2, dolly=0.12 * a * p)
    if preset == "kenburns":
        if direction in ("left", "right"):
            u = (p - 0.5) * 2 * (1 if direction == "right" else -1)
            return dict(z=1.12, ox=0.8 * u, oy=0, px=0, py=0, dolly=0)
        q = p if direction != "out" else 1 - p
        return dict(z=1.0 + 0.18 * a * q, ox=0.0, oy=0.0, px=0, py=0, dolly=0)
    if preset == "static":
        return dict(z=1.03 + 0.01 * (1 - c) / 2, ox=0, oy=0, px=0.002 * s, py=0, dolly=0)
    raise SystemExit(f"未知运镜 {preset}（可选：{' '.join(PRESETS)}）")


# ------------------------------------------------------------------ image helpers
def load_image(path):
    """EXIF orientation applied, CMYK/palette/alpha flattened to RGB (idea: MoneyPrinterTurbo's image sanitiser)."""
    im = ImageOps.exif_transpose(Image.open(path))
    if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
        im = im.convert("RGBA")
        bg = Image.new("RGB", im.size, (0, 0, 0))
        bg.paste(im, mask=im.split()[-1])
        return bg
    return im.convert("RGB")


class Sampler:
    """Fast bilinear sampling of an RGB uint8 image: pixels packed as uint32 for 1-D gathers, 8-bit fixed-point
    weights (≈3x faster than float fancy indexing; max error 2/255)."""

    def __init__(self, img):
        self.h, self.w = img.shape[:2]
        self.flat = np.dstack([img, np.zeros((self.h, self.w, 1), np.uint8)]).view(np.uint32).reshape(-1)

    def _g(self, i):
        return np.take(self.flat, i).view(np.uint8).reshape(i.shape + (4,)).astype(np.uint16)

    def __call__(self, x, y):
        w, h = self.w, self.h
        x = np.clip(x, 0, w - 1.001)
        y = np.clip(y, 0, h - 1.001)
        x0 = x.astype(np.int32)
        y0 = y.astype(np.int32)
        fx = ((x - x0) * 256).astype(np.uint16)[..., None]
        fy = ((y - y0) * 256).astype(np.uint16)[..., None]
        i = y0 * w + x0
        a, b, c, d = self._g(i), self._g(i + 1), self._g(i + w), self._g(i + w + 1)
        top = (a * (256 - fx) + b * fx) >> 8
        bot = (c * (256 - fx) + d * fx) >> 8
        return (((top * (256 - fy) + bot * fy) >> 8)[..., :3]).astype(np.float32)


def nearest(arr, x, y):
    h, w = arr.shape[:2]
    return arr[np.clip(y.astype(np.int32), 0, h - 1), np.clip(x.astype(np.int32), 0, w - 1)]


def value_noise(w, h, cells, rng, octaves=3):
    """Tileable smooth noise in [0,1] at w x h (sum of bilinearly upsampled random grids)."""
    out = np.zeros((h, w), np.float32)
    amp, tot = 1.0, 0.0
    for o in range(octaves):
        n = cells * (2 ** o)
        g = rng.random((max(2, int(n * h / w)), n)).astype(np.float32)
        g = np.concatenate([g, g[:, :1]], 1)
        g = np.concatenate([g, g[:1]], 0)
        im = Image.fromarray(g, mode="F").resize((w + w // n + 1, h + h // max(2, int(n * h / w)) + 1), Image.BICUBIC)
        out += amp * np.asarray(im, np.float32)[:h, :w]
        tot += amp
        amp *= 0.5
    out /= tot
    return (out - out.min()) / max(1e-6, out.max() - out.min())


def screen(base, layer):
    return 255 - (255 - base) * (255 - layer) / 255


# ------------------------------------------------------------------ the renderer
class Shot:
    def __init__(self, job):
        self.job = job
        self.W, self.H = int(job["width"]), int(job["height"])
        self.fps = float(job.get("fps", 30))
        self.duration = float(job["duration"])
        self.n = max(1, round(self.duration * self.fps))
        m = job.get("motion") or {}
        self.preset = m.get("preset", "push_in")
        if self.preset not in PRESETS:
            raise SystemExit(f"未知运镜 {self.preset}（可选：{' '.join(PRESETS)}）")
        self.amount = float(m.get("amount", 1.0))
        self.ease = EASE[m.get("ease", "sine")]
        self.direction = m.get("direction", "in")
        self.loop = bool(job.get("loop", PRESETS[self.preset]["loop"]))
        self.cycles = float(m.get("cycles", 1))
        self.parallax = float(m.get("parallax", 1.0))  # 0 = flat Ken Burns
        self.focus = m.get("focus", "auto")
        self.rng = np.random.default_rng(int(job.get("seed", 7)))
        img = load_image(job["image"])
        W, H = self.W, self.H
        iw, ih = img.size
        # max zoom reached by this preset (so we pre-scale the source to ~1:1 at the tightest framing)
        zs = [camera(self.preset, p, p * TAU * self.cycles, self.amount, self.direction) for p in np.linspace(0, 1, 9)]
        zmax = max(c["z"] * (1 + max(0, c["dolly"])) for c in zs) * 1.02
        fit = job.get("fit", "cover")
        s0 = max(W / iw, H / ih) if fit == "cover" else min(W / iw, H / ih)
        self.zmax = zmax
        self.k = s0 * zmax  # source pixels per output pixel at z=1 is 1/s0; we resample source by k
        sw, sh = max(2, round(iw * self.k)), max(2, round(ih * self.k))
        if fit != "cover":  # contain: blurred cover background + sharp foreground (keeps the whole picture)
            bgk = max(W / iw, H / ih) * zmax
            bg = img.resize((max(2, round(iw * bgk)), max(2, round(ih * bgk))), Image.BILINEAR).filter(ImageFilter.GaussianBlur(30))
            canvas = Image.new("RGB", (max(sw, bg.width), max(sh, bg.height)))
            canvas.paste(bg, ((canvas.width - bg.width) // 2, (canvas.height - bg.height) // 2))
            canvas.paste(img.resize((sw, sh), Image.LANCZOS), ((canvas.width - sw) // 2, (canvas.height - sh) // 2))
            src = canvas
        else:
            src = img.resize((sw, sh), Image.LANCZOS)
        self.src = np.asarray(src, np.uint8)
        self.sh, self.sw = self.src.shape[:2]
        self.sample = Sampler(self.src)
        # depth (at half source res: plenty for displacement, half the memory)
        self.depth = None
        self.depth_used = "none"
        if self.parallax > 0 and self.preset != "kenburns":
            from depth import estimate
            dm = job.get("depth", "auto")
            d, self.depth_used = estimate(src, dm if dm else "auto", job.get("depth_model"))
            dimg = Image.fromarray((d * 255).astype(np.uint8))
            dimg = dimg.resize((max(2, self.sw // 2), max(2, self.sh // 2)), Image.BILINEAR)
            # inpaint-lite: grow the foreground a little and soften steps so edges stretch rather than tear
            grow = int(job.get("edge_grow", max(3, (min(dimg.size) // 90) | 1)))
            grow = grow if grow % 2 else grow + 1
            dimg = dimg.filter(ImageFilter.MaxFilter(grow)).filter(ImageFilter.GaussianBlur(max(1.0, grow * 0.8)))
            self.depth = np.asarray(dimg, np.float32) / 255.0
            if self.focus == "auto":  # keep the main subject plane steady (median of the central area)
                hh, ww = self.depth.shape
                self.focus = float(np.median(self.depth[hh // 4: 3 * hh // 4, ww // 4: 3 * ww // 4]))
            self.focus = float(self.focus)
        # output pixel grid, centred
        yy, xx = np.mgrid[0:H, 0:W].astype(np.float32)
        self.u = xx - W / 2 + 0.5
        self.v = yy - H / 2 + 0.5
        self.overlays = [dict(o) for o in job.get("overlays", [])]
        self.flow = job.get("flow")
        self._prep_overlays()

    # -- geometry
    def coords(self, cam, depth_iters=3):
        """Backward map: output pixel grid -> source pixel coords for this camera state."""
        W = self.W
        # the source was resampled by k = s0 * zmax, so one output px at zoom z covers zmax / z source px
        spp = self.zmax / cam["z"]
        hw, hh = W / 2 * spp, self.H / 2 * spp
        slx, sly = max(0.0, self.sw / 2 - hw), max(0.0, self.sh / 2 - hh)
        cx = self.sw / 2 + cam.get("ox", 0) * slx + float(np.clip(cam.get("oxa", 0) * W * spp, -slx, slx))
        cy = self.sh / 2 + cam.get("oy", 0) * sly + float(np.clip(cam.get("oya", 0) * W * spp, -sly, sly))
        if self.depth is None or self.parallax <= 0:
            return cx + self.u * spp, cy + self.v * spp
        dz = cam["dolly"] * self.parallax
        px, py = cam["px"] * self.parallax * W * spp, cam["py"] * self.parallax * W * spp
        f = self.focus
        xs, ys = cx + self.u * spp, cy + self.v * spp
        for _ in range(depth_iters):  # fixed-point: sample depth where the pixel *came from*, refine
            d = nearest(self.depth, xs * 0.5, ys * 0.5) - f
            g = 1.0 / (1.0 + dz * d)  # near pixels (d > 0) are magnified when dolly > 0
            xs = cx + self.u * spp * g - px * d
            ys = cy + self.v * spp * g - py * d
        return xs, ys

    # -- overlays that need precomputation
    def _prep_overlays(self):
        W, H = self.W, self.H
        for o in self.overlays:
            t = o["type"]
            if t == "fog":
                o["_tex"] = value_noise(W // 4 * 2, H // 4, 6, self.rng, 4)  # twice as wide: scrolls horizontally
            elif t == "rain":
                tex = Image.new("L", (W, H * 2), 0)
                g = ImageDraw.Draw(tex)
                ang = o.get("angle", 0.18)
                for _ in range(int(o.get("count", 900) * W * H / (1080 * 1920))):
                    x, y = self.rng.uniform(-W * 0.2, W * 1.2), self.rng.uniform(0, H * 2)
                    ln = self.rng.uniform(H * 0.02, H * 0.06)
                    a = int(self.rng.uniform(70, 200))
                    g.line([(x, y), (x + ln * ang, y + ln)], fill=a, width=max(1, round(W / 900)))
                tex = tex.filter(ImageFilter.GaussianBlur(0.6))
                o["_tex"] = np.asarray(tex, np.float32)
            elif t in ("snow", "dust", "bokeh"):
                n = int(o.get("count", {"snow": 260, "dust": 90, "bokeh": 26}[t]))
                o["_p"] = self.rng.random((n, 5)).astype(np.float32)
            elif t == "vignette":
                r = np.sqrt((self.u / (W / 2)) ** 2 + (self.v / (H / 2)) ** 2)
                o["_m"] = (1 - o.get("amount", 0.35) * np.clip((r - 0.55) / 0.85, 0, 1) ** 1.6)[..., None].astype(np.float32)
            elif t == "godrays":
                o["_seed"] = self.rng.random(16)
        if self.flow:
            self.flow = dict(self.flow)

    def flow_mask(self):
        fl = self.flow
        if "_mask" in fl:
            return fl["_mask"]
        W, H = self.W, self.H
        region = fl.get("region", "far")
        if region == "top":
            m = np.clip((0.5 - (self.v / H + 0.5)) / 0.15 + 1, 0, 1) * ((self.v / H + 0.5) < 0.5)
        elif region == "bottom":
            m = np.clip(((self.v / H + 0.5) - fl.get("from", 0.62)) / 0.06, 0, 1)
        elif region == "box":
            x0, y0, x1, y1 = fl["box"]
            xn, yn = self.u / W + 0.5, self.v / H + 0.5
            m = ((xn > x0) & (xn < x1) & (yn > y0) & (yn < y1)).astype(np.float32)
            m = np.asarray(Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(W / 60)), np.float32) / 255
        else:
            m = None
        fl["_mask"] = m
        return m

    def frame(self, i):
        W, H = self.W, self.H
        t = i / self.fps
        p_lin = i / max(1, self.n - 1)
        p = self.ease(p_lin)
        th = TAU * self.cycles * i / self.n  # periodic: frame n == frame 0 -> seamless loop
        cam = camera(self.preset, p, th, self.amount, self.direction)
        x, y = self.coords(cam)
        img = self.sample(x, y)
        if self.flow:
            img = self.apply_flow(img, x, y, i)
        for o in self.overlays:
            img = self.overlay(img, o, t, i, x, y)
        return np.clip(img, 0, 255).astype(np.uint8)

    def apply_flow(self, img, x, y, i):
        fl = self.flow
        T = self.n  # one full drift per clip -> loops
        D = float(fl.get("distance", 0.06)) * self.W
        ang = math.radians(float(fl.get("angle", 0)))
        dx, dy = math.cos(ang) * D, math.sin(ang) * D
        ph = (i % T) / T
        if fl.get("kind", "drift") == "ripple":
            amp = float(fl.get("amp", 0.004)) * self.W
            off = amp * np.sin(y / (self.H * 0.012) + TAU * ph * fl.get("speed", 2))
            moved = self.sample(x + off, y)
        else:  # seamless crossfade of two phases (classic loopable texture drift)
            a = self.sample(x - dx * ph, y - dy * ph)
            b = self.sample(x - dx * (ph - 1), y - dy * (ph - 1))
            moved = a * (1 - ph) + b * ph
        m = self.flow_mask()
        if m is None:  # far region by depth
            d = nearest(self.depth, x * 0.5, y * 0.5) if self.depth is not None else np.zeros_like(x)
            m = np.clip((fl.get("threshold", 0.35) - d) / 0.12, 0, 1)
        m = (m * float(fl.get("strength", 1.0)))[..., None]
        return img * (1 - m) + moved * m

    def overlay(self, img, o, t, i, x, y):
        W, H = self.W, self.H
        typ = o["type"]
        amt = float(o.get("amount", 1.0))
        if typ == "fog":
            tex = o["_tex"]
            th, tw = tex.shape
            sp = o.get("speed", 0.02)
            off = int((t * sp * tw) % (tw // 2)) if not self.loop else int((i / self.n) * (tw // 2))
            win = tex[:, off: off + tw // 2]
            fog = np.asarray(Image.fromarray(win, mode="F").resize((W, H), Image.BILINEAR), np.float32)
            if self.depth is not None and o.get("depth_aware", True):
                d = nearest(self.depth, x * 0.5, y * 0.5)
                fog = fog * (0.25 + 0.95 * (1 - d) ** 1.3)
            else:
                fog = fog * (0.5 + 0.5 * (self.v / H + 0.5))
            a = np.clip(fog * 0.55 * amt, 0, 0.85)[..., None]
            col = np.array(o.get("color", [228, 236, 242]), np.float32)
            return img * (1 - a) + col * a
        if typ == "rain":
            tex = o["_tex"]
            sp = o.get("speed", 2.2)
            off = int((t * sp * H) % H)
            lay = tex[H - off: 2 * H - off] if off else tex[H:2 * H]
            lay = (lay * 0.55 * amt)[..., None]
            out = screen(img, lay)
            return out * (1 - 0.06 * amt)  # rain darkens the scene a touch
        if typ in ("snow", "dust", "bokeh"):
            P = o["_p"]
            small = 2 if typ != "snow" else 1
            lw, lh = W // small, H // small
            lay = Image.new("L", (lw, lh), 0)
            g = ImageDraw.Draw(lay)
            spd = {"snow": 0.10, "dust": 0.015, "bokeh": 0.008}[typ] * o.get("speed", 1.0)
            for k in range(len(P)):
                px_, py_, sz, ph, br = P[k]
                yy_ = ((py_ + t * spd * (0.6 + sz)) % 1.08 - 0.04) * lh if typ == "snow" else ((py_ - t * spd * (0.5 + sz)) % 1.0) * lh
                xx_ = (px_ + 0.02 * math.sin(t * (0.6 + ph) + ph * 9)) % 1.0 * lw
                r = {"snow": 1.5 + 4.5 * sz ** 2, "dust": 1 + 2.5 * sz, "bokeh": 12 + 30 * sz}[typ] * lw / 1080
                a = {"snow": 150 + 105 * br, "dust": 90 + 120 * br * (0.5 + 0.5 * math.sin(t * 2 + ph * 7)), "bokeh": 40 + 50 * br}[typ]
                g.ellipse([xx_ - r, yy_ - r, xx_ + r, yy_ + r], fill=int(a))
            lay = lay.filter(ImageFilter.GaussianBlur({"snow": 0.8, "dust": 1.2, "bokeh": 6}[typ] * lw / 1080 + 0.3))
            if small != 1:
                lay = lay.resize((W, H), Image.BILINEAR)
            l = np.asarray(lay, np.float32)[..., None] * amt
            col = np.array(o.get("color", {"snow": [255, 255, 255], "dust": [255, 226, 170], "bokeh": [255, 210, 150]}[typ]), np.float32)
            return screen(img, l / 255 * col)
        if typ == "lightleak":
            lw, lh = 48, int(48 * H / W)
            yy_, xx_ = np.mgrid[0:lh, 0:lw].astype(np.float32)
            lay = np.zeros((lh, lw, 3), np.float32)
            ph = t * o.get("speed", 0.25) if not self.loop else TAU * i / self.n
            for k, (col, r) in enumerate([((255, 140, 60), 0.55), ((255, 70, 120), 0.4), ((255, 220, 150), 0.35)]):
                cx = lw * (0.5 + 0.55 * math.sin(ph + k * 2.1))
                cy = lh * (0.3 + 0.45 * math.cos(ph * 0.7 + k * 1.3))
                g = np.exp(-(((xx_ - cx) / (lw * r)) ** 2 + ((yy_ - cy) / (lh * r * 0.8)) ** 2))
                lay += g[..., None] * np.array(col, np.float32)
            lay = np.asarray(Image.fromarray(np.clip(lay, 0, 255).astype(np.uint8)).resize((W, H), Image.BICUBIC), np.float32)
            pulse = 0.75 + 0.25 * math.sin(ph * 1.7)
            return screen(img, lay * 0.45 * amt * pulse)
        if typ == "godrays":
            lw, lh = 135, int(135 * H / W)
            yy_, xx_ = np.mgrid[0:lh, 0:lw].astype(np.float32)
            cx, cy = o.get("center", [0.7, -0.08])
            ang = np.arctan2(yy_ - cy * lh, xx_ - cx * lw)
            dist = np.hypot(yy_ - cy * lh, xx_ - cx * lw) / lh
            ph = t * 0.25 if not self.loop else TAU * i / self.n
            s = o["_seed"]
            rays = sum((0.5 + 0.5 * np.sin(ang * (11 + 6 * s[k]) + s[k + 4] * 9 + math.sin(ph + k) * 0.6)) ** 6 for k in range(3)) / 3
            lay = rays * np.exp(-dist * 1.1)
            lay = np.asarray(Image.fromarray((np.clip(lay, 0, 1) * 255).astype(np.uint8)).resize((W, H), Image.BICUBIC).filter(ImageFilter.GaussianBlur(W / 200)), np.float32)
            col = np.array(o.get("color", [255, 236, 190]), np.float32) / 255
            return screen(img, lay[..., None] * col * 0.6 * amt)
        if typ == "grade":
            look = o.get("look", "warm")
            g = {"warm": (1.06, 1.0, 0.9, 6), "cold": (0.9, 0.98, 1.08, 4), "teal-orange": (1.08, 0.98, 0.92, 0), "night": (0.85, 0.9, 1.12, -8), "dream": (1.04, 0.98, 1.06, 14)}.get(look, (1, 1, 1, 0))
            out = img * np.array(g[:3], np.float32) + g[3]
            if look == "teal-orange":
                lum = img.mean(-1, keepdims=True) / 255
                out = out + (1 - lum) * np.array([-10, 4, 14], np.float32)
            return img * (1 - amt) + out * amt
        if typ == "vignette":
            return img * o["_m"]
        if typ == "grain":
            r = np.random.default_rng(i * 7919 + 13)
            n = r.normal(0, 6 * amt, (H // 2, W // 2)).astype(np.float32)
            n = np.repeat(np.repeat(n, 2, 0), 2, 1)[:H, :W]
            return img + n[..., None]
        if typ == "letterbox":
            h = int(H * o.get("size", 0.08))
            img[:h] = 8
            img[H - h:] = 8
            return img
        raise SystemExit(f"未知叠层 {typ}（可选：fog rain snow dust bokeh lightleak godrays grade vignette grain letterbox）")


_SHOT = None


def _work(i):
    return _SHOT.frame(i).tobytes()


def render(job):
    """Render a whole shot to mp4. Frames are computed in parallel worker processes (fork shares the prepared
    source/depth read-only) and streamed in order into ffmpeg."""
    global _SHOT
    s = Shot(job)
    out = job["out"]
    os.makedirs(os.path.dirname(os.path.abspath(out)) or ".", exist_ok=True)
    cmd = ["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{s.W}x{s.H}", "-r", str(s.fps), "-i", "-",
           "-c:v", "libx264", "-preset", job.get("x264_preset", "veryfast"), "-crf", str(job.get("crf", 17)), "-pix_fmt", "yuv420p", out]
    pr = subprocess.Popen(cmd, stdin=subprocess.PIPE)
    workers = int(job.get("workers") or os.environ.get("S2V_WORKERS") or max(1, min(8, (os.cpu_count() or 2) - 1)))
    _SHOT = s
    if workers > 1 and s.n > 8 and hasattr(os, "fork"):
        import multiprocessing as mp
        with mp.get_context("fork").Pool(workers) as pool:
            for buf in pool.imap(_work, range(s.n), chunksize=2):
                pr.stdin.write(buf)
    else:
        for i in range(s.n):
            pr.stdin.write(s.frame(i).tobytes())
    pr.stdin.close()
    if pr.wait() != 0:
        raise SystemExit("ffmpeg 编码失败")
    return {"out": out, "frames": s.n, "depth": s.depth_used, "focus": s.focus if s.depth is not None else None, "preset": s.preset, "loop": s.loop}


def main(argv):
    if not argv or argv[0] in ("-h", "--help"):
        print(__doc__)
        return 0
    if argv[0] == "--presets":
        print(json.dumps({k: v["desc"] for k, v in PRESETS.items()}, ensure_ascii=False))
        return 0
    job = json.load(open(argv[0], encoding="utf-8")) if argv[0] != "-" else json.load(sys.stdin)
    if "--still" in argv:
        k = argv.index("--still")
        p, out = float(argv[k + 1]), argv[k + 2]
        s = Shot(job)
        Image.fromarray(s.frame(round(p * (s.n - 1)))).save(out)
        print(json.dumps({"out": out, "depth": s.depth_used}))
        return 0
    print(json.dumps(render(job), ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
