import type { ILocale } from './types';
import type { LocaleCode } from './locales';
import { en } from './en';
import { fr } from './fr';
import { de } from './de';
import { ja } from './ja';
import { ko } from './ko';

/**
 * Translations registry — the single place a locale code maps to its strings.
 * The English object is the structural reference (every locale must satisfy
 * the same shape); a missing locale simply falls back to English.
 */
export const translations: Readonly<Record<LocaleCode, ILocale>> = {
  en,
  fr,
  de,
  ja,
  ko,
} as const;
