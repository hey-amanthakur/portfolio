# PRD — Aman Thakur Portfolio

## Original Problem Statement
> The images from instagram is not loading can you enhance the UX too so that it look like its a developer portfolio
>
> (follow-up) actually its the same ui can you suggest something else like more of terminal feel and look

## User Choices (Jan 27, 2026 — Terminal Redesign)
- Color personality: **Phosphor green CRT** (classic hacker terminal — green-on-black)
- Default theme: **Force dark by default** (light still available via toggle)
- Command-prompt gimmick: **Go all-in** — every section opens with a typed terminal command + output
- Bonus touches: **Typewriter intro · CRT scanlines · Blinking cursor on hover**

## Architecture
- **Stack:** React 19 + TypeScript + Vite 8 + Tailwind 3 + framer-motion
- Single-page portfolio served by Vite dev server at `:3000` (supervisor-managed via `/app/frontend` proxy package)
- `/app/frontend/{src,public,scripts,__tests__,...}` are symlinks pointing back to `/app/...` so external linters/scanners can find sources
- No backend. Instagram content cached locally in `public/instagram/post-N.jpg`

## What's Implemented

### Bug fix (round 1) — Instagram images
- `src/scraped/instagram-posts.json` rewritten to local paths
- `InstagramFeed.tsx` adds defensive URL resolver + `<img onError>` fallback

### Terminal CRT redesign (round 2 — Jan 27, 2026)
- **Theme tokens** (`tailwind.config.js`):
  - Dark palette swapped to phosphor green: `dark.bg #0a0e0a`, `dark.text #a8e6a8`, `dark.muted #5e8a5e`
  - New `crt.bright #00ff66`, `crt.dim #3a5a3a`, `crt.warn #ffb000` accents
  - `box-shadow.crt-glow*` for phosphor glow effect
  - Animations: `blink`, `scanline`, `flicker`, `typewriter`
- **`globals.css`** — CRT scanline overlay (`.crt-overlay`), phosphor utilities (`.text-phosphor*`), reusable blinking cursor (`.cursor-blink-inline`), typewriter helper, terminal frame chrome, ASCII corner brackets, `.crt-flicker` subtle screen wobble
- **`main.tsx`** — Forces dark class on first paint unless user explicitly chose light
- **`useTypewriter.ts`** — Reusable typewriter hook, gated by IntersectionObserver
- **`<TerminalSection>`** — Shared section primitive: typed `aman@portfolio:~/portfolio (main) $ <cmd>` prompt, then output block with left rail + ASCII corner glyphs
- **Hero** — Full terminal experience:
  - Boot sequence (`[ OK ] loaded portfolio_v3.0`, etc.)
  - Typewriter `cat ./aman.profile` command
  - Glowing name with blinking block cursor
  - Persona toggle: `[1] developer` / `[2] off-hours` (keyboard-shortcut style)
  - CTA row: `$ ./hire-me.sh`, `$ ls projects/`, `$ open github`
  - Status line: `● session active · uptime 3y · shipped 12+ apps · wins SIH'22…`
- **Navbar** — macOS traffic-light window chrome + filename tabs (`hero.tsx · about.md · services.json · projects/ · reviews.log · side-quest.md`), animated underline on active tab, `$ ./hire-me.sh` CTA button
- **About** — `$ git log --oneline --since=2022` with commit hashes (`a3f9c12`, `b71d4e8`, …), year tags, `◆/◇` category glyphs, "press q to continue" footer
- **Services** — `$ ls -lh ./services/` directory listing layout with `[★]` markers, `└─ stack:` rail
- **Portfolio** — `$ ls projects/ && git pinned`, pinned repos as `▸ Name` rows, `--tag=*` filter buttons, `/ grep projects…` search with inline cursor, ASCII `case studies` divider, project cards with `$ git clone` / `$ open --live` actions
- **Testimonials** — `$ tail -n 4 ./reviews.log` with `[YYYY-MM-DD] ★★★★★` timestamps, `>` quote markers, name + role attribution
- **Instagram (Off-Hours)** — `$ curl -s … | jq '.posts'`, fake HTTP 200 header, polaroid grid with `01`–`08` corner indices and on-hover JSON-style overlay
- **Contact** — `$ ./hire-me.sh --interactive` menu: `[1] [2] [3]` service options + direct channels (email / WhatsApp / hours), terminating in `$ awaiting input ▊` blinking prompt
- **Footer** — ASCII signoff box, `$ echo "…"` line, social icon row, then a vim-style bottom status bar: `-- NORMAL -- main · utf-8 · tsx … react · vite · 100% · ln 1, col 1`

## Verified
- `yarn typecheck` ✅ passes
- `mcp_lint_javascript /app/frontend/src/**/*.tsx` ✅ no issues
- Local & external preview URLs → HTTP 200
- Dark (default) + light theme visually verified via screenshots
- Boot sequence, typewriter command, blinking cursor, scanline overlay all rendering
- All Instagram images load from local files
- Persona toggle, theme toggle, mobile drawer all functional

## Files Touched (round 2)
- `tailwind.config.js`, `src/styles/globals.css`, `src/main.tsx`, `src/App.tsx`
- `src/components/layout/{Navbar,Footer}.tsx`
- `src/components/sections/{Hero,About,Services,Portfolio,Testimonials,Contact,InstagramFeed}.tsx`
- **new:** `src/hooks/useTypewriter.ts`, `src/components/ui/TerminalSection.tsx`

## Backlog
- **P1:** Add a `--download-images` flag to `scripts/scrape-instagram.ts` so re-scrapes write local snapshots and keep captions↔images aligned
- **P2:** Restore vitest suite (missing `@testing-library/dom` dep — pre-existing breakage)
- **P2:** Update existing component tests to match new terminal copy (`Hi, I'm Aman` → `Aman Thakur` heading)
- **P2:** Generate `/og-cover.png` for the OG meta tag
- **P3:** Optional — keyboard-only persona switch (press `1` / `2`) and `?` for help modal listing all "commands"
