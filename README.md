# BryanOnKeys · Desarrollador Full Stack

Portafolio en español con escenas inspiradas en los gráficos 3D de la era de 64 bits. Reúne proyectos Full Stack, código de backend y aportes públicos a GitHub. Está construido con React, TypeScript y Vite. Puedes explorarlo en [bryanonkeys.github.io](https://bryanonkeys.github.io/).

## La experiencia

- Portada y fichas ilustradas con geometría de pocos polígonos, texturas de baja resolución y una paleta de índigo, lavanda y durazno.
- Secciones de presentación, tecnologías con evidencia, cuatro tarjetas de trabajo y filtros.
- Explorador de 12 archivos auténticos de Nexo y Borough & Ledger, con resaltado Shiki precalculado y enlaces fijados a sus commits.
- Página independiente en `/engineering/?project=nexo` o `?project=crm`.
- Diagramas interactivos de los dos sistemas y recorrido por las etapas de desarrollo.
- Seguidores, repositorios públicos, repositorios propios y calendario de contribuciones de GitHub.
- Actividad reciente con búsqueda por título o repositorio y filtros para pull requests, issues, revisiones y comentarios. Cada entrada abre el aporte original.
- Foto de perfil real proporcionada por Bryan, integrada en Sobre mí.
- Formulario con nombre, correo, asunto y mensaje, validación y envío directo mediante Web3Forms a `contact.bryanonkeys@gmail.com`. Recepción comprobada en Gmail; conserva los datos y ofrece continuar por correo si el servicio falla.
- Acceso al perfil, a los repositorios, a la demo de la tienda y al formulario de contacto desde la página principal.
- Navegación con teclado, menú móvil, reducción de movimiento y fuentes locales.

## Ejecutar en Windows 11

Instala **Node.js 24 LTS** y Git. Desde PowerShell, abre la carpeta que contiene este README:

```powershell
npm ci
npm run dev
```

Abre la dirección que imprime Vite. Para comprobar el código:

```powershell
npm run verify
npm run format:check
```

Para probar la compilación, detén el servidor de desarrollo y ejecuta:

```powershell
npm run build
npm run preview
```

Para la suite de navegador, instala los binarios oficiales de Playwright una vez:

```powershell
npx playwright install chromium
npm run test:e2e
```

## Organización

| Ruta                     | Responsabilidad                                             |
| ------------------------ | ----------------------------------------------------------- |
| `src/app`                | Composición de la página y de la vista independiente        |
| `src/features`           | Secciones y sus interacciones                               |
| `src/content`            | Identidad, proyectos, competencias y decisiones verificadas |
| `src/content/generated`  | Instantáneas de código, tokens y actividad pública          |
| `src/components`         | Elementos compartidos de presentación                       |
| `src/styles`             | Tokens, estilos responsivos y movimiento                    |
| `scripts`                | Actualización de fuentes, resaltado y salida estática       |
| `src/tests`, `tests/e2e` | Pruebas de comportamiento y navegador                       |
| `.github/workflows`      | Validación y publicación en GitHub Pages                    |

## Fuentes y mantenimiento

`npm run content:github` consulta GitHub para actualizar el perfil, los repositorios, el calendario y la actividad pública de los últimos 30 días disponible en la API. El navegador descarga la copia publicada en `/data/github.json` y vuelve a consultarla cada diez minutos mientras la página está visible. Cada sección muestra su propia fecha de actualización. Si falla una consulta, conserva la copia más reciente disponible con su fecha original.

`npm run content:sync` también descarga el código público fijado en `scripts/source-manifest.json` y genera el resaltado Shiki. Los tokens de GitHub se usan durante el workflow.

Las portadas de CRM y NEXO son ilustraciones conceptuales. Los diagramas interactivos y el explorador muestran la arquitectura y el código de esos repositorios. La ficha de Patitas Felices usa una captura de la demo publicada.

La fotografía de Sobre mí fue proporcionada y autorizada por el usuario. El CV continúa pendiente de un archivo confirmado.

## Publicación

Repositorio público: [BryanOnKeys/BryanOnKeys.github.io](https://github.com/BryanOnKeys/BryanOnKeys.github.io). GitHub Pages utiliza GitHub Actions como fuente y `main` como rama de publicación. El destino configurado es [bryanonkeys.github.io](https://bryanonkeys.github.io/).

El workflow `deploy.yml` valida y publica los cambios de `main`. Cada seis horas consulta los datos de GitHub y publica una compilación actualizada. La salida `dist/` es portable a cualquier alojamiento estático.

- [Arquitectura](docs/ARCHITECTURE.md)
- [Sistema de diseño](docs/DESIGN_SYSTEM.md)
- [Cambiar contenido y añadir proyectos](docs/CONTENT.md)
- [Desplegar y recuperar](docs/DEPLOYMENT.md)
- [Rendimiento](docs/PERFORMANCE.md)
- [Resultados de validación y límites](docs/VALIDATION.md)
- [Procedencia y licencias](THIRD_PARTY_NOTICES.md)

## Formulario de contacto

Consulta [configuración y activación](docs/CONTACT.md). La integración no necesita un servidor del portfolio, contraseñas de Gmail ni claves privadas en el navegador. El proveedor externo debe estar disponible y el destinatario debe confirmar su correo antes de considerar comprobada la recepción.
