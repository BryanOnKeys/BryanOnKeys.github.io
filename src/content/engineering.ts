export const engineeringNotes = {
  nexo: [
    {
      title: 'Arquitectura',
      icon: 'Boxes',
      text: 'Dominio independiente del framework. El caso de uso depende del puerto OrderStore, con un adaptador MikroORM.',
      file: 0,
    },
    {
      title: 'Seguridad',
      icon: 'ShieldCheck',
      text: 'Contraseñas derivadas con scrypt y sal aleatoria; comparación con timingSafeEqual. Esto describe el código, no una auditoría de producción.',
      file: 3,
    },
    {
      title: 'Pruebas',
      icon: 'FlaskConical',
      text: 'Pruebas de reservas, stock cero, dinero en céntimos y transiciones de pedidos con node:test.',
      file: 4,
    },
    {
      title: 'Decisiones técnicas',
      icon: 'GitBranch',
      text: 'La misma transacción persiste el pedido y su evento. Outbox e inbox admiten reintentos y entrega al menos una vez.',
      file: 5,
    },
    {
      title: 'Funcionamiento',
      icon: 'Workflow',
      text: 'Crear un pedido valida permisos, consolida cantidades, bloquea la petición y reserva existencias.',
      file: 0,
    },
    {
      title: 'Para una entrevista',
      icon: 'MessageSquare',
      text: '¿Qué ocurre al repetir una petición? Una clave y un contenido idénticos devuelven el mismo pedido. Un contenido distinto produce IDEMPOTENCY_CONFLICT.',
      file: 0,
    },
  ],
  crm: [
    {
      title: 'Arquitectura',
      icon: 'Boxes',
      text: 'Aplicación Spring Boot organizada en módulos. Los servicios coordinan repositorios, transacciones y auditoría.',
      file: 0,
    },
    {
      title: 'Seguridad',
      icon: 'ShieldCheck',
      text: 'Sesiones HTTP, CSRF y BCrypt en la configuración. Las consultas de clientes incluyen la organización del usuario.',
      file: 2,
    },
    {
      title: 'Pruebas',
      icon: 'FlaskConical',
      text: 'CustomerServiceTest verifica el alcance por organización, la auditoría y el comportamiento de los clientes.',
      file: 3,
    },
    {
      title: 'Decisiones técnicas',
      icon: 'GitBranch',
      text: 'Migraciones Flyway versionadas. El esquema relacional conserva las relaciones y restricciones del CRM.',
      file: 4,
    },
    {
      title: 'Funcionamiento',
      icon: 'Workflow',
      text: 'El listado pagina resultados y limita el tamaño a 50 registros. Archivar conserva trazabilidad en lugar de borrar el cliente.',
      file: 0,
    },
    {
      title: 'Para una entrevista',
      icon: 'MessageSquare',
      text: '¿Cómo se aísla una organización? La consulta combina id y organizationId; un registro ajeno recibe el mismo 404 que uno inexistente.',
      file: 1,
    },
  ],
};
