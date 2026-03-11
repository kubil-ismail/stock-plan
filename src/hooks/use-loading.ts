import { useState, useEffect } from 'react';

/**
 * Hook to simulate data loading with a minimum delay
 * Useful for demonstrating skeleton screens
 */
export function useSimulatedLoading(duration: number = 1200) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isLoading;
}

/**
 * Hook for progressive/lazy loading of page sections
 */
export function useProgressiveLoading(delays: number[]) {
  const [loadedSections, setLoadedSections] = useState<boolean[]>(
    new Array(delays.length).fill(false)
  );

  useEffect(() => {
    const timers = delays.map((delay, index) => {
      return setTimeout(() => {
        setLoadedSections(prev => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
      }, delay);
    });

    return () => {
      timers.forEach(timer => clearTimeout(timer));
    };
  }, [delays]);

  return loadedSections;
}
