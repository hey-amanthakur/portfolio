import type { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useTypewriter } from '@/hooks/useTypewriter';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface ITerminalSectionProps {
  readonly id: string;
  readonly command: string;          // e.g.  "cat about.md"
  readonly cwd?: string;             // default ~/portfolio
  readonly branch?: string;          // default main
  readonly children: ReactNode;
  readonly className?: string;
  readonly ariaLabel?: string;
}

/**
 * Wraps a page section in a terminal prompt + output block.
 *
 *   aman@portfolio:~/portfolio (main) $ cat about.md|
 *   ┌─ output ───────────────────────────────────────
 *   │  <children>
 *   └────────────────────────────────────────────────
 */
export const TerminalSection: FC<ITerminalSectionProps> = ({
  id,
  command,
  cwd = '~/portfolio',
  branch = 'main',
  children,
  className = '',
  ariaLabel,
}) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.05 });
  const { typed, done } = useTypewriter(command, isVisible, 28, 120);

  return (
    <section
      ref={ref}
      id={id}
      aria-label={ariaLabel}
      className={`relative py-16 md:py-20 ${className}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Prompt line */}
        <div
          data-testid={`${id}-prompt`}
          className="font-mono text-sm sm:text-base mb-6 flex flex-wrap items-baseline gap-x-2 dark:text-dark-text"
        >
          <span className="dark:text-phosphor-dim text-light-muted">
            aman@portfolio
          </span>
          <span className="dark:text-phosphor-dim text-light-muted">:</span>
          <span className="dark:text-phosphor text-primary-400">{cwd}</span>
          <span className="dark:text-phosphor-dim text-light-muted">({branch})</span>
          <span className="dark:text-phosphor-amber text-primary-400 mx-1">$</span>
          <span className="dark:text-dark-text text-light-text whitespace-pre">
            {typed}
            {!done && <span className="cursor-blink-inline" aria-hidden="true" />}
          </span>
        </div>

        {/* Output block */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.25, ease: 'easeOut' }}
          className="relative dark:border-l-2 dark:border-crt-dim dark:pl-5 md:dark:pl-7"
        >
          {/* ASCII output marker (dark-only) */}
          <div className="hidden dark:block absolute -left-[7px] top-0 font-mono text-xs text-phosphor-dim select-none">
            ┌
          </div>
          <div className="hidden dark:block absolute -left-[7px] bottom-0 font-mono text-xs text-phosphor-dim select-none">
            └
          </div>
          {children}
        </motion.div>
      </div>
    </section>
  );
};
