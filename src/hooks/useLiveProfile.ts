import { useEffect, useState } from "react";
import { fetchLiveProfile, type LiveProfile } from "../lib/github";

/**
 * Loads the live GitHub profile once on mount (no rebuild needed).
 * Returns null while loading or when the API is unreachable —
 * the snapshot in src/data/generated/github.json is the fallback.
 */
export function useLiveProfile(): LiveProfile | null {
  const [live, setLive] = useState<LiveProfile | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetchLiveProfile().then((profile) => {
      if (!cancelled) setLive(profile);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return live;
}
