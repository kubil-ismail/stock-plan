"use client";
import { Search, X } from "lucide-react";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import React, { useEffect, useState } from "react";
import { GlassCard } from "@/components/glass-card";
import { PB_PATH_STOCKS, PR_PATH_PORTO } from "@/lib/route";
import { useRouter, useSearchParams } from "next/navigation";
import { mockPortfolioHistory } from "@/lib/mock-data";
import { MyTradingPlanResponse, TradingPlanList } from "@/types/auth";
import Porto_list from "@/components/porto-list";
import { formatRupiah } from "@/lib/utils";
import { format } from "date-fns";
import Link from "next/link";
import { FloatingActionButton } from "@/components/floating-action-button";

interface Props {
  response: {
    trading_plan: MyTradingPlanResponse;
  };
}

export default function Portfolio(props: Props) {
  const { trading_plan } = props.response;
  const debounceRef = React.useRef<NodeJS.Timeout | null>(null);
  const search = useSearchParams();

  const router = useRouter();
  const [selectedOrder, setSelectedOrder] = useState<TradingPlanList | null>(
    null
  );
  const searchCode = String(search.get("search") ?? "");

  // Handler for order click - navigate on mobile, show panel on desktop
  const handleOrderClick = (order: TradingPlanList) => {
    router.push(`${PR_PATH_PORTO}?order_id=${order.id}`);
    setSelectedOrder(order);
  };

  const updateQuery = (key: string, value: string) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);

      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }

      router.replace(`${PR_PATH_PORTO}?${params.toString()}`);
    }, 500);
  };

  const handleSearch = (value: string) => {
    updateQuery("search", value);
  };

  useEffect(() => {
    if (search.get("order_id") && trading_plan.data.length > 0) {
      setSelectedOrder(
        trading_plan?.data?.find(
          (item) => item.id === parseInt(String(search.get("order_id")))
        ) ?? null
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.get("order_id")]);

  return (
    <div className="space-y-6">
      <div className="hidden md:block">
        <h1 className="text-[28px] md:text-[32px] font-bold text-foreground mb-2">
          Portfolio
        </h1>
        <p className="text-[14px] text-muted-foreground">
          Manage your positions and view trading history
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by code or name..."
                defaultValue={searchCode}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-[10px] border border-border bg-input-background text-[14px] focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            <Porto_list
              list={trading_plan.data}
              onClick={(value) => handleOrderClick(value)}
            />

            {trading_plan.data.length === 0 && (
              <p className="text-center text-muted-foreground py-12">
                No orders found
              </p>
            )}
          </GlassCard>
        </div>

        {/* Order Detail Panel - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block">
          {selectedOrder ? (
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[18px] font-semibold text-foreground">
                  Order Details
                </h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-8 h-8 rounded-lg hover:bg-accent flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Stock Info */}
                <Link
                  href={`${PB_PATH_STOCKS}/${selectedOrder.ticker}?ref=${window.location.href}`}
                >
                  <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/50">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <span className="text-[14px] font-bold text-primary">
                        {selectedOrder.ticker.substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="text-[16px] font-semibold text-foreground">
                        {selectedOrder.ticker}
                      </p>
                      <p className="text-[13px] text-muted-foreground">
                        {selectedOrder.ticker}
                      </p>
                    </div>
                  </div>
                </Link>

                {/* Details */}
                <div className="space-y-3 pt-3">
                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">
                      Status
                    </p>
                    <Badge
                      variant={
                        selectedOrder.status === "Active"
                          ? "success"
                          : selectedOrder.status === "Completed"
                          ? "info"
                          : "warning"
                      }
                    >
                      {selectedOrder.status}
                    </Badge>
                  </div>

                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">
                      Action
                    </p>
                    <p className="text-[14px] font-medium text-foreground">
                      {selectedOrder.order_type}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">
                      Lot Size
                    </p>
                    <p className="text-[14px] font-medium text-foreground">
                      {selectedOrder.lot} lots
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">
                      Target Price
                    </p>
                    <p className="text-[14px] font-medium text-foreground">
                      {formatRupiah(selectedOrder.price, { prefix: false })}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">
                      Amount
                    </p>
                    <p className="text-[14px] font-medium text-foreground">
                      {formatRupiah(
                        selectedOrder.lot * 100 * selectedOrder.price
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">
                      Expiry
                    </p>
                    <p className="text-[14px] font-medium text-foreground">
                      {format(selectedOrder.expiry, "dd MMM yyyy")}
                    </p>
                  </div>

                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">
                      Broker
                    </p>
                    <p className="text-[14px] font-medium text-foreground">
                      ({selectedOrder?.user_broker?.broker?.ticker}){" "}
                      {selectedOrder?.user_broker?.broker?.name}
                    </p>
                  </div>

                  <FloatingActionButton
                    variant="button-update"
                    ticker={selectedOrder.ticker}
                    defaultValue={selectedOrder}
                  />
                </div>
              </div>
            </GlassCard>
          ) : (
            <GlassCard className="p-6">
              <p className="text-[14px] text-muted-foreground text-center py-8">
                Select an order to view details
              </p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}
