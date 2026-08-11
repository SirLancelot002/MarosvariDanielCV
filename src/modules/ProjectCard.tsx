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
}

function ProjectCard({ project }: ProjectCardProps) {
  const { i18n } = useTranslation();
  const lang = i18n.language === 'hu' ? 'hu' : 'en';
  const content = project.translations[lang];

  return (
    <div className="project-card-shell">
      <div className="project-card-backplate" aria-hidden="true" />
      <div className="project-card-center-vignette" aria-hidden="true" />

      <ElectricBorder
        color={project.color ?? '#61dca3'}
        speed={1}
        chaos={0.12}
        borderRadius={20}
        className="project-card-border"
        style={{ width: '100%', borderRadius: 20 }}
      >
        <Link to={`/projects/${project.id}`} className="project-card">
          {project.headerSrc && (
            <div className="project-card__header-image">
              <img src={publicAsset(project.headerSrc)} alt="" loading="lazy" />
            </div>
          )}

          <div className="project-card__content">
            <DifficultyLevel level={project.level} className="project-card__level" />

            <h3 className="project-card__title">{content.title}</h3>

            {content.role && <p className="project-card__role">{content.role}</p>}

            <p className="project-card__period">
              <img src={calendarLogoImg} alt="" className="personal-data-icon" />{' '}
              {formatStudyPeriod(project.startDate, project.endDate, lang)}, {formatProjectDuration(project.startDate, project.endDate, lang)}
            </p>

            <p className="project-card__description">{content.shortDescription}</p>
          </div>
        </Link>
      </ElectricBorder>
    </div>
  );
}

export default ProjectCard;