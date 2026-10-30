export type ProjectCategory = 'Backend' | 'Frontend' | 'Full Stack';
export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  tags: string[];
  repo: string;
  status: string;
  visual: 'crm' | 'nexo' | 'petshop' | 'portfolio';
  eyebrow: string;
  engineering?: string;
  demo?: string;
}
export const projects: Project[] = [
  {
    id: 'crm',
    title: 'Borough & Ledger',
    category: 'Full Stack',
    eyebrow: 'CRM · Gestión comercial',
    description:
      'Clientes, oportunidades y cotizaciones conectados en una aplicación con trazabilidad y datos por organización.',
    tags: ['Java', 'Spring Boot', 'React', 'MySQL'],
    repo: 'https://github.com/BryanOnKeys/borough-ledger-crm',
    status: 'Código disponible',
    visual: 'crm',
    engineering: 'crm',
  },
  {
    id: 'nexo',
    title: 'NEXO Fulfillment',
    category: 'Backend',
    eyebrow: 'Operaciones · Sistemas distribuidos',
    description:
      'Pedidos e inventario con reservas transaccionales, eventos, documentos y notificaciones entre servicios.',
    tags: ['NestJS', 'TypeScript', 'PostgreSQL', 'Docker'],
    repo: 'https://github.com/BryanOnKeys/nexo-fulfillment',
    status: 'Entorno local con Docker',
    visual: 'nexo',
    engineering: 'nexo',
  },
  {
    id: 'petshop',
    title: 'Patitas Felices',
    category: 'Frontend',
    eyebrow: 'Experiencia web · Tienda de mascotas',
    description:
      'Interfaz de una tienda de mascotas: navegación por categorías, vistas de productos y componentes reutilizables.',
    tags: ['React', 'JavaScript', 'CSS'],
    repo: 'https://github.com/BryanOnKeys/web-petshop',
    status: 'Proyecto de interfaz',
    visual: 'petshop',
  },
  {
    id: 'portfolio',
    title: 'Este portfolio',
    category: 'Frontend',
    eyebrow: 'Creative development · WebGL',
    description:
      'Una esfera programada, código navegable y arquitectura interactiva. La experiencia que estás explorando.',
    tags: ['React', 'TypeScript', 'Three.js', 'Vite'],
    repo: 'https://github.com/BryanOnKeys/BryanOnKeys.github.io',
    status: 'Estás aquí',
    visual: 'portfolio',
    demo: '#inicio',
  },
];
export const filters = ['Todos', 'Backend', 'Frontend', 'Full Stack'] as const;
export const filterProjects = (filter: (typeof filters)[number]) =>
  projects.filter(
    (p) =>
      filter === 'Todos' ||
      p.category === filter ||
      (filter === 'Backend' && p.category === 'Full Stack'),
  );
