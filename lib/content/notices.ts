import "server-only";

import { loadAktuality, loadPublicAktuality } from "@/lib/content/load";
import {
  isPdfAvailable,
  resolvePdfHref,
} from "@/lib/content/pdf-availability";
import type { Notice as SchemaNotice } from "@/lib/content/schema";
import type {
  Notice,
  NoticeArticle,
  NoticeAttachment,
  NoticePdf,
} from "@/lib/content/notices-shared";

export type {
  Notice,
  NoticeArticle,
  NoticeAttachment,
  NoticePdf,
} from "@/lib/content/notices-shared";
export { formatNoticeDate } from "@/lib/content/notices-shared";

function enrichNotice(notice: SchemaNotice): Notice {
  if (notice.kind === "pdf") {
    const available = isPdfAvailable(notice.pdfHref);
    return {
      ...notice,
      available,
      pdfHref: available ? resolvePdfHref(notice.pdfHref) : notice.pdfHref,
    };
  }

  return {
    ...notice,
    attachments: notice.attachments?.map((doc) => {
      const available = isPdfAvailable(doc.href);
      return {
        ...doc,
        available,
        href: available ? resolvePdfHref(doc.href) : doc.href,
      };
    }),
  };
}

export function getAllNotices(): Notice[] {
  return loadAktuality().items.map(enrichNotice);
}

export function getPublicNotices(): Notice[] {
  return loadPublicAktuality().items.map(enrichNotice);
}

/** Public notices only (active). */
export const latestNotices = getPublicNotices();
