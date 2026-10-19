import { NextResponse } from "next/server";
import { contentSchemas } from "@/lib/content/schema";
import { isAllowedContentFile } from "@/lib/cms/allowlist";
import { requireAdminApi, jsonError } from "@/lib/cms/api";
import { commitFiles, readContentJson } from "@/lib/cms/github";

type Params = { params: Promise<{ file: string }> };

export async function GET(_request: Request, { params }: Params) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const { file } = await params;
  const fileName = file.endsWith(".json") ? file : `${file}.json`;
  if (!isAllowedContentFile(fileName)) {
    return jsonError("Súbor nie je povolený.", 400);
  }

  try {
    const { path, sha, json, source } = await readContentJson(fileName);
    const parsed = contentSchemas[fileName].parse(json);
    return NextResponse.json({ path, sha, data: parsed, source });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Nepodarilo sa načítať obsah.";
    return jsonError(message, 500);
  }
}

export async function PUT(request: Request, { params }: Params) {
  const { error } = await requireAdminApi();
  if (error) return error;

  const { file } = await params;
  const fileName = file.endsWith(".json") ? file : `${file}.json`;
  if (!isAllowedContentFile(fileName)) {
    return jsonError("Súbor nie je povolený.", 400);
  }

  let body: { sha?: string; data?: unknown; message?: string };
  try {
    body = (await request.json()) as {
      sha?: string;
      data?: unknown;
      message?: string;
    };
  } catch {
    return jsonError("Neplatná požiadavka.", 400);
  }

  if (!body.sha || body.data === undefined) {
    return jsonError("Chýba sha alebo data.", 400);
  }

  const schema = contentSchemas[fileName];
  const parsed = schema.safeParse(body.data);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Neplatné dáta.", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const path = `content/${fileName}`;
  const text = `${JSON.stringify(parsed.data, null, 2)}\n`;

  if (!process.env.GITHUB_TOKEN || !process.env.GITHUB_REPO) {
    return jsonError(
      "Uloženie zatiaľ nie je pripravené. Skúste to neskôr alebo kontaktujte správcu.",
      503,
    );
  }

  try {
    const result = await commitFiles({
      message:
        body.message?.trim() ||
        `cms: aktualizácia ${fileName.replace(".json", "")}`,
      files: [{ path, content: text, encoding: "utf-8" }],
      expectedShas: { [path]: body.sha },
    });

    return NextResponse.json({
      ok: true,
      commitSha: result.commitSha,
      branch: result.branch,
      message: "Zmeny boli uložené.",
      hint: "Web sa aktualizuje.",
    });
  } catch (err) {
    if (err instanceof Error && err.message === "CONTENT_CONFLICT") {
      return jsonError(
        "Obsah sa medzitým zmenil. Obnovte stránku a skúste znova.",
        409,
      );
    }
    const message =
      err instanceof Error ? err.message : "Uloženie zlyhalo.";
    return jsonError(message, 500);
  }
}
