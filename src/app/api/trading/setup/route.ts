import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("token")?.value ?? req.headers.get("authorization");

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "10";
  const search = searchParams.get("search") ?? "";

  const res = await fetch(
    `http://localhost:3003/v1/trading/setup?page=${page}&limit=${limit}&search=${search}`,
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

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("token")?.value ?? req.headers.get("authorization");

  const body = await req.json();

  const res = await fetch("http://localhost:3003/v1/trading/setup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name: body.name,
      description: body.description,
      timeframe: body.timeframe,
      script: body.script,
    }),
  });

  const data = await res.json();

  // ❌ backend error lain
  if (!res.ok) {
    return Response.json(
      { success: false, message: data?.message ?? "failed", data: null },
      { status: res.status }
    );
  }

  revalidateTag("get-trading-setup", "max");

  return Response.json(data);
}
