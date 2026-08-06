import type { INavLink, IProject, IService, ITestimonial, IInstagramPost, ISiteConfig, IGitHubRepo, IOpenSourceContribution } from '@/types';

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

export const services: readonly IService[] = [
  {
    id: 'fullstack',
    title: 'Full-Stack Engineering',
    tagline: 'React + Spring Boot, end-to-end',
    description: 'Production-grade React/TypeScript frontends paired with scalable Java & Spring Boot APIs. Clean architecture, strict typing, CI/CD pipelines, and meaningful test coverage — shipped, not just demoed.',
    icon: 'Terminal',
  },
  {
    id: 'ai-consulting',
    title: 'AI Systems & Agents',
    tagline: 'LLMs, RAG, and autonomous workflows',
    description: 'Embed real intelligence into your product. From prompt-tuned LLM features and semantic RAG search to multi-tool autonomous agents that collapse hours of manual work into seconds.',
    icon: 'Cpu',
  },
  {
    id: 'content-creation',
    title: 'Content & Creator Tech',
    tagline: 'Storytelling × developer leverage',
    description: 'For founders and creators who want a technical edge. Influencer collabs, retention-focused reel strategy, and lightweight content tooling I build myself — analytics dashboards, automations, and editing pipelines.',
    icon: 'ChefHat',
  }
] as const;

export const projects: readonly IProject[] = [
  {
    id: 'roomvision',
    title: 'RoomVision',
    description: 'AI-powered room visualization platform — a white-label, embeddable tool for interior designers to render and preview space redesigns.',
    tags: ['TypeScript', 'React', 'NestJS', 'TypeORM', 'AI'],
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800&auto=format&fit=crop&q=60',
    liveUrl: 'https://github.com/hey-amanthakur/RoomVision',
    repoUrl: 'https://github.com/hey-amanthakur/RoomVision',
    featured: true,
    type: 'code',
  },
  {
    id: 'charrade',
    title: 'Charred',
    description: 'A real-time, browser-based charades party game — one player silently acts out a word on camera while teammates race to guess it before the clock runs out.',
    tags: ['TypeScript', 'WebRTC', 'Node.js', 'WebSockets'],
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop&q=60',
    liveUrl: 'https://github.com/hey-amanthakur/charrade',
    repoUrl: 'https://github.com/hey-amanthakur/charrade',
    featured: true,
    type: 'code',
  },
  {
    id: 'saathi-ai',
    title: 'Saathi — Assistive Platform',
    description: "SIH'22 winner. An assistive computer vision system for early detection of special learning needs in children using React, OpenCV, and TensorFlow.",
    tags: ['React', 'Python', 'OpenCV', 'TensorFlow', 'WebSockets'],
    imageUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop&q=60',
    liveUrl: 'https://github.com/hey-amanthakur/Saathi',
    repoUrl: 'https://github.com/hey-amanthakur/Saathi',
    featured: true,
    type: 'code',
  },
  {
    id: 'ml-algorithms',
    title: 'ML Algorithms from Scratch',
    description: 'Clean implementations of popular machine learning algorithms in Python with visualizations — linear regression, decision trees, neural networks, and more.',
    tags: ['Python', 'NumPy', 'Scikit-learn', 'Matplotlib'],
    imageUrl: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=60',
    liveUrl: 'https://github.com/hey-amanthakur/ML-Algorithms',
    repoUrl: 'https://github.com/hey-amanthakur/ML-Algorithms',
    featured: true,
    type: 'code',
  },
  {
    id: 'cryptography-algorithm',
    title: 'Cascaded Cryptography System',
    description: 'IEEE-published cryptography system using Armstrong numbers and matrices for encryption/decryption — a novel cascaded approach.',
    tags: ['Python', 'Cryptography', 'IEEE Paper'],
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=60',
    liveUrl: 'https://github.com/hey-amanthakur/CrytographyAlgorithm',
    repoUrl: 'https://github.com/hey-amanthakur/CrytographyAlgorithm',
    featured: true,
    type: 'code',
  },
  {
    id: 'multiplayer-game-engine',
    title: 'Multiplayer Game Engine',
    description: "A Java-based multiplayer game simulation using multithreading and networking concepts for real-time client-server interaction.",
    tags: ['Java', 'WebSockets', 'Multithreading'],
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60',
    liveUrl: 'https://github.com/hey-amanthakur/Mutiplayer-Game',
    repoUrl: 'https://github.com/hey-amanthakur/Mutiplayer-Game',
    featured: true,
    type: 'code',
  },
] as const;

export const instagramPosts: readonly IInstagramPost[] = [
  {
    id: 'insta-1',
    imageUrl: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&auto=format&fit=crop&q=60', // Rich North Indian Curry
    caption: 'Spice, sizzle, and a journey of a lifetime! Tasting the absolute best Butter Chicken in Delhi 🍛🔥. Every bite has a story! #YehSafarSwaadKa #FoodVlog',
    likes: 1842,
    comments: 124,
    postUrl: 'https://www.instagram.com/yeh.safar.swaad.ka/',
  },
  {
    id: 'insta-2',
    imageUrl: 'https://images.unsplash.com/photo-1626132647523-66f5bf380027?w=800&auto=format&fit=crop&q=60', // Crispy Masala Dosa
    caption: 'Cracking the crispy gold standard! This 4-foot Masala Dosa is a legendary local masterclass 🥞 Sambhar check: 10/10. Chutneys: Spiced to perfection! #StreetFoodIndia',
    likes: 2150,
    comments: 187,
    postUrl: 'https://www.instagram.com/yeh.safar.swaad.ka/',
  },
  {
    id: 'insta-3',
    imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=60', // Yummy Biryani
    caption: 'Long grained, slow-cooked, and loaded with aroma! Unboxing the most authentic Dum Biryani cooked over coal. Tag a friend who can finish this alone! 👇👇 #BiryaniLovers',
    likes: 3105,
    comments: 242,
    postUrl: 'https://www.instagram.com/yeh.safar.swaad.ka/',
  },
  {
    id: 'insta-4',
    imageUrl: 'https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=800&auto=format&fit=crop&q=60', // Creamy desserts/rasmalai
    caption: 'A sweet ending to a spicy travel journey! Fluffy, milky Rasmalai soaked in saffron and loaded with pistachios 🍧. Pure foodie heaven! #DessertGram #SweetJourney',
    likes: 1982,
    comments: 98,
    postUrl: 'https://www.instagram.com/yeh.safar.swaad.ka/',
  }
] as const;

export const testimonials: readonly ITestimonial[] = [
  {
    id: 'test-1',
    name: 'Rohan Mehta',
    role: 'CTO',
    company: 'FinSphere Technologies',
    quote: 'Aman is a rare talent. He brought hackathon-level velocity and clean Java architecture to our Spring Boot microservices. Plus, he gave the team the absolute best street food recommendations!',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60',
  },
  {
    id: 'test-2',
    name: 'Sarah K.',
    role: 'Co-Founder',
    company: 'ChefStream',
    quote: 'Aman cooked up a flawless dashboard interface in record time. His React & Tailwind skill is exceptional, and his understanding of AI tools saved us weeks of engineering. 100% recommended!',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60',
  }
] as const;

// GitHub Pinned Repos (scraped via Puppeteer)
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


export const milestones: readonly {
  readonly year: string;
  readonly title: string;
  readonly description: string;
  readonly category: 'code' | 'food';
}[] = [
  {
    year: '2022',
    title: 'Tech Tatva Hackathon Winner 🏆',
    description: 'Won the Tech Tatva Hackathon with an innovative solution, demonstrating rapid prototyping and clean architecture under pressure.',
    category: 'code',
  },
  {
    year: '2022',
    title: 'Smart India Hackathon Winner 🏆',
    description: 'Led a team of 6 to build Drishti AI, an assistive computer vision system for visually impaired people, winning first prize nationally.',
    category: 'code',
  },
  {
    year: '2023',
    title: 'ET Campus Star & ML School 🌟',
    description: 'Recognized as an ET Campus Star and selected for the prestigious Amazon Machine Learning Summer School deep-learning tracks.',
    category: 'code',
  },
  {
    year: '2024',
    title: 'Launching Yeh Safar Swaad Ka 🍳',
    description: 'Started capturing local street food journeys, expanding rapidly to thousands of organic foodies on Instagram.',
    category: 'food',
  },
  {
    year: '2025',
    title: 'Full-Stack Freelancing Cook 💻',
    description: 'Began building bespoke React, Spring Boot, and AI agent architectures for startups while growing culinary reach.',
    category: 'code',
  }
] as const;
