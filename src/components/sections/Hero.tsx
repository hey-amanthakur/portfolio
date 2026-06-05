import { useState } from 'react';
import type { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, ChefHat, ArrowRight, Sparkles, Code2, Flame } from 'lucide-react';
import { siteConfig } from '@/data/content';
import { GitHubIcon, InstagramIcon } from '@components/icons';
import { Button } from '@components/ui/Button';

export const Hero: FC = () => {
  const [mode, setMode] = useState<'code' | 'food'>('code');

  return (
    <section 
      id="home"
      aria-label="Aman Thakur Hero Header"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-light-bg dark:bg-dark-bg transition-colors duration-300 bg-grid-pattern-light dark:bg-grid-pattern-dark"
    >
      {/* Decorative Floating background elements */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-secondary-400/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10">
        
        {/* Left Column: Playful Text Intro (Lg: col-span-7) */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Active Mode Badge Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border-2 border-light-text dark:border-dark-text bg-light-surface dark:bg-dark-surface font-display font-extrabold text-sm shadow-flat-light dark:shadow-flat-dark mb-6 text-light-text dark:text-dark-text"
          >
            <Sparkles className="w-4 h-4 text-primary-400 animate-spin-slow" />
            <span>Mode: {mode === 'code' ? 'Elite Developer 💻' : 'Swaad Explorer 🍳'}</span>
          </motion.div>

          <h1 className="font-display font-black text-4xl sm:text-6xl text-light-text dark:text-dark-text leading-tight tracking-tight">
            Hi, I'm <span className="text-primary-400 text-glow-orange">Aman</span>!
            <br />
            <span className="text-3xl sm:text-5xl font-extrabold">I love to </span>
            <span className="text-3xl sm:text-5xl font-black text-secondary-400 text-glow-teal">
              {mode === 'code' ? 'Cook Scalable Code' : 'Taste Street Food'}
            </span>
          </h1>

          <p className="mt-6 text-lg text-light-muted dark:text-dark-muted font-body max-w-xl">
            {mode === 'code' 
              ? "Full Stack Engineer & Hackathon winner. I craft robust React interfaces, scalable Java / Spring Boot microservices, and integrate modern AI agent networks to build custom client projects."
              : "Culinary storyteller behind Yeh Safar Swaad Ka. Exploring spice trails, capturing crispy dosa crunches, filming high-retention food reels, and building a community of passionate foodies."
            }
          </p>

          {/* Mode Switcher Buttons */}
          <div className="flex flex-wrap gap-4 mt-8 w-full">
            <button
              onClick={(): void => { setMode('code'); }}
              className={`flex items-center gap-2 px-6 py-3 font-display font-bold rounded-xl-playful border-2 border-light-text dark:border-dark-text transition-all duration-200 ${
                mode === 'code'
                  ? 'bg-primary-400 text-white shadow-flat-primary dark:shadow-flat-primary scale-105'
                  : 'bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text hover:bg-primary-50'
              }`}
            >
              <Terminal className="w-5 h-5" />
              Code Mode
            </button>
            
            <button
              onClick={(): void => { setMode('food'); }}
              className={`flex items-center gap-2 px-6 py-3 font-display font-bold rounded-xl-playful border-2 border-light-text dark:border-dark-text transition-all duration-200 ${
                mode === 'food'
                  ? 'bg-secondary-400 text-light-text shadow-flat-secondary dark:shadow-flat-secondary scale-105'
                  : 'bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text hover:bg-secondary-50'
              }`}
            >
              <ChefHat className="w-5 h-5" />
              Food Mode
            </button>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap gap-4 mt-10">
            {mode === 'code' ? (
              <>
                <Button 
                  onClick={(): void => {
                    const el = document.getElementById('contact');
                    if (el !== null) el.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  variant="primary"
                >
                  Order a System <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 font-display font-bold rounded-xl-playful border-2 border-light-text dark:border-dark-text bg-light-surface dark:bg-dark-surface text-light-text dark:text-dark-text hover:bg-primary-50 shadow-flat-light dark:shadow-flat-dark active:translate-x-0.5 active:translate-y-0.5"
                >
                  <GitHubIcon className="w-5 h-5" />
                  GitHub Repos
                </a>
              </>
            ) : (
              <>
                <a
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 font-display font-bold rounded-xl-playful border-2 border-light-text dark:border-dark-text bg-primary-400 text-white shadow-flat-primary dark:shadow-flat-primary hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  Follow @{siteConfig.instaHandle}{' '}
                  <InstagramIcon className="w-5 h-5 ml-2" />
                </a>
                <Button 
                  onClick={(): void => {
                    const el = document.getElementById('swaad-feed');
                    if (el !== null) el.scrollIntoView({ behavior: 'smooth' });
                  }} 
                  variant="secondary"
                >
                  View Food Feed
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Interactive Showcase Container (Lg: col-span-5) */}
        <div className="lg:col-span-5 w-full flex items-center justify-center min-h-[420px]">
          <AnimatePresence mode="wait">
            {mode === 'code' ? (
              /* CODE MODE SHOWCASE: Simulated IDE Terminal */
              <motion.div
                key="code-panel"
                initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotate: 2 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="w-full max-w-md rounded-2xl-playful border-4 border-light-text dark:border-dark-text bg-[#1E1E24] text-gray-200 p-6 shadow-flat-primary dark:shadow-flat-primary font-mono text-sm relative overflow-hidden"
              >
                {/* IDE Window Controls */}
                <div className="flex items-center gap-2 border-b border-gray-700 pb-3 mb-4">
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] border border-black/20" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E] border border-black/20" />
                  <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F] border border-black/20" />
                  <span className="text-xs text-gray-500 font-semibold ml-2">aman_thakur.tsx</span>
                </div>

                {/* Code Body Mockup */}
                <div className="space-y-2 text-left">
                  <p><span className="text-[#E6B450]">const</span> <span className="text-[#39BAE6]">developer</span> = &#123;</p>
                  <p className="pl-4"><span className="text-[#FFB454]">name</span>: <span className="text-[#C2D94C]">"Aman Thakur"</span>,</p>
                  <p className="pl-4"><span className="text-[#FFB454]">role</span>: <span className="text-[#C2D94C]">"Full Stack Engineer"</span>,</p>
                  <p className="pl-4">
                    <span className="text-[#FFB454]">skills</span>: [
                    <span className="text-[#F07178]">"React"</span>, 
                    <span className="text-[#F07178]">"Spring Boot"</span>, 
                    <span className="text-[#F07178]">"Java"</span>
                    ],
                  </p>
                  <p className="pl-4">
                    <span className="text-[#FFB454]">achievements</span>: &#123;
                  </p>
                  <p className="pl-8"><span className="text-[#FFB454]">sih_winner</span>: <span className="text-[#FF8F40]">true</span>,</p>
                  <p className="pl-8"><span className="text-[#FFB454]">et_campus_star</span>: <span className="text-[#FF8F40]">true</span></p>
                  <p className="pl-4">&#125;,</p>
                  <p className="pl-4">
                    <span className="text-[#FFB454]">fuelSource</span>: <span className="text-[#C2D94C]">"🍕 Butter Chicken & Naan"</span>
                  </p>
                  <p>&#125;;</p>
                  <p className="pt-2 text-gray-500">// Cooking high-coverage code...</p>
                  <p className="text-secondary-400 flex items-center gap-1.5">
                    <Code2 className="w-4 h-4" /> npm run dev --success
                  </p>
                </div>
              </motion.div>
            ) : (
              /* FOOD MODE SHOWCASE: Retro Polaroids with Interactive Spice Slider */
              <motion.div
                key="food-panel"
                initial={{ opacity: 0, scale: 0.95, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.95, rotate: -2 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="w-full max-w-sm rounded-2xl-playful border-4 border-light-text dark:border-dark-text bg-white p-5 shadow-flat-secondary dark:shadow-flat-secondary text-light-text relative"
              >
                {/* Polaroid Frame Container */}
                <div className="bg-gray-100 rounded-xl overflow-hidden aspect-[4/3] relative border-2 border-light-text">
                  <img
                    src="https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&auto=format&fit=crop&q=60"
                    alt="Aman tasting delicious Indian curry"
                    width="533"
                    height="400"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-secondary-400 text-light-text px-3 py-1 rounded-full border-2 border-light-text font-display font-extrabold text-xs flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 fill-current text-red-500 animate-pulse" />
                    Sizzling Swaad!
                  </div>
                </div>

                {/* Polaroid Footer */}
                <div className="pt-5 pb-2 text-left font-display">
                  <h3 className="font-black text-xl tracking-tight text-light-text">
                    Yeh Safar Swaad Ka 🗺️
                  </h3>
                  <p className="text-sm text-light-muted mt-1 leading-snug">
                    Exploring local secrets & legendary recipes from street corners to fine kitchens.
                  </p>
                  
                  {/* Playful Spice Meter Slider */}
                  <div className="mt-4 border-t-2 border-gray-100 pt-3 flex items-center justify-between">
                    <span className="text-xs font-extrabold text-light-muted flex items-center gap-1">
                      Spice level:
                    </span>
                    <div className="flex items-center gap-1 text-red-500">
                      <Flame className="w-4 h-4 fill-current" />
                      <Flame className="w-4 h-4 fill-current" />
                      <Flame className="w-4 h-4 fill-current" />
                      <Flame className="w-4 h-4 fill-current" />
                      <Flame className="w-4 h-4 text-gray-300" />
                    </div>
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
