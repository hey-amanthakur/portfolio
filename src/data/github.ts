import type { IGitHubRepo, IOpenSourceContribution } from '@/types';

// GitHub Pinned Repos — run `bun run scrape:github` and copy results here.
export const pinnedRepos: readonly IGitHubRepo[] = [
  {
    id: 'gh-roomvision',
    name: 'RoomVision',
    description: 'AI-powered room visualization platform — a white-label, embeddable tool for interior designers.',
    url: 'https://github.com/hey-amanthakur/RoomVision',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
  },
  {
    id: 'gh-charrade',
    name: 'charrade',
    description: 'Real-time, browser-based charades party game built with WebRTC — act it out, teammates guess.',
    url: 'https://github.com/hey-amanthakur/charrade',
    language: 'TypeScript',
    stars: 0,
    forks: 0,
  },
  {
    id: 'gh-ml-algorithms',
    name: 'ML Algorithms',
    description: 'Implementation of popular Machine Learning algorithms from scratch in Python. Clean, well-documented code with visualizations.',
    url: 'https://github.com/hey-amanthakur/ML-Algorithms',
    language: 'Python',
    stars: 2,
    forks: 4,
  },
  {
    id: 'gh-cryptography-algorithm',
    name: 'Cryptography Algorithm',
    description: 'A cascaded cryptography system based on Armstrong numbers and matrices for encryption/decryption — published in an IEEE Conference paper.',
    url: 'https://github.com/hey-amanthakur/CrytographyAlgorithm',
    language: 'Python',
    stars: 0,
    forks: 0,
  },
  {
    id: 'gh-saathi',
    name: 'Saathi — Assistive Platform',
    description: "SIH'22 winner. An assistive computer vision platform for early detection of special learning needs in children using OpenCV and TensorFlow.",
    url: 'https://github.com/hey-amanthakur/Saathi',
    language: 'JavaScript',
    stars: 0,
    forks: 0,
  },
  {
    id: 'gh-path-finding',
    name: 'Path Finding Algorithm',
    description: 'A* pathfinding algorithm visualized with Pygame. Interactive GUI to step through the algorithm in real time.',
    url: 'https://github.com/hey-amanthakur/PathfindingAlgorithm',
    language: 'Python',
    stars: 1,
    forks: 0,
  },
] as const;

// Open Source Contributions
export const openSourceContributions: readonly IOpenSourceContribution[] = [
  {
    id: 'oss-deno-std',
    org: 'denoland',
    name: 'std',
    description: 'Shipped utility functions to the Deno Standard Library — text, collections, and math modules.',
    url: 'https://github.com/denoland/std',
    language: 'TypeScript',
    prCount: 3,
  },
  {
    id: 'oss-enhanced-resolve',
    org: 'webpack',
    name: 'enhanced-resolve',
    description: 'Built a resolution TracePlugin and performance profiler for webpack\'s module resolution engine, plus alias bucketing tests.',
    url: 'https://github.com/webpack/enhanced-resolve',
    language: 'JavaScript',
    prCount: 3,
  },
  {
    id: 'oss-sympy',
    org: 'sympy',
    name: 'sympy',
    description: 'Extended test coverage for the finite difference routines in the pure-Python computer algebra system.',
    url: 'https://github.com/sympy/sympy',
    language: 'Python',
    prCount: 1,
  },
] as const;
