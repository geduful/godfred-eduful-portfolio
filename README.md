# Godfred Eduful — Portfolio

Personal portfolio of **Godfred Eduful** — Full-Stack Developer, Computer Science Student & Graphic Designer based in Ghana.

A fast, accessible, SEO-ready single-page application that presents his work, skills, experience, and services — with live GitHub data, a working contact form, and structured data for Google.

---

## Overview

**What it is.** A single-page React application that serves as the professional online presence of Godfred Eduful. It combines a personal brand, a portfolio of real projects, an evidence-based skills section, an experience timeline, a services grid, and a working contact form.

**Who it is for.** Potential employers, clients, collaborators, and anyone evaluating Godfred's software development and design work.

**Why it exists.** To present verified, accurate professional information — who Godfred is, what he builds, what he has contributed to, and how to reach him — in one fast, accessible, and search-engine-friendly place.

---

## Features

- **Hero** — full name, role taglines, intro, availability status, and portrait pulled live from GitHub, plus social profile links (GitHub, LinkedIn, X, Instagram).
- **Animated terminal card** — a decorative typewriter session summarizing identity, stack, projects, and location (reduced-motion aware).
- **Tech marquee** — an infinite scrolling strip of technologies used as a visual divider.
- **About** — natural-language identity summary with a quick-facts card (location, education, dual craft, focus).
- **Skills** — evidence-based categories (languages, frontend, backend, databases, tools, deployment, design), with a footnote distinguishing confirmed skills from those declared on the public profile, plus live language statistics from public GitHub repositories.
- **Projects** — curated cards with accurate role attribution (including contribution-based framing for collaborative work), tech tags, live-site and source links, expandable Problem → What I did → Outcome case studies, and a "More from GitHub" list of other public repositories.
- **Experience** — a timeline covering project contributions, independent work, education, and leadership.
- **Services** — a grid of offered services (full-stack development, frontend, business websites, web applications, UI/UX & graphic design, AI & automation).
- **Contact form** — validates input, rejects bots via a hidden honeypot, and sends messages through a Vercel serverless function to Resend; direct email and social links are also provided.
- **Dark/light themes** — theme toggle persisted in `localStorage`, honoring `prefers-color-scheme` on first visit with a pre-paint script to avoid flash.
- **Live GitHub sync** — a build-time snapshot (`npm run sync`) plus a client-side live profile fetch (15-minute cache) so the portrait and availability status stay current without redeploys.
- **SEO & structured data** — canonical URL, Open Graph and Twitter cards, JSON-LD `Person`/`WebSite`/`ProfilePage` graph, `robots.txt`, `sitemap.xml`.
- **Accessibility** — skip link, semantic landmarks, labeled form fields, visible focus states, `prefers-reduced-motion` support.
- **Downloadable CV** — a resume PDF linked from the Hero and Contact sections.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Languages | TypeScript, HTML, CSS (JavaScript for config/scripts) |
| Framework | React 19 |
| Styling | Tailwind CSS v4 (design tokens in `src/index.css`) |
| Icons | lucide-react (brand icons as inline SVGs) |
| Fonts | Self-hosted variable fonts — Inter & Space Grotesk (`@fontsource-variable`) |
| Build tools | Vite 8, TypeScript 6 (strict), ESLint 10 (flat config) |
| Data | Local curated data in `src/data`, overlaid with a GitHub REST API snapshot |
| Backend | Single Vercel serverless function (`api/contact.mjs`) → Resend email API |
| Deployment | Vercel (static site + serverless function) |

Requirements: Node.js >= 20.19 (per `package.json` engines).

---

## Architecture

A static single-page application built with Vite and React, with exactly one serverless function for the contact form.

- **Content lives in `src/data/`.** Curated copy (name, taglines, projects, skills, services) is written by hand. A generated snapshot (`src/data/generated/github.json`) overlays live GitHub data — profile fields, repository links, and language statistics — and a short-lived client-side fetch keeps the portrait and availability status fresh.
- **Theming is token-driven.** All colors and fonts are defined once in Tailwind's `@theme` block as CSS custom properties, so the dark/light toggle swaps variables at runtime without touching components.
- **SEO head is fully static** in `index.html`: metadata, canonical, Open Graph, Twitter cards, and a JSON-LD `@graph` (Person, WebSite, ProfilePage).
- **The contact flow is client → serverless → Resend.** The browser posts to `/api/contact`; the function validates, strips origin/spam, and forwards the email. The API key never reaches the browser.

---

## Folder Structure

```
godfred-eduful-portfolio/
├── api/
│   └── contact.mjs              # Vercel serverless function — contact form → Resend
├── public/                      # served as-is at the site root
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── resume.pdf               # downloadable CV (PDF)
│   └── google4edc661d86cfd4c5.html  # Google Search Console verification file
├── scripts/
│   └── sync-github.mjs          # fetches public GitHub data → src/data/generated/github.json
├── src/
│   ├── components/
│   │   ├── layout/              # Navbar (scroll-spy, mobile menu), Footer (live Accra time)
│   │   ├── sections/            # Hero, About, Skills, Projects, Experience, Services, Contact
│   │   └── ui/                  # Reveal, SpotlightCard, Terminal, TechMarquee, SectionHeading,
│   │                            # ButtonLink, ScrollProgress, BackToTop, ThemeToggle, icons
│   ├── data/
│   │   ├── profile.ts           # name, taglines, intro, email, social links
│   │   ├── projects.ts          # curated projects + case studies + GitHub overlay
│   │   ├── skills.ts            # evidence-based skill categories + footnote
│   │   ├── services.ts          # services grid
│   │   └── generated/
│   │       └── github.json      # auto-generated GitHub snapshot (committed, refreshed by sync)
│   ├── hooks/                   # useTheme, useReveal, useActiveSection, useLiveProfile
│   ├── lib/
│   │   ├── github.ts            # typed access to the GitHub snapshot + live profile fetch
│   │   └── cn.ts                # className helper
│   ├── App.tsx                  # page composition (section order)
│   ├── main.tsx                 # React entry
│   ├── index.css                # Tailwind v4 @theme tokens + dark/light palettes + base styles
│   └── vite-env.d.ts
├── index.html                   # SEO head, JSON-LD, theme pre-paint script, app mount
├── vite.config.ts               # React + Tailwind plugins; base "./"
├── tsconfig.json / tsconfig.app.json / tsconfig.node.json
├── eslint.config.js             # flat config: JS/TS/React hooks rules
├── package.json
└── README.md
```

---

## Installation

Requirements: Node.js >= 20.19 and npm.

```bash
# 1. Clone
git clone https://github.com/geduful/godfred-eduful-portfolio.git
cd godfred-eduful-portfolio

# 2. Install dependencies
npm install

# 3. Start the development server (http://localhost:5173)
npm run dev

# 4. Production build — type-checks with tsc, then builds to dist/
npm run build

# 5. Preview the production build locally
npm run preview

# 6. Lint
npm run lint

# 7. Refresh the GitHub data snapshot manually
npm run sync
```

> `dev`, `build`, and `preview` automatically run `npm run sync` first (via `predev` / `prebuild` / `prepreview`). If the GitHub API is unreachable, the previous snapshot is kept and the build still succeeds offline.

---

## Environment Variables

Copy `.env.example` to `.env` for local development. No real secret values are ever committed.

| Variable | Scope | Required | Purpose |
| --- | --- | --- | --- |
| `VITE_CONTACT_ENDPOINT` | Client (Vite) | No | Overrides the contact form endpoint. Defaults to `/api/contact`. |
| `RESEND_API_KEY` | Server only | For the contact form | Resend API key used by `api/contact.mjs`. Must never use a `VITE_` prefix (that would expose it to the browser). Set it in the Vercel dashboard: Settings → Environment Variables. |
| `GITHUB_TOKEN` | Local / CI | No | Optional read-only GitHub token that raises the `npm run sync` API rate limit from 60 to 5,000 requests/hour. Runs only in the sync script — never bundled. |

Contact-form setup: create a free account at [resend.com](https://resend.com), copy the API key, add it as `RESEND_API_KEY` in Vercel, and redeploy. The free shared sender (`onboarding@resend.dev`) delivers to the account owner's email immediately; verify a domain in Resend to use a branded sender.

---

## Screenshots

Screenshots are not included yet. Add images of the deployed site here, for example:

```
docs/screenshots/home.png     # Hero + marquee
docs/screenshots/projects.png # Projects section
docs/screenshots/contact.png  # Contact section
```

Then reference them with markdown images (e.g. `![Home](docs/screenshots/home.png)`).

---

## Live Demo

- **Portfolio:** https://godfrededuful.vercel.app/
- **GitHub:** https://github.com/geduful

---

## Performance & SEO

- **Responsive design** — mobile-first Tailwind layout, responsive grids, collapsible mobile navigation.
- **Accessibility** — skip-to-content link, semantic landmarks, labeled form fields, visible focus states, `prefers-reduced-motion` respected in CSS and hooks, decorative elements marked `aria-hidden`.
- **Structured data** — JSON-LD `@graph` with a single `Person` entity (name, URL, image, job title, alumni, `sameAs`, `knowsAbout`), `WebSite`, and `ProfilePage` referencing the Person.
- **Search Engine Optimization** — descriptive title and meta description, canonical URL, Open Graph and Twitter Card tags, `robots.txt`, and `sitemap.xml`, all pointing to https://godfrededuful.vercel.app/.
- **Performance** — self-hosted variable fonts (no third-party font requests), no third-party runtime scripts, scroll-reveal via `IntersectionObserver`, a `requestAnimationFrame`-throttled scroll progress bar, direct style mutations to avoid re-renders, `preconnect` to the avatar CDN, and a small production bundle.

---

## Future Improvements

- Add a professional 1200×630 Open Graph image for social sharing.
- Add GitHub Actions CI (lint + type-check + build on push and pull requests).
- Add automated tests (none exist today).
- Connect a custom domain and update the SEO URLs documented in `index.html`, `public/robots.txt`, `public/sitemap.xml`, and `src/data/profile.ts`.
- Add the README screenshots described above.

---

## Author

**Godfred Eduful** — Full-Stack Developer | Computer Science Student | Graphic Designer

- GitHub: https://github.com/geduful
- LinkedIn: https://www.linkedin.com/in/godfred-eduful-743b2b350
- Portfolio: https://godfrededuful.vercel.app/

---

## License

This repository currently has **no license file**. Until a license is chosen and added, all rights are reserved by default under copyright law. If you plan to reuse any part of this project, contact the author first.
