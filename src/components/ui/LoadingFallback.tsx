import type { FC } from 'react';

export const LoadingFallback: FC = () => (
  <div className="min-h-[400px] flex items-center justify-center animate-pulse">
    <div className="text-center">
      <div className="w-16 h-16 rounded-2xl bg-light-bg dark:bg-dark-surface border-2 border-light-border dark:border-dark-border mx-auto mb-4 animate-spin" style={{ animationDuration: '3s' }}>
        <div className="w-6 h-6 rounded-full bg-primary-400 mx-auto mt-5" />
      </div>
      <p className="text-light-muted dark:text-dark-muted font-body text-sm">Loading section...</p>
    </div>
  </div>
);
