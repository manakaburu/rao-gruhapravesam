import { gsap } from 'gsap'

const ease = gsap.parseEase('sine.inOut')

function ramp(progress: number, start: number, end: number) {
  return ease(Math.max(0, Math.min(1, (progress - start) / (end - start))))
}

// Sample the same curves in either scroll direction. Only the paper and pigment
// strengths vary by illustration, never the timing or the opacity of the artwork.
//
// V12: no separate title card. The incoming chapter itself is the reveal —
// its painting opens with the bloom and its own words surface inside it:
//   0–.16   outgoing body, then outgoing heading, fade away
//   .22–.50 the incoming heading surfaces as the watercolor spreads over it
//   .34–.66 its body copy follows, settled well before the wash completes
export function watercolorAt(progress: number) {
  return {
    aperture: progress * (.27 + .73 * progress),
    pigment: ramp(progress, 0, .18) * (1 - ramp(progress, .76, 1)),
    heading: ramp(progress, .22, .50),
    body: ramp(progress, .34, .66),
    departingHeading: 1 - ramp(progress, .02, .16),
    departingBody: 1 - ramp(progress, 0, .12),
  }
}
