#!/usr/bin/env python3
"""Pre-publication content audit for third-party prompts (keyword rules + manual overrides).

Called from scripts/extract_sources.py on the full extracted records (the published data/ exports no longer contain the
text of downgraded entries). The CLI re-checks any jsonl dump of full records. Decides, per record, one of:
  keep       — full text stays
  link-only  — keep title, credit and links plus a one-line neutral summary, but do not republish the prompt text
  exclude    — not published at all (only for sexualised content involving minors; id + reason kept in the report)

Rules are deliberately conservative (when in doubt → link-only, never drop the credit). Manual decisions in
data/audit_overrides.tsv (id<TAB>action<TAB>reason<TAB>note) win over the rules.
Usage: python3 scripts/audit.py --jsonl FULL_RECORDS.jsonl [--dump out.tsv] [--show reason]
"""
import csv, json, re, sys
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

def W(*words):  # English words/phrases with word boundaries, case-insensitive
    return re.compile(r"(?<![A-Za-z])(?:" + "|".join(words) + r")(?![A-Za-z])", re.I)

def WC(*words):  # English proper nouns, case-sensitive (avoids "venom", "goofy", "dove", "puma", "amazon" …)
    return re.compile(r"(?<![A-Za-z])(?:" + "|".join(words) + r")(?![A-Za-z])")

def Z(*words):  # CJK substrings
    return re.compile("|".join(words))

# ---- real, identifiable people as the subject (politicians, celebrities, athletes, executives, streamers) ----
# Directors / cinematographers / composers named only as a *style* reference (e.g. "lit like Roger Deakins") are not listed.
REAL_EN = W(r"Elon\s+Musk", r"Donald\s+Trump", r"Trump", r"Joe\s+Biden", r"Biden", r"Barack\s+Obama", r"Obama", r"Vladimir\s+Putin", r"Putin",
    r"Zelensky[iy]?", r"Xi\s+Jinping", r"Mao\s+Zedong", r"Kim\s+Jong[\s-]?un", r"Emmanuel\s+Macron", r"Narendra\s+Modi", r"Netanyahu", r"Boris\s+Johnson",
    r"King\s+Charles", r"Queen\s+Elizabeth", r"Princess\s+Diana", r"Kamala\s+Harris", r"Pope\s+Francis", r"Pope\s+Leo", r"Dalai\s+Lama",
    r"Taylor\s+Swift", r"Beyonc[eé]", r"Rihanna", r"Ariana\s+Grande", r"Billie\s+Eilish", r"Lady\s+Gaga", r"Kanye\s+West", r"Justin\s+Bieber",
    r"Selena\s+Gomez", r"Kim\s+Kardashian", r"Kardashian", r"Michael\s+Jackson", r"Marilyn\s+Monroe", r"Elvis\s+Presley", r"Brad\s+Pitt", r"Angelina\s+Jolie",
    r"Leonardo\s+DiCaprio", r"DiCaprio", r"Tom\s+Cruise", r"Will\s+Smith", r"Keanu\s+Reeves", r"Johnny\s+Depp", r"Dwayne\s+Johnson",
    r"Jackie\s+Chan", r"Bruce\s+Lee", r"Jet\s+Li", r"Donnie\s+Yen", r"Stephen\s+Chow", r"Andy\s+Lau", r"Tony\s+Leung", r"Chow\s+Yun[\s-]?fat", r"Jay\s+Chou",
    r"Liu\s+Yifei", r"Scarlett\s+Johansson", r"Zendaya", r"Timoth[eé]e\s+Chalamet", r"Margot\s+Robbie", r"Ryan\s+Gosling", r"Ryan\s+Reynolds",
    r"Robert\s+Downey", r"Chris\s+Hemsworth", r"Gal\s+Gadot", r"Emma\s+Watson", r"Daniel\s+Radcliffe", r"Henry\s+Cavill", r"Tom\s+Holland",
    r"Morgan\s+Freeman", r"Samuel\s+L\.?\s+Jackson", r"Arnold\s+Schwarzenegger", r"Schwarzenegger", r"Sylvester\s+Stallone", r"Jason\s+Statham",
    r"Vin\s+Diesel", r"Rowan\s+Atkinson", r"Mr\.?\s+Bean", r"Messi", r"Cristiano\s+Ronaldo", r"Ronaldo", r"Neymar", r"Mbapp[eé]", r"Haaland",
    r"LeBron(\s+James)?", r"Kobe\s+Bryant", r"Michael\s+Jordan", r"Stephen\s+Curry", r"Steph\s+Curry", r"Yao\s+Ming", r"Eileen\s+Gu", r"Usain\s+Bolt",
    r"Djokovic", r"Tiger\s+Woods", r"Shohei\s+Ohtani", r"Virat\s+Kohli", r"MS\s+Dhoni", r"Sachin\s+Tendulkar",
    r"Jeff\s+Bezos", r"Mark\s+Zuckerberg", r"Bill\s+Gates", r"Steve\s+Jobs", r"Tim\s+Cook", r"Jensen\s+Huang", r"Sam\s+Altman",
    r"Sundar\s+Pichai", r"Satya\s+Nadella", r"Warren\s+Buffett", r"Jack\s+Ma", r"Lei\s+Jun", r"MrBeast", r"Mr\s+Beast", r"PewDiePie", r"IShowSpeed",
    r"Kai\s+Cenat", r"Logan\s+Paul", r"Khaby\s+Lame", r"Jungkook", r"BLACKPINK", r"Jennie\s+Kim", r"G-Dragon", r"NewJeans",
    r"Shah\s+Rukh\s+Khan", r"Salman\s+Khan", r"Greta\s+Thunberg", r"Hitler", r"Adolf\s+Hitler", r"Joseph\s+Stalin", r"Zohran\s+Mamdani", r"Elon(?=\s+(Musk|transform|vs|fight|as)\b)", r"Amitabh\s+Bachchan", r"Roger\s+Federer", r"Rafael\s+Nadal", r"BTS\s+(?:members?|band|Jungkook|V\b)", r"Charlie\s+Kirk",
    r"Zohran\s+Mamdani", r"Sydney\s+Sweeney", r"Millie\s+Bobby\s+Brown", r"Snoop\s+Dogg", r"Eminem", r"Ed\s+Sheeran", r"Bad\s+Bunny", r"Shakira", r"Dua\s+Lipa",
    r"Kendall\s+Jenner", r"Kylie\s+Jenner", r"Hailey\s+Bieber", r"Jenna\s+Ortega", r"Pedro\s+Pascal", r"Jason\s+Momoa", r"Chris\s+Evans",
    r"Benedict\s+Cumberbatch", r"Tom\s+Hanks", r"Jim\s+Carrey", r"Nicolas\s+Cage", r"Mike\s+Tyson", r"Conor\s+McGregor", r"Jake\s+Paul", r"Akshay\s+Kumar", r"Bryan\s+Cranston")
REAL_ZH = Z("马斯克", "米莉·(?:博比|芭比)·布朗", r"成龙(?=[式风般]|大哥|的电影|电影)", r"(?:和|与|跟|大战|对决|对阵|vs\.?\s*)成龙", "达赖喇嘛", "勒布朗", "迈克尔·乔丹", "斯蒂芬·库里", "科比·布莱恩特", "尤塞恩·博尔特", "蒂姆·库克", "特朗普", "川普", "拜登", "奥巴马", "普京", "泽连斯基", "习近平", "习主席", "总书记", "毛泽东", "毛主席", "邓小平", "江泽民", "胡锦涛",
    "温家宝", "李克强", "彭丽媛", "周恩来", "金正恩", "马克龙", "莫迪", "内塔尼亚胡", "戴安娜王妃", "泰勒·斯威夫特", "霉霉", "迈克尔·杰克逊",
    "梦露", "布拉德·皮特", "汤姆·克鲁斯", "阿汤哥", "威尔·史密斯", "基努·里维斯", "巨石强森", "李小龙", "李连杰", "甄子丹", "周星驰", "刘德华",
    "梁朝伟", "周润发", "周杰伦", "王一博", "肖战", "杨幂", "赵丽颖", "迪丽热巴", "刘亦菲", "范冰冰", "杨紫", "易烊千玺", "蔡徐坤", "吴京", "沈腾", "贾玲",
    "黄渤", "梅西", "C罗", "内马尔", "姆巴佩", "哈兰德", "姚明", "谷爱凌", "大谷翔平", "苏炳添", "全红婵",
    "孙颖莎", "樊振东", "刘翔", "张伟丽", "贝索斯", "扎克伯格", "比尔·盖茨", "比尔盖茨", "乔布斯", "黄仁勋", "巴菲特", "马云",
    "马化腾", "雷军", "刘强东", "董明珠", "罗永浩", "任正非", "张一鸣", "俞敏洪", "王健林", "李嘉诚", "李佳琦", "薇娅", "辛巴", "董宇辉", "papi酱",
    "李子柒", "小杨哥", "丁真", "憨豆", "希特勒", "斯大林", "木村拓哉", "新垣結衣", "新垣结衣", "橋本環奈", "トランプ", "イーロン")

# ---- sexual content / minors ----
SEX_STRONG = W(r"nude(?![\s-]+(?:over|stockings?|tights|nails?|polish|lips?|lipstick|makeup|tones?|colou?r|pink|heels|pumps|beige|eyeshadow|shades?|palette|gloss|blush|sandals|shoes|dress|slip))", r"naked(?!\s+eyes?)", r"nudity", r"topless", r"nipples?", r"genitals?", r"porn\w*", r"erotic\w*", r"nsfw", r"sex\s+scene", r"having\s+sex",
    r"sexual\s+intercourse", r"orgasm\w*", r"masturbat\w*", r"fetish\w*", r"bdsm", r"hentai", r"ahegao", r"upskirt", r"bare\s+breasts?", r"see-through\s+(top|dress|shirt|lingerie)",
    r"strip\s*tease", r"stripper", r"lap\s*dance", r"panties", r"thong(?![\s-]+sandals?)", r"camel\s*toe", r"sexual(ly)?\s+(explicit|suggestive)") 
SEX_STRONG_ZH = Z("裸体", "全裸(?![车露架])", "半裸", "裸露(?:的)?(?:身体|胴体|胸|乳|下体|私处|臀)", "全身赤裸", "赤身裸体", "一丝不挂", "(?<!角)色情", "性爱", "做爱", "(?<![表神])情色", "乳头(?!状)", "露点", "脱衣舞", "臀部特写", "裙底", "成人内容", "18禁", "ヌード", "裸身", "裸照")
SEX_WEAK = W(r"sexy", r"seductive\w*", r"sensual\w*", r"lingerie", r"bikini", r"cleavage", r"busty", r"twerk\w*", r"provocative\w*", r"bra", r"underwear",
    r"low-cut", r"skimpy", r"curvy\s+body", r"voluptuous", r"bare\s+thighs?", r"buttocks", r"booty", r"jiggl\w*", r"bouncing\s+breasts?", r"breasts", r"chest\s+bounce",
    r"wet\s+(shirt|dress|body)", r"kiss\w*\s+passionately", r"bedroom\s+eyes", r"hot\s+girl", r"flirt\w*", r"teas(?:ing|e)\s+(?:the\s+)?(?:viewer|camera)", r"camera\s+(?:slowly\s+)?(?:tilts|pans)\s+down\s+(?:her|to\s+her)\s+(?:body|legs)", r"tight\s+(dress|leggings|bodysuit)")
SEX_WEAK_ZH = Z("性感", "诱惑", "妩媚", "撩人", "比基尼", "内衣", "乳沟", "丰满", "翘臀", "美腿", "大长腿", "黑丝", "丝袜", "湿身", "低胸", "抖胸", "酥胸", "暧昧", "挑逗", "魅惑", "娇媚", "若隐若现", "修长(?:的)?双腿", "大腿裸露", "裸露在外", "赤足", "赤裸(?:的)?(?:脚|双脚)", "吊带", "撩", r"镜头(?:缓缓|平稳|慢慢)?下移", "勾人", "风情万种", "セクシー", "ビキニ", "下着")
MINOR = W(r"child(ren)?", r"kids?", r"little\s+girls?", r"little\s+boys?", r"schoolgirls?", r"school\s+girls?", r"schoolboys?", r"teen(ager|agers|s)?", r"teenage\s+(girl|boy|student)s?",
    r"underage", r"loli\w*", r"high[\s-]school\s+(girl|student|boy)s?", r"middle[\s-]school\s+(girl|student|boy)s?", r"elementary\s+school\s+(girl|student|boy)s?", r"toddlers?", r"preteens?", r"(?<![\d-])(?:1[0-7]|[1-9])[\s-]years?[\s-]old")
MINOR_ZH = Z(r"萝莉", "幼女", "女童", "小女孩", "女高中生", "女初中生", "初中生", "高中生", "小学生", "未成年", "儿童", "孩子", "小孩", "(?<![A-Za-z])JK(?![A-Za-z])", "女子高生", "中学生", r"(?<!\d)1[0-7]岁", r"(?<![\d-])[1-9]岁")

# ---- extreme gore, hate, self-harm, drugs/weapons instructions ----
GORE = W(r"decapitat\w*", r"behead\w*", r"dismember\w*", r"disembowel\w*", r"entrails", r"spilling\s+intestines", r"guts\s+spill\w*", r"spilling\s+guts", r"(?:hyper-?realistic|graphic|extreme|explicit)\s+gore", r"gory",
    r"mutilat\w*", r"flayed", r"skinned\s+alive", r"severed\s+(head|limb|arm|leg)s?", r"head\s+explod\w*", r"brains?\s+splatter\w*", r"eyeballs?\s+(gouged|ripped)",
    r"impaled\s+through", r"torn\s+apart\s+limb")
GORE_ZH = Z("斩首", "砍头", "肢解", "开膛", "内脏流", "肠子流", "血肉模糊", "断肢", "断头(?![台路])", "脑浆", "剖腹", "碎尸")
HATE = W(r"nazis?", r"swastikas?", r"kkk", r"ku\s+klux", r"white\s+power", r"white\s+supremac\w*", r"ethnic\s+cleansing", r"heil", r"n[i1]gg(er|a)s?", r"chink",
    r"faggots?", r"retards?", r"kike")
HATE_ZH = Z("纳粹", "卍字", "万字旗", "黑鬼", "支那", "种族清洗")
SELFHARM = W(r"suicid\w*", r"self[\s-]harm\w*", r"kill(s|ing)?\s+(himself|herself|myself|themselves)", r"slit(s|ting)?\s+(his|her|my)?\s*wrists?",
    r"cutting\s+(her|his|my)\s+wrists?", r"hang(s|ing)?\s+(himself|herself|myself)", r"overdos\w*", r"jump(s|ing)?\s+off\s+(the|a)\s+(roof|building|bridge)\s+to\s+die")
SELFHARM_ZH = Z("自杀", "割腕", "上吊自", "轻生", "跳楼自尽", "寻死", "服毒")
DRUGS = W(r"cocaine", r"heroin", r"meth(amphetamine)?", r"fentanyl", r"crack\s+pipe", r"snort(s|ing)?\s+(a\s+)?(line|lines|powder|coke)", r"inject(s|ing)?\s+(heroin|drugs)",
    r"how\s+to\s+(make|build|cook|synthesi[sz]e)\s+(a\s+)?(bomb|explosive|gun|meth|drugs)", r"pipe\s+bomb", r"3d[\s-]printed\s+gun")
DRUGS_ZH = Z("毒品", "吸毒", "冰毒", "海洛因", "可卡因", "制毒", "制造炸弹", "自制炸药", "自制枪")

# ---- politically sensitive (PRC) ----
POLITICS = W(r"tiananmen\s+(massacre|square\s+(protest|massacre|1989))", r"tank\s+man", r"june\s+4(th)?\s+(1989|massacre|incident)", r"taiwan\s+independence",
    r"free\s+tibet", r"tibetan\s+independence", r"east\s+turkestan", r"uy[gh]+ur\s+(camp|genocide|detention)", r"xinjiang\s+(camp|genocide|detention)",
    r"falun\s+gong", r"hong\s+kong\s+(independence|protest)", r"free\s+hong\s+kong", r"cultural\s+revolution", r"Red\s+Guards\b", r"winnie\s+the\s+pooh.*xi")
POLITICS_ZH = Z("六四", "天安门事件", "坦克人", "台独", "台湾独立", "台湾国", "藏独", "西藏独立", "东突", "疆独", "新疆集中营", "再教育营", "法轮功", "港独",
    "光复香港", "时代革命", "文化大革命", "文革", "红卫兵", "中华民国国旗", "青天白日满地红")

# ---- copyrighted characters / IP whose reproduction is the point of the prompt ----
IP_EN = WC(r"Pikachu", r"Pok[eé]mon", r"Charizard", r"Mewtwo", r"Eevee", r"Spider[\s-]?Man", r"Spider[\s-]?Verse", r"Miles\s+Morales", r"Batman", r"Superman",
    r"Iron\s+Man", r"Captain\s+America", r"(?:the\s+)?Incredible\s+Hulk", r"Hulk(?=\s+(?:smash|transform))", r"Deadpool", r"Wolverine", r"Thanos", r"Groot", r"Avengers", r"X-Men", r"Wonder\s+Woman", r"Aquaman",
    r"Harley\s+Quinn", r"the\s+Joker", r"Harry\s+Potter", r"Hogwarts", r"Hermione", r"Voldemort", r"Naruto", r"Sasuke", r"Kakashi", r"Goku", r"Vegeta",
    r"Dragon\s+Ball", r"One\s+Piece", r"Luffy", r"Roronoa\s+Zoro", r"Thousand\s+Sunny", r"Demon\s+Slayer", r"Gyutaro", r"Tanjiro", r"Nezuko", r"Attack\s+on\s+Titan", r"Gojo\s+Satoru", r"Satoru\s+Gojo",
    r"Jujutsu\s+Kaisen", r"Sukuna", r"Sailor\s+Moon", r"Doraemon", r"Totoro(?![\s-]+sized?)", r"No-?Face", r"Mickey\s+Mouse", r"Minnie\s+Mouse", r"Donald\s+Duck",
    r"Winnie\s+the\s+Pooh", r"Elsa(?=\s+(?:and\s+Anna|from\s+Frozen))", r"Frozen\s+(movie|princess)", r"Moana", r"Simba", r"Lion\s+King", r"Lilo\s+(?:&|and)\s+Stitch", r"Buzz\s+Lightyear", r"Woody\s+and\s+Buzz",
    r"Toy\s+Story", r"Lightning\s+McQueen", r"Baymax", r"Kung\s+Fu\s+Panda", r"Shrek", r"Minions(?=\s+(?:movie|from))", r"SpongeBob", r"Patrick\s+Star", r"Super\s+Mario", r"Mario\s+Kart",
    r"Luigi", r"Bowser", r"Princess\s+Peach", r"Sonic\s+the\s+Hedgehog", r"Zelda", r"Kirby(?=\s+(?:from|Nintendo|the\s+pink))", r"Hello\s+Kitty", r"Snoopy", r"Peanuts\s+gang", r"Garfield",
    r"Tom\s+and\s+Jerry", r"Peppa\s+Pig", r"Paw\s+Patrol", r"Bluey", r"Darth\s+Vader", r"Star\s+Wars", r"Yoda", r"Stormtroopers?", r"Jedi\s+(?:Knight|Master|robes)", r"Transformers",
    r"Optimus\s+Prime", r"Bumblebee\s+(robot|transformer)", r"Megatron", r"Godzilla(?![\s-]+sized?)", r"King\s+Kong", r"Gundam(?!\s+(?:statue|Base|Café|Cafe))", r"Evangelion", r"Ultraman", r"Black\s+Myth",
    r"Genshin(\s+Impact)?", r"Honkai", r"Star\s+Rail", r"Wuthering\s+Waves", r"Arknights", r"Honor\s+of\s+Kings", r"League\s+of\s+Legends", r"Arcane\s+(?:series|Netflix|League)",
    r"Minecraft", r"Fortnite", r"Squid\s+Game", r"Wednesday\s+Addams", r"Barbie(?![\s-]+pink)", r"Labubu", r"Zanmang\s+Loopy", r"Crayon\s+Shin-?chan", r"Detective\s+Conan",
    r"Spy\s*[x×]\s*Family", r"Anya\s+Forger", r"Frieren", r"Chainsaw\s+Man", r"My\s+Hero\s+Academia", r"JoJo'?s?\s+Bizarre", r"Hatsune\s+Miku", r"Master\s+Chief",
    r"Kratos", r"Lara\s+Croft", r"Geralt", r"Cyberpunk\s+2077", r"GTA\s*(?:V|5|6|VI|Online)", r"Grand\s+Theft\s+Auto", r"Vice\s+City", r"John\s+Wick", r"James\s+Bond", r"Indiana\s+Jones",
    r"Na'vi", r"Pandora\s+(Avatar|Na'vi)", r"Wall-?E", r"Finding\s+Nemo", r"Teenage\s+Mutant\s+Ninja\s+Turtles", r"Ninja\s+Turtles", r"Power\s+Rangers", r"Scooby-?Doo",
    r"Smurfs?", r"Pac-?Man", r"Angry\s+Birds", r"Among\s+Us", r"Roblox", r"Skibidi", r"Shin\s+Chan", r"Despicable\s+Me", r"Inside\s+Out", r"Zootopia",
    r"Judy\s+Hopps", r"Nick\s+Wilde", r"Ratatouille", r"Monsters,?\s+Inc", r"Mike\s+Wazowski", r"Encanto", r"Coco\s+(movie|Pixar)", r"Pinocchio\s+(Disney)", r"Rapunzel\s+(Disney)",
    # 2026-10-08 re-audit additions (distinctive character / franchise names only)
    r"Spider[\s-]?Woman", r"Super\s+Saiyan", r"Street\s+Fighter", r"Chun[\s-]?Li", r"Spinning\s+Bird\s+Kick", r"Eddie\s+Gordo", r"Paul\s+Phoenix",
    r"Solo\s+Leveling", r"Sung\s+Jin[\s-]?woo", r"Saitama(?!\s+(?:Prefecture|City|Station))", r"One[\s-]Punch\s+Man", r"Homelander", r"Kuromi", r"My\s+Melody", r"Cinnamoroll",
    r"Walter\s+White", r"Breaking\s+Bad", r"Solid\s+Snake", r"Metal\s+Gear", r"South\s+Park", r"Scooby(?:-Doo)?", r"Stranger\s+Things", r"Lord\s+of\s+the\s+Rings",
    r"Frodo", r"Gandalf", r"Sauron", r"Agent\s+Smith", r"Trigun", r"Wolfwood", r"Leon\s+(?:S\.\s+)?Kennedy", r"Resident\s+Evil", r"Rapunzel\s+from\s+Tangled",
    r"Hinata\s+Sakaguchi", r"Bankai", r"Sun\s+Wukong(?=.{0,80}(?:Black\s+Myth|Homelander))", r"Ne\s?Zha(?=.{0,80}Ao\s?Bing)")
IP_ZH = Z("皮卡丘", "宝可梦", "神奇宝贝", "喷火龙", "蜘蛛侠：平行宇宙", "蜘蛛侠", "蝙蝠侠", "超人克拉克", "钢铁侠", "美国队长", "绿巨人", "死侍", "金刚狼", "灭霸", "复仇者联盟",
    "哈利波特", "哈利·波特", "霍格沃茨", "鸣人", "佐助", "火影忍者", "卡卡西", "七龙珠", "龙珠Z", "龙珠超", "贝吉塔", "路飞", "索隆", "海贼王", "鬼灭之刃", "鬼灭", "堕姬", "妓夫太郎", "炭治郎", "祢豆子", "进击的巨人",
    "五条悟", "咒术回战", "两面宿傩", "美少女战士", "哆啦A梦", "哆啦a梦", "机器猫", "龙猫", "无脸男", "米老鼠", "米奇老鼠", "唐老鸭", "小熊维尼", "维尼熊", 
    "冰雪奇缘", "艾莎公主", "史迪奇", "巴斯光年", "玩具总动员", "大白(?=机器人)", "功夫熊猫", "史莱克", "小黄人", "海绵宝宝", "派大星", "马里奥", "超级玛丽",
    "索尼克", "塞尔达", "星之卡比", "凯蒂猫", "史努比", "加菲猫", "猫和老鼠", "小猪佩奇", "汪汪队", "达斯·维达", "星球大战", "尤达",
    "变形金刚", "擎天柱", "威震天", "哥斯拉(?!巨型|大小|般|级)", "机动战士高达", "高达模型", "福音战士", "奥特曼", "喜羊羊", "灰太狼", "熊出没", "熊大和熊二", "熊大熊二", "光头强", "葫芦娃", "黑神话：?悟空", "天命人",
    "原神(?![殿像社态])", "崩坏：星穹铁道", "崩坏3", "星穹铁道", "鸣潮", "明日方舟", "王者荣耀", "英雄联盟", "金克丝", "堡垒之夜", "鱿鱼游戏", "(?<!·)芭比(?![粉色·])", "拉布布", "Labubu", "露比",
    "奶龙", "蜡笔小新", "名侦探柯南", "樱桃小丸子", "灌篮高手", "间谍过家家", "阿尼亚", "芙莉莲", "电锯人", "我的英雄学院", "初音未来", "约翰·威克", "疾速追杀",
    "詹姆斯·邦德", "夺宝奇兵", "疯狂动物城", "朱迪·霍普斯", "尼克狐", "忍者神龟", "蓝精灵", "愤怒的小鸟", "ポケモン", "ピカチュウ", "ドラえもん", "トトロ",
    "鬼滅", "炭治郎", "ナルト", "ルフィ", "呪術廻戦", "五条悟", "初音ミク", "ハローキティ", "ウルトラマン", "ガンダム", "エヴァ", "スパイダーマン", "マリオ",
    # 2026-10-08 re-audit additions: web-novel / donghua / game characters (孙悟空 / 哪吒 alone are public-domain myth figures — only their modern versions)
    "韩立", "凡人修仙传", "仙逆", "斗破苍穹", "萧炎", "斗罗大陆", r"唐三(?![彩藏])", "吞噬星空", "魔童", "大圣归来", r"敖丙(?=.{0,40}哪吒)|哪吒(?=.{0,40}敖丙)", "祖国人",
    "一拳超人", r"埼玉(?![县縣市])", "超级赛亚人", "我独自升级", "街头霸王", "春丽", "库洛米", "美乐蒂", "绝命毒师", "合金装备", "南方公园", "史酷比", "怪奇物语", "指环王", "弗罗多", "卍解")

# ---- real brands as the advertised product (spec ads that could pass as the brand's official ad) ----
BRAND = WC(r"Nike", r"Adidas", r"Coca[\s-]?Cola", r"Pepsi", r"Red\s+Bull", r"Monster\s+Energy", r"Mountain\s+Dew", r"Starbucks", r"McDonald'?s",
    r"KFC", r"Burger\s+King", r"Apple\s+(Watch|Vision|iPhone|AirPods|MacBook)", r"iPhone", r"AirPods", r"MacBook", r"Samsung\s+Galaxy", r"Galaxy\s+S\d+", r"Huawei",
    r"Xiaomi", r"Sony", r"PlayStation", r"Nintendo\s+Switch", r"Xbox", r"Tesla", r"Cybertruck", r"BMW", r"Mercedes(-Benz)?", r"Porsche",
    r"Lamborghini", r"Ferrari", r"Audi", r"Toyota", r"Honda\s+(?:Civic|Accord|CR-V)", r"BYD", r"Rolex", r"Omega\s+(?:watch|Seamaster|Speedmaster)", r"Cartier", r"Patek\s+Philippe", r"Chanel", r"Dior", r"Gucci",
    r"Louis\s+Vuitton", r"Prada", r"Herm[eè]s", r"Versace", r"Balenciaga", r"Off-White", r"Tiffany\s*&\s*Co\.?", r"Est[eé]e\s+Lauder", r"Lanc[oô]me",
    r"La\s+Mer", r"SK-?II", r"L'Or[eé]al", r"Maybelline", r"Huda\s+Beauty", r"Fenty", r"Sephora", r"Nivea", r"Gillette", r"Heineken", r"Budweiser",
    r"Johnnie\s+Walker", r"Moutai", r"Lay'?s", r"Oreo", r"Doritos", r"Pringles", r"Nestl[eé]", r"Nescaf[eé]", r"Lego", r"IKEA",
    r"Google\s+Pixel", r"Pixel\s+\d+", r"Meta\s+Quest", r"DJI", r"GoPro", r"Nikon",
    r"Fujifilm", r"Hasselblad", r"Leica", r"Dyson(?!\s+(?:swarm|sphere|Swarm|Sphere))", r"Uniqlo", r"Zara", r"H&M", r"New\s+Balance", r"Jordan\s+\d+", r"Air\s+Jordan",
    r"Air\s+Max", r"Yeezy", r"Le\s+Minerale", r"Pocari", r"Yakult", r"Oatly", r"Lululemon", r"Under\s+Armour", r"Rimowa", r"Bvlgari", r"YSL", r"Saint\s+Laurent",
    r"Tom\s+Ford", r"Jo\s+Malone", r"Le\s+Labo", r"Byredo", r"Glossier", r"Rare\s+Beauty", r"Charlotte\s+Tilbury", r"Shiseido", r"Clinique", r"MAC\s+(lipstick|cosmetics)")
BRAND_ZH = Z("耐克", "阿迪达斯", "可口可乐", "百事可乐", "红牛", "星巴克", "麦当劳", "肯德基", "苹果手机", "华为", "小米手机", "小米汽车", "小米SU7", "特斯拉(?!线圈)", r"宝马(?=汽车|车|X\d|M\d|\d系)", r"奔驰(?=汽车|车|[SGEC]级|AMG)", "保时捷", "兰博基尼",
    "法拉利", "比亚迪", "劳力士", "欧米茄", "卡地亚", "香奈儿", "迪奥", "古驰", "路易威登", "爱马仕", "雅诗兰黛", "兰蔻", "海蓝之谜", "欧莱雅", "茅台", "五粮液",
    "瑞幸", "喜茶", "蜜雪冰城", "农夫山泉", "元气森林", "王老吉", "旺仔", "李宁", "安踏", "大疆", "完美日记", "花西子", "珀莱雅", "伊利", "蒙牛", "三只松鼠", "良品铺子")
AD = W(r"commercial", r"advert\w*", r"\bad\b", r"ads", r"campaign", r"product\s+(shot|video|launch)", r"brand\s+film", r"tvc", r"promo\w*", r"endorse\w*", r"spokes\w*")
AD_ZH = Z("广告", "带货", "宣传片", "产品", "种草", "推广", "代言", "TVC")

CANON = {"性感": "sexy", "セクシー": "sexy", "比基尼": "bikini", "ビキニ": "bikini", "内衣": "underwear", "下着": "underwear", "lingerie": "underwear",
         "诱惑": "seductive", "低胸": "low-cut", "乳沟": "cleavage"}


def weak_terms(t):
    out = set()
    for rx in (SEX_WEAK, SEX_WEAK_ZH):
        for m in rx.finditer(t):
            w = m.group(0).lower()
            for stem in ("seduc", "sensu", "provoc", "flirt"):
                if w.startswith(stem):
                    w = stem
            out.add(CANON.get(w, w))
    return out


def sex_strong(t):
    return SEX_STRONG.search(t) or SEX_STRONG_ZH.search(t)


STYLE_AFTER = re.compile(r"(?:\s*(?:VI|V|\d+))?\s*(?:[（(][^）)\n]{0,30}[）)])?\s*[)）》」』\"”'(（]*\s*[-\s]?(?:(?:movie|film|anime|fantasy|cinematic|game|combat|art|visual|universe)[-\s]+)?"
                         r"(?:style[ds]?|inspired|like|sized?|esque|aesthetic|level|grade|quality|vibes?|energy|graphics|fan\s*art|T-?shirts?|meets|"
                         r"风格|式|般|画风|风|级|大小|质感|感|美学|电影风格|奇幻风格|同人|T\s*恤|的战斗张力|的灵活性|式的|启发)", re.I)
STYLE_BEFORE = re.compile(r"(?:\blike\b|inspired\s+by|in\s+the\s+style\s+of|style\s+of|à\s+la|reminiscent\s+of|\bthink\b|evoking|similar\s+to|\bmeets\b|combines|"
                          r"feel\s+like|类似|仿|致敬|参考|如同|联想到|灵感来源于|灵感源自|融合|遇上|以《)[^。.!?！？\n]{0,40}$", re.I)
CAMERA_CTX = re.compile(r"(?:shot|filmed|recorded|captured)\s+(?:on|with)\s+(?:an?\s+)?$|handheld\s+$|\d+mm\s+$|(?:手持|使用|用)\s*$", re.I)
CAMERA_AFTER = re.compile(r"[\s-]*(?:\d+\s*(?:Pro|Max)?\s*)?(?:shot|footage|camera|video|vlog|selfie|front|rear|screen|recording|POV|vertical|\+)", re.I)


def is_style_ref(t, m):
    if STYLE_AFTER.match(t, m.end()) or STYLE_BEFORE.search(t[max(0, m.start() - 60):m.start()]):
        return True
    w = m.group(0)  # a phone / action-cam / cinema camera named as the *recording device* is not the advertised product
    if re.match(r"(?:iPhone|GoPro|Sony|Google\s+Pixel|DJI)", w) and (CAMERA_CTX.search(t[max(0, m.start() - 30):m.start()]) or CAMERA_AFTER.match(t, m.end())):
        return True
    return False


def central(t, head, *rxs):
    """The name is central — in the title / description — or recurs (>= 2 hits in the prompt), not a passing mention.
    "X-style" / "inspired by X" / "X风格" references are ignored (quoted style mentions may stay)."""
    for rx in rxs:
        for m in rx.finditer(head):
            if not is_style_ref(head, m):
                return m
    hits = [m for rx in rxs for m in rx.finditer(t) if not is_style_ref(t, m)]
    return hits[0] if len(hits) >= 2 else None


RULES = [  # (reason, action, test)
    ("sexual-minor", "exclude", lambda t, h: (sex_strong(t) or len(weak_terms(t)) >= 2) and (MINOR.search(t) or MINOR_ZH.search(t))),
    ("sexual", "link-only", lambda t, h: sex_strong(t) or (len(weak_terms(t)) >= 3 and "sexual-weak")),
    ("politics", "link-only", lambda t, h: POLITICS.search(t) or POLITICS_ZH.search(t)),
    ("real-person", "link-only", lambda t, h: REAL_EN.search(t) or REAL_ZH.search(t)),
    ("hate", "link-only", lambda t, h: HATE.search(t) or HATE_ZH.search(t)),
    ("self-harm", "link-only", lambda t, h: SELFHARM.search(t) or SELFHARM_ZH.search(t)),
    ("drugs-weapons", "link-only", lambda t, h: DRUGS.search(t) or DRUGS_ZH.search(t)),
    ("gore", "link-only", lambda t, h: GORE.search(t) or GORE_ZH.search(t)),
    ("copyrighted-character", "link-only", lambda t, h: central(t, h, IP_EN, IP_ZH)),
    ("brand-ad", "link-only", lambda t, h: (AD.search(h) or AD_ZH.search(h)) and central(t, h, BRAND, BRAND_ZH)),
]
SUMMARY = {  # one-line neutral summary shown instead of the prompt
    "real-person": "以真实可识别人物（名人、政要、企业家、运动员、主播等）为主体的提示词。为避免转载肖像操纵类指令，本仓库仅保留标题、署名与链接。",
    "sexual": "含性暗示或裸露描写的提示词。本仓库仅保留标题、署名与链接。",
    "politics": "涉及敏感政治人物、事件或主权议题的提示词。本仓库仅保留标题、署名与链接。",
    "hate": "含仇恨符号或侮辱性用语的提示词。本仓库仅保留标题、署名与链接。",
    "self-harm": "涉及自杀或自残描写的提示词。本仓库仅保留标题、署名与链接。",
    "drugs-weapons": "涉及毒品使用或武器 / 爆炸物制作的提示词。本仓库仅保留标题、署名与链接。",
    "gore": "含极端血腥画面（斩首、肢解、内脏等）的提示词。本仓库仅保留标题、署名与链接。",
    "copyrighted-character": "以复刻特定受版权保护的角色 / IP（动漫、游戏、电影角色等）为核心的提示词。本仓库仅保留标题、署名与链接。",
    "brand-ad": "以真实品牌的产品广告为内容、可能被误认为品牌官方广告的提示词。本仓库仅保留标题、署名与链接。",
}
REASON_ZH = {"real-person": "真实人物", "sexual": "性内容", "sexual-minor": "未成年人 + 性内容", "politics": "政治敏感", "hate": "仇恨", "self-harm": "自残",
             "drugs-weapons": "毒品 / 武器", "gore": "极端血腥", "copyrighted-character": "版权角色 / IP", "brand-ad": "品牌官方广告冒用风险"}


NEG_LINE = re.compile(r"^\s*[\[【(（#*\-]*\s*(negative|avoid|constraints?|restrictions?|don't|do not|exclude|负面|禁止|强制禁止|排除|不要|避免|禁)", re.I)
NEG_SPAN = re.compile(r"(negative\s+prompts?\s*[:：]|\bavoid\w*|\bno\b|\bwithout\b|\bnever\b|\bnot\b|\bnon-|不要|避免|禁止|严禁|杜绝|拒绝|不得)"
                      r"[^.\n。;；!?！？]{0,160}", re.I)


NEG_HEAD = re.compile(r"[\[【(（#*\-\s]*(negative(\s+prompts?)?|negatives|avoid|constraints?|restrictions|负面(提示词?)?|反向提示词?|禁止(项|事项|内容)?|排除|避免)"
                      r"[\s\]】)）:：*#]*", re.I)


def strip_negations(text):
    """Drop negative-prompt lines and 'no X, Y, Z' spans so that e.g. 'no nudity, no minors' does not trigger a rule."""
    lines, skip = [], False
    for l in text.split("\n"):
        if NEG_LINE.match(l):
            # a bare "NEGATIVE" / "Avoid:" heading: drop the list that follows, up to the next blank line
            skip = bool(NEG_HEAD.fullmatch(l.strip()))
            continue
        if skip and l.strip():
            continue
        skip = False
        lines.append(l)
    t = re.sub(r"[非无不](?:色情|性感|裸露|暴露|肢解|断肢|血腥|斩首)化?|non-?(?:sexual|sexualized|erotic)", " ", "\n".join(lines), flags=re.I)
    return NEG_SPAN.sub(" ", t)


def text_of(r):
    parts = [r.get("title") or "", r.get("title_en") or "", r.get("description") or "", r.get("prompt") or ""]
    parts += [v.get("text") or "" for v in r.get("variants") or []]
    return strip_negations("\n".join(parts))


def load_overrides(path=ROOT / "data" / "audit_overrides.tsv"):
    out = {}
    if Path(path).exists():
        for line in Path(path).read_text(encoding="utf-8").splitlines():
            if not line.strip() or line.startswith("#"):
                continue
            f = line.split("\t")
            out[f[0]] = dict(action=f[1], reason=f[2] if len(f) > 2 else "manual", note=f[3] if len(f) > 3 else "")
    return out


def decide(r, overrides=None):
    """Return (action, reason, matched_terms)."""
    ov = (overrides or {}).get(r["id"])
    if ov:
        return ov["action"], ov["reason"], ov.get("note", "")
    t = text_of(r)
    h = strip_negations("\n".join([r.get("title") or "", r.get("title_en") or "", r.get("description") or ""]))
    for reason, action, test in RULES:
        m = test(t, h)
        if m:
            if hasattr(m, "group"):
                ctx = t[max(0, m.start() - 50):m.end() + 50].replace("\n", " ").replace("\t", " ")
                return action, reason, f"{m.group(0)} … {ctx}"
            return action, reason, ",".join(sorted(weak_terms(t)))
    return "keep", "", ""


def main():
    import argparse
    ap = argparse.ArgumentParser()
    ap.add_argument("--jsonl", required=True)
    ap.add_argument("--show")
    ap.add_argument("--n", type=int, default=40)
    ap.add_argument("--dump")
    a = ap.parse_args()
    ov = load_overrides()
    c = Counter(); ex = defaultdict(list)
    for line in open(a.jsonl, encoding="utf-8"):
        r = json.loads(line)
        act, reason, m = decide(r, ov)
        c[(act, reason)] += 1
        ex[reason].append((r["id"], r["title"], m))
    if a.dump:
        with open(a.dump, "w", encoding="utf-8") as f:
            for reason, items in ex.items():
                for i, ti, m in items:
                    if reason:
                        f.write(f"{reason}\t{i}\t{ti}\t{m}\n")
    for k, v in sorted(c.items(), key=lambda x: -x[1]):
        print(v, k)
    if a.show:
        for e in ex[a.show][:a.n]:
            print(" ", e)


if __name__ == "__main__":
    main()
