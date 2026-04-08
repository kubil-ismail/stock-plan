import React from "react";
import { Badge } from "./badge";
import { format } from "date-fns";
import { cn, formatRupiah } from "@/lib/utils";
import { TradingPlanList } from "@/types/auth";

interface Props {
  list: TradingPlanList[];
  onClick: (param: TradingPlanList) => void;
}

export function PortfolioStatus({ status }: { status: string }) {
  switch (status) {
    case "ONGOING":
      return (
        <Badge variant={"warning"} size="sm">
          On Going
        </Badge>
      );
  }
}

function Porto_list(props: Props) {
  const { list, onClick } = props;

  return (
    <div className="space-y-3">
      {list.map((order) => (
        <button
          key={order.id}
          onClick={() => onClick(order)}
          className="w-full text-left p-4 rounded-lg bg-accent/30 hover:bg-accent transition-colors cursor-pointer"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <span className="text-[12px] font-bold text-primary">
                  {order.ticker.substring(0, 2)}
                </span>
              </div>
              <div>
                <p className="text-[14px] font-semibold text-foreground">
                  {order.ticker}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-[12px] text-muted-foreground">
                    <span
                      className={cn(
                        "font-[600]",
                        order.order_type === "BUY"
                          ? "text-green-600"
                          : "text-red-600"
                      )}
                    >
                      {order.order_type}
                    </span>
                  </p>
                  <p className="text-[12px] text-muted-foreground">•</p>
                  <p className="text-[12px] text-muted-foreground">
                    <b>{order.lot}</b> lots
                  </p>
                  <p className="text-[12px] text-muted-foreground">•</p>
                  <p className="text-[12px] text-muted-foreground">
                    price <b>{order.price}</b>
                  </p>
                  <p className="text-[12px] text-muted-foreground">•</p>
                  <p className="text-[12px] text-muted-foreground">
                    Expires: <b>{format(order.expiry, "dd MMM yyyy")}</b>
                  </p>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[14px] font-semibold text-foreground mb-2">
                {formatRupiah(order.lot * 100 * order.price)}
              </p>
              <PortfolioStatus status={order.status} />
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}

export default Porto_list;
