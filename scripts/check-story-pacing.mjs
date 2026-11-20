import { strict as assert } from 'node:assert'
import { readFileSync } from 'node:fs'
const chapterSource = readFileSync(new URL('../src/data/chapters.ts', import.meta.url), 'utf8')
const stage = readFileSync(new URL('../src/components/CinematicStage.tsx', import.meta.url), 'utf8')
const transition = readFileSync(new URL('../src/components/WatercolorTransition.tsx', import.meta.url), 'utf8')
const css = readFileSync(new URL('../src/styles/invitation.css', import.meta.url), 'utf8')
const names = ['entrance','welcome','blessings','ceremonies','feast','closing']
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
    assert(gap*5800>=690 && gap*5800<=830,'Desktop transition should take about 700–900px')
    assert(gap*4200>=500 && gap*4200<=600,'Mobile transition should take about 500–650px')
  }
}
assert(stage.includes('scrollDistance = 5800') && stage.includes('? 4200 : 5800'), 'Final balanced scroll runway changed')
assert(stage.includes('scrub: .55'), 'Responsive scroll scrub latency changed')
assert(stage.includes('const drawWatercolor = (blend: number, incoming: HTMLElement)'), 'Full-scene watercolor reveal missing')
assert(stage.includes("incoming.style.setProperty('--watercolor-aperture-size'"), 'Full-page expanding watercolor mask missing')
assert(!stage.includes('incoming.style.clipPath'), 'Do not reintroduce hard-edged V7 polygon portal')
assert(stage.includes('const glimpse = ease((blend - .43) / .11) * (1 - ease((blend - .66) / .12))'), 'V9 centered chapter glimpse timing missing')
assert(stage.includes('isIncoming ? ease((blend - .79) / .19)'), 'Normal heading must follow centered glimpse')
assert(stage.includes('isIncoming ? ease((blend - .88) / .12)'), 'Body must follow heading')
assert(stage.includes('drawWatercolor(blend, sections[incoming])'), 'Watercolor must follow existing scroll playhead')
assert(stage.includes('trigger: track') && !stage.includes('pin: true'), 'Sticky story must not use dynamic GSAP pinning')
assert(transition.includes('watercolor-chapter-reveal') && transition.includes('chapter-portal__title'), 'Centered title overlay missing')
assert(!transition.includes('chapter-portal__rim'), 'No scorched paper edge should be present')
assert(css.includes('V9 — READABLE CINEMATIC WATERCOLOR REVEAL'), 'V9 painterly CSS missing')
assert(css.includes("-webkit-mask-image:url('/assets/watercolor-mask-clarity.png') !important"), 'Higher-contrast full-stage watercolor mask missing')
assert(css.includes('scale:1 !important'), 'Master paintings must remain fixed')
assert(css.includes('@media(prefers-reduced-motion:reduce)'), 'Reduced motion support missing')
console.log('V9: 6 scenes, 5 readable reversible watercolor reveals, centered chapter titles, fixed art PASS')
