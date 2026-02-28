import { Link } from 'react-router';
import { Calendar, TrendingUp, DollarSign, Briefcase, Bell } from 'lucide-react';
import { GlassCard } from './glass-card';
import { Badge } from './badge';

interface Notification {
  id: string;
  type: string;
  title: string;
  description: string;
  date: string;
  time: string;
  isRead: boolean;
  icon: any;
  color: string;
  bgColor: string;
  link: string;
}

interface NotificationDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

// Mock notification data (limited to recent 5 for dropdown)
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'Orders',
    title: 'Order Executed',
    description: 'Your buy order for BBCA (100 shares) has been filled',
    date: 'Today',
    time: '2 hours ago',
    isRead: false,
    icon: DollarSign,
    color: 'text-success',
    bgColor: 'bg-success/10',
    link: '/portfolio',
  },
  {
    id: '2',
    type: 'Alerts',
    title: 'Price Alert Triggered',
    description: 'TLKM reached your target price of Rp 3,500',
    date: 'Today',
    time: '5 hours ago',
    isRead: false,
    icon: TrendingUp,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
    link: '/stocks/TLKM',
  },
  {
    id: '3',
    type: 'Calendar',
    title: 'BBCA Dividend Payment',
    description: 'Ex-dividend date - Rp 250 per share',
    date: 'Tomorrow',
    time: 'Tomorrow, 09:00 AM',
    isRead: false,
    icon: Calendar,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
    link: '/calendar',
  },
  {
    id: '4',
    type: 'Calendar',
    title: 'BBRI Annual General Meeting',
    description: 'Shareholders meeting and board election',
    date: 'Mar 5',
    time: 'Mar 5, 10:00 AM',
    isRead: true,
    icon: Briefcase,
    color: 'text-amber-600',
    bgColor: 'bg-amber-500/10',
    link: '/calendar',
  },
  {
    id: '5',
    type: 'Alerts',
    title: 'Watchlist Alert',
    description: 'ASII volume increased by 150%',
    date: 'Yesterday',
    time: 'Yesterday',
    isRead: true,
    icon: TrendingUp,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500/10',
    link: '/market',
  },
];

export function NotificationDropdown({ isOpen, onClose }: NotificationDropdownProps) {
  if (!isOpen) return null;

  const unreadCount = mockNotifications.filter(n => !n.isRead).length;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-40" 
        onClick={onClose}
      />

      {/* Dropdown Panel */}
      <div className="absolute right-0 top-full mt-2 w-[420px] z-50">
        <div className="bg-white rounded-[16px] p-0 max-h-[600px] flex flex-col shadow-xl">
          {/* Header */}
          <div className="p-5 border-b border-border">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[18px] font-semibold text-foreground">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <Badge variant="primary" size="sm">
                  {unreadCount} new
                </Badge>
              )}
            </div>
            <p className="text-[13px] text-muted-foreground">
              Stay updated on your portfolio and market events
            </p>
          </div>

          {/* Notifications List - Scrollable */}
          <div className="overflow-y-auto flex-1">
            {mockNotifications.length > 0 ? (
              <div className="divide-y divide-border">
                {mockNotifications.map((notification) => {
                  const Icon = notification.icon;
                  return (
                    <Link
                      key={notification.id}
                      to={notification.link}
                      onClick={onClose}
                      className={`block p-4 hover:bg-accent/30 transition-all ${
                        !notification.isRead ? 'bg-primary/5' : ''
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className={`w-10 h-10 rounded-lg ${notification.bgColor} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 ${notification.color}`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h4 className="text-[14px] font-semibold text-foreground line-clamp-1">
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                            )}
                          </div>
                          
                          <p className="text-[13px] text-muted-foreground mb-2 line-clamp-2">
                            {notification.description}
                          </p>

                          {/* Meta */}
                          <div className="flex items-center gap-2 text-[12px] text-muted-foreground">
                            <span className="font-medium text-primary">{notification.type}</span>
                            <span>•</span>
                            <span>{notification.time}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              // Empty State
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/50 flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-muted-foreground" />
                </div>
                <h4 className="text-[16px] font-semibold text-foreground mb-1">
                  No Notifications
                </h4>
                <p className="text-[13px] text-muted-foreground">
                  You're all caught up!
                </p>
              </div>
            )}
          </div>

          {/* Footer - View All Button */}
          <div className="p-3 border-t border-border">
            <Link
              to="/notifications"
              onClick={onClose}
              className="block w-full text-center py-2.5 rounded-lg text-[14px] font-medium text-primary hover:bg-primary/10 transition-colors"
            >
              View All Notifications
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}