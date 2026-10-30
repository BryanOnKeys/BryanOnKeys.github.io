# Formulario de contacto

Destino del propietario: `contact.bryanonkeys@gmail.com`. La integración utiliza la API de Web3Forms, compatible con un frontend estático en GitHub Pages. Se retiró FormSubmit porque las comprobaciones reales del 30 de octubre de 2026 devolvieron HTTP 521.

## Estado verificado

El 30 de octubre de 2026 se creó **Portfolio de Bryan - Contacto**, con `contact.bryanonkeys@gmail.com` como único destinatario. Su identificador público está guardado en la variable de repositorio `VITE_CONTACT_ACCESS_KEY`. El [despliegue de activación](https://github.com/BryanOnKeys/BryanOnKeys.github.io/actions/runs/41120402720) terminó correctamente.

Se envió una prueba real desde https://bryanonkeys.github.io/#contacto con asunto **[Portfolio de Bryan] Prueba GitHub Pages - 20261030-01**. Se leyó el mensaje recibido en Gmail y se confirmó su etiqueta **INBOX**, el identificador del cuerpo `BRYAN-PAGES-20261030-01` y el encabezado **Reply-To** con el correo introducido. Esta comprobación usa la recepción real, además de los tests con respuestas simuladas.

## Configuración del envío directo

1. Abrir la cuenta del propietario en https://app.web3forms.com y verificar `contact.bryanonkeys@gmail.com`.
2. Crear un formulario y obtener su **Access Key**. Este UUID es un identificador público diseñado para usarse en el navegador; no es la contraseña de Gmail ni una clave API privada.
3. En el repositorio, Settings → Secrets and variables → Actions → Variables, guardar `VITE_CONTACT_ACCESS_KEY` con ese identificador. El workflow ya lo pasa al build.
4. Ejecutar de nuevo `Publicar en GitHub Pages` desde Actions.
5. Enviar una prueba desde el dominio publicado, verificar la llegada real a Entrada o Spam y comprobar que Responder apunta al correo introducido por el visitante.

Para desarrollo local, copiar `.env.example` a `.env` y completar el mismo identificador público. Nunca guardar contraseñas, tokens de Gmail o claves privadas en variables `VITE_`.

Sin un identificador válido, el formulario **no intenta enviar a un destinatario sin verificar**. Recoge los campos y prepara enlaces a Gmail y a la aplicación de correo; informa que el mensaje aún no se ha enviado. El visitante debe revisarlo y pulsar Enviar en su correo. Esto es una alternativa temporal, no una entrega automática verificada.

## Campos y estados

- Nombre: 2–80 caracteres.
- Correo: formato de email, hasta 254 caracteres.
- Asunto: 3–120 caracteres, sin saltos de línea.
- Mensaje: 5–5000 caracteres; admite pruebas breves.
- Campo señuelo, bloqueo de solicitudes duplicadas y espera máxima de 20 segundos.

El identificador público determina el destinatario. El visitante solo especifica el correo de respuesta. La solicitud utiliza `email` y `replyto`; no permite cambiar el destino. Solo una respuesta HTTP correcta con `success: true` permite limpiar los campos. La interfaz distingue aceptación por el proveedor de recepción verificada en Gmail. Un error HTTP, JSON inválido, una caída o un límite de solicitudes conserva los datos y ofrece continuar por correo.

## Privacidad y comprobación

Con el envío directo activado, nombre, correo, asunto y mensaje se comparten con Web3Forms únicamente al enviar. La interfaz enlaza la política de privacidad del proveedor. Web3Forms puede almacenar los envíos según su configuración y condiciones vigentes; no se afirma que carezca de almacenamiento. El repositorio y el navegador no guardan los mensajes de forma persistente.

Los tests automatizados simulan el transporte y comprueban sus estados. La recepción real se verificó por separado como se describe arriba. Tras un envío aceptado, se restablecen los campos y el estado nativo de validación para evitar bordes de error en el formulario vacío. Si cambia el destinatario o el identificador, se debe repetir la comprobación de entrega.

## Fuentes oficiales

- https://web3forms.com/
- https://docs.web3forms.com/getting-started/api-reference
- https://web3forms.com/privacy
- https://status.web3forms.com/
