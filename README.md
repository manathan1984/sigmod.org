# sigmod.org

Static site for ACM SIGMOD and ACM PODS, migrated from WordPress with all URLs preserved.

```bash
npm install
npm run serve     # http://localhost:8080
npm run build     # static site in _site/
```

**Updating the site** (news, conferences, awards): see [docs/UPDATING.md](docs/UPDATING.md).

See [docs/MIGRATION.md](docs/MIGRATION.md) for the content audit, proposed structure and hosting plan, and [docs/CLEANUP.md](docs/CLEANUP.md) for the running list of pages to merge or retire.

## To do

- [ ] **A competition for a new SIGMOD logo.** The site still uses the 1998 logo; candidate designs so far are in [sigmod-org/sigmod-logo](https://github.com/sigmod-org/sigmod-logo).
- [ ] **Rethink the SIGMOD mission statement.** Today it is told as history on [SIGMOD's Mission](https://www.sigmod.org/sigmod-history/sigmods-mission/) (`src/content/pages/sigmod-history/sigmods-mission/index.md`); a current statement could also open the [About SIGMOD](https://www.sigmod.org/about-sigmod/) page.
