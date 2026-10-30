const nexo =
  'https://github.com/BryanOnKeys/nexo-fulfillment/blob/b7003d4af1039e152122474d5dce323f554cf300/';
const crm =
  'https://github.com/BryanOnKeys/borough-ledger-crm/blob/2295fc6704651c5af79bbceeba9ca09f1b247b7a/';
export const architectures = {
  nexo: {
    title: 'NEXO · Arquitectura por eventos',
    nodes: [
      {
        id: 'web',
        label: 'Panel web',
        sub: 'React · TypeScript',
        icon: 'Monitor',
        x: 14,
        y: 23,
        description:
          'Interfaz que consume las APIs de operaciones, documentos y notificaciones; recibe actualizaciones mediante WebSockets.',
        url: nexo + 'apps/web/src/App.tsx',
      },
      {
        id: 'api',
        label: 'Operaciones',
        sub: 'NestJS · Dominio',
        icon: 'Braces',
        x: 49,
        y: 23,
        description:
          'Casos de uso para pedidos e inventario. Reserva existencias, valida transiciones y persiste el evento en la misma transacción.',
        url: nexo + 'apps/operations/src/application/orders.service.ts',
      },
      {
        id: 'db',
        label: 'PostgreSQL',
        sub: 'Datos + outbox',
        icon: 'Database',
        x: 84,
        y: 23,
        description:
          'Datos transaccionales de operaciones y eventos pendientes. El adaptador MikroORM coordina los bloqueos de productos.',
        url: nexo + 'apps/operations/src/infrastructure/mikro-order.store.ts',
      },
      {
        id: 'events',
        label: 'SNS / SQS',
        sub: 'Eventos · Reintentos',
        icon: 'Workflow',
        x: 84,
        y: 73,
        description:
          'Distribución de eventos a los consumidores, con reintentos y colas de mensajes fallidos. En desarrollo, los servicios AWS se emulan con Moto.',
        url: nexo + 'docs/aws.md',
      },
      {
        id: 'docs',
        label: 'Documentos',
        sub: 'PDF · S3 privado',
        icon: 'Files',
        x: 49,
        y: 73,
        description:
          'Servicio con su propia base de datos e inbox; genera documentos internos y los guarda en un bucket privado de S3.',
        url: nexo + 'docs/arquitectura.md',
      },
      {
        id: 'notify',
        label: 'Notificaciones',
        sub: 'Inbox · WebSockets',
        icon: 'Bell',
        x: 14,
        y: 73,
        description:
          'Notificaciones persistentes y WebSockets autenticados. Cada consumidor deduplica eventos en su propia inbox.',
        url: nexo + 'docs/arquitectura.md',
      },
    ],
    edges: [
      ['web', 'api'],
      ['api', 'db'],
      ['db', 'events'],
      ['events', 'docs'],
      ['events', 'notify'],
      ['notify', 'web'],
    ],
  },
  crm: {
    title: 'Borough & Ledger · Aplicación modular',
    nodes: [
      {
        id: 'web',
        label: 'Interfaz',
        sub: 'React · TypeScript',
        icon: 'Monitor',
        x: 14,
        y: 46,
        description: 'Aplicación React organizada en vistas que consumen la API del CRM.',
        url: crm + 'frontend/src/main.tsx',
      },
      {
        id: 'api',
        label: 'API de negocio',
        sub: 'Spring Boot · Java',
        icon: 'Braces',
        x: 49,
        y: 46,
        description:
          'Módulos de clientes, ventas y cotizaciones, con servicios transaccionales y auditoría.',
        url: crm + 'backend/src/main/java/com/boroughledger/crm/customers/CustomerService.java',
      },
      {
        id: 'db',
        label: 'MySQL',
        sub: 'JPA · Flyway',
        icon: 'Database',
        x: 84,
        y: 46,
        description:
          'Persistencia relacional y migraciones versionadas. Las consultas de clientes se filtran por organización.',
        url: crm + 'backend/src/main/java/com/boroughledger/crm/customers/CustomerRepository.java',
      },
      {
        id: 'auth',
        label: 'Autenticación',
        sub: 'Sesión · CSRF',
        icon: 'ShieldCheck',
        x: 49,
        y: 12,
        description:
          'Spring Security conserva el contexto en sesión HTTP, habilita CSRF y utiliza BCrypt para contraseñas.',
        url: crm + 'backend/src/main/java/com/boroughledger/crm/security/SecurityConfig.java',
      },
      {
        id: 'audit',
        label: 'Auditoría',
        sub: 'Cambios trazables',
        icon: 'GitBranch',
        x: 49,
        y: 80,
        description:
          'Crear, actualizar o archivar un cliente registra una entrada de auditoría con el actor y la organización.',
        url: crm + 'backend/src/main/java/com/boroughledger/crm/customers/CustomerService.java',
      },
    ],
    edges: [
      ['web', 'api'],
      ['api', 'db'],
      ['auth', 'api'],
      ['api', 'audit'],
    ],
  },
};
