import { randomBytes } from "crypto";
import { cookies } from "next/headers";
import { query } from "@/app/lib/db";

export const SESSION_COOKIE = "admin_session";
export const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export interface Session {
  id: string;
  token: string;
  user_id: string;
  expires_at: Date;
}

export interface User {
  id: string;
  email: string;
}

export interface UserDetails {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
}

/**
 * Generate a cryptographically secure random session token.
 */
export function generateSessionToken(): string {
  return randomBytes(32).toString("hex");
}

/**
 * Read the session cookie and validate against the DB.
 * Returns the user row if valid, null otherwise.
 */
export async function getSession(): Promise<User | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const rows = await query<{ user_id: string; expires_at: Date; email: string }>(
    `SELECT s.user_id, s.expires_at, u.email
     FROM admin_sessions s
     JOIN admin_users u ON u.id = s.user_id
     WHERE s.token = $1
     LIMIT 1`,
    [token]
  );

  const session = rows[0];
  if (!session) return null;
  if (new Date(session.expires_at) < new Date()) return null;

  return { id: session.user_id, email: session.email };
}

/**
 * Set the session cookie with secure defaults.
 */
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_MS / 1000,
  });
}

/**
 * Clear the session cookie.
 */
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}
