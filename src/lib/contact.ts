import { profile } from '../content/profile';

export interface ContactValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}
export class ContactError extends Error {
  constructor(public readonly reason: 'validation' | 'delivery' | 'configuration' | 'rate-limit') {
    super(reason);
    this.name = 'ContactError';
  }
}
export const CONTACT_ENDPOINT = 'https://api.web3forms.com/submit';

// Web3Forms access keys are public form identifiers, never Gmail credentials.
export function isContactConfigured(): boolean {
  return /^[0-9a-f]{8}(-[0-9a-f]{4}){3}-[0-9a-f]{12}$/i.test(
    import.meta.env.VITE_CONTACT_ACCESS_KEY?.trim() ?? '',
  );
}

export function contactDraft(values: ContactValues): { gmail: string; mailto: string } {
  const input = normalizeContact(values);
  const subject = `[Portfolio de Bryan] ${input.subject}`;
  const body = `Nombre: ${input.name}\nCorreo para responder: ${input.email}\n\n${input.message}`;
  const query = new URLSearchParams({ view: 'cm', fs: '1', to: profile.email, su: subject, body });
  return {
    gmail: `https://mail.google.com/mail/?${query}`,
    mailto: `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
  };
}

export function normalizeContact(values: ContactValues): ContactValues {
  const normalized = Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, value.trim()]),
  ) as unknown as ContactValues;
  if (
    normalized.name.length < 2 ||
    normalized.name.length > 80 ||
    normalized.email.length > 254 ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized.email) ||
    normalized.subject.length < 3 ||
    normalized.subject.length > 120 ||
    /[\r\n]/.test(normalized.subject) ||
    normalized.message.length < 5 ||
    normalized.message.length > 5000
  )
    throw new ContactError('validation');
  return normalized;
}

export async function submitContact(values: ContactValues, signal: AbortSignal): Promise<void> {
  const input = normalizeContact(values);
  if (!isContactConfigured()) throw new ContactError('configuration');
  const response = await fetch(CONTACT_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    credentials: 'omit',
    signal,
    body: JSON.stringify({
      access_key: import.meta.env.VITE_CONTACT_ACCESS_KEY.trim(),
      name: input.name,
      email: input.email,
      subject: `[Portfolio de Bryan] ${input.subject}`,
      message: input.message,
      replyto: input.email,
      from_name: 'Portfolio de Bryan',
      botcheck: false,
    }),
  });
  if (response.status === 429) throw new ContactError('rate-limit');
  let result: unknown;
  try {
    result = await response.json();
  } catch {
    throw new ContactError('delivery');
  }
  if (
    !response.ok ||
    !result ||
    typeof result !== 'object' ||
    !('success' in result) ||
    result.success !== true
  ) {
    throw new ContactError('delivery');
  }
}
