import { test, expect } from '@playwright/test';
test('contacto conserva el mensaje y prepara un correo completo ante falta de entrega', async ({
  page,
}) => {
  await page.route('https://api.web3forms.com/submit', (route) =>
    route.fulfill({
      status: 503,
      contentType: 'application/json',
      body: JSON.stringify({ success: false }),
    }),
  );
  await page.goto('/#contacto');
  await page.getByLabel(/^Nombre/).fill('Prueba del portfolio');
  await page.getByLabel(/^Tu correo/).fill('prueba@example.com');
  await page.getByLabel(/^Asunto/).fill('Prueba breve & contacto');
  await page.getByLabel(/^Mensaje/).fill('Probando el formulario desde GitHub Pages.');
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
  await expect(page.getByLabel('Código de SecurityConfig.java')).toContainText(
    'BCryptPasswordEncoder',
  );
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
  await expect(page.getByRole('button', { name: 'Pausar animación' })).toBeVisible();
  await page.getByRole('button', { name: 'Pausar animación' }).click();
  await expect(page.getByRole('button', { name: 'Reanudar animación' })).toBeVisible();
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
});
