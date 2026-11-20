# Rendimiento

## Portada y recursos

La portada usa una imagen WebP local. Declara dimensiones intrínsecas y prioridad alta; las imágenes de los proyectos y el retrato se cargan al acercarse a la vista. Las fuentes tienen `font-display: swap`.

## Carga

El explorador técnico sigue en un módulo diferido. Shiki genera los tokens durante la preparación del contenido. El sitio se publica como archivos estáticos y la actualización de GitHub consulta un solo JSON del mismo origen.

## Mediciones

Ejecuta `npm run build` para comparar los tamaños producidos por Vite y `npm run test:e2e` para comprobar la navegación y el contenido en escritorio y móvil.
