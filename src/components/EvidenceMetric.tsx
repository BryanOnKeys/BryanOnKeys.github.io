import { safeExternalUrl } from '../lib/urls';

export interface EvidenceAssessment {
  passed: number;
  total: number;
  source: string;
  date: string;
}
export default function EvidenceMetric({
  status,
  assessment,
}: {
  status: string;
  assessment?: EvidenceAssessment;
}) {
  if (!assessment) return <span className="skill-status">{status}</span>;
  const source = safeExternalUrl(assessment.source);
  const valid =
    Number.isInteger(assessment.passed) &&
    Number.isInteger(assessment.total) &&
    assessment.total > 0 &&
    assessment.passed >= 0 &&
    assessment.passed <= assessment.total &&
    source;
  if (!valid) return <span className="skill-status">Por evaluar</span>;
  return (
    <span className="evidence-metric">
      <meter
        min={0}
        max={assessment.total}
        value={assessment.passed}
        aria-label="Objetivos verificados"
      />
      {assessment.passed}/{assessment.total} objetivos ·{' '}
      {Math.round((assessment.passed / assessment.total) * 100)}%{' '}
      <a href={source!} target="_blank" rel="noopener noreferrer">
        Evidencia ({assessment.date})
      </a>
    </span>
  );
}
