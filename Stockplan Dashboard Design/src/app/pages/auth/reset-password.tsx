import { useNavigate } from 'react-router';
import { GlassCard } from '../../components/glass-card';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { useState } from 'react';

export function ResetPassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock password reset - redirect to login
    navigate('/auth/login');
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
            <h1 className="text-[32px] font-bold text-foreground mb-2">Create new password</h1>
            <p className="text-[14px] text-muted-foreground">
              Enter a new password for your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="New Password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />

            <Button type="submit" className="w-full" size="lg">
              Reset password
            </Button>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
