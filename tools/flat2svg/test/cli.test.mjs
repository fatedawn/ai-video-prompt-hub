import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { PRESETS, PRESET_NAMES, resolvePreset } from '../lib/presets.mjs';
import { findRenderer, MIN_VARIANCE } from '../lib/check.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CLI = path.join(HERE, '..', 'cli.mjs');
const FIXTURE = path.join(HERE, '..', 'examples', 'fixtures', 'tiny-flat.png');

function run(args, opts = {}) {
  return spawnSync(process.execPath, [CLI, ...args], {
    encoding: 'utf8',
    env: { ...process.env, ...(opts.env || {}) },
  });
}

function findVtracer() {
  const which = spawnSync('which', ['vtracer'], { encoding: 'utf8' });
  if (which.status === 0) return which.stdout.trim();
  const cargo = path.join(process.env.HOME || '', '.cargo', 'bin', 'vtracer');
  return fs.existsSync(cargo) ? cargo : null;
}

test('help exits 0 and mentions vtracer + presets', () => {
  const r = run(['--help']);
  assert.equal(r.status, 0, r.stderr);
  assert.match(r.stdout, /flat2svg/);
  assert.match(r.stdout, /vtracer|cargo install/i);
  assert.match(r.stdout, /face-safe/);
  assert.match(r.stdout, /clean/);
});

test('presets command lists clean / photo / face-safe', () => {
  const r = run(['presets']);
  assert.equal(r.status, 0, r.stderr);
  for (const n of PRESET_NAMES) assert.match(r.stdout, new RegExp(n));
  assert.deepEqual(PRESET_NAMES.sort(), ['clean', 'face-safe', 'photo'].sort());
  assert.ok(resolvePreset('clean').args.includes('--filter_speckle'));
  assert.ok(resolvePreset('face-safe').args.includes('2'));
  assert.deepEqual(resolvePreset('photo').args, ['--preset', 'photo']);
  assert.throws(() => resolvePreset('nope'));
});

test('doctor runs', () => {
  const r = run(['doctor']);
  assert.ok(r.status === 0 || r.status === 1);
  assert.match(r.stdout, /vtracer/);
});

const vt = findVtracer();
test(
  'converts tiny fixture when vtracer is available',
  {
    skip: !vt && 'vtracer not installed — run: cargo install vtracer',
  },
  () => {
    assert.ok(fs.existsSync(FIXTURE), 'fixture missing');
    const d = fs.mkdtempSync(path.join(os.tmpdir(), 'flat2svg-'));
    const out = path.join(d, 'tiny.svg');
    const r = run(['convert', FIXTURE, '-o', out, '--preset', 'clean'], {
      env: { PATH: `${path.dirname(vt)}${path.delimiter}${process.env.PATH || ''}` },
    });
    assert.equal(r.status, 0, r.stderr + r.stdout);
    assert.ok(fs.existsSync(out));
    const svg = fs.readFileSync(out, 'utf8');
    assert.match(svg, /<svg[\s>]/i);
    assert.ok(fs.statSync(out).size > 50);
  },
);

test('check module exports variance threshold', () => {
  assert.ok(MIN_VARIANCE > 0);
  // findRenderer may be null in CI — that is fine
  const r = findRenderer();
  assert.ok(r === null || r.kind === 'rsvg' || r.kind === 'cairosvg');
});
