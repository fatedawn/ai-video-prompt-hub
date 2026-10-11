#!/usr/bin/env node
/**
 * Export H3 / Seedance production packs from hub shots.json or shuohao storyboard.json.
 * Absorbed helpers: eternityspring/shuohao-skills (Apache-2.0, 烁皓).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { exportPack, toBoard, writePack } from './lib/core.mjs';
import { validateDoc } from './lib/gates.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const HELP = `shuohao-export — H3 / Seedance 投产包（吸收自 eternityspring/shuohao-skills）

用法:
  node tools/shuohao-export/cli.mjs export <shots.json|storyboard.json> --protocol h3|seedance [--out dir]
  node tools/shuohao-export/cli.mjs validate <shots.json|storyboard.json> [--strict-drama] [--names 沈晚,林柔]
  node tools/shuohao-export/cli.mjs board <shots.json> [--out board.json]   # 只做 hub→段/切 桥接

参考写法: tools/shuohao-export/references/{h3-prompt,seedance-prompt,shot-writing}.md
`;

function args(argv) {
  const o = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--') {
      o._.push(...argv.slice(i + 1));
      break;
    }
    if (a.startsWith('--')) {
      const k = a.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith('--')) o[k] = true;
      else {
        o[k] = next;
        i++;
      }
    } else o._.push(a);
  }
  return o;
}

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'));
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const a = args(rest);
  if (!cmd || cmd === 'help' || a.help) {
    console.log(HELP);
    return;
  }
  const src = a._[0];
  if (!src) throw new Error('缺少输入文件\n' + HELP);
  const doc = readJson(path.resolve(src));

  if (cmd === 'board') {
    const board = toBoard(doc);
    const out = path.resolve(a.out || 'board.json');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, JSON.stringify(board, null, 2) + '\n');
    const n = board.episodes?.[0]?.segments?.length ?? 0;
    console.log(`桥接完成 · ${board._source} · ${n} 段 → ${out}`);
    return;
  }

  if (cmd === 'validate') {
    const names = a.names ? String(a.names).split(/[,，]/).map((s) => s.trim()).filter(Boolean) : undefined;
    const { ok, gates, failed, board } = validateDoc(doc, {
      names,
      strictDrama: !!a['strict-drama'],
    });
    for (const g of gates) {
      console.log(`${g.ok ? '✓' : '✗'} [${g.id}] ${g.label}${g.detail ? ' — ' + g.detail : ''}`);
    }
    console.log(ok ? `全部通过（${board._source}）` : `${failed.length} 项未过`);
    process.exit(ok ? 0 : 1);
  }

  if (cmd === 'export') {
    const protocol = a.protocol || 'h3';
    if (!['h3', 'seedance'].includes(protocol)) throw new Error('--protocol 须为 h3 或 seedance');
    const board = toBoard(doc);
    const out = path.resolve(a.out || path.join(path.dirname(path.resolve(src)), `shuohao-${protocol}`));
    const pack = exportPack(board, { protocol });
    writePack(pack, out);
    console.log(
      `已导出 ${protocol} 包 · ${pack.manifest.length} 段 · 缺图标注 ${pack.missingTotal} → ${out}\n  清单: ${path.join(out, protocol === 'seedance' ? 'seedance-manifest.json' : 'manifest.json')}\n  写法: ${path.join(HERE, 'references', protocol === 'seedance' ? 'seedance-prompt.md' : 'h3-prompt.md')}`,
    );
    return;
  }

  throw new Error(`未知命令 ${cmd}\n${HELP}`);
}

main().catch((e) => {
  console.error('✗ ' + (e.message || e));
  process.exit(1);
});
