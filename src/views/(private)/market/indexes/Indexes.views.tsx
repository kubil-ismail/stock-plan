"use client";
import IndexesList from "@/components/indexes-list";
import { MarketIndexResponse } from "@/types/general";

interface Response {
  market_indexes: MarketIndexResponse;
}

interface Props {
  response: Response;
}

function Indexes({ response }: Props) {
  const { market_indexes } = response ?? {};

  return (
    <>
      <div className="space-y-6 animate-fade-in">
        {/* Market Indexes Grid */}
        <div>
          <h2 className="text-[20px] font-semibold text-foreground mb-4">
            Market Indexes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {market_indexes?.data.map((index) => (
              <IndexesList key={index.id} index={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Indexes;
