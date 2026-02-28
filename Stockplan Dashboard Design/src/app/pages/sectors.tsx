import { Link } from 'react-router';
import { GlassCard } from '../components/glass-card';
import { MiniChart } from '../components/mini-chart';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { mockSectors } from '../lib/mock-data';

export function Sectors() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[24px] md:text-[32px] font-bold text-foreground mb-2">Sectors</h1>
        <p className="text-[14px] text-muted-foreground">
          Track market performance by sector
        </p>
      </div>

      <div className="space-y-4">
        {mockSectors.map((sector) => {
          const isPositive = sector.change >= 0;
          return (
            <Link key={sector.id} to={`/sectors/${sector.id}`}>
              <GlassCard hover className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-[18px] font-semibold text-foreground mb-1">
                      {sector.name}
                    </h3>
                    <p className="text-[12px] text-muted-foreground">
                      {sector.stockCount} stocks
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>

                <div className={`flex items-center gap-2 mb-4 text-[20px] font-bold ${
                  isPositive ? 'text-success' : 'text-destructive'
                }`}>
                  {isPositive ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : (
                    <TrendingDown className="w-5 h-5" />
                  )}
                  {isPositive ? '+' : ''}{sector.change.toFixed(2)}%
                </div>

                <MiniChart 
                  data={sector.trend} 
                  color={isPositive ? '#6B9E7A' : '#E76B6B'} 
                  height={50}
                />
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
}