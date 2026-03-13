import type { Metadata } from "next";
import { get_companies } from "@/services/company";
import { get_general_sector } from "@/services/general";
import { SectorDetail } from "@/views/(private)/market/sectors/Detail.views";

interface PageProps {
  params: {
    code: string;
  };
}

function transformCode(code: string) {
  return code
    ?.split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export async function generateMetadata({ params }: PageProps) {
  const { code } = await params;

  const req_general_sector = await get_general_sector(
    1,
    1,
    transformCode(code)
  );

  const sector = req_general_sector.data?.[0];

  return {
    title: `${sector.name} Sector Stocks – Companies & Market Analysis | Stockplan`,
    description: `Explore companies in the ${sector.name} sector. View stock lists, sector insights, and market performance to analyze investment opportunities on Stockplan.`,
  };
}

async function Page({ params }: PageProps) {
  const { code } = await params;

  const [req_get_companies, req_general_sector] = await Promise.all([
    get_companies(),
    get_general_sector(1, 1, transformCode(code)),
  ]);

  return (
    <SectorDetail
      response={{
        companies: req_get_companies,
        general_sector: req_general_sector,
      }}
    />
  );
}

export default Page;
