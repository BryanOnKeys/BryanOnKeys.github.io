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
try {
  const url = 'https://raw.githubusercontent.com/BryanOnKeys/BryanOnKeys/main/profile/data.json';
  const data = JSON.parse(await get(url));
  if (
    data.login !== 'BryanOnKeys' ||
    !Array.isArray(data.calendar?.days) ||
    data.calendar.days.length > 400 ||
    data.calendar.days.some(
      (d) =>
        !/^\d{4}-\d{2}-\d{2}$/.test(d.date) ||
        !Number.isInteger(d.count) ||
        d.count < 0 ||
        !Number.isInteger(d.level) ||
        d.level < 0 ||
        d.level > 4,
    )
  )
    throw new Error('Formato de actividad no válido');
  await writeFile(
    'src/content/generated/activity.json',
    JSON.stringify({
      ...data,
      sourceUrl: 'https://github.com/BryanOnKeys/BryanOnKeys/blob/main/profile/data.json',
    }),
  );
  console.log(`Actividad actualizada: ${data.updatedAt}`);
} catch (error) {
  console.warn(
    `Actividad sin actualizar: ${error.message}. Se conserva la fecha de la instantánea incluida.`,
  );
}
