import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view for scroll-spy navigation.
 * Falls back to no active section when IntersectionObserver is unavailable.
 */
export function useActiveSection(sectionIds: readonly string[]) {
  const [active, setActive] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [sectionIds]);

  return active;
}
