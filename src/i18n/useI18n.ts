import { createContext, useContext } from 'react';
import type { ILocale } from './types';
import { DEFAULT_LOCALE, type LocaleCode } from './locales';
import { translations } from './translations';

export interface II18nContext {
  readonly locale: LocaleCode;
  readonly setLocale: (locale: LocaleCode) => void;
  /** UI strings for the active locale. */
  readonly t: ILocale['ui'];
  /** True when the active locale has any content overrides. */
  readonly hasContentOverrides: boolean;
}

/**
 * Default context: English, no-op setter. This lets components render with
 * `useI18n()` even when no <LocaleProvider> wraps them (unit tests, SSR
 * fallbacks) — the site is natively English so behaviour is identical.
 */
export const I18nContext = createContext<II18nContext>({
  locale: DEFAULT_LOCALE,
  setLocale: () => undefined,
  t: translations[DEFAULT_LOCALE].ui,
  hasContentOverrides: false,
});

export const useI18n = (): II18nContext => useContext(I18nContext);
