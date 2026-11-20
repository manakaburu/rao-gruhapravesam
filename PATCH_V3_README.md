# Rao Gruhapravesam — slow cinematic dissolve + desktop composition (V3)

This is the **full existing six-scene React/Vite project** from the user's latest `outputs.zip`, with small, controlled source changes. It is not a new design or a re-creation of the invitation.

## Exact source changes

| File | Purpose |
|---|---|
| `src/data/chapters.ts` | Longer holds and ~10%-of-story watercolor transitions. |
| `src/components/CinematicStage.tsx` | Longer scroll distance (12.5 × viewport or 9800px min) and 0.9s scrub smoothing. |
| `src/styles/invitation.css` | Slower-feeling outgoing-art fade and carefully bounded desktop image enlargement; ceremony padding safeguard to preserve pin. |
| `docs/MOTION_SPEC.md` | Updated timing reference. |
| `docs/CODEX_STORY_PACING_V3.md` | Full change rationale and acceptance criteria. |
| `scripts/check-story-pacing.mjs` | Automated regression guard for five long transitions and safe responsive rules. |
| `package.json` | Adds the story pacing guard to `npm run check`. |

The light Codex ZIP intentionally **omits `dist/` and `node_modules/`**. I verified a locally patched copy of the existing compiled preview in Chromium, but the receiving Codex workspace must run a clean Vite build from these updated source files.

## No changes to

`src/data/invitation.ts`, the source-of-truth content lock, Telugu copy, ceremony times, calendar files, the six-scene components, the original approved entrance/interior paintings, or any illustrations. No music, RSVP, door-swing animation, extra scenes, or new frameworks.

## Run in Codex

```bash
npm ci
npm run check
npm run build
npm run dev
```

See `CODEX_APPLY_PROMPT.txt` for the full copy/paste instruction. The `qa/pacing-v3/` folder contains screenshot evidence and `BROWSER_QA.json`. In particular, inspect the five desktop `1714-wash-*.png` frames and `1714-ceremonies.png` / `1714-feast.png` for art-size and text safety.

## Verification done here

- TypeScript (using `node node_modules/typescript/bin/tsc --noEmit`) passed.
- Art-hash, locked-content, and pacing checks passed.
- Rendered the patched compiled preview through Chromium/Playwright with intercepted local assets; verified pinned mode at 1714×900, 1440×900, 1366×768, 390×844 and accessible fallback at 375×667, no horizontal overflow, no browser errors in tested captures.
- Five midpoint transitions were visually captured; reverse returned to the first scene.
- A fresh native Linux Vite build could not be run with the uploaded Windows-specific optional Rollup binaries; the receiving Codex environment must rebuild with fresh dependencies and repeat the browser QA.
