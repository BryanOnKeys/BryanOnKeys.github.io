import { useState } from 'react';
import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  CircleDot,
  FolderGit2,
  GitPullRequest,
  GitPullRequestArrow,
  MessageSquare,
  Star,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { contributions } from '../content/contributions';
import { profile } from '../content/profile';
import { formatGitHubDate, isCommunityItem } from '../lib/github';
import type { ActivityKind, GitHubActivityItem, GitHubSnapshot } from '../lib/github';

const kinds = {
  pr: { label: 'Pull requests', singular: 'PR', Icon: GitPullRequest },
  issue: { label: 'Issues', singular: 'Issue', Icon: CircleDot },
  review: { label: 'Revisiones', singular: 'Revisión', Icon: GitPullRequestArrow },
  comment: { label: 'Comentarios', singular: 'Comentario', Icon: MessageSquare },
} satisfies Record<ActivityKind, { label: string; singular: string; Icon: typeof GitPullRequest }>;
const filters = ['all', 'pr', 'issue', 'review', 'comment'] as const;
const activityPage = 6;
const statusLabels: Record<string, string> = {
  open: 'Abierto',
  closed: 'Cerrado',
  merged: 'Integrado',
  approved: 'Aprobación emitida',
  changes_requested: 'Cambios solicitados',
};

function ActivityRow({ item }: { item: GitHubActivityItem }) {
  const { singular, Icon } = kinds[item.kind];
  const status = item.state && statusLabels[item.state];
  return (
    <li>
      <a className="activity-row" href={item.url} target="_blank" rel="noopener noreferrer">
        <span className="activity-icon" aria-hidden="true">
          <Icon size={16} />
        </span>
        <span className="activity-detail">
          <span className="activity-meta">
            {singular} <span aria-hidden="true">·</span> {item.repo} #{item.number}
          </span>
          <strong>{item.title}</strong>
        </span>
        <span className="activity-date">
          <time dateTime={item.date}>{formatGitHubDate(item.date)}</time>
          {status && <span>{status}</span>}
        </span>
        <ArrowUpRight className="activity-arrow" size={15} aria-hidden="true" />
      </a>
    </li>
  );
}

function ContributionCalendar({ calendar }: { calendar: GitHubSnapshot['calendar'] }) {
  const firstDay = calendar.days[0].date;
  const lastDay = calendar.days.at(-1)!.date;
  const offset = new Date(`${firstDay}T00:00:00Z`).getUTCDay();
  const weeks = Math.ceil((calendar.days.length + offset) / 7);
  const months = new Intl.DateTimeFormat('es-PE', { month: 'short', timeZone: 'UTC' });

  return (
    <section className="contribution-calendar" aria-labelledby="calendar-title">
      <div className="chess-card-heading">
        <div>
          <h3 id="calendar-title">
            <CalendarDays size={19} aria-hidden="true" /> Calendario del perfil
          </h3>
          <p>
            <strong>{calendar.total}</strong> contribuciones reflejadas en GitHub
          </p>
        </div>
        <a
          className="icon-button"
          href={calendar.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Fuente del calendario de contribuciones"
        >
          <ArrowUpRight size={15} />
        </a>
      </div>
      <div className="calendar-wrap" tabIndex={0} aria-label="Calendario desplazable de GitHub">
        <div className="calendar-dates">
          <div
            className="calendar-months"
            aria-hidden="true"
            style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}
          >
            {calendar.days.map((day, index) =>
              day.date.endsWith('-01') ? (
                <span key={day.date} style={{ gridColumn: Math.floor((index + offset) / 7) + 1 }}>
                  {months.format(new Date(day.date))}
                </span>
              ) : null,
            )}
          </div>
          <div
            className="calendar-days"
            style={{ gridTemplateColumns: `repeat(${weeks}, 1fr)` }}
            role="img"
            aria-label={`${calendar.total} contribuciones registradas entre ${firstDay} y ${lastDay}`}
          >
            {Array.from({ length: offset }, (_, index) => (
              <span key={index} aria-hidden="true" />
            ))}
            {calendar.days.map((day) => (
              <span
                key={day.date}
                className={`calendar-cell level-${day.level}`}
                title={`${day.date} · ${day.count} contribuciones`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="calendar-caption">
        <span>
          Actualizado el{' '}
          <time dateTime={calendar.updatedAt}>{formatGitHubDate(calendar.updatedAt)}</time>
        </span>
        <div className="calendar-legend">
          <span>Menos</span>
          {[0, 1, 2, 3, 4].map((level) => (
            <i key={level} className={`level-${level}`} aria-hidden="true" />
          ))}
          <span>Más</span>
        </div>
      </div>
    </section>
  );
}

export default function GitHubActivity({ snapshot }: { snapshot: GitHubSnapshot }) {
  const [kind, setKind] = useState<(typeof filters)[number]>('all');
  const [includeOwn, setIncludeOwn] = useState(false);
  const [visible, setVisible] = useState(activityPage);
  const items = snapshot.activity.items.filter(
    (item) =>
      (includeOwn || isCommunityItem(item, snapshot.profile.login)) &&
      (kind === 'all' || item.kind === kind),
  );
  const repositories = snapshot.repositories.items.filter((repository) => !repository.fork);

  return (
    <section id="github" className="section github-community">
      <div className="container">
        <SectionHeading
          eyebrow="CÓDIGO ABIERTO"
          title="Comunidad en GitHub"
          description="Reportes de bugs, cambios de código y conversaciones en proyectos de la comunidad."
          action={
            <a
              className="button button-small"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              Abrir perfil <ArrowUpRight size={15} />
            </a>
          }
        />
        <div className="community-board">
          <section className="community-feed" aria-labelledby="activity-title">
            <div className="chess-card-heading">
              <div>
                <h3 id="activity-title">Actividad reciente</h3>
                <p>
                  Actividad pública · {formatGitHubDate(snapshot.activity.since)} a{' '}
                  {formatGitHubDate(snapshot.activity.updatedAt)}
                </p>
              </div>
              <label className="activity-scope">
                <input
                  type="checkbox"
                  checked={includeOwn}
                  onChange={(event) => {
                    setIncludeOwn(event.currentTarget.checked);
                    setVisible(activityPage);
                  }}
                />
                Incluir repositorios propios
              </label>
            </div>
            <div className="activity-filters" role="group" aria-label="Filtrar actividad de GitHub">
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={filter === kind}
                  onClick={() => {
                    setKind(filter);
                    setVisible(activityPage);
                  }}
                >
                  {filter === 'all' ? 'Toda la actividad' : kinds[filter].label}
                </button>
              ))}
            </div>
            <p className="sr-only" role="status">
              {items.length} aportes en esta vista
            </p>
            {items.length ? (
              <ul className="activity-list">
                {items.slice(0, visible).map((item) => (
                  <ActivityRow key={item.url} item={item} />
                ))}
              </ul>
            ) : (
              <p className="activity-empty">No hay aportes de este tipo en el periodo mostrado.</p>
            )}
            <div className="activity-bottom">
              <span>
                Actualizado{' '}
                <time dateTime={snapshot.activity.updatedAt}>
                  {formatGitHubDate(snapshot.activity.updatedAt, true)}
                </time>{' '}
                (Lima)
              </span>
              {items.length > visible && (
                <button
                  className="button button-small"
                  type="button"
                  onClick={() => setVisible(visible + activityPage)}
                >
                  Ver más <ArrowDown size={14} />
                </button>
              )}
            </div>
          </section>
          <aside className="community-highlight" aria-labelledby="community-highlight-title">
            <h3 id="community-highlight-title">Aportes integrados</h3>
            <ul>
              {contributions.map((item) => (
                <li key={item.url}>
                  <a href={item.url} target="_blank" rel="noopener noreferrer">
                    <span>
                      {item.repo} #{item.number}
                    </span>
                    <strong>
                      {item.title} <ArrowUpRight size={16} aria-hidden="true" />
                    </strong>
                    <p>{item.description}</p>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
          <section id="repositorios" className="community-repos" aria-labelledby="repository-title">
            <div className="chess-card-heading">
              <div>
                <h3 id="repository-title">
                  <FolderGit2 size={19} aria-hidden="true" /> Repositorios propios
                </h3>
                <p>Ordenados por el último push</p>
              </div>
              <a
                className="icon-button"
                href={`${profile.github}?tab=repositories`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ver todos los repositorios en GitHub"
              >
                <ArrowUpRight size={15} />
              </a>
            </div>
            <ul className="repository-list">
              {repositories.slice(0, 6).map((repository) => (
                <li key={repository.url}>
                  <a href={repository.url} target="_blank" rel="noopener noreferrer">
                    <span>
                      <strong>{repository.name}</strong>
                      <small>
                        {repository.language && <span>{repository.language}</span>}
                        {repository.pushedAt && (
                          <time dateTime={repository.pushedAt}>
                            {formatGitHubDate(repository.pushedAt)}
                          </time>
                        )}
                      </small>
                    </span>
                    <span
                      className="repository-stars"
                      aria-label={`${repository.stars} ${repository.stars === 1 ? 'estrella' : 'estrellas'}`}
                    >
                      <Star size={13} aria-hidden="true" /> {repository.stars}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="repository-sync">
              Datos de GitHub al{' '}
              <time dateTime={snapshot.repositories.updatedAt}>
                {formatGitHubDate(snapshot.repositories.updatedAt, true)}
              </time>{' '}
              (Lima)
            </p>
          </section>
          <ContributionCalendar calendar={snapshot.calendar} />
        </div>
      </div>
    </section>
  );
}
