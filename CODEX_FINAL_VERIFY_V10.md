# Codex — final merge/build/QA instruction

The attached package is the V10 final candidate, not an invitation for more creative changes.

1. Read `FINAL_LOCK_V10.md` before older files. Keep the existing workspace as source of truth and merge ONLY modified source files when using the targeted patch; use the full ZIP for a clean standalone run.
2. Preserve six chapters, approved paintings, Telugu verses, all exact event details, chapter-title glimpse, CSS sticky stage, corner petals, bell/vine motion, and the user-uploaded Achyutam Keshavam MP3. Do not regenerate imagery or rewrite content.
3. Verify the underlying V9 bug is gone: `.meal-inset` and `.closing-inset` must NOT make their paintings disappear together with the body copy; the watercolor opening must reveal the artwork while the title is centered. Preserve the ceremony illustration behind the feast transition.
4. Preserve the *limited* quiet-scene emphasis and **5800px desktop / 4200px mobile** runways with the existing normalized chapter beats.
5. Run `npm ci`, `npm run check`, and `npm run build`; fix errors but do not silently change creative behavior.
6. Use the actual running React site in a browser at 1440×900, 1714×900, 1366×768, 390×844, 375×667, and 320×568. Test all five chapter handoffs in both directions, screenshot 18/35/53/71/88/100% for the last two, and verify no overflow, blank screen, text clipping, browser-toolbar snap or unexpected scene motion. Verify audio play/pause and reduced-motion reading mode.
7. Deliver a final build, URL, focused QA results and any genuine blockers. Do not start another redesign iteration or alter locked artwork/content.
