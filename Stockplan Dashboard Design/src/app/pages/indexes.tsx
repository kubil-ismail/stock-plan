import { Link } from 'react-router';
import { GlassCard } from '../components/glass-card';
import { MiniChart } from '../components/mini-chart';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { mockIndexes } from '../lib/mock-data';

export function Indexes() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[24px] md:text-[32px] font-bold text-foreground mb-2">Indexes</h1>
        <p className="text-[14px] text-muted-foreground">
          Track major market indexes
        </p>
      </div>

      <div className="space-y-4">
        {mockIndexes.map((index) => {
          const isPositive = index.change >= 0;
          return (
            <Link key={index.id} to={`/indexes/${index.id}`}>
              <GlassCard hover className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-[18px] font-semibold text-foreground mb-1">
                      {index.name}
                    </h3>
                    <p className="text-[12px] text-muted-foreground">
                      {index.code} • {index.stockCount} stocks
                    </p>
                  </div>
                  <ArrowRight className="w-5 h-5 text-muted-foreground" />
                </div>

                <div className="mb-3">
                  <p className="text-[24px] font-bold text-foreground">
                    {index.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <div className={`flex items-center gap-1.5 text-[14px] font-medium ${
                    isPositive ? 'text-success' : 'text-destructive'
                  }`}>
                    {isPositive ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                    {isPositive ? '+' : ''}{index.change.toFixed(2)} ({isPositive ? '+' : ''}
                    {index.changePercent.toFixed(2)}%)
                  </div>
                </div>

                <MiniChart 
                  data={index.trend} 
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