import { gsap } from 'gsap'

const ease = gsap.parseEase('sine.inOut')

function ramp(progress: number, start: number, end: number) {
  return ease(Math.max(0, Math.min(1, (progress - start) / (end - start))))
}

/** Where the mid-wash chapter card lives within each reveal (0–1 of the wash). */
export const CARD_WINDOW = { start: .18, end: .72 } as const

// Sample the same curves in either scroll direction. Only the paper and pigment
// strengths vary by illustration, never the timing or the opacity of the artwork.
//
// One continuous, staggered sequence — no dead gaps:
//   0–.16   outgoing body, then outgoing heading, fade away
//   .18–.34 the parchment bloom opens and the chapter name arrives
//   .23–.36 its number and floral rule follow
//   .34–.58 card holds (about a quarter of the wash) while the painting opens
//   .58–.72 card dissolves (details first)
//   .72–.88 the chapter's own heading arrives …
//   .80–.97 … followed by its body copy, settled before the reading hold.
export function watercolorAt(progress: number) {
  return {
    aperture: progress * (.27 + .73 * progress),
    pigment: ramp(progress, 0, .18) * (1 - ramp(progress, .76, 1)),
    cue: ramp(progress, .18, .34) * (1 - ramp(progress, .58, .72)),
    cueDetail: ramp(progress, .23, .36) * (1 - ramp(progress, .56, .68)),
    heading: ramp(progress, .72, .88),
    body: ramp(progress, .80, .97),
    departingHeading: 1 - ramp(progress, .02, .16),
    departingBody: 1 - ramp(progress, 0, .12),
  }
}
