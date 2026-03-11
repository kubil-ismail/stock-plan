import type { Metadata } from "next";
import Market from "@/views/(private)/market/Market.views";

export const metadata: Metadata = {
  title: "Stock Market | Prices, Movers & Market Trends",
  description:
    "Explore the latest stock prices, top gainers and losers, and overall market trends to make better investment decisions.",
};

function Page() {
  return <Market />;
}

export default Page;
