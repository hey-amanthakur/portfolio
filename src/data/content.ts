import type { INavLink, IProject, IService, ITestimonial, IInstagramPost, ISiteConfig } from '@/types';

export const siteConfig: ISiteConfig = {
  name: 'Aman Thakur',
  title: 'Aman Thakur | Developer & Content Creator',
  tagline: 'Serving hot, freshly-baked code 💻 and exploring delicious street-food journeys 🍳',
  email: 'aman.thakur.dev@gmail.com', // Professional placeholder
  socials: {
    github: 'https://github.com/jhonsnow456',
    instagram: 'https://www.instagram.com/yeh.safar.swaad.ka/',
    linkedin: 'https://www.linkedin.com/in/aman-thakur-dev/', // Typical path
  },
  instaHandle: 'yeh.safar.swaad.ka',
} as const;

export const navLinks: ReadonlyArray<INavLink> = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Swaad Feed', href: '#swaad-feed' },
  { label: 'Order Project', href: '#contact' },
] as const;

export const services: ReadonlyArray<IService> = [
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
    icon: 'Instagram',
  }
] as const;

export const projects: ReadonlyArray<IProject> = [
  {
    id: 'drishti-ai',
    title: 'Drishti AI Assistive Platform',
    description: 'Award-winning AI computer-vision dashboard designed for visually impaired users. Features instant spatial audio navigation and real-time obstacle description (SIH 2022 winning concept).',
    tags: ['React', 'Python', 'OpenCV', 'TensorFlow', 'WebSockets'],
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
    liveUrl: 'https://github.com/jhonsnow456',
    repoUrl: 'https://github.com/jhonsnow456',
    featured: true,
    type: 'code',
  },
  {
    id: 'swaad-engine',
    title: 'The Swaad Recommendation Engine',
    description: 'A culinary discovery platform leveraging Vector Search and Spring Boot. Analyzes street food reviews to suggest highly tailored local gems based on flavor-profile semantics.',
    tags: ['Java', 'Spring Boot', 'React', 'Elasticsearch', 'PostgreSQL'],
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&auto=format&fit=crop&q=60',
    liveUrl: 'https://github.com/jhonsnow456',
    repoUrl: 'https://github.com/jhonsnow456',
    featured: true,
    type: 'code',
  },
  {
    id: 'spring-feed-api',
    title: 'Spring Feed creator middleware',
    description: 'High-throughput Redis cache buffer and routing API constructed in Java, built specifically to stream live video content feeds and scale to thousands of operations per second.',
    tags: ['Java', 'Spring Boot', 'Redis', 'Docker', 'AWS'],
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=800&auto=format&fit=crop&q=60',
    liveUrl: 'https://github.com/jhonsnow456',
    repoUrl: 'https://github.com/jhonsnow456',
    featured: false,
    type: 'code',
  },
  {
    id: 'leftover-chef-ai',
    title: 'Leftover Chef AI Generator',
    description: 'Playful React app that takes a snapshot of your fridge leftovers and generates custom recipes using OpenAI APIs, suggesting cooking hacks and nutritional stats on the fly.',
    tags: ['React', 'TypeScript', 'Node.js', 'OpenAI API', 'Tailwind'],
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60',
    liveUrl: 'https://github.com/jhonsnow456',
    repoUrl: 'https://github.com/jhonsnow456',
    featured: false,
    type: 'code',
  }
] as const;

export const instagramPosts: ReadonlyArray<IInstagramPost> = [
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

export const testimonials: ReadonlyArray<ITestimonial> = [
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

export const milestones: ReadonlyArray<{
  readonly year: string;
  readonly title: string;
  readonly description: string;
  readonly category: 'code' | 'food';
}> = [
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
