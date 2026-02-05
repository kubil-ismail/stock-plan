import { cookies } from "next/headers";

export async function GET(
  _req: Request,
  ctx: RouteContext<"/api/trading/setup/[id]">
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const { id } = await ctx.params;

  const res = await fetch(`http://localhost:8000/v1/trading/setup/${id}`, {
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

export async function PATCH(
  req: Request,
  ctx: RouteContext<"/api/trading/setup/[id]">
) {
  const cookieStore = await cookies();
  const token =
    cookieStore.get("token")?.value ?? req.headers.get("authorization");

  const body = await req.json();

  const { id } = await ctx.params;

  const res = await fetch(`http://localhost:8000/v1/trading/setup/${id}`, {
    method: "PATCH",
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

  return Response.json(data);
}

export async function DELETE(
  _req: Request,
  ctx: RouteContext<"/api/trading/setup/[id]">
) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  const { id } = await ctx.params;

  const res = await fetch(`http://localhost:8000/v1/trading/setup/${id}`, {
    method: "DELETE",
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
