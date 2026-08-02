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
    caseStudy: {
      problem:
        "Farmers often rely on middlemen to reach buyers, which cuts into their earnings and limits their access to agricultural markets.",
      approach:
        "Designed and built a digital marketplace where farmers can present their produce and buyers can find them directly — covering product discovery and connection on one platform.",
      outcome:
        "An end-to-end marketplace built on Next.js, TypeScript, and Supabase — open source on GitHub and ready to take to real communities.",
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
