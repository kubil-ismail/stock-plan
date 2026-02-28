import React, { useEffect, useRef } from 'react';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedNumber({ 
  value, 
  duration = 600, 
  decimals = 0,
  prefix = '',
  suffix = '',
  className = ''
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current || hasAnimated.current) return;
    
    hasAnimated.current = true;
    const element = ref.current;
    const start = 0;
    const end = value;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic function
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = start + (end - start) * easeProgress;

      if (element) {
        element.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else if (element) {
        // Ensure final value is exact
        element.textContent = `${prefix}${end.toFixed(decimals)}${suffix}`;
      }
    };

    requestAnimationFrame(animate);
  }, [value, duration, decimals, prefix, suffix]);

  return <span ref={ref} className={className}>{prefix}{value.toFixed(decimals)}{suffix}</span>;
}

interface LoadingWrapperProps {
  isLoading: boolean;
  skeleton: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}

export function LoadingWrapper({ 
  isLoading, 
  skeleton, 
  children, 
  delay = 400 
}: LoadingWrapperProps) {
  const showSkeleton = useMinimumDelay(isLoading, delay);

  if (showSkeleton) {
    return <>{skeleton}</>;
  }

  return <div className="animate-fade-in-up">{children}</div>;
}

// Custom hook to ensure minimum loading time
function useMinimumDelay(isLoading: boolean, minDelay: number) {
  const [showSkeleton, setShowSkeleton] = React.useState(true);
  const loadStartTime = useRef<number | null>(null);

  React.useEffect(() => {
    if (isLoading && loadStartTime.current === null) {
      // Start loading
      loadStartTime.current = Date.now();
      setShowSkeleton(true);
    } else if (!isLoading && loadStartTime.current !== null) {
      // Loading finished
      const elapsed = Date.now() - loadStartTime.current;
      const remaining = Math.max(0, minDelay - elapsed);

      setTimeout(() => {
        setShowSkeleton(false);
        loadStartTime.current = null;
      }, remaining);
    }
  }, [isLoading, minDelay]);

  return showSkeleton;
}