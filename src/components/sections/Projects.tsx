import { useMemo, useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import {
  autoShowcase,
  otherRepos,
  projects,
  resolveProjects,
  type Project,
} from "../../data/projects";
import { useLiveRepos, type LiveRepos } from "../../hooks/useLiveRepos";
import { formatUpdatedAgo, languageColor } from "../../lib/repoMeta";
import { GithubIcon } from "../ui/icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { SpotlightCard } from "../ui/SpotlightCard";
import { cn } from "../../lib/cn";

function CaseStudy({ study }: { study: NonNullable<Project["caseStudy"]> }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-5 border-t border-base-800">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`case-study-${study.outcome.length}`}
        className="flex w-full items-center justify-between gap-3 py-4 text-left text-sm font-semibold text-ink-200 transition-colors hover:text-accent-300"
      >
        Case study
        <ChevronDown
          className={cn(
            "size-4 shrink-0 text-ink-400 transition-transform duration-300",
            open && "rotate-180",
          )}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <dl className="space-y-4 pb-5 text-sm leading-relaxed">
          <div>
            <dt className="font-semibold uppercase tracking-wider text-ink-500">
              Problem
            </dt>
            <dd className="mt-1 text-ink-300">{study.problem}</dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-wider text-ink-500">
              What I did
            </dt>
            <dd className="mt-1 text-ink-300">{study.approach}</dd>
          </div>
          <div>
            <dt className="font-semibold uppercase tracking-wider text-ink-500">
              Outcome
            </dt>
            <dd className="mt-1 text-ink-300">{study.outcome}</dd>
          </div>
        </dl>
      ) : null}
    </div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <Reveal delay={(index % 2) * 100} className="h-full">
      <SpotlightCard className="h-full rounded-2xl">
        <article className="flex h-full flex-col rounded-2xl border border-base-800 bg-base-900 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-400/40 hover:shadow-xl hover:shadow-accent-500/5 sm:p-8">
        <div className="flex items-start justify-between gap-4">
          <span
            aria-hidden="true"
            className="grid size-12 shrink-0 place-items-center rounded-xl border border-accent-400/25 bg-accent-soft font-display text-lg font-bold text-accent-400"
          >
            {project.name.charAt(0)}
          </span>
          <span className="flex flex-wrap justify-end gap-2">
            <span className="rounded-full border border-base-700 px-3 py-1 text-xs font-medium uppercase tracking-wider text-ink-400">
              {project.category}
            </span>
            {project.badge ? (
              <span className="rounded-full border border-accent-400/25 bg-accent-soft px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent-300">
                {project.badge}
              </span>
            ) : null}
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
              {project.repoLabel ?? "Source"}
              <GithubIcon className="size-4" />
            </a>
          ) : null}
        </div>
        {project.caseStudy ? <CaseStudy study={project.caseStudy} /> : null}
      </article>
      </SpotlightCard>
    </Reveal>
  );
}

function SyncStatus({ live }: { live: LiveRepos }) {
  const ago = formatUpdatedAgo(live.updatedAt);
  const label =
    live.source === "live"
      ? ago
        ? `Live from GitHub · updated ${ago}`
        : "Live from GitHub"
      : ago
        ? `Synced from GitHub · ${ago}`
        : "Synced from GitHub";

  return (
    <p className="mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-ink-500">
      <span
        aria-hidden="true"
        className={cn(
          "size-1.5 rounded-full",
          live.source === "live"
            ? "animate-pulse bg-emerald-400"
            : "bg-amber-400/70",
        )}
      />
      {label}
    </p>
  );
}

export function Projects() {
  const live = useLiveRepos();
  const data = useMemo(
    () =>
      resolveProjects(live.repos, { confirmedLive: live.source === "live" }),
    [live],
  );
  const featured = useMemo(
    () => [...data.projects, ...data.autoShowcase],
    [data],
  );
  const feed = data.otherRepos.length > 0 ? data.otherRepos : otherRepos;
  const grid = featured.length > 0 ? featured : [...projects, ...autoShowcase];

  return (
    <section id="projects" className="border-t border-base-800/60 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="03 — Projects"
          title="Selected work"
          description="A snapshot of platforms and websites I've designed, built, and contributed to. New GitHub projects appear here on their own — external links open in a new tab."
        />
        <SyncStatus live={live} />

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {grid.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>

        {feed.length > 0 ? (
          <Reveal delay={200}>
            <div className="mt-10 rounded-2xl border border-base-800 bg-base-900/60 p-6 sm:p-8">
              <h3 className="font-display text-lg font-semibold text-ink-100">
                More from GitHub
              </h3>
              <ul className="mt-4 divide-y divide-base-800">
                {feed.map((repo) => {
                  const ago = formatUpdatedAgo(repo.pushedAt);
                  return (
                    <li
                      key={repo.name}
                      className="flex items-center gap-3 py-3.5"
                    >
                      <span
                        aria-hidden="true"
                        className="size-2 shrink-0 rounded-full"
                        style={{
                          backgroundColor: languageColor(repo.language),
                        }}
                      />
                      <a
                        href={repo.htmlUrl ?? "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex min-w-0 flex-1 items-center gap-3"
                      >
                        <span className="shrink-0 font-mono text-sm text-ink-200 transition-colors group-hover:text-accent-300">
                          {repo.name}
                        </span>
                        {repo.language ? (
                          <span className="hidden shrink-0 rounded-full border border-base-700 px-2 py-0.5 text-xs text-ink-500 sm:inline">
                            {repo.language}
                          </span>
                        ) : null}
                        <span className="hidden truncate pl-1 text-sm text-ink-500 md:block">
                          {repo.description ?? "Public repository"}
                        </span>
                      </a>
                      {ago ? (
                        <span className="hidden shrink-0 text-xs text-ink-500 sm:inline">
                          {ago}
                        </span>
                      ) : null}
                      {repo.homepage ? (
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${repo.name} live site`}
                          title={`${repo.name} live site`}
                          className="grid size-8 shrink-0 place-items-center rounded-lg border border-base-700 text-ink-400 transition-colors hover:border-accent-400/40 hover:text-accent-300"
                        >
                          <ExternalLink
                            className="size-4"
                            aria-hidden="true"
                          />
                        </a>
                      ) : null}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        ) : null}
      </div>
    </section>
  );
}
