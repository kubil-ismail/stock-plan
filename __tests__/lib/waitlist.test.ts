import { describe, expect, it, vi } from "vitest";

import { isValidEmail, submitWaitlist, WAITLIST_MESSAGES } from "@/lib/waitlist";

describe("isValidEmail", () => {
  it.each(["a@b.co", "nama.belakang@domain.id", "  spasi@domain.com  "])(
    "menerima %s",
    (value) => {
      expect(isValidEmail(value)).toBe(true);
    },
  );

  it.each(["", "abc", "abc@", "@domain.com", "a@b", "a b@domain.com", "a@b.c"])(
    "menolak %j",
    (value) => {
      expect(isValidEmail(value)).toBe(false);
    },
  );
});

describe("submitWaitlist", () => {
  it("tidak memanggil fetch untuk email tidak valid", async () => {
    const fetchMock = vi.fn();

    const result = await submitWaitlist("abc", fetchMock as unknown as typeof fetch);

    expect(result).toEqual({ ok: false, message: WAITLIST_MESSAGES.invalid });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("mengirim email yang sudah dirapikan ke /api/waitlist", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });

    const result = await submitWaitlist(
      "  user@domain.com ",
      fetchMock as unknown as typeof fetch,
    );

    expect(result).toEqual({ ok: true });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("/api/waitlist");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body)).toEqual({ email: "user@domain.com" });
  });

  it("mengembalikan pesan gagal jika server membalas error", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: false });

    const result = await submitWaitlist(
      "user@domain.com",
      fetchMock as unknown as typeof fetch,
    );

    expect(result).toEqual({ ok: false, message: WAITLIST_MESSAGES.failed });
  });

  it("mengembalikan pesan gagal jika jaringan bermasalah", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("offline"));

    const result = await submitWaitlist(
      "user@domain.com",
      fetchMock as unknown as typeof fetch,
    );

    expect(result).toEqual({ ok: false, message: WAITLIST_MESSAGES.failed });
  });
});
