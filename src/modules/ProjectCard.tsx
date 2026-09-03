import { useEffect, useRef, useState } from 'react';
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
}

function ProjectCard({ project, electricBorderActive }: ProjectCardProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'hu' ? 'hu' : 'en';
  const content = project.translations[lang];
  const accentColor = project.color ?? '#61dca3';

  const shellRef = useRef<HTMLDivElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

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

            {content.tags && content.tags.length > 0 && (
              <ul className="project-card__tags">
                {content.tags.map((tag) => (
                  <li key={tag} className="project-card__tag">{tag}</li>
                ))}
              </ul>
            )}

            <p className="project-card__description">{content.shortDescription}</p>
          </div>
        </Link>
      </ElectricBorder>
    </div>
  );
}

export default ProjectCard;