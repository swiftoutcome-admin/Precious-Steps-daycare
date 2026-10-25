# Content status

Tracks every open content question for the Precious Steps website. The site
must not launch while a **Blocking** item is open.

Sources referenced:
- **Q** = client questionnaire (Daycare Website Questionnaire, Revised 2)
- **PH** = Precious Steps Preschool Parent Handbook
- **ITH** = Precious Steps Infant Toddler Parent Handbook

Status key: `OPEN` / `ANSWERED` / `PUBLISHED`

---

## Blocking: conflicts between source documents

| # | Item | Conflict | Where it lives | Status |
| --- | --- | --- | --- | --- |
| 1 | Which programs run at which building | PH lists Washington as infant/toddler plus district preschool and Arlington as district preschool only. ITH places the whole infant/toddler department at Washington. Titles disagree on who directs what. | `site.json` → `locations[].programs` | OPEN |
| 2 | Arlington street address | Q says 522 Arlington Avenue. PH says 516-522 Arlington Avenue. | `site.json` → `locations[1].street` | OPEN |
| 3 | Infant and toddler age ranges | Q says infants 6 weeks to 18 months, toddlers 19 months to 2.5 years. ITH says infants 4 weeks to 24 months, toddlers 24 to 36 months. | `programs.json` → `ages` | OPEN |
| 4 | Arlington hours and wrap-around | Q says 8:30 to 3:00. PH describes wrap-around 7:30 to 8:30 and 3:00 to 5:30. Publishing the narrow hours will lose working parents. | `site.json` → `locations[1].hours` | OPEN |
| 5 | Operating calendar per program | ITH says the centre operates twelve months a year. PH says preschool runs September through June. | `site.json` → `locations[].calendar` | OPEN |
| 6 | Washington phone number | Q has a typo, `908755.5005`. PH confirms 908-755-5005. Needs explicit confirmation. | `site.json` → `locations[0].phone` | OPEN |
| 7 | Legal entity name | Appears as both "Precious Steps Child Care & Development Center, Inc." and "...Development Inc." | `site.json` → `legalName` | OPEN |

## Blocking: missing content

| # | Item | Note | Status |
| --- | --- | --- | --- |
| 8 | "Room to Bloom" description | Appears only in Q. Described in neither handbook. | OPEN |
| 9 | "After 3 Program" description | Appears only in Q. Described in neither handbook. | OPEN |
| 10 | Onsite contact per location | Who a parent should ask for at each site. | OPEN |
| 11 | Domain name | Client has none. Recommend registering in the centre's name, with the client as owner. | OPEN |
| 12 | Final logo and palette | Rebrand in progress. Client described current colours only as "pink and blue". Placeholder wordmark is in `src/assets/img/brand/logo.svg`. | OPEN |

## Blocking: legal and compliance

| # | Item | Note | Status |
| --- | --- | --- | --- |
| 13 | Photo releases | Every child whose face appears needs a signed publicity release on file. Client must confirm clearance **in writing** before any photo publishes. Log each one in `docs/photo-release-log.md`. | OPEN |
| 14 | NAEYC accreditation currency | Confirm accreditation is active, with expiry date, and obtain a permitted logo asset before any badge publishes. A lapsed badge is a real problem for the client. | OPEN |
| 15 | Privacy notice accuracy | Draft at `src/privacy.njk` is written to match actual site behaviour. Client must read and confirm. | OPEN |
| 16 | Enrollment packet must not be published | Supplied PDF is a poor scan containing health history forms covering pregnancy, seizures, lead exposure and medications. Do not upload. If a download is needed, produce a clean retyped application page only. | DECIDED: do not publish |

## Non-blocking

| # | Item | Note | Status |
| --- | --- | --- | --- |
| 17 | Photography | Elena is shooting new photos. Gallery is built to accept them without layout changes. No launch dependency. | OPEN |
| 18 | Staff bios and photos | Client to forward. Decide whether to publish individual bios or a general team description. | OPEN |
| 19 | Social links | Client rebranding; Facebook, Instagram and Google profiles being updated. | OPEN |
| 20 | Testimonials | Client will approach parents. Needs written permission to publish each one. | OPEN |
| 21 | Announcements ownership | Decide whether the client self-edits (needs a CMS layer and a short training session) or emails changes in (needs a maintenance retainer). | OPEN |
| 22 | Spanish version | Enrollment paperwork is bilingual and Plainfield has a large Spanish-speaking population. Phase 2 candidate. Contact page currently carries a Spanish note only. | OPEN |
| 23 | Registration fee | ITH states $100. Confirm current amount and whether to publish it. | OPEN |
| 24 | Current openings | Q says contact for availability. Confirm whether to show a live status. | OPEN |

## Flagged back to the client as a courtesy

| # | Item | Note |
| --- | --- | --- |
| 25 | Late pickup policy contradicts itself in PH | Page 7 says a five minute grace period then $1 per minute. Page 15 says the first late pickup is a courtesy and charging begins with the second. Client is revising the handbook anyway. Not a website issue. |
