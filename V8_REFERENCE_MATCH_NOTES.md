# V8 — Reference-matched full-stage watercolor dissolve

## What the user's 11.48-second reference video shows
The original two-scene transition softly bleeds the next painting into the previous image through a feathered watercolor alpha mask. It is **not** a hole punched in paper; it has no char rim, hard circle, or brown burn outline. V8 extends exactly that textured alpha mask to the **whole incoming chapter canvas** (artwork + text + parchment). The header/progress navigation remain stable rather than being unnecessarily obscured.

## Changes (five modified source/testing files)
- `src/components/CinematicStage.tsx`: replace dynamically generated jagged polygon with progressive sizing of the EXISTING `watercolor-mask.png` on the whole incoming spread. Keep the same ScrollTrigger and distances (6200px desktop, 4400px mobile); preserve reverse scrolling. Centered chapter glimpse peaks during the wash and fades out before normal heading and verse appear. Outgoing artwork is kept visible behind the masked reveal; never translate or scale the paintings.
- `src/components/WatercolorTransition.tsx`: remove SVG char rim and sharp-edge glow. Keep the ARIA-hidden centered chapter title layer and existing `ChapterArt` export intact.
- `src/styles/invitation.css`: supersede V7 portal rules by a full-scene soft `mask-image`, using the original watercolor mask. Preserve the rest of CSS (corner petals, bells, mobile, audio, etc).
- `scripts/check-story-pacing.mjs`, `scripts/check-release-v4.mjs`: replace obsolete V7 hard-polygon assertions with the new visual contract.

## Acceptance checklist
- At 0% reveal, the outgoing chapter alone is shown; at ~35% incoming artwork bleeds into it with irregular soft boundaries; by 100% incoming chapter fully occupies the stage.
- A brief centered chapter heading appears mid-transition and fades out; chapter heading then verse/information appear in their standard places.
- No burnt outline, gray/black circle, border, opening stroke, scene-card wipe, or full-screen opaque fog.
- Five transitions share this same behavior forward and backward; six original chapters, all original master images, local audio, calendar and event facts unchanged.
- Main images remain fixed. The persistent UI outside the story canvas (masthead, chapter progress) stays stable.

## Verification completed in this environment
- `npm run check`: PASS including TypeScript, original art SHA, event dates and calendar starts, scene pacing, stable mobile sticky mode, falling leaves/audio integrity and painterly reveal assertions.
- Chromium visual harness (actual CSS, original watercolor alpha PNG and original WebP images embedded to avoid blocked local file navigation): PASS at 1440x900 and 390x844 for 0, 15, 35, 52, 70, 90 and 100% progress, including title timing. Screenshots in `qa/V8_*_STORY_REVIEW.jpg`.
- `npm run build`: NOT completed; archived dependencies lack the native Linux Rollup binary. Reinstall dependencies with `npm ci` in Codex before native build.
- Live production React app and physical iOS Safari remain TO TEST; the visual harness is not a replacement for a full deployment test.

## Regression risks to check in Codex
1. `npm ci && npm run check && npm run build`
2. Browser screenshots mid-transition for 1→2 and 3→4, in both directions (mobile/desktop).
3. Open at 390x844 and 375x667, scroll while mobile browser UI changes height, confirm no stacked layout, flashes or horizontal overflow.
4. Verify music is unchanged and starts only when allowed by browser policy.
5. Assert CSS mask URL resolves under a GitHub Pages repository subdirectory.
