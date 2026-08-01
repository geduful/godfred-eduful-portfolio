import { github } from "../lib/github";

/**
 * Curated fallbacks — values the GitHub API can't provide or that are
 * written by hand (wording stays under human control).
 * Anything the GitHub API *does* provide is overlaid below.
 */
const curated = {
  name: "Godfred Eduful",
  position: "Full-Stack Developer",
  taglines: [
    "Full-Stack Developer",
    "Computer Science Student",
    "Graphic Designer",
  ],
  location: "Ghana",
  email: "edufulgodfred22@gmail.com",
  avatar: "https://avatars.githubusercontent.com/u/199124912?s=512",
  siteUrl: "https://godfrededuful.com",
  heroIntro:
    "I build modern, secure, and impactful digital solutions — combining software development, UI/UX thinking, and graphic design into web experiences that are functional, accessible, and visually engaging.",
  shortStatement: "Building technology. Creating impact.",
};

const githubName = github.profile.name ?? curated.name;
const githubAvatar = github.profile.avatarUrl
  ? `${github.profile.avatarUrl}?s=512`
  : curated.avatar;

export const profile = {
  ...curated,
  name: githubName,
  firstName: githubName.split(" ")[0] ?? curated.name.split(" ")[0],
  location: github.profile.location ?? curated.location,
  avatar: githubAvatar,
  hireable: github.profile.hireable ?? true,
} as const;

export const links = {
  github: github.profile.htmlUrl ?? "https://github.com/geduful",
  linkedin: "https://www.linkedin.com/in/godfred-eduful-743b2b350",
  twitter: github.profile.twitterUsername
    ? `https://x.com/${github.profile.twitterUsername}`
    : "https://x.com/_kobby_pounds",
  instagram: "https://www.instagram.com/_kobby_pounds/",
} as const;

export type Social = {
  label: string;
  handle: string;
  href: string;
};

export const socials: Social[] = [
  { label: "GitHub", handle: "geduful", href: links.github },
  {
    label: "LinkedIn",
    handle: "in/godfred-eduful",
    href: links.linkedin,
  },
  {
    label: "X (Twitter)",
    handle: github.profile.twitterUsername
      ? `@${github.profile.twitterUsername}`
      : "@_kobby_pounds",
    href: links.twitter,
  },
  { label: "Instagram", handle: "@_kobby_pounds", href: links.instagram },
];
