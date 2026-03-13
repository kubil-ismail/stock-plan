"use client";
import SectorList from "@/components/sector-list";

interface Props {
  response: any;
}

function Sector(props: Props) {
  const { general_sector } = props?.response || {};

  return (
    <div className="space-y-6 animate-fade-in">
      {/* All Sectors List */}
      <div>
        <h2 className="text-[20px] font-semibold text-foreground mb-4">
          All Sectors
        </h2>
        <div className="space-y-3">
          {general_sector.map((sector) => (
            <SectorList key={sector.id} sector={sector} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sector;
