"use client";
import Link from "next/link";
import Stock_list from "@/components/stock-list";
import { ArrowLeft, ArrowUpDown, Search, StarIcon, XIcon } from "lucide-react";
import { BottomSheet, BottomSheetOption } from "@/components/bottom-sheet";
import { useDetailNavbar } from "@/contexts/detail-navbar-context";
import { GlassCard } from "@/components/glass-card";
import { useSearchParams } from "next/navigation";
import { StocksResponse } from "@/types/company";
import { useState, useEffect } from "react";
import { PB_PATH_SECTORS } from "@/lib/route";
import { Button } from "@/components/button";
import { SectorResponse } from "@/types/general";

type StockFilter = "all" | "gainers" | "losers" | "active" | "bookmark";

interface Response {
  companies: StocksResponse;
  general_sector: SectorResponse;
}

interface Props {
  response: Response;
}

export function SectorDetail(props: Props) {
  const { companies, general_sector } = props?.response || {};

  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter");
  const sector = general_sector?.data?.[0];

  const [searchCode, setSearchCode] = useState("");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [bookmarkedStocks, setBookmarkedStocks] = useState<string[]>([]);

  const [stockFilter, setStockFilter] = useState<StockFilter>(
    (filterParam as StockFilter) || "all"
  );
  const { setNavbar, clearNavbar } = useDetailNavbar();

  // Filter and sort stocks
  const filteredAndSortedStocks = companies.data;

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
          href={PB_PATH_SECTORS}
          className="inline-flex items-center gap-2 text-[14px] text-primary hover:text-primary/80 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sectors
        </Link>
        <h1 className="text-[32px] font-bold text-foreground mb-2">
          {sector?.name}
        </h1>
        <p className="text-[14px] text-muted-foreground">
          {sector?.total_companies} stocks in this sector
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
                <Button
                  variant="secondary"
                  onClick={() => setShowSortMenu(!showSortMenu)}
                >
                  <ArrowUpDown className="w-4 h-4" />
                  Sort
                </Button>

                {showSortMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowSortMenu(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-56 z-50 animate-fade-in">
                      <div className="bg-white rounded-[12px] p-2 shadow-lg">
                        {[
                          {
                            value: "price-asc",
                            label: "Price (Low → High)",
                          },
                          {
                            value: "price-desc",
                            label: "Price (High → Low)",
                          },
                          {
                            value: "change-asc",
                            label: "% Change (Lowest)",
                          },
                          {
                            value: "change-desc",
                            label: "% Change (Highest)",
                          },
                          { value: "volume-asc", label: "Volume (Lowest)" },
                          {
                            value: "volume-desc",
                            label: "Volume (Highest)",
                          },
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => {
                              setShowSortMenu(false);
                            }}
                            className={`w-full text-left px-3 py-2 rounded-[8px] text-[13px] font-medium transition-all 
                                     
                                     `}
                          >
                            {/* $
                                     {sortBy === option.value
                                       ? "bg-primary text-primary-foreground"
                                       : "text-foreground hover:bg-muted/30"} */}
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
            filteredAndSortedStocks.map((stock, index) => (
              <Stock_list key={stock.id} stock={stock} index={index} />
            ))
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

        {/* Mobile Sort Bottom Sheet */}
        <BottomSheet
          isOpen={showSortMenu}
          onClose={() => setShowSortMenu(false)}
          title="Sort By"
        >
          {[
            { value: "price-asc", label: "Price (Low → High)" },
            { value: "price-desc", label: "Price (High → Low)" },
            { value: "change-asc", label: "% Change (Lowest)" },
            { value: "change-desc", label: "% Change (Highest)" },
            { value: "volume-asc", label: "Volume (Lowest)" },
            { value: "volume-desc", label: "Volume (Highest)" },
          ].map((option) => (
            <BottomSheetOption
              key={option.value}
              label={option.label}
              isSelected={false}
              onClick={() => {
                setShowSortMenu(false);
              }}
            />
          ))}
        </BottomSheet>
      </div>
    </div>
  );
}
