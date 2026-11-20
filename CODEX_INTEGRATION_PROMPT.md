# Codex handoff — Release 4

This ZIP contains the actual source code and original audio file. Merge it into the current Rao Family website; do not regenerate art. Read `RELEASE_QA_REPORT.md` and `AUDIO_LICENSE.md`.

1. Preserve the six scenes, all Telugu and English wording, and locked event dates, venue and address.
2. Apply the updated `CinematicStage.tsx`, `FallingLeaves.tsx`, `InvitationMusic.tsx`, `main.tsx`, and `invitation.css` from the ZIP. Include `public/audio/rao-auspicious-welcome-original.mp3`.
3. On desktop, keep pinned GSAP storytelling and the long slow watercolor transitions. Main paintings must **never translate or scale**; titles transition first, details afterward. On mobile keep native scrolling and staggered opacity-only reveal; never resize/pin the stage as browser toolbars change.
4. Leaves must fall continuously on their own CSS animation even when scroll is stopped, with reduced-motion disabled. Keep them sparse and non-interactive.
5. Music must be **opt-in** (never autoplay), local, persistent and loopable. This is an original alternative, **not** the A. Kanya Kumari or SoundCloud track. The supplied SoundCloud URL is for optional external listening only.
6. Run `npm ci`, `npm run check`, `npm run build`, then browser QA at 1714×900, 1440×900, 1366×768, 390×844, 375×667, and reduced-motion. Test heading-before-content fades at each of five transitions, reverse scroll, the feast image, stable art coordinates, continuously moving leaves while static scroll, music click/play/pause and file response. Prevent regressions before deploy.
7. Return screenshot captures, timing reports and build output; do not claim untested results.

Keep the existing project as source of truth for unrelated newer changes. No RSVP, guestbook, mechanical doors, autoplay, fabricated details or copyrighted music rehosting.
