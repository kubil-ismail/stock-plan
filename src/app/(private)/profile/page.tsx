import type { Metadata } from "next";
import Profile from "@/views/(private)/profile/Profile.views";

export const metadata: Metadata = {
  title: "Profile | Manage Your Profile & Preferences",
  description:
    "Update your account information, manage preferences, and configure your trading settings.",
};

function Page() {
  return <Profile />;
}

export default Page;
