import { strict as assert } from 'node:assert'
import { readFileSync, statSync } from 'node:fs'
import { createHash } from 'node:crypto'
const src=f=>readFileSync(new URL('../'+f,import.meta.url),'utf8')
const stage=src('src/components/CinematicStage.tsx')
const css=src('src/styles/invitation.css')
const leaves=src('src/components/FallingLeaves.tsx')
const music=src('src/components/InvitationMusic.tsx')
const main=src('src/main.tsx')
const incoming=src('src/components/WatercolorTransition.tsx')
assert(stage.includes("section.style.setProperty('--title-opacity'"), 'Title-first fades missing')
for (const key of ["'--art-x'", "'--art-y'", "'--art-scale'"]) {
  assert(!stage.includes(`section.style.setProperty(${key}`),'Moving master paintings regression: '+key)
}
assert(incoming.includes('watercolor-chapter-reveal') && !incoming.includes('chapter-portal__rim'), 'Soft watercolor overlay missing or burnt rim remains')
assert(css.includes('scale:1 !important'), 'Static painting override missing')
assert(css.includes('@keyframes rao-leaf-fall')&&leaves.includes('FallingLeaves'), 'Independent, continuous leaves missing')
const positions=[...leaves.matchAll(/x: (\d+)/g)].map(m=>Number(m[1]))
assert(positions.length>=6 && positions.every(x=>x<=10||x>=90),'Leaves must remain at edges')
assert(main.includes('<FallingLeaves />'), 'Persistent leaves not mounted')
assert(music.includes('await sound.play()') && music.includes('preload="none"'), 'Tap/autoplay audio flow missing')
assert(music.includes('achyutam-keshavam-user-upload.mp3'), 'User-selected track source missing')
const file=new URL('../public/audio/achyutam-keshavam-user-upload.mp3',import.meta.url)
assert(statSync(file).size>8000000,'Complete uploaded audio missing')
assert(music.includes('startOnGesture') && music.includes('startPlayback()'), 'Automatic audio gesture fallback missing')
console.log('V9 regression: art static, crisp full-stage reveal, corner leaves and original user MP3 with gesture fallback PASS')
