import { useState } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Layers, Search, Star, GitFork, GitPullRequest, Handshake } from 'lucide-react';
import { projects, pinnedRepos, openSourceContributions } from '@/data/content';
import { Badge } from '@components/ui/Badge';
import { SpotlightCard } from '@components/ui/SpotlightCard';
import { MagneticButton } from '@components/ui/MagneticButton';
import { SectionReveal } from '@components/ui/SectionReveal';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { GitHubIcon } from '@components/icons';

type FilterTag = 'All' | 'React' | 'Java' | 'Spring Boot' | 'AI' | 'TypeScript' | 'Python';

export const Portfolio: FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterTag>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.05 });

  const filterCategories: readonly FilterTag[] = ['All', 'React', 'TypeScript', 'Java', 'Spring Boot', 'AI', 'Python'] as const;

  const filteredProjects = projects.filter((project) => {
    const matchesFilter =
      activeFilter === 'All' ||
      project.tags.some((tag) => tag.toLowerCase() === activeFilter.toLowerCase());

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <section
      ref={ref}
      id="portfolio"
      aria-label="Aman Thakur Coding Projects Portfolio"
      className="py-24 bg-light-surface dark:bg-dark-surface border-y-2 border-light-border dark:border-dark-border transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <SectionReveal className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg font-mono text-[11px] uppercase tracking-widest text-light-muted dark:text-dark-muted mb-4">
            <span>selected work</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-light-text dark:text-dark-text tracking-tight">
            Things I&apos;ve shipped.
          </h2>
          <p className="mt-4 text-light-muted dark:text-dark-muted font-body text-lg">
            Production systems, hackathon winners, and the occasional weekend experiment — code that earns its keep.
          </p>
        </SectionReveal>

        {/* Pinned Repos from GitHub */}
        <SectionReveal delay={0.1} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <GitHubIcon className="w-5 h-5 text-light-text dark:text-dark-text" />
            <h3 className="font-display font-black text-xl sm:text-2xl text-light-text dark:text-dark-text tracking-tight">
              Pinned repositories
            </h3>
            <span className="font-mono text-xs text-light-muted dark:text-dark-muted ml-auto hidden sm:inline">
              @hey-amanthakur
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedRepos.map((repo, index) => (
              <motion.a
                key={repo.id}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group block p-5 rounded-2xl border-2 border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg hover:border-primary-400 transition-all duration-300 hover:shadow-xl hover:shadow-primary-400/10"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-display font-bold text-sm text-primary-400 group-hover:text-primary-300 truncate">
                    {repo.name}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-light-muted dark:text-dark-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>

                <p className="text-xs text-light-muted dark:text-dark-muted font-body leading-relaxed mb-3 line-clamp-2">
                  {repo.description || 'No description provided.'}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-light-muted dark:text-dark-muted">
                  {repo.language && (
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{
                          backgroundColor:
                            repo.language === 'TypeScript'
                              ? '#3178c6'
                              : repo.language === 'JavaScript'
                                ? '#f7df1e'
                                : repo.language === 'Python'
                                  ? '#3572A5'
                                  : repo.language === 'Java'
                                    ? '#b07219'
                                    : '#8b8b8b',
                        }}
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
                </div>
              </motion.a>
            ))}
          </div>
        </SectionReveal>

        {/* Open Source Contributions */}
        <SectionReveal delay={0.05} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Handshake className="w-5 h-5 text-primary-400" />
            <h3 className="font-display font-black text-xl sm:text-2xl text-light-text dark:text-dark-text tracking-tight">
              Open source contributions
            </h3>
            <Badge variant="primary" className="ml-auto hidden sm:inline-flex px-3 py-1 text-[10px]">
              contributor
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {openSourceContributions.map((contribution, index) => (
              <motion.a
                key={contribution.id}
                href={contribution.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3, delay: index * 0.08 }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="group block p-5 rounded-2xl border-2 border-dashed border-primary-400/40 dark:border-primary-400/30 bg-light-bg dark:bg-dark-bg hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-400/5 transition-all duration-300 hover:shadow-xl hover:shadow-primary-400/10"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="font-display font-bold text-sm text-primary-400 group-hover:text-primary-300 truncate">
                    {contribution.org}/{contribution.name}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-light-muted dark:text-dark-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>

                <p className="text-xs text-light-muted dark:text-dark-muted font-body leading-relaxed mb-3 line-clamp-2">
                  {contribution.description}
                </p>

                <div className="flex items-center gap-3 text-[11px] text-light-muted dark:text-dark-muted">
                  {contribution.language && (
                    <span className="flex items-center gap-1">
                      <span
                        className="w-2.5 h-2.5 rounded-full inline-block"
                        style={{
                          backgroundColor:
                            contribution.language === 'TypeScript'
                              ? '#3178c6'
                              : contribution.language === 'JavaScript'
                                ? '#f7df1e'
                                : contribution.language === 'Python'
                                  ? '#3572A5'
                                  : contribution.language === 'Java'
                                    ? '#b07219'
                                    : '#8b8b8b',
                        }}
                      />
                      {contribution.language}
                    </span>
                  )}
                  {contribution.prCount > 0 && (
                    <span className="flex items-center gap-1">
                      <GitPullRequest className="w-3 h-3" />
                      {contribution.prCount} PR{contribution.prCount === 1 ? '' : 's'}
                    </span>
                  )}
                </div>
              </motion.a>
            ))}
          </div>
        </SectionReveal>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-light-border dark:via-dark-border to-transparent" />
          <span className="text-xs font-mono font-bold text-light-muted dark:text-dark-muted uppercase tracking-widest">
            // case studies
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-light-border dark:via-dark-border to-transparent" />
        </div>

        {/* Filter & Search Bar Panel */}
        <SectionReveal delay={0.15} className="mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-light-bg dark:bg-dark-bg p-4 rounded-2xl-playful border-2 border-light-border dark:border-dark-border">
            <div className="flex flex-wrap gap-2 justify-center">
              {filterCategories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={(): void => { setActiveFilter(cat); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2 font-display font-bold text-xs rounded-full border-2 border-light-text dark:border-dark-text transition-all duration-300 ${
                    activeFilter === cat
                      ? 'bg-primary-400 text-white shadow-lg shadow-primary-400/30'
                      : 'bg-white dark:bg-dark-surface text-light-text dark:text-dark-text hover:bg-primary-50'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-light-muted dark:text-dark-muted">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder="Search projects, tech stacks..."
                value={searchQuery}
                onChange={(e): void => { setSearchQuery(e.target.value); }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-light-text dark:border-dark-text bg-white dark:bg-dark-surface text-light-text dark:text-dark-text focus:outline-none focus:border-primary-400 focus:shadow-lg focus:shadow-primary-400/10 font-mono text-sm transition-all duration-300"
              />
            </div>
          </div>
        </SectionReveal>

        {/* Projects Cards Layout */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05, type: 'spring', stiffness: 200, damping: 20 }}
                className="flex"
              >
                <SpotlightCard
                  className="w-full h-full"
                  spotlightColor="rgba(255, 107, 53, 0.12)"
                >
                  <motion.div
                    whileHover={{ y: -4 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`flex flex-col w-full h-full text-left rounded-xl-playful border-2 ${
                      project.featured
                        ? 'border-primary-400/50 dark:border-primary-400/50'
                        : 'border-light-border dark:border-dark-border'
                    } bg-light-surface dark:bg-dark-surface overflow-hidden`}
                  >
                    {/* Project Image Frame */}
                    <div className="w-full aspect-[16/9] overflow-hidden relative border-b-2 border-light-border dark:border-dark-border bg-gray-100">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        width="800"
                        height="450"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />

                      {project.featured && (
                        <span className="absolute top-4 left-4 bg-secondary-400 text-white border-2 border-white/30 px-3 py-1 rounded-full font-mono font-bold text-[10px] uppercase shadow-lg shadow-secondary-400/30">
                          featured
                        </span>
                      )}
                    </div>

                    {/* Project Body */}
                    <div className="p-6 flex flex-col justify-between flex-grow">
                      <div>
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-[9px]">
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <h3 className="font-display font-black text-xl text-light-text dark:text-dark-text tracking-tight group-hover:text-primary-400 leading-snug transition-colors">
                          {project.title}
                        </h3>

                        <p className="mt-3 text-sm text-light-muted dark:text-dark-muted font-body leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {/* Action buttons footer */}
                      <div className="mt-6 pt-4 border-t border-light-border dark:border-dark-border flex items-center gap-3">
                        {project.repoUrl !== undefined && (
                          <MagneticButton strength={0.15}>
                            <a
                              href={project.repoUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 font-display font-bold text-xs rounded-xl border-2 border-light-text dark:border-dark-text bg-white dark:bg-dark-surface text-light-text dark:text-dark-text hover:bg-primary-50 shadow-flat-light dark:shadow-flat-dark active:translate-x-0.5 active:translate-y-0.5"
                            >
                              <GitHubIcon className="w-4 h-4" />
                              Source Code
                            </a>
                          </MagneticButton>
                        )}

                        {project.liveUrl !== undefined && (
                          <MagneticButton strength={0.15}>
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-4 py-2 font-display font-bold text-xs rounded-xl border-2 border-light-text dark:border-dark-text bg-primary-400 text-white hover:bg-primary-300 shadow-lg shadow-primary-400/20 active:translate-x-0.5 active:translate-y-0.5"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Live Demo
                            </a>
                          </MagneticButton>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </SpotlightCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty Search Fallback */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full py-12 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-light-bg dark:bg-dark-bg border-2 border-dashed border-light-text dark:border-dark-text flex items-center justify-center mx-auto mb-4">
              <Layers className="w-6 h-6 text-light-muted dark:text-dark-muted" />
            </div>
            <p className="font-display font-bold text-lg text-light-text dark:text-dark-text">No matching projects.</p>
            <p className="text-sm text-light-muted dark:text-dark-muted font-body mt-1">Try a broader tag — {`'React'`}, {`'TypeScript'`}, {`'Java'`}, or {`'AI'`}.</p>
          </motion.div>
        )}

      </div>
    </section>
  );
};
export default Portfolio;
