import type { ILocaleContent, IUIStrings } from './types';
import { translations } from './translations';
import { DEFAULT_LOCALE, isLocaleCode, type LocaleCode } from './locales';

export type {
  ILocale,
  ILocaleContent,
  IUIStrings,
  ProjectId,
  MilestoneId,
  TestimonialId,
  RepoId,
  OssId,
  NavKey,
} from './types';
export { LOCALES, DEFAULT_LOCALE, isLocaleCode, type LocaleCode, type ILocaleMeta } from './locales';
export { translations } from './translations';
export { useI18n, I18nContext, type II18nContext } from './useI18n';
export { LocaleProvider } from './LocaleProvider';

export const getLocale = (code: string): LocaleCode =>
  isLocaleCode(code) ? code : DEFAULT_LOCALE;

export const getUIStrings = (code: string): IUIStrings => translations[getLocale(code)].ui;

export const getContentOverrides = (code: string): ILocaleContent => translations[getLocale(code)].content;

/**
 * Reads a translated field off a locale content override, falling back to
 * the canonical English value from the data files when the field is omitted.
 */
export const localize = <T>(override: T | undefined, fallback: T): T => override ?? fallback;
