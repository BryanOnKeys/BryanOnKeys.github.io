# Sistema de diseño

La composición mantiene la referencia: navegación horizontal, presentación a la izquierda y esfera tecnológica a la derecha, bloque sobre mí en tres columnas, tarjetas de stack y proyectos, editor oscuro, arquitectura, actividad y contacto.

## Tokens

| Uso              | Valor                                |
| ---------------- | ------------------------------------ |
| Fondo            | `#090d15`                            |
| Superficie       | `#0f151f`                            |
| Texto            | `#f1f3fa`                            |
| Texto secundario | `#a4afc3`                            |
| Violeta          | `#a879ff`                            |
| Azul             | `#5f97ff`                            |
| Cian             | `#67c7e3`                            |
| Verde            | `#4bcf9d`                            |
| Bordes           | `#222e40`                            |
| Tipografía       | Inter, con archivos locales          |
| Código           | JetBrains Mono, con archivos locales |

La densidad visual aproxima la referencia conservando alturas naturales. Los puntos de adaptación principales están en 1190, 960 y 700 px. La página conserva desplazamiento vertical; no simula una imagen 9:16.

El movimiento se utiliza para la esfera y el filtrado de proyectos. Los hovers de superficie usan CSS. `prefers-reduced-motion` reduce las transiciones y detiene la evolución temporal de la escena. Los estados de teclado tienen contorno visible.

La identidad B. sustituye el retrato porque no se recibió una fotografía profesional autorizada. Las miniaturas técnicas no se presentan como capturas de producto.
