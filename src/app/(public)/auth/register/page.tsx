import type { Metadata } from "next";
import Register from "@/views/(public)/auth/register/Regiester.views";

export const metadata: Metadata = {
  title: "Sign Up | StockPlan",
  description:
    "Create your StockPlan account to track trades, manage your portfolio, and analyze stock market opportunities.",
};

function Page() {
  return <Register />;
}

export default Page;
