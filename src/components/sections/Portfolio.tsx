import { useState } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, GitFork } from 'lucide-react';
import { projects, pinnedRepos } from '@/data/content';
import { TerminalSection } from '@components/ui/TerminalSection';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

type FilterTag = 'All' | 'React' | 'Java' | 'Spring Boot' | 'AI';

const langDot: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f7df1e',
  Python: '#3572A5',
  python3: '#3572A5',
  Java: '#b07219',
};

export const Portfolio: FC = () => {
  const [filter, setFilter] = useState<FilterTag>('All');
  const [query, setQuery] = useState<string>('');
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.05 });

  const cats: readonly FilterTag[] = ['All', 'React', 'Java', 'Spring Boot', 'AI'] as const;

  const filtered = projects.filter((p) => {
    const matchFilter =
      filter === 'All' ||
      p.tags.some((t) => t.toLowerCase() === filter.toLowerCase());
    const matchSearch =
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.description.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));
    return matchFilter && matchSearch;
  });

  return (
    <TerminalSection
      id="portfolio"
      command="ls projects/ && git pinned"
      ariaLabel="Selected work"
    >
      <div ref={ref} className="font-mono">
        {/* PINNED */}
        <div className="mb-10">
          <p className="text-xs dark:text-phosphor-dim text-light-muted mb-3">
            <span className="dark:text-phosphor-amber text-primary-400">›</span> git pinned · {pinnedRepos.length} repos
          </p>

          <ul className="space-y-2.5">
            {pinnedRepos.map((repo, i) => (
              <motion.li
                key={repo.id}
                initial={{ opacity: 0, x: -8 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`pinned-${repo.id}`}
                  className="block p-3 border dark:border-crt-dim border-light-border hover:dark:border-crt-bright hover:dark:shadow-crt-glow transition-all group"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="dark:text-phosphor-amber text-primary-400 text-sm">▸</span>
                    <span className="dark:text-phosphor-bright text-primary-400 text-sm font-semibold">
                      {repo.name}
                    </span>
                    <span className="dark:text-phosphor-dim text-light-muted text-xs ml-auto flex items-center gap-3">
                      {repo.language && (
                        <span className="flex items-center gap-1">
                          <span
                            className="inline-block w-2 h-2 rounded-full"
                            style={{ backgroundColor: langDot[repo.language] ?? '#888' }}
                          />
                          {repo.language}
                        </span>
                      )}
                      {repo.stars > 0 && (
                        <span className="flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          {repo.stars}
                        </span>
                      )}
                      {repo.forks > 0 && (
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3 h-3" />
                          {repo.forks}
                        </span>
                      )}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[12px] dark:text-phosphor-dim text-light-muted leading-relaxed pl-5">
                    {repo.description || 'No description provided.'}
                  </p>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* DIVIDER */}
        <div className="my-8 dark:text-crt-dim text-light-border text-xs select-none overflow-hidden whitespace-nowrap">
          ─── case studies ────────────────────────────────────────────────────────────
        </div>

        {/* SEARCH / FILTER */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex flex-wrap gap-1.5">
            {cats.map((c) => (
              <button
                key={c}
                onClick={(): void => { setFilter(c); }}
                data-testid={`filter-${c.toLowerCase().replace(' ', '-')}`}
                className={`text-[12px] px-2.5 py-1 border transition-all ${
                  filter === c
                    ? 'dark:border-crt-bright dark:text-phosphor-bright dark:shadow-crt-glow border-primary-400 text-primary-400'
                    : 'dark:border-crt-dim dark:text-phosphor-dim border-light-border text-light-muted hover:dark:border-dark-text'
                }`}
              >
                --tag={c.toLowerCase()}
              </button>
            ))}
          </div>

          <div className="sm:ml-auto flex items-center gap-2 border dark:border-crt-dim border-light-border px-3 py-1 dark:bg-dark-surface/40 bg-transparent">
            <span className="dark:text-phosphor-amber text-primary-400 text-xs">/</span>
            <input
              type="text"
              value={query}
              onChange={(e): void => { setQuery(e.target.value); }}
              placeholder="grep projects..."
              data-testid="portfolio-search"
              className="bg-transparent outline-none text-[12px] dark:text-dark-text text-light-text w-44 placeholder:dark:text-phosphor-dim placeholder:text-light-muted"
            />
            <span className="cursor-blink-inline" aria-hidden="true" />
          </div>
        </div>

        {/* PROJECT CARDS */}
        <motion.ul layout className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.li
                layout
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                data-testid={`project-${p.id}`}
                className="border dark:border-crt-dim border-light-border hover:dark:border-crt-bright transition-all"
              >
                <div className="grid md:grid-cols-[200px_1fr] gap-0">
                  {/* Thumb */}
                  <div className="aspect-video md:aspect-auto md:h-full bg-dark-surface dark:bg-dark-surface overflow-hidden relative border-b md:border-b-0 md:border-r dark:border-crt-dim border-light-border">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover dark:opacity-80 dark:hover:opacity-100 transition-opacity"
                    />
                    {p.featured && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 text-[10px] font-mono dark:text-phosphor-amber text-primary-400 bg-dark-bg/80 dark:border dark:border-crt-warn">
                        [★ featured]
                      </span>
                    )}
                  </div>

                  {/* Body */}
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-xs dark:text-phosphor-dim text-light-muted mb-1">
                      <span className="dark:text-phosphor-amber text-primary-400">›</span>
                      <span>{p.tags.join(' · ')}</span>
                    </div>
                    <h3 className="dark:text-dark-text text-light-text text-lg font-semibold">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 dark:text-phosphor-dim text-light-muted text-[13px] leading-relaxed">
                      {p.description}
                    </p>
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {p.repoUrl !== undefined && (
                        <a
                          href={p.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[12px] px-3 py-1 border dark:border-crt-dim border-light-border dark:text-dark-text text-light-text hover:dark:border-crt-bright hover:dark:text-phosphor-bright transition-all"
                        >
                          $ git clone
                        </a>
                      )}
                      {p.liveUrl !== undefined && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[12px] px-3 py-1 border border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-dark-bg transition-colors"
                        >
                          $ open --live
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {filtered.length === 0 && (
          <p className="mt-6 text-sm dark:text-phosphor-amber text-primary-400 font-mono">
            grep: no matches. try a broader pattern.
          </p>
        )}
      </div>
    </TerminalSection>
  );
};
export default Portfolio;
