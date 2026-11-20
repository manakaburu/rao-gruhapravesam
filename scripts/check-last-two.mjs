import { strict as assert } from 'node:assert'
import { readFileSync, statSync } from 'node:fs'
const read = file => readFileSync(new URL('../'+file,import.meta.url),'utf8')
const stage=read('src/components/CinematicStage.tsx')
const css=read('src/styles/invitation.css')
const chapters=read('src/data/chapters.ts')
assert(stage.includes("incoming.classList.contains('spread--feast') || incoming.classList.contains('spread--closing')"),'Only last two scenes may receive an edge emphasis')
assert(stage.includes("veil.dataset.quietTransition = incoming >= 4 ? 'true' : 'false'"),'Edge-scene switching missing')
assert(css.includes('.spread.revealing:is(.spread--feast,.spread--closing)'),'Last-two-only tint missing')
assert(css.includes('.watercolor-veil[data-quiet-transition="true"]::before'),'Watercolor seam missing')
assert(css.includes('.spread--feast:is(.departing,.revealing) .meal-inset'),'Feast art must remain visible during reveal')
assert(css.includes('.spread--closing.revealing .closing-inset'),'Closing art must remain visible during reveal')
assert(css.includes('.spread--ceremonies.departing .verse-block'),'Outgoing ritual art must not disappear before the next painting emerges')
assert(css.includes('.meal-inset > time'),'Meal details must still obey the delayed text fade')
assert(statSync(new URL('../public/assets/watercolor-seam-final.png',import.meta.url)).size>1000,'Watercolor edge texture not included')
for(const [scene,expected] of Object.entries({entrance:'[0, .05]',welcome:'[.18, .23]',blessings:'[.36, .41]',ceremonies:'[.54, .59]',feast:'[.72, .77]',closing:'[.90, 1]'})) {
 assert(chapters.includes(scene+': '+expected), 'Unexpected normalized beat change: '+scene)
}
assert(stage.includes('scrub: .55'),'Scrub was modified')
assert(stage.includes('maskPixels = 1 + 3.45 * diagonal * growth'),'Watercolor opening geometry was modified')
assert(stage.includes('quietScene ? 1.90 : 2.25'),'Only last two reveals may open slightly earlier')
assert(css.includes('mask-position:calc(50% + 4vw) 50% !important'),'Desktop art-focused aperture missing')
assert(stage.includes('const glimpse = ease((blend - .43) / .11) * (1 - ease((blend - .66) / .12))'),'Chapter title timing changed')
console.log('FINAL V10: only feast/closing edge contrast, unchanged normalized timing/mask/title, balanced scroll distance PASS')
