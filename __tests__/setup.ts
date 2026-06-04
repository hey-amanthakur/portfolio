import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';
import type { ReactNode } from 'react';

// Mock IntersectionObserver
global.IntersectionObserver = vi.fn(
  (): IntersectionObserver => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    root: null,
    rootMargin: '',
    thresholds: [],
    takeRecords: () => [],
  })
);

// Mock framer-motion with strict ES module compatibility
vi.mock('framer-motion', () => {
  const dummyComponent = (tag: string) => {
    const Component = React.forwardRef<any, { children?: ReactNode }>(
      ({ children, ...props }: any, ref) => {
        // Filter out motion-specific properties
        const cleanProps = { ...props };
        const motionProps = [
          'initial', 'animate', 'exit', 'transition', 'variants',
          'whileHover', 'whileTap', 'viewport', 'onAnimationStart',
          'onAnimationComplete', 'layout', 'layoutId'
        ];
        motionProps.forEach((p) => {
          delete cleanProps[p];
        });
        return React.createElement(tag, { ...cleanProps, ref }, children);
      }
    );
    Component.displayName = `motion.${tag}`;
    return Component;
  };

  const motionProxy = new Proxy({} as any, {
    get: (_target, tag: string) => dummyComponent(tag),
  });

  return {
    __esModule: true,
    motion: motionProxy,
    default: motionProxy,
    AnimatePresence: ({ children }: { children: ReactNode }): ReactNode => children,
    useInView: (): boolean => true,
    useScroll: (): Record<string, unknown> => ({
      scrollYProgress: {
        get: (): number => 0,
        onChange: (): (() => void) => () => {},
      },
    }),
    useTransform: (): number => 0,
    useSpring: (): number => 0,
  };
});
