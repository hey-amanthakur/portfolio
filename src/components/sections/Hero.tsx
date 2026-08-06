import { useState } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ChefHat, ArrowRight, Code2, MapPin, Sparkles } from 'lucide-react';
import { siteConfig } from '@/data';
import { GitHubIcon, InstagramIcon, LinkedInIcon } from '@components/icons';
import { Button } from '@components/ui/Button';
import { ParticleField } from '@components/ui/ParticleField';
import { GlowingEffect } from '@components/ui/GlowingEffect';
import { AnimatedCounter } from '@components/ui/AnimatedCounter';
import { MagneticButton } from '@components/ui/MagneticButton';

export const Hero: FC = () => {
  const [mode, setMode] = useState<'code' | 'food'>('code');

  return (
    <section
      id="home"
      aria-label="Aman Thakur — Full-Stack Engineer"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-canvas transition-colors duration-300"
    >
      <ParticleField count={25} />

      <GlowingEffect className="top-1/4 left-10 opacity-40" color="#ff6b35" size={400} />
      <GlowingEffect className="bottom-1/4 right-10 opacity-30" color="#2ec4b6" size={350} />

      <div className="bg-grid-pattern-light dark:bg-grid-pattern-dark absolute inset-0 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10">

        {/* Left Column: Headline */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">

          {/* Availability pill */}
          <motion.div
            data-testid="hero-availability-pill"
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-line bg-surface/80 dark:bg-surface/80 backdrop-blur-sm font-mono text-[11px] mb-6 text-muted"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary-400" />
            </span>
            <span className="tracking-wide">Available for freelance · Pune, IN</span>
          </motion.div>

          {/* Mono command-line greeting */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-mono text-sm text-primary-400 mb-3"
          >
            <span className="text-muted">$</span> whoami
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display font-black text-4xl sm:text-6xl lg:text-7xl text-ink leading-[1.05] tracking-tight"
          >
            Hi, I&apos;m <span className="text-gradient-primary">Aman</span>.
            <br />
            <span className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-muted">I </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={mode}
                initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
                transition={{ duration: 0.35 }}
                className="text-3xl sm:text-5xl lg:text-6xl font-black text-gradient-secondary inline-block"
              >
                {mode === 'code' ? 'build software.' : 'chase street food.'}
              </motion.span>
            </AnimatePresence>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-6 text-lg text-muted font-body max-w-xl leading-relaxed"
          >
            {mode === 'code'
              ? <>Full-stack engineer specialising in <span className="font-semibold text-ink">React</span>, <span className="font-semibold text-ink">Spring Boot</span>, and <span className="font-semibold text-ink">AI agent</span> systems. SIH&apos;22 winner and ET Campus Star, currently shipping bespoke software for early-stage teams.</>
              : <>Off the keyboard, I run <span className="font-semibold text-ink">@yeh.safar.swaad.ka</span> — a Pune-based food diary documenting hidden gems, legendary thalis, and unreasonably good street snacks.</>
            }
          </motion.p>

          {/* Persona Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            role="tablist"
            aria-label="Toggle persona"
            data-testid="hero-mode-switch"
            className="inline-flex items-center gap-1 mt-8 p-1.5 rounded-full border border-line bg-surface/60 dark:bg-surface/60 backdrop-blur-sm"
          >
            <button
              role="tab"
              aria-selected={mode === 'code'}
              data-testid="hero-mode-code"
              onClick={(): void => { setMode('code'); }}
              className={`flex items-center gap-2 px-5 py-2.5 font-display font-bold text-sm rounded-full transition-all duration-300 ${
                mode === 'code'
                  ? 'bg-primary-400 text-white shadow-lg shadow-primary-400/30'
                  : 'text-muted hover:text-ink dark:hover:text-ink'
              }`}
            >
              <Terminal className="w-4 h-4" />
              Developer
            </button>

            <button
              role="tab"
              aria-selected={mode === 'food'}
              data-testid="hero-mode-food"
              onClick={(): void => { setMode('food'); }}
              className={`flex items-center gap-2 px-5 py-2.5 font-display font-bold text-sm rounded-full transition-all duration-300 ${
                mode === 'food'
                  ? 'bg-secondary-400 text-white shadow-lg shadow-secondary-400/30'
                  : 'text-muted hover:text-ink dark:hover:text-ink'
              }`}
            >
              <ChefHat className="w-4 h-4" />
              Off-hours
            </button>
          </motion.div>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65 }}
            className="flex flex-wrap gap-4 mt-10 items-center"
          >
            {mode === 'code' ? (
              <>
                <MagneticButton strength={0.2}>
                  <Button
                    data-testid="hero-cta-hire"
                    onClick={(): void => {
                      const el = document.getElementById('contact');
                      if (el !== null) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    variant="primary"
                    size="lg"
                  >
                    Hire Me <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </MagneticButton>
                <MagneticButton strength={0.2}>
                  <a
                    data-testid="hero-cta-work"
                    href="#portfolio"
                    className="flex items-center gap-2 px-6 py-3 font-display font-bold rounded-xl-playful border-2 border-ink bg-surface text-ink hover:bg-primary-50 dark:hover:bg-canvas shadow-flat-light dark:shadow-flat-dark active:translate-x-0.5 active:translate-y-0.5 transition-all"
                  >
                    <Code2 className="w-5 h-5" />
                    See Work
                  </a>
                </MagneticButton>

                {/* Social rail */}
                <div className="flex items-center gap-2 ml-auto sm:ml-2">
                  {[{
                    href: siteConfig.socials.github,
                    label: 'GitHub',
                    icon: <GitHubIcon className="w-5 h-5" />,
                  }, {
                    href: siteConfig.socials.linkedin,
                    label: 'LinkedIn',
                    icon: <LinkedInIcon className="w-5 h-5" />,
                  }].map((social) => (
                    <MagneticButton key={social.label} strength={0.3}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="w-11 h-11 flex items-center justify-center rounded-xl border border-line bg-surface/80 dark:bg-surface/80 backdrop-blur-sm text-muted hover:text-primary-400 dark:hover:text-primary-300 hover:border-primary-400 dark:hover:border-primary-400 hover:shadow-lg hover:shadow-primary-400/10 transition-all duration-300"
                      >
                        {social.icon}
                      </a>
                    </MagneticButton>
                  ))}
                </div>
              </>
            ) : (
              <>
                <MagneticButton strength={0.2}>
                  <a
                    data-testid="hero-cta-instagram"
                    href={siteConfig.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 font-display font-bold rounded-xl-playful border-2 border-ink bg-secondary-400 text-ink shadow-lg shadow-secondary-400/30 hover:shadow-xl hover:shadow-secondary-400/40 hover:-translate-y-0.5 transition-all"
                  >
                    <InstagramIcon className="w-5 h-5" />
                    Follow @{siteConfig.instaHandle}
                  </a>
                </MagneticButton>
                <MagneticButton strength={0.2}>
                  <Button
                    data-testid="hero-cta-feed"
                    onClick={(): void => {
                      const el = document.getElementById('swaad-feed');
                      if (el !== null) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    variant="primary"
                    size="lg"
                  >
                    View food diary <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </MagneticButton>
              </>
            )}
          </motion.div>

          {/* Stats row */}
          {mode === 'code' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="mt-12 w-full max-w-xl"
            >
              <div className="flex flex-wrap gap-8 items-center">
                {[
                  { target: 10, suffix: '+', label: 'Open Source Contributions' },
                  { target: 2, suffix: '×', label: 'Hackathon Wins' },
                  { target: 50, suffix: 'K+', label: 'Food Community' },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} className="text-2xl text-primary-400" />
                    <p className="text-[11px] font-mono text-muted uppercase tracking-wider mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Tech stack mono ticker */}
          {mode === 'code' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="mt-8 w-full max-w-xl"
            >
              <p className="font-mono text-[11px] text-muted uppercase tracking-widest mb-2">stack</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm text-muted">
                {['React', 'TypeScript', 'Spring Boot', 'Python', 'Postgres', 'LangChain', 'AWS'].map((tech, i) => (
                  <span key={tech} className="hover:text-primary-400 transition-colors cursor-default">
                    {tech}{i < 6 && <span className="text-primary-400/60 ml-4">·</span>}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Right Column: Interactive Showcase */}
        <div className="lg:col-span-5 w-full flex items-center justify-center min-h-[420px]">
          <AnimatePresence mode="wait">
            {mode === 'code' ? (
              <motion.div
                key="code-panel"
                data-testid="hero-code-panel"
                initial={{ opacity: 0, scale: 0.85, rotate: -3, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.85, rotate: 3, filter: 'blur(10px)' }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="w-full max-w-md rounded-2xl border-2 border-ink/20 dark:border-line bg-[#16161E] text-gray-200 shadow-2xl shadow-primary-400/10 font-mono text-[13px] relative overflow-hidden"
              >
                {/* Glow accent */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary-400/20 rounded-full blur-3xl pointer-events-none" />

                <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3 bg-[#1B1B23] relative z-10">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-lg shadow-[#FF5F56]/30" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-lg shadow-[#FFBD2E]/30" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-lg shadow-[#27C93F]/30" />
                  <span className="text-xs text-gray-500 font-mono ml-3">~/portfolio/aman.ts</span>
                  <span className="ml-auto text-[10px] text-gray-600 font-mono">UTF-8 · TS</span>
                </div>

                <div className="px-5 py-5 space-y-1.5 text-left leading-relaxed relative z-10">
                  <p><span className="text-gray-600 mr-3 select-none">1</span><span className="text-[#C678DD]">interface</span> <span className="text-[#E5C07B]">Engineer</span> {'{'}</p>
                  <p><span className="text-gray-600 mr-3 select-none">2</span>  <span className="text-[#E06C75]">name</span>: <span className="text-[#98C379]">{'"Aman Thakur"'}</span>;</p>
                  <p><span className="text-gray-600 mr-3 select-none">3</span>  <span className="text-[#E06C75]">role</span>: <span className="text-[#98C379]">{'"Full-Stack Engineer"'}</span>;</p>
                  <p><span className="text-gray-600 mr-3 select-none">4</span>  <span className="text-[#E06C75]">stack</span>: [<span className="text-[#98C379]">{'"React"'}</span>, <span className="text-[#98C379]">{'"Spring Boot"'}</span>, <span className="text-[#98C379]">{'"LLMs"'}</span>];</p>
                  <p><span className="text-gray-600 mr-3 select-none">5</span>  <span className="text-[#E06C75]">shipped</span>: <span className="text-[#D19A66]">12</span>+ <span className="text-gray-500">// production apps</span></p>
                  <p><span className="text-gray-600 mr-3 select-none">6</span>  <span className="text-[#E06C75]">wins</span>: [<span className="text-[#98C379]">{`"SIH'22"`}</span>, <span className="text-[#98C379]">{'"ET Campus Star"'}</span>];</p>
                  <p><span className="text-gray-600 mr-3 select-none">7</span>  <span className="text-[#E06C75]">status</span>: <span className="text-secondary-400">{'"open-to-work"'}</span>;</p>
                  <p><span className="text-gray-600 mr-3 select-none">8</span>{'}'};</p>
                  <p><span className="text-gray-600 mr-3 select-none">9</span></p>
                  <p><span className="text-gray-600 mr-3 select-none">10</span><span className="text-[#5C6370]">// fueled by chai + butter chicken</span></p>
                </div>
                <div className="border-t border-white/5 px-5 py-2.5 bg-[#1B1B23] flex items-center justify-between text-[11px] relative z-10">
                  <span className="flex items-center gap-2 text-secondary-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-400 animate-pulse" />
                    main
                  </span>
                  <span className="text-gray-500">npm run dev <span className="text-secondary-400">ready in 142ms</span></span>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="food-panel"
                data-testid="hero-food-panel"
                initial={{ opacity: 0, scale: 0.85, rotate: 3, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, rotate: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 0.85, rotate: -3, filter: 'blur(10px)' }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="w-full max-w-sm rounded-2xl-playful border-4 border-ink bg-white p-5 shadow-2xl shadow-secondary-400/20 text-ink relative overflow-hidden"
              >
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-secondary-400/20 rounded-full blur-3xl pointer-events-none" />

                <div className="bg-gray-100 rounded-xl overflow-hidden aspect-[4/3] relative border-2 border-ink">
                  <img
                    src="/instagram/post-1.jpg"
                    alt="Yeh Safar Swaad Ka — featured food post"
                    width="533"
                    height="400"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    onError={(e): void => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&auto=format&fit=crop&q=60';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-secondary-400 text-white px-3 py-1 rounded-full border-2 border-white/50 font-display font-extrabold text-xs flex items-center gap-1 shadow-lg shadow-secondary-400/30">
                    <Sparkles className="w-3.5 h-3.5" />
                    Side project
                  </div>
                </div>

                <div className="pt-5 pb-2 text-left font-display relative z-10">
                  <h3 className="font-black text-xl tracking-tight text-ink">
                    Yeh Safar Swaad Ka
                  </h3>
                  <p className="text-sm text-muted mt-1 leading-snug flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Pune street food, weekly
                  </p>

                  <div className="mt-4 border-t-2 border-gray-100 pt-3 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-muted uppercase tracking-wide">
                      followers
                    </span>
                    <span className="font-mono font-bold text-sm text-ink">
                      growing · 8 posts
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
export default Hero;
