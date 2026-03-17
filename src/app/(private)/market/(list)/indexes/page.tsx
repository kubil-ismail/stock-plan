import type { Metadata } from "next";
import Indexes from "@/views/(private)/market/indexes/Indexes.views";
import { get_general_market_indexes } from "@/services/general";

export const metadata: Metadata = {
  title: "Market Index Performance & Trends | StockPlan",
  description:
    "Track stock market index performance, price movements, and market trends to stay updated with overall market conditions.",
};

async function Page() {
  const [req_general_market_indexes] = await Promise.all([
    get_general_market_indexes({ page: 1, limit: 20 }),
  ]);

  return <Indexes response={{ market_indexes: req_general_market_indexes }} />;
}

export default Page;
