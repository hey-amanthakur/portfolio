import { useState, useEffect, useMemo } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Terminal } from 'lucide-react';
import { navLinks, siteConfig } from '@/data/content';
import { useScrollSpy } from '@/hooks/useScrollSpy';

export const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<'light' | 'dark'>((): 'light' | 'dark' => {
    try {
      const savedTheme = window.localStorage.getItem('theme');
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    } catch {
      // Safe fallback
    }

    try {
      if (typeof window !== 'undefined') {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
    } catch {
      // Safe fallback
    }
    return 'light';
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
    <nav className="fixed top-0 left-0 w-full z-50 bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-md border-b-2 border-light-border dark:border-dark-border transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Playful Brand Logo */}
        <a 
          href="#home" 
          className="flex items-center gap-2.5 group font-display font-bold text-xl text-light-text dark:text-dark-text"
        >
          <div className="relative w-9 h-9 rounded-xl-playful border-2 border-light-text dark:border-dark-text flex items-center justify-center bg-primary-400 group-hover:rotate-12 transition-transform duration-200 shadow-sm">
            <Terminal className="w-5 h-5 text-white" />
          </div>
          <span className="tracking-tight hover:text-primary-400 transition-colors font-mono">
            {siteConfig.name.toLowerCase().replace(' ', '_')}
            <span className="text-primary-400 font-black animate-pulse">_</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isContact = link.href === '#contact';
            const isActive = activeId === link.href.replace('#', '');
            
            return (
              <a
                key={link.label}
                href={link.href}
                className={`font-display font-semibold transition-all relative ${
                  isContact
                    ? 'px-4 py-1.5 rounded-full border-2 border-light-text dark:border-dark-text bg-secondary-400 hover:bg-secondary-300 text-light-text shadow-flat-light dark:shadow-flat-dark active:translate-x-0.5 active:translate-y-0.5'
                    : isActive
                    ? 'text-primary-400 font-bold scale-105'
                    : 'text-light-text/75 dark:text-dark-text/75 hover:text-primary-400 dark:hover:text-primary-300'
                }`}
              >
                {link.label}
                {isActive && !isContact && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute -bottom-1 left-0 w-full h-1 bg-primary-400 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            );
          })}

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle active theme"
            className="w-10 h-10 flex items-center justify-center rounded-xl-playful border-2 border-light-text dark:border-dark-text bg-light-surface dark:bg-dark-surface shadow-flat-light dark:shadow-flat-dark hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-150 text-light-text dark:text-dark-text"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-yellow-400" />}
          </button>
        </div>

        {/* Mobile Buttons */}
        <div className="flex md:hidden items-center gap-4">
          {/* Mobile Theme Toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle active theme mobile"
            className="w-10 h-10 flex items-center justify-center rounded-xl-playful border-2 border-light-text dark:border-dark-text bg-light-surface dark:bg-dark-surface shadow-flat-light dark:shadow-flat-dark active:translate-x-0.5 active:translate-y-0.5 text-light-text dark:text-dark-text"
          >
            {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5 text-yellow-400" />}
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={(): void => { setIsOpen(!isOpen); }}
            aria-label="Open mobile navigation drawer"
            className="w-10 h-10 flex items-center justify-center rounded-xl-playful border-2 border-light-text dark:border-dark-text bg-light-surface dark:bg-dark-surface shadow-flat-light dark:shadow-flat-dark text-light-text dark:text-dark-text"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden w-full bg-light-surface dark:bg-dark-surface border-b-2 border-light-border dark:border-dark-border overflow-hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={handleLinkClick}
                  className={`font-display font-bold text-lg text-light-text dark:text-dark-text py-1.5 border-b border-light-border dark:border-dark-border last:border-none hover:text-primary-400 transition-colors ${
                    activeId === link.href.replace('#', '') ? 'text-primary-400 pl-2 border-l-4 border-l-primary-400 border-b-0' : ''
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
