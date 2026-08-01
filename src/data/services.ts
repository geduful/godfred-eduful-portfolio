import type { LucideIcon } from "lucide-react";
import {
  AppWindow,
  Bot,
  Code2,
  Globe,
  LayoutTemplate,
  Palette,
} from "lucide-react";

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const services: Service[] = [
  {
    title: "Full-Stack Web Development",
    description:
      "Complete web applications — from database design and APIs to polished interfaces — built, secured, and deployed end to end.",
    icon: Code2,
  },
  {
    title: "Frontend Development",
    description:
      "Modern, responsive interfaces built with React, Next.js, and Tailwind CSS — fast, accessible, and easy to maintain.",
    icon: LayoutTemplate,
  },
  {
    title: "Business Websites",
    description:
      "Professional websites that give brands and companies a credible, modern digital presence — like Nuella's Klothing and KP Group.",
    icon: Globe,
  },
  {
    title: "Web Applications",
    description:
      "Practical platforms and tools — from agricultural marketplaces to management systems — that solve real problems.",
    icon: AppWindow,
  },
  {
    title: "UI/UX & Graphic Design",
    description:
      "Design work that pairs development with design thinking: interfaces, layouts, and visual identities that communicate clearly.",
    icon: Palette,
  },
  {
    title: "AI & Automation",
    description:
      "Automation and AI-assisted workflows that reduce repetitive work and help teams get more done with less effort.",
    icon: Bot,
  },
];
