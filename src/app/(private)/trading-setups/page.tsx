import View from "./view";
import { cookies } from "next/headers";
import { ApiResponse, TradingSetup } from "@/types/index";

async function Page(req) {
  const searchParams = await req.searchParams;
  console.log(searchParams);
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    // redirect("/login")
    throw new Error("Unauthorized");
  }

  const request = await fetch(
    `http://localhost:3000/api/trading/setup?limit=6&page=${
      searchParams?.page ?? 1
    }&search=${searchParams?.q ?? ""}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );

  const response: ApiResponse<TradingSetup[]> = await request.json();

  return <View list={response} />;
}

export default Page;
