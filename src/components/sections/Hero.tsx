import { useState } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ChefHat, ArrowRight, Code2, MapPin, Sparkles } from 'lucide-react';
import { siteConfig } from '@/data/content';
import { GitHubIcon, InstagramIcon, LinkedInIcon } from '@components/icons';
import { Button } from '@components/ui/Button';

export const Hero: FC = () => {
  const [mode, setMode] = useState<'code' | 'food'>('code');

  return (
    <section 
      id="home"
      aria-label="Aman Thakur — Full-Stack Engineer"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-light-bg dark:bg-dark-bg transition-colors duration-300 bg-grid-pattern-light dark:bg-grid-pattern-dark"
    >
      {/* Decorative Floating background elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-secondary-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10">
        
        {/* Left Column: Headline */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Availability pill — dev-portfolio classic */}
          <motion.div
            data-testid="hero-availability-pill"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface font-mono text-[11px] mb-6 text-light-muted dark:text-dark-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-secondary-400" />
            </span>
            <span className="tracking-wide">Available for freelance · Pune, IN</span>
          </motion.div>

          {/* Mono command-line greeting */}
          <p className="font-mono text-sm text-primary-400 mb-3">
            <span className="text-light-muted dark:text-dark-muted">$</span> whoami
          </p>

          <h1 className="font-display font-black text-4xl sm:text-6xl text-light-text dark:text-dark-text leading-[1.05] tracking-tight">
            Hi, I&apos;m <span className="text-primary-400 text-glow-orange">Aman</span>.
            <br />
            <span className="text-3xl sm:text-5xl font-extrabold text-light-muted dark:text-dark-muted">I </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={mode}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="text-3xl sm:text-5xl font-black text-secondary-400 text-glow-teal inline-block"
              >
                {mode === 'code' ? 'build software.' : 'chase street food.'}
              </motion.span>
            </AnimatePresence>
          </h1>

          <p className="mt-6 text-lg text-light-muted dark:text-dark-muted font-body max-w-xl leading-relaxed">
            {mode === 'code' 
              ? <>Full-stack engineer specialising in <span className="font-semibold text-light-text dark:text-dark-text">React</span>, <span className="font-semibold text-light-text dark:text-dark-text">Spring Boot</span>, and <span className="font-semibold text-light-text dark:text-dark-text">AI agent</span> systems. SIH&apos;22 winner and ET Campus Star, currently shipping bespoke software for early-stage teams.</>
              : <>Off the keyboard, I run <span className="font-semibold text-light-text dark:text-dark-text">@yeh.safar.swaad.ka</span> — a Pune-based food diary documenting hidden gems, legendary thalis, and unreasonably good street snacks.</>
            }
          </p>

          {/* Persona Switcher — subtle pill toggle */}
          <div
            role="tablist"
            aria-label="Toggle persona"
            data-testid="hero-mode-switch"
            className="inline-flex items-center gap-1 mt-8 p-1 rounded-full border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface"
          >
            <button
              role="tab"
              aria-selected={mode === 'code'}
              data-testid="hero-mode-code"
              onClick={(): void => { setMode('code'); }}
              className={`flex items-center gap-2 px-4 py-2 font-display font-bold text-sm rounded-full transition-all duration-200 ${
                mode === 'code'
                  ? 'bg-primary-400 text-white shadow-sm'
                  : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'
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
              className={`flex items-center gap-2 px-4 py-2 font-display font-bold text-sm rounded-full transition-all duration-200 ${
                mode === 'food'
                  ? 'bg-secondary-400 text-light-text shadow-sm'
                  : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'
              }`}
            >
              <ChefHat className="w-4 h-4" />
              Off-hours
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-3 mt-10 items-center">
            {mode === 'code' ? (
              <>
                <Button 
                  data-testid="hero-cta-hire"
                  onClick={(): void => {
                    const el = document.getElementById('contact');
                    if (el !== null) el.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  variant="primary"
                >
                  Hire Me <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <a
                  data-testid="hero-cta-work"
                  href="#portfolio"
                  className="flex items-center gap-2 px-5 py-2.5 font-display font-bold rounded-xl-playful border-2 border-light-text dark:border-dark-text bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text hover:bg-primary-50 dark:hover:bg-dark-bg shadow-flat-light dark:shadow-flat-dark active:translate-x-0.5 active:translate-y-0.5"
                >
                  <Code2 className="w-5 h-5" />
                  See Work
                </a>

                {/* Social rail */}
                <div className="flex items-center gap-2 ml-auto sm:ml-2">
                  <a
                    href={siteConfig.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text hover:border-light-text dark:hover:border-dark-text transition-colors"
                  >
                    <GitHubIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={siteConfig.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="w-10 h-10 flex items-center justify-center rounded-xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text hover:border-light-text dark:hover:border-dark-text transition-colors"
                  >
                    <LinkedInIcon className="w-5 h-5" />
                  </a>
                </div>
              </>
            ) : (
              <>
                <a
                  data-testid="hero-cta-instagram"
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 font-display font-bold rounded-xl-playful border-2 border-light-text dark:border-dark-text bg-secondary-400 text-light-text shadow-flat-secondary dark:shadow-flat-secondary hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
                >
                  <InstagramIcon className="w-5 h-5" />
                  Follow @{siteConfig.instaHandle}
                </a>
                <Button 
                  data-testid="hero-cta-feed"
                  onClick={(): void => {
                    const el = document.getElementById('swaad-feed');
                    if (el !== null) el.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  variant="primary"
                >
                  View food diary <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </>
            )}
          </div>

          {/* Tech stack mono ticker */}
          {mode === 'code' && (
            <div className="mt-10 w-full max-w-xl">
              <p className="font-mono text-[11px] text-light-muted dark:text-dark-muted uppercase tracking-widest mb-2">stack</p>
              <div className="flex flex-wrap gap-x-4 gap-y-2 font-mono text-sm text-light-muted dark:text-dark-muted">
                <span>React</span>
                <span className="text-primary-400/60">·</span>
                <span>TypeScript</span>
                <span className="text-primary-400/60">·</span>
                <span>Spring Boot</span>
                <span className="text-primary-400/60">·</span>
                <span>Python</span>
                <span className="text-primary-400/60">·</span>
                <span>Postgres</span>
                <span className="text-primary-400/60">·</span>
                <span>LangChain</span>
                <span className="text-primary-400/60">·</span>
                <span>AWS</span>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Showcase */}
        <div className="lg:col-span-5 w-full flex items-center justify-center min-h-[420px]">
          <AnimatePresence mode="wait">
            {mode === 'code' ? (
              /* CODE MODE: Authentic IDE terminal */
              <motion.div
                key="code-panel"
                data-testid="hero-code-panel"
                initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="w-full max-w-md rounded-2xl border-2 border-light-text/20 dark:border-dark-border bg-[#16161E] text-gray-200 shadow-flat-primary dark:shadow-flat-primary font-mono text-[13px] relative overflow-hidden"
              >
                {/* IDE Window Controls */}
                <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3 bg-[#1B1B23]">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                  <span className="text-xs text-gray-500 font-mono ml-3">~/portfolio/aman.ts</span>
                  <span className="ml-auto text-[10px] text-gray-600 font-mono">UTF-8 · TS</span>
                </div>

                {/* Code Body */}
                <div className="px-5 py-5 space-y-1 text-left leading-relaxed">
                  <p><span className="text-gray-600 mr-3 select-none">1</span><span className="text-[#C678DD]">interface</span> <span className="text-[#E5C07B]">Engineer</span> {'{'}</p>
                  <p><span className="text-gray-600 mr-3 select-none">2</span>  <span className="text-[#E06C75]">name</span>: <span className="text-[#98C379]">{'"Aman Thakur"'}</span>;</p>
                  <p><span className="text-gray-600 mr-3 select-none">3</span>  <span className="text-[#E06C75]">role</span>: <span className="text-[#98C379]">{'"Full-Stack Engineer"'}</span>;</p>
                  <p><span className="text-gray-600 mr-3 select-none">4</span>  <span className="text-[#E06C75]">stack</span>: [<span className="text-[#98C379]">{'"React"'}</span>, <span className="text-[#98C379]">{'"Spring Boot"'}</span>, <span className="text-[#98C379]">{'"LLMs"'}</span>];</p>
                  <p><span className="text-gray-600 mr-3 select-none">5</span>  <span className="text-[#E06C75]">shipped</span>: <span className="text-[#D19A66]">12</span>+ <span className="text-gray-500">// production apps</span></p>
                  <p><span className="text-gray-600 mr-3 select-none">6</span>  <span className="text-[#E06C75]">wins</span>: [<span className="text-[#98C379]">{`"SIH'22"`}</span>, <span className="text-[#98C379]">{'"ET Campus Star"'}</span>];</p>
                  <p><span className="text-gray-600 mr-3 select-none">7</span>  <span className="text-[#E06C75]">status</span>: <span className="text-[#98C379]">{'"open-to-work"'}</span>;</p>
                  <p><span className="text-gray-600 mr-3 select-none">8</span>{'}'};</p>
                  <p><span className="text-gray-600 mr-3 select-none">9</span></p>
                  <p><span className="text-gray-600 mr-3 select-none">10</span><span className="text-[#5C6370]">// fueled by chai + butter chicken 🍛</span></p>
                </div>
                <div className="border-t border-white/5 px-5 py-2.5 bg-[#1B1B23] flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-2 text-secondary-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary-400 animate-pulse" />
                    main
                  </span>
                  <span className="text-gray-500">npm run dev <span className="text-secondary-400">✓ ready in 142ms</span></span>
                </div>
              </motion.div>
            ) : (
              /* FOOD MODE: Polaroid */
              <motion.div
                key="food-panel"
                data-testid="hero-food-panel"
                initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotate: -2 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="w-full max-w-sm rounded-2xl-playful border-4 border-light-text dark:border-dark-text bg-white p-5 shadow-flat-secondary dark:shadow-flat-secondary text-light-text relative"
              >
                <div className="bg-gray-100 rounded-xl overflow-hidden aspect-[4/3] relative border-2 border-light-text">
                  <img
                    src="/instagram/post-1.jpg"
                    alt="Yeh Safar Swaad Ka — featured food post"
                    width="533"
                    height="400"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    onError={(e): void => {
                      (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&auto=format&fit=crop&q=60';
                    }}
                  />
                  <div className="absolute top-3 left-3 bg-secondary-400 text-light-text px-3 py-1 rounded-full border-2 border-light-text font-display font-extrabold text-xs flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Side project
                  </div>
                </div>

                <div className="pt-5 pb-2 text-left font-display">
                  <h3 className="font-black text-xl tracking-tight text-light-text">
                    Yeh Safar Swaad Ka
                  </h3>
                  <p className="text-sm text-light-muted mt-1 leading-snug flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" /> Pune street food, weekly
                  </p>
                  
                  <div className="mt-4 border-t-2 border-gray-100 pt-3 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-light-muted uppercase tracking-wide">
                      followers
                    </span>
                    <span className="font-mono font-bold text-sm text-light-text">
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
