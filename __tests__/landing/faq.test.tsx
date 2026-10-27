import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Faq } from "@/components/landing/faq";
import { faq } from "@/lib/landing-content";

describe("Faq", () => {
  it("menampilkan semua pertanyaan dalam keadaan tertutup", () => {
    render(<Faq />);

    for (const item of faq) {
      expect(
        screen.getByRole("button", { name: item.question }),
      ).toHaveAttribute("aria-expanded", "false");
    }
    expect(screen.queryByRole("region", { name: /./ })).not.toBeInTheDocument();
  });

  it("membuka jawaban saat pertanyaan diklik", async () => {
    const user = userEvent.setup();
    render(<Faq />);

    const button = screen.getByRole("button", { name: faq[0].question });
    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByRole("region", { name: faq[0].question }),
    ).toHaveTextContent(faq[0].answer);
  });

  it("menutup jawaban sebelumnya saat pertanyaan lain dibuka", async () => {
    const user = userEvent.setup();
    render(<Faq />);

    const first = screen.getByRole("button", { name: faq[0].question });
    const second = screen.getByRole("button", { name: faq[1].question });
    await user.click(first);
    await user.click(second);

    expect(first).toHaveAttribute("aria-expanded", "false");
    expect(second).toHaveAttribute("aria-expanded", "true");
    expect(screen.getAllByRole("region", { name: /./ })).toHaveLength(1);
  });

  it("menutup jawaban saat pertanyaan yang sama diklik lagi", async () => {
    const user = userEvent.setup();
    render(<Faq />);

    const button = screen.getByRole("button", { name: faq[2].question });
    await user.click(button);
    await user.click(button);

    expect(button).toHaveAttribute("aria-expanded", "false");
  });

  it("dapat dioperasikan dengan keyboard", async () => {
    const user = userEvent.setup();
    render(<Faq />);

    const button = screen.getByRole("button", { name: faq[0].question });
    button.focus();
    await user.keyboard("{Enter}");

    expect(button).toHaveAttribute("aria-expanded", "true");
  });
});
