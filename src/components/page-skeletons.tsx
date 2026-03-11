import { GlassCard } from './glass-card';
import { 
  Skeleton, 
  SkeletonCircle, 
  SkeletonText, 
  SkeletonButton,
} from './skeleton';

export function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      {/* Portfolio Summary Card */}
      <GlassCard className="p-5 md:p-6">
        <div className="space-y-5">
          <SkeletonText className="w-32 mb-4" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-10 w-40" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-10 w-36" />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Performance Chart */}
      <GlassCard className="p-5 md:p-6">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-40" />
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton key={i} className="h-8 w-12" />
            ))}
          </div>
        </div>
        <Skeleton className="h-[300px] md:h-[400px] w-full" />
      </GlassCard>

      {/* Recent Orders List */}
      <GlassCard className="p-5 md:p-6">
        <Skeleton className="h-6 w-32 mb-5" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-muted/20">
              <SkeletonCircle className="w-12 h-12 flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-3 w-16 ml-auto" />
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

export function StockDetailSkeleton() {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Skeleton className="h-6 w-20" />

      {/* Hero Section */}
      <GlassCard className="p-5 md:p-8">
        <div className="flex flex-col md:flex-row md:items-start gap-5">
          <SkeletonCircle className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0" />
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-12 w-40 mt-3" />
            </div>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-7 w-24" />
              ))}
            </div>
            <div className="flex gap-3">
              <Skeleton className="h-9 w-28" />
              <Skeleton className="h-9 w-32" />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Allocation Card */}
      <GlassCard className="p-5 md:p-6 border-2 border-primary/10">
        <div className="space-y-2 mb-5">
          <Skeleton className="h-6 w-56" />
          <Skeleton className="h-3 w-64" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-5">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-accent/30 rounded-xl p-4 space-y-2">
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-7 w-32" />
            </div>
          ))}
        </div>
        <Skeleton className="h-3 w-full mb-3" />
        <Skeleton className="h-12 w-full rounded-lg" />
      </GlassCard>

      {/* Performance Chart */}
      <GlassCard className="p-5 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <Skeleton className="h-6 w-40" />
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6, 7].map((i) => (
              <Skeleton key={i} className="h-8 w-12" />
            ))}
          </div>
        </div>
        <Skeleton className="h-[300px] md:h-[400px] w-full" />
      </GlassCard>

      {/* Stock Snapshot */}
      <GlassCard className="p-5 md:p-6">
        <Skeleton className="h-6 w-32 mb-5" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-4 rounded-xl bg-accent/30 space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Company Info */}
      <GlassCard className="p-5 md:p-6">
        <Skeleton className="h-6 w-48 mb-6" />
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl" />
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

export function AddOrderSkeleton() {
  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Skeleton className="h-6 w-20" />

      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Stock Preview Card */}
      <GlassCard className="p-5 md:p-6">
        <div className="flex items-start gap-4">
          <SkeletonCircle className="w-16 h-16 flex-shrink-0" />
          <div className="flex-1 space-y-3">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-4 w-48" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-6 w-20" />
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Form Skeleton */}
      <GlassCard className="p-5 md:p-6">
        <Skeleton className="h-6 w-32 mb-5" />
        <div className="space-y-5">
          {/* Order Type Toggle */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <div className="flex gap-2">
              <Skeleton className="h-12 flex-1" />
              <Skeleton className="h-12 flex-1" />
            </div>
          </div>

          {/* Form Fields */}
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-11 w-full" />
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <SkeletonButton className="flex-1" />
        <SkeletonButton className="w-24" />
      </div>
    </div>
  );
}

export function ProfileSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Profile Card */}
      <GlassCard className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-4">
            <SkeletonCircle className="w-32 h-32" />
            <Skeleton className="h-9 w-32" />
          </div>

          {/* Info */}
          <div className="flex-1 space-y-5">
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-40" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-5 w-48" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>
        </div>
      </GlassCard>

      {/* Broker List */}
      <GlassCard className="p-6">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-9 w-32" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-accent/30">
              <SkeletonCircle className="w-12 h-12" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <Skeleton className="w-8 h-8 rounded-lg" />
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Account Summary */}
      <GlassCard className="p-6">
        <Skeleton className="h-6 w-40 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-5 rounded-lg bg-accent/50 space-y-3">
              <div className="flex items-center gap-3">
                <SkeletonCircle className="w-10 h-10" />
                <Skeleton className="h-3 w-20" />
              </div>
              <Skeleton className="h-7 w-24" />
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}

export function PortfolioSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-4 w-64" />
      </div>

      {/* Tab Buttons */}
      <div className="flex gap-2">
        <Skeleton className="h-10 w-28" />
        <Skeleton className="h-10 w-24" />
      </div>

      {/* Order Cards */}
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <GlassCard key={i} className="p-5 md:p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <SkeletonCircle className="w-14 h-14 flex-shrink-0" />
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                    <Skeleton className="h-4 w-40" />
                  </div>
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((j) => (
                    <div key={j} className="space-y-1">
                      <Skeleton className="h-3 w-16" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
