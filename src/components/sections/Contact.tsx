import type { FC } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Clock, Coffee, Send, ArrowRight } from 'lucide-react';
import { siteConfig, services } from '@/data/content';
import { Card } from '@components/ui/Card';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

function buildWhatsAppMessage(projectType = '', details = ''): string {
  const service = services.find((s) => s.id === projectType);
  const lines = [
    `Hi Aman! 👋 I'd like to discuss a project.`,
    service ? `Service: ${service.title}` : `Service: ${projectType || 'General inquiry'}`,
    details ? `Details: ${details}` : '',
    '',
    "Let me know your availability for a quick call!",
  ].filter(Boolean);
  return lines.join('\n');
}

export const Contact: FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  const whatsAppUrl = (projectType = '', details = ''): string => {
    const msg = buildWhatsAppMessage(projectType, details);
    return `https://wa.me/${siteConfig.phone}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section
      ref={ref}
      id="contact"
      aria-label="Contact Aman Thakur via WhatsApp"
      className="py-24 bg-light-surface dark:bg-dark-surface border-t-2 border-light-border dark:border-dark-border transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#25D366]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-primary-400/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
      <div className="max-w-5xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isVisible ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.5, type: 'spring', stiffness: 300 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <div className="w-10 h-10 rounded-full bg-[#25D366]/10 flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-[#25D366]" />
            </div>
          </motion.div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-light-text dark:text-dark-text tracking-tight">
            Let&apos;s build something <span className="text-[#25D366]">real</span>.
          </h2>
          <p className="mt-4 text-light-muted dark:text-dark-muted font-body text-lg">
            Pick a service below — it opens WhatsApp with a pre-filled brief. No forms, no waiting.
          </p>
        </div>

        {/* WhatsApp Chat Mockup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Phone Mockup with Chat Bubbles */}
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              {/* Phone Frame */}
              <div className="bg-light-bg dark:bg-dark-bg border-2 border-light-border dark:border-dark-border rounded-3xl overflow-hidden shadow-flat-light dark:shadow-flat-dark">
                {/* WhatsApp Header */}
                <div className="bg-[#075E54] px-4 py-3 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold text-xs">
                    AT
                  </div>
                  <div>
                    <p className="text-white font-bold text-sm">Aman Thakur</p>
                    <p className="text-[#A5D6A7] text-[10px]">Full-Stack Developer</p>
                  </div>
                  <div className="ml-auto">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                </div>

                {/* Chat Area */}
                <div className="p-4 bg-[#ECE5DD] dark:bg-[#0B141A] min-h-[320px] space-y-3">
                  {/* Incoming message */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={isVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 }}
                    className="bg-white dark:bg-[#202C33] rounded-xl rounded-tl-none px-3 py-2 max-w-[85%] shadow-sm"
                  >
                    <p className="text-xs text-light-text dark:text-dark-text">
                      Hey! 👋 Interested in working together? Pick a service below and I&apos;ll message you directly on WhatsApp!
                    </p>
                    <p className="text-[10px] text-light-muted dark:text-dark-muted mt-1 text-right">Just now ✓✓</p>
                  </motion.div>

                  {/* Service cards as chat bubbles */}
                  {services.map((service, index) => (
                    <motion.a
                      key={service.id}
                      href={whatsAppUrl(service.id)}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.15 }}
                      className="group block bg-white dark:bg-[#202C33] rounded-xl rounded-tl-none px-3 py-3 max-w-[90%] shadow-sm hover:shadow-flat-primary dark:hover:shadow-flat-dark transition-all duration-200 hover:-translate-x-1"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-grow">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{service.id === 'fullstack' ? '💻' : service.id === 'ai-consulting' ? '🧠' : '📸'}</span>
                            <p className="font-display font-bold text-sm text-light-text dark:text-dark-text">
                              {service.title}
                            </p>
                          </div>
                          <p className="text-[11px] text-light-muted dark:text-dark-muted mt-1 leading-relaxed">
                            {service.tagline}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-1" />
                      </div>
                      <div className="mt-2 flex items-center gap-1">
                        <Send className="w-3 h-3 text-[#25D366]" />
                        <span className="text-[10px] font-bold text-[#25D366] uppercase tracking-wide">
                          Tap to WhatsApp
                        </span>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Contact Info + Sponsor */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
            >
              <Card variant="flat-primary" className="p-6">
                <h3 className="font-display font-black text-lg text-light-text dark:text-dark-text mb-4 flex items-center gap-2">
                  <span>Direct contact</span>
                </h3>

                <div className="space-y-4">
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="flex items-center gap-3 p-3 rounded-xl bg-light-bg dark:bg-dark-bg hover:bg-primary-50 dark:hover:bg-dark-surface transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-primary-400/10 flex items-center justify-center group-hover:bg-primary-400/20 transition-colors">
                      <Mail className="w-4 h-4 text-primary-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-display font-black text-primary-400 uppercase">Email</p>
                      <p className="font-body font-bold text-sm text-light-text dark:text-dark-text break-all">
                        {siteConfig.email}
                      </p>
                    </div>
                  </a>

                  <a
                    href={whatsAppUrl('', '')}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#25D366]/5 hover:bg-[#25D366]/10 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                      <MessageCircle className="w-4 h-4 text-[#25D366]" />
                    </div>
                    <div>
                      <p className="text-[10px] font-display font-black text-[#25D366] uppercase">WhatsApp</p>
                      <p className="font-body font-bold text-sm text-light-text dark:text-dark-text">
                        +{siteConfig.phone.slice(0, 2)} {siteConfig.phone.slice(2, 7)} {siteConfig.phone.slice(7)}
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-light-bg dark:bg-dark-bg">
                    <div className="w-8 h-8 rounded-lg bg-primary-400/10 flex items-center justify-center">
                      <Clock className="w-4 h-4 text-primary-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-display font-black text-primary-400 uppercase">Active Hours</p>
                      <p className="font-body font-bold text-sm text-light-text dark:text-dark-text">
                        9:00 AM – 7:00 PM IST
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Sponsor Card */}
            {siteConfig.sponsorUrl !== undefined && (
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.7 }}
              >
                <a
                  href={siteConfig.sponsorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <Card variant="borderless" className="p-5 border-2 border-[#FFDD00] bg-[#FFDD00]/10 hover:bg-[#FFDD00]/20 transition-all duration-200 hover:-translate-y-0.5">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-[#FFDD00]/20 flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                        <Coffee className="w-6 h-6 text-[#B38F00]" />
                      </div>
                      <div>
                        <p className="font-display font-bold text-sm text-light-text dark:text-dark-text">
                          Enjoy my work?
                        </p>
                        <p className="text-xs text-[#B38F00] font-body">
                          Buy me a coffee ☕ →
                        </p>
                      </div>
                    </div>
                  </Card>
                </a>
              </motion.div>
            )}
          </div>
        </div>

      </div>
      </motion.div>
    </section>
  );
};

export default Contact;
