import { forwardRef, useEffect, useRef, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import useAdaptiveQuality, { setManualQuality, type Quality } from '../hooks/useAdaptiveQuality';
import './QualityMenu.css';

export interface QualityMenuProps {
  isOpen: boolean;
  className?: string;
  style?: CSSProperties;
}

const QUALITIES: Quality[] = ['low', 'medium', 'high'];

const QualityMenu = forwardRef<HTMLDivElement, QualityMenuProps>(function QualityMenu(
  { isOpen, className = '', style },
  ref
) {
  const { t } = useTranslation();
  const quality = useAdaptiveQuality();
  const innerRef = useRef<HTMLDivElement | null>(null);

  // Move focus out before hiding, so aria-hidden never applies to a focused descendant.
  useEffect(() => {
    if (isOpen) return;
    const menuEl = innerRef.current;
    if (menuEl && menuEl.contains(document.activeElement)) {
      (document.activeElement as HTMLElement).blur();
    }
  }, [isOpen]);

  return (
    <div
      ref={node => {
        innerRef.current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
      }}
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
});

export default QualityMenu;
