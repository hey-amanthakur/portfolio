import type { FC, ReactElement } from 'react';
import { motion } from 'framer-motion';
import { Zap, Trophy, GraduationCap, Utensils } from 'lucide-react';
import { milestones } from '@/data';
import { SectionReveal } from '@components/ui/SectionReveal';
import { SectionShell } from '@components/ui/SectionShell';
import { AnimatedCounter } from '@components/ui/AnimatedCounter';
import { GlowingEffect } from '@components/ui/GlowingEffect';
import { SECTION_IDS, SECTION_LABELS, PERSONAS } from '@/constants';
import type { Persona } from '@/constants';

const getIcon = (category: Persona, title: string): ReactElement => {
  if (title.includes('Winner')) return <Trophy className="w-5 h-5 text-white" />;
  if (title.includes('Star') || title.includes('ML')) return <GraduationCap className="w-5 h-5 text-white" />;
  if (category === PERSONAS.food) return <Utensils className="w-5 h-5 text-white" />;
  return <Zap className="w-5 h-5 text-white" />;
};

const cardColors = [
  'bg-primary-400',
  'bg-primary-500',
  'bg-secondary-400',
  'bg-secondary-500',
] as const;

export const About: FC = () => {
  return (
    <SectionShell
      id={SECTION_IDS.about}
      aria-label={SECTION_LABELS.about}
      tone="surface"
      border="y"
    >
      <GlowingEffect className="top-20 right-20 opacity-20" color="#ff6b35" size={500} />
      <GlowingEffect className="bottom-20 left-20 opacity-15" color="#2ec4b6" size={400} />

      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <SectionReveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-line bg-canvas font-mono text-[11px] uppercase tracking-widest text-muted mb-4">
            <span>// the path so far</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight">
            From hackathon hall <span className="text-gradient-primary">→</span> production stack.
          </h2>
          <p className="mt-4 text-muted font-body text-lg">
            Three years of shipping software, winning hackathons, and — somewhere in between — running a food creator account.
          </p>
        </SectionReveal>

        {/* Stats Bento Grid */}
        <SectionReveal delay={0.1} className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { target: 10, suffix: '+', label: 'Open Source Contributions', color: 'from-primary-400 to-primary-500' },
              { target: 2, suffix: '×', label: 'Hackathon Wins', color: 'from-secondary-400 to-secondary-500' },
              { target: 50, suffix: 'K+', label: 'Food Community', color: 'from-primary-400 to-secondary-400' },
              { target: 3, suffix: '+', label: 'Years Coding', color: 'from-secondary-400 to-primary-400' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group p-6 rounded-2xl border-2 border-line bg-canvas hover:border-primary-400 dark:hover:border-primary-400 transition-all duration-300 overflow-hidden text-center"
              >
                <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" style={{ backgroundImage: `linear-gradient(135deg, var(--tw-gradient-stops))` }} />
                <AnimatedCounter target={stat.target} suffix={stat.suffix} className="text-3xl sm:text-4xl text-ink" />
                <p className="text-[11px] font-mono text-muted uppercase tracking-wider mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </SectionReveal>

        {/* Bento Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {milestones.map((item, index) => {
            const isCode = item.category === PERSONAS.code;
            const isWide = index === 0 || index === 3;

            return (
              <SectionReveal
                key={index}
                delay={index * 0.1}
                direction={index % 2 === 0 ? 'left' : 'right'}
                className={isWide ? 'md:col-span-2' : ''}
              >
                <motion.div
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative group p-6 sm:p-8 rounded-2xl border-2 border-line bg-canvas hover:border-ink dark:hover:border-ink transition-all duration-300 overflow-hidden h-full"
                >
                  {/* Accent stripe */}
                  <div className={`absolute top-0 left-0 w-full h-1 ${isCode ? 'bg-primary-400' : 'bg-secondary-400'} transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`} />

                  <div className={`flex ${isWide ? 'flex-col sm:flex-row' : 'flex-col'} items-start gap-5`}>
                    {/* Icon badge */}
                    <div className={`w-14 h-14 rounded-2xl ${cardColors[index] ?? 'bg-primary-400'} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {getIcon(item.category, item.title)}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-0.5 rounded-full font-display font-black text-xs ${
                          isCode
                            ? 'bg-primary-100 text-primary-800 dark:bg-primary-900/40 dark:text-primary-300'
                            : 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/40 dark:text-secondary-300'
                        }`}>
                          {item.year}
                        </span>
                        <span className="text-[10px] font-mono text-muted uppercase tracking-widest">
                          {isCode ? PERSONAS.code : PERSONAS.food}
                        </span>
                      </div>

                      <h3 className="font-display font-black text-xl sm:text-2xl text-ink tracking-tight leading-tight">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm sm:text-base text-muted font-body leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </SectionReveal>
            );
          })}
        </div>

      </div>
    </SectionShell>
  );
};
export default About;
