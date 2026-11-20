import { Database, Braces, GitBranch, Layers, ArrowRight, ShoppingBag, Boxes } from 'lucide-react';
import type { Project } from '../content/projects';
export default function ProjectVisual({ type }: { type: Project['visual'] }) {
  if (type === 'petshop')
    return (
      <div className="project-visual visual-pet">
        <div className="pet-nav">
          <span>✦ Patitas Felices</span>
          <small>Productos · Servicios</small>
        </div>
        <div className="pet-content">
          <div>
            <small>TODO PARA TU COMPAÑERO</small>
            <strong>
              Su felicidad,
              <br />
              nuestra prioridad.
            </strong>
            <span className="pet-badge">
              <ShoppingBag size={10} /> Explorar productos
            </span>
          </div>
          <img
            src={`${import.meta.env.BASE_URL}assets/projects/pet-original.webp`}
            width="180"
            height="132"
            alt="Ilustración original del proyecto Patitas Felices"
            loading="lazy"
          />
        </div>
        <span className="visual-label">Composición con un recurso original del proyecto</span>
      </div>
    );
  if (type === 'portfolio')
    return (
      <div className="project-visual visual-portfolio" aria-hidden="true">
        <div className="portfolio-mini-title">
          <strong>Bryan.</strong>
          <span>Portafolio</span>
        </div>
        <img
          src={`${import.meta.env.BASE_URL}assets/images/chess-hero.webp`}
          loading="lazy"
          alt=""
          width="1250"
          height="938"
        />
      </div>
    );
  const crm = type === 'crm';
  return (
    <div className={`project-visual visual-${type}`}>
      <div className="technical-top">
        <span>
          <i />
          {crm ? 'BOROUGH & LEDGER' : 'NEXO / OPERACIONES CONECTADAS'}
        </span>
        <GitBranch size={12} />
      </div>
      <div className="technical-architecture">
        <div className="technical-node">
          <Layers size={20} />
          <span>{crm ? 'React' : 'Panel web'}</span>
        </div>
        <ArrowRight size={14} />
        <div className="technical-node node-focus">
          {crm ? <Braces size={21} /> : <Boxes size={21} />}
          <span>{crm ? 'Spring Boot' : 'NestJS'}</span>
        </div>
        <ArrowRight size={14} />
        <div className="technical-node">
          <Database size={20} />
          <span>{crm ? 'MySQL' : 'PostgreSQL'}</span>
        </div>
      </div>
      <div className="technical-bottom">
        <span>{crm ? 'CLIENTES · VENTAS · AUDITORÍA' : 'PEDIDOS · STOCK · EVENTOS'}</span>
        <span className="micro-dot" />
      </div>
      <span className="visual-label">Vista de arquitectura · sin captura de la aplicación</span>
    </div>
  );
}
