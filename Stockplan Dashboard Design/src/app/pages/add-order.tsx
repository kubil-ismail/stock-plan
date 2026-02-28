import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { GlassCard } from '../components/glass-card';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { Badge } from '../components/badge';
import { 
  ArrowLeft, 
  TrendingUp, 
  TrendingDown,
  AlertCircle,
  Plus,
} from 'lucide-react';
import { mockStocks, mockBrokers, mockSetups, availableBrokers } from '../lib/mock-data';
import { toast } from 'sonner';

export function AddOrder() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Get stock from URL param or use default
  const stockIdParam = searchParams.get('stock');
  const defaultStock = stockIdParam 
    ? mockStocks.find(s => s.id === stockIdParam) 
    : mockStocks[0];

  const [selectedStock, setSelectedStock] = useState(defaultStock);
  const [orderType, setOrderType] = useState<'BUY' | 'SELL'>('BUY');
  const [broker, setBroker] = useState('');
  const [lot, setLot] = useState('');
  const [targetPrice, setTargetPrice] = useState('');
  const [executionTime, setExecutionTime] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [selectedSetup, setSelectedSetup] = useState('');

  if (!selectedStock) return null;

  const isPositive = selectedStock.change >= 0;
  const totalAmount = lot && targetPrice 
    ? (parseInt(lot) * 100 * parseFloat(targetPrice)).toFixed(2)
    : '0.00';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!broker) {
      toast.error('Please select a broker');
      return;
    }

    if (!lot || !targetPrice || !executionTime || !expiryDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Mock order submission
    toast.success('Order created successfully!');
    navigate('/portfolio');
  };

  return (
    <div className="px-4 md:px-6 py-6 md:py-8 pb-24 md:pb-8">
      <div className="max-w-[1000px] mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-2"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-[14px] font-medium">Back</span>
        </button>

        <div>
          <h1 className="text-[24px] md:text-[32px] font-bold text-foreground mb-2">
            Add New Order
          </h1>
          <p className="text-[14px] text-muted-foreground">
            Create a new trading order with your preferred setup
          </p>
        </div>

        {/* Stock Preview */}
        <GlassCard className="p-5 md:p-6">
          <div className="flex items-start gap-4">
            {/* Stock Logo */}
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-[20px] font-bold text-primary">
                {selectedStock.code.substring(0, 2)}
              </span>
            </div>

            <div className="flex-1">
              <h3 className="text-[20px] font-bold text-foreground mb-1">
                {selectedStock.code}
              </h3>
              <p className="text-[14px] text-muted-foreground mb-3">
                {selectedStock.name}
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div>
                  <p className="text-[24px] md:text-[28px] font-bold text-foreground">
                    ${selectedStock.price.toFixed(2)}
                  </p>
                </div>
                <div className={`flex items-center gap-1 ${
                  isPositive ? 'text-success' : 'text-destructive'
                }`}>
                  {isPositive ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : (
                    <TrendingDown className="w-5 h-5" />
                  )}
                  <span className="text-[18px] font-semibold">
                    {isPositive ? '+' : ''}{selectedStock.changePercent.toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        {/* Order Form */}
        <form onSubmit={handleSubmit}>
          <GlassCard className="p-5 md:p-6">
            <h3 className="text-[18px] font-semibold text-foreground mb-5">
              Order Details
            </h3>

            <div className="space-y-5">
              {/* Order Type Toggle */}
              <div>
                <label className="block text-[14px] font-medium text-foreground mb-2">
                  Order Type
                </label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('BUY')}
                    className={`flex-1 py-3 px-4 rounded-lg text-[14px] font-semibold transition-all ${
                      orderType === 'BUY'
                        ? 'bg-success text-white shadow-md'
                        : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                    }`}
                  >
                    Buy
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('SELL')}
                    className={`flex-1 py-3 px-4 rounded-lg text-[14px] font-semibold transition-all ${
                      orderType === 'SELL'
                        ? 'bg-destructive text-white shadow-md'
                        : 'bg-muted/30 text-muted-foreground hover:bg-muted/50'
                    }`}
                  >
                    Sell
                  </button>
                </div>
              </div>

              {/* Broker Selection */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[14px] font-medium text-foreground">
                    Broker / Beli Dari Mana
                  </label>
                  <button
                    type="button"
                    onClick={() => navigate('/profile?section=brokers')}
                    className="text-[13px] text-primary hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Broker
                  </button>
                </div>
                <select
                  value={broker}
                  onChange={(e) => setBroker(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-[10px] border border-border bg-input-background text-[14px] focus:outline-none focus:ring-2 focus:ring-ring transition-all"
                >
                  <option value="">Pilih Sekuritas</option>
                  {mockBrokers.map((b) => (
                    <option key={b.id} value={b.name}>
                      {b.name}
                    </option>
                  ))}
                </select>
                {!broker && (
                  <div className="mt-2 flex items-start gap-2 text-muted-foreground text-[12px]">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <p>
                      Tambahkan sekuritas di Profile jika belum tersedia
                    </p>
                  </div>
                )}
              </div>

              {/* Lot & Target Price */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium text-foreground mb-2">
                    Lot
                  </label>
                  <input
                    type="number"
                    value={lot}
                    onChange={(e) => setLot(e.target.value)}
                    placeholder="Enter lot amount"
                    min="1"
                    className="w-full px-3 py-2.5 rounded-[10px] border border-border bg-input-background text-[14px] focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-foreground mb-2">
                    Target Price ($)
                  </label>
                  <input
                    type="number"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    placeholder="Enter target price"
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2.5 rounded-[10px] border border-border bg-input-background text-[14px] focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Total Amount (Readonly) */}
              <div>
                <label className="block text-[14px] font-medium text-foreground mb-2">
                  Total Amount
                </label>
                <div className="w-full px-3 py-2.5 rounded-[10px] border border-border bg-muted/30 text-[14px]">
                  <span className="text-[18px] font-bold text-foreground">
                    ${totalAmount}
                  </span>
                </div>
              </div>

              {/* Execution Time & Expiry Date */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[14px] font-medium text-foreground mb-2">
                    Target Execution Time
                  </label>
                  <input
                    type="datetime-local"
                    value={executionTime}
                    onChange={(e) => setExecutionTime(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-[10px] border border-border bg-input-background text-[14px] focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-[14px] font-medium text-foreground mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-[10px] border border-border bg-input-background text-[14px] focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>

              {/* Select Setup */}
              <div>
                <label className="block text-[14px] font-medium text-foreground mb-2">
                  Select Setup (Optional)
                </label>
                <select
                  value={selectedSetup}
                  onChange={(e) => setSelectedSetup(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-[10px] border border-border bg-input-background text-[14px] focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">No setup selected</option>
                  {mockSetups.map((setup) => (
                    <option key={setup.id} value={setup.id}>
                      {setup.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </GlassCard>

          {/* Live Preview Card */}
          {broker && lot && targetPrice && (
            <GlassCard className="p-5 md:p-6 border-2 border-primary/20">
              <h3 className="text-[16px] font-semibold text-foreground mb-3">
                Order Preview
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-muted-foreground">Action</span>
                  <Badge 
                    variant={orderType === 'BUY' ? 'success' : 'destructive'}
                    className="text-[13px]"
                  >
                    {orderType}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-muted-foreground">Broker</span>
                  <span className="text-[14px] font-medium text-foreground">{broker}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-muted-foreground">Stock</span>
                  <span className="text-[14px] font-medium text-foreground">{selectedStock.code}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[13px] text-muted-foreground">Lot × Price</span>
                  <span className="text-[14px] font-medium text-foreground">
                    {lot} lot × ${targetPrice}
                  </span>
                </div>
                <div className="pt-3 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-[14px] font-medium text-foreground">Estimated Total</span>
                    <span className="text-[20px] font-bold text-primary">
                      ${totalAmount}
                    </span>
                  </div>
                </div>
                {/* Quick Summary */}
                <div className="mt-4 p-3 rounded-lg bg-accent/50">
                  <p className="text-[13px] text-foreground text-center">
                    <span className="font-semibold">{orderType}</span> {lot} lot {selectedStock.code} @ ${targetPrice} via <span className="font-semibold">{broker}</span>
                  </p>
                </div>
              </div>
            </GlassCard>
          )}

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="submit"
              variant="primary"
              className="flex-1"
              disabled={!broker || !lot || !targetPrice || !executionTime || !expiryDate}
            >
              Create Order
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}