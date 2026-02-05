import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getNextSort(currentSort: string | null, field: string): string {
  if (!currentSort) return `${field}:asc`;

  const [currField, currDir] = currentSort.split(":");

  if (currField !== field) return `${field}:asc`;

  return currDir === "asc" ? `${field}:desc` : `${field}:asc`;
}
