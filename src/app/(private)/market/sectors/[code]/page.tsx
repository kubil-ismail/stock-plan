import { SectorDetail } from "@/views/(private)/market/sectors/Detail.views";
import { get_companies } from "@/services/company";

async function Page() {
  const [req_get_companies] = await Promise.all([get_companies()]);

  return <SectorDetail response={{ companies: req_get_companies }} />;
}

export default Page;
