# www.sigmod.org: migration from WordPress, current state and next steps

**Status (November 2026):** the migration is done. www.sigmod.org is a static
Eleventy site on GitHub Pages; the WordPress site is no longer served on
sigmod.org. Every old URL either still works, redirects, or is forwarded (see
[Old addresses](#old-addresses)). What is left is cleanup and improvement:
[CLEANUP.md](CLEANUP.md) lists page-level decisions, and
[Next steps](#next-steps) below lists the larger work.

For day-to-day edits (news, conferences, awards, people) see
[UPDATING.md](UPDATING.md).

## How to run it

```bash
npm install
npm run serve        # http://localhost:8080
npm run build        # static site in _site/
```

## The sites and repositories

| Site | Repository | What it holds | How it is published |
|---|---|---|---|
| https://www.sigmod.org/ (`sigmod.org` redirects here) | [sigmod-org/www.sigmod.org](https://github.com/sigmod-org/www.sigmod.org) | The SIGMOD and PODS site (this repository) | GitHub Actions workflow, custom domain, HTTPS |
| https://sigmod-org.github.io/archive/ | [sigmod-org/archive](https://github.com/sigmod-org/archive) | The SIGMOD Archive: DiSC (1999–2011), the SIGMOD Anthology, the DBLP DVD pages, Distinguished Profiles in Databases | GitHub Actions workflow, served under `/archive/` until it has its own domain |
| https://mirror.sigmod.org/ | [sigmod-org/mirror.sigmod.org](https://github.com/sigmod-org/mirror.sigmod.org) | Copies of past SIGMOD/PODS conference websites | GitHub Pages from the `main` branch, custom domain |
| https://blog.sigmod.org/ | separate | The SIGMOD Blog | separate |
| — | [sigmod-org/sigmod-logo](https://github.com/sigmod-org/sigmod-logo) | Logo candidates | — |

The old WordPress site was moved to www-old.sigmod.org for comparison during the
migration. It is not kept: nothing on the new sites may depend on it.

## The site today

The site uses the design called C (Refined) during the review: a modern sans
for text, serif headlines, a light hero band, three feature tiles and a news
list. "Join SIGMOD" is a button at the right of the menu bar; partner logos sit
above a shared black footer with the volunteer note and the ACM logo. PODS
pages (`/pods-home/…`) switch to the PODS colour (`section: pods`).

Menus (`src/_data/nav.js`):

| Menu | Contents |
|---|---|
| About | About SIGMOD, Membership, Committees, Chapters, Policies, ACM Open |
| Conferences | SIGMOD/PODS conferences, Co-sponsored conferences, Sponsored meetings, In-cooperation events, Reproducibility |
| Awards | All awards, Ongoing Call-for-Awards, then grouped: SIG-level, Conference-level, Cross-conference, Retired |
| PODS | Grouped: About, Awards, Program, Proceedings |
| Publications | PACMMOD, SIGMOD Record, SIGMOD Blog, Conference Proceedings |
| History | History, Mission, Logo history, Conference program chairs, SIGMOD Online, Archive |

Size: 222 page files and 68 news items (298 built pages, 34 of them redirect
stubs), about 60 MB.

Content changes since the import (all by hand, marked `edited: true`):

- Award nominations are continuous with a February 1 cut-off, on
  `/sigmod-awards/ongoing-awards-call/` (replacing the yearly calls).
- The Membership, SIGMOD Online, sponsorship and in-cooperation pages were
  rewritten or brought up to date; the sponsorship page now builds on the
  in-cooperation page instead of repeating it.
- SIGMOD Blog links go to https://blog.sigmod.org/.
- The Anthology, DiSC, DBLP DVD and Distinguished Profiles pages moved to the
  SIGMOD Archive; the pages here redirect there.

## Old addresses

Rules: **never change a permalink**; a page that moves becomes a redirect stub
(`redirect_to:` in its front matter, rendered as a meta refresh plus a
canonical link, which works on GitHub Pages).

| Old address | Now |
|---|---|
| WordPress pages and posts | Same URL on www.sigmod.org (`permalink` = old URL). 27 duplicate award posts redirect to their canonical page (`migration/duplicates.json`). |
| `/feed/` | Redirects to `/feed.xml` |
| `/wp-content/uploads/…` | Copied into `src/static/wp-content/` at the same paths (250 files, all linked from pages). 6 files were already missing on the old server. |
| `/pods/opentoc/podsYYYY.html` | Copied unchanged into `src/static/pods/opentoc/` |
| `/publications/discs/…`, `/publications/anthology/…`, `/publications/dblp/…`, `/publications/interview(s)/…` | In the SIGMOD Archive at the same path. The DiSC, Anthology and Profiles pages here redirect there; any other address under these paths is forwarded by the 404 page (`src/404.njk`). |
| `/publications/pastconf/sigmodYYYY/…` | Forwarded by the 404 page to the same file on mirror.sigmod.org |
| `/2012/`, `/2013/` | Gone; the conferences are at https://2012.sigmod.org/ and https://2013.sigmod.org/ |
| `/publications/interviews/{flv,mp3}/…` (195 links, about 8.4 GB) | **Not online.** The links are kept on the archive's Profiles pages. See [Next steps](#next-steps). |

Files in `src/static/` are copied to the site byte for byte and never rendered
as templates.

## Link health

Current state (after the November 2026 moves): no broken links within
www.sigmod.org; 7 links to old upload images that were already missing; 39
external links broken or not answering, mostly old conference websites,
moved personal pages and the old ACM-hosted WordPress images. About 1,800
external links (dblp.org, the ACM DL, DOIs) cannot be checked by a script
because those sites block automated requests.

To check every link, including external ones:

```
npm run build && node scripts/scan-site-links.mjs && python3 -I scripts/check-external-links.py
npm run old-links -- --check && python3 scripts/old-links-page.py
```

| Script | Writes |
|---|---|
| `scan-site-links.mjs`: every link, image and script on the built site (including `.htm` copies), checked against `_site/` | `docs/site-links.json` |
| `check-external-links.py`: checks the external links (about a minute) | `docs/external-links.json` |
| `old-links-report.mjs` (`npm run old-links`): links to sigmod.org addresses the site does not serve, with a suggested fix; `-- --fix` applies known rewrites | `docs/OLD-SITE-LINKS.md`, `docs/old-site-links.csv` |
| `old-links-page.py`: combines the above into a browsable checklist | `docs/old-site-links.html` |

Links already rewritten during the migration are listed in
`docs/old-site-links-fixed.csv`.

## Hosting

- Each push to `main` builds the site (`.github/workflows/pages.yml`,
  `PATH_PREFIX=/`) and deploys `_site/` to GitHub Pages.
- GitHub caps the deploy step at 10 minutes. If GitHub's file sync is slow and
  the step times out, re-run the failed job (`gh run rerun <id> --failed`); the
  build does not need to run again. Avoid pushing to www and the archive at the
  same time.
- A published Pages site may be at most 1 GB. www.sigmod.org is about 60 MB,
  the archive about 720 MB, the mirror about 600 MB. Large media must stay out
  of git.
- GitHub Pages cannot send server-side 301 redirects; the redirect stubs use a
  meta refresh with a canonical link. If true 301s matter, put Cloudflare in
  front.

## The WordPress importer (retired)

`scripts/import-wp.mjs` (`npm run import`) generated `src/content/` from the
WordPress REST API, caching downloads in `migration/cache/`. It reads from
`https://sigmod.org`, which now serves this site, so it no longer works as is,
and every page edited since has `edited: true`, which the importer skips.
Treat `src/content/` as the source of truth. The import records stay in
`migration/` (`url-inventory.tsv`, `duplicates.json`, `legacy-paths.json`,
`removed.json`).

## Next steps

Roughly in order of value.

1. **Profiles media.** The 66 Distinguished Profiles videos and audio files
   (about 8.4 GB, `.flv` and `.mp3`) are not online. Convert the videos to MP4
   and host them outside git (ACM Digital Library, YouTube, or a storage
   bucket), then update the links on the archive's Profiles pages; or drop the
   links and keep the transcripts.
2. **Content cleanup.** Work through [CLEANUP.md](CLEANUP.md): merge the three
   Publications pages and the Jim Gray dissertation pages, redirect the empty
   parent pages, fill in or redirect the "Information missing!" page.
3. **Broken external links.** Decide case by case (see `docs/old-site-links.html`):
   replace old conference websites with their mirror.sigmod.org copies or
   Wayback copies, update moved personal pages, drop dead ones (pubzone.org).
4. **Awards as data.** Add `src/_data/awards/<award>.yml` with rows of
   `{year, recipients, title, citation_url, image}` and generate the award
   tables, the yearly news summary and the home-page highlights from it, so a
   new award year is one edit. New recipient pages would go under
   `/sigmod-awards/<award>/<year>/`; existing URLs stay.
5. **People as data.** A `src/_data/people.yml` for officers, the executive
   committee and award committees, read by `/about-sigmod/`, the Committees
   page and the PODS organization page, so elections are one edit.
6. **Conferences page from data.** Render `/conferences/` from
   `src/_data/conferences.json` (the home page already reads it) and fold the
   26 year pages (1974–2001) into it as anchors.
7. **A link check in CI.** Run `scan-site-links.mjs` on every push and fail
   the build on broken internal links; run the external check monthly.
8. **The SIGMOD Archive's own domain.** Once DNS is set, serve the archive at
   `archive.sigmod.org` (steps in its README) and update the forwarding in
   `src/404.njk`.
9. **Search.** A static search index (for example Pagefind) over the main site.
10. **Retire www-old.sigmod.org** once the remaining comparisons are done.

Community items tracked in the [README](../README.md): a competition for a new
SIGMOD logo, and a fresh look at the mission statement.

## Repository layout

```
src/content/pages/**/index.md   one file per page (permalink = URL)
src/content/news/*.md           news items (tags: ["news"])
src/_data/                      site.js (title, partners), nav.js (menus), conferences.json
src/_includes/                  layouts (base, home, page) and shared partials
src/assets/                     site.css, content.css, footer.css
src/static/                     files copied as-is (uploads, OpenTOC, logos, favicon)
src/404.njk                     not-found page that forwards moved addresses
scripts/                        link checks and reports (see Link health), the retired importer
migration/                      records from the WordPress import
docs/                           this file, UPDATING.md, CLEANUP.md, link reports
```
