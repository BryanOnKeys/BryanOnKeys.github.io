import { ArrowUp } from 'lucide-react';
import { profile } from '../content/profile';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span>
          © {new Date().getFullYear()} {profile.handle}
        </span>
        <a className="back-top" href="#inicio">
          <ArrowUp size={17} aria-hidden="true" /> Volver arriba
        </a>
      </div>
    </footer>
  );
}
