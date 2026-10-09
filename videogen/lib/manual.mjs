// Route C — manual web round-trip: export per-shot packages, then import the downloaded videos by filename.
// Original code for ai-video-prompt-hub/videogen.
import fs from 'node:fs';
import path from 'node:path';
import { probe, ratioNum } from './media.mjs';

// Per-site notes shown in every package. Limits change often — the checklist tells users to check the site.
export const SITES = {
  jimeng: { name: '即梦（Seedance）', url: 'https://jimeng.jianying.com', note: 'Seedance 2.0 用“镜头1/镜头2”写法、4–15 秒；2.5 可按秒写、4–30 秒。参考图用 @图片N 指代，并写明用途。' },
  kling: { name: '可灵', url: 'https://klingai.com', note: '3–15 秒；多镜头可写 “shot n, m秒, 描述;”；要锁人物用“主体/Element”功能上传参考图。' },
  hailuo: { name: '海螺', url: 'https://hailuoai.com', note: '首帧图生视频时画幅跟随图片；可用 [推进] [跟拍] 这类运镜指令。' },
  sora: { name: 'Sora', url: 'https://sora.com', note: '英文提示词通常更稳；人物参考需遵守平台的肖像规则。' },
  veo: { name: 'Veo（Gemini / Flow）', url: 'https://labs.google/flow', note: '4/6/8 秒；英文支持最好；用参考图时只能 8 秒、16:9。' },
  framepack: { name: 'FramePack / FramePack-Studio（本地，6–8GB 起）', url: 'https://github.com/lllyasviel/FramePack', note: '纯图生视频：上传 refs/01_首帧，粘贴 prompt_en.txt（英文更稳），Total Video Length 设成本镜头秒数；适合慢动作长镜头。' },
  'ltx-desktop': { name: 'LTX-Desktop（本地需 ≥16GB 显存）', url: 'https://github.com/Lightricks/LTX-Desktop', note: '选 Image-to-Video，拖入首帧；LTX 模型为 LTX 社区许可，商用前读原文。' },
  freevideo: { name: 'FreeVideo（本地 MiniMax H3，8GB+16GB 内存）', url: 'https://github.com/FlashML-org/FreeVideo', note: '首帧/首尾帧模式；模型为 MiniMax H3 社区许可（排除欧盟/英国/韩国/美国，商用需标注），使用前读原文。' },
  wan2gp: { name: 'Wan2GP 网页界面（本地，6GB 起）', url: 'https://github.com/deepbeepmeep/Wan2GP', note: '选 Wan2.2 I2V（或 Hunyuan 1.5 / LTX），Start Image 上传首帧；批量可用 stills2video --backend wan2gp 生成 settings JSON。' },
  generic: { name: '任意网页端', url: '', note: '' },
};

const EN_LABEL = { '9:16': 'vertical 9:16', '16:9': 'horizontal 16:9', '1:1': 'square 1:1', '4:3': '4:3', '3:4': '3:4', '21:9': 'cinemascope 21:9' };

/** English scaffold: params + structure in English, Chinese description kept (users may translate it). */
export function englishScaffold(shot) {
  if (shot.prompt_en) return shot.prompt_en;
  return [
    `Single shot, ${shot.duration} seconds, ${EN_LABEL[shot.aspect] || shot.aspect}. No subtitles, no watermark, no logo.`,
    `Shot ${shot.index || 1} of segment ${shot.segment}. Description (Chinese; translate it if the site works better in English):`,
    shot.prompt_zh,
    shot.negative ? `Avoid: ${shot.negative}` : '',
  ].filter(Boolean).join('\n');
}

export function exportPackages(sb, outDir, o = {}) {
  const site = SITES[o.site || 'generic'] || SITES.generic;
  const baseDir = o.baseDir || '.';
  fs.mkdirSync(outDir, { recursive: true });
  const index = [`# ${sb.title} · 逐镜头生成包（${site.name}）`, '', `画幅 **${sb.aspect}** · 共 ${sb.shots.length} 个镜头 · 生成后把视频按 **镜头编号.mp4** 命名（如 \`${sb.shots[0]?.id}.mp4\`），放进同一个文件夹，然后运行：`, '', '```bash', `node videogen/cli.mjs import ${o.shotsFile || 'shots.json'} --from <下载文件夹>`, '```', '', site.note ? `> ${site.name}：${site.note}` : '', '', '| 镜头 | 时长 | 台词 | 参考图 | 文件名 |', '|---|---|---|---|---|'];
  const all = [];
  for (const s of sb.shots) {
    const d = path.join(outDir, s.id);
    fs.mkdirSync(d, { recursive: true });
    fs.writeFileSync(path.join(d, 'prompt_zh.txt'), s.prompt_zh + '\n');
    fs.writeFileSync(path.join(d, 'prompt_en.txt'), englishScaffold(s) + '\n');
    fs.writeFileSync(path.join(d, 'negative.txt'), (s.negative || '（无）') + '\n');
    const refs = [];
    for (const [i, r] of [...(s.first_frame ? [{ ...s.first_frame, tag: '首帧', role: 'first_frame' }] : []), ...(s.refs || [])].entries()) {
      if (r.path && fs.existsSync(path.resolve(baseDir, r.path))) {
        const name = `${String(i + 1).padStart(2, '0')}_${(r.tag || 'ref').replace(/[@\s/]/g, '')}${path.extname(r.path)}`;
        fs.mkdirSync(path.join(d, 'refs'), { recursive: true });
        fs.copyFileSync(path.resolve(baseDir, r.path), path.join(d, 'refs', name));
        refs.push(`${r.tag || '参考'} → refs/${name}（${r.role === 'first_frame' ? '首帧' : '人物/场景参考'}）`);
      } else refs.push(`${r.tag || '参考'} → ${r.url || '（未提供：在 shots.json 的 refs 里填 path）'}`);
    }
    const params = { id: s.id, file: `${s.id}.mp4`, duration: s.duration, aspect: sb.aspect, site: site.name, lines: s.lines, sfx: s.sfx };
    fs.writeFileSync(path.join(d, 'params.json'), JSON.stringify(params, null, 2) + '\n');
    const lines = (s.lines || []).map((l) => `${l.speaker || '旁白'}：${l.text}`).join(' / ');
    fs.writeFileSync(path.join(d, 'checklist.md'), [
      `# ${s.id}　（${s.duration} 秒 · ${sb.aspect}）`, '',
      `- [ ] 打开 ${site.name}${site.url ? `（${site.url}）` : ''}，选 **${sb.aspect}**、时长 **≥ ${Math.ceil(s.duration)} 秒**（平台没有这个时长就选更长的，拼接时会自动裁剪）`,
      ...refs.map((x) => `- [ ] 上传参考图：${x}`),
      '- [ ] 粘贴 `prompt_zh.txt`（网站对英文更友好时用 `prompt_en.txt`）',
      s.negative ? '- [ ] 有“负面提示词/不希望出现”框就粘贴 `negative.txt`，没有就跳过（提示词里已写）' : '',
      lines ? `- [ ] 台词（${lines}）由本工具后期用 TTS 配音并加字幕；平台若自动生成人声，可以保留也可以静音（拼接时默认静音）` : '',
      '- [ ] 检查：人物脸和服装与参考一致、没有乱码字幕/水印/Logo、动作完整',
      `- [ ] 下载后改名为 **${s.id}.mp4**（保留 \`${s.id}\` 开头即可，比如 \`${s.id}_v2.mp4\` 也认）`,
      '', site.note ? `> ${site.note}` : '',
    ].filter((x) => x !== '').join('\n') + '\n');
    index.push(`| [${s.id}](${s.id}/checklist.md) | ${s.duration}s | ${lines || '—'} | ${refs.length} | \`${s.id}.mp4\` |`);
    all.push(`## ${s.id}（${s.duration} 秒）\n\n\`\`\`text\n${s.prompt_zh}\n\`\`\`\n${s.negative ? `\n负面：${s.negative}\n` : ''}`);
  }
  fs.writeFileSync(path.join(outDir, 'README.md'), index.join('\n') + '\n');
  fs.writeFileSync(path.join(outDir, 'all_prompts.md'), `# ${sb.title} · 全部提示词（复制用）\n\n` + all.join('\n'));
  return { dir: outDir, count: sb.shots.length };
}

const ID_RE = /S0*(\d{1,3})[ _-]?(shot0*(\d{1,3})|all)/i;
export const canonicalId = (seg, shot) => `S${String(seg).padStart(2, '0')}_${shot === 'all' ? 'all' : `shot${String(shot).padStart(2, '0')}`}`;

/** Find downloaded videos named like S01_shot03*.mp4, validate them, copy into clipsDir and record in the storyboard. */
export function importClips(sb, fromDir, clipsDir, o = {}) {
  const files = fs.readdirSync(fromDir).filter((f) => /\.(mp4|mov|webm|mkv|m4v)$/i.test(f));
  const byId = {};
  for (const f of files) {
    const m = f.match(ID_RE);
    if (!m) continue;
    const id = canonicalId(m[1], m[3] ? +m[3] : 'all');
    const full = path.join(fromDir, f);
    const mt = fs.statSync(full).mtimeMs;
    if (!byId[id] || mt > byId[id].mt) byId[id] = { file: full, mt, dupes: (byId[id]?.dupes || 0) + (byId[id] ? 1 : 0) };
  }
  fs.mkdirSync(clipsDir, { recursive: true });
  const report = [];
  const want = ratioNum(sb.aspect);
  for (const s of sb.shots) {
    const hit = byId[s.id];
    if (!hit) { report.push({ id: s.id, status: 'missing' }); continue; }
    const p = probe(hit.file);
    const issues = [];
    if (!p.hasVideo) issues.push('没有视频流');
    const r = p.width / p.height;
    if (Math.abs(r - want) / want > 0.03) issues.push(`画幅 ${p.width}x${p.height}（${r.toFixed(3)}）≠ ${sb.aspect}，${Math.abs(Math.log(r / want)) > Math.log(1.15) ? "差别较大，拼接时完整保留画面 + 模糊铺底（--frame crop 可改为裁切）" : "差别不大，拼接时居中裁切"}`);
    if (p.duration + 0.05 < s.duration) issues.push(`时长 ${p.duration.toFixed(2)}s < 计划 ${s.duration}s，拼接时按 ${s.fit || 'auto'} 补足（放慢/定格）`);
    else if (p.duration > s.duration + 3) issues.push(`时长 ${p.duration.toFixed(2)}s 比计划长 ${(p.duration - s.duration).toFixed(1)}s，拼接时裁掉尾部`);
    if (hit.dupes) issues.push(`同名候选 ${hit.dupes + 1} 个，用了最新的 ${path.basename(hit.file)}`);
    const dest = path.join(clipsDir, s.id + path.extname(hit.file).toLowerCase());
    if (path.resolve(hit.file) !== path.resolve(dest)) fs.copyFileSync(hit.file, dest);
    s.clip = path.relative(o.baseDir || '.', dest).split(path.sep).join('/');
    s.clip_info = { duration: +p.duration.toFixed(3), width: p.width, height: p.height, fps: +p.fps.toFixed(3), from: path.basename(hit.file) };
    report.push({ id: s.id, status: issues.some((x) => x === '没有视频流') ? 'invalid' : issues.length ? 'ok-with-warnings' : 'ok', file: path.basename(hit.file), duration: p.duration, size: `${p.width}x${p.height}`, issues });
  }
  const unknown = files.filter((f) => !ID_RE.test(f));
  return { report, unknown };
}
