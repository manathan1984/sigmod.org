# Content cleanup list

This is the running list of pages that are duplicated, overlapping, empty or
outdated. Update the **Status** column as decisions are made.

Rules:

- **Never break a URL.** "Remove" means the page becomes a redirect stub
  (`redirect_to:` in its front matter) pointing to the page that replaces it.
  Delete a page outright only if nothing should replace it. Even then, prefer
  a redirect to the nearest parent page.
- To mark a page as merged, set `redirect_to: /target/` in its
  `src/content/.../index.md` and copy any unique content into the target first.

Statuses: **done** (handled in the repo) · **proposed** (ready, needs a yes) ·
**decide** (needs a decision from the EC or editors) · **keep**.

---

## 1. Exact duplicates (automatic redirects)

The importer finds these itself (≥94% identical text) and turns the copy into
a redirect. They are re-detected on every `npm run import`. The current list is
in `migration/duplicates.json`.

The posts below are still listed on `/news/`, but their links go to the
canonical page.

| # | Duplicate (redirects) | Canonical (kept) |
|---|---|---|
| 1 | `/message-from-the-acm-sigmod-chair/` (post) | `/message-from-the-acm-sigmod-chair/` (page with same URL) |
| 2 | `/jeffrey-d-ullman-2006-sigmod-edgar-f-codd-innovations-award/` (page) | `/sigmod-awards/people/jeffrey-d-ullman-2006/` |
| 3 | `/2021-sigmod-jim-gray-doctoral-dissertation-award/` (post) | `/sigmod-awards/citations/2021-sigmod-jim-gray-doctoral-dissertation-award/` |
| 4 | `/2020-sigmod-contributions-award/` (post) | `/sigmod-awards/citations/2020-sigmod-contributions-award/` |
| 5 | `/2020-sigmod-edgar-f-codd-innovations-award/` (post) | `/sigmod-awards/people/beng-chin-ooi-2020-sigmod-edgar-f-codd-innovations-award/` |
| 6 | `/2020-sigmod-systems-award/` (post) | `/sigmod-awards/citations/2020-sigmod-systems-award/` |
| 7 | `/2020-test-of-time-award/` (post) | `/sigmod-awards/citations/2020-sigmod-test-of-time-award/` |
| 8 | `/2020-sigmod-jim-gray-doctoral-dissertation-award/` (post) | `/sigmod-awards/citations/2020-sigmod-jim-gray-doctoral-dissertation-award/` |
| 9 | `/2019-sigmod-edgar-f-codd-innovations-award/` (post) | `/sigmod-awards/people/anastasia-ailamaki-2019-sigmod-edgar-f-codd-innovations-award/` |
| 10 | `/2019-sigmod-jim-gray-doctoral-dissertation-award/` (post) | `/sigmod-awards/citations/2019-sigmod-jim-gray-doctoral-dissertation-award/` |
| 11 | `/2018-sigmod-edgar-f-codd-innovations-award/` (post) | `/sigmod-awards/people/raghu-ramakrishnan-2018-sigmod-edgar-f-codd-innovations-award/` |
| 12 | `/2018-sigmod-jim-gray-doctoral-dissertation-award/` (post) | `/sigmod-awards/citations/2018-sigmod-jim-gray-doctoral-dissertation-award/` |
| 13 | `/michael-cahill-uwe-rohm-and-alan-fekete-receive-the-2018-sigmod-test-of-time-award/` (post) | `/sigmod-awards/citations/2018-sigmod-test-of-time-award/` |
| 14 | `/z-meral-ozsoyoglu-is-awarded-the-2018-sigmod-contributions-award/` (post) | `/sigmod-awards/people/z-meral-ozsoyoglu-2018-sigmod-contributions-award/` |
| 15 | `/2017-reproducibility-award/` (post) | `/sigmod-awards/citations/2017-sigmod-most-reproducible-paper-award-winners/` |
| 16 | `/magdalena-balazinska-…-receive-the-2017-sigmod-test-of-time-award/` (post) | `/sigmod-awards/citations/2017-sigmod-test-of-time-award/` |
| 17 | `/professor-goetz-graefe-receives-the-2017-sigmod-edgar-f-codd-innovations-award/` (post) | `/sigmod-awards/people/goetz-graefe-2017-sigmod-edgar-f-codd-innovations-award/` |
| 18 | `/yannis-e-ioannidis-is-awarded-the-2017-sigmod-contributions-award/` (post) | `/sigmod-awards/people/yannis-e-ioannidis-2017-sigmod-contributions-award/` |
| 19 | `/the-2017-sigmod-jim-gray-doctoral-dissertation-award-is-awarded-to-peter-bailis/` (post) | `/sigmod-awards/citations/2017-sigmod-jim-gray-doctoral-dissertation-award/` |
| 20 | `/professor-martin-kersten-receives-the-2016-sigmod-systems-award/` (post) | `/sigmod-awards/people/martin-kersten-2016-sigmod-systems-award/` |
| 21 | `/peter-buneman-adriane-chapman-james-cheney-receive-the-2016-sigmod-test-of-time-award/` (post) | `/sigmod-awards/citations/2016-sigmod-test-of-time-award/` |
| 22 | `/professor-samuel-madden-receives-the-2016-sigmod-contributions-award/` (post) | `/sigmod-awards/people/samuel-madden-2016-sigmod-contributions-award/` |
| 23 | `/professor-gerhard-weikum-receives-the-2016-sigmod-edgar-f-codd-innovations-award/` (post) | `/sigmod-awards/people/gerhard-weikum-2016-sigmod-edgar-f-codd-innovations-award/` |
| 24 | `/the-2016-sigmod-jim-gray-doctoral-dissertation-award-is-awarded-to-paris-koutris/` (post) | `/sigmod-awards/citations/2016-sigmod-jim-gray-doctoral-dissertation-award/` |
| 25 | `/lei-chen-m-tamer-ozsu-vincent-oria-win-the-2015-sigmod-test-of-time-award/` (post) | `/sigmod-awards/citations/2015-sigmod-test-of-time-award/` |
| 26 | `/michael-stonebraker-and-lawrence-rowe-receive-the-inagural-2015-sigmod-systems-award/` (post) | `/sigmod-awards/people/2015-sigmod-systems-award/` |
| 27 | `/dr-laura-haas-is-the-recipient-of-the-2015-sigmod-edgar-f-codd-innovation-award/` (post) | `/sigmod-awards/people/laura-haas/` |

Status: **done**. Spot-check a few before going live.

## 2. Near-duplicates to merge (manual)

These pages overlap heavily, but each has some unique text. Merge the content
into the kept page by hand, then redirect the other one.

| Pages | What's going on | Proposal | Status |
|---|---|---|---|
| `/publications/anthology/` · `/publications/anthologyhome/` | 89% the same text. `anthologyhome` was edited later (2019). | Keep `/publications/anthology/` and fold in the 2019 edits. Redirect `anthologyhome`. | proposed |
| `/publications/` · `/publications/publications/` · `/publication-list/` | Three "Publications" pages. `/publications/` has dead `portal.acm.org` links. `/publication-list/` is the current short list. `/publications/publications/` is what the menu links to. | Keep `/publications/publications/` as the hub and merge the `/publication-list/` items into it. Redirect the other two. | proposed |
| `/publications/` · `/archive/` | Both list the old archives (DiSC, Anthology, software). | Make `/archive/` an "Archive" section on the publications hub, then redirect it. | decide |
| `/sigmod-awards/` · `/sigmod-awards/sigmod-awards-acm-sigmod-official-website/` | The second page is a 20 KB old all-awards overview, copied from the pre-2015 site. Its relative links are broken. | Removed entirely (no redirect). Listed in `migration/removed.json` so the importer does not bring it back. | done |
| `/sigmod-awards/sigmod-jim-gray-doctoral-dissertation-award/` · `/sigmod-awards/doctoral-dissertation-award/` · `/sigmod-awards/2017-doctoral-dissertation-award/` · `/sigmod-awards/the-sigmod-jim-gray-doctoral-dissertation-award/` | 4 pages: the award page, the current call, and process descriptions from 2015 and 2017 (59–75% the same). | One award page with sections for "How to nominate" and "Process". Redirect the 2015 and 2017 process pages. Keep the call as a section or a stub. | proposed |
| `/sigmod-awards/sigmod-undergraduate-award/` | 82% of its text is also in the old overview page above. Last edited 2017. | Merged with the Student Research Competition into `/sigmod-history/past-awards/student-research-and-undergraduate/` under History › Past awards; both old URLs redirect there. | done |
| `/sigmod-awards/people/jeffrey-d-ullman-2006/` · `/sigmod-awards/people/jeffrey-ullman/` | One person, two awards (2006 Innovations, 1996 Contributions). Not a duplicate. | Keep both. Listed here only because of a past mix-up (see §1 #2). | keep |
| `/sigmod-awards/people/laura-haas/` · `/laura-haas-contributions/` · `/michael-carey/` · `/michael-carey-contributions/` · `/surajit-chaudhuri/` · `/surajit-chaudhuri-innovations/` | Recipients of two awards each. Slugs are inconsistent. | Keep. Future pages follow one slug pattern (§4). `/michael-carey-contributions/` says "Information missing!", so fill it in or redirect it to the Contributions award page. | decide |
| `/sigmod-awards/citations/2004-…-test-of-time-award` · `…-2` (also 2006 and `…-2`) | Two different winning papers in the same year. Not duplicates, but the `-2` slugs are WordPress artifacts. | Keep the URLs. On the Test-of-Time page, list both papers under the year. | keep |
| `/sigmods-position-on-racism/` · `/sigmod-executive-committee-position-on-racism/` | Two different statements (the 2020 joint statement, and the EC position with DBCares). | Keep both, but group them under Policies with a short intro. | proposed |
| `/call-for-nominations-2022-acm-sigmod-awards/` (page) and calls 2016–2021 (posts) | 74–92% the same text every year. | One standing "Nominate" section on each award page. Keep the old calls as news, but make the page a redirect to `/sigmod-awards/`. | proposed |
| `/2025-sigmod-awards/`, `/2024-…`, `/2023-…`, `/2022-sigmod-awards/` (posts) vs the per-award tables | Each yearly post repeats rows that are also in every award table. | Generate the yearly summary from award data. Keep the posts as short news items that link to the award pages. | decide |

## 3. Empty, placeholder or broken pages

| Page | Content | Proposal | Status |
|---|---|---|---|
| `/2061-2/` | Untitled. Only leftover page-builder shortcodes (`[vc_row]…`). | Redirect to `/`. | proposed |
| `/about-sigmod/sponsorship/` | Empty parent page. | Redirect to `/about-sigmod/sponsorship/sponsorship-of-meetings/`. | proposed |
| `/sigmod-awards/people/` | Empty parent page. | Redirect to `/sigmod-awards/`. | proposed |
| `/sigmod-awards/citations/` | Empty parent page. | Redirect to `/sigmod-awards/`. | proposed |
| `/sigmod-awards/committees/` | Empty parent page. | Redirect to `/sigmod-awards/committees/sigmod-awards-committee/`. | proposed |
| `/software/pdf/` · `/software/pdf/sigmod-freedb-letter-pdf/` | Empty parent page, and an attachment page for a 6 KB PDF. | Removed with the rest of `/software/`. | done |
| `/sigmod-awards/people/michael-carey-contributions/` | "Information missing!" | Fill in the citation or redirect it (see §2). | decide |
| `/sigmod-history/sigmod-logo-history/` | One image and one sentence. | Merge into `/about-sigmod/sigmod-logo-renderings/` as a "History" section, then redirect. | proposed |
| `/sigmod-awards/committees/systems-awards-committee/` | Last edited in 2019. The Systems Award is now chosen by the SIGMOD Awards Committee, as the award page says. | Redirect to the SIGMOD Awards Committee page. | decide |

## 4. Award pages with no consistent home

The 147 award pages are spread over:

- `/sigmod-awards/people/<name>[-year-award]/` (61, 2015–2020)
- `/sigmod-awards/citations/<year>-<award>/` (38, 2003–2021)
- the site root, e.g. `/2025-sigmod-systems-award/`,
  `/sigmod-2026-test-of-time-award/`, `/carlo-zaniolo-2025-…/` (29, 2021 onward)

Proposal (**decide**):

- Keep all existing URLs.
- From now on, put new recipient pages at
  `/sigmod-awards/<award>/<year>/` (e.g.
  `/sigmod-awards/sigmod-systems-award/2027/`). Generate them from
  `src/_data/awards/*.yml`, so that the award table, the citation page and the
  yearly news summary all come from one entry.
- Optionally, add new canonical addresses for the 29 root-level pages and turn
  the old addresses into redirects. This is only worth doing once the award
  data files exist.

## 5. Outdated content to archive or retire

| Pages | Notes | Proposal | Status |
|---|---|---|---|
| `/publications/interview/*` (66 stubs) + `/publications/interview/` | Each stub has one link to a Flash video (`.flv`) on the old server. Browsers no longer play these. | One gallery page with photo, name, year, and links to the transcript PDF and audio. Each old URL redirects to its anchor on that page. Convert the videos to mp4 or link to ACM DL copies. | decide |
| `/conferences/sigmod-1974/` … `/sigmod-2001/` (26) | Per-year proceedings pages. Mostly links to the DBLP mirror. | Keep them for now, linked from `/conferences/`. Later, point their links to dblp.org instead of the local mirror. | keep |
| `/software/`, `/software/commerical/`, `/software/nonprofit/`, `/software/index-of-publically-available-database-software/` | Software lists from 2015, no longer maintained. | Removed entirely (listed in `migration/removed.json`). `/freepublic-domain-software/` and the freedb letter PDF were removed too. | done |
| `/publications/sigmod-digital-symposium-collection/` | DiSC, ended 2011. | Archive section. | keep |
| `/sigmod-history/sigmod-online/` | History of the website. | Keep under History. | keep |
| `/pods-home/pods-30th-anniversary-statistics/` | Last edited 2015. | Merge into `/pods-home/pods-30th-anniversary/`, then redirect. Ask the PODS EC. | decide |
| `/membership/` | Last edited 2018. Fees and links may be stale. | Review with ACM. | decide |

## 6. Content kept in two places (risk of inconsistency)

These are not duplicate pages, but the same facts are typed into several
places. Move each into one data file.

| Fact | Where it appears | Data file |
|---|---|---|
| Officers, EC, advisory boards (SIGMOD and PODS) | `/about-sigmod/`, `/pods-home/pods-organization/`, news posts about new officers | `src/_data/people.yml` |
| Conference list | `/conferences/`, home page, PODS organization table | `src/_data/conferences.json` (exists) |
| Award winners | per-award tables, recipient pages, yearly award posts, home page | `src/_data/awards/*.yml` |
| PODS awards | `/pods-home/pods-best-paper-awards/`, `/pods-home/acm-pods-alberto-o-mendelzon-test-of-time-award/`, SIGMOD news posts (`/pods-2020-best-paper-award/`, `/2020-pods-alberto-mendelzon-test-of-time-award/`) | `src/_data/awards/pods-*.yml` |
