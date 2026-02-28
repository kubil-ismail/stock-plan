# Global Loading System Documentation

## Overview

The Stockplan dashboard includes a comprehensive loading system with skeleton screens and smooth entry animations. This system provides a premium feel with subtle animations and smart loading states.

## Core Components

### 1. Skeleton Components (`/src/app/components/skeleton.tsx`)

Base skeleton components with shimmer animation:

```tsx
import { Skeleton, SkeletonCircle, SkeletonText, SkeletonButton, SkeletonCard } from './components/skeleton';

// Basic rectangle skeleton
<Skeleton className="h-10 w-40" />

// Circle skeleton (for avatars, logos)
<SkeletonCircle className="w-16 h-16" />

// Text skeleton
<SkeletonText className="w-full" />

// Button skeleton
<SkeletonButton />

// Card skeleton
<SkeletonCard />
```

### 2. Page Skeletons (`/src/app/components/page-skeletons.tsx`)

Pre-built skeleton layouts for each major page:

- `DashboardSkeleton`
- `StockDetailSkeleton`
- `AddOrderSkeleton`
- `ProfileSkeleton`
- `PortfolioSkeleton`

### 3. Loading Wrapper (`/src/app/components/loading-wrapper.tsx`)

Handles transition between skeleton and content:

```tsx
import { LoadingWrapper } from './components/loading-wrapper';
import { DashboardSkeleton } from './components/page-skeletons';

<LoadingWrapper
  isLoading={isLoading}
  skeleton={<DashboardSkeleton />}
  delay={400} // Minimum loading time to avoid flicker
>
  <YourContent />
</LoadingWrapper>
```

### 4. Animated Number (`/src/app/components/loading-wrapper.tsx`)

Count-up animation for numbers:

```tsx
import { AnimatedNumber } from './components/loading-wrapper';

<AnimatedNumber
  value={52890}
  duration={600}
  decimals={0}
  prefix="$"
/>
```

### 5. Loading Hooks (`/src/app/hooks/use-loading.ts`)

```tsx
import { useSimulatedLoading, useProgressiveLoading } from './hooks/use-loading';

// Simple loading state
const isLoading = useSimulatedLoading(1200);

// Progressive loading for multiple sections
const [heroLoaded, dataLoaded, infoLoaded] = useProgressiveLoading([500, 1000, 1500]);
```

## Usage Example

### Basic Page with Loading

```tsx
import { useSimulatedLoading } from '../hooks/use-loading';
import { LoadingWrapper } from '../components/loading-wrapper';
import { DashboardSkeleton } from '../components/page-skeletons';

export function Dashboard() {
  const isLoading = useSimulatedLoading(1000);

  return (
    <LoadingWrapper
      isLoading={isLoading}
      skeleton={<DashboardSkeleton />}
    >
      <div className="space-y-6">
        {/* Your actual content */}
      </div>
    </LoadingWrapper>
  );
}
```

### Progressive/Lazy Loading

```tsx
import { useProgressiveLoading } from '../hooks/use-loading';

export function StockDetail() {
  const [heroLoaded, allocationLoaded, companyInfoLoaded] = useProgressiveLoading([
    500,   // Hero loads first
    1000,  // Allocation loads after 1s
    1500   // Company info loads after 1.5s
  ]);

  return (
    <div className="space-y-6">
      {/* Hero Section */}
      {!heroLoaded ? (
        <SkeletonHero />
      ) : (
        <div className="animate-fade-in-up">
          <HeroSection />
        </div>
      )}

      {/* Allocation Section */}
      {!allocationLoaded ? (
        <SkeletonAllocation />
      ) : (
        <div className="animate-fade-in-up">
          <AllocationSection />
        </div>
      )}

      {/* Company Info Section */}
      {!companyInfoLoaded ? (
        <SkeletonCompanyInfo />
      ) : (
        <div className="animate-fade-in-up">
          <CompanyInfo />
        </div>
      )}
    </div>
  );
}
```

### With Animated Numbers

```tsx
import { AnimatedNumber } from '../components/loading-wrapper';

<div className="text-right">
  <p className="text-[12px] text-muted-foreground mb-0.5">Portfolio Value</p>
  <p className="text-[24px] font-bold text-foreground">
    <AnimatedNumber value={52890} prefix="$" decimals={0} />
  </p>
</div>
```

## Animations

### CSS Animations (in `/src/styles/theme.css`)

1. **Shimmer** - Left to right shimmer effect on skeletons (1.5s loop)
2. **Fade In Up** - Content entrance animation (350ms, 8px upward slide)
3. **Fade In** - Simple fade entrance (300ms)

### Usage

```tsx
// Fade in with upward slide
<div className="animate-fade-in-up">
  <Content />
</div>

// Simple fade in
<div className="animate-fade-in">
  <Content />
</div>
```

## Design System

### Skeleton Style
- Background: `bg-muted/40` (soft neutral gray)
- Border radius: `rounded-[12px]` (medium)
- Shimmer: Subtle white gradient overlay
- Duration: 1.5s ease-in-out infinite

### Entry Animation
- Opacity: 0 → 1
- Transform: translateY(8px) → translateY(0)
- Duration: 350ms
- Easing: ease-out

### Minimum Delay
- Default: 400ms
- Prevents flicker on fast connections
- Ensures smooth experience

## Mobile Behavior

- Skeleton blocks are full width on mobile
- Larger tap-area placeholders
- Sticky header remains visible during load
- Bottom navigation stays visible
- Floating Action Button shows as disabled during load

## Best Practices

1. **Always use LoadingWrapper** for automatic transitions
2. **Set appropriate delays** (400-600ms minimum)
3. **Match skeleton to content** structure closely
4. **Use progressive loading** for complex pages
5. **Animate numbers** for financial data
6. **Avoid aggressive animations** - keep it subtle and premium
7. **Test on slow connections** to ensure good UX

## Premium Details

- Shimmer animates only once on fast connections
- Minimum 400ms delay prevents flicker
- Numbers count up smoothly (ease-out cubic)
- Fade transitions are gentle (300-350ms)
- Skeleton matches exact content layout

## Notes

- All animations use `requestAnimationFrame` for smooth 60fps
- Shimmer uses CSS transforms (GPU accelerated)
- Loading states are managed with React hooks
- Minimum delays prevent jarring instant loads
