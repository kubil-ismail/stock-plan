import { Link } from 'react-router';
import { GlassCard } from '../../components/glass-card';
import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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

          {!submitted ? (
            <>
              <div className="text-center mb-8">
                <h1 className="text-[32px] font-bold text-foreground mb-2">Forgot password?</h1>
                <p className="text-[14px] text-muted-foreground">
                  Enter your email and we'll send you a reset link
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <Input
                  label="Email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />

                <Button type="submit" className="w-full" size="lg">
                  Send reset link
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-[24px] font-semibold text-foreground mb-2">Check your email</h2>
              <p className="text-[14px] text-muted-foreground mb-6">
                We've sent a password reset link to<br />
                <span className="font-medium text-foreground">{email}</span>
              </p>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link
              to="/auth/login"
              className="inline-flex items-center gap-2 text-[14px] text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
