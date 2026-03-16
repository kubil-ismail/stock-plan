import { get_detail_companies } from "@/services/company";
import StockDetail from "@/views/(private)/market/stocks/Detail.views";

interface PageProps {
  params: {
    code: string;
  };
  searchParams: { search: string };
}

async function Page({ params }: PageProps) {
  const param = await params;

  const [req_get_companies] = await Promise.all([
    get_detail_companies(param.code),
  ]);

  return <StockDetail response={{ companies: req_get_companies }} />;
}

export async function generateMetadata({ params }: PageProps) {
  const { code } = await params;

  const [req_get_companies] = await Promise.all([
    get_detail_companies(code),
  ]);
  const companies = req_get_companies.data;

  return {
    title: `${companies.name} | Stockplan`,
    description: `${companies.main_business} View stock lists, sector insights, and market performance to analyze investment opportunities on Stockplan.`,
  };
}

export default Page;
