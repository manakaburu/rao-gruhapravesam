# APPLY UPDATE — Rao Gruhapravesam Restored Cinematic Story (2026-11-18)

**This is a full source-code update, not a concept or instruction-only package.** The uploaded `2026-11-18(2).zip` was the baseline, using `outputs/rao-gruhapravesam`. Its newer user content is preserved. This ZIP does **not** correspond to the user’s localhost files until you copy/merge these files into the currently running Codex workspace.

## Change authority (highest priority)

The following source files and assets **already contain** the fixes. They supersede old instructions that describe a parchment-covered hard scene switch, a cropped lunch image, or Phase 1-only scopes:

- `src/components/CinematicStage.tsx` — scroll-progress-based paired scenes, expanding incoming watercolor mask; depth variables drive the camera/art and separate corner ornaments; controlled arrival/departure typography. No frozen scene swap or blanket opaque veil.
- `src/components/WatercolorTransition.tsx` — lightweight, non-opaque atmospheric veil only.
- `src/styles/invitation.css` — `.spread.revealing` organic mask and layered parallax, feast 4:3 full image, no lower-image clipping.
- `public/assets/feast.webp` — new full-plate Kalamkari/watercolor banquet; the whole banana leaf, lamps and peacocks fit inside its original 4:3 composition.
- `public/assets/feast_painterly_master.png` — editable master version of the new banquet scene.
- `public/assets/feast_original_before_uncrop.png` — preserved previous image for comparison, NOT used in the UI.
- `docs/ASSET_MANIFEST.json` — updated replacement-art hash/size.

**No changes:** source-locked dates, times, names and venue; Telugu approved lunch verse and పాలు పొంగించడం terminology; entrance and interior original paintings; blessings scene; no RSVP/music; React/Vite and GSAP.

## Exactly what Codex must do

1. Keep the running repository and create a backup or commit first.
2. Compare its source with the files in this ZIP, then **copy/merge all modified source, CSS and banquet artwork**. Keep newer unrelated improvements. Do not reset/rebuild the creative direction.
3. Install correct native dependencies in Codex's host environment (`npm ci`) and run `npm run check && npm run build`.
4. Test in a functioning browser with viewport 1440×900, 768×1024, 390×844 and 375×667. Capture screenshots for all six chapters, the center of each of the five transitions, and the feast panel; inspect actual text readability and image edges. Scroll backward and compare transition frames for reversibility.
5. On a short screen, if all content cannot fit safely inside the pin, normal-flow editorial reveals are expected; the site must never clip Telugu/date/address information to force pinning.
6. Reuse original artwork as-is; never substitute old flat feast SVG/vignette or the former faded-off image.
7. Return final verified build, actual browser screenshots and a concise QA report. Do not claim browser approval without viewing it.

## What was verified before packaging

- `tsc --noEmit` passed against the TypeScript/React types supplied in the uploaded dependency snapshot.
- `node scripts/check-artwork.mjs` passed all four immutable original-art hashes.
- `node scripts/verify-content.mjs` passed event content, scene registry and calendar times.
- Image files and the full-plate feast replacement were programmatically opened and validated.
- A browser QA bundle was compiled for inspection from the modified TSX, but the managed Chromium instance here enforces `URLBlocklist: ["*"]`, blocking local and file URLs; **interactive browser visual approval was NOT possible here**.
- A native Vite build was attempted but the uploaded Windows dependency snapshot lacks Linux’s `@rollup/rollup-linux-x64-gnu`. Network-based npm reinstall was unavailable. Codex must produce the clean host-native build and final visual QA.
