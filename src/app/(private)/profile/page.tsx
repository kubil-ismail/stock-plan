import type { Metadata } from "next";
import Profile from "@/views/(private)/profile/Profile.views";
import { get_auth_profile } from "@/services/auth";

export const metadata: Metadata = {
  title: "Profile | Manage Your Profile & Preferences",
  description:
    "Update your account information, manage preferences, and configure your trading settings.",
};

async function Page() {
  const [req_get_profile] = await Promise.all([get_auth_profile()]);

  return <Profile response={{ profile: req_get_profile }} />;
}

export default Page;
