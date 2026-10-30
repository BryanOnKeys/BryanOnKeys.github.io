# Formulario de contacto

Destino del propietario: `contact.bryanonkeys@gmail.com`. La integración utiliza la API de Web3Forms, compatible con un frontend estático en GitHub Pages. Se retiró FormSubmit porque las comprobaciones reales del 30 de octubre de 2026 devolvieron HTTP 521.

## Activar el envío directo

1. El propietario debe crear o abrir su cuenta en https://app.web3forms.com y verificar `contact.bryanonkeys@gmail.com`.
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

Los tests simulan el transporte y comprueban sus estados; no certifican la bandeja de entrada. No se ha confirmado recepción real hasta completar el paso 5. Crear la cuenta requiere que el propietario acepte las condiciones del proveedor.

## Fuentes oficiales

- https://web3forms.com/
- https://docs.web3forms.com/getting-started/api-reference
- https://web3forms.com/privacy
- https://status.web3forms.com/
