import { useRef, useState, type FC, type ReactNode } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface IMagneticButtonProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly strength?: number;
  readonly onClick?: () => void;
}

export const MagneticButton: FC<IMagneticButtonProps> = ({
  children,
  className = '',
  strength = 0.3,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent): void => {
    if (ref.current === null) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{
        x: springX,
        y: springY,
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={(): void => { setIsHovered(true); }}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`inline-block cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default MagneticButton;
