import { useEffect, useState } from "react";
import { fetchLiveRepos, github, type GithubRepo } from "../lib/github";

export type LiveRepos = {
  repos: GithubRepo[];
  /** "snapshot" = build-time data, "cache" = stale/offline, "live" = confirmed fresh. */
  source: "snapshot" | "cache" | "live";
  /** Epoch ms when the data was last confirmed fresh, if known. */
  updatedAt: number | null;
};

function snapshotUpdatedAt(): number | null {
  if (!github.fetchedAt) return null;
  const parsed = Date.parse(github.fetchedAt);
  return Number.isNaN(parsed) ? null : parsed;
}

/**
 * Repository list that stays current without rebuilds: renders instantly
 * from the build-time snapshot, then revalidates against the live GitHub
 * API in the background. Newly pushed repos flow in automatically.
 */
export function useLiveRepos(): LiveRepos {
  const [state, setState] = useState<LiveRepos>(() => ({
    repos: github.repos,
    source: "snapshot",
    updatedAt: snapshotUpdatedAt(),
  }));

  useEffect(() => {
    let cancelled = false;
    fetchLiveRepos().then((result) => {
      if (!cancelled && result) {
        setState({
          repos: result.repos,
          source: result.source,
          updatedAt: result.updatedAt,
        });
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
