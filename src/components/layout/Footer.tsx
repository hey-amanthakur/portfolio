import type { FC } from 'react';
import { siteConfig } from '@/data/content';
import { GitHubIcon, InstagramIcon, LinkedInIcon } from '@components/icons';

export const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      data-testid="footer"
      className="relative w-full border-t border-light-border dark:border-crt-dim bg-light-surface dark:bg-dark-bg"
    >
      {/* Top: ASCII signoff */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 font-mono text-sm">
        <pre className="dark:text-phosphor-dim text-light-muted text-[10px] sm:text-xs leading-tight whitespace-pre overflow-x-auto select-none mb-6">{`
   ┌─────────────────────────────────────────────┐
   │  thanks for scrolling. lets ship something. │
   └─────────────────────────────────────────────┘`}</pre>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
          <div className="text-[13px] dark:text-dark-text text-light-text">
            <span className="dark:text-phosphor-amber text-primary-400">$</span>{' '}
            <span className="dark:text-phosphor-dim text-light-muted">echo</span>{' '}
            &quot;aman thakur · pune, in · © {currentYear}&quot;
          </div>

          <div className="flex items-center gap-2">
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 flex items-center justify-center border dark:border-crt-dim border-light-border dark:text-phosphor-dim text-light-muted hover:dark:text-phosphor-bright hover:dark:border-crt-bright hover:dark:shadow-crt-glow transition-all"
            >
              <GitHubIcon className="w-4 h-4" />
            </a>
            <a
              href={siteConfig.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 flex items-center justify-center border dark:border-crt-dim border-light-border dark:text-phosphor-dim text-light-muted hover:dark:text-phosphor-bright hover:dark:border-crt-bright hover:dark:shadow-crt-glow transition-all"
            >
              <LinkedInIcon className="w-4 h-4" />
            </a>
            <a
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-9 h-9 flex items-center justify-center border dark:border-crt-dim border-light-border dark:text-phosphor-dim text-light-muted hover:dark:text-phosphor-bright hover:dark:border-crt-bright hover:dark:shadow-crt-glow transition-all"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom: vim-style status bar (sticky-feel) */}
      <div className="border-t dark:border-crt-dim border-light-border bg-light-surface dark:bg-dark-surface/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-1.5 flex items-center justify-between font-mono text-[10px] sm:text-[11px] dark:text-phosphor-dim text-light-muted">
          <div className="flex items-center gap-3">
            <span className="dark:text-phosphor-bright text-primary-400">-- NORMAL --</span>
            <span>main</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">utf-8</span>
            <span className="hidden sm:inline">·</span>
            <span className="hidden sm:inline">tsx</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline">react · vite</span>
            <span>·</span>
            <span>100%</span>
            <span>·</span>
            <span>ln 1, col 1</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
