import { GlassCard } from '../components/glass-card';
import { StockCard } from '../components/stock-card';
import { TrendingUp, TrendingDown, Activity, DollarSign, Briefcase, ArrowRight } from 'lucide-react';
import { mockStocks, mockIndexes } from '../lib/mock-data';
import { useNavigate } from 'react-router';

export function Dashboard() {
  const navigate = useNavigate();
  const topGainers = mockStocks.filter(s => s.changePercent > 0).slice(0, 3);
  const topLosers = mockStocks.filter(s => s.changePercent < 0).slice(0, 3);

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-[24px] md:text-[32px] font-bold text-foreground mb-2">
          Welcome back, John
        </h1>
        <p className="text-[14px] text-muted-foreground">
          Here's your market overview for today
        </p>
      </div>

      {/* Key Metrics */}
      {/* Mobile: Hero Card + 2x2 Grid Layout */}
      <div className="md:hidden space-y-3">
        {/* Primary Hero Card - Portfolio Value */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[13px] font-medium text-muted-foreground uppercase tracking-wide">Portfolio Value</p>
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-4.5 h-4.5 text-primary" />
            </div>
          </div>
          <p className="text-[32px] font-bold text-foreground mb-2">$52,890</p>
          <div className="flex items-center gap-1.5 text-[15px] font-semibold text-success">
            <TrendingUp className="w-4 h-4" />
            +8.5% this month
          </div>
        </GlassCard>

        {/* Secondary Metrics - Compact 2x2 Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Active Positions */}
          <GlassCard className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                <Activity className="w-4 h-4 text-secondary" />
              </div>
              <p className="text-[11px] font-medium text-muted-foreground leading-tight">Active Positions</p>
            </div>
            <p className="text-[22px] font-bold text-foreground mb-1">12</p>
            <p className="text-[11px] text-muted-foreground">3 pending orders</p>
          </GlassCard>

          {/* Total Gain */}
          <GlassCard className="p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-success/10 flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-4 h-4 text-success" />
              </div>
              <p className="text-[11px] font-medium text-muted-foreground leading-tight">Total Gain</p>
            </div>
            <p className="text-[22px] font-bold text-success mb-1">+$2,450</p>
            <p className="text-[11px] text-muted-foreground">+4.85% all time</p>
          </GlassCard>

          {/* Win Rate */}
          <GlassCard className="p-4 col-span-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-4 h-4 text-amber-600" />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground mb-0.5">Win Rate</p>
                  <p className="text-[11px] text-muted-foreground">Based on 45 trades</p>
                </div>
              </div>
              <p className="text-[28px] font-bold text-foreground">68%</p>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Desktop: Original 4-Column Grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <GlassCard className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div className="text-right">
              <p className="text-[12px] text-muted-foreground mb-0.5">Portfolio Value</p>
              <p className="text-[24px] font-bold text-foreground">$52,890</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-[13px] font-medium text-success">
            <TrendingUp className="w-3.5 h-3.5" />
            +8.5% this month
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
              <Activity className="w-5 h-5 text-secondary" />
            </div>
            <div className="text-right">
              <p className="text-[12px] text-muted-foreground mb-0.5">Active Positions</p>
              <p className="text-[24px] font-bold text-foreground">12</p>
            </div>
          </div>
          <div className="text-[13px] text-muted-foreground">
            3 pending orders
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-success" />
            </div>
            <div className="text-right">
              <p className="text-[12px] text-muted-foreground mb-0.5">Total Gain</p>
              <p className="text-[24px] font-bold text-success">+$2,450</p>
            </div>
          </div>
          <div className="text-[13px] text-muted-foreground">
            +4.85% all time
          </div>
        </GlassCard>

        <GlassCard className="p-5">
          <div className="flex items-start justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-right">
              <p className="text-[12px] text-muted-foreground mb-0.5">Win Rate</p>
              <p className="text-[24px] font-bold text-foreground">68%</p>
            </div>
          </div>
          <div className="text-[13px] text-muted-foreground">
            Based on 45 trades
          </div>
        </GlassCard>
      </div>

      {/* Market Indexes - Horizontal Scroll on Mobile, Grid on Desktop */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-[20px] font-semibold text-foreground">Market Indexes</h2>
          <button
            onClick={() => navigate('/market')}
            className="flex items-center gap-1.5 text-[14px] font-medium text-primary hover:text-primary/80 transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden overflow-x-auto -mx-4 px-4 pb-2">
          <div className="flex gap-3">
            {mockIndexes.map((index) => {
              const isPositive = index.change >= 0;
              return (
                <GlassCard 
                  key={index.id} 
                  className={`flex-shrink-0 w-[240px] p-4 transition-all cursor-pointer ${
                    isPositive ? 'hover:bg-success/5' : 'hover:bg-destructive/5'
                  }`}
                  onClick={() => navigate('/market')}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Activity className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[14px] font-semibold text-foreground truncate">{index.name}</p>
                      <p className="text-[11px] text-muted-foreground">{index.code}</p>
                    </div>
                  </div>
                  <p className="text-[24px] font-bold text-foreground mb-2">
                    {index.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </p>
                  <div className={`flex items-center gap-1.5 text-[16px] font-bold ${
                    isPositive ? 'text-success' : 'text-destructive'
                  }`}>
                    <span>{isPositive ? '▲' : '▼'}</span>
                    <span>{isPositive ? '+' : ''}{index.changePercent.toFixed(2)}%</span>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-4">
          {mockIndexes.map((index) => {
            const isPositive = index.change >= 0;
            return (
              <GlassCard 
                key={index.id} 
                className={`p-5 transition-all cursor-pointer ${
                  isPositive ? 'hover:bg-success/5' : 'hover:bg-destructive/5'
                }`}
                onClick={() => navigate('/market')}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-[14px] font-semibold text-foreground">{index.name}</p>
                    <p className="text-[12px] text-muted-foreground">{index.code}</p>
                  </div>
                </div>
                <p className="text-[32px] font-bold text-foreground mb-2">
                  {index.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </p>
                <div className={`flex items-center gap-1.5 text-[18px] font-bold ${
                  isPositive ? 'text-success' : 'text-destructive'
                }`}>
                  <span>{isPositive ? '▲' : '▼'}</span>
                  <span>{isPositive ? '+' : ''}{index.changePercent.toFixed(2)}%</span>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>

      {/* Top Movers - Clickable Headers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Gainers */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] font-semibold text-foreground">Top Gainers</h2>
            <button
              onClick={() => navigate('/market?tab=stocks&filter=gainers')}
              className="flex items-center gap-1.5 text-[14px] font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {topGainers.map((stock) => (
              <StockCard
                key={stock.id}
                code={stock.code}
                name={stock.name}
                price={stock.price}
                change={stock.change}
                changePercent={stock.changePercent}
                trend={stock.trend}
                subSector={stock.subSector}
                onClick={() => navigate(`/stocks/${stock.id}`)}
              />
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[20px] font-semibold text-foreground">Top Losers</h2>
            <button
              onClick={() => navigate('/market?tab=stocks&filter=losers')}
              className="flex items-center gap-1.5 text-[14px] font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="space-y-3">
            {topLosers.map((stock) => (
              <StockCard
                key={stock.id}
                code={stock.code}
                name={stock.name}
                price={stock.price}
                change={stock.change}
                changePercent={stock.changePercent}
                trend={stock.trend}
                subSector={stock.subSector}
                onClick={() => navigate(`/stocks/${stock.id}`)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}