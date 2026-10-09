#!/usr/bin/env node
// Optional read-only streamable HTTP, bound to loopback only. No API keys.
import http from 'node:http';
import { createMcpHandler } from '@modelcontextprotocol/server';
import { factory } from './server.mjs';

const host = '127.0.0.1';
const port = Number(process.env.PORT || 8765);
const handler = createMcpHandler(factory);

const server = http.createServer(async (req, res) => {
  const remote = req.socket.remoteAddress || '';
  if (!['127.0.0.1', '::1', '::ffff:127.0.0.1'].includes(remote)) {
    res.writeHead(403); res.end('local only'); return;
  }
  const chunks = [];
  for await (const c of req) chunks.push(c);
  const body = ['GET', 'HEAD'].includes(req.method || '') ? undefined : Buffer.concat(chunks);
  const r = await handler.fetch(new Request(`http://${host}:${port}${req.url}`, { method: req.method, headers: req.headers, body }));
  res.writeHead(r.status, Object.fromEntries(r.headers));
  res.end(Buffer.from(await r.arrayBuffer()));
});
server.listen(port, host, () => console.error(`ai-video-prompt-hub MCP http://127.0.0.1:${port}/mcp (read-only, local)`));
