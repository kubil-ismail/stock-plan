import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Features } from "@/components/landing/features";
import { FinalCta } from "@/components/landing/final-cta";
import { HowItWorks } from "@/components/landing/how-it-works";
import {
  Audience,
  NonGoals,
  Pricing,
  Trust,
} from "@/components/landing/info-sections";
import { Problem } from "@/components/landing/problem";
import {
  audience,
  features,
  finalCta,
  nonGoals,
  pricing,
  problem,
  steps,
  trust,
} from "@/lib/landing-content";

describe("Problem", () => {
  it("menampilkan judul dan semua poin masalah", () => {
    render(<Problem />);

    const section = screen.getByRole("region", { name: problem.title });
    expect(within(section).getAllByRole("listitem")).toHaveLength(
      problem.points.length,
    );
    for (const point of problem.points) {
      expect(within(section).getByText(point)).toBeInTheDocument();
    }
  });
});

describe("HowItWorks", () => {
  it("menampilkan langkah berurutan", () => {
    render(<HowItWorks />);

    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(items).toHaveLength(steps.length);
    steps.forEach((step, index) => {
      expect(items[index]).toHaveTextContent(step.title);
      expect(items[index]).toHaveTextContent(step.description);
    });
  });
});

describe("Features", () => {
  it("menampilkan semua fitur dengan judul dan deskripsi", () => {
    render(<Features />);

    expect(screen.getAllByRole("listitem")).toHaveLength(features.length);
    for (const feature of features) {
      expect(
        screen.getByRole("heading", { name: feature.title }),
      ).toBeInTheDocument();
      expect(screen.getByText(feature.description)).toBeInTheDocument();
    }
  });
});

describe("Info sections", () => {
  it("Audience menampilkan judul dan deskripsi", () => {
    render(<Audience />);

    expect(
      screen.getByRole("heading", { level: 2, name: audience.title }),
    ).toBeInTheDocument();
    expect(screen.getByText(audience.description)).toBeInTheDocument();
  });

  it("Trust menampilkan semua poin kredibilitas", () => {
    render(<Trust />);

    for (const point of trust.points) {
      expect(screen.getByText(point)).toBeInTheDocument();
    }
  });

  it("NonGoals menampilkan semua hal yang tidak dilakukan", () => {
    render(<NonGoals />);

    for (const point of nonGoals.points) {
      expect(screen.getByText(point)).toBeInTheDocument();
    }
  });

  it("Pricing tidak menampilkan angka harga dan mengarah ke pendaftaran", () => {
    render(<Pricing />);

    const section = screen.getByRole("region", { name: pricing.title });
    expect(within(section).getByText(pricing.description)).toBeInTheDocument();
    expect(section.textContent).not.toMatch(/Rp|\d{2,}\.\d{3}/);
    expect(
      within(section).getByRole("link", { name: "Daftar tunggu" }),
    ).toHaveAttribute("href", "#daftar-akhir");
  });
});

describe("FinalCta", () => {
  it("menampilkan ajakan penutup dan form daftar tunggu", () => {
    render(<FinalCta />);

    expect(
      screen.getByRole("heading", { level: 2, name: finalCta.title }),
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });
});
