import type { Metadata } from "next";
import Market from "@/views/(private)/market/Market.views";
import { get_companies } from "@/services/company";
import { get_general_sector } from "@/services/general";

export const metadata: Metadata = {
  title: "Stock Market | Prices, Movers & Market Trends",
  description:
    "Explore the latest stock prices, top gainers and losers, and overall market trends to make better investment decisions.",
};

async function Page() {
  const [req_get_companies, req_get_general_sector] = await Promise.all([
    get_companies(),
    get_general_sector(),
  ]);

  return (
    <Market
      response={{
        companies: req_get_companies,
        general_sector: req_get_general_sector,
      }}
    />
  );
}

export default Page;
