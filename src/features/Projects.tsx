import { useState } from 'react';
import { CodeXml, GitFork, Monitor } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { filters, filterProjects } from '../content/projects';
import { SectionHeading } from '../components/SectionHeading';
import { profile } from '../content/profile';
import { engineeringUrl } from '../lib/urls';
import ProjectVisual from './ProjectVisual';

export default function Projects() {
  const [filter, setFilter] = useState<(typeof filters)[number]>('Todos');
  const reduced = useReducedMotion();
  const projects = filterProjects(filter);
  return (
    <section id="proyectos" className="section projects-section light-surface">
      <div className="container">
        <SectionHeading
          title="Proyectos seleccionados"
          action={
            <a
              className="button button-small"
              href={`${profile.github}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitFork size={16} aria-hidden="true" /> Todos los repositorios
            </a>
          }
        />
        <div className="project-filters filter-group" role="group" aria-label="Filtrar proyectos">
          {filters.map((value) => (
            <button
              type="button"
              key={value}
              onClick={() => setFilter(value)}
              aria-pressed={filter === value}
            >
              {value === 'Full Stack' ? 'Aplicación completa' : value}
            </button>
          ))}
        </div>
        <motion.div layout={!reduced} className="project-grid">
          <AnimatePresence initial={false}>
            {projects.map((project) => (
              <motion.article
                layout={!reduced}
                initial={{ opacity: 0, y: reduced ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0 : 0.16 }}
                className="project-card"
                key={project.id}
              >
                <ProjectVisual type={project.id} />
                <div className="project-card-body">
                  <p className="project-category">
                    {project.category} <span>·</span> {project.domain}
                  </p>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <ul className="project-tags" aria-label="Tecnologías">
                    {project.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                  <div className="project-card-footer">
                    {project.engineering && (
                      <a
                        className="button button-small button-primary"
                        href={engineeringUrl(project.engineering)}
                        aria-label={`Explorar código de ${project.title}`}
                      >
                        <CodeXml size={16} aria-hidden="true" /> Explorar código
                      </a>
                    )}
                    {project.demo && (
                      <a className="button button-small button-primary" href={project.demo}>
                        <Monitor size={16} aria-hidden="true" /> Ver demo
                      </a>
                    )}
                    <a
                      className="button button-small"
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Repositorio de ${project.title}`}
                    >
                      <GitFork size={15} aria-hidden="true" /> Repositorio
                    </a>
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
