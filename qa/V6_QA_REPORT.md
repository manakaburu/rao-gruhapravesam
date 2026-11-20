# V6 Targeted QA

- **Source checks:** `npm run check` passed (TS, artwork, event/calendar, pacing, sticky/mobile, uploaded audio).
- **User audio:** Exact attached MP3 copied locally to `public/audio/achyutam-keshavam-user-upload.mp3`; `ffprobe` duration **269.426938 s**, size **8,621,662 bytes**.
- **Isolated Chromium DOM/CSS harness:** At 1440×900, 1714×900, 390×844, and 375×667: full-stage overlay matches stage rectangle at all 5 transitions; zoom grows at 15/50/85%; title becomes visible before descriptive body; paintings stay still at 0px deviation through first transition; no horizontal overflow; CSS sticky physically held the stage at the header across scroll in all four viewports; zero JS errors. See `qa/visual_v6/HARNESS_RESULTS.json` and screenshots.
- **Limitations:** This harness loads actual V6 CSS and artwork and mirrors the transition math, but it is **not** the built React application. The managed browser blocked localhost navigation, and the native Vite build is blocked by Windows-only archived Rollup optional dependencies on Linux. Physical mobile Safari and deployed behavior not verified here.
- **Next target-environment gate:** `npm ci && npm run check && npm run build`; manually QA all 6 scenes plus 5 midpoint screenshots and both scroll directions. Test audio on click and best-effort autoplay error state.
