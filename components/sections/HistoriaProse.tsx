import type { ReactNode } from "react";
import { historiaParagraphs } from "@/lib/content/historia";

/** Highlight years and simple date milestones without changing copy. */
function highlightMilestones(text: string): ReactNode[] {
  const pattern = /(\b1\.1\.\d{4}\b|\b(?:19|20)\d{2}\b)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(
        <span key={key++}>{text.slice(lastIndex, match.index)}</span>,
      );
    }
    nodes.push(
      <span key={key++} className="font-semibold text-forest">
        {match[0]}
      </span>,
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }

  return nodes;
}

export function HistoriaProse() {
  return (
    <div className="relative mx-auto max-w-[40rem]">
      <div
        className="pointer-events-none absolute top-1 bottom-1 left-0 hidden w-px bg-forest/15 sm:block"
        aria-hidden
      />
      <div className="space-y-6 text-[1.02rem] leading-[1.75] text-ink sm:pl-7 sm:text-[1.05rem] sm:leading-[1.8]">
        {historiaParagraphs.map((paragraph) => (
          <p key={paragraph.slice(0, 48)}>{highlightMilestones(paragraph)}</p>
        ))}
      </div>
    </div>
  );
}
