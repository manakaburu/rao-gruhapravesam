# Static release and GitHub Pages notes

- Source repo can be hosted on GitHub Pages via a Vite `dist` directory and an Actions workflow. Do not assume the repo name or GitHub account.
- `vite.config.ts` currently uses relative base `./`. This often works for project Pages; verify by actually serving the built `dist` under a test subdirectory, and adjust with the repository-specific base when known: `npm run build -- --base=/REPOSITORY_NAME/`.
- CSS URLs to texture assets should be inspected in the built CSS; Vite transforms some CSS paths correctly, so do not invent a bug based solely on their source spelling. JS/public asset references should use `import.meta.env.BASE_URL`, not absolute `/assets/...`.
- Suggested `.github/workflows/pages.yml` if appropriate: checkout, setup-node Node 22, `npm ci`, `npm run build`, upload-pages-artifact `./dist`, deploy-pages; permissions contents:read, pages:write, id-token:write. Configure Pages source to GitHub Actions. Do not push/publish without actual repo access.
- Static OG image at `public/assets/social-preview.jpg`; relative `og:image` from subpath can be ambiguous to crawlers, so configure absolute origin only after the actual GitHub Pages URL is known. Do not invent a URL. Use correct title and description now.
- Local `127.0.0.1` preview URL from the user's PC is not public and must never be included in share text or meta links.
- WhatsApp share text should include the live published URL only when known; absent that, share exact event facts/venue, not localhost.
- Static three `.ics` calendar downloads under `public/calendar/`: starts in UTC with no invented durations. Some calendars may display zero-duration event markers; this is more honest than inventing end times.
- Check privacy and licensing: generated artwork/user-provided artworks okay for this project; npm Fontsource fonts with relevant licenses. No commercial OST/Apple Music tracks may be embedded without separate permission. Audio not in current scope.
- Final steps after owner chooses repository: configure base, test build, commit, deploy through GitHub Pages, verify live URL, update meta/social and share link, smoke-test on iPhone/Android.
