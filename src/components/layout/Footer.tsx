import type { FC } from 'react';
import { siteConfig } from '@/data';
import { GitHubIcon, InstagramIcon, LinkedInIcon } from '@components/icons';
import { MagneticButton } from '@components/ui/MagneticButton';

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="w-full bg-surface dark:bg-canvas border-t-2 border-line py-12 transition-colors duration-300 relative overflow-hidden">
      <div className="bg-grid-pattern-light dark:bg-grid-pattern-dark absolute inset-0 pointer-events-none opacity-50" />

      <div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div className="text-center md:text-left">
            <p className="font-display font-bold text-ink text-lg">
              Aman Thakur<span className="text-primary-400">.</span>
            </p>
            <p className="text-sm text-muted mt-1 flex items-center justify-center md:justify-start gap-1.5 font-mono">
              <span className="text-primary-400">$</span>
              <span>built with React + TypeScript · &copy; {currentYear}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            {[{
              href: siteConfig.socials.github,
              label: 'GitHub',
              icon: <GitHubIcon className="w-5 h-5" />,
            }, {
              href: siteConfig.socials.instagram,
              label: 'Instagram',
              icon: <InstagramIcon className="w-5 h-5" />,
            }, {
              href: siteConfig.socials.linkedin,
              label: 'LinkedIn',
              icon: <LinkedInIcon className="w-5 h-5" />,
            }].map((social) => (
              <MagneticButton key={social.label} strength={0.3}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-11 h-11 flex items-center justify-center rounded-xl border-2 border-ink bg-canvas dark:bg-surface shadow-flat-light dark:shadow-flat-dark hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5 active:translate-x-1 active:translate-y-1 transition-all duration-150 text-ink hover:text-primary-400"
                >
                  {social.icon}
                </a>
              </MagneticButton>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
