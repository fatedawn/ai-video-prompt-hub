#!/usr/bin/env python3
"""Procedural stand-in stills for the stills2video sample (original code, Apache-2.0, (c) 2026 天机).
In real use these would be your ChatGPT Images downloads; here we draw them so the repo ships no third-party art.

usage: python3 make_stills.py OUT_DIR [--xianxia path.jpg]
writes 01_*.png … 05_*.png (1024x1536, 2:3 portrait, like ChatGPT's 1024x1536 option)
"""
import math, os, shutil, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

W, H = 1024, 1536
REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", ".."))


def noise1d(n, rng, octaves=5):
    out = np.zeros(n)
    amp = 1.0
    for o in range(octaves):
        k = 4 * 2 ** o
        pts = rng.random(k + 1)
        out += amp * np.interp(np.linspace(0, k, n), np.arange(k + 1), pts)
        amp *= 0.5
    return out / 2


def lerp(a, b, t):
    return tuple(int(a[i] + (b[i] - a[i]) * t) for i in range(3))


def vgrad(top, bot, w=W, h=H):
    t = np.linspace(0, 1, h)[:, None, None]
    return (np.array(top) * (1 - t) + np.array(bot) * t).repeat(w, 1).astype(np.uint8)


def sea_of_clouds(out, rng):
    img = Image.fromarray(vgrad((250, 214, 170), (122, 150, 196)))
    d = ImageDraw.Draw(img, "RGBA")
    # sun + glow
    glow = Image.new("L", (W, H), 0)
    ImageDraw.Draw(glow).ellipse([W * 0.62 - 260, H * 0.22 - 260, W * 0.62 + 260, H * 0.22 + 260], fill=150)
    glow = glow.filter(ImageFilter.GaussianBlur(120))
    img = Image.composite(Image.new("RGB", (W, H), (255, 240, 205)), img, glow)
    d = ImageDraw.Draw(img, "RGBA")
    # (no hard sun disk: the cinemagraph "drift" flow ghosts small discrete objects; soft glows are fine)
    ridges = [(0.42, 120, (150, 160, 196)), (0.50, 170, (118, 128, 170)), (0.60, 230, (82, 92, 136)), (0.74, 300, (48, 56, 96)), (0.88, 360, (26, 30, 58))]
    for k, (base, amp, col) in enumerate(ridges):
        n = noise1d(W, rng)
        xs = np.arange(W)
        peaks = np.zeros(W)
        for _ in range(2 + k):  # smooth gaussian summits instead of sine teeth
            c, wdt = rng.uniform(-0.1, 1.1) * W, rng.uniform(0.10, 0.22) * W
            peaks = np.maximum(peaks, np.exp(-((xs - c) / wdt) ** 2))
        ys = H * base - amp * (0.35 * n + 0.75 * peaks)
        poly = [(0, H)] + [(x, ys[x]) for x in range(W)] + [(W, H)]
        d.polygon(poly, fill=col + (255,))
        # cloud band in front of each far ridge
        if k < 4:
            cl = Image.new("L", (W, H), 0)
            cd = ImageDraw.Draw(cl)
            for _ in range(28):
                cx, cy = rng.uniform(-100, W + 100), H * base + rng.uniform(-10, 60)
                r = rng.uniform(60, 170)
                cd.ellipse([cx - r * 1.8, cy - r * 0.5, cx + r * 1.8, cy + r * 0.5], fill=int(rng.uniform(120, 220)))
            cl = cl.filter(ImageFilter.GaussianBlur(28))
            img = Image.composite(Image.new("RGB", (W, H), (246, 240, 236)), img, cl)
            d = ImageDraw.Draw(img, "RGBA")
    # a tiny pavilion on the nearest peak
    px, py = int(W * 0.24), int(H * 0.88 - 360 * 0.9)
    d.polygon([(px - 60, py), (px + 60, py), (px + 30, py - 30), (px - 30, py - 30)], fill=(20, 20, 36, 255))
    d.rectangle([px - 40, py, px + 40, py + 40], fill=(20, 20, 36, 255))
    img.save(out)


def city_night(out, rng):
    img = Image.fromarray(vgrad((12, 16, 46), (70, 40, 92)))
    d = ImageDraw.Draw(img, "RGBA")
    for _ in range(260):
        x, y = rng.uniform(0, W), rng.uniform(0, H * 0.45)
        b = int(rng.uniform(80, 255))
        d.point((x, y), fill=(b, b, b, 255))
    mg = Image.new("L", (W, H), 0)  # soft moon glow (see note in sea_of_clouds)
    ImageDraw.Draw(mg).ellipse([W * 0.78 - 110, H * 0.11 - 110, W * 0.78 + 110, H * 0.11 + 110], fill=170)
    img = Image.composite(Image.new("RGB", (W, H), (236, 226, 210)), img, mg.filter(ImageFilter.GaussianBlur(60)))
    d = ImageDraw.Draw(img, "RGBA")
    layers = [(0.50, (38, 34, 74), 0.25), (0.58, (24, 22, 52), 0.5), (0.68, (12, 12, 30), 1.0)]
    for base, col, lit in layers:
        x = -20
        while x < W:
            bw = rng.uniform(50, 130) * (0.6 + lit * 0.5)
            top = H * base - rng.uniform(80, 420) * (0.5 + lit * 0.6)
            d.rectangle([x, top, x + bw, H * 0.80], fill=col + (255,))
            for wy in np.arange(top + 14, H * 0.78, 18 + 6 * lit):
                for wx in np.arange(x + 8, x + bw - 8, 14 + 4 * lit):
                    if rng.random() < 0.38:
                        c = (255, int(rng.uniform(190, 235)), int(rng.uniform(110, 170)), int(150 + 100 * lit))
                        d.rectangle([wx, wy, wx + 5 + 3 * lit, wy + 7 + 3 * lit], fill=c)
            x += bw + rng.uniform(2, 12)
    # river with reflection
    top = img.crop((0, int(H * 0.5), W, int(H * 0.80))).transpose(Image.FLIP_TOP_BOTTOM).filter(ImageFilter.GaussianBlur(3))
    water = Image.fromarray((np.asarray(top).astype(np.float32) * 0.55 + np.array([10, 14, 40]) * 0.45).astype(np.uint8))
    img.paste(water.resize((W, H - int(H * 0.80))), (0, int(H * 0.80)))
    d = ImageDraw.Draw(img, "RGBA")
    d.rectangle([0, H * 0.80 - 4, W, H * 0.80 + 2], fill=(255, 200, 140, 120))
    img.save(out)


def bamboo_mist(out, rng):
    img = Image.fromarray(vgrad((214, 230, 216), (150, 176, 140)))
    for depth in range(5):  # far -> near
        lay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        d = ImageDraw.Draw(lay)
        k = depth / 4
        col = lerp((176, 200, 170), (28, 64, 34), k)
        for _ in range(int(14 - depth * 2)):
            x = rng.uniform(-40, W + 40)
            w = 10 + 34 * k + rng.uniform(-3, 3)
            d.rectangle([x, -10, x + w, H + 10], fill=col + (255,))
            for y in np.arange(rng.uniform(0, 160), H, 150 + 60 * k):
                d.rectangle([x - 2, y, x + w + 2, y + 4 + 3 * k], fill=lerp(col, (10, 20, 10), 0.3) + (255,))
            for _ in range(int(4 + 4 * k)):  # leaves
                lx, ly = x + w / 2, rng.uniform(0, H * 0.7)
                for j in range(5):
                    a = rng.uniform(-0.9, 0.9) + (math.pi if rng.random() < 0.5 else 0)
                    L = 50 + 80 * k
                    d.polygon([(lx, ly), (lx + math.cos(a) * L, ly + math.sin(a) * L * 0.4 + 10), (lx + math.cos(a) * L * 0.5, ly + math.sin(a) * L * 0.2 + 18)], fill=lerp(col, (60, 120, 50), 0.3) + (255,))
        img = Image.alpha_composite(img.convert("RGBA"), lay)
        if depth < 4:  # mist between layers
            mist = Image.new("RGBA", (W, H), (236, 242, 236, int(80 - depth * 12)))
            img = Image.alpha_composite(img, mist)
    img.convert("RGB").save(out)


def tianji_stage(out, rng):
    sheet = Image.open(os.path.join(REPO, "docs", "assets", "tianji_sheet.png")).convert("RGB")
    sw, sh = sheet.size
    # "signature move" cell (bottom row, 2nd column) of the 4-column sheet
    cell = sheet.crop((int(sw * 0.25), int(sh * 0.72), int(sw * 0.5), int(sh * 0.965)))
    bg = Image.fromarray(vgrad((40, 36, 70), (14, 12, 26)))
    glow = Image.new("L", (W, H), 0)
    ImageDraw.Draw(glow).ellipse([W * 0.5 - 420, H * 0.48 - 420, W * 0.5 + 420, H * 0.48 + 420], fill=255)
    glow = glow.filter(ImageFilter.GaussianBlur(160))
    bg = Image.composite(Image.new("RGB", (W, H), (236, 214, 160)), bg, glow)
    d = ImageDraw.Draw(bg, "RGBA")
    d.ellipse([W * 0.5 - 300, H * 0.78 - 50, W * 0.5 + 300, H * 0.78 + 50], fill=(30, 24, 40, 160))  # stage shadow
    # paper card with the character (keeps the hand-drawn look; the paper is part of the design)
    cw = int(W * 0.78)
    card = cell.resize((cw, int(cell.height * cw / cell.width)), Image.LANCZOS)
    mask = Image.new("L", card.size, 0)
    ImageDraw.Draw(mask).rounded_rectangle([0, 0, card.width, card.height], radius=40, fill=255)
    bg.paste(card, ((W - card.width) // 2, int(H * 0.2)), mask)
    bg.save(out)


def main(argv):
    out = os.path.abspath(argv[0] if argv else "stills")
    os.makedirs(out, exist_ok=True)
    rng = np.random.default_rng(2026)
    xian = argv[argv.index("--xianxia") + 1] if "--xianxia" in argv else None
    if xian and os.path.exists(xian):
        shutil.copy(xian, os.path.join(out, "01_竹溪.jpg"))
    else:
        bamboo_mist(os.path.join(out, "01_竹溪.png"), np.random.default_rng(1))
    sea_of_clouds(os.path.join(out, "02_云海.png"), rng)
    city_night(os.path.join(out, "03_城市夜景.png"), rng)
    tianji_stage(os.path.join(out, "04_天机.png"), rng)
    bamboo_mist(os.path.join(out, "05_竹林晨雾.png"), rng)
    print("\n".join(sorted(os.listdir(out))))


if __name__ == "__main__":
    main(sys.argv[1:])
