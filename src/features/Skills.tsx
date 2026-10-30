import { useState } from 'react';
import {
  PanelsTopLeft,
  Blocks,
  Database,
  Container,
  ArrowRight,
  X,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { skillGroups } from '../content/skills';
import type { Skill } from '../content/skills';
import EvidenceMetric from '../components/EvidenceMetric';
import { SectionHeading } from '../components/SectionHeading';
const icons = [PanelsTopLeft, Blocks, Database, Container];
export default function Skills() {
  const [selected, setSelected] = useState<Skill | null>(null);
  const [more, setMore] = useState(false);
  return (
    <section id="stack" className="section stack-section">
      <div className="container">
        <SectionHeading
          eyebrow="STACK TECNOLÓGICO"
          title="Tecnologías y herramientas"
          description="Cada herramienta tiene un propósito. Cada competencia, una evidencia."
          action={
            <button
              className="button button-small"
              onClick={() => setMore(!more)}
              aria-expanded={more}
            >
              {' '}
              {more ? 'Ver resumen' : 'Ver enfoque completo'} <ArrowRight size={14} />
            </button>
          }
        />
        <div className="stack-grid">
          {skillGroups.map((group, index) => {
            const Icon = icons[index];
            return (
              <div className="stack-card" key={group.title}>
                <h3>
                  <i className={group.color}>
                    <Icon size={17} />
                  </i>
                  {group.title}
                </h3>
                <div className="skill-list">
                  {group.skills.map((skill) => (
                    <button
                      key={skill.name}
                      className="skill"
                      onClick={() => setSelected(skill)}
                      aria-label={`Ver evidencia de ${skill.name}`}
                      aria-pressed={selected?.name === skill.name}
                    >
                      <img
                        src={`${import.meta.env.BASE_URL}assets/icons/${skill.icon}.svg`}
                        alt=""
                        width="29"
                        height="29"
                        loading="lazy"
                        style={{ color: skill.color }}
                      />
                      <span>{skill.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        {selected && (
          <div className="skill-detail" role="status">
            <div>
              <CheckCircle2 size={18} />
              <div>
                <strong>{selected.name}</strong>
                <EvidenceMetric status={selected.status} />
                <p>{selected.detail}</p>
              </div>
            </div>
            <a href={selected.evidence} target="_blank" rel="noopener noreferrer">
              Ver evidencia <ExternalLink size={14} />
            </a>
            <button
              className="icon-button"
              onClick={() => setSelected(null)}
              aria-label="Cerrar detalle de tecnología"
            >
              <X size={17} />
            </button>
          </div>
        )}
        {more && (
          <div className="stack-more">
            <div>
              <h3>Calidad y pruebas</h3>
              <p>
                JUnit en el CRM; pruebas de dominio e integración en Nexo. Vitest y Testing Library
                para los comportamientos de este portfolio.
              </p>
            </div>
            <div>
              <h3>Aprendizaje con evidencia</h3>
              <p>
                Las herramientas se muestran como aplicadas en proyectos. Los porcentajes requieren
                una evaluación objetiva; no representan niveles inventados.
              </p>
            </div>
            <div>
              <h3>Infraestructura consciente</h3>
              <p>
                Nexo incluye Docker e infraestructura AWS declarada. Su emulación local no se
                presenta como un despliegue en una cuenta AWS real.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
