import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';
import { testimonials } from '@/data/content';
import { Card } from '@components/ui/Card';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export const Testimonials: FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      id="testimonials"
      aria-label="Client Testimonials and Reviews"
      className="py-24 bg-light-surface dark:bg-dark-surface border-y-2 border-light-border dark:border-dark-border transition-colors duration-300 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="px-3 py-1 rounded-full border-2 border-light-text dark:border-dark-text bg-primary-100 text-primary-955 font-display font-black text-xs uppercase tracking-wider shadow-flat-light dark:shadow-flat-dark">
            Happy Clients
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-light-text dark:text-dark-text mt-4 tracking-tight">
            What They Say <span className="text-primary-400">💬</span>
          </h2>
          <p className="mt-4 text-light-muted dark:text-dark-muted font-body text-lg">
            Real feedback from clients I've had the pleasure of cooking up solutions with.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
              className="h-full flex"
            >
              <Card
                variant="default"
                hoverEffect="lift"
                className="p-8 flex flex-col w-full h-full relative"
              >
                {/* Quote Icon */}
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary-200 dark:text-primary-900" />

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-primary-400" />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-light-muted dark:text-dark-muted font-body leading-relaxed flex-grow italic">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author Info */}
                <div className="mt-6 pt-6 border-t-2 border-light-border dark:border-dark-border flex items-center gap-4">
                  {testimonial.avatarUrl !== undefined ? (
                    <img
                      src={testimonial.avatarUrl}
                      alt={`${testimonial.name} profile photo`}
                      className="w-12 h-12 rounded-xl-playful border-2 border-light-border dark:border-dark-border object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-xl-playful border-2 border-light-border dark:border-dark-border bg-primary-100 dark:bg-primary-900 flex items-center justify-center">
                      <span className="text-primary-700 dark:text-primary-300 font-display font-black text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-display font-bold text-light-text dark:text-dark-text">
                      {testimonial.name}
                    </p>
                    <p className="text-xs text-light-muted dark:text-dark-muted font-body">
                      {testimonial.role} at {testimonial.company}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
