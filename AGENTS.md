# Agents — Project Guide

## Overview

Single-page React portfolio for Aman Thakur — full-stack developer & food blogger. Features dark/light theme, scroll animations, build-time Instagram scraping, and a WhatsApp-style contact section.

## Tech Stack

| Layer | Tool |
|---|---|
| Runtime | Bun 1.3 |
| Framework | React 19 + TypeScript 6 |
| Build | Vite 8 |
| Styling | TailwindCSS 3.4 + `globals.css` utilities |
| Animations | Framer Motion 12 |
| Icons | Lucide React |
| Form | React Hook Form 7 + Zod 4 |
| Testing | Vitest 4 + Testing Library (jsdom) |
| Linting | ESLint 10 + typescript-eslint (strict) |
| Scraper | Puppeteer 25 + stealth plugin |

## Directory Structure

```
src/
├── main.tsx                         # Entry — mounts <App />
├── App.tsx                          # Root — composes sections (hash-route: #design)
├── types/index.ts                   # Shared interfaces (I-prefixed)
├── constants/index.ts               # Single source of truth for magic strings (routes, section ids/labels, themes, personas, service ids, filter) — edit strings HERE only
├── data/                            # Content split by domain (see index.ts barrel)
│   ├── index.ts                     # Barrel re-exporting all data
│   ├── site.ts, services.ts, projects.ts, instagram.ts,
│   ├── testimonials.ts, github.ts, milestones.ts
├── hooks/
│   ├── useIntersectionObserver.ts   # Viewport detection for animations
│   └── useScrollSpy.ts             # Active section tracking in navbar
├── components/
│   ├── layout/                      # Navbar.tsx, Footer.tsx
│   ├── sections/                    # Hero, About, Services, Portfolio,
│   │                                  Testimonials, InstagramFeed, Contact
│   └── ui/                          # Button, Card, Badge, SectionShell,
│                                      RepoCard, ProjectCard, DesignSystemPreview…
├── utils/                           # Pure helpers (languageColor, …)
├── assets/                          # hero.png, svg icons
├── scraped/
│   └── instagram-posts.fallback.json # Static fallback (versioned)
└── styles/globals.css               # Tailwind layers + semantic token vars

scripts/
├── scrape-instagram.ts              # Puppeteer scraper — runs on prebuild
└── scrape-github-pinned.ts          # GitHub pinned repos scraper

public/
├── assets/projects/, instagram/, avatars/   # Local images (no external hotlinks)
├── instagram/                       # Downloaded IG images (shortcode-named) — gitignored
├── scraped/instagram-posts.json     # Scraped posts JSON (generated, gitignored)
├── favicon.svg, icons.svg, robots.txt, sitemap.xml
```

## Component Conventions

- **FC type** for all components (no `React.FC`)
- Named exports + default export per file
- Props inline-typed at the function, or via `PropsWithClassName<T>` from `@/types`
- Motion components from Framer Motion wrapped in `motion.div` / `motion.a` etc.
- `useIntersectionObserver` for scroll-triggered animations
- `key` prop on mapped elements for animation stagger
- Sections use `<SectionShell>` (never hand-write the section shell classes)
- Reuse primitives (`Button`, `Card`, `Badge`, `RepoCard`, `ProjectCard`) over raw class strings

## Data Flow

- Content is split per domain under `src/data/`, re-exported from `src/data/index.ts` (import via `@/data`)
- Instagram images: scraped at build time → downloaded to `public/instagram/` → served as static assets
- Fallback chain: scraped JSON > hardcoded `instagramPosts[]` in `src/data/instagram.ts`
- GitHub repos/contributions: static arrays in `src/data/github.ts`; refresh with `bun run scrape:github`
- Portfolio filter chips derive from `projectCategories` in `src/types` — no manual filter sync

## Styling

- Semantic tokens (`bg-canvas`, `bg-surface`, `border-line`, `text-ink`, `text-muted`) auto-flip in dark mode via CSS vars in `globals.css` — never use `light-*` / `dark-*` pairs
- Accent palettes in `tailwind.config.js`: `primary-400` (#ff6b35) saffron, `secondary-400` (#2ec4b6) mint
- Custom utilities: `shadow-flat-*`, `rounded-*playful`, `text-gradient-*`, `glass-*`, `bg-grid-pattern-*`
- Fonts: Plus Jakarta Sans (`font-display`), Outfit (`font-body`)
- Full reference: `DESIGN.md` + live kitchen-sink at `/#design`

## Testing

- `bun run test` — runs Vitest once (**not** `bun test`, which uses Bun's own runner and fails on `@/` path aliases)
- `bun run test:watch` — watch mode
- `bun run test:coverage` — with coverage report
- Files in `__tests__/` mirror `src/` structure
- Setup in `__tests__/setup.ts` (mocks matchMedia, IntersectionObserver, fetch)

## Scripts

| Command | Action |
|---|---|
| `bun run dev` | Dev server |
| `bun run build` | Typecheck + production build |
| `bun run typecheck` | TypeScript check only |
| `bun run test` | Run tests (Vitest) |
| `bun run lint` | ESLint |
| `bun run scrape:instagram` | Manual IG scrape |
| `bun run scrape:instagram:refresh` | Scrape up to 12 posts |
| `bun run scrape:github` | Refresh GitHub pinned repos |

All commands use Bun under the hood. The `prebuild` hook runs the Instagram scraper natively — no `tsx` needed since Bun runs TypeScript directly.

## Build-Time Scraping

`prebuild` runs `scripts/scrape-instagram.ts`. It:
1. Launches headless Chromium via Puppeteer
2. Visits each shortcode in `SHORTCODES` array
3. Extracts `og:image` + `og:description` meta tags
4. Downloads each image to `public/instagram/{shortcode}.jpg`
5. Writes `public/scraped/instagram-posts.json` with local paths

The feed then fetches that JSON at runtime (`InstagramFeed`), falling back to
the tracked posts in `src/data/instagram.ts` when the file is absent. If the
scraper finds no posts and no output exists, it copies
`src/scraped/instagram-posts.fallback.json` into place.

To add new posts: add the shortcode to `SHORTCODES` in the scraper script.

`bun run scrape:github` runs `scripts/scrape-github-pinned.ts`, which fetches pinned repos from the GitHub API and rewrites the static arrays in `src/data/github.ts`. Both scrapers are optional (build succeeds without network access).

## TypeScript Rules

- Strict mode enabled — no `any`, no implicit `any`
- `readonly` on interfaces and arrays
- No PropTypes — all typing via TypeScript
- Interface naming: `I` prefix (e.g., `IProject`, `IInstagramPost`)
- Use `type` for unions/utility types, `interface` for object shapes

## Git Conventions

- Conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`, `test:`
- Push to `main` only; no feature branches
- Commit granular: one logical change per commit
