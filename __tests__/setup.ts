import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';
import type { ForwardedRef, ReactNode } from 'react';

// Mock IntersectionObserver
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = '';
  readonly thresholds: readonly number[] = [];
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  takeRecords = (): IntersectionObserverEntry[] => [];
}

(globalThis as Record<string, unknown>).IntersectionObserver = MockIntersectionObserver;

// Motion props to strip from mocked components
const MOTION_PROPS = [
  'initial', 'animate', 'exit', 'transition', 'variants',
  'whileHover', 'whileTap', 'viewport', 'onAnimationStart',
  'onAnimationComplete', 'layout', 'layoutId',
] as const;

type MotionPropKey = typeof MOTION_PROPS[number];

// Build a clean props object by omitting motion-specific keys
function stripMotionProps(props: Record<string, unknown>): Record<string, unknown> {
  const clean: Record<string, unknown> = {};
  for (const key of Object.keys(props)) {
    if (!(MOTION_PROPS.includes(key as MotionPropKey))) {
      clean[key] = props[key];
    }
  }
  return clean;
}

// Mock framer-motion with strict ES module compatibility
vi.mock('framer-motion', () => {
  const dummyComponent = (tag: string): ReturnType<typeof React.forwardRef> => {
    const Component = React.forwardRef(
      (props: Record<string, unknown>, ref: ForwardedRef<HTMLElement>) => {
        const cleanProps = stripMotionProps(props);
        return React.createElement(tag, { ...cleanProps, ref }, props.children as ReactNode);
      }
    );
    Component.displayName = `motion.${tag}`;
    return Component;
  };

  const motionProxy = new Proxy<Record<string, unknown>>({}, {
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
        onChange: (): (() => void) => (): void => { /* no-op cleanup */ },
      },
    }),
    useTransform: (): number => 0,
    useSpring: (): number => 0,
  };
});
