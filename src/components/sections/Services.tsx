import { services } from "../../data/services";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { SpotlightCard } from "../ui/SpotlightCard";

export function Services() {
  return (
    <section id="services" className="border-t border-base-800/60 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="05 — Services"
          title="What I can help you build"
          description="Services grounded in the work I've actually shipped — from complete web applications to business websites and design."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.title} delay={(index % 3) * 100}>
              <SpotlightCard className="h-full rounded-xl">
                <div className="group h-full rounded-xl border border-base-800 bg-base-900/60 p-6 transition-colors duration-300 hover:border-accent-400/40">
                  <span
                    aria-hidden="true"
                    className="grid size-10 place-items-center rounded-lg border border-accent-400/20 bg-accent-soft text-accent-400 transition-transform duration-300 group-hover:scale-105"
                  >
                    <service.icon className="size-5" />
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink-100">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-400">
                    {service.description}
                  </p>
                </div>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
