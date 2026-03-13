import type { Metadata } from "next";
import { get_companies } from "@/services/company";
import Stocks from "@/views/(private)/market/stocks/Stocks.views";

export const metadata: Metadata = {
  title: "Stock Details & Performance | StockPlan",
  description:
    "Analyze stock performance, price movements, and key market data to make better investment decisions.",
};

async function Page() {
  const [req_get_companies] = await Promise.all([get_companies()]);

  return <Stocks response={{ companies: req_get_companies }} />;
}

export default Page;
