import { transformSectorCode } from "@/lib/utils";
import { get_companies } from "@/services/company";
import { get_general_market_indexes_detail } from "@/services/general";
import IndexDetail from "@/views/(private)/market/indexes/Detail.views";

interface PageProps {
  params: {
    code: string;
  };
  searchParams: { search: string };
}

async function Page({ params, searchParams }: PageProps) {
  const { code } = await params;
  const { search } = await searchParams;

  const [req_general_market_indexes_detail] = await Promise.all([
    get_general_market_indexes_detail({ id: code, search }),
  ]);

  return (
    <IndexDetail
      response={{
        market_indexes_detail: req_general_market_indexes_detail,
      }}
    />
  );
}

export async function generateMetadata({ params }: PageProps) {
  const { code } = await params;

  const codeName = transformSectorCode(code);

  return {
    title: `${codeName} Index Stocks – Companies & Market Analysis | Stockplan`,
    description: `Explore companies in the ${codeName} index. View stock lists, sector insights, and market performance to analyze investment opportunities on Stockplan.`,
  };
}

export default Page;
