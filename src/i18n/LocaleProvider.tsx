import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { I18nContext } from './useI18n';
import { DEFAULT_LOCALE, type LocaleCode } from './locales';
import { loadStoredLocale, persistLocale } from './storage';
import { translations } from './translations';

interface ILocaleProviderProps {
  readonly children: ReactNode;
}

export const LocaleProvider = ({ children }: ILocaleProviderProps): ReactNode => {
  const [locale, setLocaleState] = useState<LocaleCode>(loadStoredLocale);

  const setLocale = useCallback((next: LocaleCode) => {
    setLocaleState(next);
    persistLocale(next);
    if (next !== DEFAULT_LOCALE) document.documentElement.lang = next;
  }, []);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: translations[locale].ui,
      hasContentOverrides: locale !== DEFAULT_LOCALE,
    }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};
