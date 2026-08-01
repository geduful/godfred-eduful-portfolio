import type { LucideIcon } from "lucide-react";
import {
  Code2,
  Database,
  GitBranch,
  LayoutTemplate,
  Palette,
  Rocket,
  Server,
} from "lucide-react";

export type SkillCategory = {
  title: string;
  icon: LucideIcon;
  skills: string[];
};

/**
 * Skills are evidence-based:
 * - Confirmed: directly observable in public repositories or shipped projects.
 * - Declared (marked with *): listed on the public developer profile as part
 *   of the working stack, not yet demonstrated in a public repository.
 */
export const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: Code2,
    skills: ["HTML", "CSS", "JavaScript", "TypeScript", "Python*"],
  },
  {
    title: "Frontend",
    icon: LayoutTemplate,
    skills: ["React", "Next.js", "Tailwind CSS", "Responsive Design"],
  },
  {
    title: "Backend",
    icon: Server,
    skills: ["Node.js", "Express*", "Flask*", "Supabase"],
  },
  {
    title: "Databases",
    icon: Database,
    skills: ["PostgreSQL", "MySQL*", "MongoDB*"],
  },
  {
    title: "Tools",
    icon: GitBranch,
    skills: ["Git", "GitHub", "VS Code"],
  },
  {
    title: "Deployment",
    icon: Rocket,
    skills: ["Vercel", "Netlify", "GitHub Pages"],
  },
  {
    title: "Design",
    icon: Palette,
    skills: ["Graphic Design", "UI/UX Design", "Web Design"],
  },
];

export const skillsFootnote =
  "* Technologies listed on my public developer profile as part of my working stack. Everything else is directly observable in my public repositories and shipped projects.";
