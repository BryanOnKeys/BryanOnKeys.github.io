# Sistema de diseño

Las escenas de pocos polígonos y texturas pixeladas dan al portafolio el carácter visual de las consolas de 64 bits. La introducción presenta al desarrollador y permite ir directamente a sus proyectos o aportes. Las ilustraciones de Borough & Ledger y NEXO aluden al dominio de cada sistema. Patitas Felices enseña una captura de su demo.

| Elemento                               | Decisión       |
| -------------------------------------- | -------------- |
| Títulos y cifras                       | Space Grotesk  |
| Texto y controles                      | Inter          |
| Código y metadatos                     | JetBrains Mono |
| Fondo de portada                       | `#151730`      |
| Superficie clara                       | `#eef0fa`      |
| Acción principal en portada            | `#ffc29d`      |
| Acción principal en superficies claras | `#4437a2`      |

La distribución pasa de dos columnas a una en pantallas pequeñas. Los controles del explorador de archivos se apilan y los nodos del diagrama se presentan como una cuadrícula seleccionable. Los filtros y el menú responden al teclado, el foco tiene contraste y las transiciones respetan `prefers-reduced-motion`.

## Referencias consultadas

Las búsquedas en GitHub cubrieron portafolios 3D, arte de pocos polígonos, shaders retro, sistemas de diseño, accesibilidad en React y compresión de imágenes. La selección se basó en su relación con decisiones concretas del sitio.

| Repositorio                                                                                   | Aplicación al diseño                                                                          |
| --------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| [MenacingMecha/godot-n64-shader-demo](https://github.com/MenacingMecha/godot-n64-shader-demo) | Geometría de pocos polígonos, texturas gruesas y luz sencilla en las ilustraciones.           |
| [brunosimon/folio-2025](https://github.com/brunosimon/folio-2025)                             | Una escena propia como identidad visual de un portafolio con evidencia técnica.               |
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable)                                   | Jerarquía de la primera vista, ritmo entre secciones y controles con una acción clara.        |
| [jdan/98.css](https://github.com/jdan/98.css)                                                 | Referencia de relieve y estados táctiles de interfaces de la época.                           |
| [argyleink/gui-challenges](https://github.com/argyleink/gui-challenges)                       | Componentes adaptativos y flujos que pueden operarse con teclado.                             |
| [radix-ui/primitives](https://github.com/radix-ui/primitives)                                 | Semántica de controles y foco visible al buscar y filtrar.                                    |
| [floriankarsten/space-grotesk](https://github.com/floriankarsten/space-grotesk)               | Tipografía de títulos y cifras, instalada mediante Fontsource.                                |
| [GoogleChromeLabs/squoosh](https://github.com/GoogleChromeLabs/squoosh)                       | Referencia para evaluar formatos de compresión. Los recursos del sitio se exportaron en WebP. |
