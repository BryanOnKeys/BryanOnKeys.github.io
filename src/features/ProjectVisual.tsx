import type { Project } from '../content/projects';

const covers = {
  crm: {
    file: 'projects/borough-64.webp',
    width: 1100,
    height: 619,
    caption: 'Ilustración conceptual',
  },
  nexo: {
    file: 'projects/nexo-64.webp',
    width: 1100,
    height: 619,
    caption: 'Ilustración conceptual',
  },
  petshop: {
    file: 'projects/patitas-demo.webp',
    width: 1100,
    height: 432,
    caption: 'Captura de la demo pública',
  },
  portfolio: {
    file: 'images/island-64-small.webp',
    width: 760,
    height: 570,
    caption: 'Ilustración de la portada',
  },
} satisfies Record<Project['id'], { file: string; width: number; height: number; caption: string }>;

export default function ProjectVisual({ type }: { type: Project['id'] }) {
  const { file, width, height, caption } = covers[type];
  return (
    <figure className={`project-visual visual-${type}`}>
      <img
        src={`${import.meta.env.BASE_URL}assets/${file}`}
        width={width}
        height={height}
        alt=""
        loading="lazy"
        decoding="async"
      />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
