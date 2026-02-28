import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { GlassCard } from '../components/glass-card';
import { Badge } from '../components/badge';
import { Star, X, TrendingUp, TrendingDown } from 'lucide-react';
import { mockStocks } from '../lib/mock-data';
import { toast } from 'sonner';

export function Bookmarks() {
  const navigate = useNavigate();
  const [bookmarkedStocks, setBookmarkedStocks] = useState<string[]>([]);

  // Load bookmarks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('stockplan_bookmarks');
    if (saved) {
      try {
        setBookmarkedStocks(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load bookmarks');
      }
    }
  }, []);

  // Remove bookmark
  const removeBookmark = (stockId: string, stockCode: string) => {
    const newBookmarks = bookmarkedStocks.filter(id => id !== stockId);
    setBookmarkedStocks(newBookmarks);
    localStorage.setItem('stockplan_bookmarks', JSON.stringify(newBookmarks));
    toast.info(`${stockCode} removed from bookmarks`);
  };

  // Get bookmarked stocks
  const bookmarkedStocksList = mockStocks.filter(s => bookmarkedStocks.includes(s.id));

  // Calculate total performance
  const totalGainersCount = bookmarkedStocksList.filter(s => s.changePercent > 0).length;
  const totalLosersCount = bookmarkedStocksList.filter(s => s.changePercent < 0).length;
  const avgChange = bookmarkedStocksList.length > 0
    ? bookmarkedStocksList.reduce((sum, s) => sum + s.changePercent, 0) / bookmarkedStocksList.length
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-[24px] md:text-[32px] font-bold text-foreground mb-2 flex items-center gap-3">
          <Star className="w-7 h-7 md:w-8 md:h-8 fill-primary text-primary" />
          Bookmarked Stocks
        </h1>
        <p className="text-[14px] text-muted-foreground">
          {bookmarkedStocksList.length > 0
            ? `Track your ${bookmarkedStocksList.length} bookmarked ${bookmarkedStocksList.length === 1 ? 'stock' : 'stocks'}`
            : 'You haven\'t bookmarked any stocks yet'}
        </p>
      </div>

      {/* Performance Summary */}
      {bookmarkedStocksList.length > 0 && (
        <div className="grid grid-cols-3 gap-3 md:gap-4">
          <GlassCard className="p-4">
            <p className="text-[11px] md:text-[12px] text-muted-foreground mb-1">
              Total
            </p>
            <p className="text-[20px] md:text-[24px] font-bold text-foreground">
              {bookmarkedStocksList.length}
            </p>
            <p className="text-[11px] text-muted-foreground mt-0.5">
              stocks
            </p>
          </GlassCard>

          <GlassCard className="p-4">
            <p className="text-[11px] md:text-[12px] text-muted-foreground mb-1">
              Gainers
            </p>
            <p className="text-[20px] md:text-[24px] font-bold text-success">
              {totalGainersCount}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <TrendingUp className="w-3 h-3 text-success" />
              <p className="text-[11px] text-muted-foreground">up</p>
            </div>
          </GlassCard>

          <GlassCard className="p-4">
            <p className="text-[11px] md:text-[12px] text-muted-foreground mb-1">
              Losers
            </p>
            <p className="text-[20px] md:text-[24px] font-bold text-destructive">
              {totalLosersCount}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <TrendingDown className="w-3 h-3 text-destructive" />
              <p className="text-[11px] text-muted-foreground">down</p>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Bookmarked Stocks List */}
      {bookmarkedStocksList.length > 0 ? (
        <div className="space-y-3">
          {bookmarkedStocksList.map((stock) => {
            const isPositive = stock.changePercent >= 0;
            const volume = (Math.random() * 5 + 0.5).toFixed(1);
            const marketCap = (stock.price * 1000 / 1000).toFixed(1);

            return (
              <GlassCard
                key={stock.id}
                className={`p-4 md:p-5 cursor-pointer transition-all group ${
                  isPositive ? 'hover:bg-success/5' : 'hover:bg-destructive/5'
                }`}
                onClick={() => navigate(`/stocks/${stock.id}`)}
              >
                <div className="flex items-center gap-4">
                  {/* Stock Logo */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                    <span className="text-[16px] font-bold text-primary">
                      {stock.code.substring(0, 2)}
                    </span>
                  </div>

                  {/* Stock Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0 flex-1">
                        <h3 className="text-[16px] font-bold text-foreground mb-0.5">
                          {stock.code}
                        </h3>
                        <p className="text-[13px] text-muted-foreground truncate mb-1.5">
                          {stock.name}
                        </p>
                        <div className="flex items-center gap-3 flex-wrap">
                          <Badge variant="secondary" size="sm">
                            {stock.subSector}
                          </Badge>
                          <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                            <span>Vol: {volume}B</span>
                            <span>•</span>
                            <span>Cap: ${marketCap}T</span>
                          </div>
                        </div>
                      </div>

                      {/* Price Info and Remove Button */}
                      <div className="flex items-start gap-3 flex-shrink-0">
                        <div className="text-right">
                          <p className="text-[18px] md:text-[20px] font-bold text-foreground mb-1">
                            ${stock.price.toFixed(2)}
                          </p>
                          <div className={`flex items-center justify-end gap-1.5 text-[14px] font-bold ${
                            isPositive ? 'text-success' : 'text-destructive'
                          }`}>
                            <span>{isPositive ? '▲' : '▼'}</span>
                            <span>{isPositive ? '+' : ''}${Math.abs(stock.change).toFixed(2)}</span>
                          </div>
                          <div className={`text-[13px] font-semibold mt-0.5 ${
                            isPositive ? 'text-success' : 'text-destructive'
                          }`}>
                            {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                          </div>
                        </div>

                        {/* Remove Bookmark Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            removeBookmark(stock.id, stock.code);
                          }}
                          className="p-2 rounded-lg hover:bg-destructive/10 transition-all active:scale-95 opacity-70 group-hover:opacity-100"
                        >
                          <X className="w-5 h-5 text-muted-foreground hover:text-destructive" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      ) : (
        // Empty State
        <GlassCard className="p-12 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center">
              <Star className="w-8 h-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="text-[18px] font-semibold text-foreground mb-2">
                No bookmarks yet
              </h3>
              <p className="text-[14px] text-muted-foreground mb-4">
                Start bookmarking stocks from the Market page to track them here
              </p>
              <button
                onClick={() => navigate('/market?tab=stocks')}
                className="px-6 py-2.5 rounded-[10px] bg-primary text-primary-foreground text-[14px] font-medium hover:opacity-90 transition-all active:scale-95"
              >
                Browse Stocks
              </button>
            </div>
          </div>
        </GlassCard>
      )}
    </div>
  );
}
