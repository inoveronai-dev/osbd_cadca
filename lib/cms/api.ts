import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth/session";

export async function requireAdminApi() {
  const session = await getSession();
  if (!session) {
    return {
      session: null as null,
      error: NextResponse.json({ error: "Neautorizovaný prístup." }, { status: 401 }),
    };
  }
  return { session, error: null as null };
}

export function jsonError(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}
