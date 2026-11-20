import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
const manifest = JSON.parse(await readFile('scripts/source-manifest.json', 'utf8'));
const headers = { 'User-Agent': 'BryanOnKeys-Portfolio' };
async function get(url) {
  const response = await fetch(url, { headers, signal: AbortSignal.timeout(20000) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.text();
}
try {
  const sources = [];
  for (const project of manifest) {
    const files = [];
    for (const path of project.files) {
      const code = await get(
        `https://raw.githubusercontent.com/${project.repo}/${project.ref}/${path}`,
      );
      if (code.length > 150000) throw new Error('Archivo demasiado grande');
      files.push({
        path,
        code,
        url: `https://github.com/${project.repo}/blob/${project.ref}/${path}`,
      });
    }
    sources.push({ ...project, files });
  }
  await writeFile('src/content/generated/sources.json', JSON.stringify(sources));
  execFileSync(process.execPath, ['scripts/highlight.mjs'], { stdio: 'inherit' });
} catch (error) {
  console.warn(`No se actualizó el código: ${error.message}. Se conserva la instantánea incluida.`);
}
