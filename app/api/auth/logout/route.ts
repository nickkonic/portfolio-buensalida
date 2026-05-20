import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { query } from "@/app/lib/db";
import { SESSION_COOKIE, clearSessionCookie } from "@/app/lib/auth/session";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await query("DELETE FROM admin_sessions WHERE token = $1", [token]);
  }

  await clearSessionCookie();

  return NextResponse.json({ ok: true });
}
