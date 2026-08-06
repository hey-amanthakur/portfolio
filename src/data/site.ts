import type { INavLink, ISiteConfig } from '@/types';
import { ROUTES } from '@/constants';

export const siteConfig: ISiteConfig = {
  name: 'Aman Thakur',
  title: 'Aman Thakur | Full-Stack Engineer',
  tagline: 'Full-stack engineer shipping production React, Spring Boot, and AI-agent systems — with a side quest documenting Indian street food.',
  email: '099amanthakur1@gmail.com',
  phone: '917762021493',
  socials: {
    github: 'https://github.com/hey-amanthakur',
    instagram: 'https://www.instagram.com/hey.amanthakur/',
    linkedin: 'https://www.linkedin.com/in/aman--thakur/',
  },
  instaHandle: 'yeh.safar.swaad.ka',
  sponsorUrl: 'https://www.buymeacoffee.com/hey.amanthakur',
} as const;

export const navLinks: readonly INavLink[] = [
  { label: 'home', href: ROUTES.home },
  { label: 'about', href: ROUTES.about },
  { label: 'services', href: ROUTES.services },
  { label: 'work', href: ROUTES.portfolio },
  { label: 'testimonials', href: ROUTES.testimonials },
  { label: 'offHours', href: ROUTES.instagram },
  { label: 'hireMe', href: ROUTES.contact },
] as const;
