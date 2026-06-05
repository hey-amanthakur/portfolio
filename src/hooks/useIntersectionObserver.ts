import { useEffect, useRef, useState } from 'react';
import type { RefObject } from 'react';

interface IUseIntersectionObserverOptions {
  readonly threshold?: number;
  readonly rootMargin?: string;
  readonly triggerOnce?: boolean;
}

interface IUseIntersectionObserverReturn {
  readonly ref: RefObject<HTMLDivElement>;
  readonly isVisible: boolean;
}

export const useIntersectionObserver = (
  options: IUseIntersectionObserverOptions = {}
): IUseIntersectionObserverReturn => {
  const { threshold = 0.1, rootMargin = '0px', triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect((): (() => void) => {
    const element = ref.current;
    if (element === null) return (): void => { /* no cleanup needed */ };

    const observer = new IntersectionObserver(
      ([entry]: IntersectionObserverEntry[]): void => {
        const isIntersecting = entry?.isIntersecting ?? false;
        if (isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return (): void => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce]);

  return { ref, isVisible };
};
