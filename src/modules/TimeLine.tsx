import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import StudyCard from './StudyCard';
import ProjectCard from './ProjectCard';
import { formatStudyPeriod } from '../utils/date';
import { timelineEvents } from '../data/loadTimeline';
import { computeTimelineLayout } from '../utils/timelineLayout';
import './TimeLine.css';

function TimeLine() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language === 'hu' ? 'hu' : 'en';
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [previewTopById, setPreviewTopById] = useState<Map<string, number>>(new Map());

  const layout = useMemo(
    () =>
      computeTimelineLayout(
        timelineEvents.map((event) => ({ id: event.id, side: event.side, start: event.start, end: event.end }))
      ),
    []
  );

  const positionById = useMemo(
    () => new Map(layout.items.map((item) => [item.id, item])),
    [layout]
  );

  const positionPreview = (eventId: string, label: HTMLButtonElement) => {
    const eventElement = label.closest<HTMLElement>('.timeline-event');
    const preview = eventElement?.querySelector<HTMLElement>('.timeline-event__preview');
    const timeline = eventElement?.closest<HTMLElement>('.timeline');
    const nav = document.querySelector<HTMLElement>('.pill-nav');
    if (!eventElement || !preview || !timeline || !nav) return;

    const eventBounds = eventElement.getBoundingClientRect();
    const minimumTop = nav.getBoundingClientRect().bottom + 16;
    const centeredTop = eventBounds.top + (eventBounds.height - preview.offsetHeight) / 2;
    // The preview is positioned absolute relative to its own .timeline-event, so the offset must be
    // relative to that element's own top, not the shared .timeline container's top.
    const previewTop = Math.max(centeredTop, minimumTop) + preview.offsetHeight / 2 - eventBounds.top;

    setPreviewTopById((current) => {
      if (current.get(eventId) === previewTop) return current;
      const next = new Map(current);
      next.set(eventId, previewTop);
      return next;
    });
  };

  return (
    <div className="timeline" style={{ height: layout.containerHeight }}>
      <div className="timeline__line" aria-hidden="true" />

      <span className="timeline__legend timeline__legend--left">{t('timeline.studies')}</span>
      <span className="timeline__legend timeline__legend--right">{t('timeline.projects')}</span>

      {timelineEvents.map((event) => {
        const position = positionById.get(event.id);
        if (!position) return null;

        const translation = event.kind === 'study'
          ? event.study!.translations[lang]
          : event.project!.translations[lang];
        const period = formatStudyPeriod(
          event.kind === 'study' ? event.study!.startDate : event.project!.startDate,
          event.kind === 'study' ? event.study!.endDate : event.project!.endDate,
          lang
        );
        const detailPath = event.kind === 'study' ? `/studies/${event.study!.id}` : `/projects/${event.project!.id}`;

        return (
          <div
            key={event.id}
            className={`timeline-event timeline-event--${event.side}`}
            style={{
              top: position.top,
              height: position.height,
              '--event-color': event.color,
              '--lane': position.lane,
              '--spine-top': `${position.spineTop}px`,
              '--spine-height': `${position.spineHeight}px`,
              '--preview-top': previewTopById.has(event.id) ? `${previewTopById.get(event.id)}px` : '50%',
            } as React.CSSProperties}
          >
            <span className="timeline-event__span" aria-hidden="true" />
            <span className="timeline-event__connector" aria-hidden="true" />
            <span className="timeline-event__dot" aria-hidden="true" />

            <button
              type="button"
              className="timeline-event__label"
              onMouseEnter={(mouseEvent) => {
                positionPreview(event.id, mouseEvent.currentTarget);
                setHoveredId(event.id);
              }}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => navigate(detailPath)}
            >
              <span className="timeline-event__title">{translation.title}</span>
              <span className="timeline-event__period">{period}{event.ongoing ? ` \u2022 ${t('timeline.ongoing')}` : ''}</span>
            </button>

            <div className="timeline-event__preview">
              {event.kind === 'study' ? (
                <StudyCard study={event.study!} />
              ) : (
                <ProjectCard project={event.project!} electricBorderActive={hoveredId === event.id} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TimeLine;
