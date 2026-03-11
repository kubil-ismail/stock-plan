import type { Metadata } from "next";
import Ideas from "@/views/(private)/ideas/Ideas.views";

export const metadata: Metadata = {
  title: "Investment Ideas | Trading Opportunities & Market Setups",
  description:
    "Discover curated investment ideas and trading setups based on market analysis and potential opportunities.",
};

function Page() {
  return <Ideas />;
}

export default Page;
