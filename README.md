# Bryan · Software Developer

Portfolio en español con React, TypeScript y Vite. Una experiencia estática que permite explorar proyectos, código de backend y decisiones de arquitectura sin depender de un servidor de aplicación ni de una base de datos.

## La experiencia

- Esfera Three.js real con geometría, núcleo cúbico, órbitas paramétricas y respuesta suavizada al cursor.
- Alternativa SVG calculada mediante código cuando WebGL no está disponible.
- Secciones de presentación, tecnologías con evidencia, cuatro tarjetas de trabajo y filtros.
- Explorador de 12 archivos auténticos de Nexo y Borough & Ledger, con resaltado Shiki precalculado y enlaces fijados a sus commits.
- Página independiente en `/engineering/?project=nexo` o `?project=crm`.
- Diagramas interactivos de los dos sistemas y recorrido por las etapas de desarrollo.
- Calendario público de GitHub incluido durante la compilación, con fecha visible de la instantánea.
- Foto de perfil real proporcionada por Bryan, integrada en Sobre mí.
- Formulario con nombre, correo, asunto y mensaje, validación y envío mediante Web3Forms cuando se configura el identificador público del destinatario verificado. Sin activar esa recepción, conserva los campos y prepara un correo para enviarlo desde Gmail.
- Pie de página compacto con botón para volver arriba y brillo discreto.
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
| `src/graphics`           | Escena Three.js, matemáticas y alternativa SVG              |
| `src/content`            | Identidad, proyectos, competencias y decisiones verificadas |
| `src/content/generated`  | Instantáneas de código, tokens y actividad pública          |
| `src/components`         | Elementos compartidos de presentación                       |
| `src/styles`             | Tokens, estilos responsivos y movimiento                    |
| `scripts`                | Actualización de fuentes, resaltado y salida estática       |
| `src/tests`, `tests/e2e` | Pruebas de comportamiento y navegador                       |
| `.github/workflows`      | Validación y publicación en GitHub Pages                    |

## Fuentes y mantenimiento

No se solicitan tokens de GitHub al visitante. `npm run content:sync` descarga archivos fijados al commit declarado en `scripts/source-manifest.json`, genera los tokens de Shiki y obtiene la instantánea pública de actividad del perfil. Si la red falla, conserva el contenido incluido y su fecha original.

Las vistas de CRM y Nexo son diagramas identificados como tales. La composición de Patitas Felices utiliza un recurso original del repositorio; no es una captura de una aplicación ejecutándose. El portfolio no presenta los backends como despliegues públicos ni inventa proyectos futuros.

La fotografía de Sobre mí fue proporcionada y autorizada por el usuario. El CV continúa pendiente de un archivo confirmado.

## Publicación

Repositorio público: [BryanOnKeys/BryanOnKeys.github.io](https://github.com/BryanOnKeys/BryanOnKeys.github.io). GitHub Pages utiliza GitHub Actions como fuente y `main` como rama de publicación. El destino configurado es [bryanonkeys.github.io](https://bryanonkeys.github.io/).

El workflow `deploy.yml` valida, prueba, compila y publica solo si el repositorio coincide con ese nombre. La salida `dist/` es portable a cualquier alojamiento estático.

- [Arquitectura](docs/ARCHITECTURE.md)
- [Sistema de diseño](docs/DESIGN_SYSTEM.md)
- [Cambiar contenido y añadir proyectos](docs/CONTENT.md)
- [Desplegar y recuperar](docs/DEPLOYMENT.md)
- [Rendimiento y matemáticas](docs/PERFORMANCE.md)
- [Resultados de validación y límites](docs/VALIDATION.md)
- [Procedencia y licencias](THIRD_PARTY_NOTICES.md)

## Formulario de contacto

Consulta [configuración y activación](docs/CONTACT.md). La integración no necesita un servidor del portfolio, contraseñas de Gmail ni claves privadas en el navegador. El proveedor externo debe estar disponible y el destinatario debe confirmar su correo antes de considerar comprobada la recepción.
