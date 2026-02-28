import React from 'react';
import { cn } from '../lib/utils';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  elevation?: 1 | 2 | 3;
  hover?: boolean;
  children: React.ReactNode;
}

export function GlassCard({ 
  elevation = 1, 
  hover = false, 
  className, 
  children,
  ...props 
}: GlassCardProps) {
  const elevationStyles = {
    1: 'shadow-[0_2px_8px_rgba(0,0,0,0.04)]',
    2: 'shadow-[0_4px_16px_rgba(0,0,0,0.06)]',
    3: 'shadow-[0_8px_24px_rgba(0,0,0,0.08)]',
  };

  return (
    <div
      className={cn(
        'rounded-[16px] border border-white/40 backdrop-blur-[12px] transition-all duration-200 ease-in-out',
        'bg-[rgba(255,255,255,0.65)]',
        elevationStyles[elevation],
        hover && 'hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] hover:-translate-y-0.5',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
