import { useEffect, useRef } from "react";

/**
 * Thin accent progress bar pinned to the top of the viewport.
 * Width is mutated directly via rAF-throttled scroll listener —
 * no React re-renders on scroll.
 */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      el.style.width = `${max > 0 ? (doc.scrollTop / max) * 100 : 0}%`;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[70] h-0.5 bg-accent-400"
      style={{ width: 0 }}
    />
  );
}
