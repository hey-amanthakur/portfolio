import { useState, useEffect } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/data/content';
import { useTypewriter } from '@/hooks/useTypewriter';

const BOOT_LINES: readonly string[] = [
  '[ OK ]  loaded portfolio_v3.0 (build: 2026-01)',
  '[ OK ]  fetching profile.json ...',
  '[ OK ]  initializing terminal session',
  '[ OK ]  status: open-to-work · location: pune, in',
  '',
];

export const Hero: FC = () => {
  const [mode, setMode] = useState<'code' | 'food'>('code');
  const [bootIndex, setBootIndex] = useState<number>(0);
  const [bootDone, setBootDone] = useState<boolean>(false);

  // Sequential boot-line reveal
  useEffect((): (() => void) => {
    if (bootIndex >= BOOT_LINES.length) {
      setBootDone(true);
      return (): void => { /* noop */ };
    }
    const t = setTimeout((): void => {
      setBootIndex((i) => i + 1);
    }, 280);
    return (): void => { clearTimeout(t); };
  }, [bootIndex]);

  // Typewriter for the main command after boot completes
  const command = mode === 'code' ? 'cat ./aman.profile' : 'cat ./off-hours.md';
  const { typed: cmdTyped, done: cmdDone } = useTypewriter(command, bootDone, 32, 280);

  return (
    <section
      id="home"
      aria-label="Aman Thakur — terminal hero"
      data-testid="hero-section"
      className="relative pt-24 sm:pt-28 pb-12 min-h-[100vh] bg-light-bg dark:bg-dark-bg overflow-hidden"
    >
      {/* Subtle gradient blob (legacy, light-mode only) */}
      <div className="hidden dark:hidden md:block absolute top-1/4 left-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Boot sequence */}
        <div
          data-testid="hero-boot-sequence"
          className="font-mono text-[12px] sm:text-[13px] leading-[1.7] dark:text-phosphor-dim text-light-muted mb-5"
        >
          {BOOT_LINES.slice(0, bootIndex).map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.18 }}
              className="whitespace-pre"
            >
              {line.startsWith('[ OK ]') ? (
                <>
                  <span className="dark:text-phosphor-bright text-secondary-400">[ OK ]</span>
                  {line.slice(6)}
                </>
              ) : (
                line
              )}
            </motion.div>
          ))}
        </div>

        {/* Main command line — typewriter */}
        <div className="font-mono text-sm sm:text-base flex flex-wrap items-baseline gap-x-2 mb-6">
          <span className="dark:text-phosphor-dim text-light-muted">aman@portfolio</span>
          <span className="dark:text-phosphor-dim text-light-muted">:</span>
          <span className="dark:text-phosphor text-primary-400">~/portfolio</span>
          <span className="dark:text-phosphor-dim text-light-muted">(main)</span>
          <span className="dark:text-phosphor-amber text-primary-400 mx-1">$</span>
          <span className="dark:text-dark-text text-light-text">
            {cmdTyped}
            {bootDone && !cmdDone && <span className="cursor-blink-inline" aria-hidden="true" />}
          </span>
        </div>

        {/* Output block — fades in after the command is typed */}
        <AnimatePresence mode="wait">
          {cmdDone && (
            <motion.div
              key={mode}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="dark:border-l-2 dark:border-crt-dim dark:pl-5 md:dark:pl-7 relative"
            >
              <div className="hidden dark:block absolute -left-[7px] top-0 font-mono text-xs text-phosphor-dim select-none">┌</div>

              {mode === 'code' ? (
                <CodeProfile />
              ) : (
                <FoodProfile />
              )}

              <div className="hidden dark:block absolute -left-[7px] bottom-0 font-mono text-xs text-phosphor-dim select-none">└</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mode toggle (sticks below regardless) */}
        {cmdDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <span className="font-mono text-[11px] dark:text-phosphor-dim text-light-muted">
              persona →
            </span>
            <button
              data-testid="hero-mode-code"
              onClick={(): void => { setMode('code'); }}
              className={`font-mono text-sm px-3 py-1.5 border transition-all ${
                mode === 'code'
                  ? 'dark:border-crt-bright dark:text-phosphor-bright dark:shadow-crt-glow border-primary-400 text-primary-400 bg-primary-400/10'
                  : 'dark:border-crt-dim dark:text-phosphor-dim border-light-border text-light-muted hover:dark:border-dark-text'
              }`}
            >
              [1] developer
            </button>
            <button
              data-testid="hero-mode-food"
              onClick={(): void => { setMode('food'); }}
              className={`font-mono text-sm px-3 py-1.5 border transition-all ${
                mode === 'food'
                  ? 'dark:border-crt-warn dark:text-phosphor-amber dark:shadow-crt-glow-amber border-secondary-400 text-secondary-400 bg-secondary-400/10'
                  : 'dark:border-crt-dim dark:text-phosphor-dim border-light-border text-light-muted hover:dark:border-dark-text'
              }`}
            >
              [2] off-hours
            </button>
          </motion.div>
        )}

        {/* CTA row */}
        {cmdDone && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#contact"
              data-testid="hero-cta-hire"
              className="font-mono text-sm px-4 py-2 border border-primary-400 text-primary-400 hover:bg-primary-400 hover:text-dark-bg transition-colors duration-150"
            >
              $ ./hire-me.sh
            </a>
            <a
              href="#portfolio"
              data-testid="hero-cta-work"
              className="font-mono text-sm px-4 py-2 border dark:border-crt-dim border-light-border dark:text-dark-text text-light-text hover:dark:border-crt-bright hover:dark:text-phosphor-bright hover:dark:shadow-crt-glow transition-all duration-150"
            >
              $ ls projects/
            </a>
            <a
              href={siteConfig.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm px-4 py-2 border dark:border-crt-dim border-light-border dark:text-dark-text text-light-text hover:dark:border-crt-bright hover:dark:text-phosphor-bright transition-all duration-150"
            >
              $ open github
            </a>
          </motion.div>
        )}

        {/* Status line */}
        {cmdDone && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-10 font-mono text-[11px] dark:text-phosphor-dim text-light-muted flex flex-wrap items-center gap-x-4 gap-y-1"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-400 dark:bg-crt-bright animate-pulse" />
              session active
            </span>
            <span>·</span>
            <span>uptime: 3y</span>
            <span>·</span>
            <span>shipped: 12+ apps</span>
            <span>·</span>
            <span>wins: SIH&apos;22 · ET Campus Star</span>
          </motion.div>
        )}
      </div>
    </section>
  );
};

/* ── Developer "cat" output ───────────────────────────────────────── */
const CodeProfile: FC = () => (
  <div className="font-mono text-sm sm:text-[15px] space-y-3 dark:text-dark-text text-light-text">
    <div className="text-3xl sm:text-5xl font-bold leading-[1.1] dark:text-phosphor-bright text-primary-400 mb-2 dark:text-glow-orange">
      Aman Thakur<span className="cursor-blink-inline align-baseline" aria-hidden="true" />
    </div>
    <p className="text-lg sm:text-xl dark:text-phosphor text-light-text">
      <span className="dark:text-phosphor-dim text-light-muted">› role:</span>{' '}
      Full-Stack Engineer · AI builder · SIH&apos;22 winner
    </p>
    <p className="dark:text-phosphor-dim text-light-muted max-w-2xl leading-relaxed text-base">
      I design, build, and ship React/TypeScript frontends, Spring Boot APIs,
      and LLM-powered agent systems for early-stage teams. Strict typing,
      meaningful tests, and code that survives production.
    </p>

    <div className="pt-4">
      <div className="dark:text-phosphor-dim text-light-muted text-xs mb-2">
        <span className="dark:text-phosphor-amber text-primary-400">›</span> stack:
      </div>
      <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-sm dark:text-dark-text text-light-text">
        {['React', 'TypeScript', 'Spring Boot', 'Java', 'Python', 'Postgres', 'LangChain', 'AWS'].map((s, i, arr) => (
          <span key={s} className="flex items-center gap-1">
            <span>{s}</span>
            {i < arr.length - 1 && <span className="dark:text-crt-dim text-light-border">·</span>}
          </span>
        ))}
      </div>
    </div>

    <div className="pt-2 dark:text-phosphor-dim text-light-muted text-xs">
      <span className="dark:text-crt-dim text-light-border">{'// '}</span>
      fueled by chai and butter chicken 🍛
    </div>
  </div>
);

/* ── Off-hours "cat" output ───────────────────────────────────────── */
const FoodProfile: FC = () => (
  <div className="font-mono text-sm sm:text-[15px] space-y-3 dark:text-dark-text text-light-text">
    <div className="text-3xl sm:text-5xl font-bold leading-[1.1] dark:text-phosphor-amber text-secondary-400 mb-2">
      @yeh.safar.swaad.ka<span className="cursor-blink-inline align-baseline" aria-hidden="true" />
    </div>
    <p className="text-lg sm:text-xl dark:text-phosphor text-light-text">
      <span className="dark:text-phosphor-dim text-light-muted">› focus:</span>{' '}
      Pune street-food diary · weekly drops · hidden gems only
    </p>
    <p className="dark:text-phosphor-dim text-light-muted max-w-2xl leading-relaxed text-base">
      Off the keyboard, I run a food creator account documenting legendary
      thalis, unreasonably good chaat, and the occasional fine-dine surprise
      around Pune. It keeps the right-brain warm between sprints.
    </p>

    <div className="pt-2 dark:text-phosphor-dim text-light-muted text-xs">
      <span className="dark:text-crt-dim text-light-border">{'// '}</span>
      filmed on phone, edited on flights ✈️
    </div>
  </div>
);

export default Hero;
