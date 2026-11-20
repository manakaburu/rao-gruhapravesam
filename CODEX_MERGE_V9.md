# Codex — Apply V9 without regression

Use the current running Rao Gruhapravesam project as the integration target. Extract the attached patch and read `V9_RELEASE_NOTES.md` completely. Back up current modified files, diff them against the patch, and merge only the V9 changes:

- `src/components/CinematicStage.tsx`
- `src/components/InvitationMusic.tsx`
- `src/styles/invitation.css`
- `public/assets/watercolor-mask-clarity.png` (new)
- `scripts/check-story-pacing.mjs`
- `scripts/check-release-v4.mjs`

Keep every other newer unrelated file as-is. No changes to the source-locked content, original illustrations, ceremony details, footer/actions, six chapters, music file bytes, or 6200px/4400px runways.

Run `npm ci`, `npm run check`, `npm run build`, and start the real React site; test all FIVE watercolor transitions in both directions at 1440x900, 1714x900, 390x844, and 375x667. Look for a clear, solid incoming painting through an organic watercolor opening (rather than muddied double-exposure), a brief centered title, and no black ring, jarring white veil, layout shifts, clipping, or horizontal overflow. Confirm continuous corner petals, bell/leaf sway, and fixed positions of master paintings. Verify reduced-motion mode and keyboard navigation.

Confirm the user-supplied Achyutam Keshavam MP3 attempts audible autoplay at load and, where blocked by browser policy, starts on first permitted user gesture and pauses/resumes correctly. Browser policy must be respected, not bypassed. Capture transition start/mid/end screenshots, an iPhone recording, and the build output; fix any regressions before reporting success.
