# Mercedes Cuesta · Portfolio ✨

Portfolio personal tipo CV web desarrollado para presentar mi perfil profesional como **Frontend Developer**, con experiencia previa en desarrollo Android para entorno e-commerce.

## 🚀 Demo

[Ver portfolio](https://mercedescuesta.vercel.app/)

## 👩🏻‍💻 Sobre el proyecto

Este portfolio funciona como una carta de presentación digital. Está diseñado para mostrar de forma clara y directa mi perfil técnico, stack principal, proyectos propios, experiencia profesional y acceso a mi CV.

## 🛠️ Stack

- HTML
- CSS
- JavaScript

## ✨ Características

- Diseño responsive.
- Layout tipo sidebar en escritorio.
- Navegación interna por secciones.
- Sección de proyectos propios con enlace a la web y al repositorio de cada uno.
- Enlaces profesionales a email, LinkedIn y GitHub.
- Acceso al CV completo.
- Open Graph y datos estructurados (JSON-LD) para mejorar la vista previa al compartir la web y su aparición en buscadores.
- Web app manifest e iconos para añadir la web a la pantalla de inicio en móvil.
- Página 404 personalizada.
- Integración continua (GitHub Actions) que valida formato (Prettier) y HTML (html-validate) en cada push y pull request.
- Barra de progreso de scroll.
- Botón para volver al inicio.
- Estados `hover` y `focus-visible`.
- Enlace “Saltar al contenido” para mejorar accesibilidad.
- Efecto visual suave siguiendo el cursor.
- Respeto de `prefers-reduced-motion`.
- Cabeceras de seguridad configuradas para Vercel.

## 🎨 Recursos y herramientas

- Tipografía Inter (autoalojada).
- Iconos SVG de Bootstrap Icons.
- Recursos visuales diseñados en Canva.
- Código editado en VS Code.
- Despliegue en Vercel.

## 🧑‍💻 Desarrollo

No hay build ni framework: es HTML, CSS y JS servidos tal cual. Las herramientas de calidad de código viven en `ci/` (aparte del `package.json` raíz, que no existe a propósito, para que Vercel no intente tratar el sitio como un proyecto Node con build).

```bash
cd ci && npm install && cd ..
./ci/node_modules/.bin/prettier --check "**/*.{html,css,js,json,md}"          # formato
./ci/node_modules/.bin/html-validate --config .htmlvalidate.json index.html cv.html 404.html   # HTML
```

Ambos se ejecutan también en cada push/PR vía GitHub Actions (`.github/workflows/lint.yml`).

## 📁 Estructura

```txt
portfolio/
├── index.html
├── cv.html
├── 404.html
├── README.md
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── vercel.json
├── .htmlvalidate.json
├── THIRD_PARTY_NOTICES.md
├── .github/
│   └── workflows/
│       └── lint.yml
├── ci/
│   ├── package.json
│   └── package-lock.json
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    ├── cv/
    │   └── mercedes-cuesta-cv-es.pdf
    ├── fonts/
    │   ├── inter-variable-latin.woff2
    │   └── LICENSE-inter.txt
    └── img/
        ├── favicon.svg
        ├── apple-touch-icon.png
        ├── icon-192.png
        ├── icon-512.png
        └── projects/
            ├── project-portfolio-og.png
            └── project-dietista-og.png
```

## 🌸 Autora

Mercedes Cuesta  
[LinkedIn](https://www.linkedin.com/in/mcuestasoto)  
[GitHub](https://github.com/mcuestasoto)

## 🧾 Créditos

Diseñado y desarrollado por Mercedes Cuesta.  
Creado en VS Code y publicado con Vercel.  
Todo el texto utiliza la tipografía Inter.
