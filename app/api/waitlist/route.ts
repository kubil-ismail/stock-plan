import { isValidEmail } from "@/lib/waitlist";

/**
 * Menerima pendaftaran daftar tunggu dan meneruskannya ke API backend.
 *
 * Env:
 * - WAITLIST_API_URL: endpoint POST di backend (menerima { email }).
 *
 * Jika WAITLIST_API_URL belum diatur: di production balas 503 supaya
 * pendaftaran tidak terlihat berhasil padahal tidak tersimpan. Di
 * development, request diterima dan hanya dicatat di console.
 */
export async function POST(request: Request) {
  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return Response.json({ error: "invalid_body" }, { status: 400 });
  }

  if (typeof email !== "string" || !isValidEmail(email)) {
    return Response.json({ error: "invalid_email" }, { status: 400 });
  }

  const endpoint = process.env.WAITLIST_API_URL;
  if (!endpoint) {
    if (process.env.NODE_ENV === "production") {
      return Response.json({ error: "not_configured" }, { status: 503 });
    }
    console.warn("[waitlist] WAITLIST_API_URL belum diatur, email tidak disimpan.");
    return Response.json({ ok: true });
  }

  try {
    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email.trim() }),
    });
    if (!upstream.ok) {
      return Response.json({ error: "upstream_failed" }, { status: 502 });
    }
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "upstream_unreachable" }, { status: 502 });
  }
}
