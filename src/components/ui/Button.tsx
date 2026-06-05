import type { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { SpinnerIcon } from '@components/icons';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  readonly variant?: 'primary' | 'secondary' | 'outline';
  readonly size?: 'sm' | 'md' | 'lg';
  readonly isLoading?: boolean;
  readonly children: ReactNode;
}

export const Button: FC<IButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-display font-semibold rounded-xl-playful border-2 border-light-text dark:border-dark-text transition-colors focus:outline-none';
  
  const variantStyles = {
    primary: 'bg-primary-400 text-white hover:bg-primary-300 dark:hover:bg-primary-500 shadow-flat-light dark:shadow-flat-dark btn-flat-shadow',
    secondary: 'bg-secondary-400 text-light-text hover:bg-secondary-300 shadow-flat-light dark:shadow-flat-dark btn-flat-shadow',
    outline: 'bg-transparent text-light-text dark:text-dark-text hover:bg-primary-50 dark:hover:bg-dark-surface',
  } as const;

  const sizeStyles = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3.5 text-lg',
  } as const;

  const isDisabled = disabled === true || isLoading;

  return (
    <motion.button
      whileHover={isDisabled ? {} : { scale: 1.02, y: -2 }}
      whileTap={isDisabled ? {} : { scale: 0.98, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      disabled={isDisabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className} ${
        isDisabled ? 'opacity-50 cursor-not-allowed shadow-none translate-x-0 translate-y-0' : ''
      }`}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <SpinnerIcon className="animate-spin h-5 w-5 text-current" aria-label="Loading spinner" />
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
};
