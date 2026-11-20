import { FolderGit2, GitPullRequest, MapPin, Users } from 'lucide-react';
import { profile } from '../content/profile';
import { formatGitHubDate, isCommunityItem } from '../lib/github';
import type { GitHubSnapshot } from '../lib/github';

export default function Hero({ github }: { github: GitHubSnapshot }) {
  const { profile: account, activity } = github;
  const communityCount = activity.items.filter((item) =>
    isCommunityItem(item, account.login),
  ).length;
  const metrics = [
    {
      value: account.followers,
      label: 'Seguidores',
      href: `${profile.github}?tab=followers`,
      Icon: Users,
    },
    {
      value: account.publicRepositories,
      label: 'Repositorios públicos',
      href: '#repositorios',
      Icon: FolderGit2,
    },
    {
      value: communityCount,
      label: 'Aportes públicos · 30 días',
      href: '#github',
      Icon: GitPullRequest,
    },
  ];
  const images = `${import.meta.env.BASE_URL}assets/images/`;

  return (
    <section id="inicio" aria-labelledby="portfolio-title" className="hero">
      <div className="container">
        <div className="hero-layout">
          <div className="hero-copy">
            <p className="hero-role">Desarrollador Full Stack</p>
            <h1 id="portfolio-title">
              {profile.name}
              <span>OnKeys</span>
            </h1>
            <p className="hero-description">{profile.description}</p>
            <div className="hero-actions">
              <a className="button button-primary" href="#proyectos">
                Explorar proyectos
              </a>
              <a className="button button-secondary" href="#github">
                <GitPullRequest size={17} aria-hidden="true" /> Ver aportes
              </a>
            </div>
            {account.location && (
              <p className="hero-location">
                <MapPin size={15} aria-hidden="true" /> {account.location}
              </p>
            )}
          </div>
          <div className="hero-visual">
            <div className="hero-image">
              <img
                src={`${images}island-64.webp`}
                srcSet={`${images}island-64-small.webp 760w, ${images}island-64.webp 1340w`}
                sizes="(max-width: 760px) calc(100vw - 40px), (max-width: 1300px) 54vw, 685px"
                alt=""
                width="1340"
                height="1005"
                fetchPriority="high"
              />
            </div>
            <div className="hero-visual-caption">
              <span>
                Java <b>·</b> TypeScript <b>·</b> React
              </span>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                @{account.login}
              </a>
            </div>
          </div>
        </div>
        <div className="hero-metrics" role="group" aria-label="Datos públicos de GitHub">
          {metrics.map(({ value, label, href, Icon }) => (
            <a
              className="hero-metric"
              href={href}
              key={label}
              target={href.startsWith('https:') ? '_blank' : undefined}
              rel={href.startsWith('https:') ? 'noopener noreferrer' : undefined}
            >
              <Icon size={22} aria-hidden="true" />
              <span>
                <strong>{value}</strong> <span>{label}</span>
              </span>
            </a>
          ))}
        </div>
        <p className="hero-updated">
          Perfil actualizado el{' '}
          <time dateTime={account.updatedAt}>{formatGitHubDate(account.updatedAt, true)}</time>{' '}
          (Lima)
        </p>
      </div>
    </section>
  );
}
