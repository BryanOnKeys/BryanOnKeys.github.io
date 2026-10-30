import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Mail, ArrowUpRight, Send, CheckCircle2, CircleAlert, LoaderCircle } from 'lucide-react';
import { Linkedin, Github } from '../components/BrandIcons';
import { profile } from '../content/profile';
import {
  ContactError,
  contactDraft,
  isContactConfigured,
  normalizeContact,
  submitContact,
} from '../lib/contact';
import type { ContactValues } from '../lib/contact';

type SubmissionState = 'idle' | 'sending' | 'sent' | 'error' | 'draft';
const empty: ContactValues = { name: '', email: '', subject: '', message: '' };
export default function Contact() {
  const [values, setValues] = useState<ContactValues>(empty);
  const [state, setState] = useState<SubmissionState>('idle');
  const [error, setError] = useState('');
  const request = useRef<AbortController | null>(null);
  const inFlight = useRef(false);
  const honey = useRef<HTMLInputElement>(null);
  const configured = isContactConfigured();
  const [draft, setDraft] = useState<{ gmail: string; mailto: string } | null>(null);
  useEffect(() => () => request.current?.abort(), []);

  function update(field: keyof ContactValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    if (state !== 'sending') setState('idle');
    setDraft(null);
  }
  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (inFlight.current || honey.current?.value) return;
    try {
      normalizeContact(values);
    } catch {
      setState('error');
      setError('Revisa los campos. El mensaje debe tener entre 5 y 5000 caracteres.');
      return;
    }
    if (!configured) {
      setDraft(contactDraft(values));
      setState('draft');
      return;
    }
    inFlight.current = true;
    const controller = new AbortController();
    request.current = controller;
    const timeout = window.setTimeout(() => controller.abort('timeout'), 20000);
    setState('sending');
    setError('');
    try {
      await submitContact(values, controller.signal);
      setState('sent');
      setValues(empty);
    } catch (err) {
      if (controller.signal.aborted && controller.signal.reason !== 'timeout') return;
      setState('error');
      setDraft(contactDraft(values));
      setError(
        err instanceof ContactError && err.reason === 'validation'
          ? 'Revisa los campos. El mensaje debe tener entre 5 y 5000 caracteres.'
          : err instanceof ContactError && err.reason === 'rate-limit'
            ? 'Hay demasiados envíos en este momento. Conservamos tu mensaje; puedes enviarlo por Gmail.'
            : controller.signal.aborted
              ? 'El envío tardó más de lo esperado. Tus datos siguen aquí; inténtalo otra vez.'
              : 'No se pudo enviar el mensaje. Tus datos siguen aquí; inténtalo otra vez o continúa por Gmail.',
      );
    } finally {
      clearTimeout(timeout);
      inFlight.current = false;
      request.current = null;
    }
  }

  return (
    <section id="contacto" className="section contact-section">
      <div className="container contact-layout">
        <div className="contact-intro">
          <div className="eyebrow">◈ CONTACTO</div>
          <h2>¿Lo construimos?</h2>
          <p>
            Una idea, un reto técnico o una oportunidad.
            <br />
            Cuéntame qué tienes en mente.
          </p>
          <div className="contact-destination">
            <i>
              <Mail size={19} />
            </i>
            <div>
              <span>Tu mensaje llegará a</span>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </div>
          </div>
          <div className="contact-socials">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin size={16} /> LinkedIn <ArrowUpRight size={12} />
            </a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              <Github size={16} /> GitHub <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="contact-note">
            <span />
            Los buenos proyectos empiezan con una conversación.
          </div>
        </div>
        <form
          className="contact-form"
          onSubmit={send}
          aria-label="Formulario de contacto"
          aria-busy={state === 'sending'}
        >
          <fieldset disabled={state === 'sending'}>
            <legend className="sr-only">Datos de tu mensaje</legend>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="contact-name">
                  Nombre <span>*</span>
                </label>
                <input
                  id="contact-name"
                  name="name"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={80}
                  placeholder="Tu nombre"
                  value={values.name}
                  onChange={(e) => update('name', e.target.value)}
                />
              </div>
              <div className="form-field">
                <label htmlFor="contact-email">
                  Tu correo <span>*</span>
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  autoCapitalize="none"
                  required
                  maxLength={254}
                  placeholder="nombre@correo.com"
                  value={values.email}
                  onChange={(e) => update('email', e.target.value)}
                />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="contact-subject">
                Asunto <span>*</span>
              </label>
              <input
                id="contact-subject"
                name="subject"
                required
                minLength={3}
                maxLength={120}
                placeholder="¿Sobre qué te gustaría conversar?"
                value={values.subject}
                onChange={(e) => update('subject', e.target.value)}
              />
            </div>
            <div className="form-field">
              <label htmlFor="contact-message">
                Mensaje <span>*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                required
                minLength={5}
                maxLength={5000}
                placeholder="Cuéntame tu idea, lo que necesitas o cómo podemos colaborar…"
                value={values.message}
                onChange={(e) => update('message', e.target.value)}
                aria-describedby="contact-message-hint"
              />
              <span id="contact-message-hint" className="form-hint">
                Entre 5 y 5000 caracteres.
              </span>
            </div>
            <div className="form-honeypot" aria-hidden="true">
              <label htmlFor="contact-company">Dejar vacío</label>
              <input
                id="contact-company"
                name="company"
                ref={honey}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>
            <div className="form-actions">
              <span>
                {configured
                  ? 'Te responderé al correo que indiques.'
                  : 'Prepara tu mensaje y envíalo desde Gmail.'}
              </span>
              <button type="submit" className="button button-primary">
                {state === 'sending' ? (
                  <>
                    <LoaderCircle size={16} className="sending-spinner" />
                    Enviando…
                  </>
                ) : (
                  <>
                    {configured ? 'Enviar mensaje' : 'Preparar mensaje'} <Send size={16} />
                  </>
                )}
              </button>
            </div>
          </fieldset>
          {state === 'sent' && (
            <div className="form-feedback feedback-success" role="status">
              <CheckCircle2 size={18} />
              <div>
                <strong>Mensaje aceptado para envío.</strong>
                <p>Gracias por escribirme. Te responderé al correo que indicaste.</p>
              </div>
            </div>
          )}
          {state === 'error' && (
            <div className="form-feedback feedback-error" role="alert">
              <CircleAlert size={18} />
              <p>{error}</p>
            </div>
          )}
          {state === 'draft' && (
            <div className="form-feedback" role="status">
              <Mail size={18} />
              <p>
                Tu mensaje está preparado. Abre Gmail para revisarlo y enviarlo. Todavía no se ha
                enviado.
              </p>
            </div>
          )}
          {draft && (
            <div className="form-actions">
              <a href={draft.mailto}>Usar mi aplicación de correo</a>
              <a
                className="button button-primary"
                href={draft.gmail}
                target="_blank"
                rel="noopener noreferrer"
              >
                Continuar en Gmail <ArrowUpRight size={16} />
              </a>
            </div>
          )}
          <p className="contact-service-note">
            {configured ? (
              <>
                El envío se procesa con{' '}
                <a href="https://web3forms.com/privacy" target="_blank" rel="noopener noreferrer">
                  Web3Forms
                </a>{' '}
                para entregar tu mensaje por correo.
              </>
            ) : (
              'El envío directo está en activación. Puedes completar los campos y continuar en Gmail.'
            )}
          </p>
        </form>
      </div>
    </section>
  );
}
