# Godfred Eduful — Portfolio

Personal portfolio website of **Godfred Eduful** — Full-Stack Developer, Computer Science Student & Graphic Designer based in Ghana.

Built as a fast, accessible, SEO-ready single-page application.

## Tech Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org) (strict)
- [Vite](https://vite.dev) — build tool
- [Tailwind CSS v4](https://tailwindcss.com) — styling (design tokens in `src/index.css`)
- [Lucide React](https://lucide.dev) — icons
- Self-hosted variable fonts (Inter, Space Grotesk) via `@fontsource-variable`

## Getting Started

Requirements: Node.js >= 20.19

```bash
npm install
npm run dev        # start dev server at http://localhost:5173
npm run build      # type-check + production build (dist/)
npm run preview    # preview the production build
npm run lint       # ESLint
```

## Project Structure

```
src/
├── components/
│   ├── layout/       Navbar (scroll-spy), Footer (live local time)
│   ├── sections/     Hero (portrait + terminal), About, Skills, Projects,
│   │                 Experience, Services, Contact
│   └── ui/           Reveal, SectionHeading, ButtonLink, SpotlightCard,
│                     Terminal (typewriter), TechMarquee, ScrollProgress,
│                     BackToTop, brand icons
├── hooks/            useReveal, useActiveSection
├── data/             profile.ts, projects.ts, skills.ts, services.ts  ← edit content here
├── lib/              cn (className helper)
├── App.tsx
├── main.tsx
└── index.css         Tailwind v4 design tokens (@theme) + base styles
public/
├── favicon.svg
├── robots.txt
└── sitemap.xml
```

## Editing Content

All site content lives in `src/data/` — no component edits needed for text changes:

| File | Content |
| --- | --- |
| `profile.ts` | Name, taglines, intro, email, social links |
| `projects.ts` | Project cards (name, description, role, tech, links) |
| `skills.ts` | Skill categories and the footnote |
| `services.ts` | Services grid |

## Theming

The entire visual identity (colors, fonts, accent) is defined once in the `@theme` block at the top of `src/index.css`. To change the theme direction (e.g., light theme), edit only those tokens — components reference the tokens exclusively.

## Live GitHub Sync

The site automatically pulls your **public GitHub data** (name, avatar, bio, location, hireable status, repos, live links, language stats) so updates you make on GitHub appear on the site.

**How it works:**

1. `scripts/sync-github.mjs` fetches the GitHub REST API and writes `src/data/generated/github.json`
2. Runs automatically via the `predev` / `prebuild` / `prepreview` npm hooks
3. `src/lib/github.ts` provides typed access; `src/data/profile.ts` and `src/data/projects.ts` overlay live values over curated ones (curated copy wins where the API has nothing — e.g., project role wording, Acadex)

**Refresh anytime:** `npm run sync` (HMR picks it up while the dev server is running).

Notes:

- If the API is unreachable, the previous snapshot is kept; with no snapshot, the site falls back to curated data — builds never fail offline.
- Anonymous access allows ~60 requests/hour. Set `GITHUB_TOKEN` in `.env` (read-only, no scopes; never committed) to raise it to 5,000/hour.
- LinkedIn cannot be pulled programmatically (login wall) — social links remain curated in `src/data/profile.ts`.
- `src/data/generated/github.json` is generated, but it is committed so fresh clones build without network. It is always regenerated on dev/build.

## SEO

- Semantic HTML, proper heading hierarchy
- Title, meta description, Open Graph, Twitter Card, canonical URL
- JSON-LD `Person` structured data in `index.html`
- `public/robots.txt`, `public/sitemap.xml`

Before deploying, replace the placeholder domain `https://godfrededuful.com` in `index.html` (canonical + OG), `robots.txt`, and `sitemap.xml` with the real domain.

## Contact Form

The contact form is intentionally **frontend-only**: it validates input and shows a status message, but does not pretend to send mail. To go live:

1. Pick a service (Formspree, EmailJS, Resend, or your own API).
2. Copy `.env.example` to `.env` and set `VITE_CONTACT_ENDPOINT`.
3. POST the form data from `handleSubmit` in `src/components/sections/Contact.tsx`.

Never put private keys in the frontend — `VITE_*` variables are exposed to the browser by design.

## Accessibility & Performance

- WCAG-minded: keyboard navigation, visible focus states, semantic landmarks, labeled form fields, meaningful alt text
- `prefers-reduced-motion` respected (CSS + the `useReveal` hook)
- No unnecessary third-party scripts; fonts are self-hosted; lazy-reveal via IntersectionObserver only

## Deployment

Static output — deploy `dist/` to Vercel, Netlify, or GitHub Pages (Vite `base` is already set to `./` for sub-path hosting).
