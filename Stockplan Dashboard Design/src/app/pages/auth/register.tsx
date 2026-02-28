import { Link, useNavigate, useLocation } from 'react-router';
import { GlassCard } from '../../components/glass-card';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { useState } from 'react';
import { useAuth } from '../../contexts/auth-context';

export function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullname: '',
    username: '',
    email: '',
    password: '',
  });

  // Get return URL from location state or default to market
  const returnUrl = location.state?.returnUrl || '/market';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock registration - set authenticated state
    login();
    // Redirect to return URL or market
    navigate(returnUrl);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent via-background to-secondary/10 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <GlassCard elevation={3} className="p-8">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 rounded-[16px] bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <div className="w-10 h-10 rounded-lg bg-white/20" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-[32px] font-bold text-foreground mb-2">Create account</h1>
            <p className="text-[14px] text-muted-foreground">
              Start your investment journey with Stockplan
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={formData.fullname}
              onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
              required
            />

            <Input
              label="Username"
              type="text"
              placeholder="johndoe"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              required
            />

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

            <Button type="submit" className="w-full mt-6" size="lg">
              Create account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[14px] text-muted-foreground">
              Already have an account?{' '}
              <Link
                to="/auth/login"
                className="text-primary hover:text-primary/80 transition-colors font-medium"
              >
                Sign in
              </Link>
            </p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}