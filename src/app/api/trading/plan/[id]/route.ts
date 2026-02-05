import { cookies } from "next/headers";

export async function GET(
  _req: Request,
  ctx: RouteContext<"/api/trading/plan/[id]">
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const { id } = await ctx.params;

  const res = await fetch(`http://localhost:3003/v1/trading/plan/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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
