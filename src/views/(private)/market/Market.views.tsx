/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { usePathname } from "next/navigation";
import { PB_PATH_INDEXES, PB_PATH_SECTORS, PB_PATH_STOCKS } from "@/lib/route";
import Link from "next/link";

export default function Market({ children }: any) {
  const pathname = usePathname();
  const activeTab = pathname?.split("/")?.[2];

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
        <Link href={PB_PATH_INDEXES}>
          <button
            className={`px-5 py-2.5 rounded-[10px] text-[14px] font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "indexes"
                ? "bg-primary text-primary-foreground"
                : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
            }`}
          >
            Market Indexes
          </button>
        </Link>

        <Link href={PB_PATH_SECTORS}>
          <button
            className={`px-5 py-2.5 rounded-[10px] text-[14px] font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "sectors"
                ? "bg-primary text-primary-foreground"
                : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
            }`}
          >
            Sectors
          </button>
        </Link>

        <Link href={PB_PATH_STOCKS}>
          <button
            className={`px-5 py-2.5 rounded-[10px] text-[14px] font-medium transition-all whitespace-nowrap cursor-pointer ${
              activeTab === "stocks"
                ? "bg-primary text-primary-foreground"
                : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
            }`}
          >
            Stocks
          </button>
        </Link>
      </div>

      {children}
    </div>
  );
}
