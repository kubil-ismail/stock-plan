import type { Metadata } from "next";
import { get_general_sector } from "@/services/general";
import Sector from "@/views/(private)/market/sectors/Sector.views";

export const metadata: Metadata = {
  title: "Stock Market Sector Performance | StockPlan",
  description:
    "Explore stock market sector performance, industry trends, and top companies within each sector.",
};

async function Page() {
  const [req_get_general_sector] = await Promise.all([get_general_sector({page: 1, limit: 50})]);

  return <Sector response={{ general_sector: req_get_general_sector }} />;
}

export default Page;
