import { github, type GithubRepo } from "../lib/github";
import { isFreshRepo } from "../lib/repoMeta";

export type Project = {
  name: string;
  category: string;
  /** Small pill rendered next to the category (e.g. "New", "Auto-synced"). */
  badge?: string;
  description: string;
  role: string;
  tech: string[];
  liveUrl?: string;
  repoUrl?: string;
  /** Link label for the repository button — "Source" unless the repo is a contribution. */
  repoLabel?: string;
  /** Links this curated entry to its live GitHub repo for auto-fill. */
  repoName?: string;
  /** Expandable case study — how the problem was approached and delivered. */
  caseStudy?: {
    problem: string;
    approach: string;
    outcome: string;
  };
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
      "An attendance management platform that simplifies how attendance is recorded and monitored for a university community. I contributed to its development alongside Rosemary Boahemaa Dwamena, focusing on the platform and its web experience.",
    role: "Developer — contributed to the platform and web experience",
    tech: [],
    liveUrl: "https://acadex-ktu.vercel.app/",
    repoUrl: "https://github.com/Rosieeee344/Acadex",
    repoLabel: "Repository",
    caseStudy: {
      problem:
        "A university community needed a simpler, more reliable way to record and monitor attendance across campus than manual registers.",
      approach:
        "Contributed to the development of the platform and its web experience as part of the project team alongside Rosemary Boahemaa Dwamena, focusing on how staff and students interact with the system.",
      outcome:
        "A live attendance management platform at acadex-ktu.vercel.app — currently used to simplify attendance recording and monitoring for its university community.",
    },
  },
  {
    name: "TheFarmYard",
    category: "Web Application",
    description:
      "A digital agricultural platform designed to connect farmers directly with buyers, helping reduce unnecessary middlemen and improve access to agricultural markets.",
    role: "Developer — designed and built the platform",
    tech: ["Next.js", "TypeScript", "React", "Tailwind CSS", "Supabase", "PostgreSQL"],
    repoName: "TheFarmYard",
    liveUrl: "https://thefarmyard.vercel.app/",
    caseStudy: {
      problem:
        "Farmers often rely on middlemen to reach buyers, which cuts into their earnings and limits their access to agricultural markets.",
      approach:
        "Designed and built a digital marketplace where farmers can present their produce and buyers can find them directly — covering product discovery and connection on one platform.",
      outcome:
        "A live agricultural marketplace at thefarmyard.vercel.app that connects farmers directly with buyers — open source on GitHub.",
    },
  },
  {
    name: "Nuella's Klothing",
    category: "Business Website",
    description:
      "A modern website for a bespoke tailoring and fashion brand based in Koforidua, Ghana — presenting the brand and its craft with a clean, elegant digital presence.",
    role: "Developer & Designer — designed and built the website",
    tech: ["HTML", "CSS", "Tailwind CSS"],
    repoName: "Nuellas_Klothing",
    caseStudy: {
      problem:
        "A bespoke tailoring and fashion brand in Koforidua had no digital presence to present its craft to customers.",
      approach:
        "Designed and built a clean, elegant website that reflects the brand — pairing graphic design with front-end development to make the brand feel premium online.",
      outcome:
        "A live business website at nuellas-klothing.vercel.app that presents the brand and its craft professionally.",
    },
  },
  {
    name: "KP Group",
    category: "Business Website",
    description:
      "A corporate website designed to present a group of companies and their services through a modern digital experience.",
    role: "Developer & Designer — designed and built the website",
    tech: [],
    liveUrl: "https://kpgroupofcompanies.netlify.app/",
    caseStudy: {
      problem:
        "A group of companies needed a corporate presence that presents its businesses and services credibly to customers and partners.",
      approach:
        "Designed and built a modern corporate website — structuring the group's story, services, and contact paths into a clear, professional experience.",
      outcome:
        "A live corporate website at kpgroupofcompanies.netlify.app presenting the group and its services online.",
    },
  },
];

/**
 * Topic that promotes a GitHub repo to a full project card automatically.
 * Tag any repo with the `portfolio` topic on GitHub and it appears in the
 * projects grid on the next visit — no code changes, no deploys.
 */
export const SHOWCASE_TOPIC = "portfolio";

/** The profile README repo — never listed as a project. */
const profileRepoName = github.profile.login ?? "geduful";

function nonEmpty(value?: string | null): string | undefined {
  return value || undefined;
}

function applyRepoOverlay(project: Project, repo?: GithubRepo): Project {
  if (!repo) return project;

  const tech = repo.language && !project.tech.includes(repo.language)
    ? [...project.tech, repo.language]
    : project.tech;

  return {
    ...project,
    description: repo.description || project.description,
    liveUrl: project.liveUrl || repo.homepage || undefined,
    repoUrl: repo.htmlUrl || project.repoUrl,
    tech,
  };
}

/**
 * Builds a full project card from a synced GitHub repo — used for repos
 * tagged with the showcase topic that have no hand-written entry.
 */
function toAutoProject(repo: GithubRepo): Project {
  return {
    name: repo.name,
    category: "Project · Auto-synced",
    badge: isFreshRepo(repo.pushedAt) ? "New" : "Auto-synced",
    description:
      repo.description ||
      "A project by Godfred Eduful — synced automatically from GitHub.",
    role: "Developer",
    tech: repo.language ? [repo.language] : [],
    liveUrl: nonEmpty(repo.homepage),
    repoUrl: nonEmpty(repo.htmlUrl),
  };
}

function sortByPushedAtDesc(a: GithubRepo, b: GithubRepo): number {
  return (b.pushedAt ?? "").localeCompare(a.pushedAt ?? "");
}

export type ResolvedProjects = {
  /** Hand-curated entries, overlaid with live repo data where linked. */
  projects: Project[];
  /** Topic-tagged repos promoted to full cards, newest first. */
  autoShowcase: Project[];
  /** Remaining public repos for the "More from GitHub" list. */
  otherRepos: GithubRepo[];
};

/**
 * Resolves the whole projects section from any repo list — the build-time
 * snapshot for first paint, the live API list once it arrives. Curated
 * entries keep their order and case studies; new repos flow in on their own.
 */
export function resolveProjects(repos: GithubRepo[]): ResolvedProjects {
  const findRepo = (name?: string) =>
    name ? repos.find((repo) => repo.name === name) : undefined;
  const curatedRepoNames = new Set(
    curatedProjects
      .map((project) => project.repoName)
      .filter((name): name is string => Boolean(name)),
  );

  const projects = curatedProjects.map((project) =>
    applyRepoOverlay(project, findRepo(project.repoName)),
  );

  const autoShowcase = repos
    .filter(
      (repo) =>
        repo.name !== profileRepoName &&
        !curatedRepoNames.has(repo.name) &&
        repo.topics?.includes(SHOWCASE_TOPIC),
    )
    .sort(sortByPushedAtDesc)
    .map(toAutoProject);

  const autoNames = new Set(autoShowcase.map((project) => project.name));

  const otherRepos = repos
    .filter(
      (repo) =>
        repo.name !== profileRepoName &&
        !curatedRepoNames.has(repo.name) &&
        !autoNames.has(repo.name),
    )
    .sort(sortByPushedAtDesc);

  return { projects, autoShowcase, otherRepos };
}

const snapshot = resolveProjects(github.repos);

export const projects: Project[] = snapshot.projects;

/** Topic-tagged repos promoted to full cards (snapshot version, first paint). */
export const autoShowcase: Project[] = snapshot.autoShowcase;

/** Public repos not featured above — listed at the bottom of the Projects section. */
export const otherRepos: GithubRepo[] = snapshot.otherRepos;
