import { readFile, writeFile } from 'node:fs/promises';
import { codeToTokens } from 'shiki';
const sources = JSON.parse(await readFile('src/content/generated/sources.json', 'utf8'));
const extensions = { ts: 'typescript', java: 'java', sql: 'sql', md: 'markdown' };
const output = [];
for (const project of sources) {
  const files = [];
  for (const file of project.files) {
    const language = extensions[file.path.split('.').pop()] || 'text';
    const result = await codeToTokens(file.code, { lang: language, theme: 'github-dark' });
    files.push({
      ...file,
      language,
      tokens: result.tokens.map((line) =>
        line.map((t) => ({ content: t.content, color: t.color || '#c9d1d9' })),
      ),
    });
  }
  output.push({ ...project, files });
}
await writeFile('src/content/generated/engineering.json', JSON.stringify(output));
console.log(
  `Código resaltado: ${output.reduce((n, p) => n + p.files.length, 0)} archivos verificables.`,
);
