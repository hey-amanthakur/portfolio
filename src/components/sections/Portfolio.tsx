import { useState } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, Code2, Layers, Search, Filter } from 'lucide-react';
import { projects } from '@/data/content';
import { Card } from '@components/ui/Card';
import { Badge } from '@components/ui/Badge';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

type FilterTag = 'All' | 'React' | 'Java' | 'Spring Boot' | 'AI';

export const Portfolio: FC = () => {
  console.log('INSIDE PORTFOLIO - Lucide Icons:', { Github, ExternalLink, Code2, Layers, Search, Filter });
  const [activeFilter, setActiveFilter] = useState<FilterTag>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.05 });

  const filterCategories: ReadonlyArray<FilterTag> = ['All', 'React', 'Java', 'Spring Boot', 'AI'] as const;

  const filteredProjects = projects.filter((project) => {
    // Category Filter
    const matchesFilter =
      activeFilter === 'All' ||
      project.tags.some((tag) => tag.toLowerCase() === activeFilter.toLowerCase());

    // Search Query Filter
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
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display font-black text-3xl sm:text-5xl text-light-text dark:text-dark-text tracking-tight">
            Crafted Systems <span className="text-primary-400">💻</span>
          </h2>
          <p className="mt-4 text-light-muted dark:text-dark-muted font-body text-lg">
            Thoroughly engineered software architectures, custom REST modules, and assistive artificial intelligence systems.
          </p>
        </div>

        {/* Filter & Search Bar Panel */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 bg-light-bg dark:bg-dark-bg p-4 rounded-2xl-playful border-2 border-light-border dark:border-dark-border">
          {/* Filter Pill Buttons */}
          <div className="flex flex-wrap gap-2 justify-center">
            {filterCategories.map((cat) => (
              <button
                key={cat}
                onClick={(): void => setActiveFilter(cat)}
                className={`px-4 py-1.5 font-display font-bold text-xs rounded-full border-2 border-light-text dark:border-dark-text transition-all duration-200 ${
                  activeFilter === cat
                    ? 'bg-primary-400 text-white shadow-flat-primary dark:shadow-flat-primary scale-105'
                    : 'bg-white dark:bg-dark-surface text-light-text dark:text-dark-text hover:bg-primary-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Inputs */}
          <div className="relative w-full md:w-72">
            <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-light-muted dark:text-dark-muted">
              <Search className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search code recipes..."
              value={searchQuery}
              onChange={(e): void => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border-2 border-light-text dark:border-dark-text bg-white dark:bg-dark-surface text-light-text dark:text-dark-text focus:outline-none focus:border-primary-400 font-body text-sm font-semibold shadow-sm"
            />
          </div>
        </div>

        {/* Projects Cards Layout */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
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
                <Card
                  variant={project.featured ? 'flat-primary' : 'default'}
                  hoverEffect="lift"
                  className="flex flex-col w-full h-full text-left"
                >
                  {/* Project Image Frame */}
                  <div className="w-full aspect-[16/9] overflow-hidden relative border-b-2 border-light-border dark:border-dark-border bg-gray-100">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    
                    {/* Corner Tag */}
                    {project.featured && (
                      <span className="absolute top-4 left-4 bg-secondary-400 text-light-text border border-light-text px-2.5 py-0.5 rounded-full font-display font-extrabold text-[10px] uppercase shadow-sm">
                        Featured 🌟
                      </span>
                    )}
                  </div>

                  {/* Project Body details */}
                  <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                      {/* Tags list */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-[9px]">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <h3 className="font-display font-black text-xl text-light-text dark:text-dark-text tracking-tight group-hover:text-primary-400 leading-snug">
                        {project.title}
                      </h3>
                      
                      <p className="mt-3 text-sm text-light-muted dark:text-dark-muted font-body leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Action buttons footer */}
                    <div className="mt-6 pt-4 border-t border-light-border dark:border-dark-border flex items-center gap-3">
                      {project.repoUrl !== undefined && (
                        <a
                          href={project.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 font-display font-bold text-xs rounded-xl border-2 border-light-text dark:border-dark-text bg-white dark:bg-dark-surface text-light-text dark:text-dark-text hover:bg-primary-50 shadow-flat-light dark:shadow-flat-dark active:translate-x-0.5 active:translate-y-0.5"
                        >
                          <Github className="w-4 h-4" />
                          Source Code
                        </a>
                      )}
                      
                      {project.liveUrl !== undefined && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-4 py-2 font-display font-bold text-xs rounded-xl border-2 border-light-text dark:border-dark-text bg-primary-400 text-white hover:bg-primary-300 shadow-flat-primary dark:shadow-flat-primary active:translate-x-0.5 active:translate-y-0.5"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>

                </Card>
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
            <p className="font-display font-bold text-lg text-light-text dark:text-dark-text">No code recipes found!</p>
            <p className="text-sm text-light-muted dark:text-dark-muted font-body mt-1">Try searching for other tags like 'React' or 'Java'</p>
          </motion.div>
        )}

      </div>
    </section>
  );
};
export default Portfolio;
