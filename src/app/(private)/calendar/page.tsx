import type { Metadata } from "next";
import Calendar from "@/views/(private)/calendar/Calendar.views";

export const metadata: Metadata = {
  title: "Market Calendar | Earnings, Dividends & Economic Events",
  description:
    "Stay updated with upcoming earnings reports, dividend schedules, and key economic events using the market calendar.",
};

function Page() {
  return <Calendar />;
}

export default Page;
