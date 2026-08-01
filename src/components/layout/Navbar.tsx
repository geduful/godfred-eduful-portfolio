import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { ButtonLink } from "../ui/ButtonLink";
import { ThemeToggle } from "../ui/ThemeToggle";
import { useActiveSection } from "../../hooks/useActiveSection";
import { cn } from "../../lib/cn";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

const SECTION_IDS = NAV_LINKS.map((link) => link.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || open
          ? "border-b border-base-800 bg-base-950/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <a
          href="#home"
          className="flex items-center gap-2.5 rounded-md"
          onClick={() => setOpen(false)}
        >
          <span
            aria-hidden="true"
            className="grid size-9 place-items-center rounded-lg border border-accent-400/30 bg-accent-400/10 font-display text-sm font-bold text-accent-400"
          >
            GE
          </span>
          <span className="font-display text-base font-semibold tracking-tight text-ink-100">
            Godfred Eduful
          </span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const id = link.href.slice(1);
            const isActive = activeSection === id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative rounded-md px-3 py-2 text-sm font-medium transition-colors after:absolute after:-bottom-0.5 after:left-3 after:right-3 after:h-0.5 after:origin-left after:rounded-full after:bg-accent-400 after:transition-transform after:duration-300",
                    isActive
                      ? "text-ink-100 after:scale-x-100"
                      : "text-ink-400 after:scale-x-0 hover:text-ink-100",
                  )}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <div className="hidden md:block">
            <ButtonLink href="#contact">Let's Talk</ButtonLink>
          </div>

          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg border border-base-700 text-ink-300 transition-colors hover:bg-base-850 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-base-800 bg-base-950/95 backdrop-blur-md md:hidden"
        >
          <ul className="mx-auto max-w-6xl space-y-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-base-850 hover:text-ink-100",
                      isActive ? "text-ink-100" : "text-ink-300",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-4 w-0.5 rounded-full transition-colors",
                        isActive ? "bg-accent-400" : "bg-transparent",
                      )}
                    />
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
