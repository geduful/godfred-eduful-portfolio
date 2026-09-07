/**
 * Presentation helpers for repository metadata synced from GitHub —
 * language dot colors, relative "updated … ago" labels, and the
 * freshness window that earns a repo the "New" badge.
 */

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#a074c4",
  Python: "#3572a5",
  Java: "#b07219",
  "C++": "#f34b7d",
  C: "#555555",
  "C#": "#178600",
  PHP: "#4f5d95",
  Ruby: "#701516",
  Go: "#00add8",
  Rust: "#dea584",
  Swift: "#f05138",
  Kotlin: "#a97bff",
  Dart: "#00b4ab",
  Shell: "#89e051",
  PLpgSQL: "#336791",
  SCSS: "#c6538c",
  Vue: "#41b883",
  Svelte: "#ff3e00",
};

const FALLBACK_LANGUAGE_COLOR = "#8b8b93";

/** Brand-accurate dot color for a GitHub language, gray when unknown. */
export function languageColor(language?: string | null): string {
  if (!language) return FALLBACK_LANGUAGE_COLOR;
  return LANGUAGE_COLORS[language] ?? FALLBACK_LANGUAGE_COLOR;
}

/** Repos pushed within this window earn the "New" badge. */
export const FRESH_REPO_DAYS = 14;

/** True when the repo was pushed within the freshness window. */
export function isFreshRepo(pushedAt?: string | null): boolean {
  if (!pushedAt) return false;
  const pushed = Date.parse(pushedAt);
  if (Number.isNaN(pushed)) return false;
  return Date.now() - pushed < FRESH_REPO_DAYS * 24 * 60 * 60 * 1000;
}

/**
 * Relative label for a timestamp ("today", "yesterday", "3d ago", "2w ago",
 * "3mo ago", "1y ago"). Accepts ISO strings or epoch ms. Null when unknown.
 */
export function formatUpdatedAgo(
  value?: string | number | null,
): string | null {
  if (value === undefined || value === null || value === "") return null;
  const time = typeof value === "number" ? value : Date.parse(value);
  if (Number.isNaN(time)) return null;
  const diffMs = Date.now() - time;
  if (diffMs < 0) return "today";
  const days = Math.floor(diffMs / (24 * 60 * 60 * 1000));
  if (days < 1) return "today";
  if (days < 2) return "yesterday";
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  const years = Math.floor(days / 365);
  return `${years}y ago`;
}
