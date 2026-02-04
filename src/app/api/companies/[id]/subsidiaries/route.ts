import { cookies } from "next/headers";

export async function GET(
  _req: Request,
  ctx: RouteContext<"/api/companies/[id]/subsidiaries">
) {
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

  const { id } = await ctx.params;

  const res = await fetch(
    `http://localhost:3003/v1/companies/${id}/subsidiaries`,
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
