import { useTranslation } from 'react-i18next';
import cogLogo from '../assets/coglogo.webp';
import './DifficultyLevel.css';

interface DifficultyLevelProps {
  level: number;
  minDots?: number;
  className?: string;
}

function DifficultyLevel({ level, minDots = 5, className = '' }: DifficultyLevelProps) {
  const { t } = useTranslation();
  const safeLevel = Math.max(0, Math.ceil(level));
  const totalDots = Math.max(minDots, safeLevel);
  const toneClassName = safeLevel > 5 ? 'difficulty-level--high' : 'difficulty-level--base';

  return (
    <div
      className={`difficulty-level ${toneClassName} ${className}`.trim()}
      aria-label={`${t('projects.difficulty')} ${safeLevel}`}
    >
      <span className="difficulty-level__label">
        <img src={cogLogo} alt="" className="difficulty-level__icon" />
        {t('projects.difficulty')}
      </span>
      {Array.from({ length: totalDots }, (_, index) => (
        <span
          key={index}
          className={`difficulty-level__dot ${index < safeLevel ? 'is-filled' : ''}`}
        />
      ))}
    </div>
  );
}

export default DifficultyLevel;