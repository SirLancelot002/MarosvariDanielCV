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
  const openEqfLink = () => {
    window.open('https://europass.europa.eu/en/description-eight-eqf-levels', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className={`eqf-level ${className}`.trim()} aria-label={`Level ${safeLevel} of ${maxLevel}`}>
      <span className="eqf-level__label">
        <img src={gradHatLogo} alt="" className="eqf-level__icon" />{' '}
        <span
          className="eqf-link"
          role="link"
          tabIndex={0}
          onClick={(event) => {
            event.stopPropagation();
            openEqfLink();
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              event.stopPropagation();
              openEqfLink();
            }
          }}
        >
          EQF
        </span>{' '}
        {t('studies.level')}
      </span>
      {Array.from({ length: maxLevel }, (_, i) => (
        <span key={i} className={`eqf-level__dot ${i < safeLevel ? 'is-filled' : ''}`} />
      ))}
    </div>
  );
}

export default EqfLevel;
