/**
 * Deterministic storyboard gates (subset that ports cleanly).
 *
 * Absorbed & adapted from eternityspring/shuohao-skills
 *   skills/novel-storyboard/scripts/novel-storyboard.mjs → gateReport
 * Apache-2.0, Copyright 2026 烁皓.
 * Upstream: https://github.com/eternityspring/shuohao-skills
 * Hub adaptations (Apache-2.0, (c) 2026 天机): also lint hub shots.json text.
 *
 * Ported gate ids: segment-cap, cut-length, h3-structure, seedance-shot, prompt-no-names
 * (plus soft helpers for hub text lint).
 */
import {
  CJK,
  CAMERA_MOVES,
  DEFAULT_PARAMS,
  H3_TOKENS,
  SEEDANCE_FORBIDDEN,
  SHOT_SIZES,
  h3AlignmentLine,
  h3CutSlices,
  h3CutTime,
  h3Remainder,
  paramsOf,
  cutStarts,
  segSeconds,
  toBoard,
} from './core.mjs';

function add(gates, id, label, ok, detail = '') {
  gates.push({ id, label, ok, detail });
}

/**
 * Run ported gates on a normalized board (shuohao or hub-bridged).
 * @param {object} board
 * @param {{ names?: string[], strictDrama?: boolean, requireH3?: boolean, requireSeedance?: boolean }} ctx
 */
export function gateReport(board, ctx = {}) {
  const gates = [];
  const params = paramsOf(board);
  // hub-bridged boards already widen cut window; strictDrama forces 2–5s
  if (ctx.strictDrama) {
    params.minCutSeconds = DEFAULT_PARAMS.minCutSeconds;
    params.maxCutSeconds = DEFAULT_PARAMS.maxCutSeconds;
  }
  const eps = Array.isArray(board?.episodes) ? board.episodes : [];
  const promptLang = board?.promptLang ?? 'en';
  const banned = [...new Set([
    ...(ctx.names ?? []),
    ...(board.characterNames ?? []),
  ].filter(Boolean))];
  const bad = { segCap: [], cutLen: [], h3s: [], names: [], sd: [] };
  const checkH3 = ctx.requireH3 !== false; // default on when h3Prompt present
  const checkSd = ctx.requireSeedance !== false;

  for (const ep of eps) {
    for (const seg of ep?.segments ?? []) {
      const sid = seg?.id ?? '?';
      const cuts = seg?.cuts ?? [];
      const total = segSeconds(seg);
      if (!(total > 0) || total > params.maxSegmentSeconds) {
        bad.segCap.push(`${sid} 共 ${total} 秒（上限 ${params.maxSegmentSeconds}）`);
      }

      const h3 = String(seg?.h3Prompt ?? '');
      const hasH3 = Boolean(h3.trim());
      if (hasH3 && checkH3) {
        const tk = H3_TOKENS[promptLang] ?? H3_TOKENS.zh;
        const wantLine = h3AlignmentLine(cuts, promptLang);
        if (!h3.trimStart().startsWith(wantLine)) {
          bad.h3s.push(`${sid} 首行对齐指令和分镜结构对不上`);
        } else {
          const idx = tk.fields.map((f) => h3.indexOf(f));
          if (idx.some((i) => i < 0) || !(idx[0] < idx[1] && idx[1] < idx[2])) {
            bad.h3s.push(`${sid} 三个核心字段缺失或顺序不对`);
          } else {
            const starts = cutStarts(cuts);
            if (h3.indexOf(tk.shot(1), idx[0]) < 0) bad.h3s.push(`${sid} 描述正文缺 ${tk.shot(1)}`);
            for (let k = 2; k <= cuts.length; k++) {
              const mark = tk.cutMark(k, h3CutTime(starts[k - 1]));
              if (h3.indexOf(mark, idx[0]) < 0) bad.h3s.push(`${sid} 缺「${mark}」`);
            }
          }
        }
        const rest = h3Remainder(h3);
        for (const name of banned) {
          if (name && rest.includes(name)) bad.names.push(`${sid} 的 h3Prompt 台词外出现「${name}」`);
        }
      } else if (ctx.requireH3 === true && !hasH3) {
        bad.h3s.push(`${sid} 缺 h3Prompt`);
      }

      if (/[<>]/.test(String(seg?.soundscape ?? ''))) bad.sd.push(`${sid} soundscape 自带 <>`);
      if (/[（）()]/.test(String(seg?.music ?? ''))) bad.sd.push(`${sid} music 自带括号`);

      cuts.forEach((cut, ci) => {
        const cid = `${sid}#${ci + 1}`;
        if (!(cut?.seconds >= params.minCutSeconds) || cut.seconds > params.maxCutSeconds) {
          bad.cutLen.push(`${cid} ${cut?.seconds ?? '?'} 秒（期望 ${params.minCutSeconds}–${params.maxCutSeconds}）`);
        }
        if (checkSd) {
          const shot = String(cut?.shot ?? '');
          if (!shot.trim()) {
            // hub bridge always fills shot; empty only on incomplete shuohao boards
            if (board._source === 'shuohao-storyboard') bad.sd.push(`${cid} 缺 shot`);
          } else {
            for (const [re, what] of SEEDANCE_FORBIDDEN) {
              if (re.test(shot)) bad.sd.push(`${cid} 的 shot 写了${what}`);
            }
            for (const name of banned) {
              if (name && shot.includes(name)) bad.names.push(`${cid} Seedance 正文出现「${name}」`);
            }
          }
        }
      });
    }
  }

  const skipNames = banned.length ? '' : '未提供角色名，本门跳过（视为通过）';
  const hasEps = eps.length > 0;
  add(gates, 'segment-cap', `每段 0 < 总秒数 ≤ ${params.maxSegmentSeconds}`, hasEps && bad.segCap.length === 0, bad.segCap.join('；'));
  add(
    gates,
    'cut-length',
    `每个分镜 ${params.minCutSeconds}–${params.maxCutSeconds} 秒`,
    hasEps && bad.cutLen.length === 0,
    bad.cutLen.join('；'),
  );
  add(gates, 'h3-structure', 'H3 首行对齐与切点时刻（有 h3Prompt 时）', bad.h3s.length === 0, bad.h3s.join('；'));
  add(
    gates,
    'prompt-no-names',
    '视频提示词不含角色名（H3 正文 / Seedance shot）',
    bad.names.length === 0,
    banned.length ? bad.names.join('；') : skipNames,
  );
  add(
    gates,
    'seedance-shot',
    'Seedance 镜头正文不写时间/镜头编号/协议符号',
    bad.sd.length === 0,
    bad.sd.join('；'),
  );
  return gates;
}

export function validateBoard(board, ctx = {}) {
  const gates = gateReport(board, ctx);
  const failed = gates.filter((g) => !g.ok);
  return { ok: failed.length === 0, gates, failed };
}

/** Validate hub shots.json or shuohao storyboard.json from raw doc. */
export function validateDoc(doc, ctx = {}) {
  const board = toBoard(doc, ctx);
  return { board, ...validateBoard(board, ctx) };
}

/**
 * Text-level gates for MCP lint (works without full board JSON).
 * Returns extra issues array compatible with lintStoryboard.
 */
export function lintTextGates(text, { target, names = [], maxSegmentSeconds = 15 } = {}) {
  const issues = [];
  const warnings = [];
  const t = String(text || '');

  // rough segment durations from [a-b秒] or 第N段（a–b秒）
  const spans = [...t.matchAll(/[\[【(（]?\s*(\d+(?:\.\d+)?)\s*(?:s|秒)?\s*[-–~至]\s*(\d+(?:\.\d+)?)\s*(?:s|秒)?/gi)];
  for (const m of spans) {
    const a = +m[1];
    const b = +m[2];
    if (b > a) {
      const d = b - a;
      if (d > maxSegmentSeconds) {
        issues.push({
          id: 'segment-cap',
          level: 'error',
          element: '段时长上限',
          why: `区间 ${a}-${b} 共 ${d}s，超过单段生成上限 ${maxSegmentSeconds}s`,
        });
      }
      if (d < 2 || d > 5) {
        warnings.push({
          id: 'cut-length',
          level: 'warn',
          element: '分镜时长',
          why: `区间 ${a}-${b}（${d}s）不在短剧常用 2–5 秒；videogen 单镜可更长`,
        });
      }
    }
  }

  // prompt-no-names: names outside {dialogue} and 「definition」 lines
  const rest = t
    .replace(/\{[^{}]*\}/g, ' ')
    .replace(/「[^」]{1,12}」/g, ' ')
    .replace(/定义为\s*\S+/g, ' ');
  for (const name of names) {
    if (name && rest.includes(name)) {
      issues.push({
        id: 'prompt-no-names',
        level: 'error',
        element: '角色名',
        why: `视频提示词正文出现角色名「${name}」（台词 {} 与设定「名」行除外）`,
      });
    }
  }

  if (target === 'seedance' || /seedance/i.test(target || '')) {
    // shot bodies after 镜头N： should not mix H3 tokens
    if (/<Picture|<\/?d>|integrated_multimodal/i.test(t)) {
      issues.push({
        id: 'seedance-shot',
        level: 'error',
        element: 'Seedance 协议',
        why: '正文混入了 H3 标记（<Picture> / <d> / integrated_multimodal）；Seedance 用 @图片N 与 {}',
      });
    }
  }

  if (target === 'minimax' || target === 'h3' || /h3|minimax/i.test(target || '')) {
    if (t.includes('integrated_multimodal_description:') || t.includes('整体视听描述：')) {
      const wantEn = t.includes('How the reference pictures align') || t.includes(H3_TOKENS.en.i2va.slice(0, 40));
      const wantZh = t.includes('参考图与目标视频的对齐') || t.includes(H3_TOKENS.zh.i2va.slice(0, 12));
      if (!wantEn && !wantZh && /Picture|Shot|图 \d/.test(t)) {
        warnings.push({
          id: 'h3-structure',
          level: 'warn',
          element: 'H3 结构',
          why: '检测到 H3 字段但首行对齐指令可能缺失；用 tools/shuohao-export 从 shots.json 导出可自动生成骨架',
        });
      }
    }
  }

  return { issues, warnings };
}

export { DEFAULT_PARAMS, paramsOf, SHOT_SIZES, CAMERA_MOVES };
