"use client";

import { useEffect } from "react";
import { SpinnerBox } from "@/components/Loading";
import { useRouter } from "next/navigation";

function Page() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await fetch("/api/auth/logout", {
        method: "POST",
      });

      router.replace("/auth/login");
    };

    logout();
  }, [router]);

  return (
    <div className="h-screen flex items-center justify-center">
      <SpinnerBox />
    </div>
  );
}

export default Page;
