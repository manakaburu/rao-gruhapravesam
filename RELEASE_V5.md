# Rao Gruhapravesam — Story Mode V5 targeted patch

## Why the scroll looked like a regular stacked web page

`CinematicStage.tsx` was switching off cinematic mode unless all of these were
true: desktop-width viewport, fine pointer, hover input, sufficiently tall
viewport, AND *every chapter's computed height* fit in the viewport. When any
condition failed it put six chapters in the normal document flow. A mobile
browser's changing toolbar height could also change that calculation.

## Changes (only what was requested)

1. **Cinematic storytelling on both desktop and mobile**: the six existing
   chapters are now an overlapping, scroll-scrubbed story in one stable
   `position: sticky` stage. Scroll distance advances the existing GSAP pigment
   dissolve; no GSAP pin spacers, no height-gated mode switching. Desktop story
   distance 11,250px; mobile 7,200px. Reading mode remains available via
   `?reading=1` and the chapter menu; prefers-reduced-motion remains a stacked
   accessible reading alternative.
2. **Corner-only falling petals/leaves**: all eight continuous CSS foliage
   particles start within 10% of the screen edges and only drift modestly.
   They are never coupled to scroll progress and never cover the main text.
3. **Gentle atmospheric 3D feel**: hand-drawn bell and vine overlays sway
   independently by 1–2 degrees. Deity and main paintings never move.
4. **Music integration**: check for an optionally supplied and licensed
   `public/audio/mahaganapathim-violin.mp3`; if unavailable, use the included
   ORIGINAL `rao-auspicious-welcome-original.mp3`. Request audible autoplay
   once, but offer an explicit tap-to-play control when blocked by browser
   policy. Never claim the original soundtrack is the A. Kanya Kumari recording.
5. **Unchanged**: all images, invitation details, Telugu lines, calendar data,
   WhatsApp and map functions, layouts, desktop art sizing and watercolor mask.

## Run

```sh
npm ci
npm run check
npm run dev -- --host 0.0.0.0 --port 5173
```

Visit `http://localhost:5173/` or (on the same Wi-Fi) the computer's LAN IP.

## Tests actually performed in this environment

- `tsc --noEmit`: **PASS** using the matching dependency types from an earlier
  user-provided archive.
- `npm run check`: **PASS**: four original art hashes, event content, calendar
  starts, long transition pacing, sticky story selectors, corner-only foliage,
  and audio source/fallback.
- Chromium layout harness with source CSS, identical narrative copy, and
  original painting files: **PASS** at 1440×900, 1714×900, 390×844, 375×667,
  320×568: all six scene groups fit within the pinned stage; no horizontal
  overflow; after scrolling 2500px the stage remained at the header baseline.
- Separate Chromium ambient-motion check: **PASS** leaf, bell and vine
  transforms continued to change with scrollY=0.

## Still required after integration

- A native `npm run build` on the user's machine. Linux Vite build in this
  container is unavailable because the archived dependencies include Windows
  Rollup/Esbuild native binaries and external package install is blocked.
- A running React/Vite browser E2E pass at the user's actual machine/browser.
  The Chromium checks above used a faithful static DOM/CSS harness, not a
  compiled or running React bundle.
- Physical iPhone validation with the browser toolbar expanding/collapsing.
- Autoplay: modern browsers commonly reject playback without a tap. This is a
  browser policy, not an implementation error.
- Exact commercial violin recording: **not bundled**. A free redistribution
  license for the A. Kanya Kumari master recording has not been verified.
  Put a properly licensed MP3 at the documented optional local path.
