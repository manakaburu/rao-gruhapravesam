import { gsap } from 'gsap'

const ease = gsap.parseEase('sine.inOut')

function ramp(progress: number, start: number, end: number) {
  return ease(Math.max(0, Math.min(1, (progress - start) / (end - start))))
}

// Sample the same curves in either scroll direction. Only the paper and pigment
// strengths vary by illustration, never the timing or the opacity of the artwork.
export function watercolorAt(progress: number) {
  return {
    aperture: progress * (.27 + .73 * progress),
    pigment: ramp(progress, 0, .18) * (1 - ramp(progress, .76, 1)),
    cue: ramp(progress, .35, .45) * (1 - ramp(progress, .60, .75)),
    heading: ramp(progress, .78, .96),
    body: ramp(progress, .88, 1),
    departingHeading: 1 - ramp(progress, 0, .20),
    departingBody: 1 - ramp(progress, 0, .26),
  }
}
