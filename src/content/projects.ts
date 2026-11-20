export type ProjectCategory = 'Backend' | 'Frontend' | 'Full Stack';
export interface Project {
  id: 'crm' | 'nexo' | 'petshop' | 'portfolio';
  title: string;
  category: ProjectCategory;
  domain: string;
  description: string;
  tags: string[];
  repo: string;
  engineering?: string;
  demo?: string;
}

export const projects: Project[] = [
  {
    id: 'crm',
    title: 'Borough & Ledger',
    category: 'Full Stack',
    domain: 'Gestión comercial',
    description:
      'CRM para gestionar clientes, oportunidades y cotizaciones. Explora cómo separa los datos por organización y registra los cambios.',
    tags: ['Java', 'Spring Boot', 'React', 'MySQL'],
    repo: 'https://github.com/BryanOnKeys/borough-ledger-crm',
    engineering: 'crm',
  },
  {
    id: 'nexo',
    title: 'NEXO Fulfillment',
    category: 'Backend',
    domain: 'Logística',
    description:
      'Servicios de pedidos e inventario con reservas transaccionales, notificaciones y eventos que se publican después de confirmar los cambios.',
    tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'Docker'],
    repo: 'https://github.com/BryanOnKeys/nexo-fulfillment',
    engineering: 'nexo',
  },
  {
    id: 'petshop',
    title: 'Patitas Felices',
    category: 'Frontend',
    domain: 'Comercio electrónico',
    description:
      'Tienda de mascotas con catálogo por categorías y páginas de producto, publicada como una demo navegable.',
    tags: ['React', 'JavaScript', 'CSS'],
    repo: 'https://github.com/BryanOnKeys/web-petshop',
    demo: 'https://bryanonkeys.github.io/web-petshop/',
  },
  {
    id: 'portfolio',
    title: 'Este portafolio',
    category: 'Frontend',
    domain: 'Código abierto',
    description:
      'Explorador de proyectos y actividad pública de GitHub. El sitio se compila con Vite y se actualiza mediante GitHub Actions.',
    tags: ['React', 'TypeScript', 'GitHub Actions', 'Vite'],
    repo: 'https://github.com/BryanOnKeys/BryanOnKeys.github.io',
  },
];

export const filters = ['Todos', 'Backend', 'Frontend', 'Full Stack'] as const;
export const filterProjects = (filter: (typeof filters)[number]) =>
  projects.filter(
    (project) =>
      filter === 'Todos' ||
      project.category === filter ||
      (filter === 'Backend' && project.category === 'Full Stack'),
  );
