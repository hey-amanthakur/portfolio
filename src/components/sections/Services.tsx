import type { FC, ComponentType, SVGProps } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, ChefHat, ArrowRight } from 'lucide-react';
import { services } from '@/data';
import type { IServiceIcon } from '@/types';
import { getContentOverrides, localize, useI18n } from '@/i18n';
import { Badge } from '@components/ui/Badge';
import { SpotlightCard } from '@components/ui/SpotlightCard';
import { MagneticButton } from '@components/ui/MagneticButton';
import { SectionReveal } from '@components/ui/SectionReveal';
import { SectionShell } from '@components/ui/SectionShell';
import { SECTION_IDS, SERVICE_IDS, ROUTES } from '@/constants';
import type { ServiceId } from '@/constants';
import { GlowingEffect } from '@components/ui/GlowingEffect';

const iconMap: Readonly<Record<IServiceIcon, ComponentType<SVGProps<SVGSVGElement>>>> = {
  Terminal,
  Cpu,
  ChefHat,
};

const ingredientsByService: Readonly<Record<ServiceId, readonly string[]>> = {
  [SERVICE_IDS.fullstack]: ['React 18', 'Spring Boot 3', 'Java 21', 'TypeScript', 'Jest/Vitest', 'APIs'],
  [SERVICE_IDS.aiConsulting]: ['LLMs', 'Prompt Engineering', 'RAG Search', 'LangChain', 'AI Agents', 'OpenAI'],
  [SERVICE_IDS.contentCreation]: ['Storytelling', 'Reels Strategy', 'Hook Writing', 'Video Editing', 'Analytics'],
};

const getIngredients = (serviceId: ServiceId): readonly string[] => ingredientsByService[serviceId];

const accentGradients: Readonly<Record<ServiceId, string>> = {
  [SERVICE_IDS.fullstack]: 'from-primary-400/20 to-primary-500/5',
  [SERVICE_IDS.aiConsulting]: 'from-secondary-400/20 to-secondary-500/5',
  [SERVICE_IDS.contentCreation]: 'from-primary-400/10 via-secondary-400/10 to-primary-400/5',
};

export const Services: FC = () => {
  const { t, locale } = useI18n();
  const content = getContentOverrides(locale);

  return (
    <SectionShell
      id={SECTION_IDS.services}
      aria-label={t.meta.sectionLabels.services}
      tone="canvas"
    >
      <div className="bg-grid-pattern-light dark:bg-grid-pattern-dark absolute inset-0 pointer-events-none" />
      <GlowingEffect className="top-1/3 left-1/4 opacity-15" color="#ff6b35" size={500} />
      <GlowingEffect className="bottom-1/3 right-1/4 opacity-10" color="#2ec4b6" size={400} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <SectionReveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-line bg-surface font-mono text-[11px] uppercase tracking-widest text-muted mb-4">
            <span>{t.services.badge}</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight">
            {t.services.heading}
          </h2>
          <p className="mt-4 text-muted font-body text-lg">
            {t.services.subtext}
          </p>
        </SectionReveal>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((item, index) => {
            const IconComponent = iconMap[item.icon];
            const ingredients = getIngredients(item.id);
            const isChefSpecial = item.id === SERVICE_IDS.fullstack;
            const override = content.services?.[item.id];

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
                        ? 'border-primary-400 dark:border-primary-400 bg-surface'
                        : 'border-line bg-surface'
                    } transition-colors duration-300 overflow-hidden`}
                  >
                    {/* Background gradient accent */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${accentGradients[item.id]} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

                    {/* Chef Special Tag */}
                    {isChefSpecial && (
                      <motion.span
                        initial={{ rotate: -3 }}
                        animate={{ rotate: -3 }}
                        className="absolute top-4 right-4 bg-primary-400 text-white px-3 py-1 rounded-full border-2 border-white/20 font-mono font-bold text-[10px] uppercase shadow-lg shadow-primary-400/30 z-10"
                      >
                        {t.services.mostBooked}
                      </motion.span>
                    )}

                    <div className="w-full text-left relative z-10">
                      {/* Course Category Icon */}
                      <motion.div
                        whileHover={{ rotate: 12, scale: 1.1 }}
                        className={`w-14 h-14 rounded-2xl border-2 border-ink flex items-center justify-center shadow-lg mb-6 ${
                          isChefSpecial ? 'bg-primary-400 shadow-primary-400/30' : 'bg-secondary-400 shadow-secondary-400/30'
                        }`}
                      >
                        <IconComponent className="w-7 h-7 text-white" />
                      </motion.div>

                      <h3 className="font-display font-black text-2xl text-ink tracking-tight leading-tight">
                        {localize(override?.title, item.title)}
                      </h3>
                      <p className="text-xs font-display font-bold text-primary-400 uppercase tracking-wider mt-1.5">
                        {localize(override?.tagline, item.tagline)}
                      </p>

                      <p className="mt-4 text-sm text-muted font-body leading-relaxed">
                        {localize(override?.description, item.description)}
                      </p>
                    </div>

                    {/* "Ingredients" Section */}
                    <div className="w-full mt-6 pt-6 border-t-2 border-line text-left relative z-10">
                      <span className="text-[10px] font-mono text-muted block mb-2 uppercase tracking-widest">
                        {t.services.stackLabel}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {ingredients.map((ing) => (
                          <Badge key={ing} variant="neutral" className="px-2 py-0.5 text-[10px]">
                            {ing}
                          </Badge>
                        ))}
                      </div>

                      <MagneticButton strength={0.15} className="mt-6 w-full">
                        <a
                          href={ROUTES.contact}
                          className="w-full py-2.5 flex items-center justify-center gap-2 border-2 border-ink font-display font-black text-xs rounded-xl bg-surface hover:bg-primary-50 dark:hover:bg-canvas text-ink transition-colors group/btn"
                        >
                          {t.services.startProject}
                          <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />                        </a>
                      </MagneticButton>
                    </div>

                  </motion.div>
                </SpotlightCard>
              </SectionReveal>
            );
          })}
        </div>

      </div>
    </SectionShell>
  );
};
export default Services;
