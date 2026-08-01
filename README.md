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

The entire visual identity (colors, fonts, accent) is defined once in the `@theme` block at the top of `src/index.css` — components reference the tokens exclusively.

Viewers can toggle between dark (default) and light themes via the Sun/Moon button in the Navbar. The choice is saved to `localStorage` (`theme` key) and respects the visitor's `prefers-color-scheme` on first visit. The light variant is a token-override block (`[data-theme="light"]` in `src/index.css`), and `index.html` contains a tiny pre-paint script so the correct theme is applied before first render (no flash). To change the light palette, edit only that override block.

## Live GitHub Sync

The site automatically pulls your **public GitHub data** (name, avatar, bio, location, hireable status, repos, live links, language stats) so updates you make on GitHub appear on the site.

**How it works:**

1. `scripts/sync-github.mjs` fetches the GitHub REST API and writes `src/data/generated/github.json`
2. Runs automatically via the `predev` / `prebuild` / `prepreview` npm hooks
3. `src/lib/github.ts` provides typed access; `src/data/profile.ts` and `src/data/projects.ts` overlay live values over curated ones (curated copy wins where the API has nothing — e.g., project role wording, Acadex)

**Refresh anytime:** `npm run sync` (HMR picks it up while the dev server is running).

**Live overlay (no rebuild needed):** on every page load the site also fetches the GitHub profile directly in the browser (`fetchLiveProfile` in `src/lib/github.ts`) so the hero portrait and "open to opportunities" status update automatically minutes after you change them on GitHub — nothing to commit or deploy. The response is cached in `localStorage` for 15 minutes to stay inside GitHub's anonymous rate limit; the committed snapshot remains the instant and offline fallback.

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

SEO URLs (canonical, Open Graph, robots sitemap, sitemap `<loc>`, JSON-LD) point to the live deployment at `https://godfrededuful.vercel.app`. If a custom domain is purchased and connected, update these references in `index.html`, `public/robots.txt`, `public/sitemap.xml`, and `src/data/profile.ts` (`siteUrl`).

## Contact Form

The contact form posts to the Vercel serverless function at `/api/contact` (`api/contact.mjs`), which forwards the message to **Resend**, delivered straight to `edufulgodfred22@gmail.com`.

**One-time setup:**

1. Create a free account at [resend.com](https://resend.com) and grab an API key (Settings → API Keys).
2. Add it to Vercel: **Settings → Environment Variables → `RESEND_API_KEY`** (production), then redeploy.
3. Done — the form will send. The free shared sender `onboarding@resend.dev` works immediately because it only delivers to the account owner's email (yours). To use a branded sender, verify your domain in Resend and update the `from` in `api/contact.mjs`.

Notes:

- The key never reaches the browser — it lives only in the serverless function.
- Basic spam protection is built in: a hidden honeypot field (`website`) is rejected server-side.
- Optional override: set `VITE_CONTACT_ENDPOINT` if you want the form to POST somewhere else instead of `/api/contact`.
- No secrets in `.env` are ever committed (see `.env.example`).

## Accessibility & Performance

- WCAG-minded: keyboard navigation, visible focus states, semantic landmarks, labeled form fields, meaningful alt text
- `prefers-reduced-motion` respected (CSS + the `useReveal` hook)
- No unnecessary third-party scripts; fonts are self-hosted; lazy-reveal via IntersectionObserver only

## Deployment

Static output — deploy `dist/` to Vercel, Netlify, or GitHub Pages (Vite `base` is already set to `./` for sub-path hosting).
