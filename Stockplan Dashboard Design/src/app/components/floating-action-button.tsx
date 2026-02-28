import { Plus } from 'lucide-react';
import { Link } from 'react-router';

export function FloatingActionButton() {
  return (
    <Link
      to="/orders/add"
      className="fixed bottom-24 md:bottom-8 right-6 z-40 group"
      aria-label="Trade"
    >
      <div className="relative">
        {/* Button */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary shadow-[0_4px_16px_rgba(249,115,22,0.25)] hover:shadow-[0_6px_20px_rgba(249,115,22,0.3)] transition-all flex items-center justify-center cursor-pointer group-hover:scale-105 active:scale-95">
          <Plus className="w-8 h-8 text-white" strokeWidth={2.5} />
        </div>

        {/* Tooltip (desktop only) */}
        <div className="hidden md:block absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <div className="bg-foreground text-background px-3 py-2 rounded-lg text-[13px] font-medium whitespace-nowrap shadow-md">
            Add Trade
            <div className="absolute top-full right-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-foreground" />
          </div>
        </div>
      </div>
    </Link>
  );
}