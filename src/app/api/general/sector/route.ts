import { cookies } from "next/headers";

export const dynamic = "force-static";

export async function GET(req: Request) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // 🚫 token gak ada
  if (!token) {
    cookieStore.delete("token");

    return Response.json(
      { success: false, message: "unauthorized", data: null },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(req.url);
  const page = searchParams.get("page") ?? "1";
  const limit = searchParams.get("limit") ?? "10";

  const res = await fetch(
    `http://localhost:8000/v1/general/sector?page=${page}&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // 🔥 token invalid / expired
  if (res.status === 401) {
    cookieStore.delete("token");

    return Response.json(
      { success: false, message: "session expired", data: null },
      { status: 401 }
    );
  }

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
