import { Link } from 'react-router';
import { GlassCard } from '../components/glass-card';
import { Badge } from '../components/badge';
import { ArrowLeft, TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

export function Performance() {
  // Mock equity growth data
  const equityData = [
    { date: 'Jan', value: 45000 },
    { date: 'Feb', value: 46500 },
    { date: 'Mar', value: 45800 },
    { date: 'Apr', value: 48200 },
    { date: 'May', value: 49500 },
    { date: 'Jun', value: 50100 },
    { date: 'Jul', value: 51200 },
    { date: 'Aug', value: 52890 },
  ];

  // Mock portfolio allocation by stock
  const stockAllocations = [
    { code: 'AAPL', name: 'Apple Inc.', allocation: 25, value: 13222.61 },
    { code: 'GOOGL', name: 'Alphabet Inc.', allocation: 18, value: 9520.28 },
    { code: 'MSFT', name: 'Microsoft Corporation', allocation: 15, value: 7933.57 },
    { code: 'AMZN', name: 'Amazon.com Inc.', allocation: 12, value: 6346.85 },
    { code: 'TSLA', name: 'Tesla Inc.', allocation: 10, value: 5289.05 },
    { code: 'Others', name: 'Other Stocks', allocation: 20, value: 10577.09 },
  ];

  // Mock sector allocation
  const sectorAllocations = [
    { name: 'Technology', value: 45, color: '#F97316' },
    { name: 'Financial', value: 20, color: '#D4704B' },
    { name: 'Healthcare', value: 15, color: '#6B9E7A' },
    { name: 'Consumer', value: 12, color: '#FCA778' },
    { name: 'Energy', value: 8, color: '#E8B87D' },
  ];

  const stockColors = ['#F97316', '#D4704B', '#6B9E7A', '#FCA778', '#E8B87D', '#E8E4DE'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          to="/portfolio"
          className="inline-flex items-center gap-2 text-[14px] text-primary hover:text-primary/80 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div>
            <h1 className="text-[24px] md:text-[32px] font-bold text-foreground mb-2">Performance</h1>
            <p className="text-[14px] text-muted-foreground">
              Track your portfolio growth and asset allocation
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-[12px] text-muted-foreground mb-1">Total Equity</p>
            <p className="text-[24px] md:text-[28px] font-bold text-foreground">$52,890.45</p>
            <div className="flex items-center gap-1 text-[13px] font-medium text-success">
              <TrendingUp className="w-3.5 h-3.5" />
              +8.5% this month
            </div>
          </div>
        </div>
      </div>

      {/* Equity Growth Chart */}
      <GlassCard className="p-4 md:p-6">
        <h2 className="text-[18px] md:text-[20px] font-semibold text-foreground mb-4 md:mb-6">Total Equity Growth</h2>
        <div className="h-[250px] md:h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={equityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
              <XAxis 
                dataKey="date" 
                stroke="#8A8682"
                style={{ fontSize: '12px' }}
              />
              <YAxis 
                stroke="#8A8682"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.95)',
                  border: '1px solid rgba(42, 40, 38, 0.1)',
                  borderRadius: '10px',
                  padding: '8px 12px',
                }}
                formatter={(value: any) => [`$${value.toLocaleString()}`, 'Equity']}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#F97316"
                strokeWidth={3}
                dot={{ fill: '#F97316', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Allocation by Stock */}
        <GlassCard className="p-6">
          <h2 className="text-[20px] font-semibold text-foreground mb-6">
            Portfolio Allocation
          </h2>

          {/* Donut Chart */}
          <div className="h-[250px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stockAllocations}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="allocation"
                >
                  {stockAllocations.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={stockColors[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(42, 40, 38, 0.1)',
                    borderRadius: '10px',
                    padding: '8px 12px',
                  }}
                  formatter={(value: any) => [`${value}%`, 'Allocation']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Stock List */}
          <div className="space-y-3">
            {stockAllocations.map((stock, index) => (
              <div key={stock.code} className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: stockColors[index] }}
                  />
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-primary">
                        {stock.code.substring(0, 2)}
                      </span>
                    </div>
                    <div>
                      <p className="text-[13px] font-semibold text-foreground">{stock.code}</p>
                      <p className="text-[11px] text-muted-foreground">{stock.name}</p>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[14px] font-semibold text-foreground">{stock.allocation}%</p>
                  <p className="text-[11px] text-muted-foreground">
                    ${stock.value.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Sector Allocation */}
        <GlassCard className="p-6">
          <h2 className="text-[20px] font-semibold text-foreground mb-6">
            Sector Allocation
          </h2>

          {/* Donut Chart */}
          <div className="h-[250px] mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sectorAllocations}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {sectorAllocations.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid rgba(42, 40, 38, 0.1)',
                    borderRadius: '10px',
                    padding: '8px 12px',
                  }}
                  formatter={(value: any) => [`${value}%`, 'Allocation']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Sector List */}
          <div className="space-y-3">
            {sectorAllocations.map((sector) => (
              <div key={sector.name} className="flex items-center justify-between p-3 rounded-lg bg-accent/30">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: sector.color }}
                  />
                  <p className="text-[13px] font-medium text-foreground">{sector.name}</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full transition-all duration-300"
                      style={{ 
                        width: `${sector.value}%`,
                        backgroundColor: sector.color
                      }}
                    />
                  </div>
                  <p className="text-[14px] font-semibold text-foreground w-10 text-right">
                    {sector.value}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-5">
          <p className="text-[12px] text-muted-foreground mb-2">Total Invested</p>
          <p className="text-[24px] font-bold text-foreground">$42,350.00</p>
          <p className="text-[12px] text-muted-foreground mt-1">
            Across {stockAllocations.length} positions
          </p>
        </GlassCard>

        <GlassCard className="p-5">
          <p className="text-[12px] text-muted-foreground mb-2">Average Return</p>
          <p className="text-[24px] font-bold text-success">+12.3%</p>
          <p className="text-[12px] text-muted-foreground mt-1">
            Per position
          </p>
        </GlassCard>

        <GlassCard className="p-5">
          <p className="text-[12px] text-muted-foreground mb-2">Best Performer</p>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="text-[10px] font-bold text-primary">AP</span>
            </div>
            <div>
              <p className="text-[16px] font-bold text-foreground">AAPL</p>
              <p className="text-[12px] font-medium text-success">+25.4%</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}