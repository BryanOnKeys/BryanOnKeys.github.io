import { CodeXml, Lightbulb, ShieldCheck, Compass, GitBranch, Check } from 'lucide-react';
import { profile } from '../content/profile';
export default function About() {
  return (
    <section id="sobre-mi" className="about-section">
      <div className="container about-grid">
        <div className="identity-card identity-photo">
          <img
            src={`${import.meta.env.BASE_URL}assets/images/bryan-profile.jpg`}
            alt="Foto de perfil de Bryan"
            width="640"
            height="640"
            loading="lazy"
          />
          <div className="identity-caption">
            <span className="mono">&lt;Bryan /&gt;</span>
            <small>Ideas que toman forma en código</small>
          </div>
        </div>
        <div className="about-copy">
          <div className="eyebrow">◈ SOBRE MÍ</div>
          <h2>
            De una idea a una
            <br className="desktop-break" />
            <span className="gradient-text"> solución que funciona.</span>
          </h2>
          <p>{profile.about}</p>
          <div className="about-tags">
            <span>
              <GitBranch size={14} /> Código público
            </span>
            <span>
              <CodeXml size={14} /> Aplicaciones web
            </span>
            <span>
              <Check size={14} /> Mejora continua
            </span>
          </div>
        </div>
        <div className="principles">
          <div>
            <i className="cyan">
              <Lightbulb size={18} />
            </i>
            <p>
              Primero, el problema.<small>Entender antes de implementar.</small>
            </p>
          </div>
          <div>
            <i className="blue">
              <ShieldCheck size={18} />
            </i>
            <p>
              Calidad con fundamento.<small>Arquitectura, datos y pruebas.</small>
            </p>
          </div>
          <div>
            <i className="amber">
              <Compass size={18} />
            </i>
            <p>
              Siempre en evolución.<small>Aprender, construir y compartir.</small>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
