import { writeFile, readFile } from 'node:fs/promises';
const origin = process.env.SITE_URL || 'https://bryanonkeys.github.io';
for (const path of ['dist/index.html', 'dist/engineering/index.html']) {
  const html = await readFile(path, 'utf8');
  await writeFile(path, html.replaceAll('https://bryanonkeys.github.io', origin));
}
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`);
await writeFile(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${origin}/</loc></url><url><loc>${origin}/engineering/</loc></url></urlset>`,
);
await writeFile('dist/.nojekyll', '');
