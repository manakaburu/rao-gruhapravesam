> **V5 supersession:** `RELEASE_V5.md` and the current code take priority over historical mobile-scrolling/music restrictions below.

# Mobile scroll stability + official SoundCloud player (2026-11-19)

## Input basis
- V3 source package: RAO_GRUHAPRAVESAM_V3_CODEX_SOURCE.zip.
- User recording: iPhone Brave/Chromium-like browser, toolbar collapse/expand while scrolling.
- The recording shows the page jumping between vertically stacked chapters and pinned stage.
- User-supplied listening URL: https://on.soundcloud.com/IvtYd6FMUED9tsBkhW (exact target cannot be verified by this offline build environment).

## Root cause
Previously `fit()` re-evaluated mobile `window.innerHeight`, chapter fit, and CSS `min-height` media matching on every `window.resize` and ResizeObserver update. Mobile browser chrome changes the viewport during scrolling. Consequently the GSAP ScrollTrigger pin is killed/rebuilt mid-gesture, causing visible jump and chapter continuity loss.

## Fix
- `CinematicStage.tsx`: GSAP pinning now requires a fine pointer, hover, min-width 901px, min-height 680px and non-reduced motion. All touch/mobile widths use a stable natural reading flow with one-time IntersectionObserver reveals; resizing toolbar height cannot switch into or out of pinned mode. Desktop art/timelines unchanged.
- `invitation.css`: mobile fallback uses natural document layout without clipping or pin spacers; gentle once-only opacity/translate reveals and no exaggerated shift.
- `SoundCloudMusic.tsx`: persistent official SoundCloud oEmbed player panel on explicit tap, no autoplay; parses only `w.soundcloud.com/player/` iframe URLs from SoundCloud oEmbed. On unsupported embed/short link/CORS failure it offers the supplied link directly. Never scrape or copy copyrighted audio.
- `AGENTS.md`, `docs/CONTENT_LOCK.json`: permit this requested optional music feature while prohibiting autoplay/rehosting.

## Compatibility and outstanding dependency
Short URLs at `on.soundcloud.com` sometimes fail with SoundCloud oEmbed, and SoundCloud can disallow player embedding. In that case the app opens the supplied SoundCloud page rather than inventing a working player. For guaranteed in-page playback, obtain the official iframe embed code or canonical long-form SoundCloud track URL using SoundCloud Share > Embed, then configure it; do not rip the track.

## Mandatory Codex integration checks
1. Merge this source with the current workspace; do not add a second player if the workspace already has music UI. Replace existing music controls with the tested `SoundCloudMusic` integration or retain a newer authorized equivalent.
2. Run npm ci, npm run check, npm run build.
3. iPhone Brave and Safari: continuously scroll while browser bars collapse/expand; no pin-spacer and no scene jumps. Test 390x844 and 375x667, then rotate.
4. Desktop 1440x900/1366x768: the original GSAP pinned watercolor storytelling must remain active and reversible.
5. Confirm music button does not autoplay; official player appears if SoundCloud allows embedding. Test track identity, playback, and fallback link; no falsely claimed music state.
6. Check six chapters, event content, Telugu, 4:3 feast art, navigation links, calendar, mobile accessibility, and reduced motion.
