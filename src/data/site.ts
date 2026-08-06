import type { INavLink, ISiteConfig } from '@/types';

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
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Off-Hours', href: '#swaad-feed' },
  { label: 'Hire Me', href: '#contact' },
] as const;
