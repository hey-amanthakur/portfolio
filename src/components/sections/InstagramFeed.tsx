import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, ExternalLink, MapPin } from 'lucide-react';
import { instagramPosts, siteConfig } from '@/data/content';
import scrapedPosts from '@/scraped/instagram-posts.json';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import type { IInstagramPost } from '@/types';
import { InstagramIcon } from '@components/icons';

// Use scraped data if it exists and has real posts; fall back to hardcoded content.
const hasScrapedData = Array.isArray(scrapedPosts) && scrapedPosts.length > 0;
const displayPosts: readonly IInstagramPost[] = hasScrapedData
  ? scrapedPosts
  : instagramPosts;

// Fallback image set served from /public/instagram — guarantees images render
// even if a scraped CDN URL ever leaks back into the JSON.
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
  // Treat already-local paths as-is
  if (raw.startsWith('/') || raw.startsWith('blob:') || raw.startsWith('data:')) return raw;
  // Instagram CDN urls expire and block hot-linking — replace with local snapshot
  if (raw.includes('cdninstagram.com') || raw.includes('fbcdn.net') || raw.includes('instagram.com')) {
    return LOCAL_FALLBACKS[index % LOCAL_FALLBACKS.length] ?? LOCAL_FALLBACKS[0]!;
  }
  return raw;
};

export const InstagramFeed: FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      id="swaad-feed"
      aria-label="Off-hours side project — food diary on Instagram"
      className="py-24 bg-light-bg dark:bg-dark-bg transition-colors duration-300 relative bg-grid-pattern-light dark:bg-grid-pattern-dark"
    >
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section header — framed as a side project */}
        <div className="max-w-3xl mx-auto mb-14 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface font-mono text-[11px] uppercase tracking-widest text-light-muted dark:text-dark-muted mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E1306C]" />
            <span>Side project · 02</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-light-text dark:text-dark-text tracking-tight">
            Off the keyboard,
            <br />
            <span className="text-[#E1306C]">I chase street food.</span>
          </h2>
          <p className="mt-5 text-light-muted dark:text-dark-muted font-body text-base sm:text-lg leading-relaxed">
            <span className="font-mono text-light-text dark:text-dark-text">@{siteConfig.instaHandle}</span> is my Pune-based food diary — a weekly hunt for hidden gems, legendary thalis, and unreasonably good street snacks. It keeps the right-brain warm between sprints.
          </p>
        </div>

        {/* Polaroid Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {displayPosts.map((post, index) => {
            const safeImage = resolveImage(post.imageUrl, index);
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.07, ease: [0.34, 1.4, 0.64, 1] }}
              >
                <a
                  href={post.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid={`insta-post-${post.id}`}
                  className="group relative block rounded-2xl overflow-hidden border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface hover:border-[#E1306C] hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="aspect-square bg-gray-100 dark:bg-dark-bg overflow-hidden relative">
                    <img
                      src={safeImage}
                      alt={post.caption.substring(0, 80)}
                      width="400"
                      height="400"
                      loading="lazy"
                      decoding="async"
                      onError={(e): void => {
                        const img = e.currentTarget as HTMLImageElement;
                        const fallback = LOCAL_FALLBACKS[index % LOCAL_FALLBACKS.length] ?? LOCAL_FALLBACKS[0]!;
                        if (img.src !== window.location.origin + fallback) {
                          img.src = fallback;
                        }
                      }}
                      className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500"
                    />
                    
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-white">
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
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-14 flex flex-col md:flex-row items-center justify-between gap-5 px-6 py-5 rounded-2xl border border-light-border dark:border-dark-border bg-light-surface dark:bg-dark-surface"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] flex items-center justify-center">
              <InstagramIcon className="w-6 h-6 text-white" />
            </div>
            <div className="text-left">
              <p className="font-display font-black text-base text-light-text dark:text-dark-text leading-tight">
                Hungry for more reels?
              </p>
              <p className="font-mono text-xs text-light-muted dark:text-dark-muted mt-0.5 flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Pune · weekly drops
              </p>
            </div>
          </div>
          
          <a
            data-testid="insta-follow-cta"
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2.5 font-display font-bold text-sm rounded-full bg-light-text dark:bg-dark-text text-light-bg dark:text-dark-bg hover:opacity-90 transition-opacity"
          >
            <InstagramIcon className="w-4 h-4" />
            Follow @{siteConfig.instaHandle}
          </a>
        </motion.div>

      </div>
    </section>
  );
};
export default InstagramFeed;
