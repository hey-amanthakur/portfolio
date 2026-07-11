import '@testing-library/jest-dom';
import { vi } from 'vitest';
import React from 'react';
import type { ForwardedRef, ReactNode } from 'react';

// Mock IntersectionObserver — fires callback immediately so isVisible = true
class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = '';
  readonly thresholds: readonly number[] = [];
  private callback: IntersectionObserverCallback;
  private elements: Element[] = [];

  constructor(callback: IntersectionObserverCallback) {
    this.callback = callback;
  }

  observe = (element: Element): void => {
    this.elements.push(element);
    queueMicrotask((): void => {
      this.callback(
        [{ isIntersecting: true, ratio: 1, target: element, root: null, rootMargin: '', time: Date.now(), boundingClientRect: {} as DOMRect, intersectionRect: {} as DOMRect, intersectionRatio: 1 } as IntersectionObserverEntry],
        this,
      );
    });
  };

  unobserve = (element: Element): void => {
    this.elements = this.elements.filter((e) => e !== element);
  };

  disconnect = (): void => {
    this.elements = [];
  };

  takeRecords = (): IntersectionObserverEntry[] => [];
}

(globalThis as Record<string, unknown>).IntersectionObserver = MockIntersectionObserver;

// Motion props to strip from mocked components
const MOTION_PROPS = [
  'initial', 'animate', 'exit', 'transition', 'variants',
  'whileHover', 'whileTap', 'whileInView', 'viewport',
  'onAnimationStart', 'onAnimationComplete', 'layout', 'layoutId',
  'custom',
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
    useMotionValue: (val: number): { get: () => number; set: (v: number) => void } => ({
      get: (): number => val,
      set: (): void => { /* intentionally no-op for mock */ },
    }),
  };
});
