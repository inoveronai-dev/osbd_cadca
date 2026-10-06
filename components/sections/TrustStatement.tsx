import { trustStatement } from "@/lib/content/trust-statement";

export function TrustStatement() {
  return (
    <section
      className="trust-statement relative isolate flex items-center justify-center overflow-hidden"
      aria-label={trustStatement.sentence}
    >
      <div className="trust-statement-bg absolute inset-0" aria-hidden />
      <div className="trust-statement-overlay absolute inset-0" aria-hidden />

      <div className="relative z-10 mx-auto flex w-full max-w-[58rem] flex-col items-center px-6 py-12 text-center sm:px-8 sm:py-14 md:px-10 md:py-16">
        <span
          className="mb-6 h-px w-12 bg-[rgba(247,244,236,0.5)] sm:mb-7"
          aria-hidden
        />
        <p className="trust-statement-text max-w-[52rem] text-balance text-[#fcfbf7]">
          {trustStatement.sentence}
        </p>
      </div>
    </section>
  );
}
