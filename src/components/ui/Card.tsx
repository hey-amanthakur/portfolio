import type { FC, ReactNode, HTMLAttributes } from 'react';

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  readonly variant?: 'default' | 'flat-primary' | 'flat-secondary' | 'borderless';
  readonly hoverEffect?: 'lift' | 'tilt' | 'none';
  readonly children: ReactNode;
}

export const Card: FC<ICardProps> = ({
  variant = 'default',
  children,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-xl-playful transition-colors overflow-hidden';
  
  const variantStyles = {
    default: 'bg-surface border-2 border-line',
    'flat-primary': 'bg-surface border-2 border-ink shadow-flat-primary',
    'flat-secondary': 'bg-surface border-2 border-ink shadow-flat-secondary',
    borderless: 'bg-transparent border-none shadow-none',
  } as const;

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
