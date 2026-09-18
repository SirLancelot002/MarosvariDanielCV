import type { JobSeniority } from '../types/job';
import './JobLevel.css';

interface JobLevelProps {
  level: JobSeniority;
  text: string;
  className?: string;
}

const EMOJI_BY_LEVEL: Record<JobSeniority, string> = {
  junior: '🐣',
  medior: '🌱',
  senior: '🧠',
  manager: '👑'
};

const COLOR_BY_LEVEL: Record<JobSeniority, string> = {
  junior: '#7dd3fc',
  medior: '#34d399',
  senior: '#f59e0b',
  manager: '#c084fc'
};

function JobLevel({ level, text, className = '' }: JobLevelProps) {
  return (
    <span
      className={`job-level ${className}`}
      style={{ '--job-level-color': COLOR_BY_LEVEL[level] } as React.CSSProperties}
    >
      <span className="job-level__emoji" role="img" aria-label={level}>
        {EMOJI_BY_LEVEL[level]}
      </span>
      <span className="job-level__text">{text}</span>
    </span>
  );
}

export default JobLevel;