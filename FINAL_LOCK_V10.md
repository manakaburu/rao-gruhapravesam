# Final Creative Lock — V10 (19 November 2026)

## Scope and precedence
This document supersedes historical V3–V9 release notes **only** for the final two watercolor transitions and the balanced scroll distance. All other approved assets, chapter structure, source-locked data, Telugu text, music behavior, and visual language remain unchanged. Continue from this source; do not redesign.

## Root cause fixed
In V9, `.meal-inset` and `.closing-inset` were faded as whole containers, even though they contained the major feast/closing paintings. Thus the expanding mask was revealing mostly parchment until late in the transition; the last two backgrounds were also nearly identical in color. In ceremonies, the departing painted scene sat inside a text-fading wrapper, compounding the problem.

## Implemented targeted changes
- `src/styles/invitation.css`: preserve feast, closing and departing ceremony **paintings** while their paragraphs, times, address and buttons still observe `--text-opacity`. No text suddenly appears under the chapter-title glimpse.
- `src/components/CinematicStage.tsx`: select a quieter-scene-specific growth curve (`1.90` rather than `2.25`) and a slightly right-biased focal position **only on desktop for the feast and closing reveals**. Other scenes keep V9's exact reveal behavior. Temporary faint pigment accent and a soft derived seam mask now make the two late boundaries visible; all accents fade to zero before the chapter settles. Master paintings are never moved.
- `public/assets/watercolor-seam-final.png`: feathered organic edge alpha derived from the existing V9 mask; no dark outline, hard cutout or full-screen flash.
- Scroll distance changes from 6200 to **5800px desktop** and 4400 to **4200px mobile**. The original six normalized scene beats, GSAP `scrub:.55`, five transitions, centered-title timing, CSS-sticky stage and reversible progression are unchanged. Each of the five transition windows is now ~754px desktop / ~546px mobile (13% of total travel). Visitors retain full control of reading time by stopping scroll.
- `scripts/check-story-pacing.mjs`, new `scripts/check-last-two.mjs` ensure these intended values persist.

## Rigorous checks executed
- TypeScript `tsc --noEmit` PASS (using archived declarations).
- Original entrance/interior immutable asset hashes PASS; event content, times, calendar and scene registry PASS.
- Existing V9 five-transition logic, fixed paintings, corner leaves, bell/vine sway, music asset/playback wiring and sticky mobile safeguards PASS at source level.
- Chromium **source CSS + actual source artwork** visual harness: 72 frames spanning **1440×900, 1714×900, 1366×768, 390×844, 375×667, 320×568**, covering both targeted chapter handoffs at 18/35/53/71/88/100% reveal. No page JS exceptions, broken images, masked scene loss or horizontal overflow in the harness. Screenshot contact sheet in `qa/final-v10/LAST_TWO_CONTACT_SHEET.jpg`.
- Zip checksum/integrity performed at packaging time.

## Not falsely claimed
The visual QA is a **source CSS/DOM harness**, not full React app playback. Native Vite production build was attempted but the uploaded dependency snapshot has Windows-only Rollup binaries and Linux package installation was unavailable in this container. `npm ci && npm run check && npm run build` and final browser runs of the **actual React website**, including real iPhone Safari, must be completed on your Codex machine before public launch. Do not label those tests as passed until run.

## Final acceptance criteria (Codex)
1. Real app loads at `http://localhost:5173/` with exactly six chapters and no ordinary stacked scroll except reduced-motion/reading mode.
2. Five reversible, smooth watercolor transitions. Last two visibly reveal the painted feast/venue early while their text arrives after the centered transient title. No hard burn circle, muddy double exposure, shifting paintings, or sudden blank chapter.
3. Native scroll and browser-toolbar changes do not jump; check mobile at 390×844 and 375×667, short-height 320×568, desktops 1440×900/1714×900, and reduced-motion/reading mode.
4. Event data, ritual spelling, Hindi devotional MP3 upload and local play/pause controls, directions/WhatsApp/calendar unchanged.
5. Production build and GitHub Pages relative asset paths work; fix actual regressions only, no aesthetic redesign or extra scope.

**Locked:** V10 is the final candidate. Only fix measured test failures from this point forward.
