import { loadAktuality, loadPublicAktuality } from "@/lib/content/load";
import type { Notice } from "@/lib/content/schema";

export type { Notice };
export type NoticeAttachment = {
  title: string;
  href: string;
};
export type NoticePdf = Extract<Notice, { kind: "pdf" }>;
export type NoticeArticle = Extract<Notice, { kind: "article" }>;

export function getAllNotices(): Notice[] {
  return loadAktuality().items;
}

export function getPublicNotices(): Notice[] {
  return loadPublicAktuality().items;
}

/** Public notices only (active). */
export const latestNotices = getPublicNotices();

export function formatNoticeDate(isoDate: string): string {
  return new Intl.DateTimeFormat("sk-SK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${isoDate}T12:00:00`));
}
