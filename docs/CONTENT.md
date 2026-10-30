# Personalización

## Identidad y contacto

Edita `src/content/profile.ts`. Los enlaces actuales proceden del perfil público y de la cuenta GitHub conectada. Confirma cualquier correo, URL o dato antes de publicarlo. `cv` está preparado para una ruta de archivo real; cuando exista, añade el archivo a `public/assets/` y un enlace de descarga con nombre descriptivo. No hay un botón de CV vacío.

## Añadir proyectos

Añade una entrada tipada a `src/content/projects.ts`: identificador único, título, categoría, descripción, tecnologías, URL del repositorio y estado. El modelo y la cuadrícula admiten cuatro o más proyectos por categoría sin crear carpetas vacías ni mostrar trabajo inexistente.

1. Incorpora solo trabajo implementado y comprobable.
2. Añade una captura real optimizada en `public/assets/projects` o una vista técnica identificada.
3. Amplía `ProjectVisual.tsx` para representar ese recurso sin fingir una captura.
4. Añade una demo solamente cuando su dirección funcione.
5. Para backend, incorpora archivos y explicaciones al explorador.
6. Ejecuta las validaciones y comprueba los filtros.

La categoría Backend incluye aplicaciones completas que contienen una API; Frontend muestra las experiencias de interfaz. Aplicación completa filtra los proyectos integrados.

## Ampliar el explorador

Actualiza `scripts/source-manifest.json` con repositorio público, SHA completo y rutas existentes. Amplía las notas de `src/content/engineering.ts` y el selector del explorador para el nuevo proyecto. Ejecuta `npm run content:sync`. Revisa el diff y el texto generado; una explicación no debe prometer una garantía de seguridad que el código no demuestre.

Los diagramas se configuran en `src/content/architecture.ts`. Cada nodo lleva coordenadas, responsabilidad y fuente. Las relaciones deben corresponder al proyecto, incluyendo los límites del entorno local y de los servicios externos.

## Competencias verificables

`Skill.status` admite `Aplicado en proyectos`, `En aprendizaje` y `Por evaluar`. No se incluyen porcentajes arbitrarios. Una evaluación futura puede añadirse con objetivos comprobables, evidencia y fecha; hasta entonces se conserva el estado cualitativo.

## Actividad y aportes

`npm run content:sync` actualiza la actividad durante el build; no crea actividad en GitHub. Los aportes destacados están en `src/content/contributions.ts` y deben verificarse contra sus PR originales antes de cambiar su estado.

## Fotografía y formulario

La foto confirmada está en `public/assets/images/bryan-profile.jpg`; su encuadre lo controla CSS, sin retocar el rostro. El destino del formulario utiliza `profile.email`. Si cambias ese correo, vuelve a completar la activación del proveedor antes de anunciar recepción operativa. No coloques contraseñas de Gmail ni claves SMTP en el frontend.
