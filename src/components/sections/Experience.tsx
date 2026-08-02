import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const entries = [
  {
    title: "Acadex",
    role: "Developer Contributor",
    badge: "Contribution",
    description:
      "Contributed to the development of the Acadex platform and its web experience alongside Rosemary Boahemaa Dwamena — an attendance management platform built to simplify how attendance is recorded and monitored for a university community.",
  },
  {
    title: "TheFarmYard",
    role: "Developer",
    badge: "Project",
    description:
      "Designed and built a digital agricultural platform connecting farmers directly with buyers, helping reduce unnecessary middlemen and improve access to agricultural markets.",
  },
  {
    title: "Nuella's Klothing",
    role: "Developer & Designer",
    badge: "Project",
    description:
      "Designed and built a modern website for a bespoke tailoring and fashion brand based in Koforidua, Ghana, giving the brand a clean, elegant digital presence.",
  },
  {
    title: "KP Group",
    role: "Developer & Designer",
    badge: "Project",
    description:
      "Designed and built a corporate website presenting a group of companies and their services through a modern digital experience.",
  },
  {
    title: "BTech Computer Science — Koforidua Technical University",
    role: "Student",
    period: "2026 — Present",
    badge: "Education",
    description:
      "Pursuing a Bachelor of Technology in Computer Science — focused on software development, web technologies, and building practical, real-world solutions.",
  },
  {
    title: "Course Representative — BTech Computer Science",
    role: "Leadership",
    period: "2026 — Present",
    badge: "Leadership",
    description:
      "Representing my course to the department — relaying student feedback, communicating announcements, and supporting my cohort throughout their studies.",
  },
];

export function Experience() {
  return (
    <section id="experience" className="border-t border-base-800/60 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="04 — Experience"
          title="Work & contributions"
          description="Development work I've contributed to and built — each one listed accurately, from collaborations to independent projects."
        />

        <ol className="relative mt-14 ml-2 space-y-12 border-l border-base-800 sm:ml-4">
          {entries.map((entry, index) => (
            <li key={entry.title} className="relative pl-8 sm:pl-10">
              <span
                aria-hidden="true"
                className="absolute -left-[5px] top-1.5 size-2.5 rounded-full bg-accent-400 ring-4 ring-base-950"
              />
              <Reveal delay={(index % 2) * 100}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h3 className="font-display text-lg font-semibold text-ink-100">
                    {entry.title}
                  </h3>
                  <span className="rounded-full border border-accent-400/25 bg-accent-soft px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider text-accent-300">
                    {entry.badge}
                  </span>
                </div>
                <p className="mt-1 text-sm font-medium text-ink-300">
                  {entry.role}
                  {entry.period ? (
                    <span className="text-ink-500"> · {entry.period}</span>
                  ) : null}
                </p>
                <p className="mt-2 max-w-3xl leading-relaxed text-ink-400">
                  {entry.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
