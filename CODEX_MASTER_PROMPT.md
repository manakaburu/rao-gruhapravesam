> **V5 supersession:** `RELEASE_V5.md` and the current code take priority over historical mobile-scrolling/music restrictions below.

> **RELEASE 4 OVERRIDE (2026-11-19):** This document includes older historical SoundCloud-only instructions. `AGENTS.md`, `CODEX_INTEGRATION_PROMPT.md`, `AUDIO_LICENSE.md`, and `RELEASE_QA_REPORT.md` are authoritative for the latest build. The site now bundles an original local instrumental audio file; the SoundCloud link is an external reference, NOT downloadable or embedded audio. Art is fixed and chapter headings arrive first in masked transitions.

> **2026-11-18 RESTORATION OVERRIDE:** The full project in this package already implements the new scroll-directed watercolor reveal and non-cropped Vindu Bhojanam artwork. Treat `APPLY_UPDATE.md` and edited source files as the final authority if old text below describes an opaque wash / old feast crop. Do not undo these fixes.

# ONE-TIME CODEX MASTER PROMPT — paste the ENTIRE text into Codex

You are the **lead frontend engineer, motion engineer, art-integrity reviewer and QA owner** for the final Rao Family Gruhapravesam digital invitation. The current workspace contains the prior working Phase 1 implementation AND a complete consolidated specification and asset set. **Finish the whole website in this task.** Do not pause after one phase, ask for routine approvals, rebuild the app from scratch, or fabricate missing art/facts.

## Step 0 — mandatory reading, in order
Read `AGENTS.md` (root) → `FINAL_IMPLEMENTATION_BLUEPRINT.md` → `reference/original_index.html` → `docs/CONTENT_LOCK.json` → `docs/SCENE_BLUEPRINT.md` → `docs/MOTION_SPEC.md` → `docs/ASSET_MANIFEST.md` → `docs/COPY_DECK.md` → `docs/QA_MATRIX.md` → `docs/DEPLOYMENT.md` → `qa/baseline/QA.md` → all relevant existing source. Treat root AGENTS as higher priority than any older "Phase 1 only" text. Check actual image files. Do not use storyboard/poster graphics not in manifest.

## Goal
Deliver a **complete, polished, responsive, production-buildable invitation** in **six interconnected chapters**, in one premium hand-painted **Kalamkari × watercolor** style. The user scrolls naturally, but the stage stays pinned while a cinematic illustrated story transforms in-place. A soft **watercolor pigment wash/bloom** leads and conceals each scene change; subtle independently movable floral/ornamental layers give depth, without turning the art into a generic slide deck or changing the approved paintings. Honor ceremony facts and fluent poetic Telugu as live DOM copy.

## Keep and extend—not restart
The workspace already has React + TypeScript + Vite + GSAP ScrollTrigger, the approved images and a first pinned scene, content lock, browser QA screenshots and a correct event summary. Refactor only where it improves quality. Retain the build commands and hardcoded approved-source artwork checksum tests. Move from a two-scene prototype into a **complete six-chapter experience** with a data-driven scene definition and a robust single choreography controller. Be careful of stale pin spacers on resize/unmount and of direct anchor jumps while a pin is active.

## Exact chapter sequence
1. **Sacred Threshold**: full approved `entrance.webp`/PNG fallback; ONE closed Flat 201 door, peacocks, toranam, deepams, stationary floor muggu. Animated entrance = slow floral/corner arrival, quiet lamp effects, subtle living ornamental accents; never animate door. Display original invocation and approved entrance verse. A gentle scroll cue, never a button purporting to swing door.
2. **Warm Welcome**: reveal approved `interior.webp`, using the existing safe crop to avoid its original open doorway and second muggu. Keep warm lamps, sofa and plants. Show hosts/family and exact welcome poem + invitation. Watercolor wash **covers old image before new interior comes into focus**; absolutely no mid-transition duplicate door, peacock over sofa, or hard split-card look.
3. **Divine Blessings**: use `blessings.webp` new supplied candidate artwork reverently. Center deity/shrine without distorting/cropping sacred iconography. Temple ornaments can animate, NOT the deity. Display Venkateswara devotional copy, with a quiet sandalwood wash and restrained brass lamp glow.
4. **Auspicious Ceremonies**: use `ceremonies.webp`/SVG as a **small decorative illustration** with illustrated schedule on parchment—not giant flat full-bleed art. Clear separate date/time blocks for Gruhapravesam Wed Nov 25 2026 **8:48 PM**, and Satyanarayana Vratham Thu Nov 26 2026 **8:30 AM onwards**, each with exact associated rituals. Telugu ceremony verse. Event times stay stable while reading, not moving text.
5. **Vindu Bhojanam**: use `feast.webp`/SVG as illustrated accent, and the playful approved Telugu three-line verse. The festive meal is Thu Nov 26 2026 **12:30 PM**. Banana leaf/dishes can reveal gently. Warm, celebratory, not slapstick.
6. **Closing / Directions**: use `closing.webp`/SVG as ornamental frame, NOT an invented building; inside it place actual static copy in HTML, family, venue, address, landmark, phone, poetic Telugu closing. Show functional directions with honest map link/fallback, WhatsApp Share with both dates correctly distinguished, calendar `.ics` downloads for three ceremony starts, call-to-contact. Do not render any RSVP or guestbook. The user has subsequently authorized only an opt-in official SoundCloud listening panel; see MOBILE_AUDIO_FIX_README.md.

## Motion implementation and visual contract
Follow `docs/MOTION_SPEC.md`. Do not animate scene images as a crude opacity-only crossfade. Use a textured watercolor alpha-mask on the opaque *incoming* scene. Its irregular edge grows across the outgoing scene in one pinned viewport. Never hard-switch behind a fully opaque parchment screen, and never blend two images at half opacity. Cinematic typography/stage progress remains intentional; wash doesn't obscure information without a readable holding beat. All transitions reverse with scroll. Parallax MUST use truly independent layers only (our supplied feathered foliage accents, SVG decorative ornaments, not forged separation of flattened original painting). Floor muggu and deity stay stationary. Decorative mandala may rotate slowly if actually independent and optional. For responsive reduced motion, show all six scenes in normal document flow, fully readable, no pin.

## Design contract
Use `#F5ECDD` parchment, `#913F37` madder, `#263B4D` indigo, `#65754D` mango green, `#B99558` brass, `#D9B995` sandalwood. Keep Cormorant Garamond (English display), Noto Serif Telugu and DM Sans (UI) from npm package. Text sharp, selectable and accessible. Mobile-first, mature editorial layout, lavish ornament where it supports content, no generic card farm, glassmorphism, fake 3D, orange gradients, repeated meaningless halo/mandalas, unrelated architecture or excessive animations. Respect alt text and `lang="te"`.

## Content & behavior must be EXACT
Use `docs/CONTENT_LOCK.json`; DO NOT take text from generated concept-board images. Main hosts **Sri Sana Rambabu & Smt. Bhavani**. Venue **Tranquility by Whitefield Constructions, Flat No: 201, Sangeet Nagar, Somajiguda, Hyderabad, Telangana 500082, India, near AIG**. Contact **+91 9666571316**. Gruhapravesam Nov 25 **8:48 PM**, Satyanarayana Vratham Nov 26 **8:30 AM**, lunch Nov 26 **12:30 PM**, all Asia/Kolkata. Original source has an incorrect WhatsApp snippet calling Nov 26 8:30 AM "Muhurtham"; NEVER repeat that error. Verify WhatsApp text and calendar ICS content against lock. No fabricated extra religious rites.

## Feature deliverables
- Premium cinematic stage + 6 chapters, responsive, scroll reversible + accessible static/reduced-motion fallback.
- Always-reachable Event Details / Skip animation route to a concise normal-flow summary after the stage; all event details also appear at their natural chapters. Provide semantic anchors and keyboard focus.
- Working call-to-contact, WhatsApp URL/share text, accurate Google Maps address search with supplied source link marked unverified if shown, 3 calendar downloads in `public/calendar`, OG/social image, valid title/meta, favicon, responsive layout.
- Robust GitHub Pages subpath handling (Vite `BASE_URL`), build scripts and an optional Actions workflow/template that doesn't assume repo name. No deployment claim without actual deployment.
- No backend, RSVP, guestbook, music autoplay, unauthorized audio hosting, or unsupported analytics; preserve the user-authorized SoundCloud player panel.

## Complete execution phases (internal milestones; DO NOT STOP after each)
1. **Audit and integrate**: read files, inventory, create dependency-aware plan, preserve approved art SHA.
2. **Foundation refinement**: correct Phase 1 wash/collage and composition, validate desktop/mobile.
3. **New chapters 3–4**: blessings and ceremonies, full Telugu/English copy.
4. **New chapters 5–6**: feast and closing with all functional links.
5. **Polish**: cohesive scene transitions, delicate independent motion, mobile typography and framing, SEO and navigation.
6. **Performance & accessibility**: optimize lazy loading, mask fallback, keyboard/screen reader, short viewports, reduced motion, links, integrity.
7. **QA and delivery**: `npm ci`, `npm run check`, `npm run build`, run real browser viewport checks if feasible; capture opening, every chapter, each transition midpoint and reverse. Check network/console, no horizontal scrolling, stage boundary continuity, reduced motion, and exact data. Fix failures yourself. Update docs with evidence and list any genuine limitations.

## Definition of DONE — not negotiable
- Six scenes implemented and visually coherent; no generic template sections, no unapproved fabricated art/architecture or copy.
- Native scroll pinned cinematic storytelling (not a long ordinary page) + genuine organic conceal/reveal transition (not a visible ghostly overlap) + reverse progress + graceful static fallback.
- Exact dates/hosts/address/poetry; no RSVP or audio autoplay; user-authorized SoundCloud panel with honest fallback; all links genuinely work; map not falsely called verified.
- Responsive at 375×667, 390×844, 768×1024, 1440×900 and short viewport; 320px minimum; Telugu legible; tap targets >=44px where possible; accessible focus/navigation.
- SHA check passes for approved artwork; clean production build, no runtime errors; assets resolve under nested GitHub Pages path.
- Deliver full source changes, updated README, final QA report, screenshots and forward/reverse recording if browser tooling available. Do **not** claim physical device/browser testing you didn't do.
- Report artistic limitation honestly: ceremony/feast/closing symbolic SVG accents are **not** full richly painted original masters. Do not label all six as equally approved artworks.

**Proceed with implementation now. Do not provide only instructions or request the next phase prompt. Complete and self-review everything in one end-to-end development effort.**
