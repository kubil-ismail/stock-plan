import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { GlassCard } from '../components/glass-card';
import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { 
  Skeleton, 
  SkeletonCircle, 
} from '../components/skeleton';
import { 
  TrendingUp, 
  TrendingDown, 
  ArrowLeft,
  Building2,
  Plus,
  Eye,
  Info,
  DollarSign,
  Wallet,
  TrendingDown as TrendingDownIcon,
  TrendingUp as TrendingUpIcon,
  Users,
  Briefcase,
  Shield,
  Network,
  Globe,
  Calendar,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { mockStocks, mockUserPositions, mockCorporateInfo } from '../lib/mock-data';
import { AnimatedNumber } from '../components/loading-wrapper';

// Generate chart data
const generateChartData = (days: number) => {
  const data = [];
  const basePrice = 178.52;
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      price: basePrice + (Math.random() - 0.5) * 10,
    });
  }
  return data;
};

type TimeRange = '1D' | '1W' | '1M' | '3M' | '6M' | '1Y' | 'All';

export function StockDetailDemo() {
  const { stockId } = useParams();
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');
  
  // Progressive loading states
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [allocationLoaded, setAllocationLoaded] = useState(false);
  const [chartLoaded, setChartLoaded] = useState(false);
  const [snapshotLoaded, setSnapshotLoaded] = useState(false);
  const [companyInfoLoaded, setCompanyInfoLoaded] = useState(false);

  // Simulate progressive loading
  useEffect(() => {
    const timers = [
      setTimeout(() => setHeroLoaded(true), 500),
      setTimeout(() => setAllocationLoaded(true), 1000),
      setTimeout(() => setChartLoaded(true), 1300),
      setTimeout(() => setSnapshotLoaded(true), 1500),
      setTimeout(() => setCompanyInfoLoaded(true), 1800),
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  // Find stock data
  const stock = mockStocks.find(s => s.id === stockId);
  const userPosition = stock ? mockUserPositions[stock.code] : undefined;
  const corporateInfo = stock ? mockCorporateInfo[stock.code] : undefined;

  if (!stock) {
    return (
      <div className="p-4 md:p-8">
        <div className="max-w-[1400px] mx-auto">
          <GlassCard className="p-8 text-center">
            <h2 className="mb-2">Stock not found</h2>
            <button 
              onClick={() => navigate(-1)}
              className="text-primary hover:underline"
            >
              Go back
            </button>
          </GlassCard>
        </div>
      </div>
    );
  }

  const isPositive = stock.change >= 0;
  const isProfitable = userPosition && userPosition.profitLoss >= 0;
  
  // Calculate current value for allocation section
  const currentValue = userPosition 
    ? userPosition.totalLot * 100 * userPosition.currentPrice 
    : 0;

  // Generate chart data based on time range
  const timeRangeDays: Record<TimeRange, number> = {
    '1D': 1,
    '1W': 7,
    '1M': 30,
    '3M': 90,
    '6M': 180,
    '1Y': 365,
    'All': 730,
  };

  const chartData = generateChartData(timeRangeDays[timeRange]);

  return (
    <div className="p-4 md:p-8 pb-24 md:pb-8">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[14px] font-medium">Back</span>
        </button>

        {/* Stock Header Section with Skeleton */}
        {!heroLoaded ? (
          <GlassCard className="p-5 md:p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-5">
              <SkeletonCircle className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0" />
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-12 w-40 mt-3" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-7 w-24" />
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        ) : (
          <div className="animate-fade-in-up">
            <GlassCard className="p-5 md:p-8">
              <div className="flex flex-col md:flex-row md:items-start gap-5">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[28px] md:text-[36px] font-bold text-primary">
                    {stock.code.substring(0, 2)}
                  </span>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-[28px] md:text-[36px] font-bold text-foreground mb-1">
                      {stock.code}
                    </h1>
                    <p className="text-[16px] md:text-[18px] text-muted-foreground mb-3">
                      {stock.name}
                    </p>

                    <div className="flex flex-wrap items-end gap-4 mb-4">
                      <div>
                        <p className="text-[36px] md:text-[48px] font-bold text-foreground leading-none">
                          <AnimatedNumber value={stock.price} prefix="$" decimals={2} duration={800} />
                        </p>
                      </div>
                      <div className={`flex items-center gap-2 pb-2 ${
                        isPositive ? 'text-success' : 'text-destructive'
                      }`}>
                        {isPositive ? (
                          <TrendingUp className="w-6 h-6" />
                        ) : (
                          <TrendingDown className="w-6 h-6" />
                        )}
                        <span className="text-[24px] font-semibold">
                          {isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-[13px] px-3 py-1.5">
                      <Building2 className="w-3.5 h-3.5 mr-1.5" />
                      {stock.sector}
                    </Badge>
                    <Badge variant="secondary" className="text-[13px] px-3 py-1.5">
                      {stock.subSector}
                    </Badge>
                    <Badge variant="outline" className="text-[13px] px-3 py-1.5">
                      {stock.industry}
                    </Badge>
                    <Badge variant="outline" className="text-[13px] px-3 py-1.5">
                      {stock.subIndustry}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => navigate(`/orders/add?stock=${stock.id}`)}
                    >
                      <Plus className="w-4 h-4 mr-1.5" />
                      Add Order
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/portfolio')}
                    >
                      <Eye className="w-4 h-4 mr-1.5" />
                      View Orders
                    </Button>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Allocation Section with Skeleton */}
        {!allocationLoaded ? (
          <GlassCard className="p-5 md:p-6 border-2 border-primary/10">
            <div className="space-y-2 mb-5">
              <Skeleton className="h-6 w-56" />
              <Skeleton className="h-3 w-64" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-accent/30 rounded-xl p-4 space-y-2">
                  <Skeleton className="h-3 w-24" />
                  <Skeleton className="h-7 w-32" />
                </div>
              ))}
            </div>
          </GlassCard>
        ) : userPosition ? (
          <div className="animate-fade-in-up">
            <GlassCard className="p-5 md:p-6 border-2 border-primary/10">
              <h3 className="text-[20px] font-semibold text-foreground mb-1 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                Your Allocation in This Stock
              </h3>
              <p className="text-[13px] text-muted-foreground mb-5">
                Summary of your holdings and performance for {stock.code}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-5">
                <div className="bg-accent/30 rounded-xl p-4">
                  <p className="text-[12px] text-muted-foreground mb-1 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    Total Buy Amount
                  </p>
                  <p className="text-[20px] md:text-[24px] font-bold text-foreground">
                    <AnimatedNumber value={userPosition.totalBuy} prefix="$" decimals={0} />
                  </p>
                </div>

                <div className="bg-accent/30 rounded-xl p-4">
                  <p className="text-[12px] text-muted-foreground mb-1">Average Price</p>
                  <p className="text-[20px] md:text-[24px] font-bold text-primary">
                    <AnimatedNumber value={userPosition.averagePrice} prefix="$" decimals={2} />
                  </p>
                </div>

                <div className="bg-accent/30 rounded-xl p-4">
                  <p className="text-[12px] text-muted-foreground mb-1">Total Lot</p>
                  <p className="text-[20px] md:text-[24px] font-bold text-foreground">
                    <AnimatedNumber value={userPosition.totalLot} decimals={0} />
                  </p>
                </div>

                <div className="bg-accent/30 rounded-xl p-4">
                  <p className="text-[12px] text-muted-foreground mb-1">Current Value</p>
                  <p className="text-[20px] md:text-[24px] font-bold text-foreground">
                    <AnimatedNumber value={currentValue} prefix="$" decimals={0} />
                  </p>
                </div>

                <div className="bg-accent/30 rounded-xl p-4">
                  <p className="text-[12px] text-muted-foreground mb-1 flex items-center gap-1">
                    {isProfitable ? (
                      <TrendingUpIcon className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDownIcon className="w-3.5 h-3.5" />
                    )}
                    Unrealized P/L
                  </p>
                  <p className={`text-[24px] md:text-[28px] font-bold ${
                    isProfitable ? 'text-success' : 'text-destructive'
                  }`}>
                    {isProfitable ? '+' : ''}
                    <AnimatedNumber value={Math.abs(userPosition.profitLoss)} prefix="$" decimals={0} />
                  </p>
                </div>

                <div className="bg-accent/30 rounded-xl p-4">
                  <p className="text-[12px] text-muted-foreground mb-1">P/L Percentage</p>
                  <p className={`text-[24px] md:text-[28px] font-bold ${
                    isProfitable ? 'text-success' : 'text-destructive'
                  }`}>
                    {isProfitable ? '+' : ''}
                    <AnimatedNumber value={userPosition.profitLossPercent} suffix="%" decimals={2} />
                  </p>
                </div>
              </div>

              {/* Mini Performance Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[12px] text-muted-foreground">Invested</span>
                  <span className="text-[12px] text-muted-foreground">Current Value</span>
                </div>
                <div className="relative w-full h-3 bg-muted/30 rounded-full overflow-hidden">
                  <div 
                    className={`absolute inset-y-0 left-0 rounded-full transition-all ${
                      isProfitable 
                        ? 'bg-gradient-to-r from-success/50 to-success' 
                        : 'bg-gradient-to-r from-destructive/50 to-destructive'
                    }`}
                    style={{ 
                      width: isProfitable 
                        ? `${Math.min((currentValue / userPosition.totalBuy) * 100, 100)}%`
                        : `${Math.max((currentValue / userPosition.totalBuy) * 100, 0)}%`
                    }}
                  />
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-[13px] font-medium text-foreground">
                    ${userPosition.totalBuy.toLocaleString()}
                  </span>
                  <span className={`text-[13px] font-bold ${
                    isProfitable ? 'text-success' : 'text-destructive'
                  }`}>
                    ${currentValue.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/20 border border-border">
                <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Unrealized P/L</strong> shows potential profit or loss if you sell at current market price. 
                  This changes in real-time with the stock price.
                </p>
              </div>
            </GlassCard>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            <GlassCard className="p-5 md:p-6 border-2 border-primary/10">
              <h3 className="text-[20px] font-semibold text-foreground mb-1 flex items-center gap-2">
                <Wallet className="w-5 h-5 text-primary" />
                Your Allocation in This Stock
              </h3>
              <p className="text-[13px] text-muted-foreground mb-5">
                Summary of your holdings and performance for {stock.code}
              </p>
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-2xl bg-muted/30 flex items-center justify-center mx-auto mb-4">
                  <Wallet className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-[16px] font-medium text-foreground mb-2">
                  You don't have a position in this stock yet
                </p>
                <p className="text-[14px] text-muted-foreground mb-5">
                  Start investing by creating your first order
                </p>
                <Button
                  variant="primary"
                  onClick={() => navigate(`/orders/add?stock=${stock.id}`)}
                >
                  <Plus className="w-4 h-4 mr-1.5" />
                  Create First Order
                </Button>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Performance Chart with Skeleton */}
        {!chartLoaded ? (
          <GlassCard className="p-5 md:p-6">
            <div className="flex items-center justify-between mb-6">
              <Skeleton className="h-6 w-40" />
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <Skeleton key={i} className="h-8 w-12" />
                ))}
              </div>
            </div>
            <Skeleton className="h-[300px] md:h-[400px] w-full" />
          </GlassCard>
        ) : (
          <div className="animate-fade-in-up">
            <GlassCard className="p-5 md:p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <h3 className="text-[18px] font-semibold text-foreground">
                  Price Performance
                </h3>
                
                <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                  {(['1D', '1W', '1M', '3M', '6M', '1Y', 'All'] as TimeRange[]).map((range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all flex-shrink-0 ${
                        timeRange === range
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>

              <div className="h-[300px] md:h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="rgba(42, 40, 38, 0.1)"
                      vertical={false}
                    />
                    <XAxis 
                      dataKey="date" 
                      stroke="#8A8682"
                      style={{ fontSize: '12px' }}
                      tickMargin={10}
                    />
                    <YAxis 
                      stroke="#8A8682"
                      style={{ fontSize: '12px' }}
                      tickFormatter={(value) => `$${value.toFixed(0)}`}
                      tickMargin={10}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        border: 'none',
                        borderRadius: '12px',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        padding: '12px',
                      }}
                      labelStyle={{ color: '#2A2826', fontWeight: 600, marginBottom: '4px' }}
                      formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
                    />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#F97316"
                      strokeWidth={3}
                      dot={false}
                      activeDot={{ r: 6, fill: '#F97316' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Note: Remaining sections (Snapshot, Company Info) would follow the same pattern */}
        {/* This demonstrates the progressive loading concept */}
        
        {!snapshotLoaded && (
          <GlassCard className="p-5 md:p-6">
            <Skeleton className="h-6 w-32 mb-5" />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="p-4 rounded-xl bg-accent/30 space-y-2">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-6 w-24" />
                </div>
              ))}
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
