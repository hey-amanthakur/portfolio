import type { FC } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Star, GitFork, GitPullRequest } from 'lucide-react';
import { languageColor } from '@/utils/languageColor';

interface IRepoCardProps {
  readonly name: string;
  readonly description: string;
  readonly url: string;
  readonly language: string;
  readonly stars?: number;
  readonly forks?: number;
  readonly prCount?: number;
  readonly variant?: 'pinned' | 'oss';
  readonly index?: number;
  readonly isVisible?: boolean;
}

export const RepoCard: FC<IRepoCardProps> = ({
  name,
  description,
  url,
  language,
  stars = 0,
  forks = 0,
  prCount = 0,
  variant = 'pinned',
  index = 0,
  isVisible = false,
}) => {
  const isOss = variant === 'oss';

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.3, delay: index * 0.08 }}
      whileHover={{ y: -4, scale: 1.02 }}
      className={`group block p-5 rounded-2xl border-2 bg-canvas transition-all duration-300 ${
        isOss
          ? 'border-dashed border-primary-400/40 dark:border-primary-400/30 hover:border-primary-400 hover:bg-primary-50 dark:hover:bg-primary-400/5 hover:shadow-xl hover:shadow-primary-400/10'
          : 'border-line hover:border-primary-400 hover:shadow-xl hover:shadow-primary-400/10'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <span className="font-display font-bold text-sm text-primary-400 group-hover:text-primary-300 truncate">
          {name}
        </span>
        <ExternalLink className="w-3.5 h-3.5 text-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
      </div>

      <p className="text-xs text-muted font-body leading-relaxed mb-3 line-clamp-2">
        {description}
      </p>

      <div className="flex items-center gap-3 text-[11px] text-muted">
        <span className="flex items-center gap-1">
          <span
            className="w-2.5 h-2.5 rounded-full inline-block"
            style={{ backgroundColor: languageColor(language) }}
          />
          {language}
        </span>
        {prCount > 0 && (
          <span className="flex items-center gap-1">
            <GitPullRequest className="w-3 h-3" />
            {prCount} PR{prCount === 1 ? '' : 's'}
          </span>
        )}
        {stars > 0 && (
          <span className="flex items-center gap-1">
            <Star className="w-3 h-3" />
            {stars}
          </span>
        )}
        {forks > 0 && (
          <span className="flex items-center gap-1">
            <GitFork className="w-3 h-3" />
            {forks}
          </span>
        )}
      </div>
    </motion.a>
  );
};

export default RepoCard;
