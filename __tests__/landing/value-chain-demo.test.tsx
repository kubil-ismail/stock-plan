import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ValueChainDemo } from "@/components/landing/value-chain-demo";
import { valueChainDemo } from "@/lib/landing-content";

describe("ValueChainDemo", () => {
  it("menandai data sebagai ilustrasi", () => {
    render(<ValueChainDemo />);

    expect(screen.getByText("Ilustrasi")).toBeInTheDocument();
    expect(screen.getByText(valueChainDemo.description)).toBeInTheDocument();
    expect(screen.getByText(valueChainDemo.note)).toBeInTheDocument();
  });

  it("menampilkan satu baris per perusahaan beserta header kolom", () => {
    render(<ValueChainDemo />);

    const table = screen.getByRole("table");
    expect(
      within(table).getAllByRole("columnheader").map((h) => h.textContent),
    ).toEqual(["Kode", "Tahap", "Eksposur pendapatan"]);
    // 1 baris header + baris data
    expect(within(table).getAllByRole("row")).toHaveLength(
      valueChainDemo.rows.length + 1,
    );
  });

  it.each(valueChainDemo.rows)(
    "menampilkan $code pada tahap $layer dengan eksposur $exposure%",
    ({ code, layer, exposure }) => {
      render(<ValueChainDemo />);

      const row = screen.getByRole("row", { name: new RegExp(`^${code}\\b`) });
      expect(within(row).getByText(layer)).toBeInTheDocument();
      expect(within(row).getByText(`${exposure}%`)).toBeInTheDocument();
      expect(
        within(row).getByRole("img", {
          name: `Eksposur pendapatan ${exposure} persen`,
        }),
      ).toBeInTheDocument();
    },
  );

  it("data demo valid: eksposur berada di antara 0 dan 100", () => {
    for (const row of valueChainDemo.rows) {
      expect(row.exposure).toBeGreaterThanOrEqual(0);
      expect(row.exposure).toBeLessThanOrEqual(100);
    }
  });
});
