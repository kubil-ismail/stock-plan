import { useState } from 'react';
import { useNavigate } from 'react-router';
import { GlassCard } from '../components/glass-card';
import { Badge } from '../components/badge';
import { Button } from '../components/button';
import { Search, X, TrendingUp, TrendingDown, DollarSign, Briefcase, Target, TrendingUpIcon, Wallet, ArrowRight } from 'lucide-react';
import { mockPortfolioOngoing, mockPortfolioHistory } from '../lib/mock-data';

export function Portfolio() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'ongoing' | 'history'>('ongoing');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  // Simplified portfolio metrics
  const totalValue = 52890.45;
  const dailyChange = 1250.30;
  const dailyChangePercent = 2.42;
  const totalPL = 2450.75;
  const totalPLPercent = 4.85;
  const invested = 42350.00;
  const totalLot = 85;
  const totalStocks = 12;
  const winRate = 67;

  const filteredOngoing = mockPortfolioOngoing.filter(item =>
    item.stockCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.stockName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredHistory = mockPortfolioHistory.filter(item =>
    item.stockCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.stockName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handler for order click - navigate on mobile, show panel on desktop
  const handleOrderClick = (order: any) => {
    // Check if mobile (screen width < 1024px which is lg breakpoint)
    const isMobile = window.innerWidth < 1024;
    
    if (isMobile) {
      // Navigate to dedicated order detail page on mobile
      navigate(`/orders/${order.id}`);
    } else {
      // Show side panel on desktop
      setSelectedOrder(order);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[28px] md:text-[32px] font-bold text-foreground mb-2">Portfolio</h1>
        <p className="text-[14px] text-muted-foreground">
          Manage your positions and view trading history
        </p>
      </div>

      {/* Portfolio Summary - Single Ultra Minimal Card */}
      <GlassCard className="p-6 md:p-8">
        {/* Primary Focus Area */}
        <div className="mb-6 pb-6 border-b border-border">
          <p className="text-[13px] text-muted-foreground mb-2">Total Portfolio Value</p>
          <div className="flex items-end gap-4 mb-4">
            <p className="text-[40px] md:text-[48px] font-bold text-foreground leading-none">
              ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          
          {/* Daily Change & Total P/L */}
          <div className="flex flex-wrap items-center gap-6">
            <div>
              <p className="text-[12px] text-muted-foreground mb-1">Daily Change</p>
              <div className={`flex items-center gap-2 text-[20px] font-bold ${
                dailyChange > 0 ? 'text-success' : 'text-destructive'
              }`}>
                <span>{dailyChange > 0 ? '▲' : '▼'}</span>
                <span>{dailyChange > 0 ? '+' : ''}${Math.abs(dailyChange).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                <span className="text-[16px]">({dailyChangePercent > 0 ? '+' : ''}{dailyChangePercent}%)</span>
              </div>
            </div>
            
            <div>
              <p className="text-[12px] text-muted-foreground mb-1">Total Unrealized P/L</p>
              <div className={`flex items-center gap-2 text-[20px] font-bold ${
                totalPL > 0 ? 'text-success' : 'text-destructive'
              }`}>
                <span>{totalPL > 0 ? '▲' : '▼'}</span>
                <span>{totalPL > 0 ? '+' : ''}${Math.abs(totalPL).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                <span className="text-[16px]">({totalPLPercent > 0 ? '+' : ''}{totalPLPercent}%)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <div>
            <p className="text-[11px] text-muted-foreground mb-1">Invested</p>
            <p className="text-[16px] font-semibold text-foreground">
              ${invested.toLocaleString('en-US', { minimumFractionDigits: 0 })}
            </p>
          </div>
          
          <div>
            <p className="text-[11px] text-muted-foreground mb-1">Total Lot</p>
            <p className="text-[16px] font-semibold text-foreground">
              {totalLot}
            </p>
          </div>
          
          <div>
            <p className="text-[11px] text-muted-foreground mb-1">Total Stocks</p>
            <p className="text-[16px] font-semibold text-foreground">
              {totalStocks}
            </p>
          </div>
          
          <div>
            <p className="text-[11px] text-muted-foreground mb-1">Win Rate</p>
            <p className="text-[16px] font-semibold text-primary">
              {winRate}%
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeTab === 'ongoing' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('ongoing')}
        >
          Ongoing ({mockPortfolioOngoing.length})
        </Button>
        <Button
          variant={activeTab === 'history' ? 'primary' : 'outline'}
          onClick={() => setActiveTab('history')}
        >
          History ({mockPortfolioHistory.length})
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search by code or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-[10px] border border-border bg-input-background text-[14px] focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </div>

            {activeTab === 'ongoing' ? (
              <div className="space-y-3">
                {filteredOngoing.map((order) => (
                  <button
                    key={order.id}
                    onClick={() => handleOrderClick(order)}
                    className="w-full text-left p-4 rounded-lg bg-accent/30 hover:bg-accent transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                          <span className="text-[12px] font-bold text-primary">
                            {order.stockCode.substring(0, 2)}
                          </span>
                        </div>
                        <div>
                          <p className="text-[14px] font-semibold text-foreground">
                            {order.stockCode}
                          </p>
                          <p className="text-[12px] text-muted-foreground">
                            {order.action} • {order.lot} lots
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-[14px] font-semibold text-foreground">
                          ${order.targetPrice.toFixed(2)}
                        </p>
                        <Badge 
                          variant={order.status === 'Active' ? 'success' : 'warning'}
                          size="sm"
                        >
                          {order.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-[12px] text-muted-foreground">
                      <span>Expires: {order.expiry}</span>
                      <span>Current: ${order.currentPrice.toFixed(2)}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {filteredHistory.map((order) => {
                  const isProfit = order.realizedGain > 0;
                  return (
                    <button
                      key={order.id}
                      onClick={() => handleOrderClick(order)}
                      className="w-full text-left p-4 rounded-lg bg-accent/30 hover:bg-accent transition-colors"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                            <span className="text-[12px] font-bold text-primary">
                              {order.stockCode.substring(0, 2)}
                            </span>
                          </div>
                          <div>
                            <p className="text-[14px] font-semibold text-foreground">
                              {order.stockCode}
                            </p>
                            <p className="text-[12px] text-muted-foreground">
                              {order.action} • {order.lot} lots
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-[16px] font-bold ${
                            isProfit ? 'text-success' : 'text-destructive'
                          }`}>
                            {isProfit ? '+' : ''}${order.realizedGain.toFixed(2)}
                          </p>
                          <Badge variant={isProfit ? 'success' : 'danger'} size="sm">
                            {order.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-[12px] text-muted-foreground">
                        <span>Entry: ${order.entryPrice.toFixed(2)}</span>
                        <span>Exit: ${order.exitPrice.toFixed(2)}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}

            {((activeTab === 'ongoing' && filteredOngoing.length === 0) ||
              (activeTab === 'history' && filteredHistory.length === 0)) && (
              <p className="text-center text-muted-foreground py-12">
                No orders found
              </p>
            )}
          </GlassCard>
        </div>

        {/* Order Detail Panel - Hidden on mobile, visible on desktop */}
        <div className="hidden lg:block">
          {selectedOrder ? (
            <GlassCard className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[18px] font-semibold text-foreground">Order Details</h3>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="w-8 h-8 rounded-lg hover:bg-accent flex items-center justify-center transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Stock Info */}
                <div className="flex items-center gap-3 p-4 rounded-lg bg-accent/50">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <span className="text-[14px] font-bold text-primary">
                      {selectedOrder.stockCode.substring(0, 2)}
                    </span>
                  </div>
                  <div>
                    <p className="text-[16px] font-semibold text-foreground">
                      {selectedOrder.stockCode}
                    </p>
                    <p className="text-[13px] text-muted-foreground">
                      {selectedOrder.stockName}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div>
                  <p className="text-[12px] text-muted-foreground mb-1">Status</p>
                  <Badge 
                    variant={
                      selectedOrder.status === 'Active' ? 'success' :
                      selectedOrder.status === 'Completed' ? 'info' :
                      'warning'
                    }
                  >
                    {selectedOrder.status}
                  </Badge>
                </div>

                {/* Details */}
                <div className="space-y-3 pt-3 border-t border-border">
                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">Action</p>
                    <p className="text-[14px] font-medium text-foreground">{selectedOrder.action}</p>
                  </div>
                  
                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">Lot Size</p>
                    <p className="text-[14px] font-medium text-foreground">{selectedOrder.lot} lots</p>
                  </div>

                  {activeTab === 'ongoing' ? (
                    <>
                      <div>
                        <p className="text-[12px] text-muted-foreground mb-1">Target Price</p>
                        <p className="text-[14px] font-medium text-foreground">
                          ${selectedOrder.targetPrice.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[12px] text-muted-foreground mb-1">Current Price</p>
                        <p className="text-[14px] font-medium text-foreground">
                          ${selectedOrder.currentPrice.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[12px] text-muted-foreground mb-1">Target Execution</p>
                        <p className="text-[14px] font-medium text-foreground">
                          {selectedOrder.targetExecutionTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-[12px] text-muted-foreground mb-1">Expiry</p>
                        <p className="text-[14px] font-medium text-foreground">
                          {selectedOrder.expiry}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-[12px] text-muted-foreground mb-1">Entry Price</p>
                        <p className="text-[14px] font-medium text-foreground">
                          ${selectedOrder.entryPrice.toFixed(2)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[12px] text-muted-foreground mb-1">Exit Price</p>
                        <p className="text-[14px] font-medium text-foreground">
                          ${selectedOrder.exitPrice.toFixed(2)}
                        </p>
                      </div>
                      <div className="pt-3 border-t border-border">
                        <p className="text-[12px] text-muted-foreground mb-1">Realized Gain</p>
                        <p className={`text-[20px] font-bold ${
                          selectedOrder.realizedGain > 0 ? 'text-success' : 'text-destructive'
                        }`}>
                          {selectedOrder.realizedGain > 0 ? '+' : ''}
                          ${selectedOrder.realizedGain.toFixed(2)}
                        </p>
                      </div>
                    </>
                  )}

                  <div>
                    <p className="text-[12px] text-muted-foreground mb-1">Setup Used</p>
                    <Badge variant="secondary">{selectedOrder.setupUsed}</Badge>
                  </div>
                </div>
              </div>
            </GlassCard>
          ) : (
            <GlassCard className="p-6">
              <p className="text-[14px] text-muted-foreground text-center py-8">
                Select an order to view details
              </p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
}