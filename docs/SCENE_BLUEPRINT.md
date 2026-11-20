# Scene-by-scene compositional instructions (fixed)

**General rule:** One storytelling stage transforms in place. Every chapter is a full-fledged scene with readable real HTML over parchment. On narrow mobile, image and verse stack within a 100dvh layout when possible; when text cannot fit, switch to normal reading flow rather than clipping. Do not paste readable copy over busy sacred art. Art reference sizes 1448×1086; scene cropping must be non-destructive and documented.

## Chapter 1 · ముంగిట / Sacred Threshold (Entrance)
- Asset: `entrance.webp` with `entrance_master.png` fallback. Must show ONE closed door and 201 plaque and complete threshold muggu; never replace, animate door or add a second house/building.
- English: `Gruhapravesam Mahotsavam`; identity `The Rao's Family`; invocation exactly from lock.
- Telugu lines: `editorialDraftsNotSourceFacts.entrance`, live text.
- Composition: painting dominates ~55–65% width desktop with editorial copy in parchment area; use tasteful feathered edges to integrate painting. On mobile show door/201/muggu clearly; crop cautiously and make text legible above or below. Preserve peacocks if feasible; avoid unreadable 201 plaque.
- Motion: independent corner botanical elements enter slowly; small rotating ornamental mandala away from door/muggu may be used. Subtle flame light optional. Muggu floor **does not rotate**.

## Chapter 2 · స్వాగతం / Welcome Interior
- Asset: `interior.webp` with `interior_master.png` fallback; original shows independent open door and another muggu. Use precise CSS crop from current implementation `README` (~1004×753, source origin x=382, y=40) or carefully improve it so duplicate door/muggu are not visible. Do not invent a new living room.
- English: `Cordially Inviting You & Your Family`; hosts from lock; warm and sincere. Short English invitation paragraph can be drawn from original HTML, not invented family anecdotes.
- Telugu: `editorialDraftsNotSourceFacts.welcome`.
- Motion: entrance artwork disappears BEHIND cream/sandalwood wash; living room slowly resolves. Lamps/flowers as independent overlays only. Hold long enough to read.

## Chapter 3 · ఏడు కొండలవాడి ఆశీస్సులతో / Blessings
- Asset: `blessings.webp` or `blessings_master.png` (new unapproved candidate created for this package). Venkateswara painting symmetrical with shrine, lamps and peacock motifs.
- English: `With the divine blessings of Lord Venkateswara and our beloved elders` using source/lock; no chanting subtitles or fabricated Sanskrit shlokas.
- Telugu: `editorialDraftsNotSourceFacts.blessings`. Dignified, not quirky.
- Motion: soft sandalwood mist at entrance, lights softly brighten; deity still, no halo spinning directly on the face.

## Chapter 4 · మంగళ ఘడియలు / Auspicious Ceremonies
- The supplied `ceremonies.webp` painting depicts the kalash, lamps and homam. Its PNG fallback is `ceremonies_painterly_master.png`. The original foliage crops serve as quiet corner accents.
- Telugu: `editorialDraftsNotSourceFacts.ceremonies`.
- Source-aligned information: `Gruhapravesam`, **Wednesday November 25, 2026 at 8:48 PM**, rituals `Go-Puja`, `Dwarapalaka Puja`, `పాలు పొంగించడం (Palu Ponginchadam — Auspicious Milk-Boiling Ceremony)`; then `Satyanarayana Vratham`, **Thursday November 26, 2026 at 8:30 AM onwards**, rituals `Sacred Homam`, `Satyanarayana Vratham`, `Prasadam`.
- Layout: date/time is the visual priority, not small text laid over flames. Make two ceremony stops/subbeats inside this one scene or provide stable normal-flow summary to keep mobile legible. No fake "Vastu Homam" or renamed rituals.
- Motion: miniature kalash and flame accents appear via staggered masked reveal; no spinning religious objects.

## Chapter 5 · విందు భోజనం / Festive Lunch
- The supplied `feast.webp` shows the entire painted banana-leaf feast with lamps, peacocks and a floral border. Preserve its native 4:3 frame at every viewport. Its PNG fallback is `feast_painterly_master.png`.
- Telugu: `editorialDraftsNotSourceFacts.lunch` exactly; warm, slightly playful.
- English: `Vindu Bhojanam — Traditional Festive Lunch`; **Thursday November 26 2026 at 12:30 PM**.
- Motion: illustrated banana leaf/food elements can reveal in a few graceful staggered beats if isolated SVG layers; do not animate every dish endlessly.

## Chapter 6 · Closing / Our New Abode
- The supplied `closing.webp` floral frame surrounds the live venue address. Its PNG fallback is `closing_painterly_master.png`.
- Telugu: `editorialDraftsNotSourceFacts.closing`.
- English: `Your presence and blessings will make our new home complete` (from source) and a brief sincere close; family from lock.
- Address: `Tranquility by Whitefield Constructions, Flat No: 201, Sangeet Nagar, Somajiguda, Hyderabad, Telangana 500082, India`, `Near AIG`, `+91 9666571316`.
- Actions: Directions / search address on Maps (without verified pin claims), Share invitation on WhatsApp (correct 2-date story), Add ceremony to calendar (3 links to `.ics`), Call family. No RSVP.
- End: let pinned scroll settle and release to an accessible compact static event summary, not a blank end or endless loop.
