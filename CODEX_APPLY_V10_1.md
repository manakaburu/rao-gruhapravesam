# V10.1 — FINAL MINOR FIX (Borderless chapter titles + resilient music)

## Starting point
This patch is based on the user's **RAO_GRUHAPRAVESAM_FINAL_V10_LOCKED.zip**. It is deliberately limited to TWO runtime files:

1. `src/styles/invitation.css`
2. `src/components/InvitationMusic.tsx`

Do not overwrite unrelated newer work. Merge the relevant changes into the current working tree and compare the diff before proceeding.

## Requested fixes

### A. Centered transition titles (CSS-only)
- The temporary centered chapter heading must appear directly over the watercolor scene.
- Remove the parchment-colored oval/panel and its pseudo-element behind the title.
- No outline, border, box background, shadowed card, or block around that transient title. A subtle **text-shadow** for readability is retained.
- **Do not remove the decorative frame painted INTO the closing illustration**, or affect cards in event details. No changes to scroll progress, mask, artwork, copy, or ordinary chapter layout.

### B. Music startup (same uploaded MP3)
- Keep `public/audio/achyutam-keshavam-user-upload.mp3` byte-for-byte unchanged.
- Attempt playback as soon as permitted; if the tab opens hidden, retry automatically on visibility return/pageshow.
- When autoplay is blocked by Safari/Chrome, start on the first legitimate user gesture or Play button. Do not promise or bypass unmuted autoplay restrictions.
- Preserve fade-in/out, looping, play/pause and safe cleanup. **Explicit Pause must suppress unintended restart** on tab focus/visibility changes.
- Avoid duplicate audio elements, autoplay loops, or extra player UI.

## Regression requirements
- Run `npm ci`, `npm run check`, `npm run build` in Codex's environment.
- Verify all six scenes and the FIVE reversible watercolor transitions, both directions; temporary centered titles appear without any visible panel.
- Test 1440×900, 390×844, 375×667, reduced-motion, image and leaf placement, audio playback, and `?reading=1` fallback.
- Test audio at initial load on a permitted origin, on blocked autoplay + first tap, when opening a background tab then focusing it, and after user taps Pause (must remain paused).
- Verify the uploaded MP3 is available under the configured Vite base path and returns HTTP 200 with `audio/mpeg`.
- Do not modify date/time/venue/hosts, Telugu text, images, calendar files, mobile scrolling, or the 5,800px desktop / 4,200px mobile scroll runway.

## Known browser policy
Chrome/Safari may prohibit audible autoplay until the visitor interacts. This is enforced by the browser; it is **not** reliably solvable with JavaScript. Do not unmute a muted autoplay stream without a gesture or simulate a click. Maintain the real Play control and interaction fallback.
