import { forwardRef, useEffect, useRef, type CSSProperties } from 'react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../data/languages';
import './LanguageMenu.css';

export interface LanguageMenuProps {
  isOpen: boolean;
  className?: string;
  style?: CSSProperties;
}

const LanguageMenu = forwardRef<HTMLDivElement, LanguageMenuProps>(function LanguageMenu(
  { isOpen, className = '', style },
  ref
) {
  const { t, i18n } = useTranslation();
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
      className={`language-menu${isOpen ? ' is-open' : ''}${className ? ` ${className}` : ''}`}
      style={style}
      role="menu"
      aria-label={t('language.title')}
      aria-hidden={!isOpen}
    >
      <span className="language-menu-heading">{t('language.heading')}</span>
      <div className="language-menu-buttons">
        {LANGUAGES.map(language => (
          <button
            key={language.code}
            type="button"
            role="menuitemradio"
            aria-checked={i18n.language === language.code}
            tabIndex={isOpen ? 0 : -1}
            className={`language-btn${i18n.language === language.code ? ' is-active' : ''}`}
            onClick={() => i18n.changeLanguage(language.code)}
          >
            <img src={language.flag} alt="" className="lang-flag" />
            {language.label}
          </button>
        ))}
      </div>
    </div>
  );
});

export default LanguageMenu;
