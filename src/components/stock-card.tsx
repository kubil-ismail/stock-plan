import { GlassCard } from "./glass-card";
import { Badge } from "./badge";

interface StockCardProps {
  code: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  trend: number[];
  subSector?: string;
  onClick?: () => void;
}

export function StockCard({
  code,
  name,
  price,
  change,
  changePercent,
  subSector,
  onClick,
}: StockCardProps) {
  const isPositive = change >= 0;

  return (
    <GlassCard
      hover
      className={`p-5 cursor-pointer transition-all ${
        isPositive ? "hover:bg-success/5" : "hover:bg-destructive/5"
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        {/* Stock Logo Placeholder */}
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
          <span className="text-[14px] font-bold text-primary">
            {code.substring(0, 2)}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div>
              <h3 className="text-[16px] font-bold text-foreground">{code}</h3>
              <p className="text-[13px] text-muted-foreground truncate">
                {name}
              </p>

              {subSector && (
                <Badge variant="secondary" size="sm" className="mt-2">
                  {subSector}
                </Badge>
              )}
            </div>
            <div className="text-right">
              <p className="text-[20px] font-bold text-foreground">
                ${price.toFixed(2)}
              </p>
              <div
                className={`flex items-center justify-end gap-1.5 text-[15px] font-bold ${
                  isPositive ? "text-success" : "text-destructive"
                }`}
              >
                <span>{isPositive ? "▲" : "▼"}</span>
                <span>
                  {isPositive ? "+" : ""}
                  {changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
