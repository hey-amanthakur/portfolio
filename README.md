# Portfolio — Aman Thakur

A modern, animated personal portfolio website built with **React 19**, **TypeScript**, **Vite**, and **TailwindCSS**. Features dark/light theme, scroll-driven animations, and a build-time Instagram scraper that pulls live posts from [@yeh.safar.swaad.ka](https://www.instagram.com/yeh.safar.swaad.ka/).

---

## 🚀 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [TypeScript 6.0](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 8](https://vite.dev/) |
| **Styling** | [TailwindCSS 3.4](https://tailwindcss.com/) + custom CSS utilities |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **Forms** | [React Hook Form 7](https://react-hook-form.com/) + [Zod 4](https://zod.dev/) validation |
| **Testing** | [Vitest 4](https://vitest.dev/) + [Testing Library](https://testing-library.com/) (jsdom) |
| **Linting** | [ESLint 10](https://eslint.org/) + [typescript-eslint](https://typescript-eslint.io/) (strict type-checked) |
| **Scraping** | [Puppeteer 25](https://pptr.dev/) + [Stealth Plugin](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth) |
| **Font** | Plus Jakarta Sans (display) + Outfit (body) via Google Fonts |

---

## 📦 How the Project Works

### Architecture

This is a **single-page application (SPA)** with a flat component hierarchy organized by responsibility:

```
src/
├── main.tsx                      # Entry point — mounts <App /> into #root
├── App.tsx                       # Root layout — composes all section components
├── types/index.ts                # Shared TypeScript interfaces (prefixed with I)
├── data/content.ts               # All static site content (nav, projects, services, testimonials)
├── hooks/                        # Custom React hooks
│   ├── useScrollSpy.ts           # Tracks active section in navbar based on scroll position
│   └── useIntersectionObserver.ts # Triggers animations when elements enter viewport
├── components/
│   ├── layout/                   # Navbar.tsx, Footer.tsx
│   ├── sections/                 # Hero, About, Services, Portfolio, InstagramFeed, Contact
│   └── ui/                       # Reusable primitives — Button, Card, Badge, AnimatedText
├── styles/globals.css            # Tailwind imports + custom theme utilities
└── scraped/                      # Build-time generated Instagram posts JSON
    ├── instagram-posts.json      # Live scraped data
    └── instagram-posts.fallback.json # Static fallback when scraping fails
```

### Instagram Feed Scraping (Build-Time)

The portfolio includes a **Puppeteer-based scraper** ([scripts/scrape-instagram.ts](scripts/scrape-instagram.ts)) that runs automatically during `prebuild`. It uses a 3-strategy fallback chain:

1. **Strategy 1** — Parses embedded JSON from the public Instagram profile page (`__INITIAL_STATE__`).
2. **Strategy 2** — Opens individual post pages and intercepts GraphQL API responses to extract full metadata (image, caption, likes, comments).
3. **Strategy 3** — Falls back to scraping shortcodes from the profile grid DOM, then fetches each post individually.

If all strategies fail, the scraper preserves the previously scraped data or falls back to `instagram-posts.fallback.json`. The `InstagramFeed` component renders the resulting JSON at runtime.

### Data Flow

```
Build: scrape-instagram.ts → src/scraped/instagram-posts.json
                              ↓
Runtime: content.ts (static data) + instagram-posts.json (scraped data)
                              ↓
                    App.tsx → Section Components → UI Components
```

All static content lives in [src/data/content.ts](src/data/content.ts) as `as const` readonly arrays. TypeScript interfaces (in `src/types/index.ts`) use the `I` prefix convention (e.g., `IProject`, `IService`).

---

## 🛠 Getting Started

### Prerequisites

- **Node.js** 20+ (ESM project — `"type": "module"`)
- **Bun** 1.3+ (or `npm` as fallback)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd portfolio

# Install dependencies
npm install
```

### Development

```bash
# Start dev server with HMR (no scraping runs in dev mode)
npm run dev

# Visit http://localhost:5173
```

### Build & Preview

```bash
# Type-check, scrape Instagram posts, and build for production
npm run build

# Preview the production build locally
npm run preview
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with hot module replacement |
| `npm run build` | Type-check, scrape Instagram posts, then production build |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Run TypeScript type-checking (no emit) |
| `npm run lint` | Run ESLint with strict type-checked rules |
| `npm run test` | Run all Vitest tests once (jsdom environment) |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with v8 coverage report |
| `npm run scrape:instagram` | Manually scrape Instagram posts (default: 8 posts) |
| `npm run scrape:instagram:refresh` | Scrape with limit of 12 posts |

---

## 🎨 Design System

The theme is configured in [tailwind.config.js](tailwind.config.js):

- **Colors**: Primary = Saffron Orange (`#ff6b35`), Secondary = Teal/Mint (`#2ec4b6`)
- **Dark Mode**: Class-based toggle (`dark:` prefix)
- **Fonts**: Plus Jakarta Sans for headings, Outfit for body text
- **Shadows**: Flat design shadows (`shadow-flat-light`, `shadow-flat-dark`, `shadow-flat-primary`)
- **Border Radius**: Playful large radii (`xl-playful: 1.5rem`, `2xl-playful: 2rem`)
- **Animations**: Custom float, bounce-slow, spin-slow via keyframes

---

## 🧪 Testing

Tests use **Vitest** with **jsdom** environment and **Testing Library**. Custom mocks for `IntersectionObserver` and `framer-motion` are set up in [__tests__/setup.ts](__tests__/setup.ts).

```bash
# Run all tests
npm run test

# Run with coverage
npm run test:coverage
```

Test files live in `__tests__/` alongside a mirror of the `src/` component structure.

---

## 📐 Coding Guidelines

### General

- **Use TypeScript everywhere** — no `.js` files. All code is strictly typed.
- **ESM only** — the project uses `"type": "module"`. Use `import`/`export`, not `require`.
- **Path aliases** — use `@/` for `src/` and `@components/` for `src/components/` (configured via `vite-tsconfig-paths`).

### Naming Conventions

- **Interfaces**: PascalCase with `I` prefix → `IProject`, `INavLink`, `IContactForm`
- **Types / Type Aliases**: PascalCase without prefix → `PropsWithClassName`
- **Enums / Enum Members**: PascalCase enums, `UPPER_CASE` members
- **Components**: PascalCase function components → `Hero.tsx`, `Navbar.tsx`
- **Hooks**: camelCase with `use` prefix → `useScrollSpy`, `useIntersectionObserver`
- **Variables / Functions**: camelCase
- **Constants**: `UPPER_SNAKE_CASE` for module-level constants

### Component Patterns

- Use `FC` type for React function components: `export const Hero: FC = () => { ... }`
- Props with optional className use the `PropsWithClassName<T>` utility type
- Keep components in their own file matching the component name
- Organize by feature: `layout/`, `sections/`, `ui/`

### TypeScript Rules (Enforced by ESLint)

- **No `any`** — `@typescript-eslint/no-explicit-any: error`
- **No unsafe assignments/calls/returns** — strict type safety required
- **Explicit return types** on functions (expressions allowed without)
- **Type imports** — use `import type` for type-only imports
- **No non-null assertions** (`!`) — use optional chaining or nullish coalescing
- **No floating promises** — all promises must be `await`ed or handled
- **Nullish coalescing** over logical OR for default values (`??` not `||`)
- **Optional chaining** preferred over manual null checks
- **Unused vars** must be prefixed with `_`

### Styling

- **TailwindCSS first** — use utility classes for all styling
- **Dark mode** — always provide `dark:` variants for custom colors
- **Custom utilities** — add to `globals.css` under `@layer utilities` only if not achievable with Tailwind classes
- **Responsive** — design mobile-first; use Tailwind responsive prefixes (`sm:`, `md:`, `lg:`, `xl:`)

### Data & Types

- **Immutable data** — use `ReadonlyArray<T>` and `as const` for static content
- **Centralize content** — all text/data goes in `src/data/content.ts`, not inline in components
- **Define interfaces** in `src/types/index.ts` before using them

### Testing

- **One test file per component** in `__tests__/components/`
- Use **Testing Library** queries (`getByRole`, `findByText`, etc.)
- Mock `IntersectionObserver` and `framer-motion` are pre-configured
- Write tests that verify rendered output, not implementation details

### Git & Commits

- Use **conventional commit** format: `type: message` (e.g., `feat:`, `fix:`, `chore:`)
- Include emoji indicators when appropriate (e.g., `feat: :sparkles:`)
- Keep commits atomic — one logical change per commit

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create a feature branch** — `git checkout -b feature/your-feature-name`
3. **Install dependencies** — `bun install`
4. **Make your changes** following the coding guidelines above
5. **Run checks** before committing:
   ```bash
   npm run typecheck   # TypeScript must pass
   npm run lint        # ESLint must pass
   npm run test        # All tests must pass
   ```
6. **Commit** with a conventional commit message
7. **Push** and open a Pull Request

### PR Requirements

- All CI checks must pass (typecheck, lint, tests)
- Describe what changed and why
- Include screenshots for visual/UI changes
- Link any related issues

---

## 📄 License

MIT
