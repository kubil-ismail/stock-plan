import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const tenant = (await cookies()).get("token");
    if (!tenant) {
      throw "undefine token";
    }

    return NextResponse.json({ success: true });
  } catch {
    (await cookies()).delete("token");

    return NextResponse.json({ success: false }, { status: 401 });
  }
}
