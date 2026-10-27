import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "@/app/page";
import { footer, hero, navLinks } from "@/lib/landing-content";

describe("Landing page", () => {
  it("memiliki tepat satu h1", () => {
    render(<Home />);

    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  });

  it("memiliki landmark header, main, dan footer", () => {
    render(<Home />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("main")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
  });

  it("setiap tautan navigasi menuju id yang ada di halaman", () => {
    const { container } = render(<Home />);

    for (const link of navLinks) {
      expect(container.querySelector(link.href)).not.toBeNull();
    }
  });

  it("tidak memiliki id ganda", () => {
    const { container } = render(<Home />);

    const ids = Array.from(container.querySelectorAll("[id]")).map(
      (element) => element.id,
    );
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("menampilkan 13 bagian utama sesuai outline", () => {
    render(<Home />);

    for (const name of [
      /Kategori saham sering tidak/,
      "Cara kerja StockPlan",
      "Lihat satu tema dari hulu ke hilir",
      "Yang bisa kamu lakukan di StockPlan",
      /Dibuat untuk investor/,
      "Data yang bisa kamu telusuri",
      "Yang tidak kami lakukan",
      /Satu paket/,
      "Pertanyaan yang sering ditanyakan",
      "Mulai dari bisnisnya, bukan dari tebakan",
    ]) {
      expect(screen.getByRole("heading", { level: 2, name })).toBeInTheDocument();
    }
  });

  it("menampilkan disclaimer singkat di hero dan lengkap di footer", () => {
    render(<Home />);

    expect(screen.getByText(hero.disclaimer)).toBeInTheDocument();
    expect(screen.getByText(footer.disclaimer)).toBeInTheDocument();
  });

  it("menyediakan dua form daftar tunggu (hero dan penutup)", () => {
    render(<Home />);

    expect(screen.getAllByLabelText("Email")).toHaveLength(2);
  });

  it("menyediakan tautan lewati ke konten", () => {
    render(<Home />);

    expect(
      screen.getByRole("link", { name: "Lewati ke konten" }),
    ).toHaveAttribute("href", "#konten");
  });
});
