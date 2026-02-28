# Global Search Feature Documentation

## Overview

The Stockplan dashboard includes a comprehensive global search feature with both desktop (Spotlight-style modal) and mobile (dedicated page) implementations. The search provides live filtering, recent search history, keyboard navigation, and smooth animations.

## Features

### 🔍 Live Search
- Real-time filtering as you type
- 300ms debounce on mobile to optimize performance
- Searches across:
  - Stock code
  - Company name
  - Sector

### 🕐 Recent Searches
- Last 10 searches stored locally
- Most recent appears first
- Automatic duplicate removal
- Easy one-click removal
- "Clear All" option
- Persists across sessions (localStorage)

### ⌨️ Keyboard Navigation (Desktop)
- **⌘+K / Ctrl+K**: Open search modal
- **ESC**: Close modal
- **↑/↓**: Navigate results
- **Enter**: Select highlighted result

### 🎨 Animations
- Smooth scale + fade modal entrance (250ms)
- Staggered result list animation (30ms per item on desktop, 50ms on mobile)
- Active state highlighting
- Smooth transitions

### 📱 Mobile-Optimized
- Full-screen dedicated search page
- Sticky header with search input
- Touch-friendly card layout
- Active press states
- Auto-focus on page load

## Components

### Desktop: Search Modal (`/src/app/components/search-modal.tsx`)

**Trigger Methods:**
1. Keyboard shortcut: `⌘+K` or `Ctrl+K`
2. Click "Search" button in navbar
3. Programmatically via `setIsSearchOpen(true)`

**Features:**
- Centered modal overlay with backdrop blur
- Soft glass card design
- Auto-focus on input
- Shows recent searches when empty
- Live search results with stock details
- Price and change percentage displayed
- Keyboard navigation with visual selection
- Footer hints for keyboard shortcuts

**Layout:**
- Width: max-w-2xl (medium)
- Max height: 60vh (scrollable)
- Backdrop: black/40 with blur
- Animation: Scale 95% → 100% + fade

### Mobile: Search Page (`/src/app/pages/search.tsx`)

**Access:**
- Click search icon in mobile navbar (top right)
- Navigate to `/search`

**Features:**
- Full-screen layout
- Sticky search header
- Back button navigation
- Debounced search (300ms)
- Loading indicator during debounce
- Card-based results layout
- Recent searches with remove option
- Active press animation on cards

**Layout:**
- Full height with bottom padding for nav
- Sticky header with blur
- Card list with 2px spacing
- Empty states for no results / no recent

## Hooks

### `useKeyboardShortcut`
Location: `/src/app/hooks/use-keyboard-shortcut.ts`

```tsx
useKeyboardShortcut('k', () => setIsSearchOpen(true), { metaKey: true });
```

**Options:**
- `metaKey`: Command (Mac) or Ctrl (Windows/Linux)
- `ctrlKey`: Ctrl key
- `shiftKey`: Shift key
- `enabled`: Boolean to enable/disable

### `useRecentSearches`
Location: `/src/app/hooks/use-recent-searches.ts`

```tsx
const {
  recentSearches,        // Array of recent search objects
  addRecentSearch,       // Add new search
  removeRecentSearch,    // Remove specific search
  clearRecentSearches,   // Clear all
} = useRecentSearches();
```

**Data Structure:**
```tsx
interface RecentSearch {
  id: string;
  code: string;
  name: string;
  timestamp: number;
}
```

**Storage:**
- localStorage key: `stockplan_recent_searches`
- Max items: 10
- Auto-deduplication

## Usage Examples

### Open Search Modal (Desktop)

```tsx
import { useState } from 'react';
import { SearchModal } from './components/search-modal';

function MyComponent() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsSearchOpen(true)}>
        Search
      </button>
      <SearchModal 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
      />
    </>
  );
}
```

### Navigate to Mobile Search Page

```tsx
import { useNavigate } from 'react-router';

function MobileNav() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/search')}>
      <Search className="w-5 h-5" />
    </button>
  );
}
```

## Design Details

### Desktop Modal
- **Background**: Glass card with blur
- **Border radius**: Medium (12px)
- **Shadow**: 2xl shadow for depth
- **Input**: Borderless, 16px font
- **Results**: 12px rounded cards
- **Hover**: Subtle background change
- **Selected**: Primary/10 background
- **Empty state**: Centered with icon

### Mobile Page
- **Header**: Sticky with blur backdrop
- **Search input**: Rounded (12px) with border
- **Cards**: Glass cards with 4px padding
- **Active state**: Scale 98% on press
- **Spacing**: 2px between cards
- **Icons**: 5x5 size in navbar

### Stock Result Display

**Desktop:**
- 12x12 logo circle
- Code (15px, bold)
- Name (13px, muted)
- Sector badge (11px)
- Price (15px, bold)
- Change % (12px, colored)

**Mobile:**
- 14x14 logo circle
- Code (16px, bold)
- Name (13px, muted, line-clamp-2)
- Sector badge (11px)
- Price section with label
- Change section with icon + %

## Empty States

### No Recent Searches
- Clock icon (8x8)
- "No recent searches" heading
- "Your recent searches will appear here" subtitle

### No Search Results
- Search icon (8x8 on desktop, 10x10 on mobile)
- "No stocks found" heading
- "Try searching by stock code or company name" subtitle

### Loading (Mobile only)
- Spinner animation
- "Searching..." text
- Shown while debouncing

## Performance Optimizations

1. **Debouncing (Mobile)**: 300ms delay before search
2. **Staggered animations**: Prevents janky simultaneous renders
3. **Auto-focus timing**: 100ms delay for smooth transition
4. **Max recent items**: Limited to 10 to prevent storage bloat
5. **LocalStorage caching**: Instant load of recent searches

## Accessibility

- Auto-focus on input (both desktop and mobile)
- Keyboard navigation (desktop)
- Clear visual feedback for selection
- Semantic HTML structure
- Screen reader friendly labels
- Touch-friendly targets (mobile)

## Future Enhancements

Optional features that can be added:

1. **Search Filters**
   - Filter by sector
   - Filter by stock type (ETF, Index, Stock)
   - Price range filter

2. **Enhanced Results**
   - Mini sparkline chart in results
   - "Add to watchlist" quick action
   - Last viewed timestamp

3. **Smart Search**
   - Fuzzy matching
   - Search suggestions
   - Popular searches
   - AI-powered queries ("bank stocks", "tech under $50")

4. **History Management**
   - Pin favorite searches
   - Export search history
   - Search analytics

## Browser Compatibility

- Modern browsers (Chrome, Firefox, Safari, Edge)
- localStorage support required
- Keyboard shortcuts work on Windows, Mac, and Linux
- Touch events for mobile Safari/Chrome
