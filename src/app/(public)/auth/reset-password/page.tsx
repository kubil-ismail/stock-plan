import type { Metadata } from "next";
import ResetPassword from "@/views/(public)/auth/reset-password/Reset-Password.views";

export const metadata: Metadata = {
  title: "Reset Password | StockPlan",
  description:
    "Create a new password for your StockPlan account and regain access to your trading dashboard and portfolio.",
};

function Page() {
  return <ResetPassword />;
}

export default Page;
