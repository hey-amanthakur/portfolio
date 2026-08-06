import type { IService } from '@/types';
import { SERVICE_IDS } from '@/constants';

export const services: readonly IService[] = [
  {
    id: SERVICE_IDS.fullstack,
    title: 'Full-Stack Engineering',
    tagline: 'React + Spring Boot, end-to-end',
    description: 'Production-grade React/TypeScript frontends paired with scalable Java & Spring Boot APIs. Clean architecture, strict typing, CI/CD pipelines, and meaningful test coverage — shipped, not just demoed.',
    icon: 'Terminal',
  },
  {
    id: SERVICE_IDS.aiConsulting,
    title: 'AI Systems & Agents',
    tagline: 'LLMs, RAG, and autonomous workflows',
    description: 'Embed real intelligence into your product. From prompt-tuned LLM features and semantic RAG search to multi-tool autonomous agents that collapse hours of manual work into seconds.',
    icon: 'Cpu',
  },
  {
    id: SERVICE_IDS.contentCreation,
    title: 'Content & Creator Tech',
    tagline: 'Storytelling × developer leverage',
    description: 'For founders and creators who want a technical edge. Influencer collabs, retention-focused reel strategy, and lightweight content tooling I build myself — analytics dashboards, automations, and editing pipelines.',
    icon: 'ChefHat',
  }
] as const;
