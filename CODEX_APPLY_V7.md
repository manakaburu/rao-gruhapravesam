Continue the existing Rao Family Gruhapravesam project and apply the attached V7 targeted patch.

Read `V7_RELEASE_NOTES.md` and the project's existing `AGENTS.md` first.
This is a precise correction to the V6 transition only. Preserve the latest
project files except for the exact files in the patch.

Goal: On each of the five chapter changes, a tiny irregular, warmly singed
paper opening appears at the screen center and gradually enlarges to reveal the
next entire scene. Briefly show the incoming chapter title centered in that
opening, fade it out, then reveal the chapter's regular heading and supporting
copy in their original positions. The effect must be scroll-driven, reversible,
polished, and mobile-friendly. Keep all artwork completely stationary.

Merge:
- src/components/CinematicStage.tsx
- src/components/WatercolorTransition.tsx
- src/styles/invitation.css
- scripts/check-story-pacing.mjs
- scripts/check-release-v4.mjs

Do NOT alter scene artwork, text, ceremony information, host, venue, Telugu
copy, sticky stage, scrolling distances, corner petals, bell/vine movement,
audio file or player, reduced-motion behavior, or event-details actions.

Execute `npm ci`, `npm run check`, `npm run build`. Then browse the ACTUAL
React app and record beginning/center/title-fade/end frames for all five
transitions at 1440×900, 390×844 and 375×667; test reversing scroll and browser
address-bar changes, audio and navigation. Fix only discovered regressions.

Deliver a working URL, build/test summary, screenshots and screen recording.
Do not redesign or add unrelated effects.
