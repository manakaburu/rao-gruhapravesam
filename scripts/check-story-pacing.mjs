import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
const chapterSource = readFileSync(new URL('../src/data/chapters.ts', import.meta.url), 'utf8')
const stage = readFileSync(new URL('../src/components/CinematicStage.tsx', import.meta.url), 'utf8')
const transition = readFileSync(new URL('../src/components/WatercolorTransition.tsx', import.meta.url), 'utf8')
const css = readFileSync(new URL('../src/styles/invitation.css', import.meta.url), 'utf8')
const names = ['entrance','welcome','blessings','ceremonies','feast','closing']
const runwayMatch = chapterSource.match(/RUNWAY = \{ perStage: ([.\d]+), min: (\d+), max: (\d+), shortStage: (\d+) \}/)
assert(runwayMatch, 'Viewport-relative RUNWAY constant missing')
const runway = { perStage:Number(runwayMatch[1]), min:Number(runwayMatch[2]), max:Number(runwayMatch[3]) }
assert(runway.min>=3000 && runway.max<=6500 && runway.perStage>=5.5 && runway.perStage<=7.5, 'Scroll runway out of balanced range')
const beats = names.map(name => {
  const match = chapterSource.match(new RegExp(`\\b${name}: \\[([.\\d]+),\\s*([.\\d]+)\\]`))
  assert(match, `Missing story beat ${name}`)
  return {name, start:Number(match[1]),end:Number(match[2])}
})
assert.equal(beats[0].start, 0)
assert.equal(beats.at(-1).end, 1)
for (let i=0;i<beats.length;i++) {
  const beat=beats[i]
  assert(beat.end>beat.start,`Invalid reading window for ${beat.name}`)
  if (i===0) assert(beat.end<=.07,'Opening scene should not delay first transition')
  if (i<beats.length-1) {
    const gap=beats[i+1].start-beat.end
    assert(gap>=.11 && gap<=.15,`${beat.name} full-page fade needs a .11–.15 progress window; got ${gap}`)
    // V11: runway = 6.4 × stage height, so each wash is ~0.74 of a screen tall.
    const wash = gap * runway.perStage
    assert(wash>=.65 && wash<=.85, `${beat.name} wash should take about 0.65–0.85 screens; got ${wash.toFixed(2)}`)
    if (i>0) assert(beat.end-beat.start>=.06, `${beat.name} needs a real reading hold`)
  }
}
assert(stage.includes('stageHeight * RUNWAY.perStage') && stage.includes("probe.style.height = '100svh'"), 'Runway must follow the stable small-viewport stage height')
assert(stage.includes('scrub: .55'), 'Responsive scroll scrub latency changed')
assert(stage.includes('watercolorAt(blend)'), 'Watercolor must sample the shared scroll playhead')
assert(stage.includes("field.style.setProperty('--watercolor-aperture-size'"), 'Full-field watercolor opening missing')
assert(!stage.includes('incoming.style.clipPath'), 'Do not reintroduce a hard polygon portal')
assert(stage.includes('trigger: track') && !stage.includes('pin: true'), 'Sticky story must not use dynamic GSAP pinning')
assert(transition.includes('watercolor-chapter-reveal') && transition.includes('chapter-portal__title'), 'Centered title overlay missing')
assert(!transition.includes('chapter-portal__rim'), 'No scorched paper edge should be present')
assert(css.includes("-webkit-mask-image:url('/assets/watercolor-mask-clarity.png')"), 'Higher-contrast full-stage watercolor mask missing')
assert(css.includes('scale:1 !important'), 'Master paintings must remain fixed')
assert(css.includes('@media(prefers-reduced-motion:reduce)'), 'Reduced motion support missing')
console.log('6 scenes, 5 readable reversible watercolor reveals, centered chapter titles, fixed art PASS')
