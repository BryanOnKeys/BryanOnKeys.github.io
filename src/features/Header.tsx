import { useEffect, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navigation, profile } from '../content/profile';
export default function Header({ standalone = false }: { standalone?: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('inicio');
  useEffect(() => {
    if (standalone) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
      },
      { rootMargin: '-15% 0px -65% 0px' },
    );
    document.querySelectorAll('main section[id]').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
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
          <span className="brand-symbol">
            B<span>K</span>
            <i>.</i>
          </span>
          <span>
            Bryan<span className="brand-handle"> / developer</span>
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
