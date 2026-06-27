import type { FC } from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '@/data/content';
import { TerminalSection } from '@components/ui/TerminalSection';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export const Testimonials: FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <TerminalSection
      id="testimonials"
      command="tail -n 4 ./reviews.log"
      ariaLabel="Client testimonials"
    >
      <div ref={ref} className="font-mono">
        <p className="text-xs dark:text-phosphor-dim text-light-muted mb-5">
          ── what founders say · last refresh: just now ──
        </p>

        <ul className="space-y-6 max-w-3xl">
          {testimonials.map((t, i) => (
            <motion.li
              key={t.id}
              initial={{ opacity: 0, y: 10 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.12 }}
              className="dark:border-l-2 dark:border-crt-dim dark:hover:border-crt-bright border-l-2 border-light-border pl-4 transition-colors"
            >
              <div className="text-[12px] dark:text-phosphor-dim text-light-muted mb-1.5">
                [2025-{(11 + i).toString().padStart(2, '0')}-1{i + 2}] <span className="dark:text-phosphor-amber text-primary-400">★★★★★</span>
              </div>
              <blockquote className="dark:text-dark-text text-light-text text-[15px] leading-relaxed">
                &gt; {t.quote.replace(/['"]/g, '')}
              </blockquote>
              <div className="mt-3 text-[12px] dark:text-phosphor-amber text-primary-400">
                — {t.name}{' '}
                <span className="dark:text-phosphor-dim text-light-muted">
                  · {t.role} @ {t.company}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </TerminalSection>
  );
};

export default Testimonials;
