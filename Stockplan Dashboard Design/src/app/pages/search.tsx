import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Search, X, TrendingUp, TrendingDown, Clock } from 'lucide-react';
import { GlassCard } from '../components/glass-card';
import { Badge } from '../components/badge';
import { mockStocks } from '../lib/mock-data';
import { useRecentSearches } from '../hooks/use-recent-searches';
import { cn } from '../lib/utils';

export function SearchPage() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } = useRecentSearches();

  // Filter stocks based on query with debounce
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const filteredStocks = debouncedQuery.trim()
    ? mockStocks.filter(
        (stock) =>
          stock.code.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          stock.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          stock.sector.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
    : [];

  // Auto-focus input on mount
  useEffect(() => {
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  }, []);

  const handleStockSelect = (stock: typeof mockStocks[0]) => {
    addRecentSearch({
      id: stock.id,
      code: stock.code,
      name: stock.name,
    });
    navigate(`/stocks/${stock.id}`);
  };

  const showRecentSearches = !query.trim() && recentSearches.length > 0;
  const showSearchResults = query.trim() && filteredStocks.length > 0;
  const showEmptyResults = query.trim() && filteredStocks.length === 0;
  const showEmptyRecent = !query.trim() && recentSearches.length === 0;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 rounded-lg hover:bg-muted/30 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          
          <div className="flex-1 flex items-center gap-3 px-4 py-2.5 rounded-xl bg-muted/30 border border-border">
            <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stocks..."
              className="flex-1 bg-transparent border-none outline-none text-[16px] text-foreground placeholder:text-muted-foreground"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-lg hover:bg-muted/50 transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-4">
        {/* Recent Searches */}
        {showRecentSearches && (
          <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <h3 className="text-[16px] font-semibold text-foreground">
                  Recent Searches
                </h3>
              </div>
              <button
                onClick={clearRecentSearches}
                className="text-[13px] text-primary hover:underline font-medium"
              >
                Clear All
              </button>
            </div>

            <div className="space-y-2">
              {recentSearches.map((recent) => {
                const stock = mockStocks.find(s => s.id === recent.id);
                if (!stock) return null;

                return (
                  <GlassCard
                    key={recent.id}
                    className="p-4 active:scale-[0.98] transition-transform cursor-pointer"
                    onClick={() => handleStockSelect(stock)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[16px] font-bold text-primary">
                          {stock.code.substring(0, 2)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-[15px] font-semibold text-foreground mb-0.5">
                          {stock.code}
                        </p>
                        <p className="text-[13px] text-muted-foreground truncate">
                          {stock.name}
                        </p>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removeRecentSearch(recent.id);
                        }}
                        className="p-2 rounded-lg hover:bg-muted/30 transition-colors"
                      >
                        <X className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        )}

        {/* Search Results */}
        {showSearchResults && (
          <div className="animate-fade-in">
            <div className="mb-4">
              <h3 className="text-[16px] font-semibold text-foreground">
                {filteredStocks.length} {filteredStocks.length === 1 ? 'Result' : 'Results'}
              </h3>
            </div>

            <div className="space-y-2">
              {filteredStocks.map((stock, index) => {
                const isPositive = stock.change >= 0;

                return (
                  <GlassCard
                    key={stock.id}
                    className="p-4 active:scale-[0.98] transition-transform cursor-pointer"
                    onClick={() => handleStockSelect(stock)}
                    style={{
                      animation: `fadeIn 200ms ease-out ${index * 50}ms backwards`,
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[18px] font-bold text-primary">
                          {stock.code.substring(0, 2)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="text-[16px] font-bold text-foreground">
                            {stock.code}
                          </p>
                          <Badge variant="secondary" className="text-[11px] px-2 py-0">
                            {stock.sector}
                          </Badge>
                        </div>
                        <p className="text-[13px] text-muted-foreground mb-3 line-clamp-2">
                          {stock.name}
                        </p>
                        <div className="flex items-center gap-4">
                          <div>
                            <p className="text-[12px] text-muted-foreground mb-0.5">
                              Last Price
                            </p>
                            <p className="text-[18px] font-bold text-foreground">
                              ${stock.price.toFixed(2)}
                            </p>
                          </div>
                          <div>
                            <p className="text-[12px] text-muted-foreground mb-0.5">
                              Change
                            </p>
                            <div className={cn(
                              'flex items-center gap-1 text-[16px] font-bold',
                              isPositive ? 'text-success' : 'text-destructive'
                            )}>
                              {isPositive ? (
                                <TrendingUp className="w-4 h-4" />
                              ) : (
                                <TrendingDown className="w-4 h-4" />
                              )}
                              {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        )}

        {/* Empty Results */}
        {showEmptyResults && (
          <div className="py-16 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-[18px] font-semibold text-foreground mb-2">
              No stocks found
            </h3>
            <p className="text-[14px] text-muted-foreground max-w-xs mx-auto">
              Try searching by stock code or company name
            </p>
          </div>
        )}

        {/* Empty Recent Searches */}
        {showEmptyRecent && (
          <div className="py-16 text-center animate-fade-in">
            <div className="w-20 h-20 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4">
              <Clock className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-[18px] font-semibold text-foreground mb-2">
              No recent searches
            </h3>
            <p className="text-[14px] text-muted-foreground max-w-xs mx-auto">
              Your recent searches will appear here
            </p>
          </div>
        )}

        {/* Loading State (while debouncing) */}
        {query.trim() && query !== debouncedQuery && (
          <div className="py-8 text-center">
            <div className="inline-flex items-center gap-2 text-[14px] text-muted-foreground">
              <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              Searching...
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
