import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function transformSectorCode(code: string) {
  return code
    ?.split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function formatRupiah(
  value: number | string,
  options?: {
    prefix?: boolean; // default true => pakai "Rp"
    minimumFractionDigits?: number; // default 0
    maximumFractionDigits?: number; // default 0
  }
): string {
  const number =
    typeof value === "string" ? Number(value.replace(/[^0-9.-]+/g, "")) : value;

  if (isNaN(number)) return "Rp 0";

  const {
    prefix = true,
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  } = options || {};

  const formatted = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(number);

  if (!prefix) {
    return formatted.replace("Rp", "").trim();
  }

  return formatted;
}
