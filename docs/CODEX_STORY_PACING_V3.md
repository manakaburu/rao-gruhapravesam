# Rao Family — Cinematic pacing V3: regression-safe handoff

## Scope
This update starts from the **latest `outputs.zip`** project, not an earlier storybook prototype. It changes only six-chapter scroll choreography and desktop picture sizing. All invitation copy, dates, ceremony names, calendars, approved art, and scene components are retained.

## Root-cause evidence
- Old chapter gaps: ~6% each; at a 900px viewport with an 8.8 × viewport stage, the transitions occupied approximately 475px of user scroll.
- New chapter gaps: 9.55–10.38% each; at a 900px viewport with a 12.5 × viewport stage, a bridge occupies approximately 1,075–1,168px of scroll. This is about 2.3× the former distance and remains reversible.
- Scrub changed from 0.55 to 0.9 (seconds of easing to the current scroll position), without autoplay, snapping, or scroll hijacking.
- Incoming paint retains the original full-stage alpha mask and scene depth. Outgoing illustration now fades quadratically (`--scene-leave²`) to avoid double-exposure of competing room/door imagery. The user can still scroll backwards through the exact reverse sequence.
- Desktop photograph treatment remains 4:3 and `object-fit:contain`, preserving the entire Vindu Bhojanam banana leaf and decorations.

## Desktop picture adjustments (minimum 1180 × 801)
- Entrance/welcome: plate increases from ~894px to ~915px at 1714×900, still inside the safe visual stage.
- Blessings: max illustration width from 47rem (752px) to 51rem (816px), deity remains stationary.
- Ceremonies: from ~400px to ~463px wide at 1714×900. Specific tighter chapter padding prevents the taller image from pushing the pinned stage out of height.
- Feast: from ~640px to ~688px wide; whole image is visible.
- Closing artwork/address: from 416px to ~464px wide; live readable address stays over its frame.

## This was tested (browser using the patched bundled preview, not a fresh Vite build)
- 1714×900: pinned stage on, zero horizontal overflow, six chapters accessible; 5 watercolor midpoints visible and reverse scroll returned to entrance; no JS page errors.
- 1440×900 and 1366×768: pinned stage on, zero horizontal overflow.
- 390×844: pinned story enabled, full feast visible, zero horizontal overflow.
- 375×667: regular reading fallback (intended), six chapters visible, zero horizontal overflow.
- Original entrance and interior artwork hash checks pass, invitation content and calendar checks pass.

## No-regression acceptance test for Codex
1. `npm ci && npm run check && npm run build`.
2. At 1714×900, 1440×900, 1366×768 and 390×844, verify `.stage.is-cinematic`; at 375×667, `.stage.story-fallback` is valid.
3. Capture five mid-transition screenshots at 1714×900 and a full forward/reverse scroll recording. Each should show a gradual watercolor dissolve instead of a hard chapter switch.
4. Verify no image clipping, no overlapping ceremony text, no horizontal scroll, and all six live Telugu verses remain legible.
5. Never change `src/data/invitation.ts`, `docs/CONTENT_LOCK.json`, any calendar files, images, or temple scene to accomplish these adjustments.
6. If a new layout pushes a chapter past the pinned height, reduce its artwork and/or padding _only on that viewport_, do not remove the pinned story globally.

## Known limitation
The source archive carries Windows-specific optional Rollup native modules, so a clean Linux production build was not possible without fresh `npm ci`. The visual QA used the corresponding existing production bundle updated with the exact timing/CSS values. Codex must rebuild in its environment.
