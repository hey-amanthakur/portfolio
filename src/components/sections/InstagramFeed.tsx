import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { instagramPosts, siteConfig } from '@/data/content';
import scrapedPosts from '@/scraped/instagram-posts.json';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import type { IInstagramPost } from '@/types';
import { TerminalSection } from '@components/ui/TerminalSection';

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
    return LOCAL_FALLBACKS[index % LOCAL_FALLBACKS.length] ?? LOCAL_FALLBACKS[0]!;
  }
  return raw;
};

export const InstagramFeed: FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.05 });

  return (
    <TerminalSection
      id="swaad-feed"
      command={`curl -s instagram.com/${siteConfig.instaHandle} | jq '.posts'`}
      ariaLabel="Instagram side-project feed"
    >
      <div ref={ref}>
        <p className="font-mono text-xs dark:text-phosphor-dim text-light-muted mb-1">
          HTTP/2 200 · content-type: application/json · cached: 5m ago
        </p>
        <p className="font-mono text-xs dark:text-phosphor-amber text-primary-400 mb-5">
          → side project · pune food diary · @{siteConfig.instaHandle}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {displayPosts.map((post, index) => {
            const safeImage = resolveImage(post.imageUrl, index);
            return (
              <motion.a
                key={post.id}
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid={`insta-post-${post.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="group relative block aspect-square overflow-hidden border dark:border-crt-dim border-light-border hover:dark:border-crt-bright hover:dark:shadow-crt-glow transition-all"
              >
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
                    if (!img.src.endsWith(fallback)) img.src = fallback;
                  }}
                  className="w-full h-full object-cover dark:opacity-75 dark:group-hover:opacity-100 transition-opacity duration-300 dark:saturate-[1.1]"
                />

                {/* Corner index */}
                <span className="absolute top-1.5 left-1.5 font-mono text-[10px] dark:text-phosphor-bright text-light-text bg-black/65 px-1.5 py-0.5">
                  {String(index + 1).padStart(2, '0')}
                </span>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 font-mono">
                  <div className="flex items-center gap-3 text-[11px] dark:text-phosphor-bright text-white mb-1">
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {post.comments}
                    </span>
                    <ExternalLink className="w-3 h-3 ml-auto" />
                  </div>
                  <p className="text-[10px] text-white/85 line-clamp-3 leading-snug">
                    {post.caption}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>

        <div className="mt-6 font-mono text-xs dark:text-phosphor-dim text-light-muted">
          <span className="dark:text-phosphor-amber text-primary-400">›</span>{' '}
          {displayPosts.length} posts returned ·{' '}
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="insta-follow-cta"
            className="dark:text-phosphor-bright text-primary-400 underline-offset-4 hover:underline"
          >
            follow @{siteConfig.instaHandle} →
          </a>
        </div>
      </div>
    </TerminalSection>
  );
};
export default InstagramFeed;
