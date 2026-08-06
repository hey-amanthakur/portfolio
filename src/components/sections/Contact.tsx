import type { FC } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Mail, Clock, Coffee, Send, ArrowRight } from 'lucide-react';
import { siteConfig, services } from '@/data';
import { Card } from '@components/ui/Card';
import { SectionReveal } from '@components/ui/SectionReveal';
import { SectionShell } from '@components/ui/SectionShell';
import { MagneticButton } from '@components/ui/MagneticButton';
import { GlowingEffect } from '@components/ui/GlowingEffect';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { SECTION_IDS, SECTION_LABELS, SERVICE_IDS } from '@/constants';
import type { ServiceId } from '@/constants';

const serviceEmoji: Readonly<Record<ServiceId, string>> = {
  [SERVICE_IDS.fullstack]: '💻',
  [SERVICE_IDS.aiConsulting]: '🧠',
  [SERVICE_IDS.contentCreation]: '📸',
};

function buildWhatsAppMessage(projectType = '', details = ''): string {
  const service = services.find((s) => s.id === projectType);
  const lines = [
    `Hi Aman! I'd like to discuss a project.`,
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
    <SectionShell
      ref={ref}
      id={SECTION_IDS.contact}
      aria-label={SECTION_LABELS.contact}
      tone="surface"
      border="top"
    >
      <GlowingEffect className="top-0 right-0 opacity-10" color="#25D366" size={500} />
      <GlowingEffect className="bottom-0 left-0 opacity-10" color="#ff6b35" size={400} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        <div className="max-w-5xl mx-auto px-6 relative z-10">

          <SectionReveal className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isVisible ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.5, type: 'spring', stiffness: 300 }}
              className="inline-flex items-center gap-2 mb-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/10 flex items-center justify-center shadow-lg shadow-[#25D366]/10">
                <MessageCircle className="w-6 h-6 text-[#25D366]" />
              </div>
            </motion.div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight">
              Let&apos;s build something <span className="text-[#25D366]">real</span>.
            </h2>
            <p className="mt-4 text-muted font-body text-lg">
              Pick a service below — it opens WhatsApp with a pre-filled brief. No forms, no waiting.
            </p>
          </SectionReveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="relative"
              >
                <div className="bg-canvas border-2 border-line rounded-3xl overflow-hidden shadow-2xl shadow-black/5">
                  <div className="bg-[#075E54] px-5 py-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#25D366] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#25D366]/30">
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

                  <div className="p-5 bg-[#ECE5DD] dark:bg-[#0B141A] min-h-[320px] space-y-3">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={isVisible ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.4 }}
                      className="bg-white dark:bg-[#202C33] rounded-xl rounded-tl-none px-4 py-3 max-w-[85%] shadow-sm"
                    >
                      <p className="text-xs text-ink">
                        Hey! Interested in working together? Pick a service below and I&apos;ll message you directly on WhatsApp!
                      </p>
                      <p className="text-[10px] text-muted mt-1 text-right">Just now</p>
                    </motion.div>

                    {services.map((service, index) => (
                      <motion.a
                        key={service.id}
                        href={whatsAppUrl(service.id)}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, x: -20 }}
                        animate={isVisible ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.6 + index * 0.15 }}
                        whileHover={{ x: -4 }}
                        className="group block bg-white dark:bg-[#202C33] rounded-xl rounded-tl-none px-4 py-3 max-w-[90%] shadow-sm hover:shadow-lg transition-all duration-200"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-grow">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{serviceEmoji[service.id]}</span>
                              <p className="font-display font-bold text-sm text-ink">
                                {service.title}
                              </p>
                            </div>
                            <p className="text-[11px] text-muted mt-1 leading-relaxed">
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

            <div className="lg:col-span-5 space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={isVisible ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <Card variant="flat-primary" className="p-6">
                  <h3 className="font-display font-black text-lg text-ink mb-4 flex items-center gap-2">
                    <span>Direct contact</span>
                  </h3>

                  <div className="space-y-4">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="flex items-center gap-3 p-3 rounded-xl bg-canvas hover:bg-primary-50 dark:hover:bg-surface transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary-400/10 flex items-center justify-center group-hover:bg-primary-400/20 transition-colors">
                        <Mail className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-display font-black text-primary-400 uppercase">Email</p>
                        <p className="font-body font-bold text-sm text-ink break-all">
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
                      <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
                        <MessageCircle className="w-5 h-5 text-[#25D366]" />
                      </div>
                      <div>
                        <p className="text-[10px] font-display font-black text-[#25D366] uppercase">WhatsApp</p>
                        <p className="font-body font-bold text-sm text-ink">
                          +{siteConfig.phone.slice(0, 2)} {siteConfig.phone.slice(2, 7)} {siteConfig.phone.slice(7)}
                        </p>
                      </div>
                    </a>

                    <div className="flex items-center gap-3 p-3 rounded-xl bg-canvas">
                      <div className="w-10 h-10 rounded-xl bg-primary-400/10 flex items-center justify-center">
                        <Clock className="w-5 h-5 text-primary-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-display font-black text-primary-400 uppercase">Active Hours</p>
                        <p className="font-body font-bold text-sm text-ink">
                          9:00 AM – 7:00 PM IST
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Buy Me a Coffee Widget */}
              {siteConfig.sponsorUrl !== undefined && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.7 }}
                >
                  <Card variant="borderless" className="p-5 border-2 border-[#FFDD00] bg-[#FFDD00]/10">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-[#FFDD00]/20 flex items-center justify-center flex-shrink-0">
                        <Coffee className="w-7 h-7 text-[#B38F00]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-sm text-ink">
                          Buy me a coffee
                        </p>
                        <p className="text-xs text-[#B38F00] font-body mt-0.5">
                          Support my work
                        </p>
                        <MagneticButton strength={0.2} className="mt-3">
                          <a
                            href="https://razorpay.me/@amanthakur7343"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-display font-bold border-2 border-[#B38F00] bg-[#FFDD00] text-[#5C4A00] hover:bg-[#FFDD00]/80 shadow-lg shadow-[#FFDD00]/20 active:translate-x-0.5 active:translate-y-0.5 transition-all"
                          >
                            <Coffee className="w-3.5 h-3.5" />
                            Buy
                          </a>
                        </MagneticButton>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>

        </div>
      </motion.div>
    </SectionShell>
  );
};

export default Contact;
