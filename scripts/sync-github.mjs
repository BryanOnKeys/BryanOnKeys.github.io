import { readFile, writeFile } from 'node:fs/promises';

const login = 'BryanOnKeys';
const api = 'https://api.github.com';
const website = 'https://github.com';
const site = 'https://bryanonkeys.github.io';
const snapshotFile = 'src/content/generated/github.json';
const calendarSource = `${website}/${login}/blob/main/profile/data.json`;
const generatedAt = new Date().toISOString();
const since = new Date(Date.now() - 30 * 86400000).toISOString();
const isCount = (n) => Number.isSafeInteger(n) && n >= 0;
const isDate = (value) => typeof value === 'string' && Number.isFinite(Date.parse(value));
const isRepo = (value) => typeof value === 'string' && /^[\w.-]+\/[\w.-]+$/.test(value);
const isBryan = (value) => typeof value === 'string' && value.toLowerCase() === login.toLowerCase();

async function json(url, headers = {}) {
  const response = await fetch(url, {
    headers,
    signal: AbortSignal.timeout(12000),
    redirect: 'error',
  });
  if (!response.ok) {
    const error = new Error(`HTTP ${response.status} en ${new URL(url).pathname}`);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

async function github(path) {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'BryanOnKeys-Portfolio' };
  const token = process.env.GH_TOKEN;
  if (token) {
    try {
      return await json(api + path, { ...headers, Authorization: `Bearer ${token}` });
    } catch (error) {
      if (![401, 403, 429].includes(error.status)) throw error;
    }
  }
  return json(api + path, headers);
}

async function pages(path, limit) {
  const items = [];
  const separator = path.includes('?') ? '&' : '?';
  for (let page = 1; page <= limit; page++) {
    const batch = await github(`${path}${separator}per_page=100&page=${page}`);
    if (!Array.isArray(batch)) throw new Error('Se esperaba una lista de GitHub');
    items.push(...batch);
    if (batch.length < 100) return items;
  }
  return items;
}

async function profile() {
  const user = await github(`/users/${login}`);
  if (!isBryan(user.login) || !isCount(user.followers) || !isCount(user.public_repos))
    throw new Error('El perfil público no tiene el formato esperado');
  return {
    updatedAt: generatedAt,
    login: user.login,
    followers: user.followers,
    publicRepositories: user.public_repos,
    location: typeof user.location === 'string' ? user.location : null,
  };
}

async function repositories() {
  const repos = await pages(`/users/${login}/repos?type=owner&sort=pushed&direction=desc`, 4);
  return {
    updatedAt: generatedAt,
    items: repos
      .filter((repo) => isRepo(repo.full_name) && isBryan(repo.owner?.login) && !repo.private)
      .map((repo) => ({
        name: repo.name,
        url: `${website}/${repo.full_name}`,
        language: repo.language,
        stars: repo.stargazers_count,
        fork: repo.fork,
        pushedAt: isDate(repo.pushed_at) ? repo.pushed_at : null,
      })),
  };
}

function itemLink(value, repo) {
  if (typeof value !== 'string' || !isRepo(repo)) return null;
  const prefix = `${website}/${repo}/`;
  if (!value.toLowerCase().startsWith(prefix.toLowerCase())) return null;
  const match = value.slice(prefix.length).match(/^(?:issues|pull)\/(\d+)(?:#[\w-]+)?$/);
  return match ? { url: value, number: Number(match[1]) } : null;
}

async function authored(kind) {
  const query = new URLSearchParams({
    q: `is:public author:${login} is:${kind} created:>=${since.slice(0, 10)}`,
    sort: 'created',
    order: 'desc',
    per_page: '100',
  });
  const result = await github(`/search/issues?${query}`);
  if (!Array.isArray(result.items) || result.incomplete_results)
    throw new Error('GitHub devolvió una búsqueda incompleta');
  const entries = [];
  for (const item of result.items) {
    const repo = item.repository_url?.slice(`${api}/repos/`.length);
    const link = itemLink(item.html_url, repo);
    if (!link || !isBryan(item.user?.login) || !isDate(item.created_at) || item.created_at < since)
      continue;
    entries.push({
      ...link,
      repo,
      kind,
      title: item.title,
      date: item.created_at,
      state: item.pull_request?.merged_at ? 'merged' : item.state,
    });
  }
  return entries;
}

function interactions(events) {
  const items = [];
  for (const event of events) {
    const payload = event.payload;
    if (
      !event.public ||
      !isBryan(event.actor?.login) ||
      payload?.action !== 'created' ||
      !isDate(event.created_at) ||
      event.created_at < since
    )
      continue;

    const repo = event.repo?.name;
    const isReview = event.type === 'PullRequestReviewEvent';
    if (
      !isReview &&
      event.type !== 'IssueCommentEvent' &&
      event.type !== 'PullRequestReviewCommentEvent'
    )
      continue;
    const author = isReview ? payload.review?.user : payload.comment?.user;
    const link = itemLink(isReview ? payload.review?.html_url : payload.comment?.html_url, repo);
    if (!link || !link.url.includes('#') || !isBryan(author?.login)) continue;
    items.push({
      ...link,
      repo,
      kind: isReview ? 'review' : 'comment',
      title: payload.issue?.title ?? payload.pull_request?.title ?? '',
      date: event.created_at,
      state: isReview ? (payload.review.state?.toLowerCase() ?? null) : null,
    });
  }
  return items;
}

async function activity() {
  const [events, issues, prs] = await Promise.all([
    pages(`/users/${login}/events/public`, 3),
    authored('issue'),
    authored('pr'),
  ]);
  const items = [...issues, ...prs, ...interactions(events)].sort((a, b) =>
    b.date.localeCompare(a.date),
  );
  const seen = new Set();
  const entries = items.filter(({ url }) => {
    if (seen.has(url)) return false;
    seen.add(url);
    return true;
  });
  const titles = new Map();
  for (const item of entries) {
    if (item.title) titles.set(item.url.split('#')[0], item.title);
  }
  const untitled = [
    ...new Map(
      entries
        .filter((item) => !titles.has(item.url.split('#')[0]))
        .map((item) => [item.url.split('#')[0], item]),
    ).values(),
  ].slice(0, 12);
  await Promise.all(
    untitled.map(async ({ url, repo, number }) => {
      const parent = url.split('#')[0];
      try {
        const item = await github(`/repos/${repo}/issues/${number}`);
        if (item.html_url === parent && item.title) titles.set(parent, item.title);
      } catch {
        // GitHub sometimes omits PR titles in its events. The numbered link still works.
      }
    }),
  );
  return {
    updatedAt: generatedAt,
    since,
    items: entries.map((item) => ({
      ...item,
      title:
        titles.get(item.url.split('#')[0]) ||
        `${item.url.includes('/pull/') ? 'Pull request' : 'Issue'} #${item.number}`,
    })),
  };
}

async function calendar() {
  const url = `https://raw.githubusercontent.com/${login}/${login}/main/profile/data.json`;
  const data = await json(url);
  const days = data.calendar?.days;
  if (
    !isBryan(data.login) ||
    !isDate(data.updatedAt) ||
    !isCount(data.calendar?.total) ||
    !Array.isArray(days) ||
    !days.length ||
    days.length > 400 ||
    days.some(
      (d) =>
        !/^\d{4}-\d{2}-\d{2}$/.test(d.date) ||
        !isCount(d.count) ||
        !isCount(d.level) ||
        d.level > 4,
    )
  )
    throw new Error('El calendario del perfil tiene un formato inesperado');
  return {
    total: data.calendar.total,
    days,
    updatedAt: new Date(data.updatedAt).toISOString(),
    sourceUrl: calendarSource,
  };
}

function validSnapshot(value) {
  return (
    value?.schemaVersion === 1 &&
    value.profile?.login === login &&
    isCount(value.profile?.followers) &&
    isCount(value.profile?.publicRepositories) &&
    Array.isArray(value.repositories?.items) &&
    Array.isArray(value.activity?.items) &&
    Array.isArray(value.calendar?.days)
  );
}

const sources = { profile, repositories, activity, calendar };
const sections = Object.keys(sources);
const results = await Promise.allSettled(Object.values(sources).map((collect) => collect()));
const fallbacks = [];
if (results.some((result) => result.status === 'rejected')) {
  const copies = await Promise.allSettled([
    json(`${site}/data/github.json`),
    readFile(snapshotFile, 'utf8').then(JSON.parse),
  ]);
  fallbacks.push(
    ...copies
      .filter((copy) => copy.status === 'fulfilled' && validSnapshot(copy.value))
      .map((copy) => copy.value),
  );
}

const snapshot = { schemaVersion: 1 };
for (const [index, section] of sections.entries()) {
  const result = results[index];
  if (result.status === 'fulfilled') {
    snapshot[section] = result.value;
    continue;
  }
  const last = fallbacks
    .map((copy) => copy[section])
    .sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))[0];
  if (!last) throw new Error(`No hay una copia previa de ${section}`, { cause: result.reason });
  snapshot[section] = last;
  console.warn(`${section}: ${result.reason.message}. Se conserva la copia del ${last.updatedAt}.`);
}
await writeFile(snapshotFile, JSON.stringify(snapshot));
console.log(
  `Perfil: ${snapshot.profile.followers} seguidores, ${snapshot.profile.publicRepositories} repositorios. Actividad: ${snapshot.activity.items.length} aportes. Calendario: ${snapshot.calendar.days.length} días.`,
);
