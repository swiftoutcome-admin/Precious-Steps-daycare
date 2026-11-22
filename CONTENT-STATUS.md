# Content status

Tracks every open content question for the Precious Steps website. The site
must not launch while a **Blocking** item is open.

Sources referenced:
- **Q** = client questionnaire (Daycare Website Questionnaire, Revised 2)
- **PH** = Precious Steps Preschool Parent Handbook
- **ITH** = Precious Steps Infant Toddler Parent Handbook
- **A** = client's written answers, 18 Nov 2026
- **BG** = Digital Brand Standards, 2026-2027

Status key: `OPEN` / `ANSWERED` / `APPLIED`

---

## Resolved by the client's answers (18 Nov 2026)

| # | Item | Answer | Status |
| --- | --- | --- | --- |
| 1 | Programs per building | Washington: Infant/Toddler, Room to Bloom, District Pre-K, Before/Aftercare. Arlington: District Pre-K only. Room to Bloom was absent from her November breakdown but named four times in her questionnaire, including as the only programme besides Infant/Toddler offering part-time and drop-in care, so it is published at Washington. | APPLIED |
| 2 | Arlington street address | 522 Arlington Avenue. Client chose the shorter form as friendlier than 516-522. | APPLIED |
| 3 | Phone numbers | Washington 908-755-5005, Arlington 908-222-0029 confirmed. | APPLIED |
| 4 | Ages served | The **handbook** figures are current: infants 4 weeks to 24 months, toddlers 24 to 36 months. The questionnaire figures were stale. | APPLIED |
| 5 | Arlington hours | 8:30 to 3:00 is correct. Arlington has **no** before or after care. The handbook's wrap-around text applies to Washington only. | APPLIED |
| 6 | Calendar | Infant and toddler year round; District Pre-K on the Plainfield Public Schools calendar. Washington carries both, so its calendar line now says so. | APPLIED |
| 8 | Onsite contacts | Washington: Patricia Joroff. Arlington: Doris Valentin. | APPLIED |
| 9 | Web address | The centre already owns **preciousstepschildcarecenter.com**. No registration needed. | APPLIED |
| 12 | Enrollment packet | Confirmed: do not publish. The centre is revamping it. | APPLIED |
| 7 | Legal entity name | 'PS CC&DC' expands to **Precious Steps Child Care & Development Center**. The brand name is used everywhere a parent reads it; the entity appears only in the footer copyright. | APPLIED |
| 25 | Late pickup contradiction in PH | Acknowledged; the client is revising the handbook. | ANSWERED |

## Blocking: still open

| # | Item | Note | Status |
| --- | --- | --- | --- |
| 13 | **Photo releases** | **The client did not answer this.** No photograph showing a child's face can publish without a signed release on file and her written confirmation. This is the single highest-risk open item. | OPEN |
| 14 | **NAEYC accreditation currency** | **The client did not answer this.** The site currently claims NAEYC accreditation since 2006 in the trust strip on every page. Confirm it is active and obtain the permitted logo file, or the claim comes down. | OPEN |
| 27 | **"After 3 Program" public name** | She calls it "Before/Aftercare"; Q called it the "After 3 Program" for ages 3 to 8. The site still shows the Q name. Confirm the public name and whether it covers mornings as well as afternoons. | OPEN |
| 15 | Privacy notice accuracy | Not addressed in her answers. She still needs to read and confirm it. Updated 22 Nov 2026: the map line now names the Locations page only (the homepage no longer embeds a map), the host and the Gmail inbox are named, and a "Changes to this notice" section and last-updated date were added. | OPEN |
| 22 | Spanish review | Still marked UNREVIEWED. Her bilingual staff must check it, the privacy page above all. Hours, calendars and ages are now translated too, so there is more to review than before. | OPEN |
| 36 | **Terms of Use** | New page at /terms/ and /es/terms/, linked from the footer. Plain-language draft covering accuracy of site information, tour requests not reserving a place, not using the form for urgent matters, ownership of photos and content, outside links, limits on liability and New Jersey law. The client should read it and ideally have counsel review it; the Spanish needs the same bilingual review as item 22. | OPEN |

## Awaiting client content (she confirmed she will send)

| # | Item | Status |
| --- | --- | --- |
| 28 | Fuller Room to Bloom and Before/Aftercare descriptions. Room to Bloom currently carries a short summary built only from facts she stated (High Scope, 1:10, full/part time and drop-in). | OPEN |
| 18 | Staff biographies and photographs. She has them but asked to hold. | HOLDING |
| 20 | Parent testimonials, each with written permission to publish | OPEN |
| 16 | Revised Parent Handbook, to link from the enrollment page | OPEN |

## Decisions made, work not yet done

| # | Item | Note | Status |
| --- | --- | --- | --- |
| 21 | **Announcements** | She wants to post them **herself**, with our setup and tech support. That means adding a CMS layer the site does not currently have. This is a scope addition worth pricing. | OPEN |
| 29 | **Brand standards** | BG received 18 Nov. New palette, new typography, new tagline, real logo artwork, social handles. Not yet applied; the site still carries placeholder brand values. | OPEN |
| 30 | **DNS and hosting** | The domain exists but is not yet pointed at Netlify. Need the registrar and access. | OPEN |
| 31 | **Launch indexing** | `ALLOW_INDEXING=true` must be set in the Netlify environment on launch day, or the live site stays invisible to Google. | OPEN |

## Repo hygiene

| # | Item | Note | Status |
| --- | --- | --- | --- |
| 32 | 13MB of source PNGs tracked | `/images/` is in `.gitignore` but the files were committed before that rule landed, so they remain tracked. `git rm --cached` to drop them. | OPEN |
| 33 | CI workflow never landed | `.github/workflows/build-check.yml` was blocked during transfer and never added. Nothing checks builds, HTML, links or CSP on push. | OPEN |
| 34 | Orphaned `blocks-hero.webp` | Superseded image still tracked under `src/assets/img/programs/`. | OPEN |
| 35 | Placeholder images carry embedded provenance metadata | Each shipped image holds a ~5.7KB signed manifest recording how the file was handled, which is why repo copies are larger than the originals. It goes away for good when the placeholder photography is replaced with the centre's own. Tracked under item 17. | OPEN |
