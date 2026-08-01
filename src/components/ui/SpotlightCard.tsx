import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "../../lib/cn";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

/**
 * Card with a subtle radial highlight that follows the mouse.
 * Uses direct style mutation (no re-renders) and is disabled for
 * users who prefer reduced motion.
 */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const onMove = (event: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--spot-x", `${event.clientX - rect.left}px`);
      el.style.setProperty("--spot-y", `${event.clientY - rect.top}px`);
    };

    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={ref} className={cn("group relative overflow-hidden", className)}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(280px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--color-accent-400) 9%, transparent), transparent 70%)",
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}
