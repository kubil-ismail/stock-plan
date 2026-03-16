"use client";
import { GlassCard } from "./glass-card";
import { PB_PATH_STOCKS } from "@/lib/route";
import { useRouter } from "next/navigation";
import { Badge } from "./badge";
import { StockList } from "@/types/company";

interface Props {
  stock: StockList;
  index: number;
  ref?: string;
}

function Stock_list(props: Props) {
  const { stock, index, ref } = props;

  const router = useRouter();

  const volume = 0;
  const marketCap = 0;

  const url = ref
    ? `${PB_PATH_STOCKS}/${stock.ticker.toLowerCase()}?ref=${ref}`
    : `${PB_PATH_STOCKS}/${stock.ticker.toLowerCase()}`;

  return (
    <GlassCard
      key={stock.id}
      className={`p-4 md:p-5 cursor-pointer group hover:bg-destructive/5`}
      style={{ animationDelay: `${index * 20}ms` }}
      onClick={() => router.push(url)}
    >
      <div className="flex items-center gap-4">
        {/* Stock Logo */}
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
          <span className="text-[16px] font-bold text-primary">
            {stock?.ticker?.substring(0, 2)}
          </span>
        </div>

        {/* Stock Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0 flex-1">
              <h3 className="text-[16px] font-bold text-foreground mb-0.5">
                {stock?.ticker}
              </h3>
              <p className="text-[13px] text-muted-foreground truncate mb-1.5">
                {stock?.name}
              </p>
              <div className="flex items-center gap-3 flex-wrap">
                <Badge variant="secondary" size="sm">
                  {stock?.subsector?.name}
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
              {/* <div className="text-right">
                <p className="text-[18px] md:text-[20px] font-bold text-foreground mb-1">
                  ${stock?.price?.toFixed(2)}
                </p>
                <div
                  className={`flex items-center justify-end gap-1.5 text-[14px] font-bold ${
                    isPositive ? "text-success" : "text-destructive"
                  }`}
                >
                  <span>{isPositive ? "▲" : "▼"}</span>
                  <span>
                    {isPositive ? "+" : ""}$
                    {Math.abs(stock?.change).toFixed(2)}
                  </span>
                </div>
                <div
                  className={`text-[13px] font-semibold mt-0.5 ${
                    isPositive ? "text-success" : "text-destructive"
                  }`}
                >
                  {isPositive ? "+" : ""}
                  {stock?.changePercent?.toFixed(2)}%
                </div>
              </div> */}

              {/* Bookmark Button */}
              {/* <button
                onClick={(e) => {
                  e.stopPropagation();
                //   toggleBookmark(stock?.id, stock?.code);
                }}
                className="p-2 rounded-lg hover:bg-background/50 transition-all active:scale-95"
              >
                <Star
                  className={`w-5 h-5 transition-all ${
                    isBookmarked
                      ? "fill-primary text-primary"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                />
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export default Stock_list;
