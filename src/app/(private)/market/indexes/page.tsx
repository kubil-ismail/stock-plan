import type { Metadata } from "next";
import Indexes from "@/views/(private)/market/indexes/Indexes.views";

export const metadata: Metadata = {
  title: "Market Index Performance & Trends | StockPlan",
  description:
    "Track stock market index performance, price movements, and market trends to stay updated with overall market conditions.",
};

function Page() {
  return <Indexes />;
}

export default Page;
