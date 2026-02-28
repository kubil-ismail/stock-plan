import { useNavigate } from 'react-router';
import { X, LogIn, UserPlus } from 'lucide-react';
import { GlassCard } from './glass-card';
import { useAuth } from '../contexts/auth-context';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const navigate = useNavigate();
  const { returnUrl } = useAuth();

  if (!isOpen) return null;

  const handleLogin = () => {
    navigate('/auth/login', { state: { returnUrl } });
    onClose();
  };

  const handleSignUp = () => {
    navigate('/auth/register', { state: { returnUrl } });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div
          className="w-full max-w-md bg-white rounded-[20px] shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 border-b border-border">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg hover:bg-accent flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
            
            <div className="pr-8">
              <h2 className="text-[24px] font-bold text-foreground mb-2">
                Login Required
              </h2>
              <p className="text-[14px] text-muted-foreground">
                Please log in or create an account to continue.
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-4">
            {/* Feature Description */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
              <p className="text-[14px] text-foreground">
                Create an account to access trading, portfolio management, and personalized features.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Login Button */}
              <button
                onClick={handleLogin}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary text-primary-foreground text-[15px] font-semibold hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
              >
                <LogIn className="w-5 h-5" />
                Login
              </button>

              {/* Sign Up Button */}
              <button
                onClick={handleSignUp}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-accent text-foreground text-[15px] font-semibold hover:bg-accent/70 transition-all"
              >
                <UserPlus className="w-5 h-5" />
                Sign Up
              </button>

              {/* Cancel Button */}
              <button
                onClick={onClose}
                className="w-full px-6 py-3 rounded-xl text-[14px] font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all"
              >
                Continue Browsing
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 pb-6">
            <p className="text-[13px] text-muted-foreground text-center">
              Browse market data freely without an account
            </p>
          </div>
        </div>
      </div>
    </>
  );
}