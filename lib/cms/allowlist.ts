import path from "path";
import {
  CONTENT_FILES,
  UPLOAD_PREFIXES,
  type ContentFileName,
} from "@/lib/content/paths";

export function isAllowedContentFile(fileName: string): fileName is ContentFileName {
  return (CONTENT_FILES as readonly string[]).includes(fileName);
}

export function isAllowedRepoPath(repoPath: string): boolean {
  const normalized = repoPath.replace(/\\/g, "/").replace(/^\/+/, "");
  if (normalized.includes("..") || normalized.includes("\0")) return false;

  if (normalized.startsWith("content/")) {
    const name = normalized.slice("content/".length);
    return isAllowedContentFile(name) && !name.includes("/");
  }

  return UPLOAD_PREFIXES.some(
    (prefix) =>
      normalized.startsWith(prefix) &&
      normalized.length > prefix.length &&
      !normalized.slice(prefix.length).includes(".."),
  );
}

export function toRepoPath(fileName: ContentFileName): string {
  return `content/${fileName}`;
}

export function assertAllowedRepoPath(repoPath: string): string {
  const normalized = repoPath.replace(/\\/g, "/").replace(/^\/+/, "");
  if (!isAllowedRepoPath(normalized)) {
    throw new Error(`Path not allowlisted: ${normalized}`);
  }
  return normalized;
}

export function publicUrlFromUploadPath(repoPath: string): string {
  const normalized = assertAllowedRepoPath(repoPath);
  if (!normalized.startsWith("public/")) {
    throw new Error("Not an upload path");
  }
  return `/${normalized.slice("public/".length)}`;
}

export function joinUploadPath(
  prefix: (typeof UPLOAD_PREFIXES)[number],
  fileName: string,
): string {
  const safe = path.basename(fileName).replace(/[^a-zA-Z0-9._-]/g, "-");
  const full = `${prefix}${safe}`;
  return assertAllowedRepoPath(full);
}
