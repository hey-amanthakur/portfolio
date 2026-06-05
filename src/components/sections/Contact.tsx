import { useState } from 'react';
import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, UtensilsCrossed, Coffee } from 'lucide-react';
import { siteConfig } from '@/data/content';
import { Card } from '@components/ui/Card';
import { Button } from '@components/ui/Button';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const contactSchema = z.object({
  name: z.string().min(2, { message: 'Customer name must be at least 2 characters long' }),
  email: z.email({ message: 'A valid delivery email address is required' }),
  serviceType: z.string().min(1, { message: 'Please select a service' }),
  subject: z.string().min(3, { message: 'Subject must be at least 3 characters long' }),
  message: z.string().min(10, { message: 'Instructions must be at least 10 characters long' }),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const Contact: FC = () => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      serviceType: '',
      subject: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData): Promise<void> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Project Order Submitted:', data);
    setIsSubmitted(true);
    reset();
  };

  return (
    <section
      ref={ref}
      id="contact"
      aria-label="Aman Thakur Freelance Contact Form"
      className="py-24 bg-light-surface dark:bg-dark-surface border-t-2 border-light-border dark:border-dark-border transition-colors duration-300 relative overflow-hidden"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Section Header styled like a bakery or bistro sign */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border-2 border-light-text dark:border-dark-text bg-secondary-100 text-secondary-955 font-display font-black text-xs uppercase tracking-wider shadow-flat-light dark:shadow-flat-dark">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>Freelance Counter</span>
          </span>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-light-text dark:text-dark-text mt-4 tracking-tight">
            Hire Me For A Project <span className="text-primary-400">📝</span>
          </h2>
          <p className="mt-4 text-light-muted dark:text-dark-muted font-body text-lg">
            Need a developer who ships fast and writes clean code? Tell me about your project and I'll get back to you with a plan — no courses, no fluff, just real freelance work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Direct contact info (col-span-4) */}
          <div className="md:col-span-4 flex flex-col justify-between gap-6 h-full text-left">
            <Card variant="flat-secondary" className="p-6 h-full flex flex-col justify-between">
              <div>
                <h3 className="font-display font-black text-xl text-light-text dark:text-dark-text">
                  Direct Kitchen 🍳
                </h3>
                <p className="mt-2 text-xs text-light-muted dark:text-dark-muted font-body leading-relaxed">
                  Want to skip the ordering line and chat directly over a cup of chai? Reach out to me:
                </p>
                
                <div className="mt-6 space-y-4">
                  <div>
                    <span className="text-[10px] font-display font-black text-primary-400 uppercase block">
                      Email Address:
                    </span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="font-body font-bold text-sm text-light-text dark:text-dark-text hover:text-primary-400 transition-colors break-all"
                    >
                      {siteConfig.email}
                    </a>
                  </div>

                  <div>
                    <span className="text-[10px] font-display font-black text-primary-400 uppercase block">
                      Active Hours:
                    </span>
                    <p className="font-body font-bold text-sm text-light-text dark:text-dark-text">
                      9:00 AM - 7:00 PM IST
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t-2 border-dashed border-light-text dark:border-dark-text/30">
                <span className="text-[10px] font-display font-black text-light-muted dark:text-dark-muted uppercase block">
                  Signature Dish:
                </span>
                <p className="font-body font-extrabold text-sm text-light-text dark:text-dark-text italic">
                  React frontend layered over robust Spring Boot APIs 🍕
                </p>
              </div>
            </Card>

            {/* Sponsor CTA Card */}
            {siteConfig.sponsorUrl !== undefined && (
              <a
                href={siteConfig.sponsorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-5 rounded-2xl border-2 border-[#FFDD00] bg-[#FFDD00]/10 hover:bg-[#FFDD00]/20 transition-all duration-200 hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <Coffee className="w-6 h-6 text-[#B38F00] group-hover:rotate-12 transition-transform duration-200" />
                  <div className="text-left">
                    <p className="font-display font-bold text-sm text-light-text dark:text-dark-text">
                      Enjoy my work?
                    </p>
                    <p className="text-xs text-[#B38F00] font-body">
                      Buy me a coffee ☕ →
                    </p>
                  </div>
                </div>
              </a>
            )}
          </div>

          {/* Right Column: Interactive Menu Order Form (col-span-8) */}
          <div className="md:col-span-8 h-full text-left">
            <Card variant="flat-primary" className="p-8 h-full">
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  /* THE FORM */
                  <motion.form
                    key="contact-form"
                    onSubmit={(e): void => {
                      void handleSubmit(onSubmit)(e);
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-5"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Name input */}
                      <div className="flex flex-col">
                        <label htmlFor="name" className="text-xs font-display font-black text-light-text dark:text-dark-text mb-1 uppercase">
                          Customer Name:
                        </label>
                        <input
                          id="name"
                          type="text"
                          placeholder="Aman Thakur"
                          {...register('name')}
                          className={`px-4 py-2.5 rounded-xl border-2 bg-white dark:bg-dark-bg text-light-text dark:text-dark-text focus:outline-none focus:border-primary-400 font-body text-sm font-semibold shadow-sm ${
                            errors.name !== undefined ? 'border-red-500 focus:border-red-500' : 'border-light-text dark:border-dark-text'
                          }`}
                        />
                        {errors.name !== undefined && (
                          <span className="text-red-500 text-[10px] font-bold mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.name.message}
                          </span>
                        )}
                      </div>

                      {/* Email input */}
                      <div className="flex flex-col">
                        <label htmlFor="email" className="text-xs font-display font-black text-light-text dark:text-dark-text mb-1 uppercase">
                          Inbox Address:
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="client@bistro.com"
                          {...register('email')}
                          className={`px-4 py-2.5 rounded-xl border-2 bg-white dark:bg-dark-bg text-light-text dark:text-dark-text focus:outline-none focus:border-primary-400 font-body text-sm font-semibold shadow-sm ${
                            errors.email !== undefined ? 'border-red-500 focus:border-red-500' : 'border-light-text dark:border-dark-text'
                          }`}
                        />
                        {errors.email !== undefined && (
                          <span className="text-red-500 text-[10px] font-bold mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.email.message}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      {/* Service select drop-down */}
                      <div className="flex flex-col">
                        <label htmlFor="serviceType" className="text-xs font-display font-black text-light-text dark:text-dark-text mb-1 uppercase">
                          Select Service:
                        </label>
                        <select
                          id="serviceType"
                          {...register('serviceType')}
                          className={`px-4 py-2.5 rounded-xl border-2 bg-white dark:bg-dark-bg text-light-text dark:text-dark-text focus:outline-none focus:border-primary-400 font-body text-sm font-semibold shadow-sm ${
                            errors.serviceType !== undefined ? 'border-red-500 focus:border-red-500' : 'border-light-text dark:border-dark-text'
                          }`}
                        >
                          <option value="">-- Choose Service --</option>
                          <option value="fullstack">Fullstack Web Development 💻</option>
                          <option value="ai-consulting">AI & Architecture Consulting 🧠</option>
                          <option value="content-creation">Content & Creator Strategy 📸</option>
                          <option value="freelance">Custom Freelance Project 🍲</option>
                        </select>
                        {errors.serviceType !== undefined && (
                          <span className="text-red-500 text-[10px] font-bold mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.serviceType.message}
                          </span>
                        )}
                      </div>

                      {/* Subject input */}
                      <div className="flex flex-col">
                        <label htmlFor="subject" className="text-xs font-display font-black text-light-text dark:text-dark-text mb-1 uppercase">
                          Project Title:
                        </label>
                        <input
                          id="subject"
                          type="text"
                          placeholder="Freelance dashboard for a fintech startup"
                          {...register('subject')}
                          className={`px-4 py-2.5 rounded-xl border-2 bg-white dark:bg-dark-bg text-light-text dark:text-dark-text focus:outline-none focus:border-primary-400 font-body text-sm font-semibold shadow-sm ${
                            errors.subject !== undefined ? 'border-red-500 focus:border-red-500' : 'border-light-text dark:border-dark-text'
                          }`}
                        />
                        {errors.subject !== undefined && (
                          <span className="text-red-500 text-[10px] font-bold mt-1 flex items-center gap-1">
                            <AlertCircle className="w-3.5 h-3.5" />
                            {errors.subject.message}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Message textarea */}
                    <div className="flex flex-col">
                      <label htmlFor="message" className="text-xs font-display font-black text-light-text dark:text-dark-text mb-1 uppercase">
                        Cooking Instructions:
                      </label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="I need a React dashboard with Spring Boot backend, handling 10k daily requests and a smooth dark-mode toggle..."
                        {...register('message')}
                        className={`px-4 py-2.5 rounded-xl border-2 bg-white dark:bg-dark-bg text-light-text dark:text-dark-text focus:outline-none focus:border-primary-400 font-body text-sm font-semibold shadow-sm resize-none ${
                          errors.message !== undefined ? 'border-red-500 focus:border-red-500' : 'border-light-text dark:border-dark-text'
                        }`}
                      />
                      {errors.message !== undefined && (
                        <span className="text-red-500 text-[10px] font-bold mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {errors.message.message}
                        </span>
                      )}
                    </div>

                    {/* Submit button */}
                    <div className="pt-2">
                      <Button
                        type="submit"
                        isLoading={isSubmitting}
                        className="w-full py-3 text-sm flex items-center justify-center gap-2"
                      >
                        Submit Project Request <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.form>
                ) : (
                  /* SUCCESS MESSAGE */
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-secondary-100 text-secondary-955 flex items-center justify-center border-2 border-light-text dark:border-dark-text shadow-flat-light dark:shadow-flat-dark mb-6">
                      <CheckCircle2 className="w-8 h-8 text-secondary-500" />
                    </div>
                    
                    <h3 className="font-display font-black text-2xl text-light-text dark:text-dark-text tracking-tight">
                      Project Request Received! 🚀
                    </h3>
                    <p className="mt-3 text-sm text-light-muted dark:text-dark-muted font-body leading-relaxed max-w-md">
                      Thanks for reaching out! I'll review your project details and get back to you within 24 hours with a plan and timeline. Check your inbox for a response!
                    </p>

                    <Button
                      onClick={(): void => { setIsSubmitted(false); }}
                      variant="outline"
                      className="mt-8 font-display font-black text-xs"
                    >
                      Submit Another Request
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </div>
        </div>

      </div>
      </motion.div>
    </section>
  );
};
export default Contact;
