// Narration: default = offline open-source TTS (Kokoro v1.1-zh via sherpa-onnx, tts/tts_local.py);
// optional fallback = edge-tts (online). Both write audio + SRT + word/char timestamps.
// Original code for ai-video-prompt-hub/animator.
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { readStructured, loadCharacter } from './project.mjs';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const LOCAL = path.join(ROOT, 'tts', 'tts_local.py');
const EDGE = path.join(ROOT, 'tools', 'tts_edge.py');
export const DEFAULT_LOCAL_VOICE = 'kokoro:zf_001';

export function findPython(a = {}) {
  if (a.python) return a.python;
  if (process.env.HDA_PYTHON) return process.env.HDA_PYTHON;
  for (const p of [path.join(ROOT, '.venv', 'bin', 'python'), path.join(ROOT, '.venv', 'Scripts', 'python.exe')]) if (fs.existsSync(p)) return p;
  return process.platform === 'win32' ? 'python' : 'python3';
}

/** Resolve the voice of one script line. Character voice config:
 *  "voice": {"local": "kokoro:zm_052", "edge": "zh-CN-YunxiNeural", "speed": 1.0,
 *            "variants": {"激动": {"local": "kokoro:zm_052", "speed": 1.15, "edge": "zh-CN-YunjianNeural"}}}
 *  A script line may set "voice": a variant name of its speaker, or a full spec ("kokoro:zf_001", "melo", "zh-CN-…Neural"). */
export function lineVoice(line, chars, engine, P) {
  const cv = (line.speaker && chars[line.speaker]?.voice) || {};
  const key = engine === 'edge' ? 'edge' : 'local';
  let v = cv[key], speed = cv.speed;
  const want = line.voice;
  if (want && cv.variants?.[want]) { v = cv.variants[want][key] || v; speed = cv.variants[want].speed ?? speed; }
  else if (want && (engine === 'edge' ? /Neural$/.test(want) : /^(kokoro|melo|aishell3)(:|$)/.test(want))) v = want;
  const narrator = engine === 'edge' ? (P.tts?.edgeVoice || (/Neural$/.test(P.tts?.voice || '') ? P.tts.voice : null) || 'zh-CN-XiaoxiaoNeural')
    : (P.tts?.localVoice || (/^(kokoro|melo|aishell3)/.test(P.tts?.voice || '') ? P.tts.voice : null) || DEFAULT_LOCAL_VOICE);
  return { voice: v || narrator, speed: line.speed ?? speed ?? P.tts?.speed };
}

/** Synthesize a project's script. Returns {audio, srt, words, engine}. */
export function synthesize(file, a = {}) {
  const P = readStructured(file);
  const dir = path.dirname(file);
  if (!P.script?.length) throw new Error('工程里没有 script（逐行台词），无法合成');
  const engine = a.engine || P.tts?.engine || 'local';
  const chars = {};
  for (const [id, ref] of Object.entries(P.characters || {})) chars[id] = loadCharacter(typeof ref === 'string' ? ref : ref.file, dir);
  const lines = P.script.map((l) => ({ text: l.text, ...lineVoice(l, chars, engine, P) }));
  if (a.voice) lines.forEach((l) => (l.voice = a.voice));
  const out = path.resolve(dir, a.out || P.tts?.out || 'voice');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const py = findPython(a);
  const job = engine === 'edge'
    ? { lines, out, rate: P.tts?.rate || '+0%', gap: P.tts?.gap ?? 0.35, lead: P.tts?.lead ?? 0.4 }
    : { lines, out, gap: P.tts?.gap ?? 0.35, lead: P.tts?.lead ?? 0.5, align: a.align || P.tts?.align || 'auto', models: a.models || process.env.HDA_MODELS || null, threads: a.threads ? +a.threads : undefined };
  const r = spawnSync(py, [engine === 'edge' ? EDGE : LOCAL], { input: JSON.stringify(job), stdio: ['pipe', 'pipe', 'inherit'], encoding: 'utf8', maxBuffer: 1 << 26 });
  if (r.error || r.status !== 0) {
    throw new Error(engine === 'edge'
      ? 'edge-tts 失败（需要联网与 pip install edge-tts）。默认的本地 TTS 不需要联网：去掉 --engine edge 即可'
      : `本地 TTS 失败（Python: ${py}）。先运行一次：npm run setup:tts（建 .venv、装 sherpa-onnx 等、下载并校验模型），或设置 HDA_PYTHON 指向已装依赖的 Python。临时也可用 --engine edge`);
  }
  const res = JSON.parse(r.stdout.trim().split('\n').pop());
  return { ...res, engine };
}

export function ttsCmd(a) {
  const file = path.resolve(a._[0] || '');
  if (!fs.existsSync(file)) throw new Error('用法: tts <project.json> [--engine local|edge] [--voice kokoro:zm_052] [--align auto|whisper|even] [--out voice]');
  const res = synthesize(file, a);
  const dir = path.dirname(file);
  const rel = (f) => path.relative(dir, f);
  if (res.rtf) console.log(`本地 TTS：${res.seconds}s 音频，用时 ${res.wall}s（实时率 ${res.rtf}）`);
  console.log(`已生成：\n  ${res.audio}\n  ${res.srt}\n  ${res.words}\n把工程的 timing 改成（或直接用 make 命令一步出片）：\n  "timing": { "srt": "${rel(res.srt)}", "words": "${rel(res.words)}", "audio": "${rel(res.audio)}" }`);
}
