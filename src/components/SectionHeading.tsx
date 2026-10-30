import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <div className="eyebrow">
          <span className="eyebrow-mark">◈</span>
          {eyebrow}
        </div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}
export function ExternalLink({
  href,
  children,
  className = '',
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <ArrowUpRight size={14} aria-hidden="true" />
    </a>
  );
}
