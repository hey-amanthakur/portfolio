import type { FC, ReactNode, Ref } from 'react';

interface ISectionShellProps {
  readonly id: string;
  readonly 'aria-label': string;
  readonly tone?: 'canvas' | 'surface';
  readonly border?: 'none' | 'y' | 'top' | 'bottom';
  readonly className?: string;
  readonly ref?: Ref<HTMLElement>;
  readonly children: ReactNode;
}

/**
 * Shared section wrapper — standardizes the vertical rhythm, background
 * tone, and border treatment across all sections. `tone` and `border`
 * use semantic tokens that flip automatically in dark mode.
 */
export const SectionShell: FC<ISectionShellProps> = ({
  id,
  'aria-label': ariaLabel,
  tone = 'canvas',
  border = 'none',
  className = '',
  ref,
  children,
}) => {
  const toneClass = tone === 'surface' ? 'bg-surface' : 'bg-canvas';

  const borderClass: Readonly<Record<NonNullable<ISectionShellProps['border']>, string>> = {
    none: '',
    y: 'border-y-2 border-line',
    top: 'border-t-2 border-line',
    bottom: 'border-b-2 border-line',
  };

  return (
    <section
      ref={ref}
      id={id}
      aria-label={ariaLabel}
      className={`py-24 ${toneClass} ${borderClass[border]} transition-colors duration-300 relative overflow-hidden ${className}`}
    >
      {children}
    </section>
  );
};

export default SectionShell;
