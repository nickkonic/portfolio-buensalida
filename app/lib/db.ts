import { Pool } from "pg";

/**
 * Singleton pg.Pool for server-side raw SQL queries.
 *
 * Reuses the same pool across Next.js hot-reloads in development
 * so we never exhaust the connection limit.
 *
 * Required env var (add to .env.local):
 *   DATABASE_URL=postgresql://user:password@host:5432/dbname
 */

declare global {
  // eslint-disable-next-line no-var
  var __pgPool: Pool | undefined;
}

function createPool(): Pool {
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 10,             // max connections in the pool
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 2_000,
  });
}

export const db: Pool =
  globalThis.__pgPool ?? (globalThis.__pgPool = createPool());

/**
 * Convenience helper — run a query and get rows back typed.
 *
 * @example
 * const users = await query<{ id: string; name: string }>(
 *   "SELECT id, name FROM users WHERE active = $1",
 *   [true]
 * );
 */
export async function query<T extends object = Record<string, unknown>>(
  sql: string,
  params?: unknown[]
): Promise<T[]> {
  const { rows } = await db.query<T>(sql, params);
  return rows;
}
