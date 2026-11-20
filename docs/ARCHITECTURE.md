# Arquitectura

La aplicación es un sitio estático con dos documentos de entrada: `index.html` y `engineering/index.html`. Ambos utilizan la composición React de `src/app/App.tsx`. Vite emite archivos HTML, CSS, JavaScript y recursos locales; no hay un proceso Node requerido después de publicar.

## Separación de responsabilidades

El contenido verificado vive en `src/content`. Cada sección gestiona su estado local: filtro de proyectos, competencia seleccionada, archivo y nota del explorador, nodo de arquitectura y etapa de proceso. Los componentes visuales no consultan las bases de datos de CRM o Nexo.

`EngineeringExplorer` se carga mediante una importación dinámica. Shiki funciona en herramientas de generación, no en el navegador. Sus tokens se muestran con React como texto, sin `dangerouslySetInnerHTML`.

Los repositorios consultados permanecen separados y sin modificaciones. El manifiesto de fuentes fija los commits de los dos backends y una lista de archivos públicos. Cada archivo del explorador conserva el texto íntegro y su enlace de procedencia.

## Estado y rutas

La página principal utiliza anclas nativas. La página independiente lee únicamente el parámetro `project`, aceptando `crm` o `nexo`; el resto vuelve a Nexo. Un cambio de backend reinicia el archivo y la nota para evitar índices de un proyecto anterior. La ruta independiente es un documento estático real y puede recargarse directamente en Pages.

El menú móvil expone `aria-expanded`, se cierra al navegar y admite Escape. Los filtros y los nodos comunican su selección con `aria-pressed`. El explorador conserva desplazamiento interno y foco de teclado.

## Datos públicos

`scripts/sync-github.mjs` compila el perfil, los repositorios y la actividad pública en una instantánea con fechas por sección. Lee los PR e issues del autor, y los comentarios y revisiones que recoge la API de eventos. El calendario procede de los datos públicos del perfil. Si falla una fuente, usa la copia más reciente de esa sección entre la instantánea incluida y la publicada.

La página usa una copia incluida al iniciar y vuelve a consultar `/data/github.json` en el mismo origen. Los enlaces de actividad apuntan a GitHub. El navegador recibe datos públicos y abre los originales desde el sitio.

## Límites de seguridad

La política CSP del HTML de producción limita scripts y fuentes al mismo origen; permite conexiones y formularios exclusivamente a `https://api.web3forms.com` para el contacto; permite estilos inline necesarios para geometrías y colores de tokens. No utiliza secretos ni HTML remoto. Los enlaces externos abren con `noopener noreferrer`. Los source maps están deshabilitados.

GitHub Pages no permite controlar todos los encabezados HTTP. `frame-ancestors` debe establecerse en una cabecera y no se finge como protección mediante una metaetiqueta. En el servidor de desarrollo se retira la CSP del HTML para admitir el cliente HMR de Vite; la compilación de producción la conserva.

## Contacto por correo

`src/lib/contact.ts` valida y normaliza los campos, limita tamaños y rechaza saltos de línea en el asunto. El componente Contact controla solicitudes duplicadas, desactiva los campos mientras envía y cancela la petición al desmontarse o tras 20 segundos. Los errores conservan el mensaje escrito. Una respuesta HTTP fallida, JSON ilegible o activación pendiente no se presenta como éxito.

La recepción directa utiliza Web3Forms y un identificador de formulario público asociado al correo verificado del propietario. No se incluye una contraseña o token de Gmail. Sin ese identificador, el formulario prepara un borrador para enviar desde Gmail. El proveedor recibe los datos únicamente al realizar un envío directo, señalado junto al formulario. La aceptación de la API no certifica por sí sola recepción en la bandeja de entrada.
