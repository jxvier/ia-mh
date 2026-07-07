import eleventyNavigationPlugin from "@11ty/eleventy-navigation";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addPassthroughCopy("src/css");
  eleventyConfig.addPassthroughCopy("src/img");

  // Uso en cualquier .md:  {% youtube "VIDEO_ID", "Título del video" %}
  eleventyConfig.addShortcode("youtube", (id, title = "Video de YouTube") => {
    return `<div class="video-embed"><iframe src="https://www.youtube-nocookie.com/embed/${id}" title="${title}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>`;
  });

  eleventyConfig.addFilter("fechaLarga", (dateObj) => {
    return new Intl.DateTimeFormat("es-SV", {
      dateStyle: "long",
      timeZone: "UTC",
    }).format(dateObj);
  });

  eleventyConfig.addFilter("zeroPad", (n) => String(n).padStart(2, "0"));

  // Divide el contenido renderizado en partes usando un marcador HTML,
  // p. ej. {% set partes = content | partir("<!-- principios -->") %}
  eleventyConfig.addFilter("partir", (str, sep) => String(str).split(sep));

  // Extrae el número real del slug del archivo: "cuaderno-02" -> "02"
  eleventyConfig.addFilter("numeroSlug", (slug) => {
    const m = String(slug).match(/(\d+)$/);
    return m ? m[1].padStart(2, "0") : "";
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
