# Rendimiento y matemáticas

## Escena

La esfera usa Three.js directamente. React Three Fiber no es necesario para esta escena acotada. Las órbitas siguen `x = r cos(t + fase)`, `z = r sin(t + fase)`, con grupos rotados para producir planos distintos. El núcleo flota mediante una función sinusoidal suave.

La respuesta al cursor interpola con `1 - exp(-velocidad * delta)`. Esta expresión conserva el comportamiento si cambia el intervalo entre fotogramas; la prueba compara una actualización larga con diez intervalos más pequeños.

El render está limitado a 30 FPS, con pixel ratio máximo de 1.5. Usa 220 partículas en pantallas amplias y 80 en pantallas pequeñas. IntersectionObserver pausa fuera de pantalla; visibilitychange lo pausa en una pestaña oculta. Un botón permite detenerlo. La preferencia de movimiento reducido conserva una escena fija.

El cleanup libera geometrías, materiales y el contexto; desconecta observers y listeners. La alternativa SVG genera meridianos, paralelos y proyección mediante trigonometría; no descarga una imagen de una esfera.

## Carga

Three.js y el explorador se separan del módulo inicial por importación dinámica. El bundle de Three.js supera 500 kB minificado (aproximadamente 134 kB gzip en el build medido); Vite lo advierte. Es una dependencia diferida para una escena WebGL real, no un recurso necesario para mostrar texto y enlaces.

Shiki se ejecuta en Node al actualizar contenido. El visitante recibe tokens serializados, no el motor de resaltado ni todas sus gramáticas. Las fuentes e iconos se sirven localmente. El recurso original de Patitas Felices está convertido a WebP y limitado a 360 px.

La página no realiza solicitudes a la API de GitHub durante la visita ni espera conexiones a los backends. Se conserva una instantánea fechada en caso de caída de las fuentes públicas.

## Mediciones

Consulta `VALIDATION.md` para distinguir los comandos ejecutados y las limitaciones del entorno. No se publican puntuaciones Lighthouse ni FPS reales sin medición. Para medir una compilación pública o local en tu PC:

```powershell
npm run build
npm run preview
# En otra ventana, con Chrome instalado:
npx lighthouse http://localhost:4173 --view
```

Documentación de Three.js consultada:

- https://threejs.org/manual/pages/cleanup.html
- https://threejs.org/manual/pages/responsive.html
