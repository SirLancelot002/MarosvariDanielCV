import { useState, type ReactNode } from 'react';
import './CollapsibleSection.css';

interface CollapsibleSectionProps {
  isCloseable: boolean;
  isClosedByDefault: boolean;
  headingContent: ReactNode; // always visible, sits next to the toggle chevron
  children: ReactNode;        // collapses/expands
  animated?: boolean;         // animate open/close instead of toggling instantly
}

function CollapsibleSection({ isCloseable, isClosedByDefault, headingContent, children, animated = false }: CollapsibleSectionProps) {
  const [isOpen, setIsOpen] = useState(!(isCloseable && isClosedByDefault));

  const toggle = () => setIsOpen(prev => !prev);

  return (
    <div className="collapsible-section">
      <div
        className={`collapsible-section__heading-row ${isCloseable ? 'is-toggleable' : ''}`}
        onClick={isCloseable ? toggle : undefined}
        role={isCloseable ? 'button' : undefined}
        tabIndex={isCloseable ? 0 : undefined}
        aria-expanded={isCloseable ? isOpen : undefined}
        onKeyDown={
          isCloseable
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  toggle();
                }
              }
            : undefined
        }
      >
        {isCloseable && (
          <span className={`collapsible-section__chevron ${isOpen ? 'is-open' : ''}`} aria-hidden="true">
            &gt;
          </span>
        )}
        {headingContent}
      </div>

      {animated ? (
        <div className={`collapsible-section__animated ${!isCloseable || isOpen ? 'is-open' : ''}`} inert={isCloseable && !isOpen}>
          <div className="collapsible-section__animated-inner">
            <div className="collapsible-section__body">{children}</div>
          </div>
        </div>
      ) : (
        (!isCloseable || isOpen) && <div className="collapsible-section__body">{children}</div>
      )}
    </div>
  );
}

export default CollapsibleSection;