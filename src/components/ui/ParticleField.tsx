import { useMemo, type FC } from 'react';
import { motion } from 'framer-motion';

interface IParticleFieldProps {
  readonly count?: number;
  readonly className?: string;
}

interface IParticle {
  readonly id: number;
  readonly x: number;
  readonly y: number;
  readonly size: number;
  readonly duration: number;
  readonly delay: number;
}

const seededRandom = (seed: number): number => {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
};

export const ParticleField: FC<IParticleFieldProps> = ({
  count = 30,
  className = '',
}) => {
  const particles = useMemo((): IParticle[] => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: seededRandom(i * 7 + 1) * 100,
      y: seededRandom(i * 13 + 3) * 100,
      size: seededRandom(i * 17 + 5) * 3 + 1,
      duration: seededRandom(i * 23 + 7) * 20 + 15,
      delay: seededRandom(i * 29 + 11) * 10,
    }));
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary-400/20 dark:bg-primary-400/10"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${String(particle.x)}%`,
            top: `${String(particle.y)}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 15, -10, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
};

export default ParticleField;
