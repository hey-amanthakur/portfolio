import type { FC } from 'react';
import { motion } from 'framer-motion';

interface IAnimatedTextProps {
  readonly text: string;
  readonly className?: string;
  readonly once?: boolean;
}

export const AnimatedText: FC<IAnimatedTextProps> = ({
  text,
  className = '',
  once = true,
}) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  } as const;

  const letterVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 10,
        stiffness: 150,
      },
    },
  } as const;

  return (
    <motion.span
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-50px' }}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, wordIdx) => (
        <span key={wordIdx} className="inline-block whitespace-nowrap mr-[0.3em] my-1">
          {word.split('').map((char, charIdx) => (
            <motion.span
              key={charIdx}
              variants={letterVariants}
              className="inline-block hover:text-primary-400 cursor-default hover:scale-125 transition-transform duration-100"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
};
