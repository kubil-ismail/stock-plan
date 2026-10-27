const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export type WaitlistResult = { ok: true } | { ok: false; message: string };

export const WAITLIST_MESSAGES = {
  invalid: "Masukkan alamat email yang valid.",
  failed: "Pendaftaran belum berhasil. Coba lagi sebentar lagi.",
} as const;

/**
 * Kirim email ke route handler /api/waitlist.
 * `fetchImpl` bisa diganti saat testing.
 */
export async function submitWaitlist(
  email: string,
  fetchImpl: typeof fetch = fetch,
): Promise<WaitlistResult> {
  const trimmed = email.trim();
  if (!isValidEmail(trimmed)) {
    return { ok: false, message: WAITLIST_MESSAGES.invalid };
  }

  try {
    const response = await fetchImpl("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: trimmed }),
    });
    if (!response.ok) {
      return { ok: false, message: WAITLIST_MESSAGES.failed };
    }
    return { ok: true };
  } catch {
    return { ok: false, message: WAITLIST_MESSAGES.failed };
  }
}
