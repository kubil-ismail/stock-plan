import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { Navbar } from "@/components/landing/navbar";
import { footer, hero, navLinks } from "@/lib/landing-content";

describe("Navbar", () => {
  it("menampilkan logo dan semua tautan navigasi ke section", () => {
    render(<Navbar />);

    expect(screen.getByAltText("StockPlan")).toBeInTheDocument();
    const nav = screen.getByRole("navigation", { name: "Navigasi utama" });
    for (const link of navLinks) {
      expect(within(nav).getByRole("link", { name: link.label })).toHaveAttribute(
        "href",
        link.href,
      );
    }
  });

  it("memiliki tombol daftar tunggu yang mengarah ke form", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: "Daftar tunggu" })).toHaveAttribute(
      "href",
      "#daftar",
    );
  });
});

describe("Hero", () => {
  it("menampilkan judul utama, badge, dan disclaimer", () => {
    render(<Hero />);

    expect(
      screen.getByRole("heading", { level: 1, name: hero.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(hero.badge)).toBeInTheDocument();
    expect(screen.getByText(hero.disclaimer)).toBeInTheDocument();
  });

  it("menyediakan form daftar tunggu dan tautan ke contoh", () => {
    render(<Hero />);

    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: hero.secondaryCta }),
    ).toHaveAttribute("href", "#demo");
  });
});

describe("Footer", () => {
  it("menampilkan disclaimer lengkap, tautan hukum, dan hak cipta", () => {
    render(<Footer />);

    expect(screen.getByText(footer.disclaimer)).toBeInTheDocument();
    for (const link of footer.links) {
      expect(screen.getByRole("link", { name: link.label })).toBeInTheDocument();
    }
    expect(
      screen.getByText(`© ${new Date().getFullYear()} StockPlan`),
    ).toBeInTheDocument();
  });
});
