import { useParams, Link } from 'react-router';
import { useEffect } from 'react';
import { GlassCard } from '../components/glass-card';
import { Badge } from '../components/badge';
import { ArrowLeft, Target, TrendingUp, CheckCircle2, Bookmark } from 'lucide-react';
import { mockSetups } from '../lib/mock-data';
import { useDetailNavbar } from '../contexts/detail-navbar-context';

export function SetupDetail() {
  const { setupId } = useParams();
  const setup = mockSetups.find(s => s.id === setupId);
  const { setNavbar, clearNavbar } = useDetailNavbar();

  // Set detail navbar title
  useEffect(() => {
    if (setup) {
      setNavbar({
        title: setup.title,
        showAction: true,
        actionType: 'bookmark',
        onAction: () => {
          // Bookmark action (mock)
          console.log('Bookmarked setup:', setup.title);
        },
      });
    }
    return () => clearNavbar();
  }, [setup, setNavbar, clearNavbar]);

  if (!setup) {
    return <div>Idea not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header - Desktop Only */}
      <div className="hidden md:block">
        <Link
          to="/ideas"
          className="inline-flex items-center gap-2 text-[14px] text-primary hover:text-primary/80 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Ideas
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hero Image */}
          <GlassCard className="overflow-hidden">
            <div 
              className="h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${setup.thumbnail})` }}
            >
              <div className="w-full h-full bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <div>
                  <h1 className="text-[32px] font-bold text-white mb-2">
                    {setup.title}
                  </h1>
                  <p className="text-[16px] text-white/90">
                    {setup.description}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Setup Rules */}
          <GlassCard className="p-6">
            <h2 className="text-[20px] font-semibold text-foreground mb-4">
              Setup Rules
            </h2>
            <div className="space-y-3">
              {setup.rules.map((rule, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-accent/50">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-[14px] text-foreground flex-1">
                    {rule}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Additional Info */}
          <GlassCard className="p-6">
            <h2 className="text-[20px] font-semibold text-foreground mb-4">
              Key Points
            </h2>
            <div className="prose prose-sm max-w-none">
              <p className="text-[14px] text-muted-foreground leading-relaxed">
                This setup is designed to identify high-probability trading opportunities based on
                technical analysis and market structure. Always use proper risk management and
                position sizing when implementing any trading strategy.
              </p>
              <p className="text-[14px] text-muted-foreground leading-relaxed mt-4">
                Remember to backtest this strategy with your own parameters and adjust the rules
                based on your risk tolerance and trading style. Past performance does not guarantee
                future results.
              </p>
            </div>
          </GlassCard>
        </div>

        {/* Sidebar - Stats */}
        <div className="space-y-6">
          <GlassCard className="p-6">
            <h3 className="text-[16px] font-semibold text-foreground mb-4">
              Performance Metrics
            </h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-success" />
                  <span className="text-[12px] font-medium text-success">Win Rate</span>
                </div>
                <p className="text-[28px] font-bold text-success">
                  {setup.winRate}%
                </p>
                <p className="text-[12px] text-muted-foreground mt-1">
                  Based on historical data
                </p>
              </div>

              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <span className="text-[12px] font-medium text-primary">Average Gain</span>
                </div>
                <p className="text-[28px] font-bold text-primary">
                  +{setup.avgGain}%
                </p>
                <p className="text-[12px] text-muted-foreground mt-1">
                  Per successful trade
                </p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-[16px] font-semibold text-foreground mb-4">
              Risk Level
            </h3>
            <div className="space-y-3">
              <Badge variant="warning">Medium Risk</Badge>
              <p className="text-[13px] text-muted-foreground">
                This setup requires active monitoring and quick decision-making.
              </p>
            </div>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="text-[16px] font-semibold text-foreground mb-4">
              Best For
            </h3>
            <div className="space-y-2">
              <Badge variant="secondary">Day Trading</Badge>
              <Badge variant="secondary">Swing Trading</Badge>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}