import { useEffect, useRef, useState } from "react";

const COMMANDS = [
  {
    cmd: "whoami",
    out: "godfred-eduful — full-stack developer · CS student · graphic designer",
  },
  {
    cmd: "echo $STACK",
    out: "React · Next.js · TypeScript · Tailwind · Node.js · PostgreSQL",
  },
  {
    cmd: "ls ~/projects",
    out: "Acadex   TheFarmYard   Nuellas_Klothing   KP-Group",
  },
  {
    cmd: "cat status.json",
    out: '{ "availability": "open to opportunities", "location": "Ghana" }',
  },
];

const FULL_OUTPUT = COMMANDS.map((c) => `\u276f ${c.cmd}\n${c.out}\n`).join("");

const CHAR_DELAY_MS = 24;
const NEWLINE_DELAY_MS = 320;

/**
 * A terminal card that types out a short command session when it
 * scrolls into view. Purely presentational (aria-hidden) — all the
 * information shown here also exists in the page content.
 */
export function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [started, setStarted] = useState(false);
  const [typed, setTyped] = useState(reducedMotion ? FULL_OUTPUT.length : 0);

  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion) return;

    // Failsafe: start typing even if the observer never fires.
    const failsafe = window.setTimeout(() => setStarted(true), 2500);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
          window.clearTimeout(failsafe);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (!started || typed >= FULL_OUTPUT.length) return;
    const delay =
      FULL_OUTPUT[typed] === "\n" ? NEWLINE_DELAY_MS : CHAR_DELAY_MS;
    const timer = window.setTimeout(() => {
      setTyped((c) => Math.min(c + 1, FULL_OUTPUT.length));
    }, delay);
    return () => window.clearTimeout(timer);
  }, [started, typed]);

  const visibleLines = FULL_OUTPUT.slice(0, typed).split("\n");
  const done = typed >= FULL_OUTPUT.length;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="w-full max-w-md overflow-hidden rounded-xl border border-base-700 bg-base-950/90 text-left shadow-2xl shadow-black/40"
    >
      <div className="flex items-center gap-2 border-b border-base-800 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#f87171]/80" />
        <span className="size-2.5 rounded-full bg-[#fbbf24]/80" />
        <span className="size-2.5 rounded-full bg-[#34d399]/80" />
        <span className="ml-2 font-mono text-xs text-ink-500">
          geduful — zsh
        </span>
      </div>
      <div className="min-h-56 px-4 py-4 font-mono text-[13px] leading-6 sm:min-h-64">
        {visibleLines.map((line, index) => {
          const isCommand = line.startsWith("\u276f");
          const isLast = index === visibleLines.length - 1;
          return (
            <div
              key={`${index}-${line}`}
              className="whitespace-pre-wrap break-words"
            >
              {isCommand ? (
                <>
                  <span className="font-bold text-accent-400">\u276f</span>
                  <span className="text-ink-100">{line.slice(1)}</span>
                </>
              ) : (
                <span className="text-ink-400">{line}</span>
              )}
              {isLast && !done ? (
                <span className="ml-1 inline-block size-2 animate-pulse rounded-[1px] bg-accent-400 align-baseline" />
              ) : null}
            </div>
          );
        })}
        {done ? (
          <span className="mt-1 inline-block size-2 animate-pulse rounded-[1px] bg-accent-400 align-baseline" />
        ) : null}
      </div>
    </div>
  );
}
