# Contributing

Thanks for wanting to contribute to Aman's portfolio. This guide gets you running and explains the conventions so PRs land cleanly.

## Prerequisites

- [Bun](https://bun.sh) 1.3+ (the repo uses Bun for install, scripts, and running TypeScript directly)
- Node 20+ (optional, for editor tooling)

## Quick start

```bash
bun install          # install dependencies
bun run dev          # start Vite dev server (localhost:5173)
```

> **Note:** run the test suite with `bun run test`, not `bun test`. `bun test` uses Bun's own runner which doesn't resolve the `@/` and `@components/` path aliases and will fail. The project's real test runner is Vitest.

## Commands

| Command | Action |
|---|---|
| `bun run dev` | Dev server |
| `bun run build` | Typecheck + production build |
| `bun run typecheck` | TypeScript strict check |
| `bun run lint` | ESLint |
| `bun run test` | Vitest (once) |
| `bun run test:watch` | Vitest (watch) |
| `bun run scrape:instagram` | Re-scrape the Instagram feed |
| `bun run scrape:github` | Re-scrape GitHub pinned repos |
| `bun run build` | Full production build |

## Project structure

```
src/
├── components/
│   ├── layout/          # Navbar, Footer
│   ├── sections/        # Hero, About, Services, Portfolio, ...
│   └── ui/              # Reusable primitives (Button, Card, Badge, ...)
├── data/                # All content, split by domain (projects.ts, services.ts, ...)
├── hooks/               # useIntersectionObserver, useScrollSpy
├── types/               # Shared interfaces (I-prefixed)
└── utils/               # Pure helpers (languageColor, ...)
```

## Adding a project (common task)

1. Open `src/data/projects.ts`.
2. Add an object matching the `IProject` interface:

   ```ts
   {
     id: 'my-project',
     title: 'My Project',
     description: 'What it is and why it matters.',
     tags: ['TypeScript', 'React'],
     imageUrl: '/assets/projects/my-project.jpg',
     category: 'Web',                       // pick from projectCategories in src/types
     liveUrl: 'https://...',
     repoUrl: 'https://github.com/...',
     featured: false,
   }
   ```

3. Add the image to `public/assets/projects/` (reference it by its local `/assets/projects/...` path — no external URLs).
4. **Filters update automatically** — filter chips are derived from `projectCategories`, so just add a new category there if this project doesn't fit an existing one.

## Adding an open source contribution

Open `src/data/github.ts` and add an entry to `openSourceContributions`:

```ts
{
  id: 'oss-org-repo',
  org: 'org',
  name: 'repo',
  description: 'What you contributed.',
  url: 'https://github.com/org/repo',
  language: 'TypeScript',
  prCount: 2,
}
```

## Updating the Instagram feed

- The fallback posts live in `src/data/instagram.ts`.
- `bun run scrape:instagram` re-scrapes at build time and writes `src/scraped/instagram-posts.json` (gitignored), which takes precedence over the fallback when present.
- New shortcodes go in `SHORTCODES` in `scripts/scrape-instagram.ts`.

## Styling / design system

Read `DESIGN.md` first. Key rules:

- Use semantic tokens (`bg-canvas`, `bg-surface`, `border-line`, `text-ink`, `text-muted`) — they auto-flip in dark mode. **Do not** introduce `light-*`/`dark-*` pairs.
- Wrap every section in `<SectionShell>` instead of hand-writing the section shell classes.
- Use the primitives (`Button`, `Card`, `Badge`, `RepoCard`, `ProjectCard`) instead of raw `<a>`/`<div>` class strings where possible.
- Flat shadow press effect: `shadow-flat-*` + `active:translate-x-0.5 active:translate-y-0.5 active:shadow-none`.
- Preview every token and variant at `/#design` (the kitchen-sink page).

## Conventions

- `FC` type for components; named export + default export per file.
- Strict TypeScript — no `any`, `readonly` on interfaces and arrays.
- Interfaces use the `I` prefix.
- Conventional commits: `feat:`, `fix:`, `chore:`, `refactor:`, `test:`.

## PR checklist

- [ ] `bun run typecheck` passes
- [ ] `bun run lint` passes
- [ ] `bun run test` passes
- [ ] `bun run build` passes
- [ ] No `light-*` / `dark-*` token pairs introduced
- [ ] Images referenced from `public/assets/` (no external hotlinks)
