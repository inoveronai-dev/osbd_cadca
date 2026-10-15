import { ChevronDown } from "lucide-react";
import { PdfDocumentRow } from "@/components/documents/PdfDocumentRow";
import { CollapsibleDetails } from "@/components/documents/CollapsibleDetails";
import type { DocumentGroup } from "@/lib/content/documents";
import { cn } from "@/lib/utils";

type DocumentCategoryProps = {
  group: DocumentGroup;
  /** Force open/closed; defaults to group.defaultOpen */
  open?: boolean;
  /** When false, render a static section without collapse */
  collapsible?: boolean;
  actionLabel?: "Zobraziť PDF" | "Otvoriť PDF";
  className?: string;
};

function CategoryHeading({ title }: { title: string }) {
  return (
    <h2 className="text-[1.05rem] font-semibold tracking-tight text-forest sm:text-[1.15rem]">
      {title}
    </h2>
  );
}

function DocumentList({
  documents,
  actionLabel,
}: {
  documents: DocumentGroup["documents"];
  actionLabel: "Zobraziť PDF" | "Otvoriť PDF";
}) {
  return (
    <ul className="mt-3 space-y-2 sm:mt-3.5 sm:space-y-2.5">
      {documents.map((doc) => (
        <li key={doc.href}>
          <PdfDocumentRow document={doc} actionLabel={actionLabel} />
        </li>
      ))}
    </ul>
  );
}

/** Server-friendly document group; only the collapsible shell is a client island. */
export function DocumentCategory({
  group,
  open,
  collapsible = true,
  actionLabel = "Otvoriť PDF",
  className,
}: DocumentCategoryProps) {
  const initiallyOpen = open ?? group.defaultOpen ?? true;

  if (!collapsible) {
    return (
      <section className={cn(className)} aria-labelledby={`${group.id}-heading`}>
        <div id={`${group.id}-heading`}>
          <CategoryHeading title={group.title} />
        </div>
        <DocumentList documents={group.documents} actionLabel={actionLabel} />
      </section>
    );
  }

  return (
    <CollapsibleDetails
      initiallyOpen={initiallyOpen}
      className={cn(
        "border-b border-forest/8 pb-5 last:border-b-0 last:pb-0",
        className,
      )}
      summary={
        <>
          <CategoryHeading title={group.title} />
          <ChevronDown
            className="size-5 shrink-0 text-forest/55 transition-transform group-open/details:rotate-180"
            aria-hidden
          />
        </>
      }
    >
      <DocumentList documents={group.documents} actionLabel={actionLabel} />
    </CollapsibleDetails>
  );
}
