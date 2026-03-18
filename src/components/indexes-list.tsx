"use client";
import { GlassCard } from "./glass-card";
import { useRouter } from "next/navigation";
import { PB_PATH_INDEXES } from "@/lib/route";
import { MarketIndex } from "@/types/general";
import { BarChart3 } from "lucide-react";

interface Props {
  index: MarketIndex;
}

function IndexesList(props: Props) {
  const router = useRouter();
  const { index } = props;

  const slug = index.ticker
    ?.split(" ")
    ?.map((item) => item.toLocaleLowerCase())
    ?.join("-");

  return (
    <GlassCard
      className={`p-5 cursor-pointer transition-all hover:bg-destructive/5`}
      onClick={() => router.push(`${PB_PATH_INDEXES}/${slug}`)}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[16px] font-bold text-foreground">
            {index.ticker}
          </p>
          {/* <p className="text-[13px] text-muted-foreground">
                        {index.code}
                      </p> */}
        </div>
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <BarChart3 className="w-5 h-5 text-primary" />
        </div>
      </div>

      <p className="text-[32px] font-bold text-foreground mb-3">
        {/* {index.value.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                    })} */}
      </p>

      {/* <div className="flex items-center gap-4">
                    <div
                      className={`flex items-center gap-1.5 text-[18px] font-bold ${
                        isPositive ? "text-success" : "text-destructive"
                      }`}
                    >
                      <span>{isPositive ? "▲" : "▼"}</span>
                      <span>
                        {isPositive ? "+" : ""}
                        {index.changePercent.toFixed(2)}%
                      </span>
                    </div>
                    <div
                      className={`text-[15px] font-medium ${
                        isPositive ? "text-success" : "text-destructive"
                      }`}
                    >
                      {isPositive ? "+" : ""}
                      {index.change.toFixed(2)}
                    </div>
                  </div> */}
    </GlassCard>
  );
}

export default IndexesList;
