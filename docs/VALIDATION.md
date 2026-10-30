# Validación de la entrega

Validación efectuada durante esta implementación. Los resultados corresponden al portfolio, no a una ejecución completa de los backends originales.

## Comandos ejecutados

| Comprobación                              | Resultado observado                                       |
| ----------------------------------------- | --------------------------------------------------------- |
| TypeScript estricto (`npm run typecheck`) | Correcto                                                  |
| ESLint (`npm run lint`)                   | Correcto, sin errores                                     |
| Vitest y Testing Library (`npm test`)     | 19 pruebas correctas                                      |
| Build de producción (`npm run build`)     | Correcto: dos entradas HTML y recursos estáticos          |
| Formato (`npm run format:check`)          | Correcto                                                  |
| Playwright en GitHub Actions              | 6 pruebas correctas: escritorio y móvil                   |
| Chromium en GitHub Actions                | Instalación correcta                                      |
| Lighthouse                                | Sin puntuación: no hay Chrome utilizable en el contenedor |

El build advierte que el módulo diferido de Three.js supera 500 kB minificado (unos 134 kB gzip). No impide compilar. Se conserva la advertencia y se documenta su coste.

## Comportamientos probados

Las 19 pruebas cubren protocolos de URL, conservación del radio orbital, damping independiente del particionado temporal, filtros de proyectos, evidencia de competencias, cambio de backend, selección de archivos y notas, integridad del código resaltado, cambio de arquitectura y destinos de contacto. La revisión del contacto añade casos de envío aceptado, fallo de red, configuración ausente, borrador de Gmail con destinatario fijo, solicitudes duplicadas, pruebas breves, límites de solicitudes y rechazos HTTP o JSON. La fotografía y el cierre sin navegación repetida se comprueban visualmente.

En el navegador disponible se comprobaron además:

- Carga de la página y fidelidad general de las secciones.
- Filtro Frontend: dos tarjetas y estado seleccionado correcto.
- Cambio a CRM y apertura de `SecurityConfig.java`, con BCrypt y enlace al SHA de origen.
- Nota Seguridad de Nexo: selecciona `security.ts` con `timingSafeEqual`.
- Diagrama CRM: selección de Autenticación y enlace a `SecurityConfig.java`.
- Etapa Pruebas: cambia su descripción y estado seleccionado.
- Apertura del explorador independiente; el parámetro `project=crm` se conserva tras recargar.
- Diseño móvil mediante un iframe de 390 px (375 px útiles por la barra de desplazamiento): sin desbordamiento horizontal.
- Menú móvil: apertura y cierre al navegar a Contacto.
- Contacto: destino `mailto:` real y perfiles confirmados.

La primera revisión local usó la interfaz del navegador porque la instalación local de Chromium falló. En GitHub Actions se instaló Chromium y el runner ejecutó correctamente las 6 pruebas de navegador, incluyendo la conservación y composición del contacto. El iframe permite comprobar los breakpoints y la composición; no equivale a una prueba en un teléfono físico ni en Safari.

## Escena y límites visuales

El navegador de revisión tiene WebGL deshabilitado. Se comprobó el fallback SVG calculado. La escena Three.js está implementada y tipada, pero no se certificó visualmente el render con GPU en este entorno. Queda pendiente revisarla en Chrome o Edge con aceleración gráfica habilitada.

Las capturas de la revisión original proceden del navegador real y se conservan con esa entrega; no forman parte del código de Pages. Las de móvil se recortan al iframe, conservando sus píxeles. La API de captura de página completa agotó su tiempo; se entregan capturas de secciones y se deja pendiente la captura larga continua. Las de escritorio muestran la página, su editor y arquitectura; las de móvil muestran el diseño responsive. La esfera que aparece en ellas corresponde al fallback, sin sustituirlo por una imagen de una escena 3D ejecutada.

## Publicación en GitHub Pages

Se creó el repositorio público `BryanOnKeys/BryanOnKeys.github.io` y se configuró Pages con GitHub Actions. El workflow publica únicamente después de las comprobaciones. El despliegue del commit `d0e9b9873f61b01cd7fde05217efcdf7cb6d0206` terminó correctamente: [ejecución 41074188607](https://github.com/BryanOnKeys/BryanOnKeys.github.io/actions/runs/41074188607). Se abrió https://bryanonkeys.github.io/ y se verificó la foto de 640 × 640 desde ese mismo dominio, los enlaces y el cierre con formulario y botón Volver arriba.

## Contenido pendiente de aportación

- CV confirmado, si se desea incorporar.
- Activación del destinatario y recepción real del formulario, pendientes del servicio de correo.
- Capturas reales o URLs de evaluación públicas de los backends.
- Nuevos proyectos: se añaden al registro de contenido sin mostrar entradas ficticias.
- Lighthouse: no se ha ejecutado una auditoría con puntuación.

## Revisión del 30 de octubre de 2026

Se integra la foto entregada, se sustituye el contacto por un formulario y se elimina el menú repetido del footer. TypeScript, ESLint, 19 pruebas y build de producción ejecutados correctamente. Las pruebas de transporte utilizan respuestas simuladas: no certifican entrega en Gmail. La consulta real de FormSubmit devolvió HTTP 521. Se sustituyó por una integración preparada para Web3Forms con verificación del propietario y alternativa explícita para enviar desde Gmail. No se afirma recepción real ni activación completada.
