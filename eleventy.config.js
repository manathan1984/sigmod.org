import { HtmlBasePlugin } from "@11ty/eleventy";

// One content tree, several themes. THEME=a|b|c|d picks the layouts in
// src/_themes/<theme>/ and the stylesheet src/assets/<theme>.css.
const theme = process.env.THEME || "a";
// Preview build (GitHub Pages): every theme lives under <PREVIEW_BASE><theme>/,
// e.g. /sigmod.org/c/, and the design switcher links between them.
const previewBase = process.env.PREVIEW_BASE;

export default function (eleventyConfig) {
  if (previewBase) eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addGlobalData("theme", theme);
  eleventyConfig.addGlobalData("layout", `${theme}/page.njk`);
  eleventyConfig.addGlobalData("currentYear", new Date().getFullYear());
  eleventyConfig.addGlobalData("dev", process.env.ELEVENTY_RUN_MODE === "serve");
  eleventyConfig.addGlobalData("preview", !!previewBase);

  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/static": "/" });

  eleventyConfig.addCollection("news", (api) =>
    api.getFilteredByTag("news").sort((a, b) => b.date - a.date));
  eleventyConfig.addCollection("pages", (api) =>
    api.getAll().filter((p) => p.data.wp_type === "page"));

  eleventyConfig.addFilter("date", (d, style = "long") => {
    const dt = new Date(d);
    return style === "iso" ? dt.toISOString().slice(0, 10)
      : dt.toLocaleDateString("en-US", { year: "numeric", month: style === "short" ? "short" : "long", day: "numeric", timeZone: "UTC" });
  });
  eleventyConfig.addFilter("year", (d) => new Date(d).getUTCFullYear());
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));
  // URL a news item should link to (its canonical page when it is a duplicate)
  eleventyConfig.addFilter("href", (item) => item.data.redirect_to || item.url);
  // relative path from a page back to the folder that holds all themes (preview build)
  eleventyConfig.addFilter("toThemesRoot", (url) => "../".repeat(url.split("/").filter(Boolean).length + 1));
  // nav helpers
  eleventyConfig.addFilter("isActive", (link, url) =>
    !!url && (url === link.url || (link.children || []).some((c) => c.url === url)));
  eleventyConfig.addFilter("findMenu", (menus, url, area) =>
    menus.find((m) => m.url === url || (m.children || []).some((c) => c.url === url)) ||
    menus.find((m) => m.area === area));

  return {
    dir: { input: "src", includes: "_themes", data: "_data", output: `${process.env.OUTPUT_ROOT || "_site"}/${theme}` },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
    pathPrefix: previewBase ? `${previewBase}${theme}/` : "/",
  };
}
