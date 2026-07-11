import { useRef, useState, type FC, type ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ISpotlightCardProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly spotlightColor?: string;
}

export const SpotlightCard: FC<ISpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 107, 53, 0.15)',
}) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState<number>(0);

  const handleMouseMove = (e: React.MouseEvent): void => {
    if (divRef.current === null) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={(): void => { setOpacity(1); }}
      onMouseLeave={(): void => { setOpacity(0); }}
      className={`relative overflow-hidden ${className}`}
    >
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 rounded-[inherit]"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${String(position.x)}px ${String(position.y)}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {children}
    </motion.div>
  );
};

export default SpotlightCard;
