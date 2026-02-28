import { cn } from '../lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[12px] bg-muted/40',
        'before:absolute before:inset-0',
        'before:-translate-x-full',
        'before:animate-[shimmer_1.5s_ease-in-out_infinite]',
        'before:bg-gradient-to-r',
        'before:from-transparent before:via-white/10 before:to-transparent',
        'isolate',
        className
      )}
      {...props}
    />
  );
}

// Specific skeleton variants
export function SkeletonCircle({ className, ...props }: SkeletonProps) {
  return <Skeleton className={cn('rounded-full', className)} {...props} />;
}

export function SkeletonText({ className, ...props }: SkeletonProps) {
  return <Skeleton className={cn('h-4 w-full', className)} {...props} />;
}

export function SkeletonButton({ className, ...props }: SkeletonProps) {
  return <Skeleton className={cn('h-10 w-full', className)} {...props} />;
}

export function SkeletonCard({ className, ...props }: SkeletonProps) {
  return (
    <Skeleton
      className={cn(
        'w-full p-5 md:p-6',
        'backdrop-blur-[12px] bg-[rgba(255,255,255,0.75)] border border-[rgba(42,40,38,0.06)]',
        className
      )}
      {...props}
    />
  );
}
