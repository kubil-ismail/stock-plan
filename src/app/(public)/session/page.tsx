"use client";

import { PR_PATH_DASHBOARD, PB_PATH_AUTH_LOGIN } from "@/lib/route";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const SessionPage = () => {
  const router = useRouter();

  React.useEffect(() => {
    const checkSession = async () => {
      try {
        const request = await fetch("/api/session");
        const response = await request.json();

        if (!response?.success) {
          throw null;
        }

        router.push(PR_PATH_DASHBOARD);
      } catch {
        router.replace(PB_PATH_AUTH_LOGIN);
      }
    };

    checkSession();
  }, [router]);

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4 animate-fade-in">
        {/* Spinner */}
        <Loader2 size={32} className="animate-spin" />

        {/* Text */}
        <div className="text-center">
          <p className="text-[16px] font-semibold text-[#101828]">Preparing</p>

          <p className="text-[13px] text-[#99A1AF]">
            Please wait for your page...
          </p>
        </div>
      </div>
    </div>
  );
};

export default SessionPage;
