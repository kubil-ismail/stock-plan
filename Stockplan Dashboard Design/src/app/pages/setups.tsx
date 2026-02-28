import { Link } from 'react-router';
import { GlassCard } from '../components/glass-card';
import { Badge } from '../components/badge';
import { TrendingUp, Target } from 'lucide-react';
import { mockSetups } from '../lib/mock-data';

export function Setups() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[24px] md:text-[32px] font-bold text-foreground mb-2">Trading Ideas</h1>
        <p className="text-[14px] text-muted-foreground">
          Proven strategies to help you make better trading decisions
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {mockSetups.map((setup) => (
          <Link key={setup.id} to={`/ideas/${setup.id}`}>
            <GlassCard hover className="overflow-hidden">
              {/* Thumbnail */}
              <div 
                className="h-40 bg-cover bg-center"
                style={{ backgroundImage: `url(${setup.thumbnail})` }}
              >
                <div className="w-full h-full bg-gradient-to-t from-black/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-[18px] font-semibold text-foreground mb-2">
                  {setup.title}
                </h3>
                <p className="text-[13px] text-muted-foreground mb-4 line-clamp-2">
                  {setup.description}
                </p>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-success" />
                    <span className="text-[12px] font-medium text-foreground">
                      {setup.winRate}% Win Rate
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <span className="text-[12px] font-medium text-foreground">
                      +{setup.avgGain}% Avg
                    </span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Link>
        ))}
      </div>
    </div>
  );
}