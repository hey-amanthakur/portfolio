import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, ExternalLink, MapPin } from 'lucide-react';
import { instagramPosts, siteConfig } from '@/data';
import scrapedPosts from '@/scraped/instagram-posts.json';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import type { IInstagramPost } from '@/types';
import { InstagramIcon } from '@components/icons';
import { SectionReveal } from '@components/ui/SectionReveal';
import { SectionShell } from '@components/ui/SectionShell';
import { SECTION_IDS, SECTION_LABELS } from '@/constants';
import { MagneticButton } from '@components/ui/MagneticButton';
import { GlowingEffect } from '@components/ui/GlowingEffect';

const hasScrapedData = Array.isArray(scrapedPosts) && scrapedPosts.length > 0;
const displayPosts: readonly IInstagramPost[] = hasScrapedData
  ? scrapedPosts
  : instagramPosts;

const LOCAL_FALLBACKS = [
  '/instagram/post-1.jpg',
  '/instagram/post-2.jpg',
  '/instagram/post-3.jpg',
  '/instagram/post-4.jpg',
  '/instagram/post-5.jpg',
  '/instagram/post-6.jpg',
  '/instagram/post-7.jpg',
  '/instagram/post-8.jpg',
] as const;

const resolveImage = (raw: string, index: number): string => {
  if (raw.startsWith('/') || raw.startsWith('blob:') || raw.startsWith('data:')) return raw;
  if (raw.includes('cdninstagram.com') || raw.includes('fbcdn.net') || raw.includes('instagram.com')) {
    const fallbackIndex = index % LOCAL_FALLBACKS.length;
    return LOCAL_FALLBACKS[fallbackIndex] ?? LOCAL_FALLBACKS[0];
  }
  return raw;
};

export const InstagramFeed: FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <SectionShell
      ref={ref}
      id={SECTION_IDS.instagram}
      aria-label={SECTION_LABELS.instagram}
      tone="canvas"
    >
      <div className="bg-grid-pattern-light dark:bg-grid-pattern-dark absolute inset-0 pointer-events-none" />
      <GlowingEffect className="top-1/4 right-1/4 opacity-10" color="#E1306C" size={400} />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section header */}
        <SectionReveal className="max-w-3xl mx-auto mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-line bg-surface font-mono text-[11px] uppercase tracking-widest text-muted mb-5">
            <span className="w-2 h-2 rounded-full bg-[#E1306C] animate-pulse" />
            <span>Side project · 02</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-ink tracking-tight">
            Off the keyboard,
            <br />
            <span className="text-[#E1306C]">I chase street food.</span>
          </h2>
          <p className="mt-5 text-muted font-body text-base sm:text-lg leading-relaxed">
            <span className="font-mono text-ink">@{siteConfig.instaHandle}</span> is my Pune-based food diary — a weekly hunt for hidden gems, legendary thalis, and unreasonably good street snacks. It keeps the right-brain warm between sprints.
          </p>
        </SectionReveal>

        {/* Polaroid Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayPosts.map((post, index) => {
            const safeImage = resolveImage(post.imageUrl, index);
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.07, ease: [0.34, 1.4, 0.64, 1] }}
              >
                <a
                  href={post.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`insta-post-${post.id}`}
                  className="group relative block rounded-2xl overflow-hidden border border-line bg-surface hover:border-[#E1306C] hover:shadow-xl hover:shadow-[#E1306C]/10 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="aspect-square bg-gray-100 dark:bg-canvas overflow-hidden relative">
                    <img
                      src={safeImage}
                      alt={post.caption.substring(0, 80)}
                      width="400"
                      height="400"
                      loading="lazy"
                      decoding="async"
                      onError={(e): void => {
                        const img = e.currentTarget;
                        const fallbackIndex = index % LOCAL_FALLBACKS.length;
                        const fallback = LOCAL_FALLBACKS[fallbackIndex] ?? LOCAL_FALLBACKS[0];
                        if (img.src !== window.location.origin + fallback) {
                          img.src = fallback;
                        }
                      }}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
                      <div className="flex items-center gap-4 text-xs font-mono mb-2">
                        <span className="flex items-center gap-1">
                          <Heart className="w-3.5 h-3.5 fill-current text-[#E1306C]" />
                          {post.likes.toLocaleString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5" />
                          {post.comments.toLocaleString()}
                        </span>
                        <span className="ml-auto flex items-center gap-1 text-[#E1306C]">
                          <ExternalLink className="w-3 h-3" />
                          open
                        </span>
                      </div>
                      <p className="text-[11px] font-body line-clamp-3 leading-snug opacity-90">
                        {post.caption}
                      </p>
                    </div>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Footer CTA strip */}
        <SectionReveal delay={0.3} className="mt-14">
          <div className="flex flex-col md:flex-row items-center justify-between gap-5 px-6 py-6 rounded-3xl border-2 border-line bg-surface hover:border-[#E1306C]/50 transition-colors duration-300">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center shadow-lg shadow-[#DD2A7B]/20">
                <InstagramIcon className="w-7 h-7 text-white" />
              </div>
              <div className="text-left">
                <p className="font-display font-black text-lg text-ink leading-tight">
                  Hungry for more reels?
                </p>
                <p className="font-mono text-xs text-muted mt-0.5 flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> Pune · weekly drops
                </p>
              </div>
            </div>

            <MagneticButton strength={0.2}>
              <a
                data-testid="insta-follow-cta"
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 font-display font-bold text-sm rounded-full bg-ink text-canvas hover:opacity-90 transition-opacity shadow-lg"
              >
                <InstagramIcon className="w-4 h-4" />
                Follow @{siteConfig.instaHandle}
              </a>
            </MagneticButton>
          </div>
        </SectionReveal>

      </div>
    </SectionShell>
  );
};
export default InstagramFeed;
