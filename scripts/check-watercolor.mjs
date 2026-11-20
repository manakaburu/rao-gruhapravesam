import assert from 'node:assert/strict'
import { readFileSync, statSync } from 'node:fs'
import { watercolorAt } from '../src/data/watercolor.ts'

const registry = JSON.parse(readFileSync(new URL('../docs/SCENE_REGISTRY.json', import.meta.url)))
assert.deepEqual(registry.scenes.slice(1).map(scene => scene.eyebrow), [
  'Welcome Home', 'Divine Blessings', 'Auspicious Ceremonies', 'Vindu Bhojanam', 'Our New Abode',
])
for (const mask of ['watercolor-mask-clarity.png', 'watercolor-seam-final.png']) {
  assert.ok(statSync(new URL('../public/assets/' + mask, import.meta.url)).size > 1000)
}

let previousSize = 0
for (let step = 0; step <= 1000; step++) {
  const p = step / 1000
  const { aperture, pigment, cue, cueDetail, heading, body, departingHeading, departingBody } = watercolorAt(p)
  assert.ok(aperture >= previousSize && aperture <= 1)
  previousSize = aperture
  assert.ok(pigment >= 0 && pigment <= 1)
  // V11.1 card window: arrives .18–.34, holds .34–.58, leaves by .72.
  if (p <= .18 || p >= .72) assert.equal(cue, 0)
  if (p >= .34 && p <= .58) assert.equal(cue, 1)
  // Number and floral rule follow the name in, and leave before it.
  assert.ok(cueDetail <= cue + 1e-9)
  if (p <= .72) assert.equal(heading, 0)
  if (p <= .80) assert.equal(body, 0)
  if (p >= .88) assert.equal(heading, 1)
  // Never two texts at once: outgoing copy, card, then incoming copy.
  if (cue > 0) assert.equal(heading + departingHeading + departingBody, 0)
  assert.ok(body <= heading)
  assert.ok(departingBody <= departingHeading)
}
assert.equal(watercolorAt(0).aperture, 0)
assert.equal(watercolorAt(1).aperture, 1)
assert.equal(watercolorAt(1).body, 1)
assert.equal(watercolorAt(1).pigment, 0)
console.log('All five cues share a continuous opening, a staggered title card, separate text windows and a clean handoff.')
