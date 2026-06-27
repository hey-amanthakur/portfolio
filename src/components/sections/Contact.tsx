import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Mail, Clock, MessageCircle } from 'lucide-react';
import { siteConfig, services } from '@/data/content';
import { TerminalSection } from '@components/ui/TerminalSection';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const buildWhatsAppMessage = (projectType = ''): string => {
  const service = services.find((s) => s.id === projectType);
  const lines = [
    `Hi Aman! 👋 I'd like to discuss a project.`,
    service ? `Service: ${service.title}` : `Service: ${projectType || 'General inquiry'}`,
    '',
    'Let me know your availability for a quick call!',
  ];
  return lines.join('\n');
};

export const Contact: FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const wa = (projectType = ''): string =>
    `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(buildWhatsAppMessage(projectType))}`;

  return (
    <TerminalSection
      id="contact"
      command="./hire-me.sh --interactive"
      ariaLabel="Contact / hire flow"
    >
      <div ref={ref} className="font-mono">
        <div className="text-sm space-y-1 dark:text-dark-text text-light-text">
          <p>
            <span className="dark:text-phosphor-amber text-primary-400">›</span> initializing contact channel...
          </p>
          <p>
            <span className="dark:text-phosphor-amber text-primary-400">›</span> spawning whatsapp · email · linkedin...{' '}
            <span className="dark:text-phosphor-bright text-secondary-400">ok</span>
          </p>
          <p>
            <span className="dark:text-phosphor-amber text-primary-400">›</span> active hours: 09:00 – 19:00 IST · tz: Asia/Kolkata
          </p>
          <p className="dark:text-phosphor-dim text-light-muted">
            <span className="dark:text-phosphor-amber text-primary-400">›</span> pick a service:
          </p>
        </div>

        {/* Service prompt menu */}
        <motion.ul
          initial="hidden"
          animate={isVisible ? 'show' : 'hidden'}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
          }}
          className="mt-4 mb-8 space-y-2"
        >
          {services.map((s, i) => (
            <motion.li
              key={s.id}
              variants={{
                hidden: { opacity: 0, x: -8 },
                show: { opacity: 1, x: 0 },
              }}
            >
              <a
                href={wa(s.id)}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`contact-cta-${s.id}`}
                className="group flex items-center gap-3 p-3 border dark:border-crt-dim border-light-border hover:dark:border-crt-bright hover:dark:shadow-crt-glow transition-all"
              >
                <span className="dark:text-phosphor-amber text-primary-400 text-sm">
                  [{i + 1}]
                </span>
                <div className="flex-grow">
                  <p className="dark:text-dark-text text-light-text text-sm font-semibold">
                    {s.title}
                  </p>
                  <p className="dark:text-phosphor-dim text-light-muted text-[12px]">
                    {s.tagline}
                  </p>
                </div>
                <span className="text-[12px] dark:text-phosphor-bright text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  → tap to chat
                </span>
              </a>
            </motion.li>
          ))}
        </motion.ul>

        {/* Quick channels */}
        <div className="text-sm dark:text-dark-text text-light-text space-y-1">
          <p>
            <span className="dark:text-phosphor-amber text-primary-400">›</span> or reach me directly:
          </p>
        </div>

        <div className="mt-3 grid sm:grid-cols-3 gap-2">
          <a
            href={`mailto:${siteConfig.email}`}
            data-testid="contact-email"
            className="flex items-center gap-2 p-3 border dark:border-crt-dim border-light-border hover:dark:border-crt-bright transition-all text-[12px]"
          >
            <Mail className="w-3.5 h-3.5 dark:text-phosphor-amber text-primary-400" />
            <span className="dark:text-dark-text text-light-text truncate">{siteConfig.email}</span>
          </a>

          <a
            href={wa('')}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="contact-whatsapp"
            className="flex items-center gap-2 p-3 border dark:border-crt-dim border-light-border hover:dark:border-crt-bright transition-all text-[12px]"
          >
            <MessageCircle className="w-3.5 h-3.5 dark:text-phosphor-amber text-primary-400" />
            <span className="dark:text-dark-text text-light-text">+91 {siteConfig.phone.slice(2, 7)} {siteConfig.phone.slice(7)}</span>
          </a>

          <div className="flex items-center gap-2 p-3 border dark:border-crt-dim border-light-border text-[12px]">
            <Clock className="w-3.5 h-3.5 dark:text-phosphor-amber text-primary-400" />
            <span className="dark:text-dark-text text-light-text">9 AM – 7 PM IST</span>
          </div>
        </div>

        {/* Final prompt */}
        <div className="mt-8 font-mono text-sm flex items-baseline gap-2">
          <span className="dark:text-phosphor-amber text-primary-400">$</span>
          <span className="dark:text-phosphor-dim text-light-muted">
            awaiting input
          </span>
          <span className="cursor-blink-inline" aria-hidden="true" />
        </div>
      </div>
    </TerminalSection>
  );
};

export default Contact;
