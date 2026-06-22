// Navigation
export interface INavLink {
  readonly label: string;
  readonly href: string;
  readonly isExternal?: boolean;
}

// Projects
export interface IProject {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly tags: readonly string[];
  readonly imageUrl: string;
  readonly liveUrl?: string;
  readonly repoUrl?: string;
  readonly featured: boolean;
  readonly type: 'code' | 'food';
}

// Services
export interface IService {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly icon: string;
  readonly tagline: string;
}

// Testimonials
export interface ITestimonial {
  readonly id: string;
  readonly name: string;
  readonly role: string;
  readonly company: string;
  readonly quote: string;
  readonly avatarUrl?: string;
}

// Instagram Post
export interface IInstagramPost {
  readonly id: string;
  readonly imageUrl: string;
  readonly caption: string;
  readonly likes: number;
  readonly comments: number;
  readonly postUrl: string;
}

// Contact Form
export interface IContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
  serviceType: string;
}

// Site Config
export interface ISiteConfig {
  readonly name: string;
  readonly title: string;
  readonly tagline: string;
  readonly email: string;
  readonly phone: string;
  readonly socials: Readonly<Record<string, string>>;
  readonly instaHandle: string;
  readonly sponsorUrl?: string;
}

// GitHub Pinned Repo
export interface IGitHubRepo {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly language: string;
  readonly stars: number;
  readonly forks: number;
}

// Component Props patterns
export type PropsWithClassName<T = unknown> = T & {
  className?: string;
};
