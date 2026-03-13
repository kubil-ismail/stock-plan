"use client";
import React from "react";
import { GlassCard } from "@/components/glass-card";
import { PB_PATH_SECTORS } from "@/lib/route";
import {
  BarChart3,
  Building2,
  Cpu,
  Zap,
  ShoppingBag,
  Landmark,
  Activity,
  Hammer,
  Factory,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
  sector: any;
}

// Sector icon mapping
const sectorIcons: Record<string, any> = {
  Teknologi: Cpu,
  Keuangan: Landmark,
  Energi: Zap,
  "Barang Konsumen Non-Primer": ShoppingBag,
  "Barang Konsumen Primer": ShoppingBag,
  Infrastruktur: Building2,
  "Barang Baku": Hammer,
  Kesehatan: Activity,
  Perindustrian: Factory,
  "Properti & Real Estat": Building2,
  default: BarChart3,
};

function SectorList(props: Props) {
  const { sector } = props;
  const router = useRouter();

  const isPositive = sector.changePercent >= 0;
  const Icon = sectorIcons[sector.name] || sectorIcons["default"];

  return (
    <GlassCard
      key={sector.id}
      className={`p-5 cursor-pointer transition-all ${
        isPositive ? "hover:bg-success/5" : "hover:bg-destructive/5"
      }`}
      onClick={() => router.push(`${PB_PATH_SECTORS}/${sector.id}`)}
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
                {sector.total_companies} stocks
              </p>
            </div>

            {/* <div className="text-right">
            <div
                className={`text-[20px] font-bold ${
                isPositive ? "text-success" : "text-destructive"
                }`}
            >
                <span>{isPositive ? "▲" : "▼"}</span>
                <span className="ml-1">
                {isPositive ? "+" : ""}
                {(sector.changePercent ?? 0).toFixed(2)}%
                </span>
            </div>
            <p className="text-[12px] text-muted-foreground mt-0.5">
                Market cap: $
                {((sector.marketCap ?? 0) / 1000000000).toFixed(1)}B
            </p>
            </div> */}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

export default SectorList;
