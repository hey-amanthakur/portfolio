import { useState, useEffect, useCallback, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { testimonials } from '@/data';
import { localize, useI18n, type TestimonialId } from '@/i18n';
import { SectionReveal } from '@components/ui/SectionReveal';
import { SectionShell } from '@components/ui/SectionShell';
import { GlowingEffect } from '@components/ui/GlowingEffect';
import { SECTION_IDS } from '@/constants';

export const Testimonials: FC = () => {
  const { t, content } = useI18n();
  const [current, setCurrent] = useState<number>(0);
  const [direction, setDirection] = useState<number>(0);

  const paginate = useCallback((newDirection: number): void => {
     setDirection(newDirection);
     setCurrent((prev) => {
       const next = prev + newDirection;
       if (next < 0) return testimonials.length - 1;
       if (next >= testimonials.length) return 0;
       return next;
     });
   }, []);

  useEffect((): (() => void) => {
    const interval = setInterval((): void => {
      paginate(1);
    }, 6000);
    return (): void => { clearInterval(interval); };
  }, [paginate]);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95,
    }),
  };

  return (
    <SectionShell
      id={SECTION_IDS.testimonials}
      aria-label={t.meta.sectionLabels.testimonials}
      tone="canvas"
      border="y"
      className="section-lazy"
    >
      <div className="bg-grid-pattern-light dark:bg-grid-pattern-dark absolute inset-0 pointer-events-none" />
      <GlowingEffect className="top-20 left-1/4 opacity-15" color="#ff6b35" size={400} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <SectionReveal className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-line bg-surface font-mono text-[11px] uppercase tracking-widest text-muted mb-4">
            <span>{t.testimonials.badge}</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight">
            {t.testimonials.heading}
          </h2>
          <p className="mt-4 text-muted font-body text-lg">
            {t.testimonials.subtext}
          </p>
        </SectionReveal>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto">
          <div className="relative min-h-[320px] sm:min-h-[280px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="absolute inset-0"
              >
                {(() => {
                  const entry = testimonials[current];
                  const override = entry !== undefined ? content.testimonials?.[entry.id as TestimonialId] : undefined;
                  return (
                <div className="relative p-8 sm:p-10 rounded-3xl border-2 border-line bg-surface overflow-hidden group hover:border-primary-400/50 dark:hover:border-primary-400/50 transition-colors duration-300">
                  {/* Background accent */}
                  <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-400/10 rounded-full blur-3xl pointer-events-none" />

                  <Quote className="absolute top-6 right-6 w-10 h-10 text-primary-200 dark:text-primary-900/50" />

                  {/* Star Rating */}
                  <div className="flex items-center gap-1 mb-5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + i * 0.08, type: 'spring', stiffness: 500 }}
                      >
                        <Star className="w-5 h-5 fill-primary-400 text-primary-400" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Quote Text */}
                  <blockquote className="text-ink font-body text-lg leading-relaxed italic relative z-10">
                    &ldquo;{localize(override?.quote, entry?.quote ?? '')}&rdquo;
                  </blockquote>

                  {/* Author Info */}
                  <div className="mt-8 pt-6 border-t-2 border-line flex items-center gap-4 relative z-10">
                    {entry?.avatarUrl !== undefined ? (
                      <motion.img
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        src={entry.avatarUrl}
                        alt={t.testimonials.profilePhotoAlt.replace('{name}', entry.name)}
                        width="52"
                        height="52"
                        loading="lazy"
                        decoding="async"
                        className="w-13 h-13 rounded-2xl border-2 border-line object-cover shadow-lg"
                      />
                    ) : (
                      <div className="w-13 h-13 rounded-2xl border-2 border-line bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                        <span className="text-primary-700 dark:text-primary-300 font-display font-black text-lg">
                          {entry?.name.charAt(0) ?? ''}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="font-display font-bold text-ink text-lg">
                        {entry?.name}
                      </p>
                      <p className="text-sm text-muted font-body">
                        {localize(override?.role, entry?.role ?? '')} at <span className="text-primary-400 font-semibold">{entry?.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
                  );
                })()}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-8 relative z-30">
            <button
              onClick={(): void => { paginate(-1); }}
              aria-label={t.testimonials.previous}
              className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-ink bg-surface text-ink hover:bg-primary-50 dark:hover:bg-canvas shadow-flat-light dark:shadow-flat-dark active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={(): void => { setDirection(index > current ? 1 : -1); setCurrent(index); }}
                  aria-label={`${t.testimonials.goto} ${String(index + 1)}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === current
                      ? 'w-8 bg-primary-400'
                      : 'w-2 bg-line hover:bg-primary-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={(): void => { paginate(1); }}
              aria-label={t.testimonials.next}
              className="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-ink bg-surface text-ink hover:bg-primary-50 dark:hover:bg-canvas shadow-flat-light dark:shadow-flat-dark active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </SectionShell>
  );
};

export default Testimonials;
