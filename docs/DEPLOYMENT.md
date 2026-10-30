# Despliegue y recuperación

## GitHub Pages

- Repositorio público: https://github.com/BryanOnKeys/BryanOnKeys.github.io
- Rama: `main`.
- Settings → Pages → Source: **GitHub Actions**.
- Destino configurado: https://bryanonkeys.github.io/

`Publicar en GitHub Pages` se ejecuta con cada push a `main` o desde el disparador manual. Actualiza las instantáneas públicas, ejecuta TypeScript, ESLint, Vitest, el build y Playwright. El despliegue depende de que esas comprobaciones terminen correctamente. El enlace definitivo y el resultado de cada despliegue están en el job `deploy` y en Settings → Pages.

El build utiliza `SITE_URL=https://bryanonkeys.github.io`, `VITE_BASE_PATH=/` y la variable de repositorio `VITE_CONTACT_ACCESS_KEY` para el identificador público de Web3Forms. La activación y prueba real de correo están descritas en [CONTACT.md](CONTACT.md). No se debe usar una contraseña de Gmail en esa variable.

Solo el job de publicación recibe `pages: write` e `id-token: write`; el código se consulta con `contents: read`. No se incluye una tarea programada. Las instantáneas se actualizan en las compilaciones, conservando el contenido previo si la red no responde.

La copia original en Sites tiene su propio alojamiento. Este repositorio de Pages no incluye la identidad de despliegue de ese proyecto.

## Publicar bajo otra ruta

Para un repositorio de proyecto, ajusta `VITE_BASE_PATH` a `/nombre-repositorio/` y `SITE_URL` al origen y ruta definitivos. Los recursos de contenido y el explorador utilizan `import.meta.env.BASE_URL`. La finalización del build actualiza canonical, robots y sitemap. Confirma después ambas entradas HTML.

## Recuperar o migrar

Conserva el código, `package-lock.json` y el contenido generado en Git. Desde PowerShell:

```powershell
git clone https://github.com/BryanOnKeys/BryanOnKeys.github.io.git
cd BryanOnKeys.github.io
npm ci
npm run verify
```

Publica `dist/` en un alojamiento estático HTTPS. No publiques `.env`, `node_modules`, trazas locales o credenciales. Para volver a una versión previa, revierte el commit correspondiente y deja que el workflow vuelva a validar y publicar.

La disponibilidad depende del alojamiento y del proveedor de correo. La salida estática permite migrar sin reconstruir un servidor de aplicación.

## Documentación

- https://vite.dev/guide/static-deploy
- https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
- https://playwright.dev/docs/ci
