import type { FC } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, ExternalLink, Sparkles } from 'lucide-react';
import { instagramPosts, siteConfig } from '@/data/content';
import scrapedPosts from '@/scraped/instagram-posts.json';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import type { IInstagramPost } from '@/types';

// Use scraped data if it exists and has real posts; fall back to hardcoded content.
const hasScrapedData = Array.isArray(scrapedPosts) && scrapedPosts.length > 0;
const displayPosts: readonly IInstagramPost[] = hasScrapedData
  ? scrapedPosts
  : instagramPosts;

export const InstagramFeed: FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section
      ref={ref}
      id="swaad-feed"
      aria-label="Aman Thakur Instagram Food Feed"
      className="py-24 bg-light-bg dark:bg-dark-bg transition-colors duration-300 relative bg-grid-pattern-light dark:bg-grid-pattern-dark"
    >
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-light-text dark:border-dark-text bg-[#E1306C]/10 text-[#E1306C] font-display font-extrabold text-xs">
            {/* Instagram */}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span>@{siteConfig.instaHandle}</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-5xl text-light-text dark:text-dark-text mt-4 tracking-tight">
            Swaad Safar Feed <span className="text-primary-400">📸</span>
          </h2>
          <p className="mt-4 text-light-muted dark:text-dark-muted font-body text-lg">
            Peeking inside my food diary. Helping you discover legendary culinary joints, one post at a time.
          </p>
        </div>

        {/* Dynamic Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1, type: 'spring', stiffness: 200, damping: 15 }}
            >
              <a
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block rounded-2xl-playful overflow-hidden border-2 border-light-text dark:border-dark-text shadow-flat-light dark:shadow-flat-dark hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none active:translate-x-1 active:translate-y-1 transition-all duration-200"
              >
                {/* Polaroid Media Frame */}
                <div className="aspect-square bg-gray-100 overflow-hidden relative">
                  <img
                    src={post.imageUrl}
                    alt={post.caption}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Hover Stat Overlays */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white p-6 text-center">
                    <div className="flex items-center gap-6">
                      <span className="flex items-center gap-1.5 font-display font-black text-lg">
                        <Heart className="w-5 h-5 fill-current text-red-500" />
                        {post.likes.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1.5 font-display font-black text-lg">
                        <MessageCircle className="w-5 h-5 fill-current text-blue-400" />
                        {post.comments.toLocaleString()}
                      </span>
                    </div>
                    
                    <p className="mt-4 text-xs font-body line-clamp-3 text-gray-300">
                      {post.caption}
                    </p>

                    <span className="mt-4 inline-flex items-center gap-1.5 bg-[#E1306C] text-white px-3 py-1 rounded-full text-[10px] font-display font-black uppercase">
                      View Post <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>

                {/* Polaroid Caption base */}
                <div className="p-4 bg-white dark:bg-dark-surface border-t-2 border-light-text dark:border-dark-text text-left font-body text-xs text-light-muted dark:text-dark-muted line-clamp-2 leading-relaxed">
                  {post.caption}
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        {/* Growth Call-to-action Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 bg-light-surface dark:bg-dark-surface border-2 border-light-text dark:border-dark-text p-8 rounded-2xl-playful shadow-flat-primary dark:shadow-flat-primary flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="text-left">
            <h3 className="font-display font-black text-xl sm:text-2xl text-light-text dark:text-dark-text flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary-400 animate-pulse" />
              Join the Safar! 🗺️
            </h3>
            <p className="mt-2 text-sm md:text-base text-light-muted dark:text-dark-muted font-body leading-relaxed max-w-xl">
              I explore hidden street gems, review culinary masterpieces, and document delicious recipes weekly. Follow my page to grow our community of foodies organically!
            </p>
          </div>
          
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 font-display font-black text-sm rounded-xl border-2 border-light-text dark:border-dark-text bg-[#E1306C] text-white hover:bg-[#c02456] shadow-flat-light dark:shadow-flat-dark hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all duration-200"
          >
            {/* Instagram */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            Follow @{siteConfig.instaHandle}
          </a>
        </motion.div>

      </div>
    </section>
  );
};
export default InstagramFeed;
