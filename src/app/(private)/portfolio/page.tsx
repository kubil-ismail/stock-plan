import type { Metadata } from "next";
import Portfolio from "@/views/(private)/portfolio/Portfolio.views";
import { get_auth_trading_plan } from "@/services/auth";

export const metadata: Metadata = {
  title: "Portfolio | Track Your Investments & Performance",
  description:
    "Monitor your investment portfolio, track gains and losses, and analyze performance across your holdings.",
};

interface PageProps {
  searchParams: { search: string };
}

async function Page({ searchParams }: PageProps) {
  const { search } = await searchParams;
  const [req_get_auth_trading_plan] = await Promise.all([
    get_auth_trading_plan({ page: 1, search }),
  ]);

  return (
    <Portfolio
      response={{
        trading_plan: req_get_auth_trading_plan,
      }}
    />
  );
}

export default Page;
