export interface Skill {
  name: string;
  icon: string;
  color: string;
  detail: string;
  evidence: string;
  status: 'Aplicado en proyectos' | 'En aprendizaje' | 'Por evaluar';
}
const nexo = 'https://github.com/BryanOnKeys/nexo-fulfillment';
const crm = 'https://github.com/BryanOnKeys/borough-ledger-crm';
const here = 'https://github.com/BryanOnKeys/BryanOnKeys.github.io';
export const skillGroups = [
  {
    title: 'Frontend',
    icon: 'PanelsTopLeft',
    color: 'blue',
    skills: [
      {
        name: 'React',
        icon: 'react',
        color: '#61dafb',
        detail: 'Interfaces por componentes en CRM, Nexo y Patitas Felices.',
        evidence: crm + '/tree/main/frontend',
      },
      {
        name: 'TypeScript',
        icon: 'typescript',
        color: '#4d9ffa',
        detail: 'Tipos para contratos, aplicaciones e interfaces.',
        evidence: nexo + '/tree/main/apps',
      },
      {
        name: 'JavaScript',
        icon: 'javascript',
        color: '#efd85a',
        detail: 'Rutas, componentes y lógica de la tienda de mascotas.',
        evidence: 'https://github.com/BryanOnKeys/web-petshop',
      },
      {
        name: 'Vite',
        icon: 'vite',
        color: '#b27bff',
        detail: 'Entorno de desarrollo y compilación de las interfaces.',
        evidence: nexo + '/blob/main/apps/web/package.json',
      },
      {
        name: 'Three.js',
        icon: 'threedotjs',
        color: '#bfc9df',
        detail: 'Geometría, órbitas y renderizado WebGL de este portfolio.',
        evidence: here,
      },
    ],
  },
  {
    title: 'Backend',
    icon: 'Blocks',
    color: 'green',
    skills: [
      {
        name: 'Java',
        icon: 'openjdk',
        color: '#eb8e4d',
        detail: 'Servicios, reglas de negocio y persistencia del CRM.',
        evidence: crm + '/tree/main/backend',
      },
      {
        name: 'Spring Boot',
        icon: 'springboot',
        color: '#77c95d',
        detail: 'API modular, transacciones, sesiones y autorización.',
        evidence: crm + '/tree/main/backend',
      },
      {
        name: 'NestJS',
        icon: 'nestjs',
        color: '#ea6688',
        detail: 'Servicios de operaciones, documentos y notificaciones.',
        evidence: nexo + '/tree/main/apps',
      },
      {
        name: 'Node.js',
        icon: 'nodedotjs',
        color: '#72bd74',
        detail: 'Runtime de los servicios y herramientas de Nexo.',
        evidence: nexo + '/blob/main/package.json',
      },
      {
        name: 'REST',
        icon: 'fastapi',
        color: '#5dbfc6',
        detail: 'Controladores HTTP y contratos de API.',
        evidence: nexo + '/blob/main/apps/operations/src/presentation/controllers.ts',
      },
    ],
  },
  {
    title: 'Datos',
    icon: 'Database',
    color: 'purple',
    skills: [
      {
        name: 'PostgreSQL',
        icon: 'postgresql',
        color: '#8eb8df',
        detail: 'Datos propios de cada servicio en Nexo.',
        evidence: nexo + '/blob/main/docs/arquitectura.md',
      },
      {
        name: 'MySQL',
        icon: 'mysql',
        color: '#60b3d4',
        detail: 'Persistencia relacional y migraciones Flyway del CRM.',
        evidence: crm + '/tree/main/backend/src/main/resources/db/migration',
      },
      {
        name: 'MikroORM',
        icon: 'mikroorm',
        color: '#b8bdcf',
        detail: 'Adaptador de persistencia y bloqueos de stock.',
        evidence: nexo + '/blob/main/apps/operations/src/infrastructure/mikro-order.store.ts',
      },
      {
        name: 'JPA',
        icon: 'hibernate',
        color: '#c3b57d',
        detail: 'Repositorios y entidades de datos en Java.',
        evidence: crm + '/tree/main/backend/src/main/java/com/boroughledger/crm/customers',
      },
    ],
  },
  {
    title: 'DevOps & herramientas',
    icon: 'Container',
    color: 'pink',
    skills: [
      {
        name: 'Docker',
        icon: 'docker',
        color: '#58b3f8',
        detail: 'Entorno local reproducible con servicios y bases de datos.',
        evidence: nexo + '/blob/main/compose.yaml',
      },
      {
        name: 'Git',
        icon: 'git',
        color: '#f4806d',
        detail: 'Historial de código y cambios revisables.',
        evidence: nexo + '/commits/main/',
      },
      {
        name: 'GitHub',
        icon: 'github',
        color: '#d3d8e6',
        detail: 'Código público, revisiones y flujos de integración continua.',
        evidence: here,
      },
      {
        name: 'Actions',
        icon: 'githubactions',
        color: '#6ca4ff',
        detail: 'Validaciones automáticas del repositorio.',
        evidence: nexo + '/blob/main/.github/workflows/ci.yml',
      },
      {
        name: 'AWS',
        icon: 'amazonwebservices',
        color: '#f2b958',
        detail:
          'SNS, SQS y S3 con emulación local e infraestructura declarada. Sin afirmar despliegue en AWS real.',
        evidence: nexo + '/blob/main/docs/aws.md',
      },
    ],
  },
].map((g) => ({
  ...g,
  skills: g.skills.map((s) => ({ ...s, status: 'Aplicado en proyectos' as const })),
}));
