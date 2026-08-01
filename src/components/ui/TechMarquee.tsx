import { skillCategories } from "../../data/skills";

const items = skillCategories
  .flatMap((category) => category.skills)
  .map((skill) => skill.replace("*", ""));

/**
 * Infinite scrolling strip of technologies, used as a visual divider
 * between the hero and the rest of the page. Purely decorative —
 * the same information is presented properly in the Skills section.
 * The CSS animation is disabled by the global prefers-reduced-motion rule.
 */
export function TechMarquee() {
  const row = [...items, ...items];

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-base-800/60 bg-base-900/40 py-5 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
    >
      <div className="flex w-max animate-marquee items-center gap-10 whitespace-nowrap">
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-10 text-sm font-semibold uppercase tracking-[0.2em] text-ink-500"
          >
            {item}
            <span className="size-1.5 rounded-full bg-accent-400/50" />
          </span>
        ))}
      </div>
    </div>
  );
}
