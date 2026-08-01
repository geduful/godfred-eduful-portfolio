import { useEffect } from "react";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { Hero } from "./components/sections/Hero";
import { About } from "./components/sections/About";
import { Skills } from "./components/sections/Skills";
import { Projects } from "./components/sections/Projects";
import { Experience } from "./components/sections/Experience";
import { Services } from "./components/sections/Services";
import { Contact } from "./components/sections/Contact";
import { ScrollProgress } from "./components/ui/ScrollProgress";
import { TechMarquee } from "./components/ui/TechMarquee";
import { BackToTop } from "./components/ui/BackToTop";

export default function App() {
  useEffect(() => {
    console.info(
      "%cGodfred Eduful%c — thanks for inspecting. Let's build something → github.com/geduful",
      "color:#34d399;font-weight:700;font-size:14px",
      "color:inherit",
    );
  }, []);

  return (
    <div className="min-h-screen bg-base-950 text-ink-100">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent-400 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-base-950"
      >
        Skip to main content
      </a>
      <ScrollProgress />
      <Navbar />
      <main id="main">
        <Hero />
        <TechMarquee />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Services />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
