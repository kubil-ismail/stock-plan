import View from "./view";
import { cookies } from "next/headers";
import {
  ApiResponse,
  TradingPlan,
  ListCompanies,
  ListSetup,
} from "@/types/index";

async function Page(req) {
  const searchParams = await req.searchParams;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    // redirect("/login")
    throw new Error("Unauthorized");
  }

  const params = new URLSearchParams({
    limit: "10",
    page: searchParams.page ?? "1",
    search: searchParams.q ?? "",
    sort: searchParams.sort ?? "",
  });

  const headers = { Authorization: token };

  const [planRes, companiesRes, setupRes] = await Promise.all([
    fetch(`http://localhost:3000/api/trading/plan?${params.toString()}`, {
      headers,
      cache: "no-store",
    }),
    fetch(`http://localhost:3000/api/companies/list`, {
      headers,
      cache: "no-store",
    }),
    fetch(`http://localhost:3000/api/trading/setup/list`, {
      headers,
      cache: "no-store",
    }),
  ]);

  if (!planRes.ok || !companiesRes.ok) {
    throw new Error("Failed to fetch data");
  }

  const [plans, companies, setup] = await Promise.all([
    planRes.json() as Promise<ApiResponse<TradingPlan[]>>,
    companiesRes.json() as Promise<ApiResponse<ListCompanies[]>>,
    setupRes.json() as Promise<ApiResponse<ListSetup[]>>,
  ]);

  return <View list={plans} companies={companies} setup={setup} />;
}

export default Page;
