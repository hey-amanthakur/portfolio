import type { FC } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { IProject } from '@/types';
import { Badge } from '@components/ui/Badge';
import { SpotlightCard } from '@components/ui/SpotlightCard';
import { MagneticButton } from '@components/ui/MagneticButton';
import { GitHubIcon } from '@components/icons';

interface IProjectCardProps {
  readonly project: IProject;
}

export const ProjectCard: FC<IProjectCardProps> = ({ project }) => {
  return (
    <SpotlightCard className="w-full h-full" spotlightColor="rgba(255, 107, 53, 0.12)">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`flex flex-col w-full h-full text-left rounded-xl-playful border-2 ${
          project.featured
            ? 'border-primary-400/50 dark:border-primary-400/50'
            : 'border-line'
        } bg-surface overflow-hidden`}
      >
        {/* Project Image Frame */}
        <div className="w-full aspect-[16/9] overflow-hidden relative border-b-2 border-line bg-gray-100 dark:bg-canvas">
          <img
            src={project.imageUrl}
            alt={project.title}
            width="800"
            height="450"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />

          {project.featured && (
            <span className="absolute top-4 left-4 bg-secondary-400 text-white border-2 border-white/30 px-3 py-1 rounded-full font-mono font-bold text-[10px] uppercase shadow-lg shadow-secondary-400/30">
              featured
            </span>
          )}
        </div>

        {/* Project Body */}
        <div className="p-6 flex flex-col justify-between flex-grow">
          <div>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-[9px]">
                  {tag}
                </Badge>
              ))}
            </div>

            <h3 className="font-display font-black text-xl text-ink tracking-tight group-hover:text-primary-400 leading-snug transition-colors">
              {project.title}
            </h3>

            <p className="mt-3 text-sm text-muted font-body leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Action buttons footer */}
          <div className="mt-6 pt-4 border-t border-line flex items-center gap-3">
            {project.repoUrl !== undefined && (
              <MagneticButton strength={0.15}>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 font-display font-bold text-xs rounded-xl border-2 border-ink bg-surface text-ink hover:bg-primary-50 shadow-flat-light dark:shadow-flat-dark active:translate-x-0.5 active:translate-y-0.5"
                >
                  <GitHubIcon className="w-4 h-4" />
                  Source Code
                </a>
              </MagneticButton>
            )}

            {project.liveUrl !== undefined && (
              <MagneticButton strength={0.15}>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 font-display font-bold text-xs rounded-xl border-2 border-ink bg-primary-400 text-white hover:bg-primary-300 shadow-lg shadow-primary-400/20 active:translate-x-0.5 active:translate-y-0.5"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              </MagneticButton>
            )}
          </div>
        </div>
      </motion.div>
    </SpotlightCard>
  );
};

export default ProjectCard;
