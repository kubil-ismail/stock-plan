import {
  PB_PATH_AUTH_LOGIN,
  PB_PATH_AUTH_LOGOUT,
  PB_PATH_SESSION,
} from "@/lib/route";
import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  // const reset_token = request.cookies.get("reset_token")?.value;
  const { pathname } = request.nextUrl;

  //   // CHECK IF HAVE A VALID RESET PASSWORD TOKEN
  //   if (reset_token && pathname !== AUTH_RESET_PASSWORD) {
  //     const url = new URL(AUTH_RESET_PASSWORD, request.url);
  //     return NextResponse.redirect(url);
  //   }

  //   // CHECK IF NOT HAVE A VALID RESET PASSWORD TOKEN
  //   if (!reset_token && pathname === AUTH_RESET_PASSWORD) {
  //     const url = new URL(DASHBOARD, request.url);
  //     return NextResponse.redirect(url);
  //   }

  // halaman publik (bebas auth)
  const authPaths = ["/auth"];

  // allow auth paths
  if (authPaths.some((path) => pathname.startsWith(path))) {
    // check if already has token
    if (token && pathname !== PB_PATH_AUTH_LOGOUT) {
      const url = new URL(PB_PATH_SESSION, request.url);
      return NextResponse.redirect(url);
    } else {
      return NextResponse.next();
    }
  }

  if (!token) {
    const url = new URL(PB_PATH_AUTH_LOGIN, request.url);
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // CHECK IF HAS TOKEN AND GO DEFAULT PATH
  if (token && pathname === "/") {
    const url = new URL(PB_PATH_SESSION, request.url);
    return NextResponse.redirect(url);
  }

  // CHECK IF TOKEN EMPTY AND GO DEFAULT PATH
  if (!token && pathname === "/") {
    const url = new URL(PB_PATH_AUTH_LOGIN, request.url);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// optional: tentuin route mana aja yg diproteksi
export const config = {
  matcher: ["/((?!api|_next|favicon.ico|.*\\..*).*)"],
};
