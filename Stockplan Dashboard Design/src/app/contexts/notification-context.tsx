import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface NotificationContextType {
  hasNewNotifications: boolean;
  unreadCount: number;
  markNotificationsAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [hasNewNotifications, setHasNewNotifications] = useState(() => {
    // Check localStorage for notification status
    const stored = localStorage.getItem('hasNewNotifications');
    return stored === null ? true : stored === 'true';
  });

  const [unreadCount, setUnreadCount] = useState(() => {
    const stored = localStorage.getItem('unreadCount');
    return stored ? parseInt(stored, 10) : 3;
  });

  // Update localStorage whenever notification status changes
  useEffect(() => {
    localStorage.setItem('hasNewNotifications', hasNewNotifications.toString());
    localStorage.setItem('unreadCount', unreadCount.toString());
  }, [hasNewNotifications, unreadCount]);

  const markNotificationsAsRead = () => {
    setHasNewNotifications(false);
    setUnreadCount(0);
  };

  return (
    <NotificationContext.Provider value={{ hasNewNotifications, unreadCount, markNotificationsAsRead }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}
