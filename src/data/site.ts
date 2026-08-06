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
  { label: 'Home', href: ROUTES.home },
  { label: 'About', href: ROUTES.about },
  { label: 'Services', href: ROUTES.services },
  { label: 'Work', href: ROUTES.portfolio },
  { label: 'Testimonials', href: ROUTES.testimonials },
  { label: 'Off-Hours', href: ROUTES.instagram },
  { label: 'Hire Me', href: ROUTES.contact },
] as const;
