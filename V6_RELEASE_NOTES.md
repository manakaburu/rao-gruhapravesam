# Rao Gruhapravesam — V6 Full-Stage Watercolor Release

**This handoff is a targeted update of the provided V5 source. Do not restart or redesign the website.**

## Changes made

1. **Full-stage painterly overlay.** `WatercolorTransition` moved from inside `.spreads` to the `.stage` root. The overlay therefore covers the complete pinned story viewport, including the bottom progress rail, not only the image. Its soft pigment texture zooms from 0.78× to 2.68× and fades from 0 to 0.62 to 0 as the user scrolls forward; scrolling backward reverses the effect. No timers or video required.
2. **Shorter story distance without abrupt transitions.** Desktop runway reduced from 11,250 to **6,200 scroll pixels**, mobile from 7,200 to **4,400**. Five paint transitions each occupy **13% of story progress** (806px desktop / 572px mobile), with ~310px (desktop) / 220px (mobile) reading holds. The first transition begins after ~310 desktop pixels, rather than waiting for most of a viewport-plus section. GSAP scroll smoothing changes from 0.9s to 0.55s.
3. **Whole-composition dissolve.** The old artwork-only expanding mask is superseded by a global watercolor veil with balanced incoming/outgoing art opacity. Incoming section **title appears before its description**, as before, while the veil blooms across the entire scene.
4. **Bundled user MP3.** `public/audio/achyutam-keshavam-user-upload.mp3` is the exact MP3 the user attached, ~4m29s (not the previously sought Mahaganapathim violin recording). The persistent player now selects this single local MP3. Browser autoplay is attempted, and the on-screen button remains available where autoplay is blocked.
5. **No other creative changes.** Six chapters, approved art, fixed art positions, corner-only leaves, bell/vine sway, Telugu poetry, dates, event times, and calendar events were preserved.

## Modified files

- `src/components/CinematicStage.tsx`
- `src/components/WatercolorTransition.tsx`
- `src/components/InvitationMusic.tsx`
- `src/data/chapters.ts`
- `src/styles/invitation.css`
- `public/audio/achyutam-keshavam-user-upload.mp3` (added)
- `scripts/check-story-pacing.mjs`, `scripts/check-release-v4.mjs`, `scripts/check-mobile-mode.mjs` (updated assertions for intentional V6 changes)
- `V6_RELEASE_NOTES.md`, `CODEX_APPLY_V6.md`, `qa/V6_QA_REPORT.md` (added)

## Verification status

**Passed:** `npm run check`: TypeScript, original artwork checksums, locked events/calendar validation, V6 motion guards, mobile scroll guards, and MP3-presence check. Audio decoded by ffprobe (269.43s, 8,621,662 bytes). Also, a self-contained Chromium visual harness based on the project's real CSS and art passed at **1440×900, 1714×900, 390×844, 375×667**: all five full-stage overlay midpoints, stationary art (0px deviation), title preceding body, zoom growth, no horizontal overflow, and zero JavaScript errors.

**Not passed / not claimed:** The full production Vite build. The available dependency snapshot is Windows-native; this Linux container lacks `@rollup/rollup-linux-x64-gnu` and network installation was not available. The visual harness is **not** the full compiled React application. The final merge must run `npm ci`, `npm run check`, `npm run build` and real-browser desktop/mobile QA in Codex's environment before deployment. Physical Safari testing is still needed. Do not claim browsers can guarantee unmuted autoplay.

## Launch (with a clean Node install)

```
npm ci
npm run check
npm run build
npm run dev -- --host 0.0.0.0 --port 5173
```

Visit `http://localhost:5173/`, with `?reading=1` available for a motion-free reading mode.

## Rights

The soundtrack is user-supplied, not composed by the assistant. The user must confirm the right to redistribute it publicly before GitHub Pages deployment. The presence of an uploaded MP3 is not itself licensing proof.
