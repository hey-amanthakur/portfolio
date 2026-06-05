import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useScrollSpy } from '@/hooks/useScrollSpy';

describe('useScrollSpy Hook', (): void => {
  const sectionOffsets: Record<string, { top: number; height: number }> = {
    home: { top: 0, height: 400 },
    about: { top: 400, height: 400 },
    services: { top: 800, height: 400 },
    contact: { top: 1200, height: 400 },
  };

  beforeEach((): void => {
    vi.spyOn(document, 'getElementById').mockImplementation(
      (id: string | null): HTMLElement | null => {
        if (id !== null && sectionOffsets[id] !== undefined) {
          const offset = sectionOffsets[id];
          return {
            offsetTop: offset.top,
            offsetHeight: offset.height,
          } as unknown as HTMLElement;
        }
        return null;
      }
    );

    Object.defineProperty(window, 'scrollY', {
      value: 0,
      configurable: true,
      writable: true,
    });
    Object.defineProperty(window, 'innerHeight', {
      value: 800,
      configurable: true,
      writable: true,
    });
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 1600,
      configurable: true,
      writable: true,
    });
  });

  afterEach((): void => {
    vi.restoreAllMocks();
  });

  const setScrollY = (value: number): void => {
    Object.defineProperty(window, 'scrollY', {
      value,
      configurable: true,
      writable: true,
    });
  };

  it('returns the first section id on initial render', (): void => {
    setScrollY(0);

    const { result } = renderHook((): string =>
      useScrollSpy(['home', 'about', 'services', 'contact'])
    );

    // At scrollY=0 + offset=120 = 120, home covers 0-400
    expect(result.current).toBe('home');
  });

  it('returns the correct active section based on scroll position', (): void => {
    setScrollY(500);

    const { result } = renderHook((): string =>
      useScrollSpy(['home', 'about', 'services', 'contact'])
    );

    // At scrollY=500 + offset=120 = 620, about covers 400-800
    expect(result.current).toBe('about');
  });

  it('returns the last section when scrolled to the bottom', (): void => {
    setScrollY(2000);

    const { result } = renderHook((): string =>
      useScrollSpy(['home', 'about', 'services', 'contact'])
    );

    expect(result.current).toBe('contact');
  });

  it('handles empty ids array gracefully', (): void => {
    const { result } = renderHook((): string => useScrollSpy([]));

    expect(result.current).toBe('');
  });

  it('updates active section on scroll events', (): void => {
    setScrollY(0);

    // Set scrollHeight high enough that bottom-of-page check doesn't fire
    Object.defineProperty(document.documentElement, 'scrollHeight', {
      value: 3000,
      configurable: true,
      writable: true,
    });

    const { result, rerender } = renderHook((): string =>
      useScrollSpy(['home', 'about', 'services', 'contact'])
    );

    expect(result.current).toBe('home');

    // Simulate scroll to 'services' section
    act((): void => {
      setScrollY(900);
      window.dispatchEvent(new Event('scroll'));
    });

    // Re-render to pick up the new scroll state
    rerender();

    // At scrollY=900 + offset=120 = 1020, services covers 800-1200
    expect(result.current).toBe('services');
  });
});
