import type { Metadata } from "next";
import Portfolio from "@/views/(private)/portfolio/Portfolio.views";

export const metadata: Metadata = {
  title: "Portfolio | Track Your Investments & Performance",
  description:
    "Monitor your investment portfolio, track gains and losses, and analyze performance across your holdings.",
};

function Page() {
  return <Portfolio />;
}

export default Page;
