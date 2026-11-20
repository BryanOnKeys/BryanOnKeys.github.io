# Rendimiento

## Portada y recursos

La portada selecciona una imagen WebP local de 760 o 1340 píxeles según el espacio y la densidad de pantalla. Ambas variantes declaran dimensiones y la portada se solicita con prioridad alta. Las fichas y el retrato se cargan al acercarse a la vista. Las fuentes locales usan `font-display: swap`.

## Carga

El explorador técnico sigue en un módulo diferido. Shiki genera los tokens durante la preparación del contenido. El sitio se publica como archivos estáticos y la actualización de GitHub consulta un solo JSON del mismo origen.

## Mediciones

Ejecuta `npm run build` para comparar los tamaños producidos por Vite y `npm run test:e2e` para comprobar la navegación y el contenido en escritorio y móvil.
