# Start here — updated cinematic story project

This ZIP was built directly from the uploaded `RAO_GRUHAPRAVESAM_FINAL_SOURCE_WITH_AUDIO(1).zip`.
The original six scenes and art are retained. See `RELEASE_V5.md` for change
list and verified tests, and `CODEX_MERGE_V5_PROMPT.md` for the exact Codex
merge instruction.

Run from this directory on Windows (Node >= 22.12):

```sh
npm ci
npm run check
npm run dev -- --host 0.0.0.0 --port 5173
```

If the local server is already on port 5173, stop the old process first.

Autoplay is attempted on page load but cannot be forced past modern browser
restrictions. A tap-to-play control remains available. The exact A. Kanya
Kumari violin recording is not included; the bundled locally usable original
instrumental is selected automatically unless an appropriately licensed MP3
is supplied under `public/audio/mahaganapathim-violin.mp3`.
