import { STORAGE_KEYS } from '@/constants';
import { DEFAULT_LOCALE, isLocaleCode, type LocaleCode } from './locales';

const canUseStorage = (): boolean =>
  typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';

export const loadStoredLocale = (): LocaleCode => {
  if (!canUseStorage()) return DEFAULT_LOCALE;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEYS.locale);
    return isLocaleCode(stored ?? '') ? stored : DEFAULT_LOCALE;
  } catch {
    return DEFAULT_LOCALE;
  }
};

export const persistLocale = (locale: LocaleCode): void => {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(STORAGE_KEYS.locale, locale);
  } catch {
    // Storage may be unavailable (private mode, full quota) — persist is best-effort.
  }
};
