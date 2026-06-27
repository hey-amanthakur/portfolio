import { useState, useEffect, useMemo } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { navLinks, siteConfig } from '@/data/content';
import { useScrollSpy } from '@/hooks/useScrollSpy';

// Map nav links to fake file extensions for the "tab" feel
const fileExt: Record<string, string> = {
  Home: 'hero.tsx',
  About: 'about.md',
  Services: 'services.json',
  Work: 'projects/',
  Testimonials: 'reviews.log',
  'Off-Hours': 'side-quest.md',
  'Hire Me': 'contact.sh',
};

export const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>((): 'light' | 'dark' => {
    try {
      const savedTheme = window.localStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    } catch {
      // Safe fallback
    }
    return 'dark';
  });

  const sectionIds = useMemo(
    (): readonly string[] => navLinks.map((link) => link.href.replace('#', '')),
    []
  );
  const activeId = useScrollSpy(sectionIds, 120);

  useEffect((): void => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem('theme', theme);
    } catch {
      // Safe fallback
    }
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLinkClick = (): void => {
    setIsOpen(false);
  };

  return (
    <nav
      data-testid="navbar"
      className="fixed top-0 left-0 w-full z-50 bg-light-bg/85 dark:bg-dark-bg/90 backdrop-blur-md border-b border-light-border dark:border-crt-dim transition-colors duration-300"
    >
      {/* Top window-chrome bar (dark-only) */}
      <div className="hidden dark:flex items-center gap-2 px-5 h-7 border-b border-crt-dim bg-dark-surface/60">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <span className="font-mono text-[11px] text-phosphor-dim ml-2 truncate">
          aman@portfolio: ~ — zsh — {siteConfig.name.toLowerCase().replace(' ', '_')}
        </span>
        <span className="ml-auto font-mono text-[10px] text-phosphor-dim hidden sm:inline">
          120×40
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-5 h-14 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#home"
          className="flex items-center gap-2 group"
          data-testid="navbar-brand"
        >
          <span className="font-mono text-sm">
            <span className="text-primary-400">~/</span>
            <span className="dark:text-dark-text text-light-text font-semibold">aman_thakur</span>
            <span className="dark:text-phosphor-bright text-primary-400 animate-blink">_</span>
          </span>
        </a>

        {/* Desktop "tabs" */}
        <div className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive = activeId === link.href.replace('#', '');
            const isContact = link.href === '#contact';
            const ext = fileExt[link.label] ?? `${link.label.toLowerCase()}.md`;

            if (isContact) {
              return (
                <a
                  key={link.label}
                  href={link.href}
                  data-testid={`navlink-${link.label.toLowerCase().replace(' ', '-')}`}
                  className="ml-3 flex items-center gap-2 font-mono text-sm px-3 py-1.5 border border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-dark-bg transition-colors duration-150"
                >
                  <span className="text-primary-400 group-hover:text-dark-bg">$</span>
                  ./hire-me.sh
                </a>
              );
            }

            return (
              <a
                key={link.label}
                href={link.href}
                data-testid={`navlink-${link.label.toLowerCase().replace(' ', '-')}`}
                className={`relative font-mono text-[13px] px-3 py-1.5 transition-colors ${
                  isActive
                    ? 'dark:text-phosphor-bright text-primary-400'
                    : 'dark:text-phosphor-dim text-light-muted hover:dark:text-dark-text hover:text-light-text'
                }`}
              >
                {ext}
                {isActive && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary-400 dark:bg-crt-bright dark:shadow-crt-glow"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            data-testid="theme-toggle"
            aria-label="Toggle theme"
            className="ml-3 w-9 h-9 flex items-center justify-center border border-light-border dark:border-crt-dim text-light-muted dark:text-phosphor-dim hover:dark:text-phosphor-bright hover:dark:border-crt-bright hover:text-light-text transition-colors"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile buttons */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme mobile"
            className="w-9 h-9 flex items-center justify-center border border-light-border dark:border-crt-dim text-light-muted dark:text-phosphor-dim hover:dark:text-phosphor-bright"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
          <button
            onClick={(): void => { setIsOpen(!isOpen); }}
            aria-label="Toggle nav drawer"
            className="w-9 h-9 flex items-center justify-center border border-light-border dark:border-crt-dim text-light-muted dark:text-phosphor-dim hover:dark:text-phosphor-bright"
          >
            {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="lg:hidden w-full bg-light-surface dark:bg-dark-surface border-b border-light-border dark:border-crt-dim overflow-hidden"
          >
            <div className="flex flex-col px-5 py-4 gap-2 font-mono text-sm">
              {navLinks.map((link) => {
                const isActive = activeId === link.href.replace('#', '');
                const ext = fileExt[link.label] ?? `${link.label.toLowerCase()}.md`;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={`py-1.5 flex items-center gap-2 ${
                      isActive
                        ? 'dark:text-phosphor-bright text-primary-400'
                        : 'dark:text-phosphor-dim text-light-muted'
                    }`}
                  >
                    <span className="text-primary-400">▸</span>
                    {ext}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
