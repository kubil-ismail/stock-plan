"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
} from "@/components/ui/input-group";
import { Search, Loader2 } from "lucide-react";

type Props = {
  total: number;
};

export function TradingSearch({ total }: Props) {
  const router = useRouter();
  const isMounted = useRef(false);
  const searchParams = useSearchParams();

  const initialQ = searchParams.get("q") ?? "";
  const [value, setValue] = useState(initialQ);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return; // ⛔ skip first render
    }

    const t = setTimeout(() => {
      setLoading(true);

      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set("q", value);
      } else {
        params.delete("q");
      }

      params.set("page", "1");
      router.push(`?${params.toString()}`);
    }, 500);

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // 🔥 URL berubah = search selesai
  useEffect(() => {
    setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.toString()]);

  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput
        placeholder="Search..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={loading}
      />

      <InputGroupAddon>
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
        ) : (
          <Search className="h-4 w-4 text-muted-foreground" />
        )}
      </InputGroupAddon>

      <InputGroupAddon align="inline-end">
        {loading ? "Searching..." : `${total} results`}
      </InputGroupAddon>
    </InputGroup>
  );
}
