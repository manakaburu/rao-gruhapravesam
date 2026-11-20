# Release 4 QA — source and browser-based verification (2026-11-19)

## Verified in the current environment

- TypeScript: `tsc --noEmit` **PASS**.
- Content / calendars / approved artwork checks from project: **PASS**.
- Stage pacing source guard: six chapters / five long masks / desktop-only pin guard **PASS**.
- New release source guard: static paintings, title-first fade logic, continuous falling leaves, local audio asset **PASS**.
- Chromium mounted the **actual transpiled React component source** using a dedicated module harness (not Vite) at 1440×900, 390×844, 375×667 and 430×932, without JavaScript errors.
- 1440×900 desktop: pinned stage length **11,250 CSS px**, five transition midpoint screenshots, reverse scroll to opening, full-width checks **PASS**.
- All five transitions: incoming title leads supporting verse text; incoming painting rectangle stays at fixed coordinates at multiple progress samples; texture mask visible on the incoming painting.
- Falling leaves CSS transforms change while `scrollY` remains unchanged: **PASS**.
- Click-to-play/click-to-pause for original MP3 verified through Chromium, initially off: **PASS**.
- 390, 375 and 430px mobile: `story-fallback` (native scroll), no horizontal overflow, complete banana leaf artwork `object-fit:contain`, no chapter pin toggling when browser viewport height changes; browser errors absent: **PASS**.
- 1366×768 desktop: compact/pinned mode, no overflow: **PASS**.
- Reduced motion 1440×900: normal reading flow and falling leaves hidden: **PASS**.
- Original audio verified by ffprobe: 67.44 seconds, 24 kHz, stereo MP3. Locally included, not remotely fetched.

## Important caveats, not claims of success

- Native Vite build could **not** complete in this offline Linux environment because the supplied cached `node_modules` includes Windows-only Rollup bindings (`@rollup/rollup-linux-x64-gnu` missing). Run `npm ci`, `npm run check`, `npm run build` on the user's connected Windows machine; the source ZIP deliberately excludes `node_modules`.
- The controlled Chromium harness executes current React/TypeScript components and CSS but is not a substitute for QA of the native Vite-built production bundle.
- No physical iPhone Safari/Brave run is available here. Native toolbar interaction must be checked on the user's device.
- Commercial A. Kanya Kumari / SoundCloud audio is **not** included: bundled soundtrack is a new original composition as disclosed in `AUDIO_LICENSE.md`.
- The new artwork for blessings, ceremonies, feast and closing remains subject to family approval; the entrance and interior originals are preserved unchanged.

## Specific regression protection

1. Do not reintroduce CSS or JS transforms that shift the six paintings. The pinned fade should animate opacity and watercolor masks, not image positions.
2. Keep `.spread.revealing` unmasked but mask `.spread.revealing .plate` only, allowing the new chapter heading to appear ahead of the rest of its painting/content.
3. Leave the `FallingLeaves` component outside `CinematicStage`'s repeated chapter tree; its animation is independent of scroll state.
4. Keep GSAP pinned mode desktop-only to prevent pin-spacer jumps on mobile browser toolbar resize.
5. Keep a single local audio instance, explicit tap-to-play and no hidden autoplay.
