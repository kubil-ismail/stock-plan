import type { Metadata } from "next";
import SearchPage from "@/views/(private)/search/Search.views";

export const metadata: Metadata = {
  title: "Search Stocks | Find Companies, Sectors & Market Data",
  description:
    "Search for stocks, sectors, and market data to explore investment opportunities and financial insights.",
};

function Page() {
  return <SearchPage />;
}

export default Page;
