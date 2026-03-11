import type { Metadata } from "next";
import Notifications from "@/views/(private)/notifications/Notification.views";

export const metadata: Metadata = {
  title: "Notifications | Market Updates & Alerts",
  description:
    "Stay updated with important market alerts, portfolio updates, and trading notifications.",
};

function Page() {
  return <Notifications />;
}

export default Page;
