import type { FC, ComponentType, SVGProps } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, ChefHat, ArrowRight } from 'lucide-react';
import { services } from '@/data/content';
import { Badge } from '@components/ui/Badge';
import { SpotlightCard } from '@components/ui/SpotlightCard';
import { MagneticButton } from '@components/ui/MagneticButton';
import { SectionReveal } from '@components/ui/SectionReveal';
import { GlowingEffect } from '@components/ui/GlowingEffect';

type IconKey = 'Terminal' | 'Cpu' | 'ChefHat';

const iconMap: Readonly<Record<IconKey, ComponentType<SVGProps<SVGSVGElement>>>> = {
  Terminal,
  Cpu,
  ChefHat,
};

const getIngredients = (serviceId: string): readonly string[] => {
  if (serviceId === 'fullstack') {
    return ['React 18', 'Spring Boot 3', 'Java 21', 'TypeScript', 'Jest/Vitest', 'APIs'] as const;
  }
  if (serviceId === 'ai-consulting') {
    return ['LLMs', 'Prompt Engineering', 'RAG Search', 'LangChain', 'AI Agents', 'OpenAI'] as const;
  }
  return ['Storytelling', 'Reels Strategy', 'Hook Writing', 'Video Editing', 'Analytics'] as const;
};

const accentGradients: Record<string, string> = {
  fullstack: 'from-primary-400/20 to-primary-500/5',
  'ai-consulting': 'from-secondary-400/20 to-secondary-500/5',
  'content-creation': 'from-primary-400/10 via-secondary-400/10 to-primary-400/5',
};

export const Services: FC = () => {
  return (
    <section
      id="services"
      aria-label="Aman Thakur Freelance Services Menu"
      className="py-24 bg-light-bg dark:bg-dark-bg transition-colors duration-300 relative overflow-hidden"
    >
      <div className="bg-grid-pattern-light dark:bg-grid-pattern-dark absolute inset-0 pointer-events-none" />
      <GlowingEffect className="top-1/3 left-1/4 opacity-15" color="#ff6b35" size={500} />
      <GlowingEffect className="bottom-1/3 right-1/4 opacity-10" color="#2ec4b6" size={400} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <SectionReveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface font-mono text-[11px] uppercase tracking-widest text-light-muted dark:text-dark-muted mb-4">
            <span>services</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-light-text dark:text-dark-text tracking-tight">
            What I build for clients.
          </h2>
          <p className="mt-4 text-light-muted dark:text-dark-muted font-body text-lg">
            Pick a track — every engagement is scoped, milestoned, and shipped with strict typing and tests.
          </p>
        </SectionReveal>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((item, index) => {
            const IconComponent = iconMap[item.icon as IconKey];
            const ingredients = getIngredients(item.id);
            const isChefSpecial = item.id === 'fullstack';

            return (
              <SectionReveal key={item.id} delay={index * 0.15} className="h-full flex">
                <SpotlightCard
                  className="w-full h-full"
                  spotlightColor={isChefSpecial ? 'rgba(255, 107, 53, 0.15)' : 'rgba(46, 196, 182, 0.1)'}
                >
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`relative p-8 flex flex-col items-start justify-between w-full h-full rounded-xl-playful border-2 ${
                      isChefSpecial
                        ? 'border-primary-400 dark:border-primary-400 bg-light-surface dark:bg-dark-surface'
                        : 'border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface'
                    } transition-colors duration-300 overflow-hidden`}
                  >
                    {/* Background gradient accent */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${accentGradients[item.id] ?? ''} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                    {/* Chef Special Tag */}
                    {isChefSpecial && (
                      <motion.span
                        initial={{ rotate: -3 }}
                        animate={{ rotate: -3 }}
                        className="absolute top-4 right-4 bg-primary-400 text-white px-3 py-1 rounded-full border-2 border-white/20 font-mono font-bold text-[10px] uppercase shadow-lg shadow-primary-400/30 z-10"
                      >
                        most-booked
                      </motion.span>
                    )}

                    <div className="w-full text-left relative z-10">
                      {/* Course Category Icon */}
                      <motion.div
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        className={`w-14 h-14 rounded-2xl border-2 border-light-text dark:border-dark-text flex items-center justify-center shadow-lg mb-6 ${
                          isChefSpecial ? 'bg-primary-400 shadow-primary-400/30' : 'bg-secondary-400 shadow-secondary-400/30'
                        }`}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
                      </motion.div>

                      <h3 className="font-display font-black text-2xl text-light-text dark:text-dark-text tracking-tight leading-tight">
                        {item.title}
                      </h3>
                      <p className="text-xs font-display font-bold text-primary-400 uppercase tracking-wider mt-1.5">
                        {item.tagline}
                      </p>

                      <p className="mt-4 text-sm text-light-muted dark:text-dark-muted font-body leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* "Ingredients" Section */}
                    <div className="w-full mt-6 pt-6 border-t-2 border-light-border dark:border-dark-border text-left relative z-10">
                      <span className="text-[10px] font-mono text-light-muted dark:text-dark-muted block mb-2 uppercase tracking-widest">
                        // stack
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {ingredients.map((ing) => (
                          <Badge key={ing} variant="neutral" className="px-2 py-0.5 text-[10px]">
                            {ing}
                          </Badge>
                        ))}
                      </div>

                      <MagneticButton strength={0.15} className="mt-6 w-full">
                        <button
                          onClick={(): void => {
                            const el = document.getElementById('contact');
                            if (el !== null) {
                              el.scrollIntoView({ behavior: 'smooth' });
                              const selectEl = document.getElementById('serviceType') as HTMLSelectElement | null;
                              if (selectEl !== null) {
                                selectEl.value = item.id;
                              }
                            }
                          }}
                          className="w-full py-2.5 flex items-center justify-center gap-2 border-2 border-light-text dark:border-dark-text font-display font-black text-xs rounded-xl bg-white dark:bg-dark-surface hover:bg-primary-50 dark:hover:bg-dark-bg text-light-text dark:text-dark-text transition-colors group/btn"
                        >
                          Start a project
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                        </button>
                      </MagneticButton>
                    </div>

                  </motion.div>
                </SpotlightCard>
              </SectionReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};
export default Services;
