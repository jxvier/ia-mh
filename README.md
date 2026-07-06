# IA · Mónica Herrera — ia.monicaherrera.edu.sv

Sitio estático construido con [Eleventy (11ty)](https://www.11ty.dev/). Todo el contenido vive en archivos Markdown: **agregar o editar un `.md` actualiza el sitio** en el siguiente build.

## Comandos

```bash
npm install        # solo la primera vez
npm run dev        # servidor local con recarga en http://localhost:8080
npm run build      # genera el sitio estático en _site/
```

## Estructura de contenido

```
src/
├── index.md                      → Inicio
├── manifiesto.md                 → Manifiesto
├── cuadernos/                    → Cuadernos (un .md por cuaderno)
├── biblioteca/
│   ├── papers/                   → un .md por paper
│   ├── herramientas/             → un .md por herramienta
│   └── recursos/                 → un .md por recurso
├── antecedentes/
│   ├── articulos/                → un .md por artículo
│   ├── casos/                    → un .md por caso
│   └── noticias/                 → un .md por noticia
├── multimedia/
│   └── videos/                   → un .md por video (embed de YouTube)
└── equipo/                       → un .md por persona
```

## Cómo agregar contenido

### Un cuaderno nuevo

Crea `src/cuadernos/cuaderno-03.md`:

```markdown
---
title: "Cuaderno 03 — Título del ciclo"
description: Resumen corto que aparece en el listado.
date: 2026-08-01
---

Contenido en Markdown…
```

Los artículos, casos y noticias funcionan igual, en su carpeta correspondiente. Se listan de más reciente a más antiguo (los cuadernos, en orden ascendente).

### Un paper, herramienta o recurso

Crea un `.md` en la carpeta correspondiente de `src/biblioteca/`:

```markdown
---
title: "Nombre del recurso"
autor: "Autor o institución"
enlace: https://ejemplo.com
---

Nota breve sobre por qué es relevante.
```

Estas entradas se muestran como lista comentada de enlaces (no generan página propia).

### Un video

Crea un `.md` en `src/multimedia/videos/` con el ID de YouTube (lo que va después de `v=` en la URL):

```markdown
---
title: "Título del video"
youtubeId: aircAruvnKk
date: 2026-08-01
---

Descripción breve.
```

También puedes incrustar un video dentro de cualquier página con el shortcode:
`{% youtube "VIDEO_ID", "Título" %}`

### Una persona del equipo

Crea un `.md` en `src/equipo/`:

```markdown
---
title: "Nombre Apellido"
rol: "Su rol"
orden: 3
foto: /img/nombre.jpg   # opcional; coloca la imagen en src/img/
---

Bio breve.
```

## Despliegue en ia.monicaherrera.edu.sv

El build genera HTML estático en `_site/`, así que sirve cualquier hosting estático:

1. **Netlify / Vercel / Cloudflare Pages** (recomendado): conecta el repositorio Git; comando de build `npm run build`, directorio de salida `_site`. Cada push a `main` publica automáticamente.
2. **GitHub Pages**: usa una GitHub Action que ejecute `npm run build` y publique `_site/`.
3. **DNS**: en la zona de `monicaherrera.edu.sv`, crea un registro `CNAME` para `ia` apuntando al host que asigne la plataforma (p. ej. `ia.monicaherrera.edu.sv → <sitio>.netlify.app`) y agrega el dominio personalizado en el panel de la plataforma para que emita el certificado HTTPS.
