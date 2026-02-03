"use client";

import React from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { SpinnerBox } from "@/components/Loading";

function Page() {
  const router = useRouter();

  React.useEffect(() => {
    localStorage.clear();

    Cookies.remove("token");

    router.refresh();
  }, []);

  return (
    <div className="h-screen flex items-center">
      <SpinnerBox />
    </div>
  );
}

export default Page;
