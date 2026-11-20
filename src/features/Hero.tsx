import { ArrowDown, ArrowUpRight, FolderGit2, GitPullRequest, MapPin, Users } from 'lucide-react';
import { profile } from '../content/profile';
import { formatGitHubDate, isCommunityItem } from '../lib/github';
import type { GitHubSnapshot } from '../lib/github';

export default function Hero({ github }: { github: GitHubSnapshot }) {
  const login = github.profile.login;
  const activityCount = github.activity.items.filter((item) => isCommunityItem(item, login)).length;
  const stats = [
    {
      value: github.profile.followers,
      label: 'Seguidores',
      Icon: Users,
      href: `${profile.github}?tab=followers`,
    },
    {
      value: github.profile.publicRepositories,
      label: 'Repositorios públicos',
      Icon: FolderGit2,
      href: '#repositorios',
    },
    {
      value: activityCount,
      label: 'Aportes públicos · 30 días',
      Icon: GitPullRequest,
      href: '#github',
    },
  ];
  return (
    <section id="inicio" className="portfolio-hero" aria-labelledby="portfolio-title">
      <div className="container">
        <div className="opening-board">
          <div className="opening-copy">
            <div className="opening-role">Desarrollador Full Stack</div>
            <h1 id="portfolio-title">
              {profile.name}
              <span>.</span>
            </h1>
            <a
              className="opening-handle"
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              @{login} <ArrowUpRight size={15} />
            </a>
            <p>{profile.description}</p>
            <div className="opening-actions">
              <a className="button button-primary" href="#proyectos">
                Explorar proyectos <ArrowDown size={16} />
              </a>
              <a className="button button-secondary" href="#github">
                Ver aportes <ArrowUpRight size={16} />
              </a>
            </div>
            {github.profile.location && (
              <div className="opening-location">
                <MapPin size={14} aria-hidden="true" />
                {github.profile.location}
              </div>
            )}
          </div>
          <div className="opening-image">
            <img
              src={`${import.meta.env.BASE_URL}assets/images/chess-hero.webp`}
              alt=""
              width="1250"
              height="938"
              fetchPriority="high"
            />
          </div>
        </div>
        <div className="opening-stats" aria-label="Datos públicos de GitHub">
          {stats.map(({ value, label, Icon, href }) => (
            <a
              className="opening-stat"
              key={label}
              href={href}
              target={href.startsWith('https:') ? '_blank' : undefined}
              rel={href.startsWith('https:') ? 'noopener noreferrer' : undefined}
            >
              <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <strong>{value}</strong> <span>{label}</span>
              </div>
              <ArrowUpRight className="stat-arrow" size={16} aria-hidden="true" />
            </a>
          ))}
        </div>
        <p className="opening-updated">
          Perfil de GitHub actualizado el{' '}
          <time dateTime={github.profile.updatedAt}>
            {formatGitHubDate(github.profile.updatedAt, true)}
          </time>{' '}
          (Lima)
        </p>
      </div>
    </section>
  );
}
