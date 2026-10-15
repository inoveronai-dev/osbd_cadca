"use client";

import { useEffect } from "react";

/** Ensures in-page hash targets scroll into view after client navigation. */
export function HashScroll() {
  useEffect(() => {
    const scrollToHash = () => {
      const id = window.location.hash.replace(/^#/, "");
      if (!id) return;
      const el = document.getElementById(id);
      if (!el) return;
      // Instant scroll after paint so the fixed header offset (scroll-margin) applies reliably.
      window.setTimeout(() => {
        el.scrollIntoView({ behavior: "instant", block: "start" });
      }, 50);
    };

    scrollToHash();
    window.addEventListener("hashchange", scrollToHash);
    return () => window.removeEventListener("hashchange", scrollToHash);
  }, []);

  return null;
}
