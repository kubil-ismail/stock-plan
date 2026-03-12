import type { Metadata } from "next";
import Login from "@/views/(public)/auth/login/Login.views";

export const metadata: Metadata = {
  title: "Login | StockPlan",
  description:
    "Sign in to your StockPlan account to track trades, manage your portfolio, and monitor market opportunities.",
};

function Page() {
  return <Login />;
}

export default Page;
