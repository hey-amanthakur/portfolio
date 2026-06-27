import type { FC, ReactElement } from 'react';
import { motion } from 'framer-motion';
import { Award, Star, ChefHat, Code } from 'lucide-react';
import { milestones } from '@/data/content';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export const About: FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const getIcon = (category: 'code' | 'food', title: string): ReactElement => {
    if (title.includes('Winner')) return <Award className="w-5 h-5 text-white" />;
    if (title.includes('Star')) return <Star className="w-5 h-5 text-white" />;
    if (category === 'food') return <ChefHat className="w-5 h-5 text-white" />;
    return <Code className="w-5 h-5 text-white" />;
  };

  return (
    <section
      ref={ref}
      id="about"
      aria-label="Aman Thakur Story Timeline"
      className="py-24 bg-light-surface dark:bg-dark-surface border-y-2 border-light-border dark:border-dark-border transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-light-border dark:border-dark-border bg-light-bg dark:bg-dark-bg font-mono text-[11px] uppercase tracking-widest text-light-muted dark:text-dark-muted mb-4">
            <span>// the path so far</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-light-text dark:text-dark-text tracking-tight">
            From hackathon hall <span className="text-primary-400">→</span> production stack.
          </h2>
          <p className="mt-4 text-light-muted dark:text-dark-muted font-body text-lg">
            Three years of shipping software, winning hackathons, and — somewhere in between — running a food creator account.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l-4 border-light-text dark:border-dark-text ml-4 md:ml-32">
          {milestones.map((item, index) => {
            const isCode = item.category === 'code';
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                className="mb-12 last:mb-0 relative pl-8 md:pl-12 group"
              >
                {/* Timeline Bullet Node */}
                <div 
                  className={`absolute -left-[22px] top-1.5 w-10 h-10 rounded-xl-playful border-2 border-light-text dark:border-dark-text flex items-center justify-center shadow-flat-light dark:shadow-flat-dark group-hover:scale-110 transition-transform duration-200 ${
                    isCode ? 'bg-primary-400' : 'bg-secondary-400'
                  }`}
                >
                  {getIcon(item.category, item.title)}
                </div>

                {/* Milestone Detail Card */}
                <div className="bg-light-bg dark:bg-dark-bg border-2 border-light-border dark:border-dark-border p-6 rounded-2xl-playful relative hover:border-light-text dark:hover:border-dark-text transition-colors duration-200">
                  {/* Floating Year Label */}
                  <span
                    className={`absolute -top-3.5 left-4 px-3 py-0.5 rounded-full border-2 border-light-text dark:border-dark-text font-display font-black text-xs shadow-flat-light dark:shadow-flat-dark ${
                      isCode ? 'bg-primary-100 text-primary-900 dark:bg-primary-900 dark:text-primary-200' : 'bg-secondary-100 text-secondary-900 dark:bg-secondary-900 dark:text-secondary-200'
                    }`}
                  >
                    {item.year}
                  </span>

                  <h3 className="font-display font-extrabold text-xl text-light-text dark:text-dark-text mt-1">
                    {item.title}
                  </h3>
                  
                  <p className="mt-2 text-sm md:text-base text-light-muted dark:text-dark-muted font-body leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
export default About;
