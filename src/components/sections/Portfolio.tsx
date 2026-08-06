import { useState } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Layers, Handshake } from 'lucide-react';
import { projects, pinnedRepos, openSourceContributions } from '@/data';
import { Badge } from '@components/ui/Badge';
import { SectionReveal } from '@components/ui/SectionReveal';
import { SectionShell } from '@components/ui/SectionShell';
import { RepoCard } from '@components/ui/RepoCard';
import { ProjectCard } from '@components/ui/ProjectCard';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { GitHubIcon } from '@components/icons';
import { getContentOverrides, localize, useI18n } from '@/i18n';
import { ALL_FILTER, SECTION_IDS, projectCategories } from '@/constants';
import type { IProjectCategory } from '@/constants';
import type { RepoId, OssId } from '@/i18n/types';

type FilterTag = typeof ALL_FILTER | IProjectCategory;

export const Portfolio: FC = () => {
  const { t, locale } = useI18n();
  const content = getContentOverrides(locale);
  const [activeFilter, setActiveFilter] = useState<FilterTag>(ALL_FILTER);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.05 });

  const filterCategories: readonly FilterTag[] = [ALL_FILTER, ...projectCategories];

  const getFilterLabel = (cat: FilterTag): string =>
    cat === ALL_FILTER ? t.portfolio.allFilter : t.portfolio.categoryLabels[cat];

  const filteredProjects = projects.filter((project) => {
    const matchesFilter = activeFilter === ALL_FILTER || project.category === activeFilter;

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });

  return (
    <SectionShell
      ref={ref}
      id={SECTION_IDS.portfolio}
      aria-label={t.meta.sectionLabels.portfolio}
      tone="surface"
      border="y"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <SectionReveal className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-line bg-canvas font-mono text-[11px] uppercase tracking-widest text-muted mb-4">
            <span>{t.portfolio.badge}</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight">
            {t.portfolio.heading}
          </h2>
          <p className="mt-4 text-muted font-body text-lg">
            {t.portfolio.subtext}
          </p>
        </SectionReveal>

        {/* Pinned Repos from GitHub */}
        <SectionReveal delay={0.1} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <GitHubIcon className="w-5 h-5 text-ink" />
            <h3 className="font-display font-black text-xl sm:text-2xl text-ink tracking-tight">
              {t.portfolio.pinnedRepos}
            </h3>
            <span className="font-mono text-xs text-muted ml-auto hidden sm:inline">
              @hey-amanthakur
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pinnedRepos.map((repo, index) => (
              <RepoCard
                key={repo.id}
                name={repo.name}
                description={localize(content.pinnedRepos?.[repo.id as RepoId]?.description, repo.description)}
                url={repo.url}
                language={repo.language}
                stars={repo.stars}
                forks={repo.forks}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </SectionReveal>

        {/* Open Source Contributions */}
        <SectionReveal delay={0.05} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <Handshake className="w-5 h-5 text-primary-400" />
            <h3 className="font-display font-black text-xl sm:text-2xl text-ink tracking-tight">
              {t.portfolio.ossHeading}
            </h3>
            <Badge variant="primary" className="ml-auto hidden sm:inline-flex px-3 py-1 text-[10px]">
              {t.portfolio.contributor}
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {openSourceContributions.map((contribution, index) => (
              <RepoCard
                key={contribution.id}
                variant="oss"
                name={`${contribution.org}/${contribution.name}`}
                description={localize(content.oss?.[contribution.id as OssId]?.description, contribution.description)}
                url={contribution.url}
                language={contribution.language}
                prCount={contribution.prCount}
                index={index}
                isVisible={isVisible}
              />
            ))}
          </div>
        </SectionReveal>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-12">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
          <span className="text-xs font-mono font-bold text-muted uppercase tracking-widest">
            {t.portfolio.caseStudies}
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-line to-transparent" />
        </div>

        {/* Filter & Search Bar Panel */}
        <SectionReveal delay={0.15} className="mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-canvas p-4 rounded-2xl-playful border-2 border-line">
            <div className="flex flex-wrap gap-2 justify-center">
              {filterCategories.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={(): void => { setActiveFilter(cat); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-5 py-2 font-display font-bold text-xs rounded-full border-2 border-ink transition-all duration-300 ${
                    activeFilter === cat
                      ? 'bg-primary-400 text-white shadow-lg shadow-primary-400/30'
                      : 'bg-surface text-ink hover:bg-primary-50'
                  }`}
                >
                  {getFilterLabel(cat)}
                </motion.button>
              ))}
            </div>

            <div className="relative w-full md:w-72">
              <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted">
                <Search className="w-4 h-4" />
              </span>
              <input
                type="text"
                placeholder={t.portfolio.searchPlaceholder}
                value={searchQuery}
                onChange={(e): void => { setSearchQuery(e.target.value); }}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-ink bg-surface text-ink focus:outline-none focus:border-primary-400 focus:shadow-lg focus:shadow-primary-400/10 font-mono text-sm transition-all duration-300"
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
                <ProjectCard project={project} />
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
            <div className="w-16 h-16 rounded-full bg-canvas border-2 border-dashed border-ink flex items-center justify-center mx-auto mb-4">
              <Layers className="w-6 h-6 text-muted" />
            </div>
            <p className="font-display font-bold text-lg text-ink">{t.portfolio.noProjects}</p>
            <p className="text-sm text-muted font-body mt-1">{t.portfolio.noProjectsHint}</p>
          </motion.div>
        )}

      </div>
    </SectionShell>
  );
};
export default Portfolio;
