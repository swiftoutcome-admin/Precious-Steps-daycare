# Engineering guide

How this site is built and the rules that keep it working. Read this before
changing anything. Most of what follows is here because it already broke once.

## Commands

```
npm start         # dev server with live reload
npm run build     # build to _site/
npm run check     # build, then html-validate, then link check
```

`npm run check` is the gate. Nothing ships that does not pass it.

## Stack

Eleventy 3 with an ESM config (`eleventy.config.js`), Nunjucks templates,
static output, no client-side framework. Hosted on Netlify. Forms go through
Netlify Forms.

```
src/
  *.njk                 page templates, one per page
  _data/                all content and facts
    i18n/en.json        every English string
    i18n/es.json        every Spanish string
    site.json           addresses, phones, hours, legal name
    programs.json       the five programs
    faq.json  enrollment.json  announcements.json
    languages.json      drives the bilingual build
    env.js              reads Netlify context, gates indexing
  _includes/
    layouts/base.njk    the one layout
    partials/           header, footer, nav
  assets/css/
    tokens.css          every colour, font, space and radius value
    base.css            element defaults
    components.css      everything else
    fonts.css           self-hosted font faces
  assets/img/brand/     logo, favicons, social card, wallpaper tile
```

## The bilingual build

This is the part that breaks silently. Read it twice.

Every page is generated twice from a single template by paginating over
`languages.json`:

```yaml
---
layout: layouts/base.njk
pageKey: programs
pagination:
  data: languages
  size: 1
  alias: lang
  addAllPagesToCollections: true
permalink: "{{ pageKey | localizedUrl(lang.code) }}"
eleventyComputed:
  title: "{{ i18n[lang.code].programs.title }}"
---
{% set t = i18n[lang.code] %}
```

Three things are load-bearing:

**`addAllPagesToCollections: true` is required.** Without it Eleventy adds only
the first paginated output to collections, so every Spanish page disappears
from the sitemap. The build still succeeds, which is why this is easy to miss.

**`pageKey` is the only link between the two language versions of a page.** It
drives the `localizedUrl` filter, the language toggle and the hreflang tags.
Every template needs one, including `404.njk`, which otherwise builds a link to
`/undefined/`.

**Spanish URLs use the English slug under an `/es/` prefix**, so `/programs/`
and `/es/programs/`. If you ever localise the slugs, `localizedUrl` and the
toggle both have to change together.

## Content lives in data, never in templates

No prose belongs in a `.njk` file. Strings go in `i18n/en.json` and
`i18n/es.json`. Facts that are the same in both languages, such as addresses,
phone numbers and ratios, go in `site.json` or `programs.json`.

If a change needs a new string, add the key to **both** language files. If you
cannot write the Spanish properly, say so rather than guessing.

Some fields carry a Spanish variant alongside the neutral value, because the
text differs by language even though it sits in a facts file:

```
hours / hoursEs          calendar / calendarEs       ages / agesEs
hoursNote / hoursNoteEs  closures / closuresEs       careTypes / careTypesEs
closuresNote / closuresNoteEs                        responseTime / responseTimeEs
```

Templates must select by language:

```njk
{{ location.hours if lang.code == 'en' else location.hoursEs }}
```

Miss one and English text appears on a Spanish page. This happened to hours,
calendars and age ranges all at once.

## Nunjucks traps

`divisibleby` is a Jinja test that Nunjucks does not have. Use
`{% if loop.index0 % 2 == 1 %}`.

Inside a nested loop, `loop.last` refers to the **inner** loop. Capture the
outer one first:

```njk
{%- set outer = loop -%}
```

A separator driven by the wrong `loop.last` produced a trailing comma on the
Locations page for weeks before anyone noticed.

## Colour and type

Every colour, font, space, radius and shadow value lives in
`src/assets/css/tokens.css` and nowhere else. No raw hex in any other file.

The palette comes from the client's Digital Brand Standards. Five official
colours, used at their exact published values:

| Colour      | Hex       | Role                               |
|-------------|-----------|------------------------------------|
| Deep Navy   | `#17345E` | headings and primary text          |
| Royal Blue  | `#2878D7` | buttons and informational accents  |
| Hot Pink    | `#EC438F` | highlights and the focus ring      |
| Blush Pink  | `#F7B7C9` | soft backgrounds                   |
| White       | `#FFFFFF` | clean space                        |

Everything else in the colour section is a tint or shade of one of those five,
including the neutrals, which are Deep Navy mixed toward white so no grey on
the page comes from outside the brand.

**Two values are deliberately deepened and must not be "corrected" back.** The
published colours fail contrast where they carry text:

- `--brand-royal-700` `#236abd` for text and button fills. Royal Blue itself is
  4.41:1 on white, under the 4.5:1 minimum, and lower on a tinted panel.
- `--brand-pink-700` `#a83e7f` for small text. Hot Pink is 3.64:1 on white,
  fine for large display type, well under the minimum for labels.

Each is the lightest shade that still clears 4.5:1 against **every** panel
colour on the site, not just against white. Both official values stay in use
unchanged for fills, borders, focus rings and large display type.

## The logo

`src/assets/img/brand/logo-horizontal.webp` is the client's approved artwork.
Do not redraw, recolour, stretch, crop or add effects to it. Size and placement
are free.

The favicons and the Apple touch icon derive from its sneakers mark, which is
the "simplified logo for small digital spaces" the brand standards call for.
The lettering is unreadable below about 64px, which is why it is left off those
sizes. The Apple touch icon is flattened on white because iOS composites a
transparent one on black.

## Header layout constraint

The header's inner row is capped at the page content width so it stays aligned
with everything below it. Widening the browser past that point adds no room.
Logo width and navigation width therefore compete directly, and the row holds
the logo, six links, a call to action and the language switch.

Spanish is the binding case: its nav labels run about 40px longer than the
English ones. The collapse breakpoint sits at 75rem because that is where the
Spanish row fits. If the logo grows, something else in that row has to give.

## Security

A strict Content Security Policy is enforced in `netlify.toml`:

```
default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:;
font-src 'self'; connect-src 'self'; frame-src https://www.google.com;
form-action 'self'; frame-ancestors 'none'; base-uri 'self'; object-src 'none';
upgrade-insecure-requests
```

That means no inline `<style>`, no `style=""` attributes, no inline event
handlers, no external CDN for anything, and none of `innerHTML`, `outerHTML`,
`insertAdjacentHTML`, `document.write` or `eval`. The single exception is the
Google Maps iframe.

For dynamic styling, set custom properties with `style.setProperty` or toggle
classes. Never build a style string.

Fonts are self-hosted from `@fontsource-variable` npm packages so `font-src
'self'` holds. Do not switch to a font CDN.

Staging safety: `_data/env.js` reads Netlify's deploy context. Indexing stays
off unless `ALLOW_INDEXING=true`, so preview deploys cannot be indexed.

## Accessibility

The floor is WCAG 2.1 AA and the site currently meets it with zero failures.

Verify contrast against the **real rendered background**, by walking the DOM and
resolving the effective background colour up the ancestor chain. Checking
against white is how a palette ships with text that fails on a tinted panel. An
audit done that way once reported clean; a proper one immediately found 17
failures, all of them text sitting on tinted sections.

Also required: `prefers-reduced-motion` honoured (the `--transition` token
already collapses to `0ms` under it), visible focus on everything interactive,
full keyboard navigation, real semantic elements, and alt text on every image.
`html-validate` rejects `role="list"` on a `div`, so use real `ul` and `li`.

## Images

Images acquired or processed outside this repo can arrive carrying embedded
C2PA content credentials, roughly 5.8KB per file. These must not ship. Check:

```
strings -n 5 <file> | grep -i 'c2pa\|contentauth'
```

Strip by chunk surgery rather than re-encoding, so the artwork is unchanged:
remove `caBX` chunks from PNG, `C2PA` chunks from WebP, and `APP11` segments
from JPEG. Re-encoding would degrade the client's approved artwork.

## Working rules

The repo carries no tooling attribution of any kind: not in commit messages,
code comments, file contents or metadata.

Pushes are done by hand from GitHub Desktop. Every push needs a summary title
and a description of what changed.

`CONTENT-STATUS.md` tracks items still awaiting client input. Do not invent
content to fill them and do not delete the file.

The working copy lives inside OneDrive. Syncing a git repo occasionally locks
files mid-write or restores a stale copy, so a build that seems to ignore a
change is worth checking there first. The browser cache is the other usual
suspect: a stale stylesheet shows the old design with unstyled images at their
raw file width.

## Definition of done

1. `npm run check` passes: build, `html-validate`, link check.
2. Zero contrast failures across all 19 built pages, both languages.
3. No wrapped navigation at any viewport width. Test Spanish specifically.
4. Screenshot the result and look at it. The last three real bugs, a dark
   button on a dark background, a trailing comma and a logo that would not
   scale, were all invisible in the source and obvious in a screenshot.
