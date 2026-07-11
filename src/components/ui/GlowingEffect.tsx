import type { FC } from 'react';
import { motion } from 'framer-motion';

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
    <motion.div
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`absolute pointer-events-none rounded-full blur-3xl ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${color}40, transparent)`,
      }}
    />
  );
};

export default GlowingEffect;
