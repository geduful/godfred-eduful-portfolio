import { useEffect, useState } from "react";
import { Clock, Mail } from "lucide-react";
import { profile, socials } from "../../data/profile";
import {
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "../ui/icons";

const iconByLabel: Record<string, typeof GithubIcon> = {
  "GitHub": GithubIcon,
  "LinkedIn": LinkedinIcon,
  "X (Twitter)": XIcon,
  "Instagram": InstagramIcon,
};

function formatAccraTime() {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Africa/Accra",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  } catch {
    return new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());
  }
}

function LocalTime() {
  const [time, setTime] = useState(formatAccraTime);

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatAccraTime()), 30000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5">
      <Clock className="size-3.5" aria-hidden="true" />
      <time dateTime={new Date().toTimeString().slice(0, 8)}>
        Local time — Accra: {time} GMT
      </time>
    </span>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-base-800 bg-base-900/40">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <p className="font-display text-lg font-semibold tracking-tight text-ink-100">
              {profile.name}
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink-400">
              Full-stack developer, computer science student, and graphic
              designer building modern, impactful digital solutions.
            </p>
          </div>

          <ul className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = iconByLabel[social.label];
              return (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.label} profile`}
                    className="grid size-10 place-items-center rounded-lg border border-base-700 text-ink-400 transition-colors hover:border-accent-400/40 hover:text-accent-300"
                  >
                    <Icon className="size-4.5" />
                  </a>
                </li>
              );
            })}
            <li>
              <a
                href={`mailto:${profile.email}`}
                aria-label={`Email ${profile.name}`}
                className="grid size-10 place-items-center rounded-lg border border-base-700 text-ink-400 transition-colors hover:border-accent-400/40 hover:text-accent-300"
              >
                <Mail className="size-4.5" />
              </a>
            </li>
          </ul>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-base-800 pt-6 text-sm text-ink-500 sm:flex-row sm:items-center">
          <p>
            © {year} {profile.name}. All rights reserved.
          </p>
          <LocalTime />
          <p>Built with React, TypeScript &amp; Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
}
