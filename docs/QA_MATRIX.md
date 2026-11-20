# Release acceptance & QA runbook — prove a finished site

## Required tests
1. Baseline source: `npm ci`; `npm run check` (TS + approved-image hash); `npm run build` must all PASS. Preserve original image bytes. No hidden warnings suppressed.
2. Test responsive matrices at 320×568, 375×667, 390×844, 768×1024, 1024×768, 1440×900. Also test short landscape-height and 200% zoom. Check Telugu line wrapping, deity cropping, facts, button reachability, no overlap/horizontal overflow.
3. Capture each of SIX chapters at rest (desktop & 390 mobile); all FIVE transition midpoints at 1440 desktop; representative entrance→interior midpoint on 390. If Playwright/headless browser available, automate and save images under `qa/final/`.
4. Test repeated scrub: 0→100%, 100→0%, jump toward detail, reverse across transitions. Pin releases seamlessly. No flash, blank frame, double spacer, flickering browser scroll, stuck `inert`, or unclickable links.
5. Reduced motion test: `prefers-reduced-motion: reduce` displays all 6 scenes and details in normal flow. Toggle preference dynamically if possible and ensure cleanup. Disable CSS masks simulation/fallback and test.
6. Accessibility: keyboard-only use, proper heading structure, focus indicators, skip target receives focus, descriptive alt or empty alt for ornament, Telugu `lang`, adequate contrast, reasonable touch targets, no forcibly moving text.
7. Content assertions from `CONTENT_LOCK.json`: exact names **Sri Sana Rambabu & Smt. Bhavani**; 25 Nov 2026 **8:48 PM**; 26 Nov 2026 **8:30 AM**; lunch 26 Nov **12:30 PM**; Flat 201 Somajiguda; contact; no fictional rites or address, no misleading details. Original share bug must be absent.
8. Function links: WhatsApp text visibly distinguishes Gruhapravesam and Vratham; calendar event `DTSTART` values exactly 20261125T151800Z, 20261126T030000Z and 20261126T070000Z (India +5:30); map opens address search without unverified precision; tel href; no dead placeholder buttons.
9. Verify GitHub Pages project `--base=/test-repository/` and root base; script/style, WebP, SVG, social preview and calendar paths load under the chosen subpath. Do not claim real deployment without GitHub credentials. No source map URL treated as verified.
10. Visual art review: approved entrance remains closed door 201; interior contains NO duplicated open door/muggu from full master crop; deity respected; generated symbolic supporting illustrations are scaled as accents, not passed off as painterly scene replacements. No comic-panel aesthetic, stock photos, generic neon/glass cards.
11. Network/perf: modern WebP fetch, no accidental large PNG backup downloads, no loading all 6 masters at once, page still usable on slow network. No external audio. Check console and HTTP errors.

## Target evidence to return
- `qa/final/REPORT.md`: browser/tool versions, exact commands, passing/failing items and environment limitations.
- `qa/final/screenshots/`: scene1..scene6 at desktop/mobile, 5 mid-washes, one reduced-motion reading view, one details view.
- `qa/final/forward-reverse.webm` when browser recording is possible (or openly state unavailable).
- `qa/final/ASSET_LIMITATIONS.md`: list of places still requiring richer hand-painted art / venue shortlink verification / human Telugu proofread, without pretending they are complete.
- `README.md`: build/dev/deploy instructions and honest project status. `/dist` can be generated but not committed if unnecessary; source is the deliverable.

## Acceptance without false certainty
No physical-device Safari/Android claims unless actually performed. Browser emulation is emulation. A green `npm run build` is necessary but insufficient; visual composition and event reading are the real acceptance bars. Do not report "fully production-ready" if key scenes still use simplified ornaments without noting that gap.
