/**
 * Eleventy configuration for the Precious Steps Child Care Center website.
 *
 * Output is plain static HTML with no client-side framework and no inline
 * script or style, so the strict Content Security Policy declared in
 * netlify.toml holds without exceptions.
 */

export default function (eleventyConfig) {
  // Pass static assets through untouched.
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });
  eleventyConfig.addPassthroughCopy({ "src/_redirects": "_redirects" });

  // Rebuild the browser when CSS or JS changes during local development.
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

  /**
   * Format a 10-digit phone string for display: 9087555005 -> (908) 755-5005
   */
  eleventyConfig.addFilter("phoneDisplay", (value) => {
    const digits = String(value || "").replace(/\D/g, "");
    if (digits.length !== 10) return value;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  });

  /**
   * Format a 10-digit phone string as a tel: href: 9087555005 -> +19087555005
   */
  eleventyConfig.addFilter("phoneHref", (value) => {
    const digits = String(value || "").replace(/\D/g, "");
    return digits.length === 10 ? `+1${digits}` : `+${digits}`;
  });

  /**
   * Build a Google Maps search URL from a location object.
   * We link out rather than embed an iframe, which keeps the CSP free of
   * a frame-src exception and keeps third-party tracking off the site.
   */
  eleventyConfig.addFilter("mapUrl", (location) => {
    const query = [location.street, location.city, location.state, location.zip]
      .filter(Boolean)
      .join(", ");
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  });

  /**
   * Google Maps embed URL for a location.
   *
   * Uses the keyless `output=embed` endpoint, so there is no API key to
   * manage or leak and no billing account attached. The address string is
   * URL-encoded, so a change in site.json flows straight through.
   *
   * This is the one third-party frame on the site and it is why
   * netlify.toml carries a frame-src exception for google.com. Google sets
   * cookies inside that frame. If the client would rather not ship any
   * third-party tracking, swap this filter's body for the OpenStreetMap
   * equivalent and narrow frame-src to openstreetmap.org:
   *
   *   https://www.openstreetmap.org/export/embed.html?bbox=<bbox>&marker=<lat>,<lng>
   */
  eleventyConfig.addFilter("mapEmbedUrl", (location) => {
    const query = [location.street, location.city, location.state, location.zip]
      .filter(Boolean)
      .join(", ");
    return `https://www.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
  });

  /**
   * The URL for a given page in a given language.
   *
   * English is the default language and sits at the root; Spanish lives
   * under /es/ with the same slugs. Every paginated page declares a
   * `pageKey` in its front matter ("home", "about", ...), which is the
   * only thing that ties the two language versions of a page together.
   * The language toggle and the hreflang tags both run through here.
   */
  eleventyConfig.addFilter("localizedUrl", (pageKey, langCode) => {
    const prefix = langCode === "en" ? "" : `/${langCode}`;
    return pageKey === "home" ? `${prefix}/` : `${prefix}/${pageKey}/`;
  });

  eleventyConfig.addFilter("isoDate", (value) =>
    new Date(value).toISOString().slice(0, 10)
  );

  eleventyConfig.addFilter("year", () => new Date().getFullYear());

  /**
   * Only announcements that are published and not past their expiry date.
   */
  eleventyConfig.addFilter("activeAnnouncements", (items = []) => {
    const today = new Date().toISOString().slice(0, 10);
    return items.filter(
      (item) => item.published && (!item.expires || item.expires >= today)
    );
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["njk", "md", "html"],
  };
}
