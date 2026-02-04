import { cookies } from "next/headers";

export async function POST() {
  const cookieStore = await cookies();

  // ambil semua cookie
  const allCookies = cookieStore.getAll();

  // hapus satu-satu
  allCookies.forEach((cookie) => {
    cookieStore.set(cookie.name, "", {
      path: "/",
      expires: new Date(0),
    });
  });

  return Response.json({ success: true });
}
