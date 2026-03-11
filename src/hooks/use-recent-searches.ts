import { useState, useEffect } from 'react';

interface RecentSearch {
  id: string;
  code: string;
  name: string;
  timestamp: number;
}

const STORAGE_KEY = 'stockplan_recent_searches';
const MAX_RECENT = 10;

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setRecentSearches(parsed);
      }
    } catch (error) {
      console.error('Failed to load recent searches:', error);
    }
  }, []);

  // Save to localStorage whenever recentSearches changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(recentSearches));
    } catch (error) {
      console.error('Failed to save recent searches:', error);
    }
  }, [recentSearches]);

  const addRecentSearch = (search: Omit<RecentSearch, 'timestamp'>) => {
    setRecentSearches((prev) => {
      // Remove duplicate if exists
      const filtered = prev.filter((item) => item.id !== search.id);
      
      // Add new search at the beginning
      const updated = [
        { ...search, timestamp: Date.now() },
        ...filtered,
      ].slice(0, MAX_RECENT);

      return updated;
    });
  };

  const removeRecentSearch = (id: string) => {
    setRecentSearches((prev) => prev.filter((item) => item.id !== id));
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    recentSearches,
    addRecentSearch,
    removeRecentSearch,
    clearRecentSearches,
  };
}
