import { useCallback, useState, type FC } from 'react';
import { Globe } from 'lucide-react';
import { LOCALES, useI18n } from '@/i18n';

interface ILocaleBubbleProps {
  readonly className?: string;
}

export const LocaleBubble: FC<ILocaleBubbleProps> = ({ className }) => {
  const { locale, setLocale } = useI18n();
  const [pulse, setPulse] = useState<boolean>(false);

  const cycleLocale = useCallback((): void => {
    const idx = LOCALES.findIndex((entry) => entry.code === locale);
    const next = LOCALES[(idx + 1) % LOCALES.length].code;
    setLocale(next);
    setPulse(true);
    setTimeout((): void => { setPulse(false); }, 300);
  }, [locale, setLocale]);

  const current = LOCALES.find((entry) => entry.code === locale) ?? LOCALES[0];

  return (
    <button
      type="button"
      onClick={cycleLocale}
      aria-label="Cycle language"
      className={`flex items-center gap-1.5 px-2.5 h-10 rounded-xl-playful border-2 border-ink bg-surface shadow-flat-light dark:shadow-flat-dark hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-150 text-ink font-mono text-xs font-bold uppercase tracking-wide ${pulse ? 'scale-90' : ''} ${className ?? ''}`}
    >
      <Globe className="w-4 h-4 text-muted" />
      {current.code}
    </button>
  );
};

export default LocaleBubble;