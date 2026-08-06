/**
 * Single source of truth for every magic string that gets compared or
 * referenced across the app (routing, scroll-spy, filters, theming,
 * personas, accessible labels).
 *
 * Edit values HERE only. Everywhere else imports these constants, so a
 * string comparison can never silently drift out of sync.
 */

// Section element ids (must match nav anchors + scroll-spy lookups).
export const SECTION_IDS = {
  home: 'home',
  about: 'about',
  services: 'services',
  portfolio: 'portfolio',
  testimonials: 'testimonials',
  instagram: 'swaad-feed',
  contact: 'contact',
} as const;

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS];

// Hash routes — anchors use these, App hash-routing compares against them.
// Derived from SECTION_IDS so anchors can never drift from the DOM ids the
// scroll-spy looks up.
export const ROUTES = {
  home: `#${SECTION_IDS.home}`,
  about: `#${SECTION_IDS.about}`,
  services: `#${SECTION_IDS.services}`,
  portfolio: `#${SECTION_IDS.portfolio}`,
  testimonials: `#${SECTION_IDS.testimonials}`,
  instagram: `#${SECTION_IDS.instagram}`,
  contact: `#${SECTION_IDS.contact}`,
  design: '#design',
} as const;

export type Route = (typeof ROUTES)[keyof typeof ROUTES];

// Portfolio filter categories — chips derive from this. Keep in sync with
// the `category` field in src/data/projects.ts.
export const projectCategories = ['AI', 'Web', 'Data Science', 'Security', 'Game Dev'] as const;
export type IProjectCategory = (typeof projectCategories)[number];

// Accessible section labels (aria-label; mirrored by tests).
export const SECTION_LABELS = {
  hero: 'Aman Thakur — Full-Stack Engineer',
  about: 'Aman Thakur Story Timeline',
  services: 'Aman Thakur Freelance Services Menu',
  portfolio: 'Aman Thakur Coding Projects Portfolio',
  testimonials: 'Client Testimonials and Reviews',
  instagram: 'Off-hours side project — food diary on Instagram',
  contact: 'Contact Aman Thakur via WhatsApp',
} as const;

// Persona — the Hero "build software / chase street food" switcher and the
// milestone category share the same vocabulary.
export const PERSONAS = {
  code: 'code',
  food: 'food',
} as const;

export type Persona = (typeof PERSONAS)[keyof typeof PERSONAS];

// Theme — used by the Navbar toggle, <html class="dark"> and localStorage.
export const THEMES = {
  light: 'light',
  dark: 'dark',
} as const;

export type Theme = (typeof THEMES)[keyof typeof THEMES];

export const STORAGE_KEYS = {
  theme: 'theme',
  locale: 'locale',
} as const;

// Portfolio category filter ("show everything").
export const ALL_FILTER = 'All' as const;

// Service ids — keyed lookups in Services + Contact must match the ids in
// src/data/services.ts.
export const SERVICE_IDS = {
  fullstack: 'fullstack',
  aiConsulting: 'ai-consulting',
  contentCreation: 'content-creation',
} as const;

export type ServiceId = (typeof SERVICE_IDS)[keyof typeof SERVICE_IDS];
