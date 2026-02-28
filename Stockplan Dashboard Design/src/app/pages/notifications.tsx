import { useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { GlassCard } from '../components/glass-card';
import { Badge } from '../components/badge';
import { ArrowLeft, Calendar, TrendingUp, DollarSign, Briefcase, Bell } from 'lucide-react';
import { useNotifications } from '../contexts/notification-context';

// Mock notification data with types
const mockNotifications = [
  {
    id: '1',
    type: 'orders',
    title: 'Order Executed',
    description: 'Your buy order for BBCA (100 shares) has been filled at Rp 8,750',
    date: '2026-02-27',
    time: '2 hours ago',
    isRead: false,
    icon: DollarSign,
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    id: '2',
    type: 'alerts',
    title: 'Price Alert Triggered',
    description: 'TLKM reached your target price of Rp 3,500',
    date: '2026-02-27',
    time: '5 hours ago',
    isRead: false,
    icon: TrendingUp,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    id: '3',
    type: 'calendar',
    title: 'BBCA Dividend Payment',
    description: 'Ex-dividend date for BBCA - Rp 250 per share',
    date: '2026-02-28',
    time: 'Tomorrow, 09:00 AM',
    isRead: false,
    icon: Calendar,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  {
    id: '4',
    type: 'orders',
    title: 'Order Partially Filled',
    description: 'Your sell order for TLKM - 50 of 100 shares filled',
    date: '2026-02-26',
    time: 'Yesterday',
    isRead: true,
    icon: DollarSign,
    color: 'text-amber-600',
    bgColor: 'bg-amber-500/10',
  },
  {
    id: '5',
    type: 'calendar',
    title: 'BBRI Annual General Meeting',
    description: 'Shareholders meeting and board election',
    date: '2026-03-05',
    time: 'Mar 5, 10:00 AM',
    isRead: true,
    icon: Briefcase,
    color: 'text-purple-600',
    bgColor: 'bg-purple-500/10',
  },
  {
    id: '6',
    type: 'alerts',
    title: 'Watchlist Alert',
    description: 'ASII volume increased by 150% in the last hour',
    date: '2026-02-26',
    time: 'Yesterday',
    isRead: true,
    icon: TrendingUp,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
  },
];

type FilterType = 'all' | 'orders' | 'alerts' | 'calendar';

export function Notifications() {
  const navigate = useNavigate();
  const { markNotificationsAsRead } = useNotifications();
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Mark notifications as read when page is opened
  useEffect(() => {
    markNotificationsAsRead();
  }, [markNotificationsAsRead]);

  const filters: { id: FilterType; label: string }[] = [
    { id: 'all', label: 'All' },
    { id: 'orders', label: 'Orders' },
    { id: 'alerts', label: 'Alerts' },
    { id: 'calendar', label: 'Calendar' },
  ];

  const filteredNotifications = activeFilter === 'all' 
    ? mockNotifications 
    : mockNotifications.filter(n => n.type === activeFilter);

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  const handleNotificationClick = (notification: typeof mockNotifications[0]) => {
    // Navigate based on type
    if (notification.type === 'calendar') {
      navigate('/calendar');
    } else if (notification.type === 'orders') {
      navigate('/portfolio');
    } else if (notification.type === 'alerts') {
      // Could navigate to specific stock or market
      navigate('/market');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-start gap-4">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-xl hover:bg-accent flex items-center justify-center transition-colors flex-shrink-0 mt-1"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-[24px] md:text-[32px] font-bold text-foreground">Notifications</h1>
            {unreadCount > 0 && (
              <Badge variant="primary" size="sm">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <p className="text-[14px] text-muted-foreground">
            Stay updated on your portfolio and market events
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <GlassCard className="p-1.5">
        <div className="grid grid-cols-4 gap-1">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2.5 rounded-lg text-[14px] font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Notifications List */}
      {filteredNotifications.length > 0 ? (
        <div className="space-y-3">
          {filteredNotifications.map((notification) => {
            const Icon = notification.icon;
            return (
              <GlassCard
                key={notification.id}
                className={`p-5 hover:bg-accent/30 transition-all cursor-pointer ${
                  !notification.isRead ? 'bg-primary/5 border-l-4 border-l-primary' : ''
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${notification.bgColor} flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${notification.color}`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="text-[16px] font-semibold text-foreground">
                        {notification.title}
                      </h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge variant="secondary" size="sm">
                          {notification.type}
                        </Badge>
                        {!notification.isRead && (
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        )}
                      </div>
                    </div>
                    
                    <p className="text-[14px] text-muted-foreground mb-3">
                      {notification.description}
                    </p>

                    {/* Date & Time */}
                    <div className="flex items-center gap-4 text-[13px] text-muted-foreground">
                      <span>{notification.time}</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      ) : (
        // Empty State
        <GlassCard className="p-12">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 rounded-full bg-accent/50 flex items-center justify-center mb-6">
              <Bell className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-[20px] font-semibold text-foreground mb-2">
              No Notifications
            </h3>
            <p className="text-[14px] text-muted-foreground max-w-sm mb-6">
              No {activeFilter !== 'all' ? activeFilter : ''} notifications found. Check back later for updates.
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="px-6 py-3 rounded-[10px] bg-primary text-primary-foreground text-[14px] font-medium hover:bg-primary/90 transition-colors"
            >
              View All Notifications
            </button>
          </div>
        </GlassCard>
      )}

      {/* Quick Actions */}
      <GlassCard className="p-5">
        <h3 className="text-[16px] font-semibold text-foreground mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <button
            onClick={() => navigate('/calendar')}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-[14px] font-medium text-foreground">
                View Full Calendar
              </span>
            </div>
            <ArrowLeft className="w-4 h-4 text-muted-foreground rotate-180" />
          </button>
          <button
            onClick={() => navigate('/portfolio')}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-primary" />
              <span className="text-[14px] font-medium text-foreground">
                View Portfolio
              </span>
            </div>
            <ArrowLeft className="w-4 h-4 text-muted-foreground rotate-180" />
          </button>
        </div>
      </GlassCard>
    </div>
  );
}
