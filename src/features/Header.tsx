import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navigation, profile } from '../content/profile';
export default function Header({ standalone = false }: { standalone?: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('inicio');
  useEffect(() => {
    if (standalone) return;
    const sections = [...navigation].reverse();
    const updateActive = () => {
      const current = sections.find(({ id }) => {
        const section = document.getElementById(id);
        return section && section.getBoundingClientRect().top <= 120;
      });
      setActive(current?.id ?? 'inicio');
    };
    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, [standalone]);
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a
          href={standalone ? import.meta.env.BASE_URL : '#inicio'}
          className="brand"
          aria-label="Bryan, ir al inicio"
        >
          <span className="brand-symbol" aria-hidden="true">
            ♞
          </span>
          <span className="brand-name">
            Bryan<span>OnKeys</span>
          </span>
        </a>
        <nav
          className={open ? 'nav is-open' : 'nav'}
          id="main-navigation"
          aria-label="Navegación principal"
        >
          {navigation.map((n) => (
            <a
              key={n.id}
              href={`${standalone ? import.meta.env.BASE_URL : ''}#${n.id}`}
              aria-current={!standalone && active === n.id ? 'location' : undefined}
              onClick={() => setOpen(false)}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <a
          className="button header-cta"
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver GitHub <ArrowUpRight size={15} />
        </a>
        <button
          className="menu-toggle icon-button"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}
