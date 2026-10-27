// @vitest-environment node
import { afterEach, describe, expect, it, vi } from "vitest";

import { POST } from "@/app/api/waitlist/route";

function jsonRequest(body: unknown) {
  return new Request("http://localhost/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/waitlist", () => {
  it("menolak body yang bukan JSON", async () => {
    const response = await POST(jsonRequest("bukan json"));

    expect(response.status).toBe(400);
  });

  it.each([{}, { email: 123 }, { email: "abc" }])(
    "menolak email tidak valid: %j",
    async (body) => {
      const response = await POST(jsonRequest(body));

      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({ error: "invalid_email" });
    },
  );

  it("di development tanpa WAITLIST_API_URL tetap membalas ok dan mencatat peringatan", async () => {
    vi.stubEnv("WAITLIST_API_URL", "");
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});

    const response = await POST(jsonRequest({ email: "user@domain.com" }));

    expect(response.status).toBe(200);
    expect(warn).toHaveBeenCalledTimes(1);
  });

  it("di production tanpa WAITLIST_API_URL membalas 503", async () => {
    vi.stubEnv("WAITLIST_API_URL", "");
    vi.stubEnv("NODE_ENV", "production");

    const response = await POST(jsonRequest({ email: "user@domain.com" }));

    expect(response.status).toBe(503);
  });

  it("meneruskan email yang sudah dirapikan ke backend", async () => {
    vi.stubEnv("WAITLIST_API_URL", "https://api.example.com/waitlist");
    const fetchMock = vi.fn().mockResolvedValue({ ok: true });
    vi.stubGlobal("fetch", fetchMock);

    const response = await POST(jsonRequest({ email: "  user@domain.com " }));

    expect(response.status).toBe(200);
    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://api.example.com/waitlist");
    expect(JSON.parse(init.body)).toEqual({ email: "user@domain.com" });
  });

  it("membalas 502 jika backend menolak", async () => {
    vi.stubEnv("WAITLIST_API_URL", "https://api.example.com/waitlist");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    const response = await POST(jsonRequest({ email: "user@domain.com" }));

    expect(response.status).toBe(502);
  });

  it("membalas 502 jika backend tidak bisa dijangkau", async () => {
    vi.stubEnv("WAITLIST_API_URL", "https://api.example.com/waitlist");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("down")));

    const response = await POST(jsonRequest({ email: "user@domain.com" }));

    expect(response.status).toBe(502);
  });
});
