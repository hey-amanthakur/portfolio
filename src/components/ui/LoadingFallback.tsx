import type { FC } from 'react';
import { motion } from 'framer-motion';

export const LoadingFallback: FC = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="text-center">
      <motion.div
        animate={{
          rotate: 360,
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
          scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
        }}
        className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-400 mx-auto mb-4 flex items-center justify-center shadow-lg shadow-primary-400/30"
      >
        <div className="w-6 h-6 rounded-full bg-white/30" />
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-muted font-mono text-sm"
      >
        Loading section...
      </motion.p>
    </div>
  </div>
);

export default LoadingFallback;
