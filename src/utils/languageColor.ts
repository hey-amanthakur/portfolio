const LANGUAGE_COLORS: Readonly<Record<string, string>> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  Java: '#b07219',
  Go: '#00ADD8',
  Rust: '#dea584',
};

/**
 * GitHub-style language dot color. Falls back to a neutral gray for
 * unknown languages so cards never break on a new repo.
 */
export const languageColor = (language: string): string => LANGUAGE_COLORS[language] ?? '#8b8b8b';
