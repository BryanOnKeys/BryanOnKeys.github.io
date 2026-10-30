import { useState } from 'react';
import {
  Boxes,
  ShieldCheck,
  FlaskConical,
  GitBranch,
  Workflow,
  MessageSquare,
  ChevronRight,
  ChevronDown,
  Folder,
  FileCode2,
  ArrowUpRight,
  Check,
  ArrowRight,
} from 'lucide-react';
import sources from '../content/generated/engineering.json';
import { engineeringNotes } from '../content/engineering';
import { SectionHeading } from '../components/SectionHeading';
import { engineeringUrl } from '../lib/urls';
const noteIcons = [Boxes, ShieldCheck, FlaskConical, GitBranch, Workflow, MessageSquare];
export default function EngineeringExplorer({
  standalone = false,
  initialProject = 'nexo',
}: {
  standalone?: boolean;
  initialProject?: string;
}) {
  const [projectId, setProjectId] = useState(initialProject === 'crm' ? 'crm' : 'nexo');
  const [fileIndex, setFileIndex] = useState(0);
  const [note, setNote] = useState(0);
  const project = sources.find((p) => p.id === projectId)!;
  const file = project.files[fileIndex];
  const notes = engineeringNotes[projectId as keyof typeof engineeringNotes];
  const groups = [...new Set(project.files.map((f) => f.path.split('/').slice(0, -1).join('/')))];
  const selectProject = (value: string) => {
    setProjectId(value);
    setFileIndex(0);
    setNote(0);
    if (standalone) window.history.replaceState(null, '', `?project=${value}`);
  };
  return (
    <section
      id="ingenieria"
      className={`section engineering-section ${standalone ? 'engineering-standalone' : ''}`}
    >
      <div className="container">
        <SectionHeading
          eyebrow="BACKEND ENGINEERING EXPLORER"
          title="Por dentro del código"
          description="Estructura, decisiones y código auténtico. Abre un archivo y explora cómo está construido."
          action={
            <label className="project-select">
              <Boxes size={15} />
              <span className="sr-only">Seleccionar backend</span>
              <select value={projectId} onChange={(e) => selectProject(e.target.value)}>
                <option value="nexo">NEXO Fulfillment</option>
                <option value="crm">Borough & Ledger CRM</option>
              </select>
            </label>
          }
        />
        <div className="engineering-grid">
          <div className="editor">
            <div className="editor-topbar">
              <div className="window-dots">
                <i />
                <i />
                <i />
              </div>
              <span>{project.repo.split('/')[1]}</span>
              <small>ARCHIVOS SELECCIONADOS</small>
            </div>
            <div className="editor-main">
              <aside className="file-tree" aria-label="Explorador de archivos">
                <div className="tree-heading">
                  <ChevronDown size={12} />
                  EXPLORADOR
                </div>
                {groups.map((group) => (
                  <details key={group} open>
                    <summary>
                      <Folder size={13} />
                      <span title={group}>{group.split('/').slice(-2).join('/')}</span>
                    </summary>
                    {project.files
                      .filter((f) => f.path.startsWith(group + '/'))
                      .map((f) => (
                        <button
                          key={f.path}
                          className={f.path === file.path ? 'file-active' : ''}
                          onClick={() => setFileIndex(project.files.indexOf(f))}
                          title={f.path}
                          aria-pressed={f.path === file.path}
                        >
                          <FileCode2 size={13} />
                          <span>{f.path.split('/').pop()}</span>
                        </button>
                      ))}
                  </details>
                ))}
              </aside>
              <div className="code-workspace">
                <div className="code-tabs" aria-label="Archivos del proyecto">
                  {project.files.map((f, index) => (
                    <button
                      key={f.path}
                      onClick={() => setFileIndex(index)}
                      className={index === fileIndex ? 'tab-active' : ''}
                      aria-pressed={index === fileIndex}
                    >
                      <span
                        aria-hidden="true"
                        className={f.language === 'java' ? 'code-java' : 'code-ts'}
                      >
                        {f.language === 'java'
                          ? 'J'
                          : f.language === 'sql'
                            ? 'SQL'
                            : f.language === 'markdown'
                              ? 'M'
                              : 'TS'}
                      </span>
                      {f.path.split('/').pop()}
                    </button>
                  ))}
                </div>
                <div className="code-breadcrumb">
                  <span>{file.path}</span>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Abrir ${file.path.split('/').pop()} en GitHub`}
                  >
                    <ArrowUpRight size={14} />
                  </a>
                </div>
                <div
                  className="code-scroll"
                  tabIndex={0}
                  aria-label={`Código de ${file.path.split('/').pop()}`}
                >
                  <pre>
                    <code>
                      {file.tokens.map((line, index) => (
                        <span className="code-line" key={index}>
                          <span className="line-number" aria-hidden="true">
                            {index + 1}
                          </span>
                          <span>
                            {line.map((token, ti) => (
                              <span key={ti} style={{ color: token.color }}>
                                {token.content}
                              </span>
                            ))}
                          </span>
                          {'\n'}
                        </span>
                      ))}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
            <div className="editor-status">
              <span>
                <GitBranch size={12} /> {project.ref.slice(0, 7)} <Check size={11} /> Código de
                origen
              </span>
              <span>{file.language} · UTF-8</span>
            </div>
          </div>
          <aside className="engineering-notes" aria-label="Notas técnicas">
            {notes.map((n, index) => {
              const Icon = noteIcons[index];
              return (
                <div
                  className={`engineering-note ${note === index ? 'note-active' : ''}`}
                  key={n.title}
                >
                  <button
                    aria-label={n.title}
                    onClick={() => {
                      setNote(index);
                      setFileIndex(n.file);
                    }}
                    aria-expanded={note === index}
                  >
                    <i className={['blue', 'green', 'cyan', 'amber', 'purple', 'pink'][index]}>
                      <Icon size={19} />
                    </i>
                    <span>
                      <strong>{n.title}</strong>
                      {note !== index && (
                        <small>
                          {index === 0
                            ? 'Capas y responsabilidades'
                            : index === 1
                              ? 'Controles implementados'
                              : index === 2
                                ? 'Casos que se pueden revisar'
                                : index === 3
                                  ? 'Trade-offs y límites'
                                  : index === 4
                                    ? 'De la petición al resultado'
                                    : 'Preguntas con código'}
                        </small>
                      )}
                    </span>
                    <ChevronRight size={14} />
                  </button>
                  {note === index && (
                    <div className="note-content">
                      <p>{n.text}</p>
                      <a href={project.files[n.file].url} target="_blank" rel="noopener noreferrer">
                        Consultar implementación <ArrowUpRight size={12} />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </aside>
        </div>
        <div className="engineering-caption">
          <span>
            <span className="micro-dot" /> Instantánea verificable · {project.ref.slice(0, 7)} ·{' '}
            {standalone ? '12 archivos entre los dos proyectos' : 'Vista integrada'}
          </span>
          {!standalone && (
            <a href={engineeringUrl(projectId)} className="text-link">
              Abrir explorador completo <ArrowRight size={14} />
            </a>
          )}
        </div>
        {standalone && (
          <div className="explorer-context">
            <h3>Código con contexto</h3>
            <p>
              Los archivos se incluyen completos en una instantánea local del portfolio y se enlazan
              al commit de origen. Puedes consultarlos sin conexión a la API de GitHub. Esta
              selección permite inspeccionar el diseño; no representa una auditoría ni sustituye las
              pruebas de cada repositorio.
            </p>
            <a
              href={`https://github.com/${project.repo}`}
              target="_blank"
              rel="noopener noreferrer"
              className="button"
            >
              Ver repositorio completo <ArrowUpRight size={14} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
