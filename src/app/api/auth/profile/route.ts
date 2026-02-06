import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      // token gak ada → logout
      cookieStore.delete("token");

      return Response.json(
        { success: false, message: "unauthorized", data: null },
        { status: 401 }
      );
    }

    const res = await fetch("http://localhost:3003/v1/auth/profile", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    // 🔥 HANDLE 401 DARI BACKEND
    if (res.status === 401) {
      cookieStore.delete("token"); // logout server-side

      return Response.json(
        { success: false, message: "session expired", data: null },
        { status: 401 }
      );
    }

    if (!res.ok) {
      return Response.json(
        { success: false, message: "failed", data: null },
        { status: res.status }
      );
    }

    const data = await res.json();
    return Response.json(data);
  } catch {
    return Response.json({ success: false }, { status: 500 });
  }
}
