import { useState } from 'react';
import {
  Lightbulb,
  PenTool,
  Network,
  CodeXml,
  FlaskConical,
  Rocket,
  Settings,
  Monitor,
  Braces,
  Database,
  Workflow,
  Files,
  Bell,
  ShieldCheck,
  GitBranch,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react';
import { architectures } from '../content/architecture';
import { SectionHeading } from '../components/SectionHeading';
const stepIcons = [Lightbulb, PenTool, Network, CodeXml, FlaskConical, Rocket, Settings];
const steps = [
  ['Análisis', 'Entender el problema, sus actores y las reglas que debe respetar la solución.'],
  ['Diseño', 'Definir recorridos, contratos y una experiencia clara antes de construir.'],
  [
    'Arquitectura',
    'Separar dominio, casos de uso e infraestructura según las necesidades del proyecto.',
  ],
  ['Código', 'Implementar cambios pequeños, legibles y con responsabilidades concretas.'],
  ['Pruebas', 'Comprobar reglas, integraciones y respuestas ante errores.'],
  ['Despliegue', 'Preparar una entrega reproducible y validar el entorno de destino.'],
  ['Evolución', 'Documentar decisiones y mantener el sistema preparado para el siguiente cambio.'],
];
const nodeIcons = { Monitor, Braces, Database, Workflow, Files, Bell, ShieldCheck, GitBranch };
export default function Architecture() {
  const [step, setStep] = useState(0);
  const [project, setProject] = useState<'nexo' | 'crm'>('nexo');
  const [selected, setSelected] = useState('api');
  const diagram = architectures[project];
  const node = diagram.nodes.find((n) => n.id === selected) || diagram.nodes[0];
  return (
    <section id="arquitectura" className="section architecture-section">
      <div className="container">
        <SectionHeading
          eyebrow="ARQUITECTURA Y PROCESO"
          title="De la idea al producto"
          description="Un enfoque estructurado, con decisiones que se pueden explicar."
        />
        <div className="architecture-layout">
          <div className="process">
            <div className="process-steps">
              {steps.map(([label], index) => {
                const Icon = stepIcons[index];
                return (
                  <button
                    key={label}
                    className={index === step ? 'step step-active' : 'step'}
                    onClick={() => setStep(index)}
                    aria-pressed={index === step}
                  >
                    <Icon size={22} />
                    <small>0{index + 1}</small>
                    <span>{label}</span>
                    {index < 6 && <ChevronRight size={12} className="step-chevron" />}
                  </button>
                );
              })}
            </div>
            <div className="step-description" role="status">
              <b>
                0{step + 1} / {steps[step][0]}
              </b>
              <p>{steps[step][1]}</p>
            </div>
          </div>
          <div className="architecture-card">
            <div className="architecture-toolbar">
              <h3>{diagram.title}</h3>
              <div className="segmented">
                <button
                  onClick={() => {
                    setProject('nexo');
                    setSelected('api');
                  }}
                  aria-pressed={project === 'nexo'}
                >
                  Nexo
                </button>
                <button
                  onClick={() => {
                    setProject('crm');
                    setSelected('api');
                  }}
                  aria-pressed={project === 'crm'}
                >
                  CRM
                </button>
              </div>
            </div>
            <div className="architecture-graph" aria-label="Diagrama de arquitectura interactivo">
              <svg
                className="architecture-lines"
                viewBox="0 0 600 250"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <defs>
                  <marker
                    id="arrow"
                    viewBox="0 0 10 10"
                    refX="8"
                    refY="5"
                    markerWidth="4"
                    markerHeight="4"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="#7089af" />
                  </marker>
                </defs>
                {diagram.edges.map(([from, to]) => {
                  const a = diagram.nodes.find((n) => n.id === from)!;
                  const b = diagram.nodes.find((n) => n.id === to)!;
                  const active = from === node.id || to === node.id;
                  const dx = (b.x - a.x) * 6;
                  const dy = (b.y - a.y) * 2.5;
                  const inset = Math.min(78 / (Math.abs(dx) || 1), 29 / (Math.abs(dy) || 1));
                  const path =
                    from === 'events' && to === 'notify'
                      ? `M ${a.x * 6} ${a.y * 2.5 + 29} V 237 H ${b.x * 6} V ${b.y * 2.5 + 29}`
                      : `M ${a.x * 6 + dx * inset} ${a.y * 2.5 + dy * inset} L ${b.x * 6 - dx * inset} ${b.y * 2.5 - dy * inset}`;
                  return (
                    <path
                      key={from + to}
                      d={path}
                      className={active ? 'edge-active' : ''}
                      markerEnd="url(#arrow)"
                    />
                  );
                })}
              </svg>
              {diagram.nodes.map((n) => {
                const Icon = nodeIcons[n.icon as keyof typeof nodeIcons];
                return (
                  <button
                    aria-label={n.label}
                    style={{ left: `${n.x}%`, top: `${n.y}%` }}
                    onClick={() => setSelected(n.id)}
                    className={`architecture-node ${n.id === node.id ? 'node-selected' : ''} ${diagram.edges.some(([a, b]) => (a === node.id && b === n.id) || (b === node.id && a === n.id)) ? 'node-connected' : ''}`}
                    key={n.id}
                    aria-pressed={n.id === node.id}
                  >
                    <Icon size={18} />
                    <span>
                      {n.label}
                      <small>{n.sub}</small>
                    </span>
                  </button>
                );
              })}
            </div>
            <div className="node-description" role="status">
              <p>
                <strong>{node.label}.</strong> {node.description}
              </p>
              <a
                href={node.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Ver fuente de ${node.label}`}
              >
                Ver fuente <ArrowUpRight size={13} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
