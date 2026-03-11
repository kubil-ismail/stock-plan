import React from 'react';
import { cn } from '../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'success' | 'danger' | 'warning' | 'info' | 'secondary';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export function Badge({ 
  variant = 'default', 
  size = 'md',
  className, 
  children,
  ...props 
}: BadgeProps) {
  const variants = {
    default: 'bg-muted text-muted-foreground',
    success: 'bg-success/10 text-success border border-success/20',
    danger: 'bg-destructive/10 text-destructive border border-destructive/20',
    warning: 'bg-amber-500/10 text-amber-700 border border-amber-500/20',
    info: 'bg-blue-500/10 text-blue-700 border border-blue-500/20',
    secondary: 'bg-secondary/10 text-secondary border border-secondary/20',
  };

  const sizes = {
    sm: 'px-2 py-0.5 text-[11px]',
    md: 'px-2.5 py-1 text-[12px]',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full font-medium',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
