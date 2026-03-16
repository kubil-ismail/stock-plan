import { transformSectorCode } from "@/lib/utils";
import { get_companies } from "@/services/company";
import { get_general_sector } from "@/services/general";
import { SectorDetail } from "@/views/(private)/market/sectors/Detail.views";

interface PageProps {
  params: {
    code: string;
  };
  searchParams: { search: string };
}

async function Page({ params, searchParams }: PageProps) {
  const { code } = await params;
  const { search } = await searchParams;

  const [req_get_companies, req_general_sector] = await Promise.all([
    get_companies({ page: 1, search, sector: transformSectorCode(code) }),
    get_general_sector({ page: 1, limit: 1, search: transformSectorCode(code) }),
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

export async function generateMetadata({ params }: PageProps) {
  const { code } = await params;

  const req_general_sector = await get_general_sector({
    page: 1,
    limit: 1,
    search: transformSectorCode(code),
  });

  const sector = req_general_sector.data?.[0];

  return {
    title: `${sector.name} Sector Stocks – Companies & Market Analysis | Stockplan`,
    description: `Explore companies in the ${sector.name} sector. View stock lists, sector insights, and market performance to analyze investment opportunities on Stockplan.`,
  };
}

export default Page;
