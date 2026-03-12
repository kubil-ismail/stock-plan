import type { Metadata } from "next";
import ForgotPassword from "@/views/(public)/auth/forgot-password/Forgot-Password.views";

export const metadata: Metadata = {
  title: "Forgot Password | StockPlan",
  description:
    "Reset your StockPlan account password securely and regain access to your trading dashboard and portfolio.",
};

function Page() {
  return <ForgotPassword />;
}

export default Page;
