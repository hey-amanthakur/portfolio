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
import { DEFAULT_LOCALE, isLocaleCode, type LocaleCode } from './locales';
import { en } from './en';

export { LOCALES, DEFAULT_LOCALE, isLocaleCode, type LocaleCode, type ILocaleMeta } from './locales';
export { en };
export { useI18n } from './useI18n';
export { LocaleProvider } from './LocaleProvider';

export const getLocale = (code: string): LocaleCode =>
  isLocaleCode(code) ? code : DEFAULT_LOCALE;

/**
 * Reads a translated field off a locale content override, falling back to
 * the canonical English value from the data files when the field is omitted.
 */
export const localize = <T>(override: T | undefined, fallback: T): T => override ?? fallback;