import type { Metadata } from "next";
import Dashboard from "@/views/(private)/dashboard/Dashboard.views";

export const metadata: Metadata = {
  title: "Dashboard | Portfolio Overview & Market Insights",
  description:
    "Monitor your portfolio performance, track active positions, and stay updated with key market insights from your investment dashboard.",
};

function Page() {
  return <Dashboard />;
}

export default Page;
