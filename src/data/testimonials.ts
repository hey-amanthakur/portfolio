import type { ITestimonial } from '@/types';

export const testimonials: readonly ITestimonial[] = [
  {
    id: 'test-1',
    name: 'Rohan Mehta',
    role: 'CTO',
    company: 'FinSphere Technologies',
    quote: 'Aman is a rare talent. He brought hackathon-level velocity and clean Java architecture to our Spring Boot microservices. Plus, he gave the team the absolute best street food recommendations!',
    avatarUrl: '/assets/avatars/rohan-mehta.jpg',
  },
  {
    id: 'test-2',
    name: 'Sarah K.',
    role: 'Co-Founder',
    company: 'ChefStream',
    quote: 'Aman cooked up a flawless dashboard interface in record time. His React & Tailwind skill is exceptional, and his understanding of AI tools saved us weeks of engineering. 100% recommended!',
    avatarUrl: '/assets/avatars/sarah-k.jpg',
  }
] as const;
