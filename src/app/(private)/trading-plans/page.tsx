import View from "./view";
import { cookies } from "next/headers";
import { ApiResponse, TradingPlan } from "@/types/index";

async function Page(req) {
  const searchParams = await req.searchParams;
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    // redirect("/login")
    throw new Error("Unauthorized");
  }

  const request = await fetch(
    `http://localhost:3000/api/trading/plan?limit=10&page=${
      searchParams?.page ?? 1
    }&search=${searchParams?.q ?? ""}&sort=${searchParams?.sort}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const response: ApiResponse<TradingPlan[]> = await request.json();

  return <View list={response} />;
}

export default Page;
