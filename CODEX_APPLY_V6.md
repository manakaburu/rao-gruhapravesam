# Codex — Integrate V6 Without Regressions

1. Back up the current project. Extract the provided V6 archive and compare the changed files listed in `V6_RELEASE_NOTES.md` with the live workspace. Merge only those changes; preserve newer unrelated improvements.
2. Do not revert the new **whole-stage** veil to image-only masking. `WatercolorTransition` must remain a direct child of `.stage`, outside `.spreads` and beside `.stage-foot`. The new V6 rules at the end of `src/styles/invitation.css` supersede old mask rules.
3. Maintain the balanced pacing table in `src/data/chapters.ts`, 6,200px desktop / 4,400px mobile runway, and GSAP scrub 0.55. Readable holds still matter; do not collapse these into instant fades.
4. Keep all original paintings stationary. Do not add scale/translate to `.plate`; only the **overlay** zooms. Do not alter corner-only leaves or ambient bell/vine sway.
5. Use `public/audio/achyutam-keshavam-user-upload.mp3` (bundled). Keep pause/play, fade-in/out, looping and autoplay rejection handling. Never mislabel this recording as Mahaganapathim violin.
6. Preserve the six-scene order, all Telugu text, original family and venue details, and event times in `docs/CONTENT_LOCK.json`; no RSVP or guestbook.
7. Run `npm ci`, `npm run check`, `npm run build` on the target OS. Serve the **actual React app**; test at desktop 1440×900, short desktop 1366×768, iPhone 390×844 and 375×667. Verify five transitions forward and backward, touch-browser bar changes, fixed art, center/edges of full-stage veil, readable titles, feast without cropping, audio tap, and `?reading=1`. Capture real app screenshots and a scrolling recording.
8. Fix actual regressions before replying, and report which checks truly passed. Ensure the final playback URL is correct. Do not promise unrestricted autoplay or public music licensing.
