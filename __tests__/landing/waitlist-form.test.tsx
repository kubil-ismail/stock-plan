import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { WaitlistForm } from "@/components/landing/waitlist-form";
import { WAITLIST_MESSAGES, type WaitlistResult } from "@/lib/waitlist";

describe("WaitlistForm", () => {
  it("menampilkan input email berlabel dan tombol daftar", () => {
    render(<WaitlistForm />);

    expect(screen.getByLabelText("Email")).toHaveAttribute("type", "email");
    expect(
      screen.getByRole("button", { name: "Daftar tunggu" }),
    ).toBeEnabled();
  });

  it("menampilkan pesan error untuk email tidak valid", async () => {
    const user = userEvent.setup();
    render(<WaitlistForm />);

    await user.type(screen.getByLabelText("Email"), "abc");
    await user.click(screen.getByRole("button", { name: "Daftar tunggu" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      WAITLIST_MESSAGES.invalid,
    );
    expect(screen.getByLabelText("Email")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });

  it("menampilkan pesan berhasil dan menyembunyikan form setelah terkirim", async () => {
    const user = userEvent.setup();
    const submit = vi.fn().mockResolvedValue({ ok: true });
    render(<WaitlistForm submit={submit} />);

    await user.type(screen.getByLabelText("Email"), "user@domain.com");
    await user.click(screen.getByRole("button", { name: "Daftar tunggu" }));

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Terima kasih",
    );
    expect(submit).toHaveBeenCalledWith("user@domain.com");
    expect(screen.queryByLabelText("Email")).not.toBeInTheDocument();
  });

  it("menampilkan error server dan mempertahankan isi input", async () => {
    const user = userEvent.setup();
    const submit = vi
      .fn<(email: string) => Promise<WaitlistResult>>()
      .mockResolvedValue({ ok: false, message: "Gagal mendaftar." });
    render(<WaitlistForm submit={submit} />);

    await user.type(screen.getByLabelText("Email"), "user@domain.com");
    await user.click(screen.getByRole("button", { name: "Daftar tunggu" }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Gagal mendaftar.",
    );
    expect(screen.getByLabelText("Email")).toHaveValue("user@domain.com");
  });

  it("menonaktifkan tombol selama pengiriman", async () => {
    const user = userEvent.setup();
    let resolveSubmit: (result: WaitlistResult) => void = () => {};
    const submit = vi.fn(
      () =>
        new Promise<WaitlistResult>((resolve) => {
          resolveSubmit = resolve;
        }),
    );
    render(<WaitlistForm submit={submit} />);

    await user.type(screen.getByLabelText("Email"), "user@domain.com");
    await user.click(screen.getByRole("button", { name: "Daftar tunggu" }));

    expect(screen.getByRole("button", { name: "Mengirim..." })).toBeDisabled();

    resolveSubmit({ ok: true });
    await waitFor(() => expect(screen.getByRole("status")).toBeInTheDocument());
  });
});
