import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

/**
 * Hash a plaintext password using scrypt + random salt.
 * Output format: "<hash_hex>.<salt_hex>"
 */
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

/**
 * Verify a plaintext password against a stored hash.
 * Uses timing-safe comparison to prevent timing attacks.
 */
export async function verifyPassword(
  password: string,
  stored: string
): Promise<boolean> {
  const [hashHex, salt] = stored.split(".");
  if (!hashHex || !salt) return false;
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  const storedBuf = Buffer.from(hashHex, "hex");
  return timingSafeEqual(buf, storedBuf);
}
