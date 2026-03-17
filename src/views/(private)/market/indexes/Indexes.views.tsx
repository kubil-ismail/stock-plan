"use client";
import { GlassCard } from "@/components/glass-card";
import { mockIndexes } from "@/lib/mock-data";
import { PB_PATH_INDEXES } from "@/lib/route";
import { MarketIndexResponse } from "@/types/general";
import { BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

interface Response {
  market_indexes: MarketIndexResponse;
}

interface Props {
  response: Response;
}

function Indexes({ response }: Props) {
  const { market_indexes } = response ?? {};

  const router = useRouter();

  return (
    <>
      <div className="space-y-6 animate-fade-in">
        {/* Market Indexes Grid */}
        <div>
          <h2 className="text-[20px] font-semibold text-foreground mb-4">
            Market Indexes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {market_indexes?.data.map((index) => {
              return (
                <GlassCard
                  key={index.id}
                  className={`p-5 cursor-pointer transition-all hover:bg-destructive/5`}
                  onClick={() => router.push(`${PB_PATH_INDEXES}/${index.id}`)}
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
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default Indexes;
