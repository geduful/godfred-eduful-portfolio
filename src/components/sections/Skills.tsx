import { github } from "../../lib/github";
import { skillCategories, skillsFootnote } from "../../data/skills";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

export function Skills() {
  return (
    <section id="skills" className="border-t border-base-800/60 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="02 — Skills"
          title="What I work with"
          description="Technologies and tools used across my projects and development work — confirmed by what I've built, not by a checklist."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <Reveal key={category.title} delay={(index % 3) * 100}>
              <div className="h-full rounded-xl border border-base-800 bg-base-900/60 p-6 transition-colors duration-300 hover:border-base-700">
                <h3 className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-wider text-ink-300">
                  <span
                    aria-hidden="true"
                    className="grid size-8 place-items-center rounded-md border border-accent-400/20 bg-accent-400/10 text-accent-400"
                  >
                    <category.icon className="size-4" />
                  </span>
                  {category.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <li
                      key={skill}
                      className="rounded-full border border-base-700 bg-base-950/60 px-3 py-1 text-sm text-ink-300 transition-colors duration-200 hover:border-accent-400/50 hover:text-accent-300"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {github.repoLanguages.length > 0 ? (
          <Reveal delay={150}>
            <div className="mt-12 rounded-xl border border-base-800 bg-base-900/60 p-6 sm:p-8">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-300">
                  Languages in my public repositories
                </h3>
                {github.fetchedAt ? (
                  <p className="text-xs text-ink-500">
                    Live data · updated {new Date(github.fetchedAt).toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                ) : null}
              </div>
              <ul className="mt-5 space-y-3">
                {github.repoLanguages.map(({ language, percent }) => (
                  <li key={language} className="flex items-center gap-4">
                    <span className="w-32 shrink-0 font-mono text-sm text-ink-300">
                      {language}
                    </span>
                    <span
                      aria-hidden="true"
                      className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-base-800"
                    >
                      <span
                        className="absolute inset-y-0 left-0 rounded-full bg-accent-400/70"
                        style={{ width: `${percent}%` }}
                      />
                    </span>
                    <span className="w-10 shrink-0 text-right text-xs tabular-nums text-ink-500">
                      {percent}%
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ) : null}

        <Reveal delay={200}>
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-ink-500">
            {skillsFootnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
