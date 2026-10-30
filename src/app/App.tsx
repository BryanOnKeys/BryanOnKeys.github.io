import { lazy, Suspense } from 'react';
import { MotionConfig } from 'motion/react';
import Header from '../features/Header';
import Hero from '../features/Hero';
import About from '../features/About';
import Skills from '../features/Skills';
import Projects from '../features/Projects';
import Architecture from '../features/Architecture';
import GitHubActivity from '../features/GitHubActivity';
import Contact from '../features/Contact';
import Footer from '../components/Footer';
const EngineeringExplorer = lazy(() => import('../features/EngineeringExplorer'));
export default function App() {
  const standalone = window.location.pathname.includes('/engineering');
  const initialProject = new URLSearchParams(window.location.search).get('project') || 'nexo';
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <Header standalone={standalone} />
      <main id="contenido">
        {standalone ? (
          <>
            <div className="container explorer-intro">
              <a className="text-link" href={import.meta.env.BASE_URL}>
                ← Volver al portfolio
              </a>
              <h1>
                Backend Engineering Explorer<span>.</span>
              </h1>
              <p>Dos proyectos. Código real. Decisiones que puedes comprobar.</p>
            </div>
            <Suspense
              fallback={
                <div className="section-loading" role="status">
                  Cargando archivos del explorador…
                </div>
              }
            >
              <EngineeringExplorer standalone initialProject={initialProject} />
            </Suspense>
          </>
        ) : (
          <>
            <Hero />
            <About />
            <Skills />
            <Projects />
            <Suspense
              fallback={
                <div className="section-loading" role="status">
                  Preparando explorador técnico…
                </div>
              }
            >
              <EngineeringExplorer />
            </Suspense>
            <Architecture />
            <GitHubActivity />
            <Contact />
          </>
        )}
      </main>
      {!standalone && <Footer />}
    </MotionConfig>
  );
}
