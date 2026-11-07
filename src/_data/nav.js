// Site navigation: one menu bar for SIGMOD; Awards and PODS are grouped menus.
// A menu with `groups` shows them as labelled columns; `children` is always the flat list.
// `align: "left"` opens a grouped dropdown from the menu's left edge (for menus near the left).
// `stack: true` lets each column flow on its own (one empty row between groups in the right column).
// `all` is a link shown above the groups, in the dropdown and the side menu.
const ext = (label, url) => ({ label, url, external: true });
const grouped = (menu) => ({ ...menu, children: menu.groups.flatMap((g) => g.children) });

const about = {
  label: "About", area: "about", url: "/about-sigmod/",
  children: [
    { label: "About SIGMOD", url: "/about-sigmod/" },
    { label: "Membership", url: "/membership/" },
    { label: "Committees", url: "/about-sigmod/committees/" },
    { label: "Chapters", url: "/membership/sigmod-chapters/" },
    { label: "Policies", url: "/sigmod-policies/" },
    { label: "ACM Open", url: "/acm-open-sigmod/" },
  ],
};

const conferences = {
  label: "Conferences", area: "conferences", url: "/conferences/",
  children: [
    { label: "SIGMOD/PODS conferences", url: "/conferences/" },
    { label: "Co-sponsored conferences", url: "/conferences/co-sponsored-conferences/" },
    { label: "Sponsored meetings", url: "/about-sigmod/sponsorship/sponsorship-of-meetings/" },
    { label: "In-cooperation events", url: "/about-sigmod/sponsorship/conferences-symposia-and-workshops-held-in-cooperation-with-sigmod/" },
    ext("Reproducibility", "https://reproducibility.sigmod.org/"),
  ],
};

const awards = grouped({
  label: "Awards", area: "awards", url: "/sigmod-awards/", align: "left", stack: true,
  all: { label: "All awards", url: "/sigmod-awards/" },
  groups: [
    {
      label: "SIG-level",
      children: [
        { label: "Contributions", url: "/sigmod-awards/sigmod-contributions-award/" },
        { label: "Distinguished Mentorship", url: "/hector-garcia-molina-2025-sigmod-distinguished-mentorship-award/" },
        { label: "Edgar F. Codd Innovations", url: "/sigmod-awards/sigmod-edgar-f-codd-innovations-award/" },
        { label: "Jim Gray Dissertation", url: "/sigmod-awards/sigmod-jim-gray-doctoral-dissertation-award/" },
        { label: "Systems", url: "/sigmod-awards/sigmod-systems-award/" },
        { label: "Test of Time", url: "/sigmod-awards/sigmod-test-of-time-award/" },
      ],
    },
    {
      label: "Conference-level",
      children: [
        { label: "Best Paper", url: "/sigmod-awards/sigmod-best-paper-award/" },
        { label: "Best Demonstration", url: "/sigmod-awards/sigmod-best-demonstration-award/" },
        { label: "Best Artifact", url: "/sigmod-awards/sigmod-best-artifact-award/" },
        { label: "Distinguished AEs & PCs", url: "/sigmod-distinguished-aes-and-pcs/" },
      ],
    },
    {
      label: "Cross-conference",
      children: [
        { label: "Research Highlights", url: "/sigmod-awards/sigmod-research-highlights/" },
      ],
    },
    {
      label: "Retired",
      children: [
        { label: "Special Service", url: "/sigmod-special-service-award/" },
        { label: "Student Research", url: "/sigmod-history/past-awards/student-research-and-undergraduate/" },
      ],
    },
  ],
});

const pods = grouped({
  label: "PODS", area: "pods", url: "/pods-home/",
  groups: [
    {
      label: "About", url: "/pods-home/",
      children: [
        { label: "About PODS", url: "/pods-home/" },
        { label: "Hall of Fame", url: "/pods-home/who-are-we/" },
        { label: "Organization", url: "/pods-home/pods-organization/" },
      ],
    },
    {
      label: "Awards", url: "/pods-home/pods-best-paper-awards/",
      children: [
        { label: "Best Paper Awards", url: "/pods-home/pods-best-paper-awards/" },
        { label: "Test-of-Time Award", url: "/pods-home/acm-pods-alberto-o-mendelzon-test-of-time-award/" },
      ],
    },
    {
      label: "Program", url: "/pods-home/pods-keynote-speakers/",
      children: [
        { label: "Keynote Speakers", url: "/pods-home/pods-keynote-speakers/" },
        { label: "Tutorials", url: "/pods-home/pods-tutorials/" },
        { label: "Gems of PODS", url: "/pods-home/gems-of-pods/" },
      ],
    },
    {
      label: "Proceedings", url: "/pods-home/opentocs/",
      children: [
        { label: "OpenTOC", url: "/pods-home/opentocs/" },
        { label: "Corrigenda", url: "/pods-home/pods-corrigenda/" },
        { label: "30th Anniversary", url: "/pods-home/pods-30th-anniversary/" },
      ],
    },
  ],
});

const publications = {
  label: "Publications", area: "publications", url: "/publications/publications/",
  children: [
    ext("PACMMOD", "https://dl.acm.org/journal/pacmmod"),
    ext("SIGMOD Record", "https://sigmodrecord.org/"),
    ext("SIGMOD Blog", "https://blog.sigmod.org/"),
    ext("Conference Proceedings", "https://dl.acm.org/conference/mod/proceedings"),
  ],
};

const history = {
  label: "History", area: "history", url: "/sigmod-history/",
  children: [
    { label: "History", url: "/sigmod-history/" },
    { label: "Mission", url: "/sigmod-history/sigmods-mission/" },
    { label: "Logo history", url: "/sigmod-history/sigmod-logo-history/" },
    { label: "Conference program chairs", url: "/sigmod-history/program-chair/" },
    { label: "SIGMOD Online", url: "/sigmod-history/sigmod-online/" },
    { label: "Archive", url: "/archive/" },
  ],
};

const nav = {
  main: [about, conferences, awards, pods, publications, history],
  join: { label: "Join SIGMOD", url: "/join/" },
  quicklinks: [
    ext("SIGMOD Record", "https://sigmodrecord.org/"),
    ext("PACMMOD", "https://dl.acm.org/journal/pacmmod"),
    ext("SIGMOD Blog", "https://blog.sigmod.org/"),
    ext("Reproducibility", "https://reproducibility.sigmod.org/"),
    { label: "Video series", url: "/videoseries/" },
    { label: "DBCares", url: "/sigmod-policies/dbcares-policy/" },
    { label: "ACM Open", url: "/acm-open-sigmod/" },
    { label: "Join SIGMOD", url: "/join/" },
  ],
};
// Footer columns: the SIGMOD menus, and the PODS groups
nav.sigmod = { label: "SIGMOD", home: "/", menus: nav.main.filter((m) => m !== pods) };
nav.pods = { label: "PODS", home: "/pods-home/", menus: pods.groups };

export default nav;
