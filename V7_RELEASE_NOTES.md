# V7 — Organic Paper-Burn Chapter Reveal

## Scope: a targeted transition replacement, NOT a redesign

Built on the user's exact uploaded V6 project. The six chapters, source-locked facts,
artwork, audio, responsive stage, scroll distances (6,200px desktop / 4,400px mobile),
corner petals, bell/vine ambient motion, venue, calendar and sharing actions are unchanged.

## New chapter change

1. The current chapter remains anchored in the pinned viewport.
2. An irregular opening, initially only about 9–16 CSS pixels in radius,
   exposes the next **entire** painted scene.
3. The opening expands organically with the existing GSAP scroll progress.
   Its rim uses a warm, thin singed-paper edge. No real fire or additional images.
4. Once the opening is large enough, the title of the NEXT chapter briefly
   appears centered within the stage, then fades away.
5. The actual incoming chapter heading appears after the centered glimpse;
   supporting text follows. The transition is reversible when scrolling backwards.
6. At the end of the transition, the incoming spread is fully visible,
   unmasked, and the decorative rim is hidden.

## Implementation

- `src/components/CinematicStage.tsx` — one source of progress (existing GSAP
  playhead), deterministic aperture geometry, temporary title choreography,
  resize-safe cached stage geometry. No additional scroll listeners or timers.
- `src/components/WatercolorTransition.tsx` — decorative SVG rim and centered
  chapter-title element. Overlay is aria-hidden and never receives pointer events.
- `src/styles/invitation.css` — appended small V7 override for the portal,
  preserving all earlier layout and animation behavior.
- `scripts/check-story-pacing.mjs` and `scripts/check-release-v4.mjs` — replaced
  V6 overlay-specific assertions with V7 aperture invariants. Other assertions
  for stationary paintings, content, audio, leaves and responsive pinning remain.

## Verification performed

- `npm run check` PASS (TypeScript, artwork SHA-256, ceremony/calendar lock,
  scroll-beat guards, mobile guards, release source checks).
- Chromium component/geometry harness: 1440×900, 390×844, 375×667 PASS for
  aperture geometry, center-title-before-normal-heading sequence, no horizontal
  overflow, no page errors, and deterministic forward/backward animation states.
- Existing audio, paintings, dates and venue files unchanged byte-for-byte.
- Native Vite build NOT verified in this environment: the archived dependencies
  lack `@rollup/rollup-linux-x64-gnu`; Codex/local must run a fresh `npm ci`.
- The browser harness is not the complete React application. Run real app QA
  in Chromium + iPhone before production deployment.

## Local run and release gate

```bash
npm ci
npm run check
npm run build
npm run dev -- --host 0.0.0.0 --port 5173
```

Check all five transitions at their beginning, centered-title moment and end,
reverse through them, ensure the entrance and other paintings never move, and
validate mobile browser-toolbar expansion/collapse, audio, keyboard navigation,
reduced motion and direct event-details access. Do not alter any locked facts.
