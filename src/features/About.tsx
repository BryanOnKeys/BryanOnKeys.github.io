import { CodeXml, GitBranch, Layers3 } from 'lucide-react';
import { profile } from '../content/profile';

export default function About() {
  return (
    <section id="sobre-mi" className="about-section section light-surface">
      <div className="container about-grid">
        <figure className="identity-card">
          <img
            src={`${import.meta.env.BASE_URL}assets/images/bryan-profile.jpg`}
            alt="Retrato de Bryan"
            width="640"
            height="640"
            loading="lazy"
          />
          <figcaption>@{profile.handle}</figcaption>
        </figure>
        <div className="about-copy">
          <h2>Sobre mí</h2>
          <p>{profile.about}</p>
          <nav className="about-links" aria-label="Explorar el trabajo de Bryan">
            <a href="#stack">
              <Layers3 size={20} aria-hidden="true" /> Tecnologías
            </a>
            <a href="#ingenieria">
              <CodeXml size={20} aria-hidden="true" /> Código de los proyectos
            </a>
            <a href="#github">
              <GitBranch size={20} aria-hidden="true" /> Contribuciones públicas
            </a>
          </nav>
        </div>
      </div>
    </section>
  );
}
