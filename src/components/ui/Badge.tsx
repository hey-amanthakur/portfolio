import type { FC } from 'react';
import { motion } from 'framer-motion';

interface IBadgeProps {
  readonly children: string;
  readonly variant?: 'primary' | 'secondary' | 'outline' | 'neutral';
  readonly className?: string;
}

export const Badge: FC<IBadgeProps> = ({
  children,
  variant = 'primary',
  className = '',
}) => {
  const baseStyles = 'inline-block px-3.5 py-1 text-xs font-display font-bold rounded-full border-2 border-light-text dark:border-dark-text transition-colors';
  
  const variantStyles = {
    primary: 'bg-primary-100 dark:bg-primary-900/30 text-primary-900 dark:text-primary-300',
    secondary: 'bg-secondary-100 dark:bg-secondary-900/30 text-secondary-900 dark:text-secondary-300',
    outline: 'bg-transparent text-light-text dark:text-dark-text',
    neutral: 'bg-light-bg dark:bg-dark-surface text-light-muted dark:text-dark-muted',
  } as const;

  return (
    <motion.span
      whileHover={{ scale: 1.05, rotate: -1 }}
      transition={{ type: 'spring', stiffness: 500, damping: 10 }}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </motion.span>
  );
};
