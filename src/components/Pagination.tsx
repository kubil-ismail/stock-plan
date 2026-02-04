"use client";

import { useEffect, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

type Props = {
  page: number;
  limit: number;
  total: number;
  show: boolean;
};

function getPages(current: number, total: number) {
  const pages: (number | "...")[] = [];

  if (total <= 5) {
    for (let i = 1; i <= total; i++) pages.push(i);
    return pages;
  }

  pages.push(1);

  if (current > 3) pages.push("...");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let i = start; i <= end; i++) pages.push(i);

  if (current < total - 2) pages.push("...");

  pages.push(total);

  return pages;
}

export function TradingPagination({ page, limit, total, show }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loadingPage, setLoadingPage] = useState<number | null>(null);

  const totalPages = Math.ceil(total / limit);
  const pages = getPages(page, totalPages);

  // 🔥 reset loading saat URL berubah
  useEffect(() => {
    setLoadingPage(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  const goTo = (p: number) => {
    if (p === page || loadingPage) return;

    setLoadingPage(p);

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`?${params.toString()}`);
  };

  if (!show || totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        {/* Prev */}
        <PaginationItem>
          <PaginationPrevious
            onClick={() => page > 1 && goTo(page - 1)}
            aria-disabled={page === 1 || loadingPage !== null}
            className={`cursor-pointer ${
              page === 1 || loadingPage ? "pointer-events-none opacity-50" : ""
            }`}
          />
        </PaginationItem>

        {pages.map((p, i) =>
          p === "..." ? (
            <PaginationItem key={`ellipsis-${i}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={`page-${p}-${i}`}>
              <PaginationLink
                isActive={p === page}
                onClick={() => goTo(p)}
                className="cursor-pointer"
              >
                {loadingPage === p ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  p
                )}
              </PaginationLink>
            </PaginationItem>
          )
        )}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={() => page < totalPages && goTo(page + 1)}
            aria-disabled={page === totalPages || loadingPage !== null}
            className={`cursor-pointer ${
              page === totalPages || loadingPage
                ? "pointer-events-none opacity-50"
                : ""
            }`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
