> **V5 supersession:** `RELEASE_V5.md` and the current code take priority over historical mobile-scrolling/music restrictions below.

# RAO FAMILY — FINAL IMPLEMENTATION BLUEPRINT
**Consolidated project and design contract | 18 November 2026**

## Executive objective
Build the complete, shareable, elegant invitation as **a Telugu illustrated story told through scrolling**. The visual style was approved BEFORE animation changes: intricate hand-painted **Kalamkari × watercolor**, parchment, fine inkwork, peacocks, flowers, brass lamps, traditional Andhra/Telugu motifs. The motion should borrow the restrained cinematography of Apple product stories and the pop-in storytelling cadence of Indian illustrated tales, but **never borrow their unrelated art style**. The guest must feel part of a warm auspicious household gathering, not a technology demo.

## What this package actually contains
- Existing working **React 19 / TypeScript / Vite 7 / GSAP** Phase-1 source and authoritative user-supplied `original_index.html`.
- Two **user-approved** full-resolution paintings and optimized WebP counterparts: the closed entrance and the warm interior. They are flattened; do not claim independent original layers.
- New full-resolution Sri Venkateswara painting as a **candidate**, plus supporting ceremonial, feast and closing **vector ornamental** illustrations in SVG/WebP, paper textures, softly feathered derivative foliage and an OG preview. The supplemental art isn't user-approved yet and is stylistically simpler than the master paintings.
- `docs/CONTENT_LOCK.json` and six approved conversational Telugu poems, distinct from factual source data.
- Reference QA screenshots/video from the earlier two-scene version, not proof of the finished final six-scene site.
- Exact scene/motion design, code changes, functional links, calendar files, acceptance criteria and static GitHub Pages deployment notes.

## Information architecture
1. Fixed/sticky small identity & shortcut navigation (The Rao's Family, Event Details, accessible skip story) without covering page art.
2. Main immersive pinned stage, six chapters with the original art dominant and content adjacent, on parchment.
3. After the stage releases: **single concise, static Facts & Directions section** containing all three ceremony starts, complete address, phone, Maps search, WhatsApp share, calendar downloads and final invitation. This is intentional for fast access and accessibility, not an RSVP form.
4. Small footer with family name and non-fabricated closing blessing. The original invite need not display a misleading venue exterior.

## User journey & pacing
- Arrival: first scene painted doorway in view with ceremonial invocation. After an initial rest, floral accents subtly assemble; the Telugu three-line opening comes into focus. Persistent small cue says scroll to continue; no Enter button implying door animation.
- Scroll reveals warm interior by a wash that paints away the old scene, not a translucent crossfade. Invite copy follows. Optional delicate light flicker in ornaments only.
- Quieter moment: Lord Venkateswara blessings. Deity static, halo/art frame may glow; avoid theatrical object motion.
- Ceremonies: two clear blocks with Wed Nov 25 8:48 PM and Thu Nov 26 8:30 AM, each full ritual list. Decorative flame/kalash vignette small enough to preserve clean text hierarchy; at mobile the event details cannot be cramped in a fake screenshot.
- Feast: warmer humorous interlude, real Nov 26 12:30 PM, full Telugu poem and banana leaf illustration.
- Closing: text-first, family blessing, exact location, call/maps/share/calendar actions, carefully framed and calm, no final endless animation.

## Design tokens and type
| Role | Value |
|---|---|
| Warm paper | `#F5ECDD` |
| Madder red | `#913F37` |
| Indigo ink | `#263B4D` |
| Mango leaf green | `#65754D` |
| Antique brass | `#B99558` |
| Sandalwood | `#D9B995` |
| English display | Cormorant Garamond, serif (500/600) |
| Telugu | Noto Serif Telugu, Telugu glyph subset, fallback Nirmala UI/Gautami |
| Body/UI | DM Sans 400/500 |

Use generous editorial margins, adaptive column widths, meaningful whitespace within a richly painted scene, subtle printed borders, not rows of identical glass cards. All factual event details should have strong contrast and remain still during reading holds. Use UTC/Asia/Kolkata correctly, do not infer event end times.

## Motion architecture
A **single reusable scene registry** should drive painting, ornament, HTML copy, scroll timeline and progress state. All scenes use one fixed/sticky/pinned viewport with native scrolling; no `wheel`/`touchmove` preventDefault and no auto-scroll. Preload critical first image; later images may lazy load before their transitions. Intro and exit holds ensure poems are actually readable. Bloom/mist masks are rasterized textures, not expensive full-screen live blur; no particle storms. All transitions are scrubbed and reversible; every midstate can be rendered again at the same scroll progress. For reduced motion, small screens or non-mask browsers, show a semantic normal-flow sequence of six chapters with no pin. See `docs/MOTION_SPEC.md`.

## New asset usage vs reality
Entrances and interior are genuine richly painted full scenes. Newly provided deity artwork is richly painted but NOT explicitly approved; ceremonial/meal/closing images are flatter symbolic accents. **Do not use them as full-screen substitutes pretending to match the painterly masters.** Place supporting images at appropriate scale against matching parchment and source-derived flowers, so entire composition remains cohesive. Artwork can be improved in a later human art pass without breaking component structure. There is no supplied accurate photo of the 3 BHK or exterior. Never invent.

## Functional behavior
- On-page anchor `#event-details`, a visible skip-story action and accessible chapter nav (optional simplified on mobile).
- WhatsApp Share must encode BOTH dates and tell the correct ceremony vs vratham time. Construct from locked data; do not copy original HTML's incorrect share snippet. Use a `https://wa.me/?text=` link with `encodeURIComponent` or native Web Share with a WhatsApp fallback. Include the exact venue and optionally map search link.
- Google Maps: source contains `https://share.google/dlSo9GjESEiv0rtJj`, not verified. The guaranteed grounded behavior is **Google Maps address-search** using the explicit venue string. If showing source shortlink, label its verification status honestly. Never assert a confirmed pin/directions ETA.
- Calendar: this package includes three `.ics` files (one event start each) using exact Hyderabad start timestamps converted to UTC. **No DTEND** because source specifies no event durations; do not invent a one-hour/three-hour length.
- Contact: `tel:+919666571316`.
- All invitation text is editable live DOM UTF-8, not image-generation text. Add `lang="te"` for Telugu and readable English info.
- Add OG/social preview (already included), site title, meta description and robust `BASE_URL` compatible asset links.
- No RSVP, guestbook or music. No unnecessary tracking/cookies. Website is 100% static.

## Technical constraints and code ownership
Use existing Vite TypeScript React 19 app, CSS and GSAP 3.13. Prefer modular scene components with a typed scene registry, static content data imported from JSON, reusable transition stage, ornaments, responsive editorials, footer/actions, and a static fallback route. Reuse `scripts/check-artwork.mjs`. Clean up obsolete Phase-1-only labels and QA statements once finished. No fabricated repo URL, no credentials, no forced external service, no unverified network dependencies beyond npm packages.

## Completion plan (all phases within ONE Codex execution)
| Phase | Objective | Evidence expected |
|---|---|---|
| 0 · Baseline audit | Read current code, art, facts and screenshots; preserve approved SHA | Check manifest/source/current run |
| 1 · Repair cinematography | Fix rectangle/poster feel and ghostly mid-wash | Before/after scene 1→2 midstate |
| 2 · Devotional chapter | Implement dignified deity art, text, mild mist | Screenshot, static/reduced version |
| 3 · Ceremonies chapter | Implement exact two-day rites and beautiful pictorial accents | Both event names/times clearly legible |
| 4 · Feast chapter | Implement warm playful poem and exact 12:30 meal | Screenshot, mobile read test |
| 5 · Closing & actions | Exact map/address/contact, WhatsApp, `.ics`, social metadata | Functional links/actual generated payloads |
| 6 · QA & release | Responsive, reversible, reduced motion, asset integrity, build, subpath hosting | Checks, responsive captures, recording if feasible |

## Quality gates and objective Definition of Done
1. All six chapters visible; no sections hidden/missing due to JS/animation/focus/viewport.
2. Scene 1→2 midpoint never reads like entrance peacocks and a sofa superimposed; wash meaningfully conceals the visual swap.
3. All events and poems exact; all three dates from source match; hosted details also accessible without animation.
4. Flaw-free backwards scrub and pin release without visual jump; no horizontal overflow at 320/375/390/768/1440 widths.
5. No image warping, invented house exterior, moving muggu, moving deity, mechanical door, borrowed comic assets, generic card farm.
6. Reduced motion and short-viewport paths show all scenes as scrollable semantic content; keyboard focus and link touch targets work.
7. First paint remains lean; image delivery uses WebP/optimized images; network failures degrade gracefully. No active audio or RSVP.
8. Exact approved-art SHA tests pass, TS/build successful, independent proof of production subpath assets, links checked, README updated.
9. Provide honest limitations: symbolic newer art not of same painted richness, no real physical iPhone tests unless actually done, original map pin unverified, no live deployment without access.
