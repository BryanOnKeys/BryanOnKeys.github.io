import { useState } from 'react';
import { ArrowRight, ArrowUpRight, GitFork, CodeXml } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { filters, filterProjects } from '../content/projects';
import { SectionHeading } from '../components/SectionHeading';
import { engineeringUrl } from '../lib/urls';
import ProjectVisual from './ProjectVisual';
export default function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('Todos');
  const reduced = useReducedMotion();
  return (
    <section id="proyectos" className="section projects-section">
      <div className="container">
        <SectionHeading
          eyebrow="PROYECTOS DESTACADOS"
          title="Proyectos reales, soluciones concretas"
          description="Aplicaciones que conectan lógica de negocio, datos y experiencia de usuario."
          action={
            <a
              className="button button-small"
              href="https://github.com/BryanOnKeys?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
            >
              Todos los repositorios <ArrowUpRight size={14} />
            </a>
          }
        />
        <div className="project-filters" aria-label="Filtrar proyectos">
          {filters.map((f) => (
            <button key={f} onClick={() => setFilter(f)} aria-pressed={filter === f}>
              {f === 'Full Stack' ? 'Aplicación completa' : f}
            </button>
          ))}
        </div>
        <motion.div layout={!reduced} className="project-grid">
          <AnimatePresence initial={false}>
            {filterProjects(filter).map((p) => (
              <motion.article
                layout={!reduced}
                initial={{ opacity: 0, y: reduced ? 0 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.18 }}
                className="project-card"
                key={p.id}
              >
                <ProjectVisual type={p.visual} />
                <div className="project-card-body">
                  <div className="project-meta">
                    <span
                      className={`category category-${p.category.toLowerCase().replace(' ', '')}`}
                    >
                      {p.eyebrow.split(' · ')[0]}
                    </span>
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Repositorio de ${p.title}`}
                    >
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <div className="project-tags">
                    {p.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <div className="project-card-footer">
                    <span>
                      <i />
                      {p.status}
                    </span>
                    {p.engineering ? (
                      <a
                        href={engineeringUrl(p.engineering)}
                        aria-label={`Explorar código de ${p.title}`}
                      >
                        <CodeXml size={13} /> Explorar <ArrowRight size={12} />
                      </a>
                    ) : p.demo ? (
                      <a href={p.demo}>
                        Ver inicio <ArrowRight size={12} />
                      </a>
                    ) : (
                      <a href={p.repo} target="_blank" rel="noopener noreferrer">
                        <GitFork size={12} /> Código
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
