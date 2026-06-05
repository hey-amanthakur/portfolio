import type { FC, ComponentType, SVGProps } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Cpu, ChefHat, ShoppingBag } from 'lucide-react';
import { services } from '@/data/content';
import { Card } from '@components/ui/Card';
import { Badge } from '@components/ui/Badge';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

type IconKey = 'Terminal' | 'Cpu' | 'ChefHat';

const iconMap: Readonly<Record<IconKey, ComponentType<SVGProps<SVGSVGElement>>>> = {
  Terminal,
  Cpu,
  ChefHat,
};

export const Services: FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const getIngredients = (serviceId: string): readonly string[] => {
    if (serviceId === 'fullstack') {
      return ['React 18', 'Spring Boot 3', 'Java 21', 'TypeScript', 'Jest/Vitest', 'APIs'] as const;
    }
    if (serviceId === 'ai-consulting') {
      return ['LLMs', 'Prompt Engineering', 'RAG Search', 'LangChain', 'AI Agents', 'OpenAI'] as const;
    }
    return ['Storytelling', 'Reels Strategy', 'Hook Writing', 'Video Editing', 'Analytics'] as const;
  };

  return (
    <section
      ref={ref}
      id="services"
      aria-label="Aman Thakur Freelance Services Menu"
      className="py-24 bg-light-bg dark:bg-dark-bg transition-colors duration-300 relative bg-grid-pattern-light dark:bg-grid-pattern-dark"
    >
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header styled like a restaurant banner */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-3 py-1 rounded-full border-2 border-light-text dark:border-dark-text bg-primary-100 text-primary-955 font-display font-black text-xs uppercase tracking-wider shadow-flat-light dark:shadow-flat-dark">
            Today's Specials
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-light-text dark:text-dark-text mt-4 tracking-tight">
            The Freelance Menu <span className="text-primary-400">🍽️</span>
          </h2>
          <p className="mt-4 text-light-muted dark:text-dark-muted font-body text-lg">
            Chef Aman's gourmet offerings. Served fresh, scalable, and packed with flavor.
          </p>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((item, index) => {
            const IconComponent = iconMap[item.icon as IconKey];
            const ingredients = getIngredients(item.id);
            const isChefSpecial = item.id === 'fullstack';
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
                className="h-full flex"
              >
                <Card
                  variant={isChefSpecial ? 'flat-primary' : 'default'}
                  hoverEffect="tilt"
                  className="p-8 flex flex-col items-start justify-between w-full h-full relative"
                >
                  {/* Chef Special Tag */}
                  {isChefSpecial && (
                    <span className="absolute top-4 right-4 bg-secondary-400 text-light-text px-2.5 py-0.5 rounded-full border border-light-text font-display font-extrabold text-[10px] uppercase shadow-sm">
                      Chef's Special 🌟
                    </span>
                  )}

                  <div className="w-full text-left">
                    {/* Course Category Icon */}
                    <div 
                      className={`w-12 h-12 rounded-xl-playful border-2 border-light-text dark:border-dark-text flex items-center justify-center shadow-flat-light dark:shadow-flat-dark mb-6 ${
                        isChefSpecial ? 'bg-secondary-400' : 'bg-primary-100 dark:bg-primary-900/30'
                      }`}
                    >
                      <IconComponent className={`w-6 h-6 ${isChefSpecial ? 'text-light-text' : 'text-primary-400'}`} />
                    </div>

                    <h3 className="font-display font-black text-2xl text-light-text dark:text-dark-text tracking-tight leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs font-display font-bold text-primary-400 uppercase tracking-wider mt-1">
                      {item.tagline}
                    </p>

                    <p className="mt-4 text-sm text-light-muted dark:text-dark-muted font-body leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  {/* "Ingredients" Section */}
                  <div className="w-full mt-6 pt-6 border-t-2 border-light-border dark:border-dark-border text-left">
                    <span className="text-xs font-display font-extrabold text-light-muted dark:text-dark-muted block mb-2 uppercase tracking-wide">
                      Key Ingredients:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {ingredients.map((ing) => (
                        <Badge key={ing} variant="neutral" className="px-2 py-0.5 text-[10px]">
                          {ing}
                        </Badge>
                      ))}
                    </div>

                    {/* Order Button Trigger */}
                    <button
                      onClick={(): void => {
                        const el = document.getElementById('contact');
                        if (el !== null) {
                          el.scrollIntoView({ behavior: 'smooth' });
                          // Pre-select service type if active
                          const selectEl = document.getElementById('serviceType') as HTMLSelectElement | null;
                          if (selectEl !== null) {
                            selectEl.value = item.id;
                          }
                        }
                      }}
                      className="mt-6 w-full py-2 flex items-center justify-center gap-2 border-2 border-light-text dark:border-dark-text font-display font-black text-xs rounded-xl bg-white dark:bg-dark-surface hover:bg-primary-50 dark:hover:bg-dark-bg text-light-text dark:text-dark-text transition-colors shadow-sm"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Project Order
                    </button>
                  </div>

                </Card>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
export default Services;
