> **V5 active note:** The latest cinematic stage is CSS `position:sticky`
> across desktop and normal mobile viewports; GSAP controls scroll progress
> but never adds a dynamic pin spacer. Do not enable the historical
> desktop-only gate or the ordinary mobile stacked layout except when reading
> mode or reduced motion is explicitly selected. Artwork never translates.
> Corner petals animate independently; bells and vines sway gently.

# Motion choreography specification — cinematic watercolor, not a mechanical door

## Core principle
The **camera** remains nearly stationary while illustrated scene layers and narrative text transform under user-controlled native scroll. It's **scroll-driven**, not scroll-jacking. The user should not feel a long webpage flying by. Motion references: Apple product-scroll polish and illustrated-story reveal cadence. NOT a new illustration style, and NOT a demand for WebGL or 3D.

## Timeline and topology
- One pinned stage for six scenes, with a configurable segment list per scene; five transitions. Existing `CinematicStage.tsx` is Phase 1 baseline only, extend it data-first.
- Each chapter has an **arrival → reading hold → departure**, with content opacity never reduced while guest is supposed to read event details.
- Initial suggested normalized proportions (tune after recording, not rigid): entrance 0–12%, entrance→interior 12–18%, interior 18–30%, interior→blessings 30–36%, blessings 36–48%, blessings→ceremonies 48–54%, ceremonies 54–70%, ceremonies→feast 70–76%, feast 76–87%, feast→closing 87–93%, closing 93–100%. The exact values may shift to maintain accessible dwell time.
- Desktop scroll travel around 7–9 `100dvh` lengths; mobile around 8–10. Avoid unnecessarily 20+ long scrolls. No `ScrollTrigger.snap` or auto-advance; scroll backward is a perfect logical inverse of forward.
- `scrub: true` or ~0.35–0.65s smoothing, but no ghosting/delays on fast reverse. `invalidateOnRefresh:true`, `ScrollTrigger.matchMedia` or `gsap.matchMedia`, proper cleanup and responsive refresh. Avoid layout thrashing every tick. Pin boundary must release without jumps.

## The signature watercolor conceal–reveal
The original cinematic treatment is restored across all six chapters: the outgoing scene remains fully opaque behind the incoming one, whose entire page is **revealed through an expanding organic watercolor alpha-mask** (`watercolor-mask.png`). At 50% transition the pigment edge exposes only part of the incoming page; by the end the incoming page is fully visible. A low-opacity sandalwood atmospheric glow supports the seam, but never covers the viewport with opaque parchment or hard-switches the scene. Keep both images opaque within their own boundaries—no ghostly double peacocks or translucent door on the sofa. Scrub reversal must recover the exact same mask geometry. No live Gaussian blur/WebGL and no forced scroll.

## Parallax: real vs fake depth
- Real: independently supplied botanical crop overlays, floral ornaments, printed wave/ink edge, corner leaves, light glows. Translate each only a few percent of viewport; tiny slow rotations/sways. Two or three depth planes maximum on low-power mobile.
- Fake: no stretching the original flattened peacock or moving a cropped duplicate at its original location, no rotating floor muggu, no separate moving deity. Keep source master pixels unedited; overlay non-destructively, and only where it doesn't result in obvious doubling.
- Easing: natural ease in/out during ornament arrivals; scene scrub values linked deterministically to timeline; avoid bouncy cartoon springs.

## Scene-by-scene emotional beat
1. Entrance: still wonder, floral arrival, slow muggu halo illumination (not floor rotation).
2. Welcome: warm interior resolves, poem soft entrance.
3. Venkateswara: quiet respectful stillness, subtle lamp glow and warm washed parchment.
4. Ceremonies: crisp stable times and icons stagger in; no text motion while holding.
5. Feast: charming banana-leaf painted accents and slightly livelier reveal, no dancing food.
6. Closing: deep pause, invitation resolves, buttons become obvious. No vanishing UI under user finger.

## Mobile and fallback
- Size minimum: 320 CSS px; matrix: 375×667, 390×844, 768×1024, 1440×900. Use dynamic viewport units but account for browser chrome, notch safe area and rotated screen.
- If CSS masks unsupported or `prefers-reduced-motion: reduce`, show all six scene sections in simple DOM flow with no pinned spacers and no hidden text; section imagery can be cropped normally. For extremely constrained accessibility/zoom use cases, preserve an explicit reading-mode escape route.
- All interactive links keyboard accessible at any time; skip-story link must actually jump out of pin smoothly and focus detail region. Use pointer-safe layers (`pointer-events:none` for decorative masks) and do not block native scroll.

## Measurable performance objectives (targets, not falsified guarantees)
- No console errors, blank layers, layout jumps or horizontal overflow.
- Primary entrance WebP ~550 KB; remaining critical imagery can preload just ahead. Aim for first viewport asset transfers ~1.5 MB (fonts may raise it). Avoid fetching all PNG fallbacks where modern WebP is supported.
- Smooth scrub on contemporary mobile as tested; do not claim 60 fps on devices you haven't measured. Prefer image masks/opacity/transform on GPU; minimal `will-change` to active layers only.
- Reduced motion has equivalent text and controls. All text in DOM and readable at 200% zoom or normal flow. Tappable buttons ~44×44 px.


## 2026-11-18 pacing and art-size calibration (supersedes older percentage examples)

- Source of truth for exact beats: `src/data/chapters.ts` / `STORY_BEATS`.
- Each of the five painterly bridges occupies about 9.6–10.4% of total story scroll, rather than the old 6%.
- Total scroll: `max(window.innerHeight * 12.5, 9800px)`; at 900px desktop height the bridges span ~1.1k physical scroll pixels.
- ScrollTrigger scrub is 0.9 seconds for gentle catch-up; no autoplay, no scroll hijack, no snap.
- Reading holds remain long enough for the Telugu poetry and ceremony times.
- Desktop >1180px and >800px: entrance and welcome plates gain up to 1.25vw, blessings cap 51rem, ceremony art scales toward 27vw, feast cap 43rem, closing frame 29rem.
- Mobile, short-height viewport, reduced-motion, full 4:3 feast, event data and original illustrations remain unchanged.
- Do not accelerate transitions by shrinking gaps or using GSAP `.to(..., duration)` independent of scrolling.


## Final V10 pacing override (19 November 2026)
The authoritative scroll runways are **5800px desktop** and **4200px mobile** with the existing normalized `STORY_BEATS`; five watercolor bridges are approximately 754px desktop and 546px mobile. Earlier numeric examples in this document are historical. Only feast and closing openings receive additional contrast and slightly earlier art-focused mask growth. Details: `FINAL_LOCK_V10.md`.
