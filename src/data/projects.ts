import { github } from "../lib/github";

export type Project = {
  name: string;
  category: string;
  description: string;
  role: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** Links this curated entry to its live GitHub repo for auto-fill. */
  repoName?: string;
};

/**
 * Curated project entries. Where `repoName` matches a public GitHub repo,
 * the live snapshot overlays description, language, homepage and repo URL.
 */
const curatedProjects: Project[] = [
  {
    name: "Acadex",
    category: "Web Application · Contribution",
    description:
      "An attendance management platform designed to simplify how attendance is recorded and monitored for a university community. I contributed to the development of the platform and its web experience.",
    role: "Developer — contributed to the platform and website",
    tech: [],
    liveUrl: "https://acadex-ktu.vercel.app/",
  },
  {
    name: "TheFarmYard",
    category: "Web Application",
    description:
      "A digital agricultural platform designed to connect farmers directly with buyers, helping reduce unnecessary middlemen and improve access to agricultural markets.",
    role: "Developer — designed and built the platform",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Supabase", "PostgreSQL"],
    repoName: "TheFarmYard",
  },
  {
    name: "Nuella's Klothing",
    category: "Business Website",
    description:
      "A modern website for a bespoke tailoring and fashion brand based in Koforidua, Ghana — presenting the brand and its craft with a clean, elegant digital presence.",
    role: "Developer & Designer — designed and built the website",
    tech: ["HTML", "CSS", "Tailwind CSS"],
    repoName: "Nuellas_Klothing",
  },
  {
    name: "KP Group",
    category: "Business Website",
    description:
      "A corporate website designed to present a group of companies and their services through a modern digital experience.",
    role: "Developer & Designer — designed and built the website",
    tech: [],
    liveUrl: "https://kpgroupofcompanies.netlify.app/",
  },
];

export const projects: Project[] = curatedProjects.map((project) => {
  const repo = project.repoName ? github.findRepo(project.repoName) : undefined;
  if (!repo) return project;

  const tech = repo.language && !project.tech.includes(repo.language)
    ? [...project.tech, repo.language]
    : project.tech;

  return {
    ...project,
    description: repo.description ?? project.description,
    liveUrl: project.liveUrl ?? repo.homepage ?? undefined,
    repoUrl: repo.htmlUrl ?? project.repoUrl,
    tech,
  };
});

/** Public repos not featured above — listed at the bottom of the Projects section. */
export const otherRepos = github.repos
  .filter(
    (repo) =>
      repo.name !== "geduful" &&
      !curatedProjects.some((project) => project.repoName === repo.name),
  )
  .sort((a, b) => (b.pushedAt ?? "").localeCompare(a.pushedAt ?? ""));
