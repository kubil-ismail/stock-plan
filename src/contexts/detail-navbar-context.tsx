import { createContext, useContext, useState, useCallback } from 'react';

interface DetailNavbarState {
  title: string;
  onBack?: () => void;
  showAction?: boolean;
  actionType?: 'bookmark' | 'delete' | 'edit';
  onAction?: () => void;
  isDetailPage: boolean;
}

interface DetailNavbarContextType {
  navbarState: DetailNavbarState;
  setNavbar: (state: Partial<Omit<DetailNavbarState, 'isDetailPage'>>) => void;
  clearNavbar: () => void;
}

const DetailNavbarContext = createContext<DetailNavbarContextType | undefined>(undefined);

const defaultState: DetailNavbarState = {
  title: '',
  isDetailPage: false,
};

export function DetailNavbarProvider({ children }: { children: React.ReactNode }) {
  const [navbarState, setNavbarState] = useState<DetailNavbarState>(defaultState);

  const setNavbar = useCallback((state: Partial<Omit<DetailNavbarState, 'isDetailPage'>>) => {
    setNavbarState(prev => ({
      ...prev,
      ...state,
      isDetailPage: true,
    }));
  }, []);

  const clearNavbar = useCallback(() => {
    setNavbarState(defaultState);
  }, []);

  return (
    <DetailNavbarContext.Provider value={{ navbarState, setNavbar, clearNavbar }}>
      {children}
    </DetailNavbarContext.Provider>
  );
}

export function useDetailNavbar() {
  const context = useContext(DetailNavbarContext);
  if (!context) {
    throw new Error('useDetailNavbar must be used within DetailNavbarProvider');
  }
  return context;
}