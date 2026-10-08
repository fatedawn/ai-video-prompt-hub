// Scenario knowledge base for the router (original work, Apache-2.0).
// Each scenario says: how to recognise it, which medium/direction/genre folders of prompts/ fit,
// which route to take by default, which hand-drawn style presets and templates fit, and which
// registry `use_for` tags describe matching external projects.

/** Routes. A/B/C are this repo's own toolchains; D = an external project from catalog/registry.json. */
export const ROUTES = {
  A: { id: 'A', key: 'A-handdrawn', name: '路线①：animator 手绘动画（本仓库）', short: 'animator 手绘逐笔动画（免费、CPU、离线）' },
  B: { id: 'B', key: 'B-videogen', name: '路线②：videogen 视频生成 + prompts/ 提示词（本仓库）', short: '视频模型生成（云 API / 自己的 GPU / 网页手动）' },
  C: { id: 'C', key: 'C-code-motion', name: '路线③：代码动效（Remotion / HyperFrames / Manim）', short: '代码动效、数据图表、字幕重的视频' },
  D: { id: 'D', key: 'external', name: '路线④：外部开源项目（catalog/）', short: 'catalog/registry.json 里更合适的现成项目' },
};

// prompts/其他/<genre> has no direction level in data/index.csv
const T = (medium, direction, genre) => ({ medium, direction: medium === '其他' ? '' : direction, genre });

export const SCENARIOS = [
  {
    id: 'repo-promo', noPrompts: true, name: 'GitHub 项目 / AI 工具推荐（天机风）',
    kw: ['github', '开源', '项目推荐', '仓库', 'repo', '工具推荐', 'ai工具', 'ai 工具', '天机', '软件推荐', '插件', 'star', 'skill推荐', '神器'],
    medium: '其他', direction: '现实向', route: 'A', alt: ['C'], aspect: '9:16', duration: 60,
    genres: [T('其他', '现实向', '动态图形与界面')],
    presets: ['minimal-line-explainer', 'naive-marker-notes', 'whiteboard-explainer', 'bean-doodle-infographic'],
    media: 'colored-pencil', character: 'tianji', templates: [],
    use_for: ['repo-promo', 'launch', 'explainer'],
    tips: ['开头 3 秒直接说「它能帮你做什么」，再给 star 数/许可证等可信信号', '天机「亮扇」reveal 动作适合放在项目名揭晓那一句', '代码/架构插段用路线③（Code Hike 模板、Archscribe 手绘架构图）'],
  },
  {
    id: 'explainer', noPrompts: true, name: '知识科普 / 口播讲解',
    kw: ['科普', '知识', '讲解', '口播', '原理', '教程', '为什么', '解说', '干货', '课程', '入门', '揭秘', '冷知识', '经济学', '心理学', '历史'],
    medium: '其他', direction: '现实向', route: 'A', alt: ['C'], aspect: '9:16', duration: 90,
    genres: [T('其他', '现实向', '动态图形与界面')],
    presets: ['minimal-line-explainer', 'whiteboard-explainer', 'bean-doodle-infographic', 'colored-pencil-diary'],
    media: 'colored-pencil', character: 'tianji', templates: [],
    use_for: ['explainer', 'talking-head'],
    tips: ['按语义节拍拆句（一句一个画面），每句 8–20 字', '每个镜头至少一个主动作，否则 animator check 会警告画面呆板', '要真人出镜感可加路线④的数字人项目（必须本人或已授权肖像）'],
  },
  {
    id: 'picture-book', name: '儿童绘本故事',
    kw: ['绘本', '儿童', '童话', '睡前', '亲子', '宝宝', '幼儿', '寓言', '小朋友', '童年', '小兔', '小熊', '幼儿园'],
    medium: '漫剧', direction: '现实向', route: 'A', alt: ['B'], aspect: '9:16', duration: 90,
    genres: [T('漫剧', '现实向', '日常治愈'), T('漫剧', '特效向', '奇幻冒险'), T('其他', '现实向', '动物萌宠')],
    art: ['3D卡通', '绘画风', 'Q版'],
    presets: ['sunlit-storybook', 'kid-crayon', 'nordic-gouache-storybook', 'warm-flat-storybook', 'inked-storybook'],
    media: 'picture-book', character: 'doudou', templates: ['learnprompt-tpl-zh-3d-cartoon', 'learnprompt-tpl-zh-stop-motion-cadence'],
    use_for: ['picture-book', 'kids', 'story'],
    tips: ['语速放慢（Kokoro 可用 0.9× 变体），一页一句', '想要「插画被画出来」的绘本感：先 AI 生插图，再用 whiteboard-stream-animation 或 story-to-handdrawn-video'],
  },
  {
    id: 'poem', name: '古诗词 / 国学 / 成语',
    kw: ['古诗', '诗词', '唐诗', '宋词', '成语', '国学', '李白', '杜甫', '苏轼', '诗经', '论语'],
    medium: '漫剧', direction: '现实向', route: 'A', alt: ['C', 'B'], aspect: '9:16', duration: 60,
    genres: [T('漫剧', '现实向', '日常治愈'), T('其他', '现实向', '风景空镜')], art: ['水墨'],
    presets: ['ink-wash', 'linocut-editorial'], media: 'ink', character: 'tianji', templates: [],
    use_for: ['poem'], tips: ['水墨画材 + 题签逐字写出；诗句本身是公版，译文/赏析需自写'],
  },
  {
    id: 'book', noPrompts: true, name: '拆书 / 读书分享',
    kw: ['拆书', '读书', '书评', '好书', '一本书', '读书笔记', '书单'],
    medium: '其他', direction: '现实向', route: 'A', alt: ['C'], aspect: '9:16', duration: 120,
    genres: [T('其他', '现实向', '动态图形与界面')],
    presets: ['whiteboard-explainer', 'minimal-line-explainer', 'bean-doodle-infographic'], media: 'pencil', character: 'tianji', templates: [],
    use_for: ['book', 'explainer'], tips: ['只讲观点与结构，不朗读原书大段原文（版权）', '慢版 6–8 个画面 / 高密版 16–20 个画面两种节奏可选'],
  },
  {
    id: 'data', noPrompts: true, name: '数据 / 信息图 / 排行榜',
    kw: ['数据', '图表', '排行', '财报', '统计', '信息图', '增长', '榜单', '可视化', '趋势', '占比', 'gdp'],
    medium: '其他', direction: '现实向', route: 'C', alt: ['A'], aspect: '16:9', duration: 60,
    genres: [T('其他', '现实向', '动态图形与界面')],
    presets: ['bean-doodle-infographic', 'minimal-line-explainer'], media: 'marker', character: 'tianji', templates: [],
    use_for: ['data', 'explainer'], tips: ['数据先整理成 CSV，再交给 DataMagic 或 Remotion 图表组件；注明数据来源'],
  },
  {
    id: 'math', noPrompts: true, name: '数学 / 物理 / 算法讲解',
    kw: ['数学', '公式', '定理', '物理', '几何', '推导', '算法', '微积分', '概率', '线性代数'],
    medium: '其他', direction: '现实向', route: 'C', alt: ['A'], aspect: '16:9', duration: 120,
    genres: [T('其他', '现实向', '动态图形与界面')],
    presets: ['whiteboard-explainer', 'minimal-line-explainer'], media: 'pencil', character: 'tianji', templates: [],
    use_for: ['math', 'explainer'], tips: ['Manim + manim-voiceover 可让动画按词触发'],
  },
  {
    id: 'product', name: '产品带货 / 广告',
    kw: ['带货', '产品', '电商', '种草', '好物', '广告', '卖点', '开箱', '测评', '商品', '新品', '促销', '直播间', 'tvc', '品牌'],
    medium: '真人', direction: '现实向', route: 'B', alt: ['C'], aspect: '9:16', duration: 30,
    genres: [T('其他', '现实向', '广告带货'), T('其他', '现实向', '美食')],
    presets: ['warm-flat-storybook', 'organic-contour-doodle', 'naive-marker-notes'], media: 'marker', character: 'tianji',
    templates: ['learnprompt-tpl-zh-product-commercial-shotlist', 'learnprompt-tpl-zh-ugc-creator-review', 'learnprompt-tpl-zh-process-transformation-montage'],
    use_for: ['product', 'ecommerce', 'ad'],
    tips: ['3 秒钩子 → 痛点 → 卖点演示 → 证据 → 行动号召', '产品外观以实拍图为参考图（--refs），避免模型改形', '广告法：不用「最/第一/国家级」等绝对化用语，功效类宣称要有依据'],
  },
  {
    id: 'drama-xianxia', name: '仙侠 / 玄幻 / 武侠剧',
    kw: ['仙侠', '修仙', '玄幻', '宗门', '渡劫', '灵根', '法术', '武侠', '江湖', '剑', '魔尊', '仙尊', '飞升', '神魔', '妖', '古风', '国风', '道长', '师尊'],
    medium: '漫剧', direction: '特效向', route: 'B', alt: ['A'], aspect: '9:16', duration: 60, drama: true,
    genres: [T('漫剧', '特效向', '仙侠玄幻'), T('漫剧', '特效向', '奇幻冒险'), T('漫剧', '特效向', '武侠打斗'), T('漫剧', '特效向', '战斗大招'),
      T('真人', '特效向', '古装仙侠玄幻'), T('真人', '特效向', '武侠打斗')],
    art: ['3D国漫', '水墨', '2D日漫'],
    presets: ['ink-wash', 'retro-gouache-concept'], media: 'ink', character: 'tianji',
    templates: ['manju-73db35a4', 'manju-8afc721d', 'manju-d66baf8d', 'manju-cdac03bb', 'manju-039fa4be', 'toonflow-tpl-seedance20', 'learnprompt-tpl-zh-combat-choreography'],
    use_for: ['xianxia', 'wuxia', 'fight', 'drama', 'novel-adapt'],
    tips: ['先锁角色 4 视图与场景母版（资产图模板），再写镜头', '法术/打戏用「三段式」：起势 → 交锋 → 余波；每段一个明确动作', '只写「镜头1/2/3」，不要逐秒卡点（Seedance 2.0 官方说明精确秒级时序不稳定）'],
  },
  {
    id: 'drama-romance', name: '甜宠 / 恋爱 / 霸总剧',
    kw: ['甜宠', '恋爱', '霸总', '总裁', '情侣', '告白', '心动', '闪婚', '契约', '虐恋', '追妻', '先婚后爱', '暗恋', '初恋', 'cp'],
    medium: '真人', direction: '现实向', route: 'B', alt: ['A'], aspect: '9:16', duration: 60, drama: true,
    genres: [T('真人', '现实向', '甜宠恋爱'), T('真人', '现实向', '都市剧情'), T('真人', '现实向', '情绪特写'), T('漫剧', '现实向', '甜宠恋爱'), T('漫剧', '现实向', '都市校园')],
    art: ['2D日漫', '3D国漫'],
    presets: ['emotional-watercolor-sketch', 'inked-storybook', 'colored-pencil-diary'], media: 'colored-pencil', character: 'tianji',
    templates: ['manju-73db35a4', 'learnprompt-tpl-zh-dialogue-performance-beats', 'learnprompt-tpl-zh-character-reference-lock', 'learnprompt-tpl-zh-cinematic-narrative-short'],
    use_for: ['romance', 'urban', 'drama'],
    tips: ['每集结尾留钩子（反转/误会/心动瞬间）', '情绪戏用近景 + 对白节拍；男女主各一张参考图锁脸', '真人题材不要用真实明星的脸和名字'],
  },
  {
    id: 'drama-suspense', name: '悬疑 / 推理 / 惊悚剧',
    kw: ['悬疑', '推理', '凶手', '犯罪', '惊悚', '恐怖', '诡异', '密室', '失踪', '灵异', '复仇', '真相', '谜', '侦探', '案件'],
    medium: '真人', direction: '现实向', route: 'B', alt: ['A'], aspect: '9:16', duration: 60, drama: true,
    genres: [T('真人', '现实向', '悬疑犯罪'), T('真人', '特效向', '恐怖灵异'), T('真人', '现实向', '剧情短片'), T('漫剧', '现实向', '悬疑惊悚'), T('漫剧', '现实向', '剧情短片')],
    art: ['2D日漫', '美漫'],
    presets: ['linocut-editorial', 'ballpoint-scribble', 'ink-wash'], media: 'ink', character: 'tianji',
    templates: ['learnprompt-tpl-zh-horror-suspense', 'learnprompt-tpl-zh-dialogue-performance-beats', 'manju-73db35a4', 'manju-06e63e41'],
    use_for: ['suspense', 'drama'],
    tips: ['信息分层释放：每集只揭一个线索、埋一个新疑问', '血腥/暴力画面点到为止，平台审核更友好'],
  },
  {
    id: 'drama-urban', name: '都市 / 逆袭 / 家庭剧',
    kw: ['都市', '职场', '重生', '逆袭', '战神', '赘婿', '豪门', '校园', '家庭', '婆媳', '打脸', '真假千金', '神医', '创业'],
    medium: '真人', direction: '现实向', route: 'B', alt: ['A'], aspect: '9:16', duration: 60, drama: true,
    genres: [T('真人', '现实向', '都市剧情'), T('真人', '现实向', '剧情短片'), T('漫剧', '现实向', '都市校园'), T('漫剧', '现实向', '剧情短片')],
    art: ['2D日漫', '3D国漫'],
    presets: ['colored-pencil-diary', 'retro-gouache-concept'], media: 'colored-pencil', character: 'tianji',
    templates: ['manju-73db35a4', 'learnprompt-tpl-zh-dialogue-performance-beats', 'learnprompt-tpl-zh-cinematic-narrative-short'],
    use_for: ['urban', 'drama'], tips: ['前 10 秒立冲突，第 1 集结尾必须有爽点或悬念'],
  },
  {
    id: 'drama-scifi', name: '科幻 / 动作 / 怪兽大片',
    kw: ['科幻', '机甲', '末日', '怪兽', '外星', '赛博', '爆炸', '枪战', '动作', '丧尸', '太空', '机器人', '超能力'],
    medium: '真人', direction: '特效向', route: 'B', alt: [], aspect: '16:9', duration: 30, drama: true,
    genres: [T('真人', '特效向', '科幻'), T('真人', '特效向', '动作大片'), T('真人', '特效向', '奇幻怪兽'), T('漫剧', '特效向', '科幻机甲'), T('漫剧', '特效向', '战斗大招')],
    art: ['3D国漫', '2D日漫', '美漫'], presets: ['retro-gouache-concept'], media: 'marker', character: 'tianji',
    templates: ['learnprompt-tpl-zh-epic-fantasy-scifi', 'learnprompt-tpl-zh-combat-choreography', 'learnprompt-tpl-zh-time-freeze-rewind'],
    use_for: ['fight', 'drama'], tips: ['特效镜头单镜 5–10 秒，复杂动作拆成多镜头'],
  },
  {
    id: 'comedy', name: '搞笑 / 整活 / 反转短剧',
    kw: ['搞笑', '喜剧', '整活', '沙雕', '反转', '段子', '爆笑', '吐槽', '鬼畜'],
    medium: '真人', direction: '现实向', route: 'B', alt: ['A'], aspect: '9:16', duration: 30, drama: true,
    genres: [T('真人', '现实向', '喜剧整活'), T('漫剧', '现实向', '喜剧搞笑')], art: ['Q版', '2D日漫'],
    presets: ['ms-paint-bad-doodle', 'kid-crayon', 'bean-doodle-infographic'], media: 'crayon', character: 'doudou',
    templates: ['learnprompt-tpl-zh-meme-comedy', 'learnprompt-tpl-zh-dialogue-performance-beats'],
    use_for: ['comedy', 'drama'], tips: ['铺垫 → 误导 → 反转，笑点放在最后 3 秒'],
  },
  {
    id: 'healing', name: '日常治愈 / 萌宠 / 生活故事',
    kw: ['治愈', '温馨', '猫', '狗', '宠物', '萌宠', '小动物', '温暖', '陪伴', '奶奶', '外婆', '回忆'],
    medium: '漫剧', direction: '现实向', route: 'A', alt: ['B'], aspect: '9:16', duration: 60,
    genres: [T('漫剧', '现实向', '日常治愈'), T('其他', '现实向', '动物萌宠'), T('真人', '现实向', '生活与vlog')], art: ['绘画风', '3D卡通', '2D日漫'],
    presets: ['colored-pencil-diary', 'emotional-watercolor-sketch', 'sunlit-storybook', 'real-crayon-paper'], media: 'colored-pencil', character: 'doudou',
    templates: ['learnprompt-tpl-zh-pet-animal', 'learnprompt-tpl-zh-3d-cartoon'],
    use_for: ['story', 'picture-book'], tips: ['彩铅日记风是 animator 默认画风，最适合这类题材'],
  },
  {
    id: 'vlog', name: 'Vlog / DV 录像 / 旅行记录',
    kw: ['vlog', 'dv', '旅行', '旅拍', '记录', 'city walk', 'citywalk', '探店', '手持', '日常记录', '家庭录像', '复古录像', '一日', '出游'],
    medium: '真人', direction: '现实向', route: 'B', alt: ['C'], aspect: '9:16', duration: 45,
    genres: [T('真人', '现实向', '生活与vlog'), T('真人', '现实向', '年代怀旧'), T('其他', '现实向', '风景空镜'), T('其他', '现实向', '美食')],
    presets: ['zine-riso-collage', 'naive-marker-notes'], media: 'marker', character: 'tianji',
    templates: ['learnprompt-tpl-zh-handheld-ugc-vlog', 'learnprompt-tpl-zh-retro-found-footage', 'learnprompt-tpl-zh-travel-city-walk', 'learnprompt-tpl-zh-pov-continuous-take'],
    use_for: ['vlog'], tips: ['有实拍素材时优先走剪辑（路线④ 的剪映 skill / editly），AI 只补空镜', 'DV 质感：4:3 或带黑边、时间码、轻微噪点与自动曝光呼吸'],
  },
  {
    id: 'music-mv', name: '音乐 MV / 歌词视频',
    kw: ['mv', '歌词', '音乐', '卡点', '歌曲', '翻唱', '手书', 'bgm'],
    medium: '真人', direction: '现实向', route: 'B', alt: ['C'], aspect: '16:9', duration: 60,
    genres: [T('真人', '现实向', '音乐MV'), T('真人', '特效向', '超现实创意')],
    presets: ['zine-riso-collage', 'emotional-watercolor-sketch'], media: 'marker', character: 'tianji',
    templates: ['learnprompt-tpl-zh-music-beat-sync-mv'], use_for: ['music-mv'], tips: ['只用自己有权使用的音乐'],
  },
];

/** Generic fallback when nothing matches. */
export const GENERIC = {
  id: 'story', name: '通用剧情短片', kw: [], medium: '真人', direction: '现实向', route: 'B', alt: ['A'], aspect: '9:16', duration: 60, drama: true,
  genres: [T('真人', '现实向', '剧情短片'), T('漫剧', '现实向', '剧情短片')], art: ['2D日漫', '3D国漫'],
  presets: ['colored-pencil-diary', 'minimal-line-explainer'], media: 'colored-pencil', character: 'tianji',
  templates: ['learnprompt-tpl-zh-cinematic-narrative-short', 'manju-73db35a4'], use_for: ['story', 'drama'], tips: [],
};

/** Modifiers stack on top of a scenario. */
export const MODIFIERS = [
  { id: 'novel-adapt', kw: ['小说', '网文', '改编', '原著', '书改', '推文'], use_for: ['novel-adapt'], note: '小说改编：先用方法论 skill 做「改编大纲 → 角色设定 → 分集剧本」，再进分镜' },
  { id: 'subtitle-heavy', kw: ['字幕', '花字', '逐字', '大字报', '金句'], use_for: ['talking-head'], note: '字幕重：成片后可用路线③的字幕组件（remotion-subtitles / template-tiktok）做花字' },
  { id: 'kids-safe', kw: ['儿童', '亲子', '幼儿', '宝宝', '小朋友'], use_for: ['kids'], note: '面向儿童：避免惊吓画面与不安全行为示范' },
];

/** Hints for medium/direction when the user didn't give them explicitly. */
export const MEDIUM_HINTS = {
  漫剧: ['漫剧', '动漫', '动画', '漫画', '二次元', '国漫', '动态漫', '卡通', '条漫', 'anime', '手绘'],
  真人: ['真人', '实拍', '写实', '真人剧', '电影感', '短剧演员', '真人版'],
};
export const DIRECTION_HINTS = {
  特效向: ['特效', '法术', '大招', '爆炸', '魔法', '变身', '奇幻', '科幻', '仙侠', '玄幻', '怪兽'],
  现实向: ['现实', '日常', '写实', '生活'],
};

export const BUDGETS = {
  'free-cpu': '免费 + 普通电脑（CPU）',
  gpu: '有自己的显卡（ComfyUI / 本地模型）',
  'api-key': '有云端视频模型 API key（按量付费）',
  'web-manual': '用即梦/可灵/海螺等网页端手动生成（会员或免费额度）',
};
