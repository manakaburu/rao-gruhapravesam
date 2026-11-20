> **V11 UPDATE (2026-11-19):** `V11_RESPONSIVE_AUDIO_NOTES.md` supersedes `FINAL_LOCK_V10.md` for the scroll runway (now viewport-relative), the mid-wash chapter title card, the venue card layout, tablet/landscape layouts and the mobile music cover. Read it before changing those areas.

> **FINAL V10 LOCK (2026-11-19):** `FINAL_LOCK_V10.md` overrides historical release/pacing notes only for the last two watercolor reveals and the 5800px/4200px scroll runway. All artwork, Telugu copy, factual event data, audio, V9 main-scene motion and five-transition structure remain locked. Read that file before previous implementation notes.

> **LATEST SOURCE UPDATE (2026-11-18):** `APPLY_UPDATE.md` is authoritative for the restored six-scene painterly scroll storytelling and the fully framed feast illustration. The existing code already contains these changes. Preserve all four immutable entrance/interior art files. Do not revert to a sealed parchment wash or the cropped former feast artwork. Read `APPLY_UPDATE.md` first.

# AGENTS.md — Rao Gruhapravesam, FINAL Codex rules (authoritative)

## V5 ACTIVE OVERRIDE — READ BEFORE ANY HISTORICAL BRIEF

The latest approved user request supersedes previous desktop-only/mobile-native-scroll
limits: a single **CSS-sticky six-chapter cinematic stage** operates on desktop
and mobile. GSAP controls reversible paint progress but does not create pin
spacers. No per-chapter height gate may silently turn story mode off. Ordinary
stacked reading mode remains available via `?reading=1` or reduced motion.
Corner-only leaves fall continuously; bells and vines sway slightly; primary
paintings stay fixed. The player may **attempt** audible autoplay but MUST
provide a tap-to-play fallback when the browser blocks it. The requested
commercial Mahaganapathim violin recording is NOT bundled without a license;
the original instrumental remains available locally. See `RELEASE_V5.md`.

Read this file **first**, then `CODEX_MASTER_PROMPT.md`, `FINAL_IMPLEMENTATION_BLUEPRINT.md`, `docs/CONTENT_LOCK.json`, `docs/SCENE_BLUEPRINT.md`, `docs/ASSET_MANIFEST.md`, `docs/MOTION_SPEC.md`, `docs/COPY_DECK.md`, `docs/QA_MATRIX.md`. This is a **complete-build handoff**, superseding the earlier Phase-1-only instructions and any "STOP after Phase 1" wording in historical reports. Do NOT stop between phases for approval; complete the final app and objectively review it yourself. Do not start a new project/rewrite: continue the supplied, functioning React/Vite/TypeScript + GSAP codebase.

## Unbreakable creative requirements
- Look and feel: premium, warm, richly hand-painted **Kalamkari × watercolor** with natural parchment, marigold/mango toranam, peacocks, brass lamps, Telugu poetry. Preserve exact approved entrance and interior master artwork as read-only. Existing entrance shows **one closed door**, **Flat 201**, one handle, ornate threshold muggu. The apartment is a **3 BHK flat**, not a villa/house/building exterior; interior is **symbolic**, not an architectural claim.
- Apple's product storytelling is a **scroll choreography reference only**; Amar Chitra Katha/Panchatantra are **animation storytelling references only**, NOT art-style references. No actual copyrighted comic art.
- The six scenes and order are fixed: **entrance → welcome interior → Lord Venkateswara blessings → ceremony schedule → festive lunch → closing/venue**. Scene art and text share the same fixed pinned viewport; scroll controls organic layered reveals. No mechanical door opening. A watercolor alpha-mask should progressively **reveal the incoming scene in place** over the outgoing scene. **Main paintings MUST remain fixed, with no translation or scale.** At each transition the next chapter heading appears first, followed by its body copy. Falling leaves animate continuously via CSS without scroll dependence. The incoming scene is fully opaque inside the irregular pigment edge, never a semi-transparent ghostly collage.
- No RSVP, guestbook, form, comment storage, stock images, invented architectural exterior, unapproved event facts, ceremony renaming, new dates, forced or unlicensed background music, excessive 3D, or gratuitous visual effects. Release 4 authorizes a user-initiated **locally bundled original instrumental** and retains the supplied SoundCloud link only as an external listening reference. Do not rip or rehost the commercial SoundCloud recording. Autoplay may be attempted, but cannot be forced through browser policy; maintain the tap-to-play fallback.
- Preserve Telugu strings **verbatim** from the content lock. They are editable DOM text, never generated inside images. English facts and events also read from the lock. Do not invent guests, surnames, rituals, times, parking, reception, or exact map-pin certainty.

## Source of truth and collision resolution
1. `reference/original_index.html`: authoritative for event facts.
2. `docs/CONTENT_LOCK.json`: normalized transcription of source, approved poetic copy; corrects original WhatsApp copy bug.
3. THIS root `AGENTS.md`: strict creative/engineering policies, supersedes all previous instructions.
4. `FINAL_IMPLEMENTATION_BLUEPRINT.md`: full deliverable/architecture/scope.
5. `docs/SCENE_BLUEPRINT.md`, `docs/MOTION_SPEC.md`, `docs/ASSET_MANIFEST.md`, `docs/COPY_DECK.md`, `docs/QA_MATRIX.md`: exact implementation and acceptance specifications.
6. `qa/baseline`: previous screenshots and recording show the **old** prototype, NOT final target aesthetic.
7. Generated storyboard/poster images from conversations are NON-authoritative and are deliberately excluded.

## Asset priorities and artistic honesty
- `public/assets/entrance_master.png` and `interior_master.png`: user-approved originals; remain byte-identical. Their WebPs remain byte-identical. `scripts/check-artwork.mjs` must pass.
- `blessings_master.png` / `blessings.webp`: new AI-generated candidate devotional illustration created for this handoff, **not yet user-approved**. Depict respectfully, no animate deity itself. Use as supplied unless an objective visual defect makes it unsuitable; document concern, do NOT secretly substitute.
- `ceremonies_illustration.svg`, `feast_illustration.svg`, `closing_illustration.svg` are historical flat vectors and MUST NOT be prioritized as `<picture>` sources. New `ceremonies.webp`, `feast.webp`, `closing.webp` are v2 painterly candidates; they are not previously user-approved. The feast artwork is now an original full-plate generated image with the entire banana leaf and border in frame; never restore the old blurred/cropped composite. See `APPLY_UPDATE.md`.
- `foliage_left.png` and `foliage_right.png` are feathered derivatives of the original entrance for **later scenes only**, not true isolated flowers. Never claim they are full transparent separated source art. Existing paper-grain and bloom-mask assets are procedural textures.
- Do not generate fake venue photos, faux floor plans or invented external architectural illustrations. Venue is typography + ornamental frame + useful directions.
- **No font files are supplied with this handoff.** Keep installed `@fontsource` dependencies and let npm resolve fonts when the project is built. Do not add copied font files manually.

## Engineering requirements
- React 19, Vite 7, TypeScript, GSAP ScrollTrigger. Reuse existing components; extend in modular components/config. Keep scene registry/content separate from animation orchestration. Do not add Next.js or a backend.
- Pinned stage controlled by **native scroll**, reversible and performant; no wheel/touch hijack, forced snapping or automatic scrolling. Reduced-motion and short viewport layouts are normal accessible document flows with **all** content visible.
- `100dvh` with safe fallback, 320px minimum width, edge-to-edge crop conscious on mobile. No clipped Telugu words or overlapped dates. Use opacity/transform/mask rather than expensive full-frame live blur/filter. Re-use optimized WebP, lazy-load later chapters responsibly.
- Every chapter is keyboard-accessible via a semantic static outline; provide a visible **Skip animation / Event details** route. Functional directions, WhatsApp sharing, calendar .ics links, click-to-call. Use exact factual data from lock. Source Google map shortlink is **UNVERIFIED**; offer a reliable address-search fallback instead of asserting a precise pin.
- Preserve GitHub Pages subpath compatibility with `import.meta.env.BASE_URL`/Vite assets; never hardwire `/` or localhost as deploy origin. No hardcoded repository/user identity. Provide deployment instructions and optional GitHub Action but do not pretend to publish without credentials.
- Keep document title, description, OG image and canonical configuration grounded; no claims of having run physical-device testing unless performed.

## Production process, without stopping for approvals
1. Audit existing source, tests and screenshots and create a compact implementation plan internally.
2. Refine the current first transition **without rewriting functioning components unnecessarily**.
3. Implement scenes 3–6 with supplied art and actual content; build cohesive transitions and fallback.
4. Implement real links, accessible scene controls, metadata, calendar, sharing, production asset paths.
5. Run `npm ci`, `npm run check`, `npm run build`; fix failures. Add Playwright/headless browser QA if possible. Test screenshot states at 375×667, 390×844, 768×1024, 1440×900; include mid-wash states and reverse passes.
6. Review screenshots against the art direction. Fix obvious layout/composition/typography/effect problems. Do not satisfy tests while shipping a mediocre slideshow.
7. Return completed source, build instructions, screenshot grid, video if available, test results, and a precise residual limitations list. If external credentials are needed for publishing, finish everything local and explain exact manual deployment requirement.

**DO NOT request another phase approval or respond with only a plan. IMPLEMENT the complete requested scope.** Only ask for user input on genuinely blocking conflicting facts or credentials that cannot be inferred; such gaps should not block local completion.
