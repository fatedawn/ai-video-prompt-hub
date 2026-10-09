// OPTIONAL: generate the stills through the OpenAI Images API (billed separately from a ChatGPT membership!).
// Default path of this project is manual: make the images in ChatGPT and drop them in a folder.
// Key from OPENAI_API_KEY (env / .env) only; never stored. Without a key (or with --dry-run) we print the request.
// Endpoint: POST https://api.openai.com/v1/images/generations {model, prompt, size, quality, n} → data[].b64_json
// Model names per OpenAI docs (checked 2026-10-09): gpt-image-2.5-flare (fast, default), gpt-image-2.5-sunburst, gpt-image-2.
// Original code (Apache-2.0, © 2026 天机).
import fs from 'node:fs';
import path from 'node:path';
import { showRequest } from '../../videogen/providers/index.mjs';

const SIZE = { '9:16': '1024x1536', '16:9': '1536x1024', '1:1': '1024x1024', '3:4': '1024x1536', '4:3': '1536x1024' };

export function imageRequest(prompt, o = {}, env = process.env) {
  return {
    method: 'POST', url: `${(env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')}/images/generations`,
    headers: { Authorization: `Bearer ${env.OPENAI_API_KEY || '<OPENAI_API_KEY>'}`, 'Content-Type': 'application/json' },
    body: { model: o.model || env.OPENAI_IMAGE_MODEL || 'gpt-image-2.5-flare', prompt, size: o.size || SIZE[o.aspect] || '1024x1536', quality: o.quality || 'medium', n: 1 },
  };
}

export async function generateImages(prompts, outDir, o = {}) {
  const env = o.env || process.env;
  const dry = o.dryRun || !env.OPENAI_API_KEY;
  const res = [];
  fs.mkdirSync(outDir, { recursive: true });
  for (const [i, p] of prompts.entries()) {
    const req = imageRequest(p, o, env);
    const file = path.join(outDir, `${String(i + 1).padStart(2, '0')}.png`);
    if (dry) { res.push({ file, dryRun: true, text: showRequest(req, env) }); continue; }
    const r = await (o.fetch || fetch)(req.url, { method: 'POST', headers: req.headers, body: JSON.stringify(req.body) });
    const j = await r.json();
    if (!r.ok) throw new Error(`OpenAI 图像接口 HTTP ${r.status}：${JSON.stringify(j.error || j).slice(0, 300)}`);
    fs.writeFileSync(file, Buffer.from(j.data[0].b64_json, 'base64'));
    res.push({ file });
  }
  return res;
}
