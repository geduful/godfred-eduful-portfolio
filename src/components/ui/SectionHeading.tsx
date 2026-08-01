import { Reveal } from "./Reveal";
import { cn } from "../../lib/cn";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        centered ? "mx-auto text-center" : "text-left",
      )}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent-400">
        {eyebrow}
      </p>
      <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink-100 sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 leading-relaxed text-ink-400">{description}</p>
      ) : null}
    </Reveal>
  );
}
