import { HtmlBasePlugin } from "@11ty/eleventy";

// PATH_PREFIX serves the site from a subfolder, e.g. /www.sigmod.org/ on GitHub Pages.
const pathPrefix = process.env.PATH_PREFIX || "/";

export default function (eleventyConfig) {
  if (pathPrefix !== "/") eleventyConfig.addPlugin(HtmlBasePlugin);
  eleventyConfig.addGlobalData("layout", "page.njk");

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
  // nav helpers
  eleventyConfig.addFilter("isActive", (link, url) =>
    !!url && (url === link.url || (link.children || []).some((c) => c.url === url)));
  eleventyConfig.addFilter("findMenu", (menus, url, area) =>
    menus.find((m) => m.url === url || (m.children || []).some((c) => c.url === url)) ||
    menus.find((m) => m.area === area));

  return {
    dir: { input: "src", includes: "_includes", data: "_data", output: "_site" },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
    pathPrefix,
  };
}
