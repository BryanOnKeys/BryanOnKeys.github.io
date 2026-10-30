export function safeExternalUrl(value: string): string | null {
  try {
    const u = new URL(value);
    return u.protocol === 'https:' ? u.href : null;
  } catch {
    return null;
  }
}
export function engineeringUrl(project = 'nexo') {
  return `${import.meta.env.BASE_URL}engineering/?project=${encodeURIComponent(project)}`;
}
