#!/usr/bin/env node
/**
 * sync-github.mjs
 * Fetches public GitHub profile + repository data for the portfolio and
 * writes it to src/data/generated/github.json, which the site consumes.
 *
 * Runs automatically before `npm run dev` / `npm run build`, or manually
 * with `npm run sync` to refresh while the dev server is running.
 *
 * Security: only public data is fetched. No secrets are written anywhere.
 * Optionally set GITHUB_TOKEN in .env (never committed) to raise the API
 * rate limit from 60 to 5,000 requests/hour.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = resolve(ROOT, "src", "data", "generated");
const OUT_FILE = resolve(OUT_DIR, "github.json");
const USERNAME = "geduful";

try {
  process.loadEnvFile(resolve(ROOT, ".env"));
} catch {
  // No .env file — anonymous GitHub API access (60 req/hr) is fine.
}

const token = process.env.GITHUB_TOKEN ?? "";
const headers = {
  "User-Agent": "godfred-eduful-portfolio",
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

const EMPTY_SNAPSHOT = {
  fetchedAt: "",
  profile: {},
  repos: [],
  repoLanguages: [],
};

async function fetchJson(url) {
  const response = await fetch(url, {
    headers,
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) {
    throw new Error(`GitHub API ${response.status} for ${url}`);
  }
  return response.json();
}

async function main() {
  try {
    const [user, repos] = await Promise.all([
      fetchJson(`https://api.github.com/users/${USERNAME}`),
      fetchJson(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`),
    ]);

    const languageBytes = {};
    for (const repo of repos) {
      if (repo.fork) continue;
      try {
        const languages = await fetchJson(
          `https://api.github.com/repos/${USERNAME}/${repo.name}/languages`,
        );
        for (const [language, bytes] of Object.entries(languages)) {
          languageBytes[language] = (languageBytes[language] ?? 0) + bytes;
        }
      } catch (error) {
        console.warn(
          `  sync: could not fetch languages for ${repo.name}: ${error.message}`,
        );
      }
    }

    const totalBytes = Object.values(languageBytes).reduce(
      (sum, bytes) => sum + bytes,
      0,
    );
    const repoLanguages = Object.entries(languageBytes)
      .map(([language, bytes]) => ({
        language,
        percent: Math.round(((bytes / totalBytes) * 1000) / 10),
      }))
      .sort((a, b) => b.percent - a.percent)
      .slice(0, 8)
      .filter((entry) => entry.percent > 0);

    const snapshot = {
      fetchedAt: new Date().toISOString(),
      profile: {
        name: user.name ?? null,
        login: user.login ?? null,
        bio: user.bio ?? null,
        avatarUrl: user.avatar_url ?? null,
        location: user.location ?? null,
        hireable: user.hireable,
        twitterUsername: user.twitter_username ?? null,
        htmlUrl: user.html_url ?? null,
      },
      repos: repos
        .filter((repo) => !repo.fork)
        .map((repo) => ({
          name: repo.name,
          description: repo.description ?? null,
          htmlUrl: repo.html_url ?? null,
          homepage: repo.homepage ?? null,
          language: repo.language ?? null,
          topics: repo.topics ?? [],
          pushedAt: repo.pushed_at ?? null,
        })),
      repoLanguages,
    };

    await mkdir(OUT_DIR, { recursive: true });
    await writeFile(OUT_FILE, JSON.stringify(snapshot, null, 2) + "\n", "utf8");
    console.log(
      `sync: github.json updated — ${snapshot.repos.length} repos, ${snapshot.repoLanguages.length} languages (${snapshot.fetchedAt})`,
    );
  } catch (error) {
    console.warn(`sync: could not reach the GitHub API (${error.message})`);
    try {
      const existing = JSON.parse(await readFile(OUT_FILE, "utf8"));
      console.log(
        `sync: keeping previous snapshot (fetched ${existing.fetchedAt || "unknown time"})`,
      );
    } catch {
      await mkdir(OUT_DIR, { recursive: true });
      await writeFile(
        OUT_FILE,
        JSON.stringify(EMPTY_SNAPSHOT, null, 2) + "\n",
        "utf8",
      );
      console.log(
        "sync: wrote empty fallback snapshot — the site will use curated data only",
      );
    }
  }
}

main();
