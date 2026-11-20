# V11 — responsive layout, mobile music, chapter title card, pacing (2026-11-19)

Supersedes `FINAL_LOCK_V10.md` **only** for the items below. Artwork, Telugu copy,
event facts, the six-scene order and the watercolor reveal itself are unchanged.

## What changed and why
| Area | Problem found (deployed site) | Fix |
|---|---|---|
| Venue card | Address spilled outside the painted frame on phones, tablets and landscape (heading above the card, "India / Near AIG" below; "Constructi-ons" broken in landscape). | `.address-print address` is now a real CSS card laid exactly over the painted card (69.4% × 66.1% of the 4:3 plate). Sized with container units; grows instead of overflowing. Old `@container` collapse rule removed. |
| Tablet portrait (600–860px) | Phone caps (24rem / 40svh) left large empty bands; ceremony art tiny. | Tablet-sized type and art block in `invitation.css`. |
| Landscape phones (stage < 460px tall) | Pinned stage clipped ceremonies/closing. | These read as the normal gently-revealed document (`story-fallback`), decided from `100svh`, re-evaluated only on width change/rotation. |
| Mid-wash chapter title | Bare text with a white outline floating half on painting, half on paper. | Deckle-edged parchment slip (same `paper-edge.png` mask as the paintings) with chapter number, name (last word in madder italic, like the headings) and the floral rule. Rises gently through its window; only opacity/transform animate. |
| Scroll pacing | Fixed 5800/4200px; each chapter held ~290px but each wash took ~754px. | Runway = 6.4 × stage height (clamped 3200–6000px) ≈ one screen per chapter on any device. Washes 11.5% of runway, reading holds 7.5%. |
| Music on phones | Phones block sound until a real tap; scrolling never counts, so music started only if a guest happened to tap something. 8.6 MB MP3 was preloaded on every visit. | If the autoplay attempt is blocked, an "Open invitation" cover appears; its button is the tap browsers require. "Continue without music" respected for the session. Where autoplay is allowed, nothing changes. `preload="none"` so audio streams only when played. |
| Footer | Chapter name wrapped to two lines beside the music button. | Single line; "Scroll to continue" text hidden ≤420px (arrow stays). |

## Verified (Chromium device emulation, local dev + production build under `/rao-gruhapravesam/`)
- `npm run build` (tsc + all repo checks) passes.
- `qa/fit-probe.js` at 375×667, 390×844, 768×1024, 844×390, 1024×768, 1280×650, 1366×768, 1920×1080: no clipped elements, no horizontal overflow, address inside frame.
- Forward and reverse scrub through all six holds settle on the correct chapter; no console errors.
- Music cover simulated with a blocked-`play()` shim: cover tap starts audio; return visit shows a hint and any tap resumes; "without music" stays silent until ♪ is pressed; pause/play works.

## Not verified
Real iPhone Safari / Android Chrome hardware. iOS ignores `audio.volume`, so the fade-in is skipped there (music starts at device volume).
