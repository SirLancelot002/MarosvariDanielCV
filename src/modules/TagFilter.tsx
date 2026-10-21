import { useEffect, useId, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './TagFilter.css';

interface TagFilterProps {
  tags: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

function TagFilter({ tags, selected, onChange }: TagFilterProps) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const root = rootRef.current;
    if (!root) return;

    const FAR_DISTANCE_PX = 250;

    const onPointerDown = (e: PointerEvent) => {
      if (!root.contains(e.target as Node)) setOpen(false);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      const r = root.getBoundingClientRect();
      const dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right);
      const dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom);
      if (Math.hypot(dx, dy) > FAR_DISTANCE_PX) setOpen(false);
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) setOpen(false);
    });
    observer.observe(root);

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('pointermove', onPointerMove);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('pointermove', onPointerMove);
      observer.disconnect();
    };
  }, [open]);

  const normalizedQuery = query.trim().toLowerCase();
  const visibleTags = tags.filter((tag) => tag.toLowerCase().includes(normalizedQuery));

  const toggle = (tag: string) => {
    onChange(selected.includes(tag) ? selected.filter((s) => s !== tag) : [...selected, tag]);
  };

  return (
    <div ref={rootRef} className={`tag-filter${open ? ' tag-filter--open' : ''}`}>
      <div className="tag-filter__bar" onClick={() => setOpen(true)}>
        <button
          type="button"
          className="tag-filter__icon-btn"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={t('projects.filter.toggle')}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((o) => !o);
          }}
        >
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <line x1="16.5" y1="16.5" x2="21" y2="21" />
          </svg>
        </button>
        <input
          type="text"
          className="tag-filter__input"
          value={query}
          placeholder={t('projects.filter.placeholder')}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
        />
        {selected.length > 0 && (
          <button
            type="button"
            className="tag-filter__clear"
            onClick={(e) => {
              e.stopPropagation();
              onChange([]);
            }}
          >
            {t('projects.filter.clear')} ({selected.length})
          </button>
        )}
      </div>

      <div className="tag-filter__panel" id={panelId} aria-hidden={!open}>
        <div className="tag-filter__panel-inner">
          <ul className="tag-filter__tags">
            {visibleTags.map((tag) => {
              const active = selected.includes(tag);
              return (
                <li key={tag}>
                  <button
                    type="button"
                    tabIndex={open ? 0 : -1}
                    className={`tag-filter__tag${active ? ' tag-filter__tag--active' : ''}`}
                    aria-pressed={active}
                    onClick={() => toggle(tag)}
                  >
                    {tag}
                  </button>
                </li>
              );
            })}
            {visibleTags.length === 0 && (
              <li className="tag-filter__empty">{t('projects.filter.noMatch')}</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TagFilter;
