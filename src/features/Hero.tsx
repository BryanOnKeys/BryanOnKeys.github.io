import { lazy, Suspense, useState } from 'react';
import {
  ArrowRight,
  ArrowDown,
  Mail,
  CodeXml,
  Braces,
  Database,
  Container,
  Layers,
  ShieldCheck,
  Pause,
  Play,
} from 'lucide-react';
import { profile } from '../content/profile';
const Sphere = lazy(() => import('../graphics/HeroSphere'));
export default function Hero() {
  const [paused, setPaused] = useState(false);
  return (
    <section id="inicio" className="hero">
      <div className="hero-stars" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <div className="status-pill">
            <span />
            Ingeniería, de la idea al código
          </div>
          <h1>
            Hola, soy
            <br />
            <span className="gradient-text">
              {profile.name}
              <span className="title-dot">.</span>
            </span>
          </h1>
          <div className="hero-role">{profile.title}</div>
          <p className="hero-description">{profile.description}</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#proyectos">
              Explorar proyectos <ArrowRight size={17} />
            </a>
            <a className="button button-secondary" href="#contacto">
              <Mail size={17} /> Hablemos
            </a>
          </div>
          <div className="hero-facts">
            <div>
              <span className="fact-icon purple">
                <CodeXml size={19} />
              </span>
              <p>
                Backend con criterio<small>Java · Spring Boot · NestJS</small>
              </p>
            </div>
            <div>
              <span className="fact-icon blue">
                <Layers size={19} />
              </span>
              <p>
                Interfaces con intención<small>React · TypeScript</small>
              </p>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="sphere-stage">
            <Suspense
              fallback={
                <div className="sphere-fallback" aria-label="Preparando visualización 3D">
                  <div />
                  <div />
                  <div />
                </div>
              }
            >
              <Sphere paused={paused} />
            </Suspense>
          </div>
          <div className="orbit-label orbit-frontend">
            <i className="blue">
              <CodeXml size={17} />
            </i>
            <div>
              Frontend<small>React · TypeScript</small>
            </div>
          </div>
          <div className="orbit-label orbit-backend">
            <i className="green">
              <Braces size={17} />
            </i>
            <div>
              Backend<small>Java · Spring Boot · NestJS</small>
            </div>
          </div>
          <div className="orbit-label orbit-data">
            <i className="cyan">
              <Database size={17} />
            </i>
            <div>
              Bases de datos<small>MySQL · PostgreSQL</small>
            </div>
          </div>
          <div className="orbit-label orbit-cloud">
            <i className="amber">
              <Container size={17} />
            </i>
            <div>
              Cloud & DevOps<small>Docker · GitHub Actions</small>
            </div>
          </div>
          <div className="orbit-label orbit-architecture">
            <i className="purple">
              <Layers size={17} />
            </i>
            <div>
              Arquitectura<small>Dominio · Eventos · APIs</small>
            </div>
          </div>
          <div className="orbit-label orbit-testing">
            <i className="pink">
              <ShieldCheck size={17} />
            </i>
            <div>
              Calidad<small>Pruebas · Trazabilidad</small>
            </div>
          </div>
          <span className="orbit-caption">
            Código, ideas
            <br />y soluciones reales.
          </span>
          <button
            className="scene-control icon-button"
            aria-label={paused ? 'Reanudar animación' : 'Pausar animación'}
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play size={13} /> : <Pause size={13} />}
          </button>
        </div>
      </div>
      <div className="container hero-baseline">
        <span>DE LA LÓGICA A LA EXPERIENCIA</span>
        <a href="#sobre-mi">
          Conoce mi trabajo <ArrowDown size={13} />
        </a>
      </div>
    </section>
  );
}
