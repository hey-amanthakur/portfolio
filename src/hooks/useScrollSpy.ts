import { useEffect, useState } from 'react';

export const useScrollSpy = (
  ids: ReadonlyArray<string>,
  offset = 120
): string => {
  const [activeId, setActiveId] = useState<string>('');

  useEffect((): (() => void) => {
    const handleScroll = (): void => {
      const scrollPosition = window.scrollY + offset;

      // Determine which section is currently active
      let currentActive = ids[0] ?? '';

      for (const id of ids) {
        const element = document.getElementById(id);
        if (element !== null) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            currentActive = id;
            break;
          }
        }
      }

      // Fallback for bottom of the page
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        currentActive = ids[ids.length - 1] ?? currentActive;
      }

      setActiveId(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run initially on mount

    return (): void => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [ids, offset]);

  return activeId;
};
