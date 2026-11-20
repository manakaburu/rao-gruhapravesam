# Codex integration prompt — Story Mode V5

Continue in the EXISTING Rao Family Gruhapravesam project at localhost:5173.

The attached `RAO_GRUHAPRAVESAM_STICKY_STORY_V5.zip` is the complete updated
React/Vite source based on my latest uploaded ZIP. Read `RELEASE_V5.md` and
`public/audio/README_MAHAGANAPATHIM.md` first. Merge **only the intended V5
changes** (see list below) into the existing project, preserving any newer
unrelated work. Make a backup or commit before applying.

Files changed:
- `src/components/CinematicStage.tsx` — stable CSS-sticky cinematic runway,
  GSAP scroll-scrub without dynamic pin spacers or desktop-only gating;
  original title-first watercolor fades and fixed paintings retained.
- `src/styles/invitation.css` — stable mobile/desktop stage sizing and subtle
  independent vine/bell sway; no central petals.
- `src/components/FallingLeaves.tsx` — corner-only falling leaves.
- `src/components/InvitationMusic.tsx` — optional local licensed violin track,
  locally included original fallback, best-effort autoplay/tap control.
- `scripts/check-mobile-mode.mjs`, `scripts/check-story-pacing.mjs` — updated
  regression checks.
- `public/audio/README_MAHAGANAPATHIM.md` — licensing/drop-in instructions.

Never replace the existing approved paintings, Telugu poetry, event dates,
address, pallu ponginchadam description, venue actions, or music rights notes.
Do not restore ordinary stacked scrolling unless the visitor explicitly selects
reading mode or enables reduced motion.

Run `npm ci`, `npm run check`, `npm run build`, and the live app. Run browser
checks at 1440x900, 1714x900, 390x844 and 375x667. Confirm each scene
transforms **in place** through all five reversible watercolor transitions,
with no main painting translation, no clipping of text or Vindu Bhojanam,
no jump when a phone browser's toolbars change height, and continuously falling
petals only at corners. Verify bell/vine sway while scroll is at rest.

Test the audio player with the bundled original MP3 and, IF provided with
redistribution permission, the specific violin recording. Browser autoplay
may be denied, in which case ensure the tap-to-play button works and no
uncaught promise rejection occurs. Do not download or embed ripped commercial
recordings without rights.

Deliver the running URL, final build result, all-scene screenshots, and a
forward/reverse recording; fix any regressions observed before finishing.
