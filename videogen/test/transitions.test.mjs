import test from 'node:test';
import assert from 'node:assert/strict';
import { transitionSpec, transitionPlan, XFADE } from '../lib/assemble.mjs';
import { bindTitles, fillWorkflow } from '../providers/comfyui.mjs';

test('transitionSpec normalises names', () => {
  assert.equal(transitionSpec('cut'), null);
  assert.equal(transitionSpec(null), null);
  assert.deepEqual(transitionSpec('fade'), { type: 'fade', dur: 0.5 });
  assert.equal(transitionSpec('xfade:circleopen').type, 'circleopen');
  assert.deepEqual(transitionSpec('huashu:inkBloom'), { type: 'huashu:inkBloom', dur: 0.6 });
  assert.equal(transitionSpec({ type: 'wipeleft', dur: 1 }).dur, 1);
  assert.equal(transitionSpec(null, 'fadeblack').type, 'fadeblack');
  assert.ok(XFADE.includes('smoothleft'));
});

test('transitionPlan clamps durations and skips the last shot', () => {
  const p = transitionPlan([{ transition: 'fade' }, { transition: { type: 'fade', dur: 3 } }, { transition: 'fade' }], [4, 2, 4]);
  assert.equal(p[0].dur, 0.5);
  assert.equal(p[1].dur, 0.9);
  assert.equal(p[2], null);
  assert.deepEqual(transitionPlan([{}, {}], [3, 3]), [null, null]);
  assert.equal(transitionPlan([{}, {}], [3, 3], 'fade')[0].type, 'fade');
});

test('bindTitles fills "$name.input" titled nodes (exported ComfyUI workflows without placeholders)', () => {
  const wf = {
    1: { class_type: 'CLIPTextEncode', inputs: { text: 'old' }, _meta: { title: '$prompt.text' } },
    2: { class_type: 'LoadImage', inputs: { image: 'x.png' }, _meta: { title: '$image.image' } },
    3: { class_type: 'LoadImage', inputs: { image: 'y.png' }, _meta: { title: '$image_end.image' } },
    4: { class_type: 'EmptyLatent', inputs: { width: 1 }, _meta: { title: 'Latent' } },
  };
  bindTitles(wf, { PROMPT: '竹林', IMAGE: 'a.png', IMAGE_END: 'b.png' });
  assert.equal(wf[1].inputs.text, '竹林');
  assert.equal(wf[2].inputs.image, 'a.png');
  assert.equal(wf[3].inputs.image, 'b.png');
  assert.equal(wf[4].inputs.width, 1);
});
