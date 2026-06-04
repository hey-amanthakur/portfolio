import type { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';

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
          <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24" aria-label="Loading spinner">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </motion.button>
  );
};
