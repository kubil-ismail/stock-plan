import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const res = await fetch("http://localhost:3003/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
      }),
    });

    if (!res.ok) {
      return Response.json({ success: false }, { status: 401 });
    }

    const data = await res.json();

    (await cookies()).set("token", data.data.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false }, { status: 500 });
  }
}
