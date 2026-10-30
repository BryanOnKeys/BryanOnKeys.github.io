import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import Projects from '../features/Projects';
import Skills from '../features/Skills';
import EngineeringExplorer from '../features/EngineeringExplorer';
import Architecture from '../features/Architecture';
import Contact from '../features/Contact';
import { safeExternalUrl } from '../lib/urls';
import { orbitPosition, damping } from '../graphics/math';
import sources from '../content/generated/engineering.json';

describe('Destinos y geometría', () => {
  it('rechaza protocolos ejecutables y conserva URLs HTTPS', () => {
    expect(safeExternalUrl('javascript:alert(1)')).toBeNull();
    expect(safeExternalUrl('data:text/html,hello')).toBeNull();
    expect(safeExternalUrl('https://github.com/BryanOnKeys')).toBe(
      'https://github.com/BryanOnKeys',
    );
  });
  it('mantiene el radio de la órbita durante una vuelta', () => {
    for (let i = 0; i < 20; i++) {
      const [x, y, z] = orbitPosition((i * Math.PI) / 10, 2.5);
      expect(Math.hypot(x, y, z)).toBeCloseTo(2.5, 10);
    }
  });
  it('la interpolación no sobrepasa el objetivo y no depende del particionado temporal', () => {
    const one = damping(0, 1, 1);
    let split = 0;
    for (let i = 0; i < 10; i++) split = damping(split, 1, 0.1);
    expect(one).toBeCloseTo(split, 10);
    expect(one).toBeLessThan(1);
  });
});
describe('Proyectos y evidencias', () => {
  it('filtra frontend y permite regresar a todos', async () => {
    const user = userEvent.setup();
    render(<Projects />);
    expect(screen.getAllByRole('article')).toHaveLength(4);
    await user.click(screen.getByRole('button', { name: 'Frontend' }));
    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(screen.queryByRole('heading', { name: 'NEXO Fulfillment' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Todos' }));
    expect(screen.getAllByRole('article')).toHaveLength(4);
  });
  it('el filtro backend incluye la API del CRM', async () => {
    render(<Projects />);
    await userEvent.click(screen.getByRole('button', { name: 'Backend' }));
    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(screen.getByRole('heading', { name: 'Borough & Ledger' })).toBeInTheDocument();
  });
  it('abre y cierra una competencia respaldada por un proyecto', async () => {
    render(<Skills />);
    await userEvent.click(screen.getByRole('button', { name: 'Ver evidencia de Java' }));
    expect(screen.getByRole('status')).toHaveTextContent('Servicios, reglas de negocio');
    expect(screen.getByRole('link', { name: 'Ver evidencia' })).toHaveAttribute(
      'href',
      expect.stringContaining('borough-ledger-crm'),
    );
    await userEvent.click(screen.getByRole('button', { name: 'Cerrar detalle de tecnología' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
describe('Exploración técnica', () => {
  it('cambia de backend y abre un archivo con su fuente fijada al commit', async () => {
    const user = userEvent.setup();
    render(<EngineeringExplorer />);
    await user.selectOptions(screen.getByRole('combobox', { name: 'Seleccionar backend' }), 'crm');
    const tree = screen.getByRole('complementary', { name: 'Explorador de archivos' });
    await user.click(within(tree).getByRole('button', { name: 'SecurityConfig.java' }));
    const code = screen.getByLabelText('Código de SecurityConfig.java');
    expect(code).toHaveTextContent('BCryptPasswordEncoder');
    expect(
      screen.getByRole('link', { name: 'Abrir SecurityConfig.java en GitHub' }),
    ).toHaveAttribute(
      'href',
      expect.stringContaining('/2295fc6704651c5af79bbceeba9ca09f1b247b7a/'),
    );
  });
  it('las notas seleccionan la implementación que las respalda', async () => {
    render(<EngineeringExplorer />);
    await userEvent.click(screen.getByRole('button', { name: 'Pruebas' }));
    expect(screen.getByLabelText('Código de domain.test.ts')).toHaveTextContent(
      'el stock cero impide nuevas ventas',
    );
  });
  it('el resaltado conserva el código completo sin introducir contenido', () => {
    for (const project of sources)
      for (const file of project.files) {
        const text = file.tokens.map((line) => line.map((t) => t.content).join('')).join('\n');
        expect(text.replace(/\n$/, '')).toBe(file.code.replace(/\n$/, ''));
        expect(file.url).toContain(project.ref);
      }
  });
  it('el diagrama cambia de sistema y explica el nodo seleccionado', async () => {
    render(<Architecture />);
    await userEvent.click(screen.getByRole('button', { name: 'CRM' }));
    await userEvent.click(screen.getByRole('button', { name: 'Autenticación' }));
    expect(screen.getByRole('link', { name: 'Ver fuente de Autenticación' })).toHaveAttribute(
      'href',
      expect.stringContaining('SecurityConfig.java'),
    );
    expect(screen.getByText(/habilita CSRF y utiliza BCrypt/)).toBeInTheDocument();
  });
});
describe('Contacto', () => {
  it('mantiene un destino real para el correo y los perfiles', () => {
    render(<Contact />);
    expect(screen.getByRole('link', { name: 'contact.bryanonkeys@gmail.com' })).toHaveAttribute(
      'href',
      'mailto:contact.bryanonkeys@gmail.com',
    );
    expect(screen.getByRole('link', { name: /LinkedIn/ })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/bryanonkeys',
    );
  });
});
