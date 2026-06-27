import type { FC } from 'react';
import { motion } from 'framer-motion';
import { milestones } from '@/data/content';
import { TerminalSection } from '@components/ui/TerminalSection';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const categoryGlyph = (cat: 'code' | 'food'): string => (cat === 'code' ? '◆' : '◇');

export const About: FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <TerminalSection
      id="about"
      command="git log --oneline --since=2022"
      ariaLabel="Aman Thakur — journey timeline"
    >
      <div ref={ref} className="font-mono">
        <p className="text-xs dark:text-phosphor-dim text-light-muted mb-6">
          showing 4 commits on <span className="dark:text-phosphor-amber text-primary-400">main</span> · oldest → newest
        </p>

        <ul className="space-y-5 sm:space-y-6 max-w-3xl">
          {milestones.map((m, i) => {
            const hash = ['a3f9c12', 'b71d4e8', 'c5e80a1', 'd924bff'][i] ?? '0000000';
            return (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.12 }}
                className="group"
              >
                <div className="flex items-start gap-3 text-sm sm:text-[15px]">
                  {/* Commit hash */}
                  <span className="dark:text-phosphor-amber text-primary-400 select-none shrink-0 mt-0.5">
                    {hash}
                  </span>
                  {/* Year tag */}
                  <span className="dark:text-phosphor-dim text-light-muted select-none shrink-0 mt-0.5">
                    ({m.year})
                  </span>
                  {/* Category glyph */}
                  <span
                    className={`select-none shrink-0 mt-0.5 ${
                      m.category === 'code'
                        ? 'dark:text-phosphor-bright text-primary-400'
                        : 'dark:text-phosphor-amber text-secondary-400'
                    }`}
                    aria-hidden="true"
                  >
                    {categoryGlyph(m.category)}
                  </span>

                  <div className="min-w-0">
                    <h3 className="dark:text-dark-text text-light-text font-semibold leading-snug">
                      {m.title.replace(/[\u{1F3C6}\u{1F31F}\u{1F373}\u{1F4BB}\u{1F5FA}]\uFE0F?/gu, '').trim()}
                    </h3>
                    <p className="mt-1 dark:text-phosphor-dim text-light-muted text-[13px] leading-relaxed">
                      {m.description}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </ul>

        <p className="mt-8 text-xs dark:text-phosphor-dim text-light-muted">
          ── end of log ── press <span className="dark:text-phosphor-bright text-primary-400">q</span> to continue
        </p>
      </div>
    </TerminalSection>
  );
};
export default About;
