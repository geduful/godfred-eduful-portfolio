import { ExternalLink } from "lucide-react";
import { otherRepos, projects, type Project } from "../../data/projects";
import { GithubIcon } from "../ui/icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { SpotlightCard } from "../ui/SpotlightCard";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={(index % 2) * 100} className="h-full">
      <SpotlightCard className="h-full rounded-2xl">
        <article className="flex h-full flex-col rounded-2xl border border-base-800 bg-base-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-400/40 hover:shadow-xl hover:shadow-accent-500/5 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <span
            aria-hidden="true"
            className="grid size-12 shrink-0 place-items-center rounded-xl border border-accent-400/25 bg-accent-400/10 font-display text-lg font-bold text-accent-400"
          >
            {project.name.charAt(0)}
          </span>
          <span className="rounded-full border border-base-700 px-3 py-1 text-xs font-medium uppercase tracking-wider text-ink-400">
            {project.category}
          </span>
        </div>

        <h3 className="mt-5 font-display text-xl font-semibold text-ink-100 transition-colors duration-200 group-hover:text-accent-300">
          {project.name}
        </h3>

        <p className="mt-2 text-sm font-medium text-ink-300">{project.role}</p>
        <p className="mt-3 leading-relaxed text-ink-400">
          {project.description}
        </p>

        {project.tech.length > 0 ? (
          <ul className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-base-700 bg-base-950/60 px-2.5 py-1 text-xs text-ink-300"
              >
                {tech}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-6 flex-1" />
        <div className="flex gap-5 border-t border-base-800 pt-5 text-sm font-medium">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-ink-300 transition-colors hover:text-accent-300"
            >
              Live site
              <ExternalLink className="size-4" aria-hidden="true" />
            </a>
          ) : null}
          {project.repoUrl ? (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-ink-300 transition-colors hover:text-accent-300"
            >
              Source
              <GithubIcon className="size-4" />
            </a>
          ) : null}
        </div>
      </article>
      </SpotlightCard>
    </Reveal>
  );
}

export function Projects() {
  return (
    <section id="projects" className="border-t border-base-800/60 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="03 — Projects"
          title="Selected work"
          description="A snapshot of platforms and websites I've designed, built, and contributed to. External links open in a new tab."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>

        {otherRepos.length > 0 ? (
          <Reveal delay={200}>
            <div className="mt-10 rounded-2xl border border-base-800 bg-base-900/60 p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-ink-100">
                More from GitHub
              </h3>
              <ul className="mt-4 divide-y divide-base-800">
                {otherRepos.map((repo) => (
                  <li key={repo.name}>
                    <a
                      href={repo.htmlUrl ?? "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 py-3.5"
                    >
                      <span
                        aria-hidden="true"
                        className="size-2 shrink-0 rounded-full bg-accent-400/60"
                      />
                      <span className="font-mono text-sm text-ink-200 transition-colors group-hover:text-accent-300">
                        {repo.name}
                      </span>
                      {repo.language ? (
                        <span className="hidden rounded-full border border-base-700 px-2 py-0.5 text-xs text-ink-500 sm:inline">
                          {repo.language}
                        </span>
                      ) : null}
                      <span className="ml-auto hidden truncate pl-4 text-sm text-ink-500 md:block">
                        {repo.description ?? "Public repository"}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
