import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import markdownItMark from "markdown-it-mark";
import markdownItAttrs from "markdown-it-attrs";

export default function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Resaltado en cualquier .md:
  //   ==frase==            -> amarillo (por defecto)
  //   ==frase=={.verde}    -> verde
  //   ==frase=={.morado}   -> morado
  eleventyConfig.amendLibrary("md", (mdLib) =>
    mdLib.use(markdownItMark).use(markdownItAttrs)
  );

  // ===================================================================
  // SECCIONES DESACTIVADAS PARA EL LANZAMIENTO
  // Comentá (o borrá) la línea correspondiente para restaurar la
  // sección completa: páginas, menú y colecciones.
  // ===================================================================
  eleventyConfig.ignores.add("src/biblioteca/**");
  eleventyConfig.ignores.add("src/multimedia/**");
  eleventyConfig.ignores.add("src/equipo/**");
  // Antecedentes en lista única: las portadas de las subsecciones
  // (articulos/, casos/, noticias/) no se generan. Comentá esta línea
  // para volver a tener páginas separadas por subsección.
  eleventyConfig.ignores.add("src/antecedentes/*/index.md");

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

  // Todas las entradas de Antecedentes (artículos, casos y noticias)
  // en una sola lista, ordenadas por fecha
  eleventyConfig.addCollection("antecedente", (api) =>
    api
      .getFilteredByGlob("src/antecedentes/*/*.md")
      .filter((p) => !p.inputPath.endsWith("index.md"))
  );

  // Un párrafo resaltado por completo (==párrafo=={.color}) se muestra
  // como caja rectangular; los resaltados dentro de una frase quedan
  // como marcador de línea.
  eleventyConfig.addTransform("resaltadoBloque", function (content) {
    if (!this.page.outputPath || !this.page.outputPath.endsWith(".html")) {
      return content;
    }
    return content.replace(
      /<p>\s*<mark(?:\s+class="([^"]*)")?>([\s\S]*?)<\/mark>\s*<\/p>/g,
      (_m, clase, inner) =>
        `<p class="mh-destacado${clase ? " " + clase : ""}">${inner}</p>`
    );
  });

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
