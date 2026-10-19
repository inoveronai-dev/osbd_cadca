import { NextResponse } from "next/server";
import { requireAdminApi, jsonError } from "@/lib/cms/api";
import { commitFiles } from "@/lib/cms/github";
import { publicUrlFromUploadPath } from "@/lib/cms/allowlist";
import { buildUploadRepoPath, validateUpload } from "@/lib/cms/upload";

export async function POST(request: Request) {
  const { error } = await requireAdminApi();
  if (error) return error;

  let form: FormData;
  try {
    form = await request.formData();
  } catch {
    return jsonError("Neplatná požiadavka.", 400);
  }

  const file = form.get("file");
  const kind = String(form.get("kind") ?? "");
  const folder = String(form.get("folder") ?? "");
  const baseName = String(form.get("baseName") ?? "subor");

  if (!(file instanceof File)) {
    return jsonError("Chýba súbor.", 400);
  }
  if (kind !== "image" && kind !== "pdf") {
    return jsonError("Neplatný typ súboru.", 400);
  }
  const allowedFolders = [
    "aktuality",
    "stanovy",
    "dokumenty-tlaciva",
    "domovy-poriadok",
    "kablova-tv",
    "homepage",
  ] as const;
  if (!allowedFolders.includes(folder as (typeof allowedFolders)[number])) {
    return jsonError("Neplatný priečinok.", 400);
  }

  const buffer = new Uint8Array(await file.arrayBuffer());
  try {
    const { ext } = validateUpload({
      kind,
      mime: file.type || (kind === "pdf" ? "application/pdf" : ""),
      bytes: buffer,
      originalName: file.name,
    });

    const repoPath = buildUploadRepoPath({
      folder: folder as (typeof allowedFolders)[number],
      kind,
      baseName,
      ext,
    });

    const result = await commitFiles({
      message: `cms: upload ${repoPath}`,
      files: [
        {
          path: repoPath,
          content: Buffer.from(buffer).toString("base64"),
          encoding: "base64",
        },
      ],
    });

    return NextResponse.json({
      ok: true,
      path: repoPath,
      url: publicUrlFromUploadPath(repoPath),
      commitSha: result.commitSha,
      message: "Súbor bol nahratý.",
      hint: "Nezabudnite uložiť zmeny.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Upload zlyhal.";
    return jsonError(message, 400);
  }
}
