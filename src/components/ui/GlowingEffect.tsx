import type { FC } from 'react';

interface IGlowingEffectProps {
  readonly className?: string;
  readonly color?: string;
  readonly size?: number;
}

export const GlowingEffect: FC<IGlowingEffectProps> = ({
  className = '',
  color = '#ff6b35',
  size = 300,
}) => {
  return (
    <div
      className={`absolute pointer-events-none rounded-full blur-3xl ${className} glow-pulse`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}40, transparent)`,
      }}
    />
  );
};

export default GlowingEffect;