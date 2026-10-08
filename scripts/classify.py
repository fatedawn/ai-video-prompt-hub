"""Heuristic (keyword-based) taxonomy for prompts.

medium:    漫剧 | 真人 | 其他
direction: 现实向 | 特效向        (only for 漫剧 / 真人)
genre:     second/third-level folder
art_style: only for 漫剧 (2D日漫 / 3D国漫 / 3D卡通 / 水墨 / 粘土定格 / Q版 / 像素 / 绘画风 / 美漫 / 未注明)

Classification is automatic and imperfect. To fix one prompt, edit its front matter
(medium/direction/genre/art_style) and set `classification` to "manual"; build_index.py
then moves the file into the matching folder and will never re-classify it.
"""
import re

MG_STRONG = ["motion graphic", "mg animation", "mg 动画", "mg动画", "logo", "typography", "kinetic type", "infographic",
             "动态海报", "动态图形", "字体动画", "科普", "educational", "explainer", "动态壁纸", "wallpaper"]
# ---- keyword tables (lowercase; plain substrings unless they start with 're:') ----
ANIME_STRONG = ["anime", "animation", "animated", "cartoon", "chibi", "manga", "comic book", "cel-shad", "cel shad",
                "ghibli", "pixar", "claymation", "stop-motion", "stop motion", "plasticine", "donghua", "webtoon",
                "motion comic", "动漫", "动画", "漫画", "漫剧", "国漫", "日漫", "二次元", "卡通", "q版", "粘土", "定格动画",
                "赛璐璐", "番剧", "皮克斯", "吉卜力", "新海诚", "makoto shinkai", "3d cartoon", "toon shad",
                "アニメ", "애니메이션", "lego", "re:\\b2d\\b", "isekai", "异世界", "水墨动画"]
ANIME_WEAK = ["ink wash", "ink-wash", "水墨", "hand-drawn", "hand drawn", "手绘", "illustration", "pixel art", "像素",
              "low poly", "low-poly", "paper cut", "剪纸", "watercolor", "水彩", "oil painting", "油画", "impasto",
              "van gogh", "梵高", "felt ", "毛毡", "pbr", "3d 渲染", "3d渲染", "cg animation", "figurine", "手办"]
LIVE_OVERRIDE = ["live-action", "live action", "真人化", "真人版", "真人短剧", "真人剧"]
REAL = ["photoreal", "photo-real", "realistic", "hyperreal", "hyper-real", "ultra-real", "live-action", "film grain",
        "35mm", "shot on", "iphone", "minidv", "mini dv", "camcorder", "vlog", "documentary", "found footage", "ugc",
        "handheld", "写实", "实拍", "真人", "胶片", "纪录片", "手持", "dv ", "dv摄", "dv 摄", "cctv", "bodycam",
        "dashcam", "gopro", "selfie", "自拍", "real footage", "real person", "real people"]
HUMAN = ["woman", "man ", " men ", "girl", "boy", "person", "people", "child", "kid", "lady", "guy", "he ", "she ",
         "his ", "her ", "character", "protagonist", "host", "creator", "human", "dancer", "actor", "student",
         "rider", "explorer", "astronaut", "pilot", "driver", "samurai", "soldier", "warrior", "crowd", "family",
         "couple", "chef", "musician", "pianist", "model", "worker", "teen", "baby", "toddler", "mom", "dad",
         "女", "男", "人物", "主角", "少年", "少女", "孩子", "角色", "老人", "博主", "人群", "他", "她", "手", "骑手", "人"]
ANIMAL = ["cat ", "cats", "kitten", "dog", "puppy", "pet", "animal", "otter", "panda", "bird", "wildlife", "hamster",
          "rabbit", "bunny", "fox", "horse", "lion", "tiger", "bear", "penguin", "capybara", "猫", "狗", "宠物",
          "动物", "熊猫", "兔", "鸟", "仓鼠", "水豚", "企鹅"]
SCENERY = ["landscape", "scenery", "aerial", "drone", "timelapse", "time-lapse", "nature", "skyline", "空镜", "风景",
           "航拍", "延时", "自然风光", "风光", "山水", "cityscape", "establishing shot of"]
AD = ["commercial", "advert", "re:\\bads?\\b", "product", "re:\\bbrand", "re:\\bpromo(tional)?\\b", "unboxing", "广告", "带货", "产品", "品牌",
      "宣传片", "带货口播", "种草", "电商", "e-commerce", "tvc", "perfume", "香水", "商品", "开箱", "测评", "review video",
      "packshot", "hero shot"]
MOTION_GFX = ["motion graphic", "mg animation", "mg 动画", "mg动画", "logo", "typography", "kinetic type", "abstract",
              "infographic", "动态海报", "动态图形", "字体动画", "科普", "educational", "explainer", "game ui",
              "livestream overlay", "直播界面", "游戏界面", "hud", "loading screen", "wallpaper", "动态壁纸"]

FOOD = ["food", "cooking", "recipe", "dish", "美食", "烹饪", "吃播", "料理", "菜", "mukbang", "asmr"]

FX = ["fantasy", "magic", "sci-fi", "scifi", "science fiction", "spaceship", "space station", "alien", "robot", "mecha",
      "cyberpunk", "dragon", "monster", "kaiju", "godzilla", "superhero", "superpower", "explosion", "explode", "battle",
      "war ", "sword", "samurai", "ninja", "martial", "kung fu", "wuxia", "xianxia", "cultivat", "demon", "ghost",
      "zombie", "vampire", "horror", "apocalyp", "disaster", "tsunami", "tornado", "time freeze", "frozen time",
      "rewind", "portal", "teleport", "morph", "vfx", "visual effect", "surreal", "levitat", "energy blast", "lightning",
      "fight", "combat", "duel", "chase", "crash", "giant", "creature", "wizard", "spell", "phoenix", "mermaid",
      "仙侠", "玄幻", "修仙", "法术", "法阵", "武侠", "打斗", "剑", "刀", "神龙", "妖", "魔", "鬼", "僵尸", "丧尸",
      "末日", "灾难", "科幻", "机甲", "机器人", "外星", "太空", "宇宙", "超能力", "特效", "爆炸", "战斗", "大招",
      "异世界", "穿越", "时间冻结", "怪兽", "巨型", "神", "仙", "雷", "火焰", "能量", "对决", "格斗", "追逐", "枪",
      "哪吒", "敖丙", "交锋", "冰火", "时空", "飞升", "御剑", "结界"]

GENRES = {
    ("真人", "现实向"): [
        ("都市剧情", ["豪门", "千金", "总裁", "ceo", "霸总", "打脸", "反转", "逆袭", "职场", "office", "boss", "wedding",
                    "divorce", "离婚", "婚礼", "复仇", "revenge", "betray", "背叛", "婆婆", "mother-in-law", "短剧",
                    "mini-drama", "mini drama", "web drama", "爽剧", "workplace", "赘婿", "寿宴", "家族", "tycoon",
                    "billionaire", "humiliat", "plot twist", "宴会", "绿茶", "白莲", "mafia", "heiress", "嫁"]),
        ("甜宠恋爱", ["romance", "romantic", "love", "kiss", "couple", "crush", "boyfriend", "girlfriend", "恋爱",
                    "甜宠", "初恋", "暗恋", "心动", "告白", "情侣", "浪漫", "约会", "纯爱", "pure love", "first love",
                    "heart-flutter", "proposal", "求婚", "k-drama", "kdrama", "韩剧"]),
        ("悬疑犯罪", ["suspense", "mystery", "thriller", "detective", "crime", "murder", "police", "heist",
                    "interrogat", "悬疑", "犯罪", "侦探", "警察", "谋杀", "推理", "审讯", "刑侦", "执法记录仪",
                    "kidnap", "绑架", "stalker", "noir"]),
        ("情绪特写", ["emotion", "tears", "crying", "cries", "micro-expression", "microexpression", "close-up of her face",
                    "close-up of his face", "情绪", "微表情", "哭", "泪", "眼眶", "表情", "眼神", "grief", "heartbreak",
                    "monologue", "独白", "silent", "sob"]),
        ("年代怀旧", ["90s", "80s", "70s", "60s", "1950s", "1960s", "1970s", "1980s", "1990s", "retro", "vintage",
                    "nostalg", "y2k", "2000s", "vhs", "年代", "怀旧", "复古", "千禧", "老式", "旧时光", "民国",
                    "old film", "super 8", "8mm", "16mm"]),
        ("生活与vlog", ["vlog", "minidv", "mini dv", "camcorder", "ugc", "selfie", "daily", "home video", "family",
                     "日常", "家庭", "生活", "随拍", "自拍", "travel", "city walk", "旅行", "街头", "探店", "pov",
                     "gopro", "first-person", "第一人称", "dv", "iphone", "phone footage", "手机", "cooking", "做饭",
                     "morning routine", "walk"]),
        ("运动", ["sport", "basketball", "football", "soccer", "skate", "surf", "ski", "parkour", "tennis", "athlete",
                "gym", "workout", "健身", "体育", "篮球", "足球", "滑板", "冲浪", "跑酷", "滑雪", "比赛"]),
        ("喜剧整活", ["meme", "comedy", "comedic", "funny", "prank", "humor", "hilarious", "搞笑", "整活", "喜剧",
                    "沙雕", "段子", "吐槽", "脱口秀", "talk show", "sketch", "小品", "absurd"]),
        ("音乐MV", ["music video", "re:\\bmv\\b", "dance", "dancing", "concert", "singer", "rap", "舞蹈", "演唱",
                  "卡点", "beat-sync", "beat sync", "跳舞", "choreograph"]),
        ("时尚写真", ["fashion", "lookbook", "runway", "editorial", "haute couture", "写真", "时尚", "穿搭", "变装",
                    "outfit", "model walk", "catwalk", "portrait"]),
    ],
    ("真人", "特效向"): [
        ("古装仙侠玄幻", ["仙侠", "玄幻", "修仙", "古装", "宫廷", "神仙", "法术", "xianxia", "cultivat", "immortal",
                      "女帝", "神龙", "hanfu", "汉服", "ancient chinese", "emperor", "palace", "天庭", "仙", "法阵",
                      "符文", "qing dynasty", "dynasty"]),
        ("武侠打斗", ["武侠", "打斗", "功夫", "剑客", "江湖", "martial art", "kung fu", "wuxia", "sword fight",
                    "samurai", "katana", "ninja", "fight", "combat", "duel", "boxing", "格斗", "对决", "拳", "刀",
                    "剑", "punch", "kick"]),
        ("科幻", ["sci-fi", "scifi", "science fiction", "cyberpunk", "spaceship", "space station", "astronaut", "alien",
                "robot", "android", "mecha", "futur", "2100", "赛博", "科幻", "机甲", "机器人", "太空", "宇航", "外星",
                "未来", "mars", "火星", "hologram", "全息", "orbit"]),
        ("奇幻怪兽", ["fantasy", "dragon", "monster", "kaiju", "giant", "creature", "godzilla", "magic", "wizard", "fairy",
                    "elf", "mermaid", "奇幻", "怪兽", "巨兽", "魔法", "精灵", "人鱼", "巨型", "phoenix", "unicorn",
                    "witch", "spell", "enchant", "龙"]),
        ("恐怖灵异", ["horror", "ghost", "haunted", "zombie", "demon", "possess", "creepy", "scary", "vampire", "恐怖",
                    "鬼", "灵异", "丧尸", "僵尸", "惊悚", "slasher", "infected", "感染", "curse", "诅咒"]),
        ("动作大片", ["action", "chase", "explosion", "heist", "war ", "battle", "soldier", "military", "disaster",
                    "tsunami", "earthquake", "tornado", "apocalyp", "blockbuster", "stunt", "动作", "追车", "爆炸",
                    "战争", "灾难", "末日", "大片", "枪战", "racing", "赛车", "car chase", "crash", "jet", "helicopter",
                    "直升机", "gun"]),
        ("超现实创意", ["surreal", "time freeze", "frozen time", "rewind", "morph", "transform", "portal", "dream",
                     "impossible", "miniature", "超现实", "时间冻结", "倒放", "变身", "穿越", "脑洞", "levitat",
                     "zipper", "mirror", "镜子", "reverse"]),
    ],
    ("漫剧", "现实向"): [
        ("都市校园", ["school", "campus", "classroom", "student", "校园", "学生", "教室", "都市", "office", "city",
                    "职场", "豪门", "千金", "总裁", "反转", "短剧"]),
        ("甜宠恋爱", ["romance", "romantic", "love", "kiss", "couple", "crush", "恋爱", "甜宠", "初恋", "暗恋", "心动",
                    "告白", "情侣", "浪漫", "纯爱"]),
        ("日常治愈", ["slice of life", "healing", "cozy", "治愈", "日常", "ghibli", "吉卜力", "温馨", "warm", "peaceful",
                    "relax", "家", "kitchen", "cafe"]),
        ("喜剧搞笑", ["meme", "comedy", "funny", "prank", "humor", "搞笑", "整活", "喜剧", "沙雕", "吐槽", "raging",
                    "absurd"]),
        ("悬疑惊悚", ["suspense", "mystery", "thriller", "detective", "horror", "悬疑", "推理", "恐怖", "惊悚"]),
    ],
    ("漫剧", "特效向"): [
        ("仙侠玄幻", ["仙侠", "玄幻", "修仙", "古装", "神仙", "法术", "xianxia", "cultivat", "immortal", "女帝",
                    "神龙", "哪吒", "nezha", "敖丙", "法阵", "符文", "天庭", "仙", "洪荒", "上古", "神话", "myth"]),
        ("武侠打斗", ["武侠", "打斗", "功夫", "剑客", "江湖", "martial art", "kung fu", "wuxia", "samurai", "katana",
                    "ninja", "duel", "格斗", "对决", "拳", "刀", "剑", "breathing", "呼吸法", "tournament", "武道会"]),
        ("科幻机甲", ["sci-fi", "scifi", "cyberpunk", "spaceship", "space", "robot", "mecha", "mech ", "futur", "赛博",
                    "科幻", "机甲", "机器人", "太空", "外星", "未来", "gundam"]),
        ("奇幻冒险", ["fantasy", "isekai", "异世界", "dragon", "magic", "wizard", "adventure", "冒险", "奇幻", "魔法",
                    "精灵", "creature", "monster", "怪兽", "kaiju", "giant", "otter"]),
        ("战斗大招", ["battle", "大招", "ultimate", "energy", "power", "fight", "combat", "战斗", "必杀", "能量",
                    "爆发", "clash", "superpower", "超能力", "goku", "saitama"]),
    ],
    ("其他", None): [],
}
DEFAULT_GENRE = {("真人", "现实向"): "剧情短片", ("真人", "特效向"): "特效综合",
                 ("漫剧", "现实向"): "剧情短片", ("漫剧", "特效向"): "特效综合"}

ART_STYLES = [
    ("粘土定格", ["clay", "claymation", "stop-motion", "stop motion", "粘土", "定格动画", "felt ", "毛毡", "lego", "plasticine",
               "figurine", "手办"]),
    ("水墨", ["ink wash", "ink-wash", "水墨", "chinese ink"]),
    ("Q版", ["chibi", "q版", "q 版", "super-deformed"]),
    ("像素", ["pixel art", "像素", "8-bit", "16-bit"]),
    ("3D国漫", ["国漫", "donghua", "3d 国漫", "3d国漫", "pbr", "仙侠", "玄幻", "哪吒", "nezha"]),
    ("3D卡通", ["pixar", "皮克斯", "3d cartoon", "3d animation", "3d animated", "disney", "3d 卡通", "3d卡通", "cgi cartoon",
              "dreamworks", "3d character", "3d cg"]),
    ("美漫", ["comic book", "marvel", "dc comics", "american comic", "美漫", "spider-verse"]),
    ("绘画风", ["oil painting", "油画", "watercolor", "水彩", "impasto", "van gogh", "梵高", "hand-drawn", "hand drawn",
             "手绘", "paper cut", "剪纸", "pastel", "粉彩", "crayon", "蜡笔", "sketch", "线稿"]),
    ("2D日漫", ["anime", "日漫", "re:\\b2d\\b", "二维", "cel-shad", "cel shad", "manga", "ghibli", "吉卜力", "shinkai", "新海诚",
              "二次元", "番剧", "shonen", "アニメ", "makoto", "kyoto animation", "90s anime"]),
]

TEMPLATE_HINTS = {  # LearnPrompt case-taxonomy template id -> extra "head" words
    "handheld-ugc-vlog": "vlog ugc 写实", "retro-found-footage": "vintage vlog 写实", "pov-continuous-take": "pov 写实",
    "travel-city-walk": "travel vlog", "ugc-creator-review": "product review video", "product-commercial-shotlist": "commercial product",
    "fashion-lookbook": "fashion lookbook", "food-asmr": "food asmr", "3d-cartoon": "3d cartoon animation",
    "anime-style-lock": "anime", "stop-motion-cadence": "stop-motion", "epic-fantasy-scifi": "fantasy sci-fi",
    "combat-choreography": "fight combat", "horror-suspense": "horror suspense", "meme-comedy": "meme comedy",
    "music-beat-sync-mv": "music video dance", "sports-extreme": "sport", "game-ui-livestream": "game ui",
    "time-freeze-rewind": "time freeze surreal", "car-vehicle": "car", "pet-animal": "pet animal",
    "dialogue-performance-beats": "emotion", "cinematic-narrative-short": "", "process-transformation-montage": "transform",
}

NEG_LINE = re.compile(r"^\s*[\[【(（]?\s*(negative|avoid|constraints?|don't|do not|负面|禁止|强制禁止|排除|不要|避免|禁)", re.I)
NEG_PHRASE = re.compile(r"(\bno\b|\bnot\b|\bavoid\w*|\bwithout\b|\bnon-|\bnever\b|不要|避免|禁止|严禁|不是|拒绝|杜绝)"
                        r"[^.,;:\n，。；：]{0,25}", re.I)


def _clean(text):
    lines = [l for l in text.split("\n") if not NEG_LINE.match(l)]
    return NEG_PHRASE.sub(" ", "\n".join(lines)).lower()


_RX = {}


def _rx(k):
    """ASCII keywords match at a word start (and also at a word end when short or written with a trailing
    space); CJK keywords are plain substrings; 're:' prefix = raw regex."""
    if k not in _RX:
        if k.startswith("re:"):
            _RX[k] = re.compile(k[3:])
        elif re.fullmatch(r"[a-z0-9 .'/-]+", k):
            core = re.escape(k.strip())
            tail = r"(?![a-z])" if (k.endswith(" ") or len(k.strip()) <= 4) else ""
            _RX[k] = re.compile(r"(?<![a-z])" + core + tail)
        else:
            _RX[k] = re.compile(re.escape(k))
    return _RX[k]


def _hits(text, kws):
    return sum(1 for k in kws if _rx(k).search(text))


def classify(title="", title_en="", description="", prompt="", tags=(), hints=""):
    head = _clean(" ".join([title or "", title_en or "", description or "", " ".join(tags or []), hints or ""]))
    body = _clean(prompt or "")
    both = head + "\n" + body

    def score(kws, wh=3, cap=4):
        return wh * _hits(head, kws) + min(_hits(body, kws), cap)

    live_override = _hits(head, LIVE_OVERRIDE) > 0 or _hits(body[:160], LIVE_OVERRIDE) > 0
    anime = 3 * _hits(head, ANIME_STRONG) + 2 * min(_hits(body, ANIME_STRONG), 3) + \
        2 * _hits(head, ANIME_WEAK) + min(_hits(body, ANIME_WEAK), 2)
    real = 3 * _hits(head, REAL) + min(_hits(body, REAL), 4)
    # the opening of a prompt usually states the medium ("A cinematic 3D anime action sequence…"), so weight it like the head
    lead = body[:160]
    anime += 2 * min(_hits(lead, ANIME_STRONG), 1)
    real += min(_hits(lead, REAL), 1)
    is_anime = (not live_override) and anime >= 3 and anime >= real
    has_human = _hits(both, HUMAN) > 0

    # ---- third bucket: neither 漫剧 nor 真人 drama ----
    other = None
    if _hits(head, AD) and not _hits(head, ["短剧", "drama", "film", "电影", "story", "剧情", "re:\\bcinema\\b", "re:\\bmovie\\b"]):
        other = "广告带货"
    elif _hits(head, MG_STRONG) or (not has_human and (_hits(head, MOTION_GFX) or _hits(body, MOTION_GFX) >= 2)):
        other = "动态图形与界面"
    elif _hits(head, ANIMAL) and not has_human and not is_anime:
        other = "动物萌宠"
    elif _hits(head, SCENERY) and not has_human:
        other = "风景空镜"
    elif _hits(head, FOOD) and not has_human and not is_anime:
        other = "美食"
    if other:
        return {"medium": "其他", "direction": None, "genre": other, "art_style": None}

    medium = "漫剧" if is_anime else "真人"
    fx = 3 * _hits(head, FX) + min(_hits(body, FX), 5)
    direction = "特效向" if fx >= 4 else "现实向"
    best, best_s = None, 0
    for g, kws in GENRES[(medium, direction)]:
        s = score(kws)
        if s > best_s:
            best, best_s = g, s
    genre = best if best_s >= 2 else DEFAULT_GENRE[(medium, direction)]
    art = None
    if medium == "漫剧":
        art, art_s = "未注明", 0
        for a, kws in ART_STYLES:
            s = score(kws)
            if s > art_s:
                art, art_s = a, s
    return {"medium": medium, "direction": direction, "genre": genre, "art_style": art}


def folder_for(meta):
    if meta["medium"] == "其他":
        return f"其他/{meta['genre']}"
    return f"{meta['medium']}/{meta['direction']}/{meta['genre']}"
