import http from "@/lib/http";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { API_AUTH_REGISTER } from "@/lib/api";

export async function POST(req: Request) {
  try {
    const { fullname, username, email, password } = await req.json();

    const request = await http.post(API_AUTH_REGISTER, {
      fullname,
      username,
      email,
      password,
    });
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return NextResponse.json(error?.response?.data, { status: 400 });
  }
}
