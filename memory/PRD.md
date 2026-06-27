# PRD — Aman Thakur Portfolio

## Original Problem Statement
> The images from instagram is not loading can you enhance the UX too so that it look like its a developer portfolio

## User Choices (Jan 27, 2026 iteration)
- Persona direction: **Developer-first**, Instagram/food retained as a secondary highlight
- Instagram fix: **Wire the existing local images** in `/public/instagram/` into the feed
- Visual theme: User said "surprise me" → modern dev-portfolio aesthetic, monospace accents, terminal vibes, kept warm primary/secondary palette for personality

## Architecture
- **Stack:** React 19 + TypeScript + Vite 8 + Tailwind v3 + framer-motion
- Single-page portfolio served by Vite dev server at `:3000` (supervisor-managed via `/app/frontend` proxy package)
- No backend — pure static SPA. Instagram content is scraped at build time via `scripts/scrape-instagram.ts` (Puppeteer) and persisted to `src/scraped/instagram-posts.json`
- Images: snapshots stored locally in `public/instagram/post-N.jpg` (bypasses Instagram CDN hot-link block)

## Personas
1. **Hiring manager / CTO** evaluating Aman for freelance / FT engineering work
2. **Founder** scouting a fullstack + AI engineer for an early-stage build
3. **Content / brand collaborator** discovering the side project

## What's Implemented — Jan 27, 2026

### Instagram images fix
- `src/scraped/instagram-posts.json` now references `/instagram/post-N.jpg` (local) instead of expiring `scontent.cdninstagram.com` URLs
- `InstagramFeed.tsx` adds a defensive `resolveImage()` mapper + `onError` handler that swaps to a local fallback if a CDN URL ever leaks back into the JSON

### Developer-first UX overhaul
- **Navbar:** `aman_thakur_` mono brand, food morph icon removed, nav labels renamed (Portfolio → Work, Swaad Feed → Off-Hours, Order Project → Hire Me)
- **Hero:** Default mode is `Developer`. Adds `$ whoami` command prompt, "Available for freelance · Pune, IN" availability pill, refined IDE mockup (line numbers, syntax-coloured TS interface, branch + `npm run dev` status bar), mono tech-stack ticker, GitHub + LinkedIn icon rail, subtle pill toggle for Off-hours persona
- **About:** "// the path so far" → "From hackathon hall → production stack."
- **Services:** Restaurant-menu language replaced with "What I build for clients" + mono `// stack` labels; `Chef's Special` → `most-booked`
- **Portfolio:** "Things I've shipped", "Pinned repositories" with `@jhonsnow456` handle, mono `// case studies` divider, mono search placeholder
- **Testimonials:** "What founders say."
- **Contact:** "Let's build something real."
- **Footer:** Mono `$ built with React + TypeScript · ©YYYY`
- **Instagram section:** Reframed as "Side project · 02 — Off the keyboard, I chase street food." Smaller 4-up grid with hover overlay (likes / comments / open), Instagram-gradient follow CTA strip

### Typography
- Added **JetBrains Mono** for all code / terminal / metadata accents (preloaded in `index.html`, exposed as `font-mono` in Tailwind)

### Infra fix
- Vite is now served via supervisor through `/app/frontend/package.json` proxy script (`yarn start` → `npx vite --host 0.0.0.0 --port 3000`)

## Verified
- `yarn typecheck` clean (TS strict mode)
- Light & dark mode visually verified via screenshots
- All 8 Instagram images render from local files
- Hero persona toggle (Developer ↔ Off-hours) animates cleanly
- All nav anchors scroll correctly; mobile nav and theme toggle preserved

## Backlog / Next Items
- **P1:** Re-scrape Instagram with the updated workflow so captions match downloaded images (currently the 8 local files were captured independently from the JSON captions). Add a `--download-images` flag to `scripts/scrape-instagram.ts` so future scrapes write `post-N.jpg` automatically.
- **P2:** Restore the broken `vitest` suite — install missing `@testing-library/dom` dependency and update component-level tests for the new copy.
- **P2:** Add an analytics/visit counter, a downloadable CV link in the hero, and a "What I'm reading / playing with" mini-section.
- **P3:** Generate an OG image (`/og-cover.png` referenced in `index.html` is 404).
