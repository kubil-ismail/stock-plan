import { Link, useNavigate, useLocation } from 'react-router';
import { GlassCard } from '../../components/glass-card';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { useState } from 'react';
import { useAuth } from '../../contexts/auth-context';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });

  // Get return URL from location state or default to market
  const returnUrl = location.state?.returnUrl || '/market';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login - set authenticated state
    login();
    // Redirect to return URL or market
    navigate(returnUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-secondary/10 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <GlassCard elevation={3} className="p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-[16px] bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <div className="w-10 h-10 rounded-lg bg-white/20" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-[32px] font-bold text-foreground mb-2">Welcome back</h1>
            <p className="text-[14px] text-muted-foreground">
              Sign in to continue to Stockplan
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Email"
              type="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-border" />
                <span className="text-[14px] text-muted-foreground">Remember me</span>
              </label>
              <Link
                to="/auth/forgot-password"
                className="text-[14px] text-primary hover:text-primary/80 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Sign in
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[14px] text-muted-foreground">
              Don't have an account?{' '}
              <Link
                to="/auth/register"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Sign up
              </Link>
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}