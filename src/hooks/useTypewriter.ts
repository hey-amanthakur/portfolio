import { useEffect, useState } from 'react';

/**
 * Returns a string that progressively reveals `text` one character at a time
 * once the gate is true (typically when an IntersectionObserver fires).
 *
 * @param text       Full string to type out
 * @param start      Gate — typing begins when true
 * @param speed      ms per character (default 30)
 * @param startDelay ms before the first character (default 0)
 */
export const useTypewriter = (
  text: string,
  start: boolean,
  speed = 30,
  startDelay = 0
): { typed: string; done: boolean } => {
  const [typed, setTyped] = useState<string>('');
  const [done, setDone] = useState<boolean>(false);

  useEffect((): (() => void) => {
    if (!start) return (): void => { /* noop */ };
    setTyped('');
    setDone(false);

    let i = 0;
    let interval: ReturnType<typeof setInterval> | null = null;

    const startTimer = setTimeout((): void => {
      interval = setInterval((): void => {
        i += 1;
        if (i >= text.length) {
          setTyped(text);
          setDone(true);
          if (interval !== null) clearInterval(interval);
        } else {
          setTyped(text.slice(0, i));
        }
      }, speed);
    }, startDelay);

    return (): void => {
      clearTimeout(startTimer);
      if (interval !== null) clearInterval(interval);
    };
  }, [text, start, speed, startDelay]);

  return { typed, done };
};
