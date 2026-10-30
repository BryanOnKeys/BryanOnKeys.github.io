import { GitPullRequest, ArrowUpRight, GitFork, Users, Star, ExternalLink } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { profile } from '../content/profile';
import { contributions } from '../content/contributions';
import activity from '../content/generated/activity.json';
export default function GitHubActivity() {
  const stats = [
    { value: activity.repositories.length, label: 'Repos públicos', Icon: GitFork },
    {
      value: activity.repositories.reduce((sum, r) => sum + r.stars, 0),
      label: 'Estrellas',
      Icon: Star,
    },
    { value: activity.followers, label: 'Seguidores', Icon: Users },
  ];
  const date = new Intl.DateTimeFormat('es-PE', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(activity.updatedAt));
  return (
    <section id="github" className="section github-section">
      <div className="container">
        <SectionHeading
          eyebrow="GITHUB Y CÓDIGO ABIERTO"
          title="Construir. Compartir. Contribuir."
          description="Proyectos propios y aportes a herramientas de la comunidad."
          action={
            <a
              className="button button-small"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ver mi GitHub <ArrowUpRight size={14} />
            </a>
          }
        />
        <div className="github-grid">
          <div className="github-profile">
            <div className="github-identity">
              <div className="avatar-monogram">
                B<span>.</span>
              </div>
              <div>
                <h3>{profile.name}</h3>
                <a href={profile.github} target="_blank" rel="noopener noreferrer">
                  @{profile.handle}
                </a>
              </div>
            </div>
            <p>
              APIs, aplicaciones web y decisiones de arquitectura que puedes explorar en el código.
            </p>
            <div className="github-stats">
              {stats.map(({ value, label, Icon }) => (
                <div key={label}>
                  <strong>{value}</strong>
                  <span>
                    <Icon size={11} />
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="contribution-calendar">
            <div className="calendar-heading">
              <h3>Un año de contribuciones</h3>
              <a
                href={activity.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Fuente del calendario de contribuciones"
              >
                <ExternalLink size={13} />
              </a>
            </div>
            <div className="calendar-months" aria-hidden="true">
              {[
                'Nov',
                'Dic',
                'Ene',
                'Feb',
                'Mar',
                'Abr',
                'May',
                'Jun',
                'Jul',
                'Ago',
                'Sep',
                'Oct',
              ].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
            <div className="calendar-wrap">
              <div
                className="calendar-days"
                role="img"
                aria-label={`${activity.calendar.total} contribuciones públicas en el periodo ${activity.calendar.days[0].date} a ${activity.calendar.days.at(-1)?.date}`}
              >
                {activity.calendar.days.map((d) => (
                  <span
                    key={d.date}
                    className={`calendar-cell level-${d.level}`}
                    title={`${d.date}: ${d.count} contribuciones`}
                  />
                ))}
              </div>
            </div>
            <div className="calendar-bottom">
              <span>
                <strong>{activity.calendar.total}</strong> contribuciones públicas
              </span>
              <div className="calendar-legend">
                <span>Menos</span>
                {[0, 1, 2, 3, 4].map((l) => (
                  <i key={l} className={`level-${l}`} />
                ))}
                <span>Más</span>
              </div>
            </div>
            <small className="snapshot-date">
              Instantánea: {date} · Periodo publicado por GitHub
            </small>
          </div>
          <div className="contributions">
            <h3>Aportes integrados</h3>
            {contributions.map((c) => (
              <a
                className="contribution"
                href={c.url}
                key={c.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitPullRequest size={17} />
                <div>
                  <strong>{c.title}</strong>
                  <small>
                    {c.repo} #{c.number}
                  </small>
                  <span>{c.description}</span>
                </div>
                <ArrowUpRight size={12} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
