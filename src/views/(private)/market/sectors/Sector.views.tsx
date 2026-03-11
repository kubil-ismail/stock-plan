"use client";
import { useState, useEffect, useMemo } from "react";
import { GlassCard } from "@/components/glass-card";
import { ArrowLeft, ArrowUpDown, Search, StarIcon, XIcon } from "lucide-react";
import { mockStocks, mockSectors } from "@/lib/mock-data";
import { useDetailNavbar } from "@/contexts/detail-navbar-context";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { PB_PATH_MARKET, PB_PATH_STOCKS } from "@/lib/route";
import { Badge } from "@/components/badge";

type StockFilter = "all" | "gainers" | "losers" | "active" | "bookmark";
type SortOption =
  | "price-asc"
  | "price-desc"
  | "change-asc"
  | "change-desc"
  | "volume-asc"
  | "volume-desc";

export function SectorDetail() {
  const { code } = useParams();

  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter");

  const router = useRouter();
  const [searchCode, setSearchCode] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("price-desc");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [bookmarkedStocks, setBookmarkedStocks] = useState<string[]>([]);

  const [stockFilter, setStockFilter] = useState<StockFilter>(
    (filterParam as StockFilter) || "all"
  );
  const { setNavbar, clearNavbar } = useDetailNavbar();

  const sector = mockSectors.find((s) => s.id === code);

  // Filter and sort stocks
  const filteredAndSortedStocks = useMemo(() => {
    let filtered = [...mockStocks];

    // Apply search filter by code
    if (searchCode) {
      const searchUpper = searchCode.toUpperCase();
      filtered = filtered.filter((s) =>
        s.code.toUpperCase().includes(searchUpper)
      );
    }

    // Helper function to parse volume string to number
    const parseVolume = (volumeStr: string): number => {
      const value = parseFloat(volumeStr);
      if (volumeStr.includes("M")) return value * 1000000;
      if (volumeStr.includes("B")) return value * 1000000000;
      return value;
    };

    // Apply tab filter and sorting
    switch (stockFilter) {
      case "gainers":
        filtered = filtered.filter((s) => s.changePercent > 0);
        // Apply sorting for gainers tab
        switch (sortBy) {
          case "price-asc":
            filtered.sort((a, b) => a.price - b.price);
            break;
          case "price-desc":
            filtered.sort((a, b) => b.price - a.price);
            break;
          case "change-asc":
            filtered.sort((a, b) => a.changePercent - b.changePercent);
            break;
          case "change-desc":
            filtered.sort((a, b) => b.changePercent - a.changePercent);
            break;
          case "volume-asc":
            filtered.sort(
              (a, b) => parseVolume(a.volume) - parseVolume(b.volume)
            );
            break;
          case "volume-desc":
            filtered.sort(
              (a, b) => parseVolume(b.volume) - parseVolume(a.volume)
            );
            break;
        }
        break;
      case "losers":
        filtered = filtered.filter((s) => s.changePercent < 0);
        // Apply sorting for losers tab
        switch (sortBy) {
          case "price-asc":
            filtered.sort((a, b) => a.price - b.price);
            break;
          case "price-desc":
            filtered.sort((a, b) => b.price - a.price);
            break;
          case "change-asc":
            filtered.sort((a, b) => a.changePercent - b.changePercent);
            break;
          case "change-desc":
            filtered.sort((a, b) => b.changePercent - a.changePercent);
            break;
          case "volume-asc":
            filtered.sort(
              (a, b) => parseVolume(a.volume) - parseVolume(b.volume)
            );
            break;
          case "volume-desc":
            filtered.sort(
              (a, b) => parseVolume(b.volume) - parseVolume(a.volume)
            );
            break;
        }
        break;
      case "active":
        // Apply sorting for most active tab
        switch (sortBy) {
          case "price-asc":
            filtered.sort((a, b) => a.price - b.price);
            break;
          case "price-desc":
            filtered.sort((a, b) => b.price - a.price);
            break;
          case "change-asc":
            filtered.sort((a, b) => a.changePercent - b.changePercent);
            break;
          case "change-desc":
            filtered.sort((a, b) => b.changePercent - a.changePercent);
            break;
          case "volume-asc":
            filtered.sort(
              (a, b) => parseVolume(a.volume) - parseVolume(b.volume)
            );
            break;
          case "volume-desc":
          default:
            filtered.sort(
              (a, b) => parseVolume(b.volume) - parseVolume(a.volume)
            );
            break;
        }
        break;
      case "bookmark":
        filtered = filtered.filter((s) => bookmarkedStocks.includes(s.id));
        // Apply sorting for bookmark tab
        switch (sortBy) {
          case "price-asc":
            filtered.sort((a, b) => a.price - b.price);
            break;
          case "price-desc":
            filtered.sort((a, b) => b.price - a.price);
            break;
          case "change-asc":
            filtered.sort((a, b) => a.changePercent - b.changePercent);
            break;
          case "change-desc":
            filtered.sort((a, b) => b.changePercent - a.changePercent);
            break;
          case "volume-asc":
            filtered.sort(
              (a, b) => parseVolume(a.volume) - parseVolume(b.volume)
            );
            break;
          case "volume-desc":
            filtered.sort(
              (a, b) => parseVolume(b.volume) - parseVolume(a.volume)
            );
            break;
        }
        break;
      case "all":
      default:
        // Apply sorting for all tab
        switch (sortBy) {
          case "price-asc":
            filtered.sort((a, b) => a.price - b.price);
            break;
          case "price-desc":
            filtered.sort((a, b) => b.price - a.price);
            break;
          case "change-asc":
            filtered.sort((a, b) => a.changePercent - b.changePercent);
            break;
          case "change-desc":
            filtered.sort((a, b) => b.changePercent - a.changePercent);
            break;
          case "volume-asc":
            filtered.sort(
              (a, b) => parseVolume(a.volume) - parseVolume(b.volume)
            );
            break;
          case "volume-desc":
            filtered.sort(
              (a, b) => parseVolume(b.volume) - parseVolume(a.volume)
            );
            break;
          default:
            filtered.sort((a, b) => b.changePercent - a.changePercent);
            break;
        }
        break;
    }

    return filtered.slice(0, 50); // Show first 50 stocks
  }, [stockFilter, sortBy, searchCode, bookmarkedStocks]);

  // Set detail navbar title
  useEffect(() => {
    if (sector) {
      setNavbar({
        title: sector.name,
      });
    }
    return () => clearNavbar();
  }, [sector, setNavbar, clearNavbar]);

  return (
    <div className="space-y-6">
      {/* Header - Desktop Only */}
      <div className="hidden md:block">
        <Link
          href={PB_PATH_MARKET}
          className="inline-flex items-center gap-2 text-[14px] text-primary hover:text-primary/80 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sectors
        </Link>
        <h1 className="text-[32px] font-bold text-foreground mb-2">
          {sector?.name}
        </h1>
        <p className="text-[14px] text-muted-foreground">
          {sector?.stockCount} stocks in this sector
        </p>
      </div>

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
                  onClick={() => setSearchCode("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <XIcon className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
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
              </div>
            </div>
          </div>
        </div>

        {/* Stock Filter Tabs - Mobile: Soft Pill Style */}
        <div className="md:hidden sticky top-14 -mx-4 px-4 py-3 bg-background/95 backdrop-blur-sm border-b border-border z-30">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {[
              { value: "all", label: "All" },
              { value: "gainers", label: "Gainers" },
              { value: "losers", label: "Losers" },
              { value: "active", label: "Most Active" },
              { value: "bookmark", label: "Bookmark" },
            ].map((filter) => (
              <button
                key={filter.value}
                onClick={() => setStockFilter(filter.value as StockFilter)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all duration-200 whitespace-nowrap flex-shrink-0 ${
                  stockFilter === filter.value
                    ? "bg-accent/50 text-foreground font-semibold shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter.label}
                {filter.value === "bookmark" && bookmarkedStocks.length > 0 && (
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
            { value: "all", label: "All" },
            { value: "gainers", label: "Gainers" },
            { value: "losers", label: "Losers" },
            { value: "active", label: "Most Active" },
            { value: "bookmark", label: "Bookmark" },
          ].map((filter) => (
            <button
              key={filter.value}
              onClick={() => setStockFilter(filter.value as StockFilter)}
              className={`px-4 py-2 rounded-[10px] text-[13px] font-medium transition-all whitespace-nowrap ${
                stockFilter === filter.value
                  ? "bg-primary/10 text-primary border border-primary/20"
                  : "bg-muted/20 text-muted-foreground hover:bg-muted/30"
              }`}
            >
              {filter.label}
              {filter.value === "bookmark" && bookmarkedStocks.length > 0 && (
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
              {stockFilter === "bookmark" ? (
                // Empty state for Bookmark tab
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center">
                    <StarIcon className="w-8 h-8 text-muted-foreground" />
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
                  {searchCode
                    ? `No stocks found matching "${searchCode}"`
                    : "No stocks found"}
                </p>
              )}
            </GlassCard>
          ) : (
            filteredAndSortedStocks.map((stock, index) => {
              const isPositive = stock.changePercent >= 0;
              const isBookmarked = bookmarkedStocks.includes(stock.id);
              const volume = (Math.random() * 5 + 0.5).toFixed(1); // Mock volume
              const marketCap = ((stock.price * 1000) / 1000).toFixed(1); // Mock market cap calculation

              return (
                <GlassCard
                  key={stock.id}
                  className={`p-4 md:p-5 cursor-pointer transition-all animate-fade-in group ${
                    isPositive ? "hover:bg-success/5" : "hover:bg-destructive/5"
                  }`}
                  style={{ animationDelay: `${index * 20}ms` }}
                  onClick={() => router.push(`${PB_PATH_STOCKS}/${stock.id}`)}
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
                            <div
                              className={`flex items-center justify-end gap-1.5 text-[14px] font-bold ${
                                isPositive ? "text-success" : "text-destructive"
                              }`}
                            >
                              <span>{isPositive ? "▲" : "▼"}</span>
                              <span>
                                {isPositive ? "+" : ""}$
                                {Math.abs(stock.change).toFixed(2)}
                              </span>
                            </div>
                            <div
                              className={`text-[13px] font-semibold mt-0.5 ${
                                isPositive ? "text-success" : "text-destructive"
                              }`}
                            >
                              {isPositive ? "+" : ""}
                              {stock.changePercent.toFixed(2)}%
                            </div>
                          </div>

                          {/* Bookmark Button */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="p-2 rounded-lg hover:bg-background/50 transition-all active:scale-95"
                          >
                            <StarIcon
                              className={`w-5 h-5 transition-all ${
                                isBookmarked
                                  ? "fill-primary text-primary"
                                  : "text-muted-foreground hover:text-primary"
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
        {stockFilter === "all" && filteredAndSortedStocks.length >= 50 && (
          <div className="text-center py-4">
            <p className="text-[13px] text-muted-foreground">
              Showing first 50 stocks
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
