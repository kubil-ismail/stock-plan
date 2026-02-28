import { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { GlassCard } from '../components/glass-card';
import { Badge } from '../components/badge';
import { BottomSheet, BottomSheetOption } from '../components/bottom-sheet';
import { TrendingUp, TrendingDown, BarChart3, ArrowUpDown, Search, Star, X, Building2, Cpu, Zap, ShoppingBag, Landmark, Activity } from 'lucide-react';
import { mockIndexes, mockSectors, mockStocks } from '../lib/mock-data';
import { toast } from 'sonner';

type StockFilter = 'all' | 'gainers' | 'losers' | 'active' | 'bookmark';
type SortOption = 'price-asc' | 'price-desc' | 'change-asc' | 'change-desc' | 'volume-asc' | 'volume-desc';

// Sector icon mapping
const sectorIcons: Record<string, any> = {
  'Technology': Cpu,
  'Banking': Landmark,
  'Energy': Zap,
  'Consumer': ShoppingBag,
  'Infrastructure': Building2,
  'Finance': Landmark,
  'Basic Materials': Building2,
  'Healthcare': Activity,
  'Telecommunications': Activity,
  'default': BarChart3,
};

export function Market() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab');
  const filterParam = searchParams.get('filter');
  
  const [activeTab, setActiveTab] = useState<'indexes' | 'sectors' | 'stocks'>(
    (tabParam as any) || 'indexes'
  );
  const [stockFilter, setStockFilter] = useState<StockFilter>(
    (filterParam as StockFilter) || 'all'
  );
  const [sortBy, setSortBy] = useState<SortOption>('price-desc');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [searchCode, setSearchCode] = useState('');
  const [bookmarkedStocks, setBookmarkedStocks] = useState<string[]>([]);

  // Update tab/filter from URL params
  useEffect(() => {
    if (tabParam) setActiveTab(tabParam as any);
    if (filterParam) setStockFilter(filterParam as StockFilter);
  }, [tabParam, filterParam]);

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

  // Save bookmarks to localStorage
  const toggleBookmark = (stockId: string, stockCode: string) => {
    setBookmarkedStocks((prev) => {
      const newBookmarks = prev.includes(stockId)
        ? prev.filter(id => id !== stockId)
        : [...prev, stockId];
      
      localStorage.setItem('stockplan_bookmarks', JSON.stringify(newBookmarks));
      
      // Show toast
      if (newBookmarks.includes(stockId)) {
        toast.success(`${stockCode} added to bookmarks`);
      } else {
        toast.info(`${stockCode} removed from bookmarks`);
      }
      
      return newBookmarks;
    });
  };

  // Calculate sector performance
  const topSectors = mockSectors.slice(0, 6);

  // Filter and sort stocks
  const filteredAndSortedStocks = useMemo(() => {
    let filtered = [...mockStocks];

    // Apply search filter by code
    if (searchCode) {
      const searchUpper = searchCode.toUpperCase();
      filtered = filtered.filter(s => s.code.toUpperCase().includes(searchUpper))
    }

    // Helper function to parse volume string to number
    const parseVolume = (volumeStr: string): number => {
      const value = parseFloat(volumeStr);
      if (volumeStr.includes('M')) return value * 1000000;
      if (volumeStr.includes('B')) return value * 1000000000;
      return value;
    };

    // Apply tab filter and sorting
    switch (stockFilter) {
      case 'gainers':
        filtered = filtered.filter(s => s.changePercent > 0);
        // Apply sorting for gainers tab
        switch (sortBy) {
          case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'change-asc':
            filtered.sort((a, b) => a.changePercent - b.changePercent);
            break;
          case 'change-desc':
            filtered.sort((a, b) => b.changePercent - a.changePercent);
            break;
          case 'volume-asc':
            filtered.sort((a, b) => parseVolume(a.volume) - parseVolume(b.volume));
            break;
          case 'volume-desc':
            filtered.sort((a, b) => parseVolume(b.volume) - parseVolume(a.volume));
            break;
        }
        break;
      case 'losers':
        filtered = filtered.filter(s => s.changePercent < 0);
        // Apply sorting for losers tab
        switch (sortBy) {
          case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'change-asc':
            filtered.sort((a, b) => a.changePercent - b.changePercent);
            break;
          case 'change-desc':
            filtered.sort((a, b) => b.changePercent - a.changePercent);
            break;
          case 'volume-asc':
            filtered.sort((a, b) => parseVolume(a.volume) - parseVolume(b.volume));
            break;
          case 'volume-desc':
            filtered.sort((a, b) => parseVolume(b.volume) - parseVolume(a.volume));
            break;
        }
        break;
      case 'active':
        // Apply sorting for most active tab
        switch (sortBy) {
          case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'change-asc':
            filtered.sort((a, b) => a.changePercent - b.changePercent);
            break;
          case 'change-desc':
            filtered.sort((a, b) => b.changePercent - a.changePercent);
            break;
          case 'volume-asc':
            filtered.sort((a, b) => parseVolume(a.volume) - parseVolume(b.volume));
            break;
          case 'volume-desc':
          default:
            filtered.sort((a, b) => parseVolume(b.volume) - parseVolume(a.volume));
            break;
        }
        break;
      case 'bookmark':
        filtered = filtered.filter(s => bookmarkedStocks.includes(s.id));
        // Apply sorting for bookmark tab
        switch (sortBy) {
          case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'change-asc':
            filtered.sort((a, b) => a.changePercent - b.changePercent);
            break;
          case 'change-desc':
            filtered.sort((a, b) => b.changePercent - a.changePercent);
            break;
          case 'volume-asc':
            filtered.sort((a, b) => parseVolume(a.volume) - parseVolume(b.volume));
            break;
          case 'volume-desc':
            filtered.sort((a, b) => parseVolume(b.volume) - parseVolume(a.volume));
            break;
        }
        break;
      case 'all':
      default:
        // Apply sorting for all tab
        switch (sortBy) {
          case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
          case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
          case 'change-asc':
            filtered.sort((a, b) => a.changePercent - b.changePercent);
            break;
          case 'change-desc':
            filtered.sort((a, b) => b.changePercent - a.changePercent);
            break;
          case 'volume-asc':
            filtered.sort((a, b) => parseVolume(a.volume) - parseVolume(b.volume));
            break;
          case 'volume-desc':
            filtered.sort((a, b) => parseVolume(b.volume) - parseVolume(a.volume));
            break;
          default:
            filtered.sort((a, b) => b.changePercent - a.changePercent);
            break;
        }
        break;
    }

    return filtered.slice(0, 50); // Show first 50 stocks
  }, [stockFilter, sortBy, searchCode, bookmarkedStocks]);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-[24px] md:text-[32px] font-bold text-foreground mb-2">
          Market Overview
        </h1>
        <p className="text-[14px] text-muted-foreground">
          Track market indexes, sector performance, and browse stocks
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0">
        <button
          onClick={() => setActiveTab('indexes')}
          className={`px-5 py-2.5 rounded-[10px] text-[14px] font-medium transition-all whitespace-nowrap ${
            activeTab === 'indexes'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
          }`}
        >
          Market Indexes
        </button>
        <button
          onClick={() => setActiveTab('sectors')}
          className={`px-5 py-2.5 rounded-[10px] text-[14px] font-medium transition-all whitespace-nowrap ${
            activeTab === 'sectors'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
          }`}
        >
          Sectors
        </button>
        <button
          onClick={() => setActiveTab('stocks')}
          className={`px-5 py-2.5 rounded-[10px] text-[14px] font-medium transition-all whitespace-nowrap ${
            activeTab === 'stocks'
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
          }`}
        >
          Stocks
          {bookmarkedStocks.length > 0 && (
            <span className="ml-2 px-2 py-0.5 rounded-full bg-primary-foreground/20 text-[11px] font-bold">
              {bookmarkedStocks.length}
            </span>
          )}
        </button>
      </div>

      {/* Market Indexes Section */}
      {activeTab === 'indexes' && (
        <div className="space-y-6 animate-fade-in">
          {/* Market Indexes Grid */}
          <div>
            <h2 className="text-[20px] font-semibold text-foreground mb-4">
              Market Indexes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mockIndexes.map((index) => {
                const isPositive = index.change >= 0;
                return (
                  <GlassCard
                    key={index.id}
                    className={`p-5 cursor-pointer transition-all ${
                      isPositive ? 'hover:bg-success/5' : 'hover:bg-destructive/5'
                    }`}
                    onClick={() => navigate(`/indexes/${index.id}`)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-[16px] font-bold text-foreground">
                          {index.name}
                        </p>
                        <p className="text-[13px] text-muted-foreground">
                          {index.code}
                        </p>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <BarChart3 className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    
                    <p className="text-[32px] font-bold text-foreground mb-3">
                      {index.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </p>
                    
                    <div className="flex items-center gap-4">
                      <div className={`flex items-center gap-1.5 text-[18px] font-bold ${
                        isPositive ? 'text-success' : 'text-destructive'
                      }`}>
                        <span>{isPositive ? '▲' : '▼'}</span>
                        <span>{isPositive ? '+' : ''}{index.changePercent.toFixed(2)}%</span>
                      </div>
                      <div className={`text-[15px] font-medium ${
                        isPositive ? 'text-success' : 'text-destructive'
                      }`}>
                        {isPositive ? '+' : ''}{index.change.toFixed(2)}
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>

          {/* Index Performance Summary */}
          <GlassCard className="p-6">
            <h3 className="text-[18px] font-semibold text-foreground mb-4">
              Today's Market Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-success/10">
                <p className="text-[12px] text-muted-foreground mb-1">
                  Advancing
                </p>
                <p className="text-[24px] font-bold text-success">342</p>
                <p className="text-[12px] text-muted-foreground mt-1">stocks</p>
              </div>
              <div className="p-4 rounded-xl bg-destructive/10">
                <p className="text-[12px] text-muted-foreground mb-1">
                  Declining
                </p>
                <p className="text-[24px] font-bold text-destructive">186</p>
                <p className="text-[12px] text-muted-foreground mt-1">stocks</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/20">
                <p className="text-[12px] text-muted-foreground mb-1">
                  Unchanged
                </p>
                <p className="text-[24px] font-bold text-foreground">42</p>
                <p className="text-[12px] text-muted-foreground mt-1">stocks</p>
              </div>
              <div className="p-4 rounded-xl bg-primary/10">
                <p className="text-[12px] text-muted-foreground mb-1">
                  Volume
                </p>
                <p className="text-[20px] font-bold text-primary">8.2B</p>
                <p className="text-[12px] text-muted-foreground mt-1">shares</p>
              </div>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Sectors Section */}
      {activeTab === 'sectors' && (
        <div className="space-y-6 animate-fade-in">
          {/* Top Sectors */}
          <div>
            <h2 className="text-[20px] font-semibold text-foreground mb-4">
              Top Sectors
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topSectors.map((sector) => {
                const isPositive = sector.changePercent >= 0;
                const advancingCount = Math.floor(Math.random() * 15) + 5;
                const decliningCount = Math.floor(Math.random() * 10) + 2;
                
                return (
                  <GlassCard
                    key={sector.id}
                    className={`p-5 cursor-pointer transition-all ${
                      isPositive ? 'hover:bg-success/5' : 'hover:bg-destructive/5'
                    }`}
                    onClick={() => navigate(`/sectors/${sector.id}`)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <p className="text-[16px] font-bold text-foreground mb-1">
                          {sector.name}
                        </p>
                        <p className="text-[13px] text-muted-foreground">
                          {sector.stockCount} stocks
                        </p>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className={`text-[28px] font-bold ${
                        isPositive ? 'text-success' : 'text-destructive'
                      }`}>
                        <span>{isPositive ? '▲' : '▼'}</span>
                        <span className="ml-1">
                          {isPositive ? '+' : ''}{sector.changePercent.toFixed(2)}%
                        </span>
                      </div>
                      <p className="text-[13px] text-muted-foreground mt-1">
                        Average change
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-4 pt-3 border-t border-border">
                      <div className="flex items-center gap-1.5 text-[13px]">
                        <span className="text-success font-bold">{advancingCount}</span>
                        <TrendingUp className="w-3.5 h-3.5 text-success" />
                      </div>
                      <div className="flex items-center gap-1.5 text-[13px]">
                        <span className="text-destructive font-bold">{decliningCount}</span>
                        <TrendingDown className="w-3.5 h-3.5 text-destructive" />
                      </div>
                      <div className="ml-auto">
                        <Badge variant={isPositive ? 'default' : 'destructive'} size="sm">
                          {isPositive ? 'Leading' : 'Lagging'}
                        </Badge>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>

          {/* All Sectors List */}
          <div>
            <h2 className="text-[20px] font-semibold text-foreground mb-4">
              All Sectors
            </h2>
            <div className="space-y-3">
              {mockSectors.map((sector) => {
                const isPositive = sector.changePercent >= 0;
                const Icon = sectorIcons[sector.name] || sectorIcons['default'];
                
                return (
                  <GlassCard
                    key={sector.id}
                    className={`p-5 cursor-pointer transition-all ${
                      isPositive ? 'hover:bg-success/5' : 'hover:bg-destructive/5'
                    }`}
                    onClick={() => navigate(`/sectors/${sector.id}`)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <h3 className="text-[16px] font-bold text-foreground">
                              {sector.name}
                            </h3>
                            <p className="text-[13px] text-muted-foreground">
                              {sector.stockCount} stocks
                            </p>
                          </div>
                          
                          <div className="text-right">
                            <div className={`text-[20px] font-bold ${
                              isPositive ? 'text-success' : 'text-destructive'
                            }`}>
                              <span>{isPositive ? '▲' : '▼'}</span>
                              <span className="ml-1">
                                {isPositive ? '+' : ''}{(sector.changePercent ?? 0).toFixed(2)}%
                              </span>
                            </div>
                            <p className="text-[12px] text-muted-foreground mt-0.5">
                              Market cap: ${((sector.marketCap ?? 0) / 1000000000).toFixed(1)}B
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Stocks Section */}
      {activeTab === 'stocks' && (
        <div className="space-y-6 animate-fade-in">
          {/* Search and Controls */}
          <div className="space-y-4">
            {/* Search Input - Full width on mobile */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1 md:max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Filter by stock code (e.g. BBCA)"
                  value={searchCode}
                  onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                  className="w-full pl-10 pr-10 py-2.5 rounded-[10px] bg-muted/30 border border-border text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
                {searchCode && (
                  <button
                    onClick={() => setSearchCode('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* Show Bookmarked Only Toggle */}
                {bookmarkedStocks.length > 0 && (
                  <button
                    onClick={() => setStockFilter('bookmark')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-[10px] text-[13px] font-medium transition-all whitespace-nowrap ${
                      stockFilter === 'bookmark'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                    }`}
                  >
                    <Star className={`w-4 h-4 ${stockFilter === 'bookmark' ? 'fill-current' : ''}`} />
                    Bookmarked
                  </button>
                )}

                {/* Sort Button - Mobile (Bottom Sheet) */}
                <button
                  onClick={() => setShowSortMenu(true)}
                  className="md:hidden flex items-center gap-2 px-4 py-2 rounded-[10px] bg-muted/30 hover:bg-muted/50 text-[13px] font-medium text-foreground transition-all whitespace-nowrap active:scale-95"
                >
                  <ArrowUpDown className="w-4 h-4" />
                  Sort
                </button>

                {/* Sort Dropdown - Desktop Only */}
                <div className="hidden md:block relative">
                  <button
                    onClick={() => setShowSortMenu(!showSortMenu)}
                    className="flex items-center gap-2 px-4 py-2 rounded-[10px] bg-muted/30 hover:bg-muted/50 text-[13px] font-medium text-foreground transition-all whitespace-nowrap"
                  >
                    <ArrowUpDown className="w-4 h-4" />
                    Sort
                  </button>
                  
                  {showSortMenu && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setShowSortMenu(false)}
                      />
                      <div className="absolute right-0 top-full mt-2 w-56 z-50 animate-fade-in">
                        <div className="bg-white rounded-[12px] p-2 shadow-lg">
                          {[
                            { value: 'price-asc', label: 'Price (Low → High)' },
                            { value: 'price-desc', label: 'Price (High → Low)' },
                            { value: 'change-asc', label: '% Change (Lowest)' },
                            { value: 'change-desc', label: '% Change (Highest)' },
                            { value: 'volume-asc', label: 'Volume (Lowest)' },
                            { value: 'volume-desc', label: 'Volume (Highest)' },
                          ].map((option) => (
                            <button
                              key={option.value}
                              onClick={() => {
                                setSortBy(option.value as SortOption);
                                setShowSortMenu(false);
                              }}
                              className={`w-full text-left px-3 py-2 rounded-[8px] text-[13px] font-medium transition-all ${
                                sortBy === option.value
                                  ? 'bg-primary text-primary-foreground'
                                  : 'text-foreground hover:bg-muted/30'
                              }`}
                            >
                              {option.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Section Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-[20px] font-semibold text-foreground">
                {stockFilter === 'bookmark' ? (
                  <span className="flex items-center gap-2">
                    <Star className="w-5 h-5 fill-primary text-primary" />
                    Bookmarked Stocks ({filteredAndSortedStocks.length})
                  </span>
                ) : (
                  `Stocks (${filteredAndSortedStocks.length})`
                )}
              </h2>
            </div>
          </div>

          {/* Bookmarked Section - Only show if not in bookmarked-only mode */}
          {stockFilter !== 'bookmark' && bookmarkedStocks.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-[16px] font-semibold text-foreground flex items-center gap-2">
                  <Star className="w-4 h-4 fill-primary text-primary" />
                  Bookmarked ({bookmarkedStocks.length})
                </h3>
                <button
                  onClick={() => setStockFilter('bookmark')}
                  className="text-[13px] text-primary hover:text-primary/80 font-medium transition-colors"
                >
                  View All
                </button>
              </div>

              {/* Horizontal Scroll on Mobile, Grid on Desktop */}
              <div className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0 pb-2">
                <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                  {bookmarkedStocks.slice(0, 6).map((stockId) => {
                    const stock = mockStocks.find(s => s.id === stockId);
                    if (!stock) return null;
                    const isPositive = stock.changePercent >= 0;
                    
                    return (
                      <GlassCard
                        key={stock.id}
                        className={`flex-shrink-0 w-[280px] md:w-auto p-4 cursor-pointer transition-all relative group ${
                          isPositive ? 'hover:bg-success/5' : 'hover:bg-destructive/5'
                        }`}
                        onClick={() => navigate(`/stocks/${stock.id}`)}
                      >
                        {/* Remove Bookmark Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleBookmark(stock.id, stock.code);
                          }}
                          className="absolute top-3 right-3 p-1.5 rounded-lg bg-background/50 hover:bg-background transition-all opacity-0 group-hover:opacity-100"
                        >
                          <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                        </button>

                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[14px] font-bold text-primary">
                              {stock.code.substring(0, 2)}
                            </span>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-[14px] font-bold text-foreground mb-0.5">
                              {stock.code}
                            </h4>
                            <p className="text-[11px] text-muted-foreground truncate">
                              {stock.name}
                            </p>
                          </div>

                          <div className="text-right flex-shrink-0">
                            <p className="text-[15px] font-bold text-foreground mb-0.5">
                              ${stock.price.toFixed(2)}
                            </p>
                            <div className={`text-[12px] font-bold ${
                              isPositive ? 'text-success' : 'text-destructive'
                            }`}>
                              {isPositive ? '▲' : '▼'} {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                            </div>
                          </div>
                        </div>
                      </GlassCard>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Stock Filter Tabs - Mobile: Soft Pill Style */}
          <div className="md:hidden sticky top-14 -mx-4 px-4 py-3 bg-background/95 backdrop-blur-sm border-b border-border z-30">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide">
              {[
                { value: 'all', label: 'All' },
                { value: 'gainers', label: 'Gainers' },
                { value: 'losers', label: 'Losers' },
                { value: 'active', label: 'Most Active' },
                { value: 'bookmark', label: 'Bookmark' },
              ].map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setStockFilter(filter.value as StockFilter)}
                  className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                    stockFilter === filter.value
                      ? 'bg-accent/50 text-foreground font-semibold shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {filter.label}
                  {filter.value === 'bookmark' && bookmarkedStocks.length > 0 && (
                    <span className="ml-1.5 px-1.5 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold">
                      {bookmarkedStocks.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Stock Filter Tabs - Desktop: Keep existing style */}
          <div className="hidden md:flex gap-2 overflow-x-auto pb-2">
            {[
              { value: 'all', label: 'All' },
              { value: 'gainers', label: 'Gainers' },
              { value: 'losers', label: 'Losers' },
              { value: 'active', label: 'Most Active' },
              { value: 'bookmark', label: 'Bookmark' },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setStockFilter(filter.value as StockFilter)}
                className={`px-4 py-2 rounded-[10px] text-[13px] font-medium transition-all whitespace-nowrap ${
                  stockFilter === filter.value
                    ? 'bg-primary/10 text-primary border border-primary/20'
                    : 'bg-muted/20 text-muted-foreground hover:bg-muted/30'
                }`}
              >
                {filter.label}
                {filter.value === 'bookmark' && bookmarkedStocks.length > 0 && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-primary/20 text-[11px] font-bold">
                    {bookmarkedStocks.length}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Stocks List */}
          <div className="space-y-3">
            {filteredAndSortedStocks.length === 0 ? (
              <GlassCard className="p-12 text-center">
                {stockFilter === 'bookmark' ? (
                  // Empty state for Bookmark tab
                  <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center">
                      <Star className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-[18px] font-semibold text-foreground mb-2">
                        No bookmarked stocks yet
                      </h3>
                      <p className="text-[14px] text-muted-foreground">
                        Tap the star icon on any stock to save it here
                      </p>
                    </div>
                  </div>
                ) : (
                  // Generic empty state
                  <p className="text-[14px] text-muted-foreground">
                    {searchCode ? `No stocks found matching "${searchCode}"` : 'No stocks found'}
                  </p>
                )}
              </GlassCard>
            ) : (
              filteredAndSortedStocks.map((stock, index) => {
                const isPositive = stock.changePercent >= 0;
                const isBookmarked = bookmarkedStocks.includes(stock.id);
                const volume = (Math.random() * 5 + 0.5).toFixed(1); // Mock volume
                const marketCap = (stock.price * 1000 / 1000).toFixed(1); // Mock market cap calculation
                
                return (
                  <GlassCard
                    key={stock.id}
                    className={`p-4 md:p-5 cursor-pointer transition-all animate-fade-in group ${
                      isPositive ? 'hover:bg-success/5' : 'hover:bg-destructive/5'
                    }`}
                    style={{ animationDelay: `${index * 20}ms` }}
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

                          {/* Price Info and Bookmark */}
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

                            {/* Bookmark Button */}
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleBookmark(stock.id, stock.code);
                              }}
                              className="p-2 rounded-lg hover:bg-background/50 transition-all active:scale-95"
                            >
                              <Star
                                className={`w-5 h-5 transition-all ${
                                  isBookmarked
                                    ? 'fill-primary text-primary'
                                    : 'text-muted-foreground hover:text-primary'
                                }`}
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                );
              })
            )}
          </div>

          {/* Load More Hint */}
          {stockFilter === 'all' && filteredAndSortedStocks.length >= 50 && (
            <div className="text-center py-4">
              <p className="text-[13px] text-muted-foreground">
                Showing first 50 stocks
              </p>
            </div>
          )}
        </div>
      )}

      {/* Mobile Sort Bottom Sheet */}
      <BottomSheet
        isOpen={showSortMenu}
        onClose={() => setShowSortMenu(false)}
        title="Sort By"
      >
        {[
          { value: 'price-asc', label: 'Price (Low → High)' },
          { value: 'price-desc', label: 'Price (High → Low)' },
          { value: 'change-asc', label: '% Change (Lowest)' },
          { value: 'change-desc', label: '% Change (Highest)' },
          { value: 'volume-asc', label: 'Volume (Lowest)' },
          { value: 'volume-desc', label: 'Volume (Highest)' },
        ].map((option) => (
          <BottomSheetOption
            key={option.value}
            label={option.label}
            isSelected={sortBy === option.value}
            onClick={() => {
              setSortBy(option.value as SortOption);
              setShowSortMenu(false);
            }}
          />
        ))}
      </BottomSheet>
    </div>
  );
}