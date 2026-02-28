import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { GlassCard } from '../components/glass-card';
import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { MiniChart } from '../components/mini-chart';
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
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
  TrendingUp, 
  TrendingDown, 
  ArrowLeft,
  Building2,
  Users,
  Briefcase,
  Shield,
  Network,
  Plus,
  Eye,
  Info,
  DollarSign,
  Wallet,
  TrendingDown as TrendingDownIcon,
  TrendingUp as TrendingUpIcon,
  Globe,
  Calendar,
  Bookmark,
} from 'lucide-react';
import { mockStocks, mockUserPositions, mockCorporateInfo } from '../lib/mock-data';
import { useDetailNavbar } from '../contexts/detail-navbar-context';

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

export function StockDetail() {
  const { stockId } = useParams();
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState<TimeRange>('1M');
  const { setNavbar, clearNavbar } = useDetailNavbar();

  // Find stock data
  const stock = mockStocks.find(s => s.id === stockId);
  const userPosition = stock ? mockUserPositions[stock.code] : undefined;
  const corporateInfo = stock ? mockCorporateInfo[stock.code] : undefined;

  // Set detail navbar title
  useEffect(() => {
    if (stock) {
      setNavbar({
        title: stock.code,
        showAction: true,
        actionType: 'bookmark',
        onAction: () => {
          // Bookmark action (mock)
          console.log('Bookmarked', stock.code);
        },
      });
    }
    return () => clearNavbar();
  }, [stock, setNavbar, clearNavbar]);

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
    <div className="px-4 md:px-6 py-6 md:py-8 pb-24 md:pb-8">
      <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-8">
        {/* Back Button - Desktop Only */}
        <button
          onClick={() => navigate(-1)}
          className="hidden md:flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[14px] font-medium">Back</span>
        </button>

        {/* Stock Header Section */}
        <GlassCard className="p-5 md:p-8">
          <div className="flex flex-col md:flex-row md:items-start gap-5 md:gap-6">
            {/* Large Stock Logo */}
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-[28px] md:text-[36px] font-bold text-primary">
                {stock.code.substring(0, 2)}
              </span>
            </div>

            <div className="flex-1 space-y-5">
              {/* Stock Info */}
              <div>
                <h1 className="text-[28px] md:text-[36px] font-bold text-foreground mb-1">
                  {stock.code}
                </h1>
                <p className="text-[16px] md:text-[18px] text-muted-foreground mb-4">
                  {stock.name}
                </p>

                {/* Price and Change */}
                <div className="flex flex-wrap items-end gap-4 mb-4">
                  <div>
                    <p className="text-[36px] md:text-[48px] font-bold text-foreground leading-none">
                      ${stock.price.toFixed(2)}
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
                    <span className="text-[18px] font-medium">
                      ({isPositive ? '+' : ''}${stock.change.toFixed(2)})
                    </span>
                  </div>
                </div>
              </div>

              {/* Metadata Badges */}
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

              {/* Quick CTAs */}
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

        {/* Your Asset Allocation in This Stock */}
        <GlassCard className="p-5 md:p-6 border-2 border-primary/10">
          <h3 className="text-[20px] font-semibold text-foreground mb-1 flex items-center gap-2">
            <Wallet className="w-5 h-5 text-primary" />
            Your Allocation in This Stock
          </h3>
          <p className="text-[13px] text-muted-foreground mb-5">
            Summary of your holdings and performance for {stock.code}
          </p>

          {userPosition ? (
            <>
              {/* Allocation Summary Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-5">
                <div className="bg-accent/30 rounded-xl p-4">
                  <p className="text-[12px] text-muted-foreground mb-1 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    Total Buy Amount
                  </p>
                  <p className="text-[20px] md:text-[24px] font-bold text-foreground">
                    ${userPosition.totalBuy.toLocaleString()}
                  </p>
                </div>

                <div className="bg-accent/30 rounded-xl p-4">
                  <p className="text-[12px] text-muted-foreground mb-1">Average Price</p>
                  <p className="text-[20px] md:text-[24px] font-bold text-primary">
                    ${userPosition.averagePrice.toFixed(2)}
                  </p>
                </div>

                <div className="bg-accent/30 rounded-xl p-4">
                  <p className="text-[12px] text-muted-foreground mb-1">Total Lot</p>
                  <p className="text-[20px] md:text-[24px] font-bold text-foreground">
                    {userPosition.totalLot}
                  </p>
                </div>

                <div className="bg-accent/30 rounded-xl p-4">
                  <p className="text-[12px] text-muted-foreground mb-1">Current Value</p>
                  <p className="text-[20px] md:text-[24px] font-bold text-foreground">
                    ${currentValue.toLocaleString()}
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
                    {isProfitable ? '+' : ''}${Math.abs(userPosition.profitLoss).toLocaleString()}
                  </p>
                </div>

                <div className="bg-accent/30 rounded-xl p-4">
                  <p className="text-[12px] text-muted-foreground mb-1">P/L Percentage</p>
                  <p className={`text-[24px] md:text-[28px] font-bold ${
                    isProfitable ? 'text-success' : 'text-destructive'
                  }`}>
                    {isProfitable ? '+' : ''}{userPosition.profitLossPercent.toFixed(2)}%
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

              {/* Beginner Helper Text */}
              <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/20 border border-border">
                <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <p className="text-[12px] text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Unrealized P/L</strong> shows potential profit or loss if you sell at current market price. 
                  This changes in real-time with the stock price.
                </p>
              </div>
            </>
          ) : (
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
          )}
        </GlassCard>

        {/* Stock Performance Chart */}
        <GlassCard className="p-5 md:p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <h3 className="text-[18px] font-semibold text-foreground">
              Price Performance
            </h3>
            
            {/* Time Range Filter */}
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

          {/* Chart */}
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

        {/* Stock Snapshot Section */}
        <GlassCard className="p-5 md:p-6">
          <h3 className="text-[18px] font-semibold text-foreground mb-5">
            Stock Snapshot
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-accent/30">
              <p className="text-[12px] text-muted-foreground mb-1">Market Cap</p>
              <p className="text-[18px] md:text-[20px] font-bold text-foreground">
                ${stock.marketCap}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-accent/30">
              <p className="text-[12px] text-muted-foreground mb-1">P/E Ratio</p>
              <p className="text-[18px] md:text-[20px] font-bold text-foreground">
                {stock.peRatio}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-accent/30">
              <p className="text-[12px] text-muted-foreground mb-1">Dividend Yield</p>
              <p className="text-[18px] md:text-[20px] font-bold text-foreground">
                {stock.dividendYield}
              </p>
            </div>
            <div className="p-4 rounded-xl bg-accent/30">
              <p className="text-[12px] text-muted-foreground mb-1">Volume</p>
              <p className="text-[18px] md:text-[20px] font-bold text-foreground">
                {stock.volume}
              </p>
            </div>
          </div>
        </GlassCard>

        {/* Company Information Section */}
        <GlassCard className="p-5 md:p-6">
          <h3 className="text-[20px] font-semibold text-foreground mb-1 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-primary" />
            Company Information
          </h3>
          <p className="text-[13px] text-muted-foreground mb-6">
            Detailed corporate structure and fundamentals
          </p>

          {/* Company Overview */}
          <div className="mb-6 pb-6 border-b border-border">
            <h4 className="text-[16px] font-semibold text-foreground mb-3">Company Profile</h4>
            <p className="text-[14px] text-muted-foreground leading-relaxed mb-4">
              {stock.overview}
            </p>
            
            {/* Corporate Details */}
            {corporateInfo && (
              <div className="grid md:grid-cols-3 gap-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/20">
                  <Building2 className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-[12px] text-muted-foreground mb-0.5">Headquarters</p>
                    <p className="text-[14px] font-medium text-foreground">
                      {corporateInfo.headquarters || 'Jakarta, Indonesia'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/20">
                  <Calendar className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-[12px] text-muted-foreground mb-0.5">Founded</p>
                    <p className="text-[14px] font-medium text-foreground">
                      {corporateInfo.founded || '1990'}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-accent/20">
                  <Globe className="w-4 h-4 text-primary mt-0.5" />
                  <div>
                    <p className="text-[12px] text-muted-foreground mb-0.5">Website</p>
                    <a 
                      href={corporateInfo.website || '#'} 
                      className="text-[14px] font-medium text-primary hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Corporate Structure - Desktop */}
          {corporateInfo && (
            <div className="hidden md:block space-y-6">
              {/* Secretary */}
              <div>
                <h4 className="text-[16px] font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Company Secretary / Sekretaris Perusahaan
                </h4>
                <div className="bg-muted/20 rounded-xl p-4">
                  <p className="text-[14px] font-medium text-foreground">
                    {corporateInfo.secretary}
                  </p>
                </div>
              </div>

              {/* Shareholders */}
              <div>
                <h4 className="text-[16px] font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  Shareholders / Pemegang Saham
                </h4>
                <div className="space-y-3">
                  {corporateInfo.shareholders.map((shareholder, index) => (
                    <div key={index} className="bg-muted/20 rounded-xl p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-[14px] font-medium text-foreground flex-1 flex items-center flex-wrap gap-2">
                          <span>{shareholder.name}</span>
                          {index === 0 && (
                            <Badge variant="secondary" className="text-[11px] px-2 py-0.5">
                              Major Shareholder
                            </Badge>
                          )}
                        </div>
                        <p className="text-[16px] font-bold text-primary ml-4">
                          {shareholder.percentage.toFixed(2)}%
                        </p>
                      </div>
                      {/* Visual bar indicator */}
                      <div className="w-full h-2 bg-muted/40 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                          style={{ width: `${shareholder.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Directors */}
              <div>
                <h4 className="text-[16px] font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-primary" />
                  Board of Directors / Direksi
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {corporateInfo.directors.map((director, index) => (
                    <div key={index} className="bg-muted/20 rounded-xl p-4 flex items-start gap-3">
                      {/* Avatar Placeholder */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[14px] font-bold text-primary">
                          {director.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-foreground mb-0.5">
                          {director.name}
                        </p>
                        <p className="text-[13px] text-muted-foreground">
                          {director.position}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commissioners */}
              <div>
                <h4 className="text-[16px] font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Board of Commissioners / Komisaris
                </h4>
                <div className="grid md:grid-cols-2 gap-3">
                  {corporateInfo.commissioners.map((commissioner, index) => (
                    <div key={index} className="bg-muted/20 rounded-xl p-4 flex items-start gap-3">
                      {/* Avatar Placeholder */}
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-[14px] font-bold text-primary">
                          {commissioner.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="text-[14px] font-semibold text-foreground mb-0.5">
                          {commissioner.name}
                        </p>
                        <p className="text-[13px] text-muted-foreground">
                          {commissioner.position}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subsidiaries */}
              <div>
                <h4 className="text-[16px] font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Network className="w-4 h-4 text-primary" />
                  Subsidiaries / Anak Perusahaan
                </h4>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {corporateInfo.subsidiaries.map((subsidiary, index) => (
                    <div key={index} className="bg-muted/20 rounded-xl p-3 flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center flex-shrink-0">
                        <Network className="w-4 h-4 text-primary" />
                      </div>
                      <p className="text-[13px] font-medium text-foreground">
                        {subsidiary}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Corporate Structure - Mobile (Accordion) */}
          {corporateInfo && (
            <div className="md:hidden">
              <Accordion type="single" collapsible className="space-y-2">
                {/* Corporate Profile */}
                <AccordionItem value="profile" className="border border-border rounded-xl overflow-hidden bg-card/30">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <span className="flex items-center gap-2 text-[15px] font-semibold">
                      <Building2 className="w-4 h-4 text-primary" />
                      Corporate Profile
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <div className="space-y-2 mt-2">
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/20">
                        <Building2 className="w-4 h-4 text-primary mt-0.5" />
                        <div>
                          <p className="text-[12px] text-muted-foreground mb-0.5">Headquarters</p>
                          <p className="text-[13px] font-medium text-foreground">
                            {corporateInfo.headquarters || 'Jakarta, Indonesia'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-accent/20">
                        <Calendar className="w-4 h-4 text-primary mt-0.5" />
                        <div>
                          <p className="text-[12px] text-muted-foreground mb-0.5">Founded</p>
                          <p className="text-[13px] font-medium text-foreground">
                            {corporateInfo.founded || '1990'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Secretary */}
                <AccordionItem value="secretary" className="border border-border rounded-xl overflow-hidden bg-card/30">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <span className="flex items-center gap-2 text-[15px] font-semibold">
                      <Briefcase className="w-4 h-4 text-primary" />
                      Company Secretary
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <div className="bg-muted/20 rounded-xl p-3 mt-2">
                      <p className="text-[14px] font-medium text-foreground">
                        {corporateInfo.secretary}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Shareholders */}
                <AccordionItem value="shareholders" className="border border-border rounded-xl overflow-hidden bg-card/30">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <span className="flex items-center gap-2 text-[15px] font-semibold">
                      <Users className="w-4 h-4 text-primary" />
                      Shareholders
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <div className="space-y-2 mt-2">
                      {corporateInfo.shareholders.map((shareholder, index) => (
                        <div key={index} className="bg-muted/20 rounded-xl p-3">
                          <div className="flex justify-between items-start mb-2">
                            <p className="text-[13px] font-medium text-foreground flex-1">
                              {shareholder.name}
                            </p>
                            <p className="text-[13px] font-bold text-primary ml-2">
                              {shareholder.percentage.toFixed(2)}%
                            </p>
                          </div>
                          <div className="w-full h-1.5 bg-muted/40 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                              style={{ width: `${shareholder.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Directors */}
                <AccordionItem value="directors" className="border border-border rounded-xl overflow-hidden bg-card/30">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <span className="flex items-center gap-2 text-[15px] font-semibold">
                      <Briefcase className="w-4 h-4 text-primary" />
                      Board of Directors
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <div className="space-y-2 mt-2">
                      {corporateInfo.directors.map((director, index) => (
                        <div key={index} className="bg-muted/20 rounded-xl p-3 flex items-start gap-2">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[12px] font-bold text-primary">
                              {director.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </span>
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold text-foreground mb-0.5">
                              {director.name}
                            </p>
                            <p className="text-[12px] text-muted-foreground">
                              {director.position}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Commissioners */}
                <AccordionItem value="commissioners" className="border border-border rounded-xl overflow-hidden bg-card/30">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <span className="flex items-center gap-2 text-[15px] font-semibold">
                      <Shield className="w-4 h-4 text-primary" />
                      Board of Commissioners
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <div className="space-y-2 mt-2">
                      {corporateInfo.commissioners.map((commissioner, index) => (
                        <div key={index} className="bg-muted/20 rounded-xl p-3 flex items-start gap-2">
                          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-[12px] font-bold text-primary">
                              {commissioner.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                            </span>
                          </div>
                          <div>
                            <p className="text-[13px] font-semibold text-foreground mb-0.5">
                              {commissioner.name}
                            </p>
                            <p className="text-[12px] text-muted-foreground">
                              {commissioner.position}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Subsidiaries */}
                <AccordionItem value="subsidiaries" className="border border-border rounded-xl overflow-hidden bg-card/30">
                  <AccordionTrigger className="px-4 hover:no-underline">
                    <span className="flex items-center gap-2 text-[15px] font-semibold">
                      <Network className="w-4 h-4 text-primary" />
                      Subsidiaries
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-4">
                    <div className="space-y-2 mt-2">
                      {corporateInfo.subsidiaries.map((subsidiary, index) => (
                        <div key={index} className="bg-muted/20 rounded-xl p-2.5 flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center flex-shrink-0">
                            <Network className="w-3.5 h-3.5 text-primary" />
                          </div>
                          <p className="text-[12px] font-medium text-foreground">
                            {subsidiary}
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
}