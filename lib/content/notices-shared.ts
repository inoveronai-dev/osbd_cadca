import type { Notice as SchemaNotice } from "@/lib/content/schema";

export type NoticeAttachment = {
  title: string;
  href: string;
  available?: boolean;
};

export type NoticePdf = Extract<SchemaNotice, { kind: "pdf" }> & {
  available?: boolean;
};

export type NoticeArticle = Omit<
  Extract<SchemaNotice, { kind: "article" }>,
  "attachments"
> & {
  attachments?: NoticeAttachment[];
};

export type Notice = NoticePdf | NoticeArticle;

export function formatNoticeDate(isoDate: string): string {
  return new Intl.DateTimeFormat("sk-SK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${isoDate}T12:00:00`));
}
