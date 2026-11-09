import { createHash, timingSafeEqual } from "crypto";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "osbd_admin_session";
const SESSION_TTL_HOURS = 10;

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret || secret.length < 32) {
    throw new Error("SESSION_SECRET must be set (min 32 characters).");
  }
  return new TextEncoder().encode(secret);
}

export type SessionPayload = {
  email: string;
};

export async function createSessionToken(email: string): Promise<string> {
  return new SignJWT({ email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_HOURS}h`)
    .sign(getSessionSecret());
}

export async function verifySessionToken(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(token, getSessionSecret());
    const email = payload.email;
    if (typeof email !== "string" || !email) return null;
    return { email };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionPayload | null> {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  return verifySessionToken(token);
}

export async function requireSession(): Promise<SessionPayload> {
  const session = await getSession();
  if (!session) {
    throw new Error("UNAUTHORIZED");
  }
  return session;
}

/** Extra admin emails (same ADMIN_PASSWORD_HASH). Prefer ADMIN_EMAILS env for more. */
const BUILTIN_ADMIN_EMAILS = ["kablovka@osbdcadca.sk"];

/** Allowed admin emails: ADMIN_EMAILS (comma-separated), ADMIN_EMAIL, and builtins. */
function getAdminEmails(): string[] {
  const fromList = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
  const single = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const emails = [...fromList];
  for (const email of BUILTIN_ADMIN_EMAILS) {
    const normalized = email.trim().toLowerCase();
    if (normalized && !emails.includes(normalized)) emails.push(normalized);
  }
  if (single && !emails.includes(single)) emails.push(single);
  return emails;
}

export function verifyAdminCredentials(
  email: string,
  password: string,
): boolean {
  const allowedEmails = getAdminEmails();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH;
  if (!allowedEmails.length || !passwordHash) return false;

  const candidate = createHash("sha256")
    .update(email.trim().toLowerCase())
    .digest();

  let emailOk = false;
  for (const expected of allowedEmails) {
    const expectedHash = createHash("sha256").update(expected).digest();
    if (timingSafeEqual(candidate, expectedHash)) {
      emailOk = true;
    }
  }

  const passwordOk = bcrypt.compareSync(password, passwordHash);
  return emailOk && passwordOk;
}

export function sessionCookieOptions(maxAgeSeconds = SESSION_TTL_HOURS * 3600) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: maxAgeSeconds,
  };
}
