import { Outlet, Link, useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { LayoutDashboard, BarChart3, Briefcase, BookOpen, Search, Command, User, ArrowUpDown, Bell, ArrowLeft, Trash2 } from 'lucide-react';
import { GlassCard } from './glass-card';
import { FloatingActionButton } from './floating-action-button';
import { SearchModal } from './search-modal';
import { NotificationDropdown } from './notification-dropdown';
import { LoginModal } from './login-modal';
import { useKeyboardShortcut } from '../hooks/use-keyboard-shortcut';
import { useNotifications } from '../contexts/notification-context';
import { useAuth } from '../contexts/auth-context';
import { useDetailNavbar } from '../contexts/detail-navbar-context';

export function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { hasNewNotifications, markNotificationsAsRead } = useNotifications();
  const { isAuthenticated, showLoginModal, closeLoginModal, openLoginModal, setReturnUrl } = useAuth();
  const { navbarState } = useDetailNavbar();

  // Desktop keyboard shortcut (⌘+K / Ctrl+K)
  useKeyboardShortcut('k', () => setIsSearchOpen(true), { metaKey: true });

  const handleNavigation = (href: string, requireAuth: boolean) => {
    if (requireAuth && !isAuthenticated) {
      setReturnUrl(href);
      openLoginModal();
    } else {
      navigate(href);
    }
  };

  const handleNotificationClick = () => {
    if (!isAuthenticated) {
      openLoginModal();
      return;
    }
    setIsNotificationOpen(!isNotificationOpen);
    if (!isNotificationOpen && hasNewNotifications) {
      // Mark as read when opening dropdown
      markNotificationsAsRead();
    }
  };

  const handleProfileClick = (e: React.MouseEvent) => {
    if (!isAuthenticated) {
      e.preventDefault();
      openLoginModal();
    }
  };

  // Desktop navigation - 4 items (removed Calendar)
  const desktopNavigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard, requireAuth: true },
    { name: 'Market', href: '/market', icon: BarChart3, requireAuth: false },
    { name: 'Portfolio', href: '/portfolio', icon: Briefcase, requireAuth: true },
    { name: 'Ideas', href: '/ideas', icon: BookOpen, requireAuth: true },
  ];

  // Mobile bottom navigation - 5 uniform items (Dashboard, Market, Trade, Portfolio, Profile)
  const mobileNavigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard, requireAuth: true },
    { name: 'Market', href: '/market', icon: BarChart3, requireAuth: false },
    { name: 'Trade', href: '/orders/add', icon: ArrowUpDown, requireAuth: true },
    { name: 'Portfolio', href: '/portfolio', icon: Briefcase, requireAuth: true },
    { name: 'Profile', href: '/profile', icon: User, requireAuth: true },
  ];

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    if (href === '/market') {
      return location.pathname.startsWith('/market') || 
             location.pathname.startsWith('/sectors') || 
             location.pathname.startsWith('/indexes');
    }
    if (href === '/orders/add') {
      return location.pathname.startsWith('/orders/add');
    }
    return location.pathname.startsWith(href);
  };

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-0">
      {/* Desktop Navbar */}
      <nav className="hidden md:block sticky top-0 z-50 backdrop-blur-[12px] bg-[rgba(250,247,242,0.8)] border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <GlassCard className="w-10 h-10 flex items-center justify-center p-0">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-primary to-secondary" />
              </GlassCard>
              <span className="text-[20px] font-bold text-foreground">Stockplan</span>
            </Link>

            {/* Navigation */}
            <div className="flex items-center gap-1">
              {desktopNavigation.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                if (item.requireAuth && !isAuthenticated) {
                  return (
                    <button
                      key={item.name}
                      onClick={() => handleNavigation(item.href, item.requireAuth)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-[10px] text-[14px] font-medium transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-accent`}
                    >
                      <Icon className="w-4 h-4" />
                      {item.name}
                    </button>
                  );
                }
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-[10px] text-[14px] font-medium transition-all duration-200 ${
                      active
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-3">
              {/* Search Button - Desktop */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 px-3 py-2 rounded-[10px] text-[14px] font-medium text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
              >
                <Search className="w-4 h-4" />
                <span className="hidden lg:inline">Search</span>
                <kbd className="hidden xl:flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-muted/30 text-[11px] font-medium ml-1">
                  <Command className="w-3 h-3" />K
                </kbd>
              </button>

              {/* Notification Button - Desktop */}
              <div className="relative">
                <button
                  onClick={handleNotificationClick}
                  className="relative p-2 rounded-[10px] text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                >
                  <Bell className="w-5 h-5" />
                  {hasNewNotifications && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-background" />
                  )}
                </button>

                {/* Notification Dropdown - Desktop */}
                <NotificationDropdown 
                  isOpen={isNotificationOpen} 
                  onClose={() => setIsNotificationOpen(false)} 
                />
              </div>

              <Link to="/profile" onClick={handleProfileClick}>
                <button className="text-muted-foreground hover:text-foreground transition-colors">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center font-semibold text-[14px] text-primary">
                    JD
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Top Navbar */}
      {!navbarState.isDetailPage && (
        <nav className="md:hidden sticky top-0 z-50 backdrop-blur-[12px] bg-[rgba(250,247,242,0.8)] border-b border-border">
          <div className="px-4">
            <div className="flex items-center justify-between h-14">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2">
                <GlassCard className="w-9 h-9 flex items-center justify-center p-0">
                  <div className="w-5 h-5 rounded-md bg-gradient-to-br from-primary to-secondary" />
                </GlassCard>
                <span className="text-[18px] font-bold text-foreground">Stockplan</span>
              </Link>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {/* Search Icon - Mobile */}
                <button
                  onClick={() => navigate('/search')}
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors active:scale-95"
                >
                  <Search className="w-5 h-5" />
                </button>

                {/* Notification Icon - Mobile */}
                <button
                  onClick={() => navigate('/notifications')}
                  className="relative p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors active:scale-95"
                >
                  <Bell className="w-5 h-5" />
                  {hasNewNotifications && (
                    <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Detail Navbar */}
      {navbarState.isDetailPage && (
        <nav className="md:hidden sticky top-0 z-50 backdrop-blur-[12px] bg-[rgba(250,247,242,0.95)] border-b border-border shadow-sm">
          <div className="px-4">
            <div className="flex items-center justify-between h-14">
              {/* Back Button */}
              <button
                onClick={() => navbarState.onBack ? navbarState.onBack() : navigate(-1)}
                className="p-2 -ml-2 rounded-lg hover:bg-accent transition-colors active:scale-95"
              >
                <ArrowLeft className="w-5 h-5 text-foreground" />
              </button>

              {/* Title */}
              <h1 className="flex-1 text-[16px] font-semibold text-foreground text-center truncate px-4">
                {navbarState.title}
              </h1>

              {/* Optional Action */}
              {navbarState.showAction && navbarState.actionType ? (
                <div className="flex-shrink-0">
                  <button 
                    onClick={navbarState.onAction}
                    className="p-2 rounded-lg hover:bg-accent transition-colors active:scale-95"
                  >
                    {navbarState.actionType === 'bookmark' && <BookOpen className="w-5 h-5 text-muted-foreground" />}
                    {navbarState.actionType === 'delete' && <Trash2 className="w-5 h-5 text-destructive" />}
                    {navbarState.actionType === 'edit' && <span className="w-5 h-5 text-primary">✏️</span>}
                  </button>
                </div>
              ) : (
                <div className="w-9" />
              )}
            </div>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-6 py-6 md:py-8">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation - 5 uniform items */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-[12px] bg-[rgba(250,247,242,0.95)] border-t border-border">
        <div className="grid grid-cols-5 h-16">
          {mobileNavigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            if (item.requireAuth && !isAuthenticated) {
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href, item.requireAuth)}
                  className="flex flex-col items-center justify-center gap-1"
                >
                  <Icon className="w-5 h-5 text-muted-foreground" />
                  <span className="text-[11px] font-medium text-muted-foreground">
                    {item.name}
                  </span>
                </button>
              );
            }
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className="flex flex-col items-center justify-center gap-1"
              >
                <Icon 
                  className={`w-5 h-5 transition-colors ${
                    active ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
                <span 
                  className={`text-[11px] font-medium transition-colors ${
                    active ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Floating Action Button - Mobile Only - Portfolio Page Only */}
      {location.pathname === '/portfolio' && <FloatingActionButton />}

      {/* Search Modal - Desktop */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Login Modal */}
      <LoginModal isOpen={showLoginModal} onClose={closeLoginModal} />
    </div>
  );
}