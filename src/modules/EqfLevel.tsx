import { useTranslation } from 'react-i18next';
import gradHatLogo from '../assets/gradhatlogo.webp';
import './EqfLevel.css';

interface EqfLevelProps {
  level: number;
  maxLevel?: number;
  className?: string;
}

function EqfLevel({ level, maxLevel = 8, className = '' }: EqfLevelProps) {
  const { t } = useTranslation();
  const safeLevel = Math.max(0, Math.min(level, maxLevel));

  return (
    <div className={`eqf-level ${className}`.trim()} aria-label={`Level ${safeLevel} of ${maxLevel}`}>
      <span className="eqf-level__label">
        <img src={gradHatLogo} alt="" className="eqf-level__icon" /> <a href="https://europass.europa.eu/en/description-eight-eqf-levels" target="_blank" className="eqf-link">EQF</a> {t('studies.level')}
      </span>
      {Array.from({ length: maxLevel }, (_, i) => (
        <span key={i} className={`eqf-level__dot ${i < safeLevel ? 'is-filled' : ''}`} />
      ))}
    </div>
  );
}

export default EqfLevel;
