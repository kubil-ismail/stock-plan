import { useState, useEffect, useRef, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router';
import { Search, X, TrendingUp, TrendingDown, Clock, Command } from 'lucide-react';
import { GlassCard } from './glass-card';
import { Badge } from './badge';
import { mockStocks } from '../lib/mock-data';
import { useRecentSearches } from '../hooks/use-recent-searches';
import { cn } from '../lib/utils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { recentSearches, addRecentSearch, removeRecentSearch, clearRecentSearches } = useRecentSearches();

  // Filter stocks based on query
  const filteredStocks = query.trim()
    ? mockStocks.filter(
        (stock) =>
          stock.code.toLowerCase().includes(query.toLowerCase()) ||
          stock.name.toLowerCase().includes(query.toLowerCase()) ||
          stock.sector.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  // Show either search results or recent searches
  const displayItems = query.trim() ? filteredStocks : recentSearches.map(r => 
    mockStocks.find(s => s.id === r.id)
  ).filter(Boolean);

  // Auto-focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle ESC key to close
  useEffect(() => {
    const handleEsc = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (displayItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % displayItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + displayItems.length) % displayItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selectedStock = displayItems[selectedIndex];
      if (selectedStock) {
        handleStockSelect(selectedStock);
      }
    }
  };

  const handleStockSelect = (stock: typeof mockStocks[0]) => {
    addRecentSearch({
      id: stock.id,
      code: stock.code,
      name: stock.name,
    });
    navigate(`/stocks/${stock.id}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4 pointer-events-none">
        <div
          className="w-full max-w-2xl pointer-events-auto animate-fade-in-up"
          style={{
            animation: 'fadeInScale 250ms ease-out forwards',
          }}
        >
          <div className="bg-white rounded-[20px] p-0 overflow-hidden shadow-2xl">
            {/* Search Input */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
              <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
                placeholder="Search stocks..."
                className="flex-1 bg-transparent border-none outline-none text-[16px] text-foreground placeholder:text-muted-foreground"
              />
              <kbd className="hidden md:flex items-center gap-1 px-2 py-1 rounded-md bg-muted/30 text-[11px] text-muted-foreground font-medium">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto">
              {/* Recent Searches (when no query) */}
              {!query.trim() && recentSearches.length > 0 && (
                <div className="p-3">
                  <div className="flex items-center justify-between px-3 py-2 mb-2">
                    <div className="flex items-center gap-2 text-[13px] font-medium text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      Recent Searches
                    </div>
                    <button
                      onClick={clearRecentSearches}
                      className="text-[12px] text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="space-y-1">
                    {recentSearches.map((recent, index) => {
                      const stock = mockStocks.find(s => s.id === recent.id);
                      if (!stock) return null;
                      
                      return (
                        <div
                          key={recent.id}
                          className={cn(
                            'flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all group',
                            selectedIndex === index
                              ? 'bg-primary/10'
                              : 'hover:bg-muted/30'
                          )}
                          onClick={() => handleStockSelect(stock)}
                        >
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[14px] font-bold text-primary">
                              {stock.code.substring(0, 2)}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[14px] font-semibold text-foreground">
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
                            className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-muted/50 transition-all"
                          >
                            <X className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Search Results */}
              {query.trim() && (
                <div className="p-3">
                  {filteredStocks.length > 0 ? (
                    <>
                      <div className="px-3 py-2 mb-2">
                        <p className="text-[13px] font-medium text-muted-foreground">
                          Stocks · {filteredStocks.length} {filteredStocks.length === 1 ? 'result' : 'results'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        {filteredStocks.map((stock, index) => {
                          const isPositive = stock.change >= 0;
                          
                          return (
                            <div
                              key={stock.id}
                              className={cn(
                                'flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all',
                                selectedIndex === index
                                  ? 'bg-primary/10'
                                  : 'hover:bg-muted/30'
                              )}
                              onClick={() => handleStockSelect(stock)}
                              style={{
                                animation: `fadeIn 200ms ease-out ${index * 30}ms backwards`,
                              }}
                            >
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                                <span className="text-[16px] font-bold text-primary">
                                  {stock.code.substring(0, 2)}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1">
                                  <p className="text-[15px] font-bold text-foreground">
                                    {stock.code}
                                  </p>
                                  <Badge variant="secondary" className="text-[11px] px-2 py-0">
                                    {stock.sector}
                                  </Badge>
                                </div>
                                <p className="text-[13px] text-muted-foreground truncate">
                                  {stock.name}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="text-[15px] font-bold text-foreground mb-0.5">
                                  ${stock.price.toFixed(2)}
                                </p>
                                <div className={cn(
                                  'flex items-center gap-1 text-[12px] font-medium',
                                  isPositive ? 'text-success' : 'text-destructive'
                                )}>
                                  {isPositive ? (
                                    <TrendingUp className="w-3 h-3" />
                                  ) : (
                                    <TrendingDown className="w-3 h-3" />
                                  )}
                                  {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  ) : (
                    <div className="py-12 text-center">
                      <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-muted-foreground" />
                      </div>
                      <p className="text-[16px] font-medium text-foreground mb-1">
                        No stocks found
                      </p>
                      <p className="text-[14px] text-muted-foreground">
                        Try searching by stock code or company name
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Empty State (no recent searches) */}
              {!query.trim() && recentSearches.length === 0 && (
                <div className="py-12 text-center px-4">
                  <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-[16px] font-medium text-foreground mb-1">
                    No recent searches
                  </p>
                  <p className="text-[14px] text-muted-foreground">
                    Start searching for stocks to see them here
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {displayItems.length > 0 && (
              <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-muted/20">
                <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded bg-muted/50 font-medium">↑↓</kbd>
                    <span>Navigate</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <kbd className="px-1.5 py-0.5 rounded bg-muted/50 font-medium">↵</kbd>
                    <span>Select</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
                  <kbd className="px-1.5 py-0.5 rounded bg-muted/50 font-medium">ESC</kbd>
                  <span>Close</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
    </>
  );
}