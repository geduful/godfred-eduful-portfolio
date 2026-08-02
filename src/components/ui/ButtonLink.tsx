import type { ReactNode } from "react";
import { cn } from "../../lib/cn";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  external?: boolean;
  download?: boolean | string;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external = false,
  download,
}: ButtonLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all duration-200 active:translate-y-0",
        variant === "primary"
          ? "bg-accent-400 text-base-950 hover:-translate-y-0.5 hover:bg-accent-300 hover:shadow-lg hover:shadow-accent-500/20"
          : "border border-base-600 text-ink-100 hover:-translate-y-0.5 hover:border-base-500 hover:bg-base-850",
        className,
      )}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...(download !== undefined ? { download } : {})}
    >
      {children}
    </a>
  );
}
