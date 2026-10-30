import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Contact from '../features/Contact';
import { CONTACT_ENDPOINT, ContactError, normalizeContact, submitContact } from '../lib/contact';
const values = {
  name: 'Persona de prueba',
  email: 'persona@example.com',
  subject: 'Consulta de un proyecto',
  message: 'Necesito conversar sobre una aplicación para organizar mis pedidos.',
};
const publicFormId = '11111111-1111-4111-8111-111111111111';
function response(body: unknown, ok = true, status = 200) {
  return { ok, status, json: async () => body } as Response;
}
beforeEach(() => vi.stubEnv('VITE_CONTACT_ACCESS_KEY', publicFormId));
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});
async function fill() {
  const user = userEvent.setup();
  await user.type(screen.getByLabelText(/Nombre/), values.name);
  await user.type(screen.getByLabelText(/Tu correo/), values.email);
  await user.type(screen.getByLabelText(/Asunto/), values.subject);
  await user.type(screen.getByLabelText(/^Mensaje/), values.message);
  return user;
}
describe('Formulario de contacto', () => {
  it('envía al identificador verificado, configura Reply-To y limpia solo tras aceptación', async () => {
    const fetcher = vi.fn().mockResolvedValue(response({ success: true }));
    vi.stubGlobal('fetch', fetcher);
    render(<Contact />);
    const user = await fill();
    await user.click(screen.getByRole('button', { name: 'Enviar mensaje' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Mensaje aceptado'));
    expect(fetcher).toHaveBeenCalledOnce();
    const [url, options] = fetcher.mock.calls[0];
    expect(url).toBe(CONTACT_ENDPOINT);
    expect(options.method).toBe('POST');
    expect(options.credentials).toBe('omit');
    expect(JSON.parse(options.body)).toMatchObject({
      access_key: publicFormId,
      name: values.name,
      email: values.email,
      message: values.message,
      subject: `[Portfolio de Bryan] ${values.subject}`,
      replyto: values.email,
      botcheck: false,
    });
    expect(JSON.parse(options.body)).not.toHaveProperty('to');
    expect(screen.getByLabelText(/Tu correo/)).toHaveValue('');
  });
  it('conserva los datos y ofrece un borrador completo cuando la red falla', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new TypeError('Failed to fetch')));
    render(<Contact />);
    const user = await fill();
    await user.click(screen.getByRole('button', { name: 'Enviar mensaje' }));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('No se pudo enviar'));
    expect(screen.getByLabelText(/Tu correo/)).toHaveValue(values.email);
    const url = new URL(
      screen.getByRole('link', { name: 'Continuar en Gmail' }).getAttribute('href')!,
    );
    expect(url.origin).toBe('https://mail.google.com');
    expect(url.searchParams.get('to')).toBe('contact.bryanonkeys@gmail.com');
    expect(url.searchParams.get('su')).toContain(values.subject);
    expect(url.searchParams.get('body')).toContain(values.message);
    expect(url.searchParams.get('body')).toContain(values.email);
    expect(screen.queryByText('Mensaje aceptado para envío.')).not.toBeInTheDocument();
  });
  it('sin clave no llama al proveedor ni anuncia envío; prepara Gmail con el destino del propietario', async () => {
    vi.stubEnv('VITE_CONTACT_ACCESS_KEY', '');
    const fetcher = vi.fn();
    vi.stubGlobal('fetch', fetcher);
    render(<Contact />);
    const user = await fill();
    await user.click(screen.getByRole('button', { name: 'Preparar mensaje' }));
    expect(fetcher).not.toHaveBeenCalled();
    expect(screen.getByRole('status')).toHaveTextContent('Todavía no se ha enviado');
    const mailto = screen
      .getByRole('link', { name: 'Usar mi aplicación de correo' })
      .getAttribute('href')!;
    expect(mailto).toMatch(/^mailto:contact\.bryanonkeys@gmail\.com\?/);
    expect(decodeURIComponent(mailto)).toContain(values.message);
    expect(screen.getByLabelText(/^Mensaje/)).toHaveValue(values.message);
    await user.type(screen.getByLabelText(/Asunto/), ' nuevo');
    expect(screen.queryByRole('link', { name: 'Continuar en Gmail' })).not.toBeInTheDocument();
  });
  it('bloquea solicitudes duplicadas mientras se espera la respuesta', async () => {
    let resolve!: (value: Response) => void;
    const fetcher = vi.fn().mockReturnValue(
      new Promise<Response>((r) => {
        resolve = r;
      }),
    );
    vi.stubGlobal('fetch', fetcher);
    render(<Contact />);
    await fill();
    fireEvent.submit(screen.getByRole('form', { name: 'Formulario de contacto' }));
    fireEvent.submit(screen.getByRole('form', { name: 'Formulario de contacto' }));
    expect(fetcher).toHaveBeenCalledOnce();
    expect(screen.getByRole('button', { name: 'Enviando…' })).toBeDisabled();
    resolve(response({ success: true }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Mensaje aceptado'));
  });
  it('admite pruebas breves, pero rechaza datos inválidos y saltos de línea en el asunto', async () => {
    const fetcher = vi.fn().mockResolvedValue(response({ success: true }));
    vi.stubGlobal('fetch', fetcher);
    expect(() => normalizeContact({ ...values, subject: 'Tema\nBcc: otro@example.com' })).toThrow(
      ContactError,
    );
    await expect(
      submitContact({ ...values, message: 'Hola' }, new AbortController().signal),
    ).rejects.toMatchObject({ reason: 'validation' });
    expect(fetcher).not.toHaveBeenCalled();
    await submitContact({ ...values, message: 'Probando' }, new AbortController().signal);
    expect(fetcher).toHaveBeenCalledOnce();
  });
  it('rechaza una configuración ausente o incorrecta sin transmitir datos', async () => {
    const fetcher = vi.fn();
    vi.stubGlobal('fetch', fetcher);
    vi.stubEnv('VITE_CONTACT_ACCESS_KEY', 'not-a-form-id');
    await expect(submitContact(values, new AbortController().signal)).rejects.toMatchObject({
      reason: 'configuration',
    });
    expect(fetcher).not.toHaveBeenCalled();
  });
  it('distingue los límites del proveedor y conserva el texto para otro canal', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(response({ success: false }, false, 429)));
    render(<Contact />);
    const user = await fill();
    await user.click(screen.getByRole('button', { name: 'Enviar mensaje' }));
    await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('demasiados envíos'));
    expect(screen.getByLabelText(/^Mensaje/)).toHaveValue(values.message);
    expect(screen.getByRole('link', { name: 'Continuar en Gmail' })).toBeVisible();
  });
  it('no acepta errores HTTP, rechazos, éxito ambiguo ni JSON ilegible', async () => {
    for (const candidate of [
      response({ success: true }, false),
      response({ success: false }),
      response({ success: 'true' }),
      response(null),
      {
        ok: true,
        json: async () => {
          throw new Error('invalid json');
        },
      },
    ]) {
      vi.stubGlobal('fetch', vi.fn().mockResolvedValue(candidate));
      await expect(submitContact(values, new AbortController().signal)).rejects.toMatchObject({
        reason: 'delivery',
      });
    }
  });
});
