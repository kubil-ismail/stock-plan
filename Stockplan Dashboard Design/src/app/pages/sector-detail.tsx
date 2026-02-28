import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { GlassCard } from '../components/glass-card';
import { StockCard } from '../components/stock-card';
import { Button } from '../components/button';
import { Input } from '../components/input';
import { ArrowLeft, Search } from 'lucide-react';
import { mockStocks, mockSectors } from '../lib/mock-data';
import { useDetailNavbar } from '../contexts/detail-navbar-context';

export function SectorDetail() {
  const { sectorId } = useParams();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'gainer' | 'loser' | 'none'>('none');
  const { setNavbar, clearNavbar } = useDetailNavbar();

  const sector = mockSectors.find(s => s.id === sectorId);
  const sectorStocks = mockStocks.filter(s => 
    s.sector.toLowerCase() === sector?.name.toLowerCase()
  );

  // Set detail navbar title
  useEffect(() => {
    if (sector) {
      setNavbar({
        title: sector.name,
      });
    }
    return () => clearNavbar();
  }, [sector, setNavbar, clearNavbar]);

  const filteredStocks = sectorStocks.filter(stock =>
    stock.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedStocks = [...filteredStocks].sort((a, b) => {
    if (sortBy === 'gainer') return b.changePercent - a.changePercent;
    if (sortBy === 'loser') return a.changePercent - b.changePercent;
    return 0;
  });

  if (!sector) {
    return <div>Sector not found</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header - Desktop Only */}
      <div className="hidden md:block">
        <Link
          to="/sectors"
          className="inline-flex items-center gap-2 text-[14px] text-primary hover:text-primary/80 transition-colors mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Sectors
        </Link>
        <h1 className="text-[32px] font-bold text-foreground mb-2">{sector.name}</h1>
        <p className="text-[14px] text-muted-foreground">
          {sector.stockCount} stocks in this sector
        </p>
      </div>

      {/* Search and Filters */}
      <GlassCard className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-[10px] border border-border bg-input-background text-[14px] focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={sortBy === 'gainer' ? 'primary' : 'outline'}
              onClick={() => setSortBy(sortBy === 'gainer' ? 'none' : 'gainer')}
            >
              Top Gainer
            </Button>
            <Button
              variant={sortBy === 'loser' ? 'primary' : 'outline'}
              onClick={() => setSortBy(sortBy === 'loser' ? 'none' : 'loser')}
            >
              Top Loser
            </Button>
          </div>
        </div>
      </GlassCard>

      {/* Stock Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedStocks.map((stock) => (
          <StockCard
            key={stock.id}
            code={stock.code}
            name={stock.name}
            price={stock.price}
            change={stock.change}
            changePercent={stock.changePercent}
            trend={stock.trend}
            subSector={stock.subSector}
            onClick={() => navigate(`/stocks/${stock.id}`)}
          />
        ))}
      </div>

      {sortedStocks.length === 0 && (
        <GlassCard className="p-12">
          <p className="text-center text-muted-foreground">
            No stocks found matching your search
          </p>
        </GlassCard>
      )}
    </div>
  );
}