# Animation Patterns, Design Tokens & TypeScript Utilities

## Framer Motion Typed Variants

```ts
import type { Variants } from 'framer-motion';

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};
```

---

## Font Pairings by Aesthetic

| Vibe | Display Font | Body Font |
|------|-------------|-----------|
| Luxury / Editorial | Cormorant Garamond | DM Sans |
| Bold / Modern | Bebas Neue | IBM Plex Sans |
| Creative / Playful | Syne | Nunito |
| Elegant / Classic | Playfair Display | Lato |
| Tech / Minimal | Space Grotesk | IBM Plex Sans |
| Organic / Warm | Fraunces | Source Serif 4 |
| Futuristic | Exo 2 | Rajdhani |
| Editorial | DM Serif Display | DM Sans |

---

## Color Palettes

### Dark Luxury
```css
--color-bg: #0C0C0C; --color-surface: #161616;
--color-primary: #C9A84C; --color-text: #F5F0E8; --color-muted: #888;
```
### Deep Navy
```css
--color-bg: #0A1628; --color-surface: #0F2040;
--color-primary: #4F9CF9; --color-accent: #FF6B6B; --color-text: #E8F0FE;
```
### Warm Minimal (Light)
```css
--color-bg: #FAF8F5; --color-surface: #FFF;
--color-primary: #1A1A1A; --color-accent: #E84545; --color-muted: #9B9B9B;
```
### Vibrant Creative
```css
--color-bg: #F0F0F0; --color-surface: #FFF;
--color-primary: #7B2FBE; --color-accent: #FF4F00; --color-text: #111;
```

---

## Typed Hooks

### useIntersectionObserver.ts
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

### useScrollSpy.ts
```ts
import { useEffect, useState } from 'react';

export const useScrollSpy = (
  sectionIds: ReadonlyArray<string>,
  offset = 100
): string => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect((): (() => void) => {
    const handleScroll = (): void => {
      const scrollPos = window.scrollY + offset;
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el !== null && el.offsetTop <= scrollPos) {
          setActiveId(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return (): void => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeId;
};
```

---

## Typed Contact Form (React Hook Form + Zod)

```tsx
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { FC } from 'react';
import type { SubmitHandler } from 'react-hook-form';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(3, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const ContactForm: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({ resolver: zodResolver(contactSchema) });

  const onSubmit: SubmitHandler<ContactFormData> = async (data): Promise<void> => {
    await fetch('/api/contact', { method: 'POST', body: JSON.stringify(data) });
    reset();
  };

  return (
    <form onSubmit={(e) => { void handleSubmit(onSubmit)(e); }} noValidate data-testid="contact-form">
      <input {...register('name')} aria-label="Full name" aria-invalid={errors.name !== undefined} />
      {errors.name?.message !== undefined && <span role="alert">{errors.name.message}</span>}
      {/* ... other fields */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send Message'}
      </button>
    </form>
  );
};

export default ContactForm;
```

---

## Glassmorphism / Common CSS Patterns

```css
.glass-nav {
  background: rgba(10, 10, 10, 0.7);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.08);
}
.gradient-text {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## Full `package.json`

```json
{
  "name": "portfolio",
  "version": "1.0.0",
  "private": true,
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
  "dependencies": {
    "@hookform/resolvers": "^3.3.4",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.400.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "react-helmet-async": "^2.0.0",
    "react-hook-form": "^7.51.0",
    "zod": "^3.22.4"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.4.0",
    "@testing-library/react": "^15.0.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.3.0",
    "@vitest/coverage-v8": "^1.5.0",
    "autoprefixer": "^10.4.19",
    "eslint": "^9.0.0",
    "jsdom": "^24.0.0",
    "postcss": "^8.4.38",
    "prettier": "^3.2.5",
    "tailwindcss": "^3.4.0",
    "type-coverage": "^2.28.0",
    "typescript": "^5.4.0",
    "typescript-eslint": "^7.0.0",
    "vite": "^5.2.0",
    "vite-tsconfig-paths": "^4.3.0",
    "vitest": "^1.5.0"
  }
}
```