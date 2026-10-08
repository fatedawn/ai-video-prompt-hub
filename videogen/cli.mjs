#!/usr/bin/env node
// videogen — storyboard (镜头N) → video clips via cloud APIs (BYO key) / your own GPU (ComfyUI) / manual web
// round-trip → one assembled MP4 with open TTS voice-over and word-timed subtitles.
// Original code for ai-video-prompt-hub/videogen. Keys are read from env / .env only; never stored or uploaded by us.
import fs from 'node:fs';
import path from 'node:path';
import { loadEnv } from './lib/env.mjs';
import { readStoryboardFile } from './lib/storyboard.mjs';
import { PROVIDERS, getProvider, missingEnv, generateShot } from './providers/index.mjs';
import { exportPackages, importClips, SITES } from './lib/manual.mjs';
import { assemble } from './lib/assemble.mjs';

const HELP = `用法: node videogen/cli.mjs <命令> [参数]

  plan      <分镜.md|txt> [--out shots.json] [--unit shot|segment] [--aspect 9:16] [--refs 参考图目录]
            把仓库格式的分镜提示词（[全局]…/镜头N：/[0-3秒]/第N段）拆成镜头清单 shots.json
  providers                                   列出所有生成通道、需要的环境变量、是否已配置
  gen       <shots.json> --provider seedance|kling|minimax|veo|fal|replicate|runway|luma|comfyui
            [--only S01_shot02,…] [--dry-run] [--model …] [--clips clips/] [--workflow wf.json] [--native-audio]
            路线 A（云 API，自带 key）/ 路线 B（自己的 GPU + ComfyUI）；--dry-run 只打印请求，不发送
  export    <shots.json> [--out packages/] [--site jimeng|kling|hailuo|sora|veo|generic]
            路线 C：导出逐镜头生成包（中/英提示词、负面词、时长、画幅、参考图、检查清单、文件名约定）
  import    <shots.json> --from <下载目录> [--clips clips/]
            路线 C：按文件名（S01_shot03*.mp4）收回网页端下载的视频，校验时长/画幅，写回 shots.json
  assemble  <shots.json> [--out final.mp4] [--clips clips/] [--bgm music.mp3] [--bgm-volume 0.22]
            [--fit auto|slow|hold|trim|loop] [--frame auto|crop|blur|pad] [--clip-audio 0.3] [--size 1080x1920] [--allow-missing] [--keep-work]
            统一合成：镜头（任意来源或手绘 animator）+ 本地开源 TTS 配音 + 逐字字幕 + 可选 BGM → 成片
`;

function args(argv) {
  const o = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) { const k = a.slice(2); o[k] = argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[++i] : true; } else o._.push(a);
  }
  return o;
}

const readJson = (f) => JSON.parse(fs.readFileSync(f, 'utf8'));
const writeJson = (f, j) => fs.writeFileSync(f, JSON.stringify(j, null, 2) + '\n');

function attachRefs(sb, dir, baseDir) {
  // refs folder: 图片1.png / 图片2.jpg … are matched to @图片1 / @图片2; S01_shot02.png = first frame of that shot
  const files = fs.readdirSync(dir).filter((f) => /\.(png|jpe?g|webp)$/i.test(f));
  const rel = (f) => path.relative(baseDir, path.join(dir, f)).split(path.sep).join('/');
  for (const s of sb.shots) {
    for (const r of s.refs) { const hit = files.find((f) => f.replace(/\.\w+$/, '') === r.tag.slice(1)); if (hit) r.path = rel(hit); }
    const ff = files.find((f) => f.replace(/\.\w+$/, '') === s.id);
    if (ff) s.first_frame = { path: rel(ff) };
  }
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const a = args(rest);
  if (!cmd || cmd === 'help' || a.help) return console.log(HELP);
  loadEnv(process.cwd());

  if (cmd === 'plan') {
    const src = a._[0];
    if (!src) throw new Error('用法: plan <分镜.md> [--out shots.json]');
    const out = path.resolve(a.out || 'shots.json');
    const sb = readStoryboardFile(src, { unit: a.unit, aspect: a.aspect });
    fs.mkdirSync(path.dirname(out), { recursive: true });
    if (a.refs) attachRefs(sb, path.resolve(a.refs), path.dirname(out));
    writeJson(out, sb);
    console.log(`${sb.shots.length} 个镜头 · 画幅 ${sb.aspect} · 角色 ${sb.characters.map((c) => c.name).join('、') || '—'} → ${out}`);
    for (const s of sb.shots) console.log(`  ${s.id}  ${String(s.duration).padStart(4)}s  ${s.lines.map((l) => `${l.speaker || '旁白'}：${l.text}`).join(' / ') || ''}  ${s.shot_text.slice(0, 40)}${s.shot_text.length > 40 ? '…' : ''}`);
    return;
  }
  if (cmd === 'providers') {
    console.log('通道            路线    需要的环境变量                 状态');
    for (const p of Object.values(PROVIDERS)) {
      const miss = missingEnv(p);
      const st = p.route === 'local' ? `ComfyUI：${process.env.COMFYUI_URL || 'http://127.0.0.1:8188'}` : miss.length ? `未配置（缺 ${miss.join(', ')}）` : '已配置';
      console.log(`${p.id.padEnd(15)} ${p.route === 'cloud' ? 'A 云端' : 'B 本地'}  ${(p.env.join(', ') || '（无）').padEnd(30)} ${st}`);
    }
    console.log('\n路线 C（网页端手动）不需要任何 key：export → 网页生成 → import');
    return;
  }

  const file = path.resolve(a._[0] || 'shots.json');
  if (!fs.existsSync(file)) throw new Error(`找不到 ${file}（先运行 plan）`);
  const sb = readJson(file);
  const baseDir = path.dirname(file);

  if (cmd === 'gen') {
    if (!a.provider) throw new Error('缺少 --provider（可选：' + Object.keys(PROVIDERS).join(' / ') + '）');
    const p = getProvider(a.provider);
    const only = a.only ? new Set(String(a.only).split(',')) : null;
    const clipsDir = path.resolve(baseDir, a.clips || 'clips');
    const ctx = { baseDir, model: a.model, dryRun: !!a['dry-run'], workflow: a.workflow && path.resolve(a.workflow), nativeAudio: !!a['native-audio'], resolution: a.resolution, interval: a.interval ? +a.interval : undefined, log: console.log };
    if (!ctx.dryRun && p.route === 'cloud' && missingEnv(p).length) throw new Error(`${p.name} 需要 ${missingEnv(p).join(', ')}：复制 .env.example 为 .env 并填入你自己的 key（或先用 --dry-run 看请求）`);
    for (const s of sb.shots) {
      if (only && !only.has(s.id)) continue;
      const outFile = path.join(clipsDir, `${s.id}.mp4`);
      const r = await generateShot(p, s, outFile, ctx);
      if (r.dryRun) { console.log(`\n===== ${s.id} · ${p.name}（dry-run，未发送）=====\n${r.text}`); continue; }
      s.clip = path.relative(baseDir, r.file).split(path.sep).join('/');
      s.generated = { provider: p.id, model: a.model || null, task: r.taskId, at: new Date().toISOString() };
      writeJson(file, sb);
      console.log(`  ✓ ${s.id} → ${s.clip}`);
    }
    return;
  }
  if (cmd === 'export') {
    const out = path.resolve(a.out || path.join(baseDir, 'packages'));
    if (a.site && !SITES[a.site]) throw new Error(`未知 --site ${a.site}（可选：${Object.keys(SITES).join(' / ')}）`);
    const r = exportPackages(sb, out, { site: a.site, baseDir, shotsFile: path.relative(process.cwd(), file) });
    console.log(`已导出 ${r.count} 个镜头包 → ${out}\n  打开 ${path.join(out, 'README.md')}，逐个镜头按 checklist.md 在网页端生成，下载后命名为 镜头编号.mp4`);
    return;
  }
  if (cmd === 'import') {
    if (!a.from) throw new Error('缺少 --from <下载目录>');
    const { report, unknown } = importClips(sb, path.resolve(a.from), path.resolve(baseDir, a.clips || 'clips'), { baseDir });
    writeJson(file, sb);
    const icon = { ok: '✓', 'ok-with-warnings': '⚠', missing: '✗', invalid: '✗' };
    for (const r of report) console.log(`  ${icon[r.status]} ${r.id}  ${r.status === 'missing' ? '没找到（文件名要以镜头编号开头）' : `${r.file}  ${r.duration.toFixed(2)}s  ${r.size}`}${(r.issues || []).map((x) => `\n      - ${x}`).join('')}`);
    if (unknown.length) console.log(`  （忽略了 ${unknown.length} 个不符合命名的文件：${unknown.slice(0, 5).join(', ')}${unknown.length > 5 ? '…' : ''}）`);
    const miss = report.filter((r) => r.status === 'missing' || r.status === 'invalid').length;
    console.log(miss ? `还缺 ${miss} 个镜头；补齐后再 import，或 assemble --allow-missing 先看效果` : '全部镜头就绪 → 下一步：assemble');
    return;
  }
  if (cmd === 'assemble') {
    const tl = assemble(sb, { baseDir, clipsDir: a.clips, out: a.out ? path.resolve(a.out) : path.join(baseDir, 'final.mp4'), bgm: a.bgm && path.resolve(a.bgm), bgmVolume: a['bgm-volume'] ? +a['bgm-volume'] : undefined, fit: a.fit, frame: a.frame, clipAudio: a['clip-audio'] ? +a['clip-audio'] : 0, size: a.size, font: a.font, allowMissing: !!a['allow-missing'], keepWork: !!a['keep-work'], subtitles: !a['no-subtitles'] });
    for (const s of tl.shots) console.log(`  ${s.id}  ${s.start.toFixed(2)}s 起  目标 ${s.target}s  素材 ${s.clipDuration ?? '—'}s → ${s.fit.mode}${s.fit.speed && s.fit.speed !== 1 ? `（${(1 / s.fit.speed).toFixed(2)}× 放慢）` : ''}${s.fit.hold ? `（定格 ${s.fit.hold}s）` : ''}${s.fit.trim ? `（裁掉 ${s.fit.trim}s）` : ''}`);
    console.log(`完成：${tl.out}（${tl.duration}s，${tl.size}）\n  字幕：${tl.out.replace(/\.mp4$/i, '.srt')}\n  时间线：${tl.out.replace(/\.mp4$/i, '.timeline.json')}`);
    return;
  }
  throw new Error(`未知命令 ${cmd}\n${HELP}`);
}

main().catch((e) => { console.error('✗ ' + (e.message || e)); process.exit(1); });
