# Precious Steps Child Care Center

Marketing website for Precious Steps Child Care Center, Plainfield, New Jersey.

Static site built with [Eleventy](https://www.11ty.dev/). No client-side
framework, no database, no third-party scripts.

## Quick start

```bash
npm install
npm start          # dev server at http://localhost:8080
npm run build      # production build into _site/
npm run check      # build, validate HTML, check links
```

Node 20 or newer. The version is pinned in `.nvmrc`.

## How this project is organised

| Path | What it holds |
| --- | --- |
| `src/_data/` | **All site content as JSON.** Facts live here, not in templates. |
| `src/_includes/layouts/` | Page shell |
| `src/_includes/partials/` | Header, footer, reusable blocks |
| `src/assets/css/tokens.css` | **Every colour, font, space value.** The rebrand swap point. |
| `src/assets/css/base.css` | Reset, typography, native elements |
| `src/assets/css/components.css` | Components |
| `src/assets/js/main.js` | Progressive enhancement only |
| `src/*.njk` | One file per page |
| `docs/` | Scope, handoff and photo release records |

### Two rules that keep this maintainable

1. **Content changes happen in `src/_data/`, never in a template.** Phone
   numbers, hours, ages, ratios and programs are all in `site.json`,
   `programs.json`, `enrollment.json` and `faq.json`. Change a fact once and it
   updates everywhere it appears.
2. **Design values live only in `tokens.css`.** No other stylesheet contains a
   raw colour or font family. When the client's rebrand lands, that one file
   changes.

## Unconfirmed content

Several facts in the client's source documents contradict each other. Those are
marked `Confirmed: false` in the data files and render as visible yellow
`.todo` blocks on the page so nothing unverified ships by accident.

**See `CONTENT-STATUS.md` for the full list and its current state.** The site is
not ready to launch while any blocking item there is open.

## Security posture

The build is written to pass a static HTML security scan:

- No inline `<script>`, no inline `<style>`, no `style=` attributes, no `on*`
  event handlers
- No `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write` or `eval`
- A strict Content Security Policy in `netlify.toml`, with no `unsafe-inline`
  or `unsafe-eval`
- Maps are links, not iframes, so no `frame-src` exception and no third-party
  tracking
- Self-hosted fonts only, keeping `font-src 'self'`

If you add a third-party embed later, widen the CSP for that one source
deliberately. Do not loosen the policy wholesale.

## Deployment

Netlify, configured in `netlify.toml`. Build command `npm run build`, publish
directory `_site`.

The contact form uses Netlify Forms. The `data-netlify="true"` attribute
registers it at deploy time, and submission recipients are set in the Netlify
dashboard, not in this repo. A honeypot field (`company-name`) filters naive
bots.

## What must never be committed here

`.gitignore` excludes `/client-private/`. The client's enrollment packet
contains health histories, family contact details and other personal
information. It does not belong in a public repository and it does not belong
on the website.
