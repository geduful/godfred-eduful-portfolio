import { useState, type FormEvent } from "react";
import { ExternalLink, Mail, Send } from "lucide-react";
import { profile, socials } from "../../data/profile";
import { GithubIcon, InstagramIcon, LinkedinIcon, XIcon } from "../ui/icons";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const iconByLabel: Record<string, typeof GithubIcon> = {
  "GitHub": GithubIcon,
  "LinkedIn": LinkedinIcon,
  "X (Twitter)": XIcon,
  "Instagram": InstagramIcon,
};

type Status = "idle" | "sent";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // TODO: Connect a production email service. Recommended options:
    //  - Formspree / EmailJS (no backend needed)
    //  - Resend / SendGrid / your own API (set VITE_CONTACT_ENDPOINT in .env
    //    and POST the form data there from this handler)
    setStatus("sent");
  }

  return (
    <section id="contact" className="border-t border-base-800/60 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="06 — Contact"
          title="Let's build something together"
          description="Open to interesting projects, collaborations, or a conversation about software and design — I'll get back to you as soon as I can."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <h3 className="font-display text-xl font-semibold text-ink-100">
              Find me online
            </h3>
            <ul className="mt-6 space-y-3">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="flex items-center gap-4 rounded-xl border border-base-800 bg-base-900/60 px-4 py-3.5 transition-colors hover:border-base-600"
                >
                  <span
                    aria-hidden="true"
                    className="grid size-10 shrink-0 place-items-center rounded-lg border border-accent-400/20 bg-accent-400/10 text-accent-400"
                  >
                    <Mail className="size-5" />
                  </span>
                  <span>
                    <span className="block text-xs font-medium uppercase tracking-wider text-ink-500">
                      Email
                    </span>
                    <span className="block text-sm font-medium text-ink-200">
                      {profile.email}
                    </span>
                  </span>
                </a>
              </li>
              {socials.map((social) => {
                const Icon = iconByLabel[social.label];
                return (
                  <li key={social.href}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 rounded-xl border border-base-800 bg-base-900/60 px-4 py-3.5 transition-colors hover:border-base-600"
                    >
                      <span
                        aria-hidden="true"
                        className="grid size-10 shrink-0 place-items-center rounded-lg border border-base-700 bg-base-950/60 text-ink-300"
                      >
                        <Icon className="size-5" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-xs font-medium uppercase tracking-wider text-ink-500">
                          {social.label}
                        </span>
                        <span className="block text-sm font-medium text-ink-200">
                          {social.handle}
                        </span>
                      </span>
                      <ExternalLink
                        className="size-4 text-ink-500"
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={150}>
            <div className="rounded-2xl border border-base-800 bg-base-900/60 p-6 sm:p-8">
              <h3 className="font-display text-xl font-semibold text-ink-100">
                Send a message
              </h3>
              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-sm font-medium text-ink-300"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className="w-full rounded-lg border border-base-700 bg-base-950 px-4 py-2.5 text-ink-100 placeholder:text-ink-500 transition-colors focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-sm font-medium text-ink-300"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@example.com"
                    className="w-full rounded-lg border border-base-700 bg-base-950 px-4 py-2.5 text-ink-100 placeholder:text-ink-500 transition-colors focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-sm font-medium text-ink-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me about your project or idea…"
                    className="w-full resize-y rounded-lg border border-base-700 bg-base-950 px-4 py-2.5 text-ink-100 placeholder:text-ink-500 transition-colors focus:border-accent-400 focus:outline-none focus:ring-1 focus:ring-accent-400"
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent-400 px-5 py-3 text-sm font-semibold text-base-950 transition-colors hover:bg-accent-300"
                >
                  Send message
                  <Send className="size-4" aria-hidden="true" />
                </button>

                <p
                  aria-live="polite"
                  className="rounded-lg border border-base-700 bg-base-950/60 p-3.5 text-sm leading-relaxed text-ink-400"
                >
                  {status === "sent" ? (
                    <>
                      Thanks for reaching out — this form isn't connected to a
                      backend yet, so for now email me directly at{" "}
                      <a
                        href={`mailto:${profile.email}`}
                        className="font-medium text-accent-300 underline underline-offset-2"
                      >
                        {profile.email}
                      </a>
                      .
                    </>
                  ) : (
                    "This form is currently frontend-only. A production email service or API endpoint can be connected later without changing the UI."
                  )}
                </p>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
