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

## V11.1 refinements (2026-11-20)
| Area | Change |
|---|---|
| Music cover | "Continue without music" removed. The cover has one action, **Open invitation**; a tap anywhere on it also opens the page with music. Guests can still pause with ♪. |
| Title card blending | The rectangular slip and hairline frame are gone. The name sits in an edgeless paper-coloured watercolor bloom (`watercolor-mask.png`) that spreads as it appears, over a soft opaque core; a paper glow on the letterforms melts them into it. Bloom silhouette is mirrored/rotated per chapter. |
| Text timing | One staggered sequence per wash (`src/data/watercolor.ts`): outgoing body then heading leave (0–.16) → name blooms in (.18–.34), number and rule a beat later → card holds .34–.58 (≈28% of the wash, was 15%) → dissolves by .72 → heading .72–.88 → body .80–.97. No dead gaps and never two texts at once (`scripts/check-watercolor.mjs`). |
| Opening timing | The threshold held for only 4.5% (~240px) before the first wash. Every chapter, including the first, now holds 7% (~370px at 1440×900); washes are 11.4% each. Total runway unchanged (6.4 × stage height). |

Regression run: `npm run build` passes; fit probe clean at 375×667, 768×1024, 844×390, 1366×768, 1920×1080; forward + reverse holds settle correctly; 63 mid-wash samples with zero text overlaps; music cover tap / button / pause / resume pass with a simulated autoplay block.
