import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import StudyCard from './StudyCard';
import ProjectCard from './ProjectCard';
import { formatStudyPeriod } from '../utils/date';
import { timelineEvents } from '../data/loadTimeline';
import { computeTimelineLayout } from '../utils/timelineLayout';
import './TimeLine.css';

function TimeLine() {
  const { t, i18n } = useTranslation();
  const lang = i18n.language === 'hu' ? 'hu' : 'en';
  const [openId, setOpenId] = useState<string | null>(null);

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
        const isOpen = openId === event.id;

        return (
          <div
            key={event.id}
            className={`timeline-event timeline-event--${event.side} ${isOpen ? 'is-open' : ''}`}
            style={{ top: position.top, height: position.height, '--event-color': event.color } as React.CSSProperties}
          >
            <span className="timeline-event__dot" aria-hidden="true" />
            <span className="timeline-event__ribbon" aria-hidden="true" />

            <button
              type="button"
              className="timeline-event__label"
              aria-expanded={isOpen}
              onClick={() => setOpenId(isOpen ? null : event.id)}
            >
              <span className="timeline-event__title">{translation.title}</span>
              <span className="timeline-event__period">{period}{event.ongoing ? ` \u2022 ${t('timeline.ongoing')}` : ''}</span>
            </button>

            <div className="timeline-event__preview">
              {event.kind === 'study' ? (
                <StudyCard study={event.study!} />
              ) : (
                <ProjectCard project={event.project!} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default TimeLine;
