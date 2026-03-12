"use client";

import { PB_PATH_AUTH_LOGIN } from "@/lib/route";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    fetch("/api/logout", { method: "POST" }).finally(() => {
      const timer = setTimeout(() => {
        router.replace(PB_PATH_AUTH_LOGIN);
      }, 1000);
      return () => clearTimeout(timer);
    });
  }, [router]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        {/* Text */}
        <div className="text-center">
          <p className="text-[16px] font-semibold text-[#101828]">Logout...</p>
          <p className="text-[13px] text-[#99A1AF]">Clear your data</p>
        </div>

        {/* Spinner */}
        <div className="w-6 h-6 border-2  border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default LogoutPage;
