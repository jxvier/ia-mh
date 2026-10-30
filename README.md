# IA · Mónica Herrera

Sitio de la **Sección de Inteligencia Artificial de la Escuela Mónica Herrera**, publicado en [ia.monicaherrera.edu.sv](https://ia.monicaherrera.edu.sv).

Es un sitio estático construido con [Eleventy (11ty)](https://www.11ty.dev/). Todo el contenido vive en archivos Markdown dentro de `src/`: agregar o editar un `.md` actualiza el sitio en el siguiente build.

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- npm (viene con Node)

## Comandos

```bash
npm install     # solo la primera vez
npm run dev     # servidor local con recarga automática (http://localhost:8080)
npm run build   # genera el sitio estático en _site/
```

> **Nota:** el servidor de desarrollo no detecta archivos **nuevos**. Si creás un `.md` nuevo, reiniciá `npm run dev` para que aparezca.

## Secciones del sitio

| Sección | Archivo o carpeta | URL |
|---|---|---|
| Inicio | `src/index.md` | `/` |
| Manifiesto | `src/manifiesto.md` | `/manifiesto/` |
| Cuadernos GuÍA | `src/cuadernos/` | `/cuadernos/` |
| Antecedentes | `src/antecedentes/` | `/antecedentes/` |

Las carpetas `src/biblioteca/`, `src/multimedia/` y `src/equipo/` existen pero están **desactivadas para el lanzamiento**. Para reactivar una, borrá o comentá su línea `eleventyConfig.ignores.add(...)` en `eleventy.config.js`.

## Cómo agregar contenido

### Un cuaderno nuevo

Creá `src/cuadernos/cuaderno-03.md` (el número del archivo es el que se muestra en la tarjeta):

```markdown
---
title: "Cuaderno 03 — Título del cuaderno"
description: Resumen corto que aparece en el listado.
date: 2026-11-15
---

## Idea central

Contenido en Markdown…
```

Los cuadernos se listan en orden ascendente (01, 02, 03…).

### Un artículo, caso o noticia en Antecedentes

Creá un `.md` en `src/antecedentes/articulos/`, `src/antecedentes/casos/` o `src/antecedentes/noticias/`:

```markdown
---
title: "Título de la entrada"
description: Resumen corto que aparece en el listado.
date: 2026-11-15
---

Contenido en Markdown…
```

Las tres carpetas se muestran juntas en una sola lista, de más reciente a más antigua.

### Cajas de resaltado

En cualquier `.md` podés resaltar texto con `==`:

```markdown
==frase resaltada==                 → amarillo (por defecto)
==frase resaltada=={.verde}         → verde
==frase resaltada=={.morado}        → morado
```

Si el resaltado ocupa un párrafo completo, se muestra como **caja de color**. Si está dentro de una frase, queda como marcador de línea. En los cuadernos se usa verde para las definiciones de términos clave y morado para la consideración ética y pedagógica.

### Un video de YouTube

Dentro de cualquier `.md`, con el ID del video (lo que va después de `v=` en la URL):

```njk
{% youtube "VIDEO_ID", "Título del video" %}
```

El video del Manifiesto se define en el campo `video` del front matter de `src/manifiesto.md`.

## Datos globales

`src/_data/site.json` contiene el nombre del sitio, la descripción que aparece en el pie de página, el teléfono y los enlaces a redes sociales. Cambiar un valor ahí lo actualiza en todas las páginas.

El logo es `src/img/logo-monica-herrera.png` y se usa en el encabezado y el pie de página.

## Publicar en ia.monicaherrera.edu.sv

El sitio ya está instalado en el servidor. Cada vez que se hace push a `main`, GitHub construye el sitio automáticamente y deja el resultado listo para descargar. **No hace falta instalar Node ni ejecutar nada.**

1. Descargá el último build desde este enlace:
   **https://github.com/jxvier/ia-mh/releases/latest/download/ia-monicaherrera-sitio.zip**
   (también está en la página [Releases](https://github.com/jxvier/ia-mh/releases) del repositorio).
2. Descomprimí el `.zip`.
3. Subí su contenido por FTP a la raíz del sitio web, reemplazando los archivos existentes.

El build tarda alrededor de un minuto después de cada push. El proceso está definido en `.github/workflows/publicar.yml`.

Para construir localmente, `npm run build` genera lo mismo en `_site/`.

Los enlaces internos son rutas absolutas (`/cuadernos/`, `/css/style.css`), así que el sitio debe servirse desde la raíz del dominio.

Como el encabezado y el pie de página son compartidos, cualquier cambio en `src/_includes/layouts/base.njk`, `src/css/style.css` o `src/_data/site.json` regenera **todas** las páginas HTML. En ese caso hay que subir todo `_site/`, no solo la página editada.

## Estructura del proyecto

```
src/
├── _data/site.json          Datos globales (nombre, descripción, redes)
├── _includes/layouts/       Plantillas Nunjucks (base, inicio, cuadernos, etc.)
├── css/style.css            Estilos
├── img/                     Logo e imágenes
├── index.md                 Inicio
├── manifiesto.md            Manifiesto
├── cuadernos/               Un .md por cuaderno
└── antecedentes/            Artículos, casos y noticias
eleventy.config.js           Configuración de Eleventy (filtros, colecciones, secciones activas)
_site/                       Salida del build (no se versiona)
```
