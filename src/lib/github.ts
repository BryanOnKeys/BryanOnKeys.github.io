import { useEffect, useState } from 'react';
import seed from '../content/generated/github.json';

export type ActivityKind = 'pr' | 'issue' | 'review' | 'comment';

export interface GitHubActivityItem {
  kind: ActivityKind;
  repo: string;
  title: string;
  number: number;
  url: string;
  date: string;
  state: string | null;
}

export interface GitHubSnapshot {
  schemaVersion: number;
  profile: {
    updatedAt: string;
    login: string;
    followers: number;
    publicRepositories: number;
    location: string | null;
  };
  repositories: {
    updatedAt: string;
    items: {
      name: string;
      url: string;
      language: string | null;
      stars: number;
      fork: boolean;
      pushedAt: string | null;
    }[];
  };
  activity: {
    updatedAt: string;
    since: string;
    items: GitHubActivityItem[];
  };
  calendar: {
    updatedAt: string;
    sourceUrl: string;
    total: number;
    days: { date: string; count: number; level: number }[];
  };
}

export function isCommunityItem(item: GitHubActivityItem, login: string) {
  return item.repo.split('/')[0].toLowerCase() !== login.toLowerCase();
}

const limaDate = new Intl.DateTimeFormat('es-PE', {
  dateStyle: 'medium',
  timeZone: 'America/Lima',
});
const limaTime = new Intl.DateTimeFormat('es-PE', {
  dateStyle: 'medium',
  timeStyle: 'short',
  timeZone: 'America/Lima',
});
export function formatGitHubDate(value: string, withTime = false) {
  return (withTime ? limaTime : limaDate).format(new Date(value));
}

export function useGitHubSnapshot() {
  const [snapshot, setSnapshot] = useState<GitHubSnapshot>(seed as GitHubSnapshot);
  useEffect(() => {
    if (import.meta.env.DEV) return;

    let request: AbortController | undefined;
    async function refresh() {
      if (request || document.visibilityState === 'hidden') return;
      request = new AbortController();
      const signal = request.signal;
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}data/github.json`, {
          cache: 'no-cache',
          signal: AbortSignal.any([signal, AbortSignal.timeout(10000)]),
        });
        if (!response.ok) return;
        const next: GitHubSnapshot = await response.json();
        if (
          !signal.aborted &&
          next.schemaVersion === 1 &&
          next.profile?.login === seed.profile.login
        )
          setSnapshot((current) => ({
            schemaVersion: next.schemaVersion,
            profile:
              next.profile.updatedAt >= current.profile.updatedAt ? next.profile : current.profile,
            repositories:
              next.repositories?.updatedAt >= current.repositories.updatedAt
                ? next.repositories
                : current.repositories,
            activity:
              next.activity?.updatedAt >= current.activity.updatedAt
                ? next.activity
                : current.activity,
            calendar:
              next.calendar?.updatedAt >= current.calendar.updatedAt
                ? next.calendar
                : current.calendar,
          }));
      } catch {
        // The bundled data remains available if the network is interrupted.
      } finally {
        request = undefined;
      }
    }
    void refresh();
    const timer = window.setInterval(refresh, 10 * 60 * 1000);
    document.addEventListener('visibilitychange', refresh);
    return () => {
      request?.abort();
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);
  return snapshot;
}
