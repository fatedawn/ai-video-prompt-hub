// Minimal .env loader (no dependency). Real environment variables always win over .env.
// Original code for ai-video-prompt-hub/videogen. We never ship, store or log keys.
import fs from 'node:fs';
import path from 'node:path';

export function loadEnv(start = process.cwd()) {
  const seen = new Set();
  for (let d = path.resolve(start); ; d = path.dirname(d)) {
    const f = path.join(d, '.env');
    if (fs.existsSync(f) && !seen.has(f)) {
      seen.add(f);
      for (const raw of fs.readFileSync(f, 'utf8').split(/\r?\n/)) {
        const m = raw.match(/^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)\s*$/);
        if (!m || process.env[m[1]] !== undefined) continue;
        let v = m[2];
        if (/^".*"$|^'.*'$/.test(v)) v = v.slice(1, -1);
        else v = v.replace(/\s+#.*$/, '');
        process.env[m[1]] = v;
      }
    }
    if (path.dirname(d) === d) break;
  }
  return [...seen];
}

/** Redact secrets for printing: keep 3 chars + length. */
export const redact = (v) => (v ? `${String(v).slice(0, 3)}…(${String(v).length} chars)` : v);
