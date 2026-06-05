import type { FC } from 'react';
import { Heart, Coffee } from 'lucide-react';
import { siteConfig } from '@/data/content';
import { GitHubIcon, InstagramIcon, LinkedInIcon } from '@components/icons';

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-light-surface dark:bg-dark-bg border-t-2 border-light-border dark:border-dark-border py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

        {/* Playful Copy */}
        <div className="text-center md:text-left">
          <p className="font-display font-bold text-light-text dark:text-dark-text text-lg">
            Aman Thakur<span className="text-primary-400">.</span>
          </p>
          <p className="text-sm text-light-muted dark:text-dark-muted mt-1 flex items-center justify-center md:justify-start gap-1">
            Cooked with
            <Heart className="w-3.5 h-3.5 text-primary-400 fill-current animate-pulse" />
            and code in India. © {currentYear}
          </p>
        </div>

        {/* Sponsor Button — Buy Me a Coffee */}
        {siteConfig.sponsorUrl !== undefined && (
          <a
            href={siteConfig.sponsorUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Buy me a coffee"
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl-playful border-2 border-[#FFDD00] bg-[#FFDD00] text-[#0A0A0A] font-display font-bold text-sm hover:bg-[#e6c700] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[4px_4px_0px_0px_#0A0A0A] active:translate-x-1 active:translate-y-1 transition-all duration-150"
          >
            <Coffee className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" />
            Buy me a coffee ☕
          </a>
        )}

        {/* Social Links Panel */}
        <div className="flex items-center gap-4">
          <a
            href={siteConfig.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub Profile"
            className="w-10 h-10 flex items-center justify-center rounded-xl-playful border-2 border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-surface shadow-flat-light dark:shadow-flat-dark hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-150 text-light-text dark:text-dark-text"
          >
            <GitHubIcon className="w-5 h-5" />
          </a>
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Profile"
            className="w-10 h-10 flex items-center justify-center rounded-xl-playful border-2 border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-surface shadow-flat-light dark:shadow-flat-dark hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-150 text-light-text dark:text-dark-text"
          >
            <InstagramIcon className="w-5 h-5" />
          </a>
          <a
            href={siteConfig.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn Profile"
            className="w-10 h-10 flex items-center justify-center rounded-xl-playful border-2 border-light-text dark:border-dark-text bg-light-bg dark:bg-dark-surface shadow-flat-light dark:shadow-flat-dark hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-150 text-light-text dark:text-dark-text"
          >
            <LinkedInIcon className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};
