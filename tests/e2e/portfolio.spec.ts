import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import type { GitHubSnapshot } from '../../src/lib/github';

const snapshot: GitHubSnapshot = JSON.parse(
  readFileSync(new URL('../../src/content/generated/github.json', import.meta.url), 'utf8'),
);
test('contacto conserva datos ante errores y restablece el formulario tras la aceptación', async ({
  page,
}) => {
  let accepted = false;
  await page.route('https://api.web3forms.com/submit', (route) =>
    route.fulfill({
      status: accepted ? 200 : 503,
      contentType: 'application/json',
      headers: {
        'access-control-allow-origin': '*',
        'access-control-allow-headers': 'content-type',
        'access-control-allow-methods': 'POST, OPTIONS',
      },
      body: JSON.stringify({ success: accepted }),
    }),
  );
  await page.goto('/#contacto');
  await page.getByLabel(/^Nombre/).fill('Prueba del portfolio');
  await page.getByLabel(/^Tu correo/).fill('prueba@example.com');
  await page.getByLabel(/^Asunto/).fill('Prueba breve & contacto');
  await page.getByLabel(/^Mensaje/).fill('Probando el formulario desde GitHub Pages.');
  const direct = await page
    .getByRole('button', { name: 'Enviar mensaje', exact: true })
    .isVisible();
  await page.getByRole('button', { name: /^(Enviar|Preparar) mensaje$/ }).click();
  const gmail = page.getByRole('link', { name: 'Continuar en Gmail' });
  await expect(gmail).toBeVisible();
  const draft = new URL((await gmail.getAttribute('href'))!);
  expect(draft.searchParams.get('to')).toBe('contact.bryanonkeys@gmail.com');
  expect(draft.searchParams.get('su')).toBe('[Portfolio de Bryan] Prueba breve & contacto');
  expect(draft.searchParams.get('body')).toContain('prueba@example.com');
  expect(draft.searchParams.get('body')).toContain('Probando el formulario desde GitHub Pages.');
  await expect(page.getByLabel(/^Mensaje/)).toHaveValue(
    'Probando el formulario desde GitHub Pages.',
  );
  await expect(page.getByText('Mensaje aceptado para envío.', { exact: true })).toHaveCount(0);
  if (direct) {
    accepted = true;
    await page.getByRole('button', { name: 'Enviar mensaje', exact: true }).click();
    await expect(page.getByText('Mensaje aceptado para envío.', { exact: true })).toBeVisible();
    await expect(page.getByLabel(/^Nombre/)).toHaveValue('');
    await expect(page.getByLabel(/^Tu correo/)).toHaveValue('');
    await expect(page.getByLabel(/^Asunto/)).toHaveValue('');
    await expect(page.getByLabel(/^Mensaje/)).toHaveValue('');
    await expect(page.locator('.contact-form :user-invalid')).toHaveCount(0);
    await expect(gmail).toHaveCount(0);
  }
});
test('navegación, proyectos y explorador real', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Bryan');
  await page.getByRole('link', { name: 'Explorar proyectos', exact: true }).click();
  await page.getByRole('button', { name: 'Frontend', exact: true }).click();
  await expect(page.getByRole('article')).toHaveCount(2);
  await page.getByRole('button', { name: 'Todos', exact: true }).click();
  await page.getByRole('combobox', { name: 'Seleccionar backend' }).selectOption('crm');
  await page
    .getByRole('complementary', { name: 'Explorador de archivos' })
    .getByRole('button', { name: 'SecurityConfig.java' })
    .click();
  const code = page.getByLabel('Código de SecurityConfig.java');
  await expect(code).toContainText('BCryptPasswordEncoder');
  const [firstLine, secondLine] = await code
    .locator('.code-line')
    .evaluateAll((lines) => lines.slice(0, 2).map((line) => line.getBoundingClientRect().top));
  expect(secondLine).toBeGreaterThan(firstLine);
  await page.getByRole('link', { name: 'Abrir explorador completo', exact: true }).click();
  await expect(page).toHaveURL(/engineering\/\?project=crm/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Backend Engineering Explorer',
  );
  expect(errors).toEqual([]);
});
test('diseño responsive y reducción de movimiento', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const scene = page.locator('.hero-image img');
  await expect(scene).toBeVisible();
  await expect
    .poll(() =>
      scene.evaluate(
        (img) => img instanceof HTMLImageElement && img.complete && img.naturalWidth > 0,
      ),
    )
    .toBe(true);
  await expect(scene).toHaveAttribute('srcset', /island-64-small\.webp 760w/);
  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'auto');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
  if (await page.getByRole('button', { name: 'Abrir menú' }).isVisible()) {
    await page.getByRole('button', { name: 'Abrir menú' }).click();
    await page
      .getByRole('navigation', { name: 'Navegación principal' })
      .getByRole('link', { name: 'Contacto', exact: true })
      .click();
    await expect(page.getByRole('button', { name: 'Abrir menú' })).toHaveAttribute(
      'aria-expanded',
      'false',
    );
  }
  await page.setViewportSize({ width: 320, height: 780 });
  await expect(page.getByRole('link', { name: 'Ver GitHub', exact: true })).toBeVisible();
  await page.evaluate(() => document.fonts.ready.then(() => undefined));
  expect(
    await page.evaluate(() => {
      const root = document.documentElement;
      const title = document.querySelector<HTMLElement>('.hero h1')!;
      return root.scrollWidth <= root.clientWidth && title.scrollWidth <= title.clientWidth;
    }),
  ).toBe(true);
});
test('actividad pública filtra revisiones, comentarios y repositorios propios', async ({
  page,
}) => {
  const date = snapshot.activity.updatedAt;
  await page.route('**/data/github.json', (route) =>
    route.fulfill({
      json: {
        ...snapshot,
        activity: {
          ...snapshot.activity,
          updatedAt: new Date(Date.parse(date) + 60000).toISOString(),
          items: [
            {
              kind: 'review',
              title: 'Revisión de Plugin Kueue',
              repo: 'headlamp-k8s/plugins',
              number: 1525,
              url: 'https://github.com/headlamp-k8s/plugins/pull/1525#pullrequestreview-5975833595',
              date,
              state: 'commented',
            },
            {
              kind: 'comment',
              title: 'Pruebas de configuración de AskDB',
              repo: 'Ygilany/AskDB',
              number: 1037,
              url: 'https://github.com/Ygilany/AskDB/pull/1037#issuecomment-7010257294',
              date,
              state: null,
            },
            {
              kind: 'pr',
              title: 'Publicar Patitas Felices en GitHub Pages',
              repo: 'BryanOnKeys/web-petshop',
              number: 2,
              url: 'https://github.com/BryanOnKeys/web-petshop/pull/2',
              date,
              state: 'merged',
            },
          ],
        },
      },
    }),
  );
  await page.goto('/#github');
  const feed = page.getByRole('region', { name: 'Actividad reciente' });
  await feed.getByRole('button', { name: 'Revisiones', exact: true }).click();
  await expect(feed.getByRole('button', { name: 'Revisiones', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  const review = feed.getByRole('link', { name: /Revisión de Plugin Kueue/ });
  await expect(review).toHaveAttribute('href', expect.stringContaining('#pullrequestreview-'));
  const search = feed.getByRole('searchbox', { name: 'Buscar actividad por título o repositorio' });
  await search.fill('revision de plugin');
  await expect(review).toBeVisible();
  await expect(feed.getByRole('status')).toHaveText('1 aporte');
  await search.fill('Ygilany/AskDB');
  await expect(feed.getByText('No hay aportes que coincidan con la búsqueda.')).toBeVisible();
  await search.clear();
  await feed.getByRole('button', { name: 'Comentarios', exact: true }).click();
  await expect(feed.locator('a[href*="#issuecomment-"]').first()).toBeVisible();
  await feed.getByRole('button', { name: 'Pull requests', exact: true }).click();
  await expect(feed.locator('a[href^="https://github.com/BryanOnKeys/"]')).toHaveCount(0);
  await feed.getByRole('checkbox', { name: 'Incluir repositorios propios' }).check();
  await expect(feed.locator('a[href^="https://github.com/BryanOnKeys/"]').first()).toBeVisible();
});
test('conserva la instantánea sin red y obtiene cambios al actualizarse', async ({ page }) => {
  await page.clock.install();
  let calls = 0;
  const followers = snapshot.profile.followers + 1;
  await page.route('**/data/github.json', (route) => {
    calls++;
    if (calls === 1) return route.abort();
    return route.fulfill({
      json: {
        ...snapshot,
        profile: {
          ...snapshot.profile,
          followers,
          updatedAt: new Date(Date.parse(snapshot.profile.updatedAt) + 60000).toISOString(),
        },
      },
    });
  });
  const metric = page.getByRole('link', { name: /Seguidores/ }).locator('strong');
  await page.goto('/');
  await expect(metric).toHaveText(String(snapshot.profile.followers));
  await expect.poll(() => calls).toBe(1);
  await page.clock.fastForward(10 * 60 * 1000);
  await expect(metric).toHaveText(String(followers));
});
