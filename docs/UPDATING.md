# Updating sigmod.org

Short guide for volunteers. Covers the three recurring updates: **news**,
**a new conference**, and **awards**.

## How changes go live

1. Edit the files on GitHub (the pencil icon, then *Commit changes*) or locally.
2. Every push to `main` rebuilds and publishes the site in about a minute
   (*Actions* tab → "Publish on GitHub Pages").
3. To check before pushing: `npm install` once, then `npm run serve` and
   open http://localhost:8080.

Rules that apply everywhere:

- **Never change an existing `permalink`.** Old URLs must keep working. To
  retire a page, add `redirect_to: "/new/url/"` to its front matter instead of
  deleting it.
- Add `edited: true` to the front matter of any page you edit by hand.
  (It stops the WordPress importer from overwriting it; once WordPress is
  switched off this no longer matters.)
- Images and PDFs go in `src/static/assets/uploads/<year>/` and are linked as
  `/assets/uploads/<year>/<file>`.
- Pages are Markdown. HTML tables are fine where a page already uses them.

## News

**When:** awards announced, calls for nominations, election results and new
officers, a tribute, or anything the community should hear about. Keep it
short and link to the page that has the details.

**How:** add a file `src/content/news/<year>-<short-name>.md`:

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

The 2027 SIGMOD Awards Committee is happy to announce ...
```

- `tags: ["news"]` is what puts it on the home page, `/news/` and the feed.
- `date` controls the order. Use the announcement date.
- Use `section: "pods"` for PODS news (it gets the PODS colour).

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
3. Optional: a news post announcing the venue.
4. Once the proceedings are in the ACM Digital Library, nothing else is needed.
   The Publications menu links to the full proceedings list.

Co-sponsored conferences (KDD, WSDM, SoCC, DEBS) are listed in
`src/content/pages/conferences/co-sponsored-conferences/index.md`. Update it
only when a sponsorship agreement changes.

## Awards

**When:** after the awards committee announces the recipients (typically in
spring, before the conference). Calls for nominations are news posts.

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
3. **One news post** for the year's awards (see News above), listing every
   award with a link to its page. Don't repeat the full citations there.
4. **Committees:** if the committee changed, update
   `src/content/pages/about-sigmod/committees/index.md` and the award
   committee's history page under `src/content/pages/sigmod-awards/committees/`.

PODS awards (Best Paper, Alberto O. Mendelzon Test-of-Time) live under
`src/content/pages/pods-home/`. Update them the same way.

A new award, or a retired one, also needs its menu entry in `src/_data/nav.js`:
"Awards & Honors" for current awards, "History › Past awards" for retired ones.

## Other things that change periodically

| What | When | Where |
|---|---|---|
| Officers | Every four years, after the elections | `src/content/pages/about-sigmod/index.md` |
| Executive committee, boards, editors | When members change | `src/content/pages/about-sigmod/committees/index.md` |
| Program chairs | Each new conference | `src/content/pages/sigmod-history/program-chair/index.md` |
| PODS organisation and PCs | When members change | `src/content/pages/pods-home/pods-organization/index.md` |
| Menus | When a page is added or retired | `src/_data/nav.js` |
| Volunteer note, partners | Rarely | `src/_data/site.js` |
