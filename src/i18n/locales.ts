import type { ILocale } from './types';

/**
 * Supported locales — the labels shown in the language switcher use each
 * language's own name so a Korean speaker can find 한국어 regardless of the
 * current UI language.
 */
export const LOCALE_CODES = {
  en: 'en',
  fr: 'fr',
  de: 'de',
  ja: 'ja',
  ko: 'ko',
} as const;

export type LocaleCode = (typeof LOCALE_CODES)[keyof typeof LOCALE_CODES];

export interface ILocaleMeta {
  readonly code: LocaleCode;
  readonly label: string;
}

export const LOCALES: readonly ILocaleMeta[] = [
  { code: LOCALE_CODES.en, label: 'English' },
  { code: LOCALE_CODES.fr, label: 'Français' },
  { code: LOCALE_CODES.de, label: 'Deutsch' },
  { code: LOCALE_CODES.ja, label: '日本語' },
  { code: LOCALE_CODES.ko, label: '한국어' },
] as const;

export const DEFAULT_LOCALE: LocaleCode = LOCALE_CODES.en;

export const isLocaleCode = (value: string): value is LocaleCode =>
  LOCALES.some((locale) => locale.code === value);

// Backfill hook for the translations registry — typed to prevent typos.
export type LocaleModule = ILocale;
