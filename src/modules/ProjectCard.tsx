import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import type { Project } from '../types/project';
import { publicAsset } from '../utils/asset';
import { formatProjectDuration, formatStudyPeriod } from '../utils/date';
import DifficultyLevel from './DifficultyLevel';
import ElectricBorder from './ElectricBorder';
import calendarLogoImg from '../assets/calendarlogo.png';
import './ProjectCard.css';

interface ProjectCardProps {
  project: Project;
  electricBorderActive?: boolean;
  selectedTags?: string[];
}

const MAX_TAG_ROWS = 2;

function ProjectCard({ project, electricBorderActive, selectedTags = [] }: ProjectCardProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'hu' ? 'hu' : 'en';
  const content = project.translations[lang];
  const accentColor = project.color ?? '#61dca3';

  const shellRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  const ghostRef = useRef<HTMLUListElement>(null);
  const tags = useMemo(() => {
    const all = content.tags ?? [];
    return [...all.filter((tag) => selectedTags.includes(tag)), ...all.filter((tag) => !selectedTags.includes(tag))];
  }, [content.tags, selectedTags]);
  const [visibleCount, setVisibleCount] = useState(tags.length);

  useLayoutEffect(() => {
    const ghost = ghostRef.current;
    if (!ghost) return;

    const compute = () => {
      const items = Array.from(ghost.children) as HTMLElement[];
      const ellipsisWidth = items[items.length - 1].getBoundingClientRect().width;
      const widths = items.slice(0, -1).map((el) => el.getBoundingClientRect().width);
      const gap = parseFloat(getComputedStyle(ghost).columnGap) || 0;
      const maxWidth = ghost.clientWidth;

      // Greedy flow simulation: returns the row count needed to lay out the given widths.
      const rowsFor = (list: number[]) => {
        let rows = 1;
        let x = 0;
        for (const w of list) {
          if (x > 0 && x + gap + w > maxWidth) {
            rows++;
            x = w;
          } else {
            x = x > 0 ? x + gap + w : w;
          }
        }
        return rows;
      };

      if (rowsFor(widths) <= MAX_TAG_ROWS) {
        setVisibleCount(widths.length);
        return;
      }
      let n = widths.length - 1;
      while (n > 0 && rowsFor([...widths.slice(0, n), ellipsisWidth]) > MAX_TAG_ROWS) n--;
      setVisibleCount(n);
    };

    compute();
    const observer = new ResizeObserver(compute);
    observer.observe(ghost);
    return () => observer.disconnect();
  }, [tags]);

  useEffect(() => {
    const node = shellRef.current;
    if (!node) return;

    // Pause the electric border animation while the card is far off screen.
    const observer = new IntersectionObserver(
      ([entry]) => setIsNearViewport(entry.isIntersecting),
      { rootMargin: '200px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="project-card-shell" ref={shellRef}>
      <div className="project-card-backplate" aria-hidden="true" />
      <div className="project-card-center-vignette" aria-hidden="true" />

      <ElectricBorder
        color={accentColor}
        speed={1}
        chaos={0.12}
        borderRadius={20}
        className="project-card-border"
        style={{ width: '100%', borderRadius: 20 }}
        active={electricBorderActive ?? isNearViewport}
      >
        <Link to={`/projects/${project.id}`} className="project-card">
          {project.headerSrc && (
            <div className="project-card__header-image">
              <img src={publicAsset(project.headerSrc)} alt="" loading="lazy" />
            </div>
          )}

          <div className="project-card__content">
            <div className="project-card__level-wrap">
              <DifficultyLevel level={project.level} className="project-card__level" />
            </div>

            <h2 className="project-card__title">{content.title}</h2>

            {content.role && <p className="project-card__role" style={{ color: accentColor }}>{content.role}</p>}

            <p className="project-card__period">
              <img src={calendarLogoImg} alt="" className="personal-data-icon" />{' '}
              {formatStudyPeriod(project.startDate, project.endDate, lang)}, {formatProjectDuration(project.startDate, project.endDate, lang)}
            </p>

            {tags.length > 0 && (
              <div className="project-card__tags-wrap">
                <ul className="project-card__tags">
                  {tags.slice(0, visibleCount).map((tag) => (
                    <li
                      key={tag}
                      className={`project-card__tag${selectedTags.includes(tag) ? ' project-card__tag--active' : ''}`}
                    >
                      {tag}
                    </li>
                  ))}
                  {visibleCount < tags.length && <li className="project-card__tag" aria-hidden="true">...</li>}
                </ul>
                <ul className="project-card__tags project-card__tags--ghost" ref={ghostRef} aria-hidden="true">
                  {tags.map((tag) => (
                    <li key={tag} className="project-card__tag">{tag}</li>
                  ))}
                  <li className="project-card__tag">...</li>
                </ul>
              </div>
            )}

            <p className="project-card__description">{content.shortDescription}</p>
          </div>
        </Link>
      </ElectricBorder>
    </div>
  );
}

export default ProjectCard;