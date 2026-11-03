# sigmod.org: migration from WordPress to a static site

Status: prototype. All content is imported and every old URL builds.

## How to run it

```bash
npm install
npm run serve        # http://localhost:8080
npm run build        # static site in _site/
```

`npm run import` re-generates `src/content/` from the WordPress REST API.
Downloads are cached in `migration/cache/`; pass `--refresh` to re-download.

The site uses the design that was called C (Refined) during the review: modern
sans text with serif headlines, a light hero band, three feature tiles and a
news list. The other alternatives (Classic, Bold, Light modern) were dropped.
Logo candidates are kept in a separate site and repository,
[sigmod-org/sigmod-logo](https://github.com/sigmod-org/sigmod-logo).

The menu bar (`src/_data/nav.js`):

| Menu | Contents |
|---|---|
| About | What is SIGMOD?, Membership, Committees, Chapters, Policies, ACM Open |
| Conferences | SIGMOD/PODS conferences, sponsored meetings, in-cooperation events, Reproducibility |
| Awards | Current awards and Distinguished AEs & PCs |
| PODS | Grouped: About, Awards, Program, Proceedings (unchanged from the old site) |
| Publications | PACMMOD, SIGMOD Record, SIGMOD Blog |
| History | History, Mission, Logo history, Program chairs, SIGMOD Online, Archive; Past awards: Special Service, Student Research Competition & Undergraduate Scholarship |

"Join SIGMOD" is a button at the right of the menu bar and leads to `/join/`.
Partner logos sit above a shared black footer with the volunteer note and the
ACM logo.

Pages edited by hand after the import carry `edited: true` in their front
matter, and `npm run import` leaves them alone.

PODS pages (`/pods-home/…`) switch to the PODS colour automatically
(`section: pods` in the page front matter).

## What is on the current site

The WordPress REST API exposes 291 pages and 66 posts. The theme also serves
category and author archives. The main areas are:

| Area | Pages | Notes |
|---|---|---|
| Awards | 147 | Spread over 3 places, see below |
| Publications | 80 | 66 are "Distinguished Profiles" stubs that only link to a `.flv` video |
| Conferences | 31 | 26 are per-year pages for 1974–2001 |
| About / policies / history | 17 | |
| PODS | 13 | Already well organised under `/pods-home/` |
| Membership | 3 | |
| News posts | 66 | Last 5 years: ~1–3 per year |

142 of the 357 items have not been edited since 2016.

### Duplication

The running list of what to merge, redirect or retire is in
[CLEANUP.md](CLEANUP.md). A summary:

1. **Award announcements exist up to three times**: as a news post, as a page in
   `/sigmod-awards/people/` or `/sigmod-awards/citations/`, and as a row in
   the award's overview table. 27 posts and pages are word-for-word copies. The
   importer turns those into redirects to one canonical page; the list is in
   `migration/duplicates.json`.
2. **No consistent home for award pages.** There are 61 under
   `/sigmod-awards/people/`, 38 under `/sigmod-awards/citations/`, and 29 at
   the site root (everything since 2021, e.g. `/2025-sigmod-systems-award/`).
   One recipient has the same page in two places
   (`/jeffrey-d-ullman-2006-…` and `/sigmod-awards/people/jeffrey-d-ullman-2006/`).
3. **Several pages exist twice.**
   - `/publications/anthology/` and `/publications/anthologyhome/` are 89% the same.
   - `/publications/`, `/publications/publications/` and `/publication-list/` overlap.
   - `/sigmod-awards/sigmod-awards-acm-sigmod-official-website/` (a 20 KB old
     overview) overlaps `/sigmod-awards/` and the per-award pages.
   - There are two dissertation-process pages (`2017-doctoral-dissertation-award`
     and `the-sigmod-jim-gray-doctoral-dissertation-award`) plus a separate
     call page.
   - Two position-on-racism pages. These turned out to be different
     statements, so both stay and are grouped under Policies.
   - `-2` slugs: `2004-…-test-of-time-award-2` and `2006-…-test-of-time-award-2`.
     These are two different winning papers in the same year, not duplicates.
4. **Calls for nominations are copied every year.** The 2016–2022 calls are
   74–92% the same text. A single standing "How to nominate" section on each
   award page would replace them.
5. **Empty or placeholder pages**: `/about-sigmod/sponsorship/`,
   `/sigmod-awards/people/`, `/sigmod-awards/citations/`,
   `/sigmod-awards/committees/`, `/software/pdf/`, `/2061-2/` (untitled), and
   `/sigmod-awards/people/michael-carey-contributions/` ("Information missing!").
6. **PODS information is split** between `/pods-home/…` and SIGMOD news posts
   (`/pods-2020-best-paper-award/`, `/2020-pods-alberto-mendelzon-…`). The
   officer lists for both communities are on `/about-sigmod/`.

### Content outside WordPress (must not be lost)

Pages link to static folders on the same server. These folders are not in the
API, and directory listings are blocked (HTTP 403). The counts are in
`migration/legacy-paths.json`:

| Path | Links | Suggestion |
|---|---|---|
| `/publications/dblp/db/…` | 478 | An old DBLP mirror. Redirect to dblp.org instead of hosting it. |
| `/wp-content/uploads/…` | 414 | Images and PDFs. Copy them into the repo at the same paths. |
| `/publications/interviews/{flv,mp3,pdf,photos}` | ~420 | Profile videos and audio. `.flv` does not play in browsers. Convert to mp4 or point to the ACM DL / YouTube. Large files should not go in the git repo. |
| `/publications/anthology/…` | ~120 | Anthology CD images. |
| `/pods/opentoc/podsYYYY.html` | — | PODS OpenTOC pages. Copy them as-is. |
| `/sigmod-pods-conferences/*.doc,pdf` | 8 | Old PC manual files. |

Someone with server access needs to send a tarball of these folders. They
cannot be crawled.

## Proposed structure

The rule is to **keep every existing URL**. Each page either stays where it is
or becomes a redirect stub (meta refresh plus `rel=canonical`, which works on
GitHub Pages). The site is reorganised through navigation and data, not by
renaming paths.

```
/                      Umbrella home: SIGMOD | PODS | next joint conference | news
├─ SIGMOD space        (blue)
│  ├─ About            /about-sigmod/ (officers, EC), mission, history, logo, policies, DBCares, ACM Open
│  ├─ Conferences      /conferences/ (generated from data), program chairs, sponsored + in-cooperation, distinguished AEs/PCs
│  ├─ Awards           /sigmod-awards/<award>/  ← one page per award, generated from data
│  │                   recipient citation pages stay at their current URLs
│  ├─ Publications     PACMMOD, Record, Blog (external), profiles, video series, anthology, software archive
│  └─ Community        membership, students, chapters, news
├─ PODS space          (own colour + menu), everything under /pods-home/
│  ├─ About            home, hall of fame, organization & PCs, technical section
│  ├─ Awards           best paper, Mendelzon test-of-time
│  ├─ Program          keynotes, tutorials, gems
│  └─ Proceedings      OpenTOC, corrigenda, 30th anniversary
└─ Shared              /conferences/, /news/, /feed.xml
```

The navigation is defined in `src/_data/nav.js`. Every link in it points to an
existing URL.

### Recommended consolidations (next phase)

1. **Awards as data.** Add `src/_data/awards/<award>.yml` with rows of
   `{year, recipients, title, citation_url, image}`. The award overview
   tables, the home-page highlights and the yearly "SIGMOD Awards" news post
   are all generated from it, so editors update one file. Recipient citation
   pages stay at their current URLs.
2. **Conferences as data.** Done in the prototype: `src/_data/conferences.json`
   is parsed from the old table, and the homepages read from it.
   Next, render `/conferences/` from it too. Fold the 26 year pages
   (1974–2001) into it as anchors and turn the pages into redirects.
3. **Officers as data** (`people.yml`). `/about-sigmod/`, the PODS
   organization page and the footer read from it, so there is one place to
   update after elections.
4. **Profiles.** Replace the 66 one-line stubs with one generated gallery
   page. Keep each old URL as a redirect to its anchor.
5. **Merge the duplicate pages listed above.** In each pair, one page keeps
   its URL and the other becomes a redirect.
6. **News stays as posts** at their old root URLs. Keep short announcements
   only. Award details live on the award pages.

## Hosting on GitHub Pages

### Current setup

`.github/workflows/pages.yml` runs on every push to `main`. It builds the site
with `PATH_PREFIX` set to the Pages base path (`/www.sigmod.org/`), so
Eleventy's base-path plugin rewrites every link, and publishes `_site/` at
https://sigmod-org.github.io/www.sigmod.org/ (repository `sigmod-org/www.sigmod.org`). When `sigmod.org` points to Pages, the
prefix becomes `/` and nothing else changes.

### Production

- Build with Eleventy in a GitHub Action and deploy to Pages. Point
  `sigmod.org` to it with a `CNAME`.
- WordPress-generated URLs that need stubs or redirects: `/feed/` (done),
  `/category/…`, `/author/…`, `/page/N/`, and `/wp-sitemap*.xml`.
- GitHub Pages cannot do server-side 301s. Meta-refresh stubs with canonical
  links are the standard workaround. If true 301s matter, put Cloudflare in
  front.
- Subdomains (`2027.sigmod.org`, `wp.sigmod.org`, `reproducibility.sigmod.org`)
  are separate DNS records and are not affected.
- Keep large media (interviews, video) out of git: use Git LFS or an external
  host.

## Repository layout

```
src/content/pages/**/index.md   one file per WP page (permalink = old URL)
src/content/news/*.md           WP posts
src/_data/                      site, nav (IA), conferences
src/_includes/                  layouts (base, home, page) and shared partials
src/assets/                     site.css, content.css, footer.css
scripts/import-wp.mjs           WordPress → Markdown importer
migration/                      url-inventory.tsv, duplicates.json, legacy-paths.json
```
