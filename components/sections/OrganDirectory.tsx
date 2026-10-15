import type { OrganMember } from "@/lib/content/organs";

type OrganDirectoryProps = {
  title: string;
  members: OrganMember[];
  headingId: string;
};

export function OrganDirectory({
  title,
  members,
  headingId,
}: OrganDirectoryProps) {
  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className="text-[clamp(1.25rem,2.4vw,1.65rem)] font-semibold tracking-tight text-forest"
      >
        {title}
      </h2>

      <ol className="mt-4 divide-y divide-forest/8 border-y border-forest/10 sm:mt-5">
        {members.map((member, index) => (
          <li
            key={`${member.name}-${member.role}`}
            className="flex gap-3.5 py-3.5 sm:gap-4 sm:py-4"
          >
            <span
              className="w-7 shrink-0 pt-0.5 text-[0.9rem] font-semibold tabular-nums text-forest/55 sm:w-8"
              aria-hidden
            >
              {index + 1}.
            </span>
            <div className="min-w-0">
              <p className="text-[1.02rem] font-semibold tracking-tight text-ink sm:text-[1.08rem]">
                {member.name}
              </p>
              <p className="mt-0.5 text-[0.92rem] text-ink-muted sm:text-[0.95rem]">
                {member.role}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
