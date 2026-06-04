import type { FC, ReactNode, HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  readonly variant?: 'default' | 'flat-primary' | 'flat-secondary' | 'borderless';
  readonly hoverEffect?: 'lift' | 'tilt' | 'none';
  readonly children: ReactNode;
}

export const Card: FC<ICardProps> = ({
  variant = 'default',
  hoverEffect = 'lift',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-xl-playful transition-colors overflow-hidden';
  
  const variantStyles = {
    default: 'bg-light-surface dark:bg-dark-surface border-2 border-light-border dark:border-dark-border',
    'flat-primary': 'bg-light-surface dark:bg-dark-surface border-2 border-light-text dark:border-dark-text shadow-flat-primary dark:shadow-flat-primary',
    'flat-secondary': 'bg-light-surface dark:bg-dark-surface border-2 border-light-text dark:border-dark-text shadow-flat-secondary dark:shadow-flat-secondary',
    borderless: 'bg-transparent border-none shadow-none',
  } as const;

  const hoverAnimations = {
    lift: {
      whileHover: { y: -6, scale: 1.01 },
      transition: { type: 'spring', stiffness: 300, damping: 18 },
    },
    tilt: {
      whileHover: { rotate: 1, y: -4 },
      transition: { type: 'spring', stiffness: 400, damping: 12 },
    },
    none: {},
  } as const;

  const activeAnimation = hoverEffect !== 'none' ? hoverAnimations[hoverEffect] : {};

  return (
    <motion.div
      {...activeAnimation}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
