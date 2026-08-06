# Design System

This is the single reference for how the portfolio is styled. If you're touching markup, read this first — and preview everything live at **`/#design`** (the kitchen-sink page).

## Design tokens

Semantic tokens are defined as CSS custom properties in `src/styles/globals.css` and mapped to Tailwind colors in `tailwind.config.js`. They **flip automatically in dark mode** — never write `light-*` / `dark-*` pairs again.

| Token | Class prefix | Light | Dark | Used for |
|---|---|---|---|---|
| `canvas` | `bg-canvas`, `text-canvas` | `#FAF9F6` | `#0F0E17` | Page background |
| `surface` | `bg-surface` | `#FFFFFF` | `#1F1E26` | Cards, section backgrounds, raised panels |
| `line` | `border-line` | `#E8E5DF` | `#2E2C38` | Borders, dividers |
| `ink` | `text-ink`, `border-ink` | `#1A1917` | `#F0EDF5` | Primary text, strong borders |
| `muted` | `text-muted` | `#73706B` | `#A7A4B2` | Secondary text, meta |

Both tokens support opacity via the standard Tailwind suffix, e.g. `bg-canvas/50`.

### Accent palettes

- **primary** — Saffron orange (`400` = `#ff6b35`). Used for CTA fills, links, highlights.
- **secondary** — Mint/emerald (`400` = `#2ec4b6`). Used for success, "featured", secondary accents.

### Typography

| Role | Tailwind class | Font |
|---|---|---|
| Display/headings | `font-display` | Plus Jakarta Sans (black weights) |
| Body | `font-body` | Outfit |
| Code/meta/labels | `font-mono` | JetBrains Mono |

## Custom utilities

Defined in `src/styles/globals.css`.

| Utility | Usage |
|---|---|
| `rounded-xl-playful` / `rounded-2xl-playful` | Larger, friendlier corner radius (1.5rem / 2rem) |
| `shadow-flat-light` / `shadow-flat-dark` | Hard-offset shadow for the "neo-brutalist" press effect on ink elements |
| `shadow-flat-primary` / `shadow-flat-secondary` | Flat offset shadow tinted with the accent colors |
| `text-gradient-primary` / `text-gradient-secondary` / `text-gradient-mixed` | Gradient text fills |
| `glass-light` / `glass-dark` | Frosted backdrop-filter panels |
| `border-gradient` | Diagonal saffron→mint border |
| `bg-grid-pattern-light` / `bg-grid-pattern-dark` | Subtle background grid |
| `text-glow-orange` / `text-glow-teal` | Glowing text shadows |

### Flat shadow press recipe

Interactive elements that use flat shadows should press down on click:

```
shadow-flat-light dark:shadow-flat-dark active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all duration-150
```

## Component library

Reusable primitives live in `src/components/ui/`. Prefer them over raw class strings.

- **Button** — variants `primary` / `secondary` / `outline`, sizes `sm` / `md` / `lg`, `isLoading` state.
- **Badge** — variants `primary` / `secondary` / `outline` / `neutral`.
- **Card** — variants `default` / `flat-primary` / `flat-secondary` / `borderless`, hover `lift` / `tilt`.
- **SectionShell** — the shared section wrapper. Props: `id`, `aria-label`, `tone` (`canvas` | `surface`), `border` (`none` | `y` | `top` | `bottom`). All sections must use it.
- **RepoCard** — GitHub-style repo/contribution card (handles language dot, stars/forks, PR counts).
- **ProjectCard** — the large case-study card (image, tags, actions).
- **SpotlightCard**, **MagneticButton**, **SectionReveal**, **GlowingEffect**, **AnimatedCounter** — animation helpers.

## Dark mode

- Enabled via the `class` strategy on the `<html>` element (see `Navbar` for the toggle).
- Semantic tokens flip for you. The only `dark:` you should ever write is for **accent/opacity tweaks** (e.g. `dark:hover:bg-primary-400/5`), never for backgrounds/text/borders.
- Checklist before merging: toggle the theme and re-scan your section — text, borders, and surfaces must stay readable in both themes.

## Kitchen-sink page

Append `#design` to the URL to see every token, utility, and component variant rendered in both themes. It is the fastest way to copy working markup.

## Rules of thumb

- One semantic token per role — don't invent ad-hoc hex colors in JSX.
- New colors for real brand needs go into `tailwind.config.js` or `globals.css`, then get documented here.
- Never hotlink external images; download them to `public/assets/` and reference local paths.
