import type { FC } from 'react';
import { motion } from 'framer-motion';
import { services } from '@/data/content';
import { TerminalSection } from '@components/ui/TerminalSection';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const stackByService: Record<string, readonly string[]> = {
  fullstack: ['React 19', 'TypeScript', 'Spring Boot 3', 'Java 21', 'Postgres', 'Vitest', 'CI/CD'],
  'ai-consulting': ['LLMs', 'RAG', 'LangChain', 'Vector DBs', 'Prompt Eng.', 'OpenAI', 'Agents'],
  'content-creation': ['Storytelling', 'Reels', 'Hook Writing', 'Editing', 'Analytics'],
} as const;

export const Services: FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <TerminalSection
      id="services"
      command="ls -lh ./services/"
      ariaLabel="Services list"
    >
      <div ref={ref} className="font-mono text-sm">
        <p className="text-xs dark:text-phosphor-dim text-light-muted mb-3">
          total {services.length} · permissions: <span className="dark:text-phosphor-bright text-primary-400">-rwxr-xr-x</span>
        </p>

        {/* Header row */}
        <div className="hidden md:grid grid-cols-12 gap-3 text-[11px] dark:text-phosphor-dim text-light-muted border-b dark:border-crt-dim border-light-border pb-2 mb-3">
          <div className="col-span-1">type</div>
          <div className="col-span-3">name</div>
          <div className="col-span-5">summary</div>
          <div className="col-span-3 text-right">action</div>
        </div>

        <ul className="space-y-5">
          {services.map((s, i) => {
            const isPrimary = s.id === 'fullstack';
            const stack = stackByService[s.id] ?? [];
            return (
              <motion.li
                key={s.id}
                initial={{ opacity: 0, y: 8 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="dark:border-l-2 dark:border-crt-dim dark:hover:border-crt-bright dark:hover:shadow-crt-glow border-l-2 border-light-border pl-4 transition-all duration-200 group"
              >
                <div className="md:grid md:grid-cols-12 md:gap-3 md:items-baseline flex flex-col">
                  {/* Type */}
                  <div className="md:col-span-1">
                    <span className={`text-xs ${isPrimary ? 'dark:text-phosphor-amber text-primary-400' : 'dark:text-phosphor-dim text-light-muted'}`}>
                      {isPrimary ? '[★]' : '[ ]'}
                    </span>
                  </div>

                  {/* Name */}
                  <div className="md:col-span-3">
                    <h3 className="dark:text-dark-text text-light-text font-semibold text-base">
                      {s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}/
                    </h3>
                    <p className="text-[11px] dark:text-phosphor-amber text-primary-400 mt-0.5">
                      {s.tagline}
                    </p>
                  </div>

                  {/* Summary */}
                  <div className="md:col-span-5 mt-2 md:mt-0">
                    <p className="dark:text-phosphor-dim text-light-muted text-[13px] leading-relaxed">
                      {s.description}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="md:col-span-3 md:text-right mt-3 md:mt-0">
                    <a
                      href="#contact"
                      data-testid={`service-cta-${s.id}`}
                      className="inline-block text-[12px] px-3 py-1 border dark:border-crt-dim border-light-border dark:text-dark-text text-light-text hover:dark:border-crt-bright hover:dark:text-phosphor-bright hover:dark:shadow-crt-glow transition-all"
                    >
                      $ start
                    </a>
                  </div>
                </div>

                {/* Stack */}
                <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1 text-[11px] dark:text-phosphor-dim text-light-muted">
                  <span className="dark:text-crt-dim text-light-border">{'└─ stack:'}</span>
                  {stack.map((tag, idx) => (
                    <span key={tag} className="flex items-center gap-1">
                      <span>{tag}</span>
                      {idx < stack.length - 1 && <span className="dark:text-crt-dim text-light-border">·</span>}
                    </span>
                  ))}
                </div>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </TerminalSection>
  );
};
export default Services;
