> **Current V5 baseline:** Read `RELEASE_V5.md`. Historical Phase-1/mobile fallback notes below may be superseded.

# Rao Family Gruhapravesam — Cinematic Release 4

A six-chapter illustrated Telugu family invitation for **November 25–26, 2026**, in Somajiguda, Hyderabad. Complete source, approved entrance/interior images, all six scenes, original MP3 music, responsive styles and GSAP choreography are included.

## Run on your computer

Requirements: Node.js 22.12+ and npm with network access for the first install.

```bash
npm ci
npm run check
npm run dev -- --host 0.0.0.0 --port 4198
```

Open `http://127.0.0.1:4198/` on the same computer; mobile devices on your Wi-Fi can use `http://<your-LAN-IP>:4198/`. If the address already exists, stop the old dev server first or choose another port. For production:

```bash
npm run build
npm run preview
```

The static `dist/` output from `npm run build` can be deployed on GitHub Pages according to `docs/DEPLOYMENT.md`.

## What Release 4 changes

- **Desktop:** one pinned story stage, five extended scroll-controlled watercolor alpha-mask transitions, the next chapter title fading in before the body content; the outgoing title fades away early. **Paintings themselves never translate or zoom.**
- **Mobile and desktop:** stable CSS-sticky six-chapter stage with long scroll-controlled watercolor transitions, no GSAP pin spacers or toolbar-height mode toggles. 320px+ responsive design; reduced-motion and explicit reading mode remain stacked and accessible.
- **Falling leaves:** a small independent compositor animation that continues even when scrolling stops, hides in reduced-motion mode and never catches touch/click events.
- **Sound:** user-triggered play/pause with volume fades and looping, using `public/audio/rao-auspicious-welcome-original.mp3` (a new original instrumental). It is NOT the A. Kanya Kumari Mahaganapathim recording or the SoundCloud audio. The requested track remains available as an external listening link.
- Locked event facts/poetry and approval status retained. No RSVP, guestbook, door animation or invented address.

## Key files

- `src/components/CinematicStage.tsx` — GSAP pinned desktop and stable mobile flow.
- `src/components/FallingLeaves.tsx` — independent continuous leaf animation.
- `src/components/InvitationMusic.tsx` — persistent local soundtrack player with best-effort autoplay and explicit tap-to-play fallback.
- `src/styles/invitation.css` — all layout and transition rules.
- `docs/CONTENT_LOCK.json` — accurate ceremonies, hosts, verses and address.
- `public/assets/` — six paintings, ornaments, textures and previews.
- `public/audio/rao-auspicious-welcome-original.mp3` — original 67-second instrumental.
- `AUDIO_LICENSE.md` — scope and rights of the bundled audio.
- `RELEASE_QA_REPORT.md` — exactly what was tested and what still needs verification.
- `CODEX_INTEGRATION_PROMPT.md` — merge instructions if using Codex on an existing checkout.

## Performance and accessibility

- Music attempts autoplay on load, but browsers frequently block unmuted playback until a deliberate user tap. The included original audio is ~0.84 MB. An optional locally licensed violin MP3 may be supplied at `public/audio/mahaganapathim-violin.mp3`.
- All ceremony times are in the Asia/Kolkata time zone. Event descriptions remain source-locked.
- Reduced-motion users see all chapters in normal reading order without animated leaves or pinned stages.
- The browser QA in this archive runs from the same TypeScript/React source via a controlled browser harness; it does **not** substitute for the final Vite build and physical iPhone testing.
