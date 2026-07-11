import { useEffect, useState, type FC } from 'react';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface IAnimatedCounterProps {
  readonly target: number;
  readonly suffix?: string;
  readonly prefix?: string;
  readonly duration?: number;
  readonly className?: string;
}

export const AnimatedCounter: FC<IAnimatedCounterProps> = ({
  target,
  suffix = '',
  prefix = '',
  duration = 2,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [count, setCount] = useState<number>(0);

  useEffect((): (() => void) => {
    if (!isInView) return (): void => { /* noop */ };

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number): void => {
      startTime ??= currentTime;
      const elapsed = (currentTime - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);

      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return (): void => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isInView, target, duration]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, type: 'spring', stiffness: 200 }}
      className={`font-display font-black tabular-nums ${className}`}
    >
      {prefix}{count}{suffix}
    </motion.span>
  );
};

export default AnimatedCounter;
