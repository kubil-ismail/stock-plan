import { cookies } from "next/headers";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("token")?.value ?? req.headers.get("authorization");

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "10";
  const sort = searchParams.get("sort") ?? "id:desc";
  const search = searchParams.get("search") ?? "";

  const res = await fetch(
    `http://localhost:3003/v1/trading/plan?page=${page}&limit=${limit}&sort=${sort}&search=${search}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // ❌ backend error lain
  if (!res.ok) {
    return Response.json(
      { success: false, message: "failed", data: null },
      { status: res.status }
    );
  }

  const data = await res.json();

  return Response.json(data);
}
