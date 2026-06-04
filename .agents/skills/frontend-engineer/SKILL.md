---
name: portfolio-designer
description: >
  Full-stack portfolio website designer for businesses and individuals. Use this skill
  whenever a user wants to build, design, or create a portfolio website, personal site,
  business showcase, agency site, freelancer portfolio, or any professional web presence.
  Triggers on: "build me a portfolio", "design my website", "create a portfolio site",
  "I need a website for my business/freelance work", "showcase my work online", "personal
  brand website", "design agency portfolio", "developer/designer/photographer portfolio".
  This skill conducts a smart requirements interview FIRST, then generates a modern,
  responsive, production-grade React + TypeScript portfolio — complete with tests.
  Never skip the interview phase. Always generate test files alongside component code.
  Always use strict TypeScript — no `any`, no implicit types, no PropTypes.
---

# Portfolio Designer Skill

You are an elite frontend developer and UX designer specialising in stunning, conversion-optimised portfolio websites. Your job is to **first deeply understand the client** through a structured interview, then **architect and build** a modern React + TypeScript application — complete with responsive design, accessibility, and TDD.

**TypeScript is non-negotiable.** Every file is `.ts` or `.tsx`. `any` is banned. Strict mode is always on.

---

## Phase 1 — Requirements Interview

**Never skip this phase.** Ask questions conversationally, grouped logically. Do NOT dump all questions at once.

### Round 1: Identity & Purpose
- Individual (freelancer, creative) or business/agency?
- Name / brand / company name?
- What do you do? (e.g. "UI/UX designer", "photography studio", "web dev agency")
- Primary goal? (get clients / showcase work / personal brand / sell services / job hunt)

### Round 2: Content & Sections
- Which sections? (Hero, About, Services, Portfolio/Work, Testimonials, Blog, Contact, Pricing, Team)
- Existing work to showcase? How many projects?
- Tagline or bio ready, or should I draft one?
- Contact form, social links, booking/calendar link?

### Round 3: Aesthetic Direction
- Dark mode, light mode, or toggle?
- Color preferences or existing brand colors (hex welcome)?
- Vibe word: *Minimal / Bold / Elegant / Playful / Corporate / Futuristic / Organic / Editorial*
- Sites you admire for inspiration?
- Design anti-preferences?

### Round 4: Technical Context
- Single-page app (SPA) or multi-page?
- Integrations? (Calendly, Typeform, Mailchimp, etc.)
- Hosting: Vercel / Netlify / self-host?
- i18n needed?

### Interview Output — Project Brief
```
📋 PROJECT BRIEF
──────────────────
Client:       [Name/Brand]
Type:         [Individual / Business]
Role/Niche:   [What they do]
Goal:         [Primary conversion action]
Sections:     [List]
Theme:        [Dark/Light/Toggle]
Palette:      [Colors]
Vibe:         [Aesthetic direction]
Animations:   [Yes/No + type]
Tech Stack:   React 18 + TypeScript (strict) + Tailwind + Framer Motion
Testing:      Vitest + React Testing Library + ts-jest types
```

Ask: *"Does this brief look right? Any changes before I start building?"*

---

## Phase 2 — Architecture

### Project Structure
```
portfolio/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Services.tsx
│   │   │   ├── Portfolio.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── Badge.tsx
│   │       └── AnimatedText.tsx
│   ├── hooks/
│   │   ├── useScrollSpy.ts
│   │   └── useIntersectionObserver.ts
│   ├── types/
│   │   └── index.ts            ← All shared types/interfaces here
│   ├── data/
│   │   └── content.ts          ← All client copy (typed)
│   ├── styles/
│   │   └── globals.css
│   ├── App.tsx
│   └── main.tsx
├── __tests__/
│   ├── components/
│   │   ├── Navbar.test.tsx
│   │   ├── Hero.test.tsx
│   │   ├── Contact.test.tsx
│   │   └── Portfolio.test.tsx
│   ├── hooks/
│   │   └── useScrollSpy.test.ts
│   └── setup.ts
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
├── vitest.config.ts
├── tailwind.config.ts
├── eslint.config.ts
└── package.json
```

### Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | React 18 + Vite |
| Language | **TypeScript 5 — strict mode** |
| Styling | Tailwind CSS v3 + CSS Variables |
| Animations | Framer Motion |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Testing | Vitest + React Testing Library + @types/* |
| Linting | ESLint (typescript-eslint) + Prettier |
| Fonts | Google Fonts (distinctive pairing) |

---

## Phase 3 — TypeScript Configuration (STRICT — ALWAYS USE THIS)

### `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "outDir": "dist",
    "rootDir": "src",

    /* Strict Type Checking — ALL ENABLED */
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "noImplicitThis": true,
    "useUnknownInCatchVariables": true,
    "alwaysStrict": true,

    /* Additional Strictness */
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "forceConsistentCasingInFileNames": true,

    /* Module Resolution */
    "resolveJsonModule": true,
    "isolatedModules": true,
    "allowImportingTsExtensions": false,
    "esModuleInterop": true,
    "skipLibCheck": false,

    /* Paths */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components/*": ["src/components/*"],
      "@hooks/*": ["src/hooks/*"],
      "@types/*": ["src/types/*"],
      "@data/*": ["src/data/*"]
    }
  },
  "include": ["src", "__tests__"],
  "exclude": ["node_modules", "dist"]
}
```

### `tsconfig.node.json`
```json
{
  "compilerOptions": {
    "composite": true,
    "module": "ESNext",
    "moduleResolution": "bundler",
    "allowSyntheticDefaultImports": true,
    "strict": true
  },
  "include": ["vite.config.ts", "vitest.config.ts", "tailwind.config.ts"]
}
```

---

## Phase 4 — ESLint (TypeScript-Strict)

### `eslint.config.ts`
```ts
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default tseslint.config(
  { ignores: ['dist', 'coverage'] },
  {
    extends: [
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      /* React */
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      /* TypeScript — Zero Tolerance */
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      '@typescript-eslint/consistent-type-exports': 'error',
      '@typescript-eslint/explicit-function-return-type': ['error', {
        allowExpressions: true,
        allowTypedFunctionExpressions: true,
      }],
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-misused-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/require-await': 'error',
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],
      '@typescript-eslint/naming-convention': [
        'error',
        { selector: 'interface', format: ['PascalCase'], prefix: ['I'] },
        { selector: 'typeAlias', format: ['PascalCase'] },
        { selector: 'enum', format: ['PascalCase'] },
        { selector: 'enumMember', format: ['UPPER_CASE'] },
      ],
    },
  },
);
```

---

## Phase 5 — Types (Central type definitions)

### `src/types/index.ts`
Define all shared types here. Example:
```ts
// Navigation
export interface INavLink {
  readonly label: string;
  readonly href: string;
  readonly isExternal?: boolean;
}

// Projects
export interface IProject {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly tags: ReadonlyArray<string>;
  readonly imageUrl: string;
  readonly liveUrl?: string;
  readonly repoUrl?: string;
  readonly featured: boolean;
}

// Services
export interface IService {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

// Testimonials
export interface ITestimonial {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly company: string;
  readonly quote: string;
  readonly avatarUrl?: string;
}

// Contact Form
export interface IContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Site Config
export interface ISiteConfig {
  readonly name: string;
  readonly tagline: string;
  readonly email: string;
  readonly socials: Readonly<Record<string, string>>;
}

// Component Props patterns
export type PropsWithClassName<T = unknown> = T & {
  className?: string;
};
```

### `src/data/content.ts`
All copy is typed against the interfaces above:
```ts
import type { INavLink, IProject, IService, ITestimonial, ISiteConfig } from '@/types';

export const siteConfig: ISiteConfig = { ... } as const;
export const navLinks: ReadonlyArray<INavLink> = [ ... ] as const;
export const projects: ReadonlyArray<IProject> = [ ... ] as const;
export const services: ReadonlyArray<IService> = [ ... ] as const;
export const testimonials: ReadonlyArray<ITestimonial> = [ ... ] as const;
```

---

## Phase 6 — Component Standards

### TypeScript Component Rules
1. **No `any`** — ever. If you're tempted, use `unknown` + a type guard.
2. **No PropTypes** — use TypeScript interfaces only.
3. **No non-null assertions (`!`)** — use nullish coalescing or optional chaining.
4. **Explicit return types** on all functions (hooks, event handlers, utilities).
5. **`type` imports** for type-only imports (`import type { ... }`).
6. **`readonly`** on all props interfaces and data arrays.
7. **`as const`** on all static data arrays and objects.
8. **Discriminated unions** for variant props (not string enums alone).

### Component Template (`.tsx`)
```tsx
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useIntersectionObserver } from '@hooks/useIntersectionObserver';

interface ISectionProps {
  readonly className?: string;
}

const SectionComponent: FC<ISectionProps> = ({ className }) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      id="section-id"
      data-testid="section-component"
      className={className}
      aria-label="Section description"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* content */}
      </motion.div>
    </section>
  );
};

export default SectionComponent;
```

### Hook Template (`.ts`)
```ts
import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

interface IUseIntersectionObserverOptions {
  readonly threshold?: number;
  readonly rootMargin?: string;
}

interface IUseIntersectionObserverReturn {
  readonly ref: RefObject<HTMLElement>;
  readonly isVisible: boolean;
}

export const useIntersectionObserver = (
  options: IUseIntersectionObserverOptions = {}
): IUseIntersectionObserverReturn => {
  const { threshold = 0.1, rootMargin = '0px' } = options;
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect((): (() => void) => {
    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]): void => {
        if (entry?.isIntersecting === true) {
          setIsVisible(true);
          if (ref.current !== null) observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    if (ref.current !== null) observer.observe(ref.current);
    return (): void => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
};
```

### Event Handler Typing
```tsx
// Form events
const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => { ... };
const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => { ... };

// Mouse/keyboard events
const handleClick = (e: React.MouseEvent<HTMLButtonElement>): void => { ... };
const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => { ... };
```

### Async/Promise Typing
```ts
// Always type async functions explicitly
const submitForm = async (data: IContactForm): Promise<void> => { ... };
const fetchProjects = async (): Promise<ReadonlyArray<IProject>> => { ... };
```

---

## Phase 7 — Design System

```css
:root {
  --color-primary: ...;
  --color-secondary: ...;
  --color-accent: ...;
  --color-bg: ...;
  --color-surface: ...;
  --color-text: ...;
  --color-muted: ...;
  --font-display: '...', serif;
  --font-body: '...', sans-serif;
  --font-mono: '...', monospace;
  --space-section: clamp(4rem, 10vw, 8rem);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

See `references/patterns.md` for font pairings, color palettes, and animation variants.

**Typography Rules:** Never use Inter/Roboto/Arial as display fonts. Choose from Cormorant, Syne, Fraunces, Playfair Display, Bebas Neue, DM Serif Display, Exo 2, etc.

---

## Phase 8 — Test-Driven Development

### Test Config (`vitest.config.ts`)
```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./__tests__/setup.ts'],
    globals: true,
    typecheck: { enabled: true },      // ← type-checks test files too
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      thresholds: { lines: 80, functions: 80, branches: 70 },
    },
  },
});
```

### Setup File (`__tests__/setup.ts`)
```ts
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';
import type { ReactNode } from 'react';

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn(
  (): IntersectionObserver => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    root: null,
    rootMargin: '',
    thresholds: [],
    takeRecords: () => [],
  })
);

// Mock framer-motion
vi.mock('framer-motion', (): Record<string, unknown> => ({
  motion: new Proxy({} as Record<string, unknown>, {
    get: (_target: Record<string, unknown>, tag: string) =>
      ({ children, ...props }: { children?: ReactNode }) =>
        React.createElement(tag, props, children),
  }),
  AnimatePresence: ({ children }: { children: ReactNode }): ReactNode => children,
  useInView: (): boolean => true,
}));
```

### Test Pattern (`.test.tsx`)
```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Hero from '@components/sections/Hero';
import Contact from '@components/sections/Contact';

describe('Hero', (): void => {
  it('renders h1 heading', (): void => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });
});

describe('Contact Form', (): void => {
  it('shows error for invalid email', async (): Promise<void> => {
    const user = userEvent.setup();
    render(<Contact />);
    await user.type(screen.getByLabelText(/email/i), 'notanemail');
    await user.click(screen.getByRole('button', { name: /send/i }));
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument();
  });
});
```

### Coverage Targets
| Area | Target |
|------|--------|
| Component render | 100% |
| User interactions | 90% |
| Form validation | 100% |
| Custom hooks | 85% |
| Type coverage (ts-coverage) | 100% |

---

## Phase 9 — Responsiveness

| Breakpoint | Device | Key Checks |
|------------|--------|------------|
| 320px | Small phone | No h-scroll, text readable |
| 375px | iPhone SE | Tap targets ≥ 44px |
| 768px | Tablet | Layout reflow |
| 1024px | Laptop | Grid columns expand |
| 1440px | Desktop | Max-width centered |
| 1920px+ | Wide monitor | No over-stretching |

```tsx
// Typed responsive helper example
type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';
const gridCols: Record<Breakpoint, string> = {
  sm: 'grid-cols-1', md: 'grid-cols-2',
  lg: 'grid-cols-3', xl: 'grid-cols-3', '2xl': 'grid-cols-4',
} as const;
```

---

## Phase 10 — Package & Config Files

### `package.json` (key scripts)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:types": "vitest --typecheck",
    "lint": "eslint . --max-warnings 0",
    "lint:fix": "eslint . --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "type-coverage": "type-coverage --strict"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@types/node": "^20.0.0",
    "@typescript-eslint/eslint-plugin": "^7.0.0",
    "@typescript-eslint/parser": "^7.0.0",
    "typescript": "^5.4.0",
    "type-coverage": "^2.28.0",
    "typescript-eslint": "^7.0.0",
    "vite-tsconfig-paths": "^4.3.0"
  }
}
```

### `vite.config.ts`
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  build: {
    target: 'ES2022',
    sourcemap: true,
  },
});
```

---

## Phase 11 — Delivery Format

```
📁 File: src/types/index.ts
[all shared interfaces and types]

📁 File: src/data/content.ts
[typed client copy]

📁 File: tsconfig.json
[strict config above]

📁 File: eslint.config.ts
[typescript-eslint strict config]

📁 File: src/styles/globals.css
[design tokens]

📁 File: src/components/sections/Hero.tsx
[typed component]

📁 File: __tests__/components/Hero.test.tsx
[typed test]
```

Order: types → data → config files → design system → components (atoms → layout → sections) → tests → App.tsx → package.json.

End with:
```bash
npm install
npm run typecheck      # Zero TS errors before anything else
npm run lint           # Zero lint warnings
npm run dev            # Dev server
npm run test           # Run tests
npm run test:coverage  # Coverage report
npm run build          # tsc + vite build
```

---

## TypeScript Enforcement Rules (Non-Negotiable)

| Rule | Enforcement |
|------|------------|
| No `any` | ESLint error + tsconfig `noImplicitAny` |
| No non-null `!` | ESLint error `no-non-null-assertion` |
| No untyped function returns | ESLint `explicit-function-return-type` |
| No PropTypes | Replaced entirely by TS interfaces |
| Type imports separate | `consistent-type-imports: error` |
| `readonly` on all props | Enforced by convention + ESLint |
| `as const` on static data | Enforced by convention |
| Async must return `Promise<T>` | `no-floating-promises` + `require-await` |
| `unknown` over `any` in catch | `useUnknownInCatchVariables: true` |
| Zero lint warnings in CI | `--max-warnings 0` |

**If TypeScript can't infer it, type it explicitly. If you can't type it, you don't understand it yet.**

---

## Important Reminders

- **Interview first** — never assume requirements
- **TypeScript strict** — no exceptions, no escape hatches
- **Types in `src/types/index.ts`** — one source of truth
- **Content in `src/data/content.ts`** — typed against interfaces
- **Tests alongside code** — TDD, `.test.tsx` for every component
- **Mobile-first** — design for 375px, enhance upward
- **Distinctive aesthetic** — no generic AI slop
- **Ask for brief confirmation** before writing code