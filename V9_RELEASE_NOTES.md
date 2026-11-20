# Rao Gruhapravesam — V9, visual clarity + audio autoplay fallback

## Scope (targeted changes only)

V9 uses V8 as its exact code/art/content baseline. It changes **only** the chapter reveal mask/timing and the local music start behavior. It does not redesign scenes, change the six-beat scroll map, modify master art, alter ceremony text, or add new UI sections.

### Why V8 looked muddy

The original 512x512 watercolor-mask.png had a broad semi-transparent fringe. During the expanding reveal, old and new paintings were visible together across too much of the viewport. Its smoothstep mask expansion also filled the stage too early, weakening the sensation of a painting replacing another painting.

### Revised transition

- `public/assets/watercolor-mask-clarity.png`: derived from the original alpha texture with a **solid center and much narrower organic feather**. The original mask file remains unchanged.
- `src/components/CinematicStage.tsx`: scroll-driven, reversible mask size follows `3.45 * diagonal * smoothstep(blend)^2.25`. The new scene becomes completely readable inside the watercolor opening without an opaque screen-wide mist or a sharp/burnt circle. Original chapters remain stationary.
- Centered chapter title now appears once the opening is visibly large (about 43–78% of transition) and clears before the chapter heading/body reveal, which remain at the V8 thresholds.
- `src/styles/invitation.css`: targeted override selects the higher-contrast alpha matte and adds a restrained, transparent parchment bloom under the fleeting title only; no full-screen colored veil.

### Music

- The existing `public/audio/achyutam-keshavam-user-upload.mp3` is preserved **byte-for-byte** and remains the selected audio. This is the track uploaded by the user, NOT the separately discussed Mahaganapathim recording.
- The player immediately attempts `sound.play()` on load. If the browser blocks audible autoplay, it tries again **synchronously** on the first normal pointer/touch/keyboard interaction outside the music control. A clear play/pause button remains available.
- Browser security policy means audible sound **cannot be guaranteed before the first user interaction** on iPhone Safari and similar browsers. Do not claim otherwise or attempt to bypass the browser policy.

## Regression checks run here

1. `npm run check`: TypeScript, original art hash, content/calendar, story pacing, sticky/mobile and release checks — PASS.
2. `python qa/V9_REGRESSION_TEST.py`: exact project CSS + illustration assets in headless Chromium at 1440x900, 390x844, 375x667. Checks forward and reverse scrub progress, title glimpse, stable art coordinates, console errors, and horizontal overflow — PASS.
3. `python qa/v9_browser_preview.py`: eight screenshots per size and contact sheets — PASS.
4. `ffprobe`: user MP3 codec `mp3`, 44.1kHz stereo, ~269.4 seconds — PASS.

**Not verified in this container:** a fresh native Vite production build and a physical iPhone audible-autoplay test (archived dependencies lack Linux-native Rollup binaries). Run `npm ci && npm run check && npm run build` in the working Codex environment and check iPhone behavior by opening the page and scrolling once.

## Guardrails

- Do not modify `docs/CONTENT_LOCK.json`, `src/data/chapters.ts` or the original user-approved `entrance` and `interior` illustration bytes.
- Do not add door animation, RSVP, guestbook, or extra scenes.
- Do not relabel the existing MP3 as Mahaganapathim.
- Preserve the existing 6200 desktop / 4400 mobile scroll runways and sticky stage architecture.
- If adjusting the reveal further, tune only the matte alpha remapping, expansion exponent, and centered-title window; do not change the whole app.
