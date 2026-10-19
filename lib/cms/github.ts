import "server-only";

import { createHash } from "crypto";
import { readFile } from "fs/promises";
import path from "path";
import { assertAllowedRepoPath } from "@/lib/cms/allowlist";

type GhFileResponse = {
  content?: string;
  sha?: string;
  encoding?: string;
  message?: string;
};

type GhRefResponse = {
  object?: { sha?: string };
  message?: string;
};

type GhCommitResponse = {
  sha?: string;
  tree?: { sha?: string };
  message?: string;
};

type GhTreeResponse = {
  sha?: string;
  message?: string;
};

export type RepoFileRead = {
  path: string;
  sha: string;
  text: string;
};

export type CommitFileChange = {
  path: string;
  /** UTF-8 text or base64 for binaries */
  content: string;
  encoding?: "utf-8" | "base64";
};

function getConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "cms-staging";
  if (!token || !repo) {
    throw new Error("GITHUB_TOKEN and GITHUB_REPO must be configured.");
  }
  return { token, repo, branch };
}

function hasGitHubConfig(): boolean {
  return Boolean(process.env.GITHUB_TOKEN && process.env.GITHUB_REPO);
}

/** Local-only SHA so editors can load without GitHub; saves still require a token. */
function localContentSha(text: string): string {
  return createHash("sha1")
    .update(`blob ${Buffer.byteLength(text, "utf8")}\0${text}`)
    .digest("hex");
}

async function ghFetch<T>(
  apiPath: string,
  init?: RequestInit,
): Promise<{ ok: boolean; status: number; data: T }> {
  const { token } = getConfig();
  const res = await fetch(`https://api.github.com${apiPath}`, {
    ...init,
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(init?.headers ?? {}),
    },
    cache: "no-store",
  });
  const data = (await res.json()) as T;
  return { ok: res.ok, status: res.status, data };
}

export async function readRepoFile(repoPath: string): Promise<RepoFileRead> {
  const path = assertAllowedRepoPath(repoPath);
  const { repo, branch } = getConfig();
  const { ok, status, data } = await ghFetch<GhFileResponse>(
    `/repos/${repo}/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}?ref=${encodeURIComponent(branch)}`,
  );
  if (!ok || !data.content || !data.sha) {
    throw new Error(
      data.message || `Failed to read ${path} (${status})`,
    );
  }
  const text = Buffer.from(data.content, "base64").toString("utf8");
  return { path, sha: data.sha, text };
}

export async function readContentJson(fileName: string): Promise<{
  path: string;
  sha: string;
  json: unknown;
  source: "github" | "local";
}> {
  const repoPath = assertAllowedRepoPath(`content/${fileName}`);

  if (!hasGitHubConfig()) {
    const abs = path.join(process.cwd(), repoPath);
    const text = await readFile(abs, "utf8");
    return {
      path: repoPath,
      sha: localContentSha(text),
      json: JSON.parse(text) as unknown,
      source: "local",
    };
  }

  const file = await readRepoFile(repoPath);
  return {
    path: file.path,
    sha: file.sha,
    json: JSON.parse(file.text) as unknown,
    source: "github",
  };
}

/**
 * Multi-file commit via Git Data API (blobs → tree → commit → ref update).
 * Uses optimistic locking against provided base file SHAs when present.
 */
export async function commitFiles(options: {
  message: string;
  files: CommitFileChange[];
  /** Optional map of path → expected blob SHA for conflict detection on JSON files */
  expectedShas?: Record<string, string>;
}): Promise<{ commitSha: string; branch: string }> {
  const { repo, branch } = getConfig();

  for (const file of options.files) {
    assertAllowedRepoPath(file.path);
  }

  if (options.expectedShas) {
    for (const [path, expectedSha] of Object.entries(options.expectedShas)) {
      assertAllowedRepoPath(path);
      const current = await readRepoFile(path);
      if (current.sha !== expectedSha) {
        const err = new Error("CONTENT_CONFLICT");
        throw err;
      }
    }
  }

  const ref = await ghFetch<GhRefResponse>(
    `/repos/${repo}/git/ref/heads/${encodeURIComponent(branch)}`,
  );
  if (!ref.ok || !ref.data.object?.sha) {
    throw new Error(ref.data.message || "Failed to read branch ref");
  }
  const headSha = ref.data.object.sha;

  const headCommit = await ghFetch<GhCommitResponse>(
    `/repos/${repo}/git/commits/${headSha}`,
  );
  if (!headCommit.ok || !headCommit.data.tree?.sha) {
    throw new Error(headCommit.data.message || "Failed to read head commit");
  }
  const baseTreeSha = headCommit.data.tree.sha;

  const treeItems: {
    path: string;
    mode: "100644";
    type: "blob";
    sha: string;
  }[] = [];

  for (const file of options.files) {
    const encoding = file.encoding ?? "utf-8";
    const blob = await ghFetch<{ sha?: string; message?: string }>(
      `/repos/${repo}/git/blobs`,
      {
        method: "POST",
        body: JSON.stringify({
          content: file.content,
          encoding: encoding === "base64" ? "base64" : "utf-8",
        }),
      },
    );
    if (!blob.ok || !blob.data.sha) {
      throw new Error(blob.data.message || `Failed to create blob for ${file.path}`);
    }
    treeItems.push({
      path: file.path,
      mode: "100644",
      type: "blob",
      sha: blob.data.sha,
    });
  }

  const tree = await ghFetch<GhTreeResponse>(`/repos/${repo}/git/trees`, {
    method: "POST",
    body: JSON.stringify({
      base_tree: baseTreeSha,
      tree: treeItems,
    }),
  });
  if (!tree.ok || !tree.data.sha) {
    throw new Error(tree.data.message || "Failed to create tree");
  }

  const commit = await ghFetch<GhCommitResponse>(`/repos/${repo}/git/commits`, {
    method: "POST",
    body: JSON.stringify({
      message: options.message,
      tree: tree.data.sha,
      parents: [headSha],
    }),
  });
  if (!commit.ok || !commit.data.sha) {
    throw new Error(commit.data.message || "Failed to create commit");
  }

  const update = await ghFetch<{ message?: string }>(
    `/repos/${repo}/git/refs/heads/${encodeURIComponent(branch)}`,
    {
      method: "PATCH",
      body: JSON.stringify({ sha: commit.data.sha }),
    },
  );
  if (!update.ok) {
    throw new Error(update.data.message || "Failed to update branch ref");
  }

  return { commitSha: commit.data.sha, branch };
}

export async function deleteRepoFile(options: {
  path: string;
  sha: string;
  message: string;
}): Promise<void> {
  const path = assertAllowedRepoPath(options.path);
  const { repo, branch } = getConfig();
  const res = await ghFetch<{ message?: string }>(
    `/repos/${repo}/contents/${encodeURIComponent(path).replace(/%2F/g, "/")}`,
    {
      method: "DELETE",
      body: JSON.stringify({
        message: options.message,
        sha: options.sha,
        branch,
      }),
    },
  );
  if (!res.ok) {
    throw new Error(res.data.message || `Failed to delete ${path}`);
  }
}
