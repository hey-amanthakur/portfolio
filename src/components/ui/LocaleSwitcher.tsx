import { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import { ChevronDown, Globe, Check } from 'lucide-react';
import { LOCALES, useI18n, type LocaleCode } from '@/i18n';

interface ILocaleSwitcherProps {
  readonly className?: string;
}

export const LocaleSwitcher: FC<ILocaleSwitcherProps> = ({ className }) => {
  const { locale, setLocale, t } = useI18n();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event: MouseEvent): void => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return (): void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const selectLocale = (code: LocaleCode): void => {
    setLocale(code);
    setIsOpen(false);
  };

  const current = LOCALES.find((entry) => entry.code === locale) ?? LOCALES[0];

  return (
    <div ref={containerRef} className={`relative ${className ?? ''}`}>
      <button
        type="button"
        onClick={(): void => { setIsOpen((prev) => !prev); }}
        aria-label={t.nav.chooseLanguage}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className="flex items-center gap-1.5 px-3 h-10 rounded-xl-playful border-2 border-ink bg-surface shadow-flat-light dark:shadow-flat-dark hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-150 text-ink"
      >
        <Globe className="w-4 h-4 text-muted" />
        <span className="font-mono text-xs font-bold uppercase tracking-wide">{current.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <ul
          role="listbox"
          aria-label={t.nav.chooseLanguage}
          className="absolute right-0 top-full mt-2 w-44 rounded-xl-playful border-2 border-ink bg-surface shadow-flat-light dark:shadow-flat-dark overflow-hidden z-50"
        >
          {LOCALES.map((entry) => {
            const isActive = entry.code === locale;
            return (
              <li key={entry.code} role="option" aria-selected={isActive}>
                <button
                  type="button"
                  onClick={(): void => { selectLocale(entry.code); }}
                  className={`w-full flex items-center justify-between gap-2 px-4 py-2.5 text-sm font-display font-semibold text-left transition-colors ${
                    isActive
                      ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-300'
                      : 'text-ink/80 hover:bg-line/40'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted">{entry.code}</span>
                    {entry.label}
                  </span>
                  {isActive && <Check className="w-4 h-4" />}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default LocaleSwitcher;
