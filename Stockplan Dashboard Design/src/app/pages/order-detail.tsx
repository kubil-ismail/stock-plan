import { useNavigate, useParams } from 'react-router';
import { useState, useEffect } from 'react';
import { GlassCard } from '../components/glass-card';
import { Badge } from '../components/badge';
import { ConfirmationModal } from '../components/confirmation-modal';
import { ArrowLeft, Trash2, AlertTriangle } from 'lucide-react';
import { mockPortfolioOngoing, mockPortfolioHistory } from '../lib/mock-data';
import { toast } from 'sonner';
import { useDetailNavbar } from '../contexts/detail-navbar-context';

export function OrderDetail() {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { setNavbar, clearNavbar } = useDetailNavbar();
  
  // Find order from both ongoing and history
  const allOrders = [...mockPortfolioOngoing, ...mockPortfolioHistory];
  const order = allOrders.find(o => o.id === orderId);
  
  // Determine if it's a history order (has exitPrice)
  const isHistory = order && 'exitPrice' in order;

  // Delete order state
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [confirmText, setConfirmText] = useState('');

  // Set detail navbar title
  useEffect(() => {
    if (order) {
      setNavbar({
        title: `Trade #${orderId}`,
        showAction: !isHistory,
        actionType: 'delete',
        onAction: () => setIsDeleteModalOpen(true),
      });
    }
    return () => clearNavbar();
  }, [order, orderId, isHistory, setNavbar, clearNavbar]);
  
  const handleDeleteOrder = () => {
    // Mock deletion
    toast.success('Order deleted successfully');
    navigate('/portfolio');
  };
  
  const isConfirmTextValid = confirmText.toUpperCase() === 'CONFIRM';

  if (!order) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl hover:bg-accent flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-[24px] md:text-[32px] font-bold text-foreground">Order Not Found</h1>
        </div>
        <GlassCard className="p-6">
          <p className="text-[14px] text-muted-foreground text-center py-8">
            The order you're looking for could not be found.
          </p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button - Desktop Only */}
      <div className="hidden md:flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-xl hover:bg-accent flex items-center justify-center transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-[24px] md:text-[32px] font-bold text-foreground">Order Detail</h1>
          <p className="text-[14px] text-muted-foreground">
            {isHistory ? 'Completed trade information' : 'Active order information'}
          </p>
        </div>
      </div>

      {/* Order Summary Card */}
      <GlassCard className="p-6">
        <h3 className="text-[16px] font-semibold text-foreground mb-4">Order Summary</h3>
        
        {/* Stock Info */}
        <div className="flex items-center gap-4 p-4 rounded-lg bg-accent/50 mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <span className="text-[16px] font-bold text-primary">
              {order.stockCode.substring(0, 2)}
            </span>
          </div>
          <div className="flex-1">
            <p className="text-[18px] font-semibold text-foreground">
              {order.stockCode}
            </p>
            <p className="text-[14px] text-muted-foreground">
              {order.stockName}
            </p>
          </div>
        </div>

        {/* Order Type & Status */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-[12px] text-muted-foreground mb-2">Order Type</p>
            <Badge variant={order.action === 'Buy' ? 'success' : 'destructive'}>
              {order.action}
            </Badge>
          </div>
          <div>
            <p className="text-[12px] text-muted-foreground mb-2">Status</p>
            <Badge 
              variant={
                order.status === 'Active' ? 'success' :
                order.status === 'Completed' ? 'info' :
                'warning'
              }
            >
              {order.status}
            </Badge>
          </div>
        </div>
      </GlassCard>

      {/* Order Information */}
      <GlassCard className="p-6">
        <h3 className="text-[16px] font-semibold text-foreground mb-4">Order Information</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border">
            <p className="text-[13px] text-muted-foreground">Lot Size</p>
            <p className="text-[15px] font-semibold text-foreground">{order.lot} lots</p>
          </div>

          {!isHistory ? (
            <>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <p className="text-[13px] text-muted-foreground">Target Price</p>
                <p className="text-[15px] font-semibold text-foreground">
                  ${order.targetPrice?.toFixed(2)}
                </p>
              </div>
              
              <div className="flex items-center justify-between py-3 border-b border-border">
                <p className="text-[13px] text-muted-foreground">Current Price</p>
                <p className="text-[15px] font-semibold text-foreground">
                  ${order.currentPrice?.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <p className="text-[13px] text-muted-foreground">Total Amount</p>
                <p className="text-[15px] font-semibold text-foreground">
                  ${((order.targetPrice || 0) * order.lot * 100).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <p className="text-[13px] text-muted-foreground">Target Execution</p>
                <p className="text-[15px] font-semibold text-foreground">
                  {order.targetExecutionTime}
                </p>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <p className="text-[13px] text-muted-foreground">Expiry Date</p>
                <p className="text-[15px] font-semibold text-foreground">
                  {order.expiry}
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between py-3 border-b border-border">
                <p className="text-[13px] text-muted-foreground">Entry Price</p>
                <p className="text-[15px] font-semibold text-foreground">
                  ${order.entryPrice?.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <p className="text-[13px] text-muted-foreground">Exit Price</p>
                <p className="text-[15px] font-semibold text-foreground">
                  ${order.exitPrice?.toFixed(2)}
                </p>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <p className="text-[13px] text-muted-foreground">Total Amount</p>
                <p className="text-[15px] font-semibold text-foreground">
                  ${((order.exitPrice || 0) * order.lot * 100).toFixed(2)}
                </p>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-border">
                <p className="text-[13px] text-muted-foreground">Execution Date</p>
                <p className="text-[15px] font-semibold text-foreground">
                  {order.date}
                </p>
              </div>
            </>
          )}

          <div className="flex items-center justify-between py-3">
            <p className="text-[13px] text-muted-foreground">Setup Used</p>
            <Badge variant="secondary">{order.setupUsed}</Badge>
          </div>
        </div>
      </GlassCard>

      {/* Performance - Only for history */}
      {isHistory && order.realizedGain !== undefined && (
        <GlassCard className="p-6">
          <h3 className="text-[16px] font-semibold text-foreground mb-4">Performance</h3>
          
          <div className="space-y-4">
            <div className="p-5 rounded-lg bg-accent/50">
              <p className="text-[13px] text-muted-foreground mb-2">Realized Gain/Loss</p>
              <p className={`text-[32px] font-bold ${
                order.realizedGain > 0 ? 'text-success' : 'text-destructive'
              }`}>
                {order.realizedGain > 0 ? '+' : ''}
                ${order.realizedGain.toFixed(2)}
              </p>
              <p className={`text-[16px] font-semibold mt-1 ${
                order.realizedGain > 0 ? 'text-success' : 'text-destructive'
              }`}>
                {order.realizedGain > 0 ? '+' : ''}
                {(((order.exitPrice || 0) - (order.entryPrice || 0)) / (order.entryPrice || 1) * 100).toFixed(2)}%
              </p>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Delete Order Confirmation Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setConfirmText('');
        }}
        onConfirm={handleDeleteOrder}
        title="Delete Order"
        description="This action is permanent and cannot be undone. You will lose all information about this order."
        confirmText="Delete Order"
        cancelText="Cancel"
        variant="destructive"
        requiresConfirmation={true}
      >
        <div className="flex items-start gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div className="text-[13px] text-destructive">
            <p className="font-semibold mb-1">Warning</p>
            <p>This will permanently delete the order for <strong>{order.stockCode}</strong>. All order data will be lost.</p>
          </div>
        </div>
      </ConfirmationModal>
    </div>
  );
}