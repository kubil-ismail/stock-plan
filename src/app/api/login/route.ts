import http from "@/lib/http";
import { API_AUTH_LOGIN } from "@/lib/api";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const request = await http.post(API_AUTH_LOGIN, { email, password });
    const response = request.data?.data;

    if (request.data?.status) {
      (await cookies()).set("token", response?.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });

      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ success: false }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
