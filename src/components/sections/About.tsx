import { Compass, GraduationCap, MapPin, Palette } from "lucide-react";
import { profile } from "../../data/profile";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const quickFacts = [
  {
    icon: MapPin,
    label: "Based in",
    value: profile.location,
  },
  {
    icon: GraduationCap,
    label: "Currently",
    value: "BTech Computer Science student at Koforidua Technical University",
  },
  {
    icon: Palette,
    label: "Dual craft",
    value: "Developer & graphic designer",
  },
  {
    icon: Compass,
    label: "Focus",
    value: "Web apps & business websites",
  },
];

export function About() {
  return (
    <section id="about" className="border-t border-base-800/60 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="01 — About"
              title="A developer with a designer's eye"
              align="left"
            />
            <div className="mt-6 space-y-5 leading-relaxed text-ink-400">
              <Reveal delay={100}>
                <p>
                  I'm Godfred Eduful — a computer science student at
                  Koforidua Technical University and a full-stack developer
                  based in Ghana. I care about how software works{" "}
                  <em className="not-italic text-ink-300">and</em> how it
                  looks, which is why I pair development with UI/UX thinking
                  and graphic design.
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p>
                  My work sits at the intersection of code and design: I've
                  contributed to the development of Acadex alongside Rosemary
                  Boahemaa Dwamena — an attendance management platform for a
                  university community — and built
                  TheFarmYard, an agricultural platform connecting farmers
                  directly with buyers — alongside modern websites for fashion
                  and corporate brands.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <p>
                  I focus on digital products, websites, and software
                  solutions that are functional, accessible, and visually
                  engaging — building user-focused experiences and getting
                  better with every project I take on.
                </p>
              </Reveal>
            </div>
          </div>

          <Reveal delay={150} className="lg:pt-12">
            <div className="rounded-2xl border border-base-800 bg-base-900/60 p-6 sm:p-8">
              <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-500">
                Quick facts
              </h3>
              <ul className="mt-6 space-y-5">
                {quickFacts.map((fact) => (
                  <li key={fact.label} className="flex items-start gap-4">
                    <span
                      aria-hidden="true"
                      className="grid size-9 shrink-0 place-items-center rounded-lg border border-accent-400/20 bg-accent-soft text-accent-400"
                    >
                      <fact.icon className="size-4.5" />
                    </span>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wider text-ink-500">
                        {fact.label}
                      </p>
                      <p className="mt-0.5 font-medium text-ink-200">
                        {fact.value}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
              <blockquote className="mt-8 border-l-2 border-accent-400 pl-4 text-ink-300">
                {profile.shortStatement}
              </blockquote>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
