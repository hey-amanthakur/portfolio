import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { I18nContext, type II18nContext } from './useI18n';
import { DEFAULT_LOCALE, type LocaleCode } from './locales';
import { loadStoredLocale, persistLocale } from './storage';
import { en } from './en';
import type { ILocale } from './types';

const localeImports: Record<LocaleCode, () => Promise<{ default: ILocale; [key: string]: ILocale }>> = {
  fr: () => import(/* webpackChunkName: "locale-fr" */ './fr.ts'),
  de: () => import(/* webpackChunkName: "locale-de" */ './de.ts'),
  ja: () => import(/* webpackChunkName: "locale-ja" */ './ja.ts'),
  ko: () => import(/* webpackChunkName: "locale-ko" */ './ko.ts'),
};

interface ILocaleProviderProps {
  readonly children: ReactNode;
}

export const LocaleProvider = ({ children }: ILocaleProviderProps): ReactNode => {
  const [locale, setLocaleState] = useState<LocaleCode>(loadStoredLocale);
  const [data, setData] = useState<ILocale>(en);

  useEffect(() => {
    if (locale === DEFAULT_LOCALE) return;
    let active = true;
    void localeImports[locale]().then((module) => {
      const loaded = module[locale] ?? module.default;
      if (active) setData(loaded);
    });
    return () => { active = false; };
  }, [locale]);

  const currentData = locale === DEFAULT_LOCALE ? en : data;

  const setLocale = useCallback((next: LocaleCode) => {
    setLocaleState(next);
    persistLocale(next);
    if (next !== DEFAULT_LOCALE) document.documentElement.lang = next;
  }, []);

  const value = useMemo<II18nContext>(
    () => ({
      locale,
      setLocale,
      t: currentData.ui,
      content: currentData.content,
      hasContentOverrides: locale !== DEFAULT_LOCALE,
    }),
    [locale, currentData.ui, currentData.content, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};