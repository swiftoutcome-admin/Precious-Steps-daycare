# Redesign brief

A visual redesign of the Precious Steps Child Care Center site. Read
`docs/engineering-guide.md` first. It holds the architecture and the
constraints, and this brief assumes all of them.

## The job in one line

Keep every word of content and the whole brand identity. Replace the visual
design so it feels like a different and better site, not a reskin of the same
blocks.

## What changes

Layout and composition. Typography scale and rhythm. Section structure.
Imagery treatment. Motion. How the two locations, the five programs and the
enrolment path are presented. The order information is revealed in.

## What does not change

**Content.** Every string already exists in `src/_data/i18n/en.json` and
`es.json`, about 53KB of copy across the two. Facts live in `site.json`,
`programs.json`, `faq.json`, `enrollment.json` and `announcements.json`.
Nothing gets cut, nothing gets hardcoded into a template, nothing gets
invented. A new string means a new key in both language files.

**The palette.** The five official brand colours and the two deepened
text-safe variants, exactly as the engineering guide sets them out.

**The logo.** The approved artwork, unaltered.

**The bilingual architecture.** Nine pages times two languages, built by
pagination. Spanish is not an afterthought to be bolted on at the end.

**The accessibility floor.** AA, verified against real rendered backgrounds.

## Who this is for

Parents in Plainfield, New Jersey. Many are on a phone. Many are reading at the
end of a long working day. A large share are Spanish-speaking, which is why the
site is fully bilingual rather than machine-translated.

They arrive wanting four things:

1. Is this place safe and are the people good.
2. Which of the two locations is near me and what are its hours.
3. Does it take a child my child's age, and what does the day look like.
4. How do I book a tour or call someone.

Everything else is secondary. A design decision that makes any of those four
slower is the wrong decision, however good it looks. In particular: do not let
the hero push the phone numbers, the locations or the tour button below two
screens of scroll on a phone.

## Motion

Motion should reward attention, not demand it. It must honour
`prefers-reduced-motion`, and under the strict CSP it has to live in CSS
classes and custom properties rather than inline styles. See the security
section of the engineering guide.

Two hard limits. Nothing animates the logo. Nothing delays first paint of the
phone number or the tour call to action.

## Two brand items still open

The redesign is the natural moment to close both.

**The wallpaper tile.** `src/assets/img/brand/pattern-tile.webp` is a warm
peach and sage pattern left over from an earlier palette. It is now the only
off-brand element on the site, visible behind the hero, the accreditation strip
and the footer. Retint its motifs into the brand palette or replace it.

**Typography.** The brand standards specify Fredoka Bold for headings and
Nunito for everything else. The site still runs Fraunces and Nunito Sans. Make
the swap, self-hosted through `@fontsource` so `font-src 'self'` holds:

| Role     | Face              | Size      |
|----------|-------------------|-----------|
| Headings | Fredoka Bold      | 36 - 48px |
| Subheads | Nunito ExtraBold  | 24 - 32px |
| Body     | Nunito Regular    | 16 - 20px |
| Buttons  | Nunito Bold       | 14 - 18px |

Note this is Nunito, not Nunito Sans. Different family.

## Pages

| Page       | Carries                                                  |
|------------|----------------------------------------------------------|
| Home       | hero, trust strip, programs overview, locations, CTA band |
| About      | history since 1998, philosophy, credentials               |
| Programs   | five programs with ages, ratios, curriculum, care options |
| Locations  | two locations, hours, calendars, maps, contacts           |
| Enrollment | the enrolment path, what to bring, fees                   |
| Gallery    | six photographs                                           |
| Contact    | tour request form, phones, email, response time           |
| Privacy    | privacy policy                                            |
| Thank you  | form confirmation                                         |

Plus a 404. Nine content pages, each built in both languages, nineteen HTML
files in total.

## Sequence

Show the design direction on the home page before building it across all nine.
Rejecting a direction on one page is cheap. Rejecting it after nineteen pages
have been rebuilt is not.

## Done

As defined in the engineering guide: `npm run check` green, zero contrast
failures across all nineteen pages in both languages, no wrapped navigation at
any width with Spanish tested specifically, and a screenshot that has actually
been looked at.
