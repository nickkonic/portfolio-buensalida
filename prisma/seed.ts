import "dotenv/config";
import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";
import { Pool } from "pg";

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function seed() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });

  try {
    // ── Admin user ───────────────────────────────────────────────────────
    const email = process.env.SEED_ADMIN_EMAIL ?? "admin@example.com";
    const password = process.env.SEED_ADMIN_PASSWORD ?? "changeme123";

    const existing = await pool.query(
      "SELECT id FROM admin_users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      console.log(`Admin user "${email}" already exists — skipping.`);
      return;
    }

    const passwordHash = await hashPassword(password);
    const userId = await pool.query<{ id: string }>(
      `INSERT INTO admin_users (id, email, password_hash, created_at, updated_at)
       VALUES (gen_random_uuid()::text, $1, $2, NOW(), NOW())
       RETURNING id`,
      [email, passwordHash]
    );

    const id = userId.rows[0].id;

    // ── User details ─────────────────────────────────────────────────────
    await pool.query(
      `INSERT INTO admin_user_details (id, user_id, first_name, last_name, created_at, updated_at)
       VALUES (gen_random_uuid()::text, $1, $2, $3, NOW(), NOW())`,
      [id, "Admin", "User"]
    );

    console.log(`✓ Admin user created: ${email}`);
    console.log(`  Password: ${password}`);
    console.log("  Change the password after first login!");
  } finally {
    await pool.end();
  }
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
