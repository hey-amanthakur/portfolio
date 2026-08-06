import type { IMilestone } from '@/types';
import { PERSONAS } from '@/constants';

export const milestones: readonly IMilestone[] = [
  {
    year: '2022',
    title: 'Tech Tatva Hackathon Winner 🏆',
    description: 'Won the Tech Tatva Hackathon with an innovative solution, demonstrating rapid prototyping and clean architecture under pressure.',
    category: PERSONAS.code,
  },
  {
    year: '2022',
    title: 'Smart India Hackathon Winner 🏆',
    description: 'Led a team of 6 to build Drishti AI, an assistive computer vision system for visually impaired people, winning first prize nationally.',
    category: PERSONAS.code,
  },
  {
    year: '2023',
    title: 'ET Campus Star & ML School 🌟',
    description: 'Recognized as an ET Campus Star and selected for the prestigious Amazon Machine Learning Summer School deep-learning tracks.',
    category: PERSONAS.code,
  },
  {
    year: '2024',
    title: 'Launching Yeh Safar Swaad Ka 🍳',
    description: 'Started capturing local street food journeys, expanding rapidly to thousands of organic foodies on Instagram.',
    category: PERSONAS.food,
  },
  {
    year: '2025',
    title: 'Full-Stack Freelancing Cook 💻',
    description: 'Began building bespoke React, Spring Boot, and AI agent architectures for startups while growing culinary reach.',
    category: PERSONAS.code,
  }
] as const;
