import type { CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import useAdaptiveQuality, { setManualQuality, type Quality } from '../hooks/useAdaptiveQuality';
import './QualityMenu.css';

export interface QualityMenuProps {
  isOpen: boolean;
  className?: string;
  style?: CSSProperties;
}

const QUALITIES: Quality[] = ['low', 'medium', 'high'];

function QualityMenu({ isOpen, className = '', style }: QualityMenuProps) {
  const { t } = useTranslation();
  const quality = useAdaptiveQuality();

  return (
    <div
      className={`quality-menu${isOpen ? ' is-open' : ''}${className ? ` ${className}` : ''}`}
      style={style}
      role="menu"
      aria-label={t('quality.title')}
      aria-hidden={!isOpen}
    >
      <span className="quality-menu-heading">{t('quality.heading')}</span>
      <div className="quality-menu-buttons">
        {QUALITIES.map(level => (
          <button
            key={level}
            type="button"
            role="menuitemradio"
            aria-checked={quality === level}
            tabIndex={isOpen ? 0 : -1}
            className={`quality-btn${quality === level ? ' is-active' : ''}`}
            onClick={() => setManualQuality(level)}
          >
            {t(`quality.${level}`)}
          </button>
        ))}
      </div>
      <span className="quality-menu-hint">{t('quality.hint')}</span>
    </div>
  );
}

export default QualityMenu;
