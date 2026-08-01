import { ArrowRight } from "lucide-react";
import { profile, socials } from "../../data/profile";
import { ButtonLink } from "../ui/ButtonLink";
import { Reveal } from "../ui/Reveal";
import { Terminal } from "../ui/Terminal";
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from "../ui/icons";

const iconByLabel: Record<string, typeof GithubIcon> = {
  "GitHub": GithubIcon,
  "LinkedIn": LinkedinIcon,
  "X (Twitter)": XIcon,
  "Instagram": InstagramIcon,
};

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-96"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, color-mix(in srgb, var(--color-accent-400) 7%, transparent), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 sm:pt-36 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <Reveal>
              {profile.hireable ? (
                <p className="inline-flex items-center gap-2.5 rounded-full border border-base-700 bg-base-900/80 px-4 py-1.5 text-sm text-ink-300">
                  <span className="relative flex size-2" aria-hidden="true">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-400 opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-accent-400" />
                  </span>
                  Open to opportunities
                </p>
              ) : null}
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-ink-100 sm:text-5xl lg:text-6xl">
                Godfred Eduful<span className="text-accent-400">.</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-lg font-medium text-ink-300 lg:justify-start sm:text-xl">
                {profile.taglines.map((tagline, index) => (
                  <span key={tagline} className="flex items-center gap-3">
                    {tagline}
                    {index < profile.taglines.length - 1 ? (
                      <span aria-hidden="true" className="text-accent-400">
                        ·
                      </span>
                    ) : null}
                  </span>
                ))}
              </p>
            </Reveal>

            <Reveal delay={300}>
              <p className="mx-auto mt-6 max-w-xl leading-relaxed text-ink-400 lg:mx-0">
                {profile.heroIntro}
              </p>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
                <ButtonLink href="#projects" className="w-full sm:w-auto">
                  View My Work
                  <ArrowRight className="size-4" aria-hidden="true" />
                </ButtonLink>
                <ButtonLink
                  href="#contact"
                  variant="secondary"
                  className="w-full sm:w-auto"
                >
                  Let's Connect
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={500}>
              <ul className="mt-10 flex items-center justify-center gap-3 lg:justify-start">
                {socials.map((social) => {
                  const Icon = iconByLabel[social.label];
                  return (
                    <li key={social.href}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${social.label} profile`}
                        className="grid size-11 place-items-center rounded-lg border border-base-700 bg-base-900/60 text-ink-400 transition-colors hover:border-accent-400/40 hover:text-accent-300"
                      >
                        <Icon className="size-5" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>

          <div className="order-1 flex flex-col items-center gap-8 lg:order-2 lg:items-end">
            <Reveal delay={150}>
              <div className="relative mx-auto w-fit">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -z-10 rounded-[1.75rem] bg-accent-400/15 blur-3xl"
                />
                <div
                  aria-hidden="true"
                  className="absolute -bottom-3 -right-3 h-full w-full rounded-[1.75rem] border border-accent-400/30"
                />
                <img
                  src={profile.avatar}
                  alt={`Portrait of ${profile.name}, full-stack developer and graphic designer`}
                  width={192}
                  height={192}
                  fetchPriority="high"
                  decoding="async"
                  className="relative size-44 rounded-[1.75rem] border border-base-700 object-cover shadow-2xl shadow-black/50 ring-1 ring-ink-100/10 transition-transform duration-500 hover:scale-[1.02] sm:size-52"
                />
                <span
                  aria-hidden="true"
                  className="absolute -right-2.5 -top-2.5 grid size-9 place-items-center rounded-full border-2 border-base-950 bg-base-900 shadow-lg shadow-black/40"
                >
                  <span className="relative flex size-2.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent-400 opacity-60" />
                    <span className="relative inline-flex size-2.5 rounded-full bg-accent-400" />
                  </span>
                </span>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <Terminal />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
