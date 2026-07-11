import type { FC } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgress: FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary-400 via-secondary-400 to-primary-400 z-[100] origin-left"
    />
  );
};

export default ScrollProgress;
