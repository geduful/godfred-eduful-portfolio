import { useEffect, useRef, useState } from "react";

const FALLBACK_DELAY_MS = 2000;

export function useReveal<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Failsafe: never leave content invisible. If the observer is
    // unsupported or its callback never fires (some environments),
    // reveal the element after a short delay.
    const failsafe = window.setTimeout(() => setVisible(true), FALLBACK_DELAY_MS);

    if (typeof IntersectionObserver === "undefined") {
      return () => window.clearTimeout(failsafe);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
          window.clearTimeout(failsafe);
        }
      },
      { threshold, rootMargin: "0px 0px -48px 0px" },
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [threshold]);

  return { ref, visible };
}
