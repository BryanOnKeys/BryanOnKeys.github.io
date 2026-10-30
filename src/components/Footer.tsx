import { ArrowUp } from 'lucide-react';
export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span className="footer-copyright">© {new Date().getFullYear()} Bryan</span>
        <a className="back-top" href="#inicio" aria-label="Volver arriba">
          <span>Volver arriba</span>
          <i>
            <ArrowUp size={18} />
          </i>
        </a>
      </div>
    </footer>
  );
}
