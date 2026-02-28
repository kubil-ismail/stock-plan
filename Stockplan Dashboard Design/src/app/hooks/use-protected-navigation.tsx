import { useNavigate, useLocation } from 'react-router';
import { useAuth } from '../contexts/auth-context';

export function useProtectedNavigation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, openLoginModal, setReturnUrl } = useAuth();

  const navigateProtected = (to: string, requireAuth: boolean = true) => {
    if (requireAuth && !isAuthenticated) {
      setReturnUrl(to);
      openLoginModal();
    } else {
      navigate(to);
    }
  };

  return { navigateProtected };
}
