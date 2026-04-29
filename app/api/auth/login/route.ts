import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { query } from "@/app/lib/db";
import { verifyPassword } from "@/app/api/auth/login";
import {
  generateSessionToken,
  setSessionCookie,
  SESSION_DURATION_MS,
} from "@/app/api/auth/session";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 400 });
  }

  const { email, password } = parsed.data;

  const users = await query<{ id: string; email: string; password_hash: string }>(
    "SELECT id, email, password_hash FROM admin_users WHERE email = $1 LIMIT 1",
    [email]
  );

  const user = users[0];

  // Always run verifyPassword (with a dummy hash) to avoid timing-based user enumeration
  const dummyHash = "a".repeat(128) + ".deadbeef";
  const isValid = user
    ? await verifyPassword(password, user.password_hash)
    : await verifyPassword(password, dummyHash).then(() => false);

  if (!user || !isValid) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = generateSessionToken();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await query(
    `INSERT INTO admin_sessions (id, token, user_id, expires_at)
     VALUES (gen_random_uuid()::text, $1, $2, $3)`,
    [token, user.id, expiresAt]
  );

  await setSessionCookie(token);

  return NextResponse.json({ ok: true });
}
