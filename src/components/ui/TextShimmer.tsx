import type { FC } from 'react';

interface ITextShimmerProps {
  readonly text: string;
  readonly className?: string;
}

export const TextShimmer: FC<ITextShimmerProps> = ({
  text,
  className = '',
}) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10 bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
        {text}
      </span>
    </span>
  );
};

export default TextShimmer;
