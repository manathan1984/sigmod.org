# Updating www.sigmod.org

A short guide for volunteers: what needs updating, when, and the smallest
change that does it. Most updates touch one file.

## At a glance

| What | When | Minimal change |
|---|---|---|
| [News item](#news) | When there is something to announce | Add one file in `src/content/news/` |
| [Next SIGMOD/PODS conference](#a-new-sigmodpods-conference) | When the next venue is announced | One entry in `src/_data/conferences.json` + one row in `src/content/pages/conferences/index.md` |
| [Award recipients](#award-recipients) | Each spring, when the awards are announced | One row (or photo) per award page + one news item |
| [Ongoing awards call](#ongoing-awards-call) | When the Awards Chair or the call changes | `src/content/pages/sigmod-awards/ongoing-awards-call/index.md` |
| [Committees and officers](#committees-officers-and-other-people) | When members change; officers every four years | `src/content/pages/about-sigmod/committees/index.md` (and `about-sigmod/index.md` for officers) |
| Membership numbers | Once a year, from ACM's statistics | One sentence in `src/content/pages/membership/index.md` |
| Program chairs | Each conference | One row in `src/content/pages/sigmod-history/program-chair/index.md` |
| PODS organization and PC | When members change | `src/content/pages/pods-home/pods-organization/index.md` |
| Menus | Only when a page is added or retired | `src/_data/nav.js` |
| Partners, volunteer note | Rarely | `src/_data/site.js` |

Not here: the DiSC, Anthology and DBLP DVD copies are in the
[SIGMOD Archive](https://github.com/sigmod-org/archive), and copies of past
conference websites are in [mirror.sigmod.org](https://github.com/sigmod-org/mirror.sigmod.org).
Both are historical and normally need no updates.

## How changes go live

1. Edit the file on GitHub (the pencil icon, then *Commit changes*) or locally.
2. Every push to `main` rebuilds and publishes the site, usually within a
   minute or two (*Actions* tab → "Publish on GitHub Pages").
3. To preview first: `npm install` once, then `npm run serve` and open
   http://localhost:8080.

Tips:

- **Batch small edits.** Each push is a deploy; several commits pushed together
  deploy once.
- **If a deploy fails** with "Timeout reached" in the *deploy* step, the build
  was fine and GitHub's file sync was slow. Re-run only the failed job
  (*Re-run failed jobs* on the run page, or `gh run rerun <id> --failed`), or
  simply push the next change.

## Rules that apply everywhere

- **Never change an existing `permalink`.** Old URLs must keep working. To
  retire a page, add `redirect_to: "/new/url/"` to its front matter instead of
  deleting it.
- Add `edited: true` to the front matter of any page you edit by hand, and set
  `updated: "YYYY-MM-DD"` to the date of the change (it is shown as "Last updated").
- Images and PDFs go in `src/static/assets/uploads/<year>/` and are linked as
  `/assets/uploads/<year>/<file>`. Leave the existing `/wp-content/uploads/`
  files where they are: pages link to them.
- Pages are Markdown. HTML tables are fine where a page already uses them.
- Write e-mail addresses with spaces (`name AT example.org`) so they are not
  harvested.
- Use single, ordinary spaces. Text pasted from Word or the old site often
  carries invisible no-break spaces that show up as double gaps.
- To link to a section of a page, give its heading an id by writing it as HTML:
  `<h2 id="benefits">Benefits …</h2>`, then link to `/page/#benefits`.

## News

**When to post:**

- Award recipients (one item per year, covering all awards).
- A reminder of the awards cut-off, a few weeks before February 1.
- Election results and new officers.
- A new SIGMOD/PODS venue, or a change of venue.
- ACM honors for community members (Fellows, Distinguished Members).
- Tributes, and calls the community should act on (nominations for ACM
  positions, surveys, programs).

Keep it to a few sentences and link to the page that has the details (the award
page, the conference site, ACM's announcement). News is not the place for
content that must stay current: put that on a page and link to it.

**How:** add one file, `src/content/news/<year>-<short-name>.md`:

```markdown
---
title: "2027 SIGMOD Awards"
permalink: "/2027-sigmod-awards/"
section: "sigmod"
area: "news"
date: "2027-05-15"
categories: ["Awards", "News"]
tags: ["news"]
---

The 2027 SIGMOD Awards Committee is happy to announce the recipients of this
year's awards:

- **Edgar F. Codd Innovations Award:** Name (Affiliation)
- ...

See the [SIGMOD Awards](/sigmod-awards/) page for the citations.
```

- `tags: ["news"]` is what lists it. The newest 8 items appear on the home
  page; all of them are on `/news/` and the latest 20 in the feed (`/feed.xml`).
- `date` is the announcement date and sets the order. Do not backdate.
- The `permalink` is the item's address forever: lower case, words joined by
  hyphens, usually the year plus a short name.
- Use `section: "pods"` for PODS news (it gets the PODS colour).
- To withdraw an item, add `redirect_to:` pointing to where the reader should go
  instead of deleting the file.

## A new SIGMOD/PODS conference

**When:** as soon as the next venue and website are announced (usually at or
right after the current conference).

1. **`src/_data/conferences.json`**: add the new year **at the top**. The
   first entry is shown as "Next conference" on the home page.

   ```json
   {
     "name": "SIGMOD/PODS 2028",
     "year": 2028,
     "location": "City, Country",
     "links": [{ "label": "Conference Website", "url": "https://2028.sigmod.org/" }]
   },
   ```

2. **`src/content/pages/conferences/index.md`**: add the same year as the first
   row of the table, copying the row format of the year below it.
3. Optional: a news item announcing the venue.

Once the proceedings are in the ACM Digital Library, nothing else is needed:
the Publications menu links to the full proceedings list.

Co-sponsored conferences (KDD, WSDM, SoCC, DEBS) are listed in
`src/content/pages/conferences/co-sponsored-conferences/index.md`. Update it
only when a sponsorship agreement changes.

## Awards

### Ongoing awards call

Nominations are accepted all year with an annual cut-off of **February 1**
(`/sigmod-awards/ongoing-awards-call/`, in the Awards menu as "Ongoing
Call-for-Awards"). There is no longer a separate call each year. Edit that page
only when:

- the Awards Chair or the recipients of nominations change (the "How to submit"
  e-mail addresses);
- the cut-off date, the carry-over period, or what an award's nomination must
  include changes (the table);
- an award is added or retired.

### Award recipients

**When:** after the Awards Committee announces the recipients (typically in
spring, before the conference).

For each award given this year:

1. **The award's page** (`src/content/pages/sigmod-awards/<award>/index.md`,
   for example `sigmod-systems-award`): add a new first row to the recipients
   table, copying the row below. If there is no award this year, add the year
   with "No award for <year>", as the page already does.
   The Codd Innovations and Contributions pages show photos instead of a
   table: copy the first `<figure>…</figure>` line and change the photo, year,
   name and citation link.
2. **Optional citation page** for the major awards (Innovations,
   Contributions, Systems, Test of Time). Add
   `src/content/pages/<year>-sigmod-<award>-award/index.md` with
   `permalink: "/<year>-sigmod-<award>-award/"`, `section: "sigmod"` and
   `area: "awards"`. Link it from the table row.
3. **One news item** for the year's awards (see [News](#news)), listing every
   award with a link to its page. Don't repeat the full citations there.

PODS awards (Best Paper, Alberto O. Mendelzon Test-of-Time) live under
`src/content/pages/pods-home/`. Update them the same way.

A new award, or a retired one, also needs its menu entry in `src/_data/nav.js`,
a link on the Awards page (`src/content/pages/sigmod-awards/index.md`) in the
matching group (SIG-level, Conference-level, Cross-conference or Retired), and,
if it takes nominations, a row on the ongoing awards call page.

## Committees, officers and other people

| What | When | Where |
|---|---|---|
| Officers | Every four years, after the elections | `src/content/pages/about-sigmod/index.md`; photos in `src/static/assets/officers/` |
| Executive committee, boards, editors | When members change | `src/content/pages/about-sigmod/committees/index.md` |
| SIGMOD Awards Committee | Each year | `about-sigmod/committees/index.md` and a new row on `src/content/pages/sigmod-awards/committees/sigmod-awards-committee/index.md` |
| Awards Chair | When it changes | Also the ongoing awards call page (e-mail addresses) |
| Program chairs | Each new conference | `src/content/pages/sigmod-history/program-chair/index.md` |
| PODS organization and PCs | When members change | `src/content/pages/pods-home/pods-organization/index.md` |
