# Mercedes Cuesta · Portfolio

![CI](https://github.com/mcuestasoto/portfolio/actions/workflows/lint.yml/badge.svg)

Portfolio personal desarrollado con HTML, CSS y JavaScript para presentar mi perfil como desarrolladora de software orientada a Frontend web, mi experiencia profesional y una selección de proyectos.

[![Preview del portfolio de Mercedes Cuesta](assets/img/projects/project-portfolio-og.png)](https://mercedescuesta.vercel.app/)

## Demo

🌐 [Ver portfolio](https://mercedescuesta.vercel.app/)

## Objetivo

El portfolio está diseñado para una lectura rápida por recruiters y hiring managers: posicionamiento claro, proyectos primero como evidencia Frontend, experiencia profesional, tecnologías demostradas, formación y contacto directo.

La web evita duplicar el CV completo y prioriza contenido verificable, escaneable y relevante para selección.

## Stack

- HTML5
- CSS3
- JavaScript

Sin frameworks ni dependencias de producción.

## Criterios de diseño y UX

- Layout responsive con sidebar informativa en escritorio.
- Jerarquía visual orientada a lectura rápida.
- Texto conciso y escaneable.
- Proyectos como principal evidencia visual y técnica.
- Experiencia en formato editorial, sin sobrecargar con cards.
- Sistema de espaciado consistente.
- Identidad visual propia: base cálida y minimalista con acento tech.

## Accesibilidad

- HTML semántico.
- Navegación mediante teclado.
- Skip link.
- Estados `focus-visible`.
- Targets interactivos amplios.
- Soporte de `prefers-reduced-motion`.
- Menú móvil con gestión de foco e `inert`.
- Reflow responsive sin scroll horizontal.
- Imágenes con dimensiones intrínsecas y alternativas adecuadas.

## SEO y calidad técnica

- Open Graph y Twitter Card.
- Datos estructurados JSON-LD.
- Canonical, sitemap y `robots.txt`.
- Fuente WOFF2 autoalojada y precargada.
- GitHub Actions con Prettier y html-validate.
- Cabeceras de seguridad en Vercel.
- Despliegue continuo desde `main`.

## Estructura

```txt
portfolio/
├── index.html
├── cv.html
├── 404.html
├── README.md
├── THIRD_PARTY_NOTICES.md
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── vercel.json
├── .htmlvalidate.json
├── .github/workflows/lint.yml
├── ci/
├── css/styles.css
├── js/main.js
└── assets/
    ├── cv/mercedes-cuesta-cv-es.pdf
    ├── fonts/
    └── img/
```

## Autora

Mercedes Cuesta

- [LinkedIn](https://www.linkedin.com/in/mcuestasoto)
- [GitHub](https://github.com/mcuestasoto)
- [Portfolio](https://mercedescuesta.vercel.app/)

Diseñado y desarrollado por Mercedes Cuesta.

Atribuciones de terceros en [THIRD_PARTY_NOTICES.md](./THIRD_PARTY_NOTICES.md).
