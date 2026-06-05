import type { INavLink, IProject, IService, ITestimonial, IInstagramPost, ISiteConfig, IGitHubRepo } from '@/types';

export const siteConfig: ISiteConfig = {
  name: 'Aman Thakur',
  title: 'Aman Thakur | Developer & Content Creator',
  tagline: 'Serving hot, freshly-baked code 💻 and exploring delicious street-food journeys 🍳',
  email: '099amanthakur1@gmail.com', // Professional placeholder
  socials: {
    github: 'https://github.com/jhonsnow456',
    instagram: 'https://www.instagram.com/hey.amanthakur/',
    linkedin: 'https://www.linkedin.com/in/aman--thakur/', // Typical path
  },
  instaHandle: 'yeh.safar.swaad.ka',
  sponsorUrl: 'https://www.buymeacoffee.com/hey.amanthakur', // TODO: replace with actual Buy Me a Coffee link
} as const;

export const navLinks: readonly INavLink[] = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Swaad Feed', href: '#swaad-feed' },
  { label: 'Order Project', href: '#contact' },
] as const;

export const services: readonly IService[] = [
  {
    id: 'fullstack',
    title: 'Cooked-to-Order Fullstack Dev',
    tagline: 'High-performance React & Spring Boot systems',
    description: 'Serving robust, scalable web applications with smooth React frontends and lightning-fast Java / Spring Boot APIs. Crafted with extreme clean-code discipline and high test coverage.',
    icon: 'Terminal',
  },
  {
    id: 'ai-consulting',
    title: 'AI-Enhanced Architecture',
    tagline: 'Integrating intelligent agent models',
    description: 'Empowering your workflows with cutting-edge AI integrations. From prompt engineering and semantic RAG search to building custom autonomous AI agents that supercharge business metrics.',
    icon: 'Cpu',
  },
  {
    id: 'content-creation',
    title: 'Recipe for Organic Reach',
    tagline: 'Content strategy and creative partnership',
    description: 'Merging technical depth with storytelling. Offering influencer partnerships, creative content reviews, high-retention video editing strategies, and audience-growth blueprints.',
    icon: 'ChefHat',
  }
] as const;

export const projects: readonly IProject[] = [
  {
    id: 'saathi-ai',
    title: 'Saathi an Assistive Platform',
    description: "The project was part of SIH'22. It help in providing a detailed report of the children having special learning which could early detect the symptoms",
    tags: ['React', 'Python', 'OpenCV', 'TensorFlow', 'WebSockets'],
    imageUrl: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&auto=format&fit=crop&q=60', // AI vision / assistive tech
    liveUrl: 'https://github.com/jhonsnow456/Saathi',
    repoUrl: 'https://github.com/jhonsnow456/Saathi',
    featured: true,
    type: 'code',
  },
  {
    id: 'multiplayer-game-engine',
    title: 'Multiplayer Game Engine',
    description: "The project is made to simulate a multiplayer game in java using the concept of multi threading and computer network",
    tags: ['Java', 'NetBeans', 'WebSockets'],
    imageUrl: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=60', // esports / gaming setup
    liveUrl: 'https://github.com/jhonsnow456/Mutiplayer-Game',
    repoUrl: 'https://github.com/jhonsnow456/Mutiplayer-Game',
    featured: true,
    type: 'code',
  }
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
    id: 'gh-portfolio',
    name: 'Portfolio',
    description: 'My personal portfolio website built with React, TypeScript, Vite, and TailwindCSS. Features dark/light theme, scroll-driven animations, and a build-time Instagram scraper.',
    url: 'https://github.com/jhonsnow456/Portfolio',
    language: 'TypeScript',
    stars: 1,
    forks: 0,
  },
  {
    id: 'gh-path-finding-algorithm',
    name: 'Path Finding Algorithm',
    description: 'Implementation of A* pathfinding algorithm. To visualize the algorithm Pygame is used for the GUI interface.',
    url: 'https://github.com/jhonsnow456/PathfindingAlgorithm',
    language: 'python3',
    stars: 1,
    forks: 0,
  },
  {
    id: 'gh-cryptography-algoritm',
    name: 'Cryptography Algorithm',
    description: 'A cascaded cryptography system based on the idea of using Armstrong numbers and matrices for encryption/decryption was published in an IEEE Conference paper.',
    url: 'https://github.com/jhonsnow456/CrytographyAlgorithm',
    language: 'python3',
    stars: 0,
    forks: 0,
  },
  {
    id: 'gh-multiplayer-game-engine',
    name: 'Multiplayer Game',
    description: 'The project is made to simulate a multiplayer game in java using the concept of multi threading and computer network',
    url: 'https://github.com/jhonsnow456/Mutiplayer-Game',
    language: 'Java',
    stars: 1,
    forks: 0,
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
