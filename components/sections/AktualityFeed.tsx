"use client";

import { useId, useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown, FileText } from "lucide-react";
import {
  formatNoticeDate,
  type Notice,
  type NoticeArticle,
  type NoticePdf,
} from "@/lib/content/notices";
import { cn } from "@/lib/utils";

const PHONE_PATTERN = /(0905 713 605|0907 269 023)/g;

function phoneHref(display: string) {
  return `tel:${display.replace(/\s+/g, "")}`;
}

function renderBodyParagraph(text: string, linkifyPhones?: boolean): ReactNode {
  if (!linkifyPhones) return text;

  const parts = text.split(PHONE_PATTERN);
  return parts.map((part, index) => {
    if (part === "0905 713 605" || part === "0907 269 023") {
      return (
        <a
          key={`${part}-${index}`}
          href={phoneHref(part)}
          className="font-semibold text-forest underline-offset-2 hover:underline"
        >
          {part}
        </a>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

function PdfActionLabel({ featured }: { featured?: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-semibold text-forest",
        featured ? "text-[0.95rem]" : "text-[0.88rem] text-forest/85",
      )}
    >
      <FileText className={featured ? "size-4" : "size-3.5"} aria-hidden />
      Otvoriť oznámenie
      <ArrowRight
        className={cn(
          "transition-transform duration-200 group-hover:translate-x-1",
          featured ? "size-4" : "size-3.5",
        )}
        aria-hidden
      />
    </span>
  );
}

function ArticleExpanded({ notice }: { notice: NoticeArticle }) {
  return (
    <div className="mt-4 border-t border-forest/10 pt-4 sm:mt-5 sm:pt-5">
      <div className="space-y-3 text-[0.95rem] leading-relaxed text-ink sm:text-[1rem] sm:leading-[1.65]">
        {notice.body.map((paragraph) => (
          <p key={paragraph.slice(0, 40)}>
            {renderBodyParagraph(paragraph, notice.linkifyPhones)}
          </p>
        ))}
      </div>

      {notice.attachments?.length ? (
        <ul className="mt-5 space-y-2 sm:mt-6">
          {notice.attachments.map((doc) => (
            <li key={doc.href}>
              <a
                href={doc.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/doc flex items-center gap-3 rounded-[0.3rem] border border-forest/12 bg-ivory px-3.5 py-3 transition-[border-color,background-color] hover:border-forest/28 hover:bg-white sm:px-4"
              >
                <span
                  className="inline-flex size-9 shrink-0 items-center justify-center rounded-[0.25rem] border border-forest/12 bg-forest/[0.05] text-forest"
                  aria-hidden
                >
                  <FileText className="size-4" />
                </span>
                <span className="min-w-0 flex-1 text-[0.95rem] font-semibold tracking-tight text-ink group-hover/doc:text-forest">
                  {doc.title}
                </span>
                <span className="shrink-0 text-[0.82rem] font-semibold text-forest/80 max-sm:sr-only">
                  Otvoriť PDF
                </span>
              </a>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function FeaturedPdf({ notice }: { notice: NoticePdf }) {
  return (
    <a
      href={notice.pdfHref}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-[0.375rem] border border-forest/12 border-l-[4px] border-l-forest bg-warm-white px-5 py-5 transition-[border-color,background-color,box-shadow] duration-200 hover:border-forest/25 hover:bg-white hover:shadow-[0_10px_28px_-20px_rgba(10,56,44,0.45)] sm:px-6 sm:py-6 md:px-7"
    >
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="inline-flex items-center rounded-[0.2rem] bg-forest px-2 py-0.5 text-[0.68rem] font-semibold tracking-[0.12em] text-white uppercase">
          Najnovšie
        </span>
        <span className="inline-flex items-center gap-1.5 text-[0.78rem] font-medium text-forest/65">
          <FileText className="size-3.5" aria-hidden />
          PDF oznámenie
        </span>
        <time
          dateTime={notice.publishedAt}
          className="text-[0.82rem] font-medium text-forest/70 sm:text-[0.88rem]"
        >
          {formatNoticeDate(notice.publishedAt)}
        </time>
      </div>
      <h2 className="mt-3 max-w-[40rem] text-[clamp(1.35rem,2.6vw,1.95rem)] font-semibold leading-[1.22] tracking-[-0.02em] text-forest sm:mt-3.5">
        {notice.title}
      </h2>
      <div className="mt-4 sm:mt-5">
        <PdfActionLabel featured />
      </div>
    </a>
  );
}

function FeaturedArticle({
  notice,
  open,
  onToggle,
  panelId,
}: {
  notice: NoticeArticle;
  open: boolean;
  onToggle: () => void;
  panelId: string;
}) {
  return (
    <article className="rounded-[0.375rem] border border-forest/12 border-l-[4px] border-l-forest bg-warm-white px-5 py-5 sm:px-6 sm:py-6 md:px-7">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
        <span className="inline-flex items-center rounded-[0.2rem] bg-forest px-2 py-0.5 text-[0.68rem] font-semibold tracking-[0.12em] text-white uppercase">
          Najnovšie
        </span>
        <time
          dateTime={notice.publishedAt}
          className="text-[0.82rem] font-medium text-forest/70 sm:text-[0.88rem]"
        >
          {formatNoticeDate(notice.publishedAt)}
        </time>
      </div>
      <h2 className="mt-3 max-w-[40rem] text-[clamp(1.35rem,2.6vw,1.95rem)] font-semibold leading-[1.22] tracking-[-0.02em] text-forest sm:mt-3.5">
        {notice.title}
      </h2>
      <button
        type="button"
        className="group mt-4 inline-flex items-center gap-2 text-[0.95rem] font-semibold text-forest sm:mt-5"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        {open ? "Zobraziť menej" : "Čítať viac"}
        <ChevronDown
          className={cn(
            "size-4 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      {open ? (
        <div id={panelId}>
          <ArticleExpanded notice={notice} />
        </div>
      ) : null}
    </article>
  );
}

function CompactPdf({ notice }: { notice: NoticePdf }) {
  return (
    <a
      href={notice.pdfHref}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-[0.3rem] border border-forest/10 bg-warm-white px-4 py-3.5 transition-[border-color,background-color,box-shadow] duration-200 hover:border-forest/28 hover:bg-white hover:shadow-[0_8px_22px_-18px_rgba(10,56,44,0.4)] sm:px-4.5 sm:py-4"
    >
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <span className="inline-flex items-center rounded-[0.2rem] border border-forest/15 bg-forest/[0.05] px-1.5 py-0.5 text-[0.64rem] font-semibold tracking-[0.1em] text-forest uppercase">
          Aktualita
        </span>
        <span className="inline-flex items-center gap-1 text-[0.72rem] font-medium text-ink-muted">
          <FileText className="size-3" aria-hidden />
          PDF
        </span>
        <time
          dateTime={notice.publishedAt}
          className="text-[0.78rem] font-medium text-ink-muted sm:text-[0.82rem]"
        >
          {formatNoticeDate(notice.publishedAt)}
        </time>
      </div>
      <h3 className="mt-2 text-[1.05rem] font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-forest sm:text-[1.1rem] sm:leading-[1.3]">
        {notice.title}
      </h3>
      <div className="mt-3">
        <PdfActionLabel />
      </div>
    </a>
  );
}

function CompactArticle({
  notice,
  open,
  onToggle,
  panelId,
}: {
  notice: NoticeArticle;
  open: boolean;
  onToggle: () => void;
  panelId: string;
}) {
  return (
    <article
      className={cn(
        "rounded-[0.3rem] border border-forest/10 bg-warm-white px-4 py-3.5 transition-[border-color,box-shadow] sm:px-4.5 sm:py-4",
        open
          ? "border-forest/25 shadow-[0_8px_22px_-18px_rgba(10,56,44,0.4)] sm:col-span-2"
          : "hover:border-forest/28",
      )}
    >
      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
        <span className="inline-flex items-center rounded-[0.2rem] border border-forest/15 bg-forest/[0.05] px-1.5 py-0.5 text-[0.64rem] font-semibold tracking-[0.1em] text-forest uppercase">
          Aktualita
        </span>
        <time
          dateTime={notice.publishedAt}
          className="text-[0.78rem] font-medium text-ink-muted sm:text-[0.82rem]"
        >
          {formatNoticeDate(notice.publishedAt)}
        </time>
      </div>
      <h3 className="mt-2 text-[1.05rem] font-semibold leading-snug tracking-tight text-ink sm:text-[1.1rem] sm:leading-[1.3]">
        {notice.title}
      </h3>
      <button
        type="button"
        className="group mt-3 inline-flex items-center gap-1.5 text-[0.88rem] font-semibold text-forest/85 hover:text-forest"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        {open ? "Zobraziť menej" : "Čítať viac"}
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            open && "rotate-180",
          )}
          aria-hidden
        />
      </button>
      {open ? (
        <div id={panelId}>
          <ArticleExpanded notice={notice} />
        </div>
      ) : null}
    </article>
  );
}

type AktualityFeedProps = {
  notices: Notice[];
};

export function AktualityFeed({ notices }: AktualityFeedProps) {
  const [featured, ...rest] = notices;
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(null);

  function toggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <>
      {featured.kind === "pdf" ? (
        <FeaturedPdf notice={featured} />
      ) : (
        <FeaturedArticle
          notice={featured}
          open={openId === featured.id}
          onToggle={() => toggle(featured.id)}
          panelId={`${baseId}-${featured.id}`}
        />
      )}

      {rest.length > 0 ? (
        <div className="mt-9 sm:mt-10 md:mt-11">
          <h2 className="text-[1.05rem] font-semibold tracking-tight text-forest sm:text-[1.12rem]">
            Ďalšie aktuality
          </h2>
          <ul className="mt-4 grid gap-3 sm:mt-5 sm:grid-cols-2 sm:gap-3.5">
            {rest.map((item) => (
              <li
                key={item.id}
                className={cn(
                  "min-w-0",
                  item.kind === "article" &&
                    openId === item.id &&
                    "sm:col-span-2",
                )}
              >
                {item.kind === "pdf" ? (
                  <CompactPdf notice={item} />
                ) : (
                  <CompactArticle
                    notice={item}
                    open={openId === item.id}
                    onToggle={() => toggle(item.id)}
                    panelId={`${baseId}-${item.id}`}
                  />
                )}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </>
  );
}
